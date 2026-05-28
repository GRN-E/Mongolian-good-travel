import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import Globe from 'react-globe.gl'
import { Plus, Minus, RotateCcw } from 'lucide-react'
import { mongoliaSites, gatewayCities, countryLabels } from '../data'
import { useT } from '../i18n/LanguageContext'

// Brand colors
const COLOR_SPHERE = '#FBF8F1'
const COLOR_LAND = '#DCE3F2'           // neutral countries (soft blue-grey)
const COLOR_LAND_STROKE = '#A8B5E0'
const COLOR_MN = '#F4A79B'             // Mongolia — soft red
const COLOR_MN_STROKE = '#E5331F'
const COLOR_KR = '#A7E0C0'             // South Korea — soft green
const COLOR_KR_STROKE = '#15803D'
const COLOR_SELECTED = '#FCD34D'       // selected city's country — gold highlight
const COLOR_SELECTED_STROKE = '#F59E0B'
const COLOR_SITE = '#E5331F'
const COLOR_CAPITAL = '#F59E0B'
const COLOR_GATEWAY = '#1735C8'
const COLOR_ARC = '#1735C8'
const COLOR_ATMOSPHERE = '#7588CC'

const HOME_VIEW = { lat: 47, lng: 105, altitude: 2.2 }
const MIN_ALT = 0.35
const MAX_ALT = 3.5

export default function MongoliaGlobe({ selectedSlug, onSelect, width, height }) {
  const t = useT()
  const globeRef = useRef(null)
  const [countries, setCountries] = useState({ features: [] })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/data/countries.geojson')
      .then((r) => (r.ok ? r.json() : { features: [] }))
      .then((data) => { if (!cancelled) setCountries(data) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // Which country is currently highlighted (the selected city's country)
  const selectedCountry = useMemo(() => {
    const all = [...mongoliaSites, ...gatewayCities]
    return all.find((s) => s.slug === selectedSlug)?.country || null
  }, [selectedSlug])

  // Flat-lit cream sphere + enable zoom
  useEffect(() => {
    const setup = () => {
      const g = globeRef.current
      if (!g) return
      try {
        const controls = g.controls?.()
        if (controls) {
          controls.autoRotate = true
          controls.autoRotateSpeed = 0.35
          controls.enableZoom = true          // ← zoom now enabled
          controls.minDistance = 101          // allow very close zoom (≈ altitude 0.01)
          controls.maxDistance = 600
        }
        const material = g.globeMaterial?.()
        if (material) {
          material.color?.set?.(COLOR_SPHERE)
          material.emissive?.set?.(COLOR_SPHERE)
          material.emissiveIntensity = 0.95
          material.shininess = 0
          material.needsUpdate = true
        }
        const scene = g.scene?.()
        if (scene) {
          scene.traverse((obj) => {
            if (!obj?.isLight) return
            if (obj.type === 'AmbientLight') obj.intensity = 1.8
            else if (obj.type === 'DirectionalLight') obj.intensity = 0.1
            else if (obj.type === 'HemisphereLight') obj.intensity = 0.6
          })
        }
        g.pointOfView?.(HOME_VIEW, 0)
        setReady(true)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[MongoliaGlobe] setup skipped:', err?.message || err)
        setReady(true)
      }
    }
    setup()
    const id = setTimeout(setup, 100)
    return () => clearTimeout(id)
  }, [])

  // Zoom dramatically into the selected city
  useEffect(() => {
    const g = globeRef.current
    if (!g || !selectedSlug) return
    const all = [...mongoliaSites, ...gatewayCities]
    const site = all.find((s) => s.slug === selectedSlug)
    if (!site) return
    try {
      // Tight zoom so the country/site territory fills the view
      g.pointOfView?.({ lat: site.lat, lng: site.lng, altitude: 0.28 }, 1700)
      const controls = g.controls?.()
      if (controls) {
        controls.autoRotate = false
        const timer = setTimeout(() => { controls.autoRotate = true }, 8000)
        return () => clearTimeout(timer)
      }
    } catch { /* ignore */ }
  }, [selectedSlug])

  // Manual zoom controls
  const zoomBy = useCallback((factor) => {
    const g = globeRef.current
    if (!g) return
    try {
      const pov = g.pointOfView?.()
      if (!pov) return
      const nextAlt = Math.min(MAX_ALT, Math.max(MIN_ALT, pov.altitude * factor))
      g.pointOfView?.({ ...pov, altitude: nextAlt }, 500)
    } catch { /* ignore */ }
  }, [])

  const resetView = useCallback(() => {
    const g = globeRef.current
    if (!g) return
    try {
      g.pointOfView?.(HOME_VIEW, 900)
      const controls = g.controls?.()
      if (controls) controls.autoRotate = true
    } catch { /* ignore */ }
  }, [])

  // Points — selected marker bigger
  const points = useMemo(() => {
    const sites = mongoliaSites.map((s) => {
      const sel = s.slug === selectedSlug
      return { ...s, kind: 'site', color: s.isCapital ? COLOR_CAPITAL : COLOR_SITE, radius: sel ? 1.1 : s.isCapital ? 0.55 : 0.4, isSelected: sel }
    })
    const gateways = gatewayCities.map((c) => {
      const sel = c.slug === selectedSlug
      return { ...c, kind: 'gateway', color: COLOR_GATEWAY, radius: sel ? 1.0 : 0.38, isSelected: sel }
    })
    return [...sites, ...gateways]
  }, [selectedSlug])

  const selectedPoint = useMemo(() => points.find((p) => p.isSelected) || null, [points])

  // HTML overlays: country names (always) + selected-city pin
  const htmlData = useMemo(() => {
    const labels = countryLabels.map((c) => ({ ...c, _type: 'country' }))
    if (selectedPoint) labels.push({ ...selectedPoint, _type: 'city' })
    return labels
  }, [selectedPoint])

  // Polygon fill by country
  const capColor = useCallback((feat) => {
    const n = feat?.properties?.NAME
    if (n === selectedCountry) return COLOR_SELECTED
    if (n === 'Mongolia') return COLOR_MN
    if (n === 'South Korea') return COLOR_KR
    return COLOR_LAND
  }, [selectedCountry])

  const strokeColor = useCallback((feat) => {
    const n = feat?.properties?.NAME
    if (n === selectedCountry) return COLOR_SELECTED_STROKE
    if (n === 'Mongolia') return COLOR_MN_STROKE
    if (n === 'South Korea') return COLOR_KR_STROKE
    return COLOR_LAND_STROKE
  }, [selectedCountry])

  const arcs = useMemo(() => {
    const ub = mongoliaSites.find((s) => s.slug === 'ulaanbaatar')
    if (!ub) return []
    const inbound = gatewayCities.map((c, i) => ({
      startLat: c.lat, startLng: c.lng, endLat: ub.lat, endLng: ub.lng,
      color: COLOR_ARC, stroke: 0.4, dashInitial: i * 0.12,
    }))
    const domestic = mongoliaSites.filter((s) => !s.isCapital).map((s, i) => ({
      startLat: ub.lat, startLng: ub.lng, endLat: s.lat, endLng: s.lng,
      color: COLOR_ARC, stroke: 0.4, dashInitial: 0.4 + i * 0.08,
    }))
    return [...inbound, ...domestic]
  }, [])

  return (
    <div className="relative">
      <Globe
        ref={globeRef}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor={COLOR_ATMOSPHERE}
        atmosphereAltitude={0.16}

        polygonsData={countries.features}
        polygonAltitude={(feat) => (feat?.properties?.NAME === selectedCountry ? 0.012 : 0.006)}
        polygonCapColor={capColor}
        polygonSideColor={() => 'rgba(0,0,0,0)'}
        polygonStrokeColor={strokeColor}
        polygonsTransitionDuration={300}

        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.008}            // ← lower = dots sit precisely on the surface
        pointRadius="radius"
        pointResolution={14}
        onPointClick={(p) => { if (p?.slug && onSelect) onSelect(p.slug) }}
        pointLabel={(p) =>
          `<div style="display:flex;align-items:center;gap:6px;background:rgba(10,24,84,0.95);color:#fff;padding:6px 12px;border-radius:8px;font-family:Onest,sans-serif;font-size:12.5px;font-weight:600;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,0.2);"><span style="font-size:15px;">${p.icon || '📍'}</span>${t(p.name)}</div>`
        }

        htmlElementsData={htmlData}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={(d) => (d._type === 'city' ? 0.06 : 0.01)}
        htmlElement={(d) => {
          const el = document.createElement('div')
          if (d._type === 'country') {
            // Subtle country name label
            const isMn = d.key === 'Mongolia'
            const isKr = d.key === 'South Korea'
            const col = isMn ? '#E5331F' : isKr ? '#15803D' : '#4B5563'
            el.style.cssText = 'pointer-events:none;transform:translate(-50%,-50%);'
            el.innerHTML = `<div style="font-family:Onest,sans-serif;font-weight:${isMn || isKr ? 700 : 600};font-size:${isMn ? 13 : 11}px;color:${col};text-shadow:0 1px 3px rgba(251,248,241,0.9),0 0 6px rgba(251,248,241,0.9);white-space:nowrap;letter-spacing:0.02em;">${t(d.name)}</div>`
            return el
          }
          // Selected city pin — with iconic symbol
          const accent = d.isGateway ? '#1735C8' : d.isCapital ? '#F59E0B' : '#E5331F'
          el.style.cssText = 'pointer-events:none;transform:translate(-50%,-100%);'
          el.innerHTML = `
            <div style="display:inline-flex;align-items:center;gap:7px;background:#FBF8F1;color:#0A1854;padding:8px 16px;border-radius:9999px;font-family:Onest,sans-serif;font-weight:700;font-size:14px;white-space:nowrap;box-shadow:0 8px 28px rgba(10,24,84,0.3);border:2.5px solid ${accent};">
              <span style="font-size:18px;line-height:1;">${d.icon || '📍'}</span>
              <span>${t(d.name)}</span>
            </div>
            <div style="width:2px;height:20px;background:linear-gradient(to bottom, ${accent}, transparent);margin:0 auto;"></div>`
          return el
        }}

        arcsData={arcs}
        arcColor="color"
        arcStroke="stroke"
        arcAltitude={0.22}
        arcAltitudeAutoScale={0.5}
        arcDashLength={0.95}
        arcDashGap={0.05}
        arcDashInitialGap="dashInitial"
        arcDashAnimateTime={4000}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at center, transparent 62%, rgba(251,248,241,0.4) 100%)' }}
      />

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
        <button
          onClick={() => zoomBy(0.7)}
          aria-label="Zoom in"
          className="h-10 w-10 rounded-xl bg-white/95 backdrop-blur ring-1 ring-line shadow-card flex items-center justify-center text-ink hover:bg-brand-blue hover:text-white transition"
        >
          <Plus className="h-4.5 w-4.5" strokeWidth={2.4} />
        </button>
        <button
          onClick={() => zoomBy(1.4)}
          aria-label="Zoom out"
          className="h-10 w-10 rounded-xl bg-white/95 backdrop-blur ring-1 ring-line shadow-card flex items-center justify-center text-ink hover:bg-brand-blue hover:text-white transition"
        >
          <Minus className="h-4.5 w-4.5" strokeWidth={2.4} />
        </button>
        <button
          onClick={resetView}
          aria-label="Reset view"
          className="h-10 w-10 rounded-xl bg-white/95 backdrop-blur ring-1 ring-line shadow-card flex items-center justify-center text-ink hover:bg-clay hover:text-white transition"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-ink-2 text-sm pointer-events-none">
          <span className="inline-block h-5 w-5 rounded-full border-2 border-brand-blue border-t-transparent animate-spin mr-2" />
          Loading globe...
        </div>
      )}
    </div>
  )
}
