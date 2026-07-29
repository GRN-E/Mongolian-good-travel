import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Globe from 'react-globe.gl'
import { Plus, Minus, RotateCcw, X, MapPin, Plane, ArrowUpRight } from 'lucide-react'
import { mongoliaSites, gatewayCities, countryLabels } from '../data'
import { useT } from '../i18n/LanguageContext'

const COLOR_SPHERE = '#FBF8F1'
const COLOR_LAND = '#DCE3F2'
const COLOR_LAND_STROKE = '#A8B5E0'
const COLOR_MN = '#F4A79B'
const COLOR_MN_STROKE = '#E5331F'
const COLOR_KR = '#A7E0C0'
const COLOR_KR_STROKE = '#15803D'
const COLOR_SELECTED = '#FCD34D'
const COLOR_SELECTED_STROKE = '#F59E0B'
const COLOR_SITE = '#E5331F'
const COLOR_CAPITAL = '#F59E0B'
const COLOR_GATEWAY = '#1735C8'
const COLOR_ARC = '#1735C8'
// Two-phase flight colors:
const COLOR_ARC_INBOUND = '#1735C8'   // world → Ulaanbaatar (brand blue)
const COLOR_ARC_OUTBOUND = '#E5331F'  // Ulaanbaatar → domestic sites (brand red)
const COLOR_ATMOSPHERE = '#7588CC'

const HOME_VIEW = { lat: 47, lng: 105, altitude: 2.2 }
const MIN_ALT = 0.35
const MAX_ALT = 3.5
const ZOOM_THRESHOLD = 1.5

export default function MongoliaGlobe({ selectedSlug, onSelect, width, height }) {
  const t = useT()
  const globeRef = useRef(null)
  const popupRef = useRef(null)
  const [countries, setCountries] = useState({ features: [] })
  const [ready, setReady] = useState(false)
  const [zoomedIn, setZoomedIn] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/data/countries.geojson')
      .then((r) => (r.ok ? r.json() : { features: [] }))
      .then((data) => { if (!cancelled) setCountries(data) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const selectedCountry = useMemo(() => {
    const all = [...mongoliaSites, ...gatewayCities]
    return all.find((s) => s.slug === selectedSlug)?.country || null
  }, [selectedSlug])

  const activeSlug = zoomedIn ? selectedSlug : null

  useEffect(() => {
    const evalZoom = () => {
      const g = globeRef.current
      if (!g) return
      try {
        const pov = g.pointOfView?.()
        if (pov) setZoomedIn(pov.altitude < ZOOM_THRESHOLD)
      } catch { /* ignore */ }
    }
    const setup = () => {
      const g = globeRef.current
      if (!g) return
      try {
        const controls = g.controls?.()
        if (controls) {
          controls.autoRotate = true
          controls.autoRotateSpeed = 0.35
          controls.enableZoom = true
          controls.minDistance = 101
          controls.maxDistance = 600
          controls.addEventListener?.('change', evalZoom)
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
    const poll = setInterval(evalZoom, 400)
    return () => {
      clearTimeout(id)
      clearInterval(poll)
      globeRef.current?.controls?.()?.removeEventListener?.('change', evalZoom)
    }
  }, [])

  // Zoom to selected city
  useEffect(() => {
    const g = globeRef.current
    if (!g || !selectedSlug) return
    const all = [...mongoliaSites, ...gatewayCities]
    const site = all.find((s) => s.slug === selectedSlug)
    if (!site) return
    try {
      g.pointOfView?.({ lat: site.lat, lng: site.lng, altitude: 0.42 }, 1500)
      setZoomedIn(true)
      const controls = g.controls?.()
      if (controls) {
        controls.autoRotate = false
        const timer = setTimeout(() => { controls.autoRotate = true }, 9000)
        return () => clearTimeout(timer)
      }
    } catch { /* ignore */ }
  }, [selectedSlug])

  const points = useMemo(() => {
    // Dots are shown in BOTH overview and zoomed states so the exact
    // locations are always visible. Zoomed-in just enlarges them.
    const sites = mongoliaSites.map((s) => {
      const sel = s.slug === activeSlug
      // Selected site is marked by the star + ring instead of a plain dot,
      // so shrink its dot to ~0 to avoid a doubled marker.
      const base = zoomedIn ? (s.isCapital ? 0.5 : 0.38) : (s.isCapital ? 0.42 : 0.3)
      return { ...s, kind: 'site', color: s.isCapital ? COLOR_CAPITAL : COLOR_SITE, radius: sel ? 0.001 : base, isSelected: sel }
    })
    const gateways = gatewayCities.map((c) => {
      const sel = c.slug === activeSlug
      const base = zoomedIn ? 0.36 : 0.3
      return { ...c, kind: 'gateway', color: COLOR_GATEWAY, radius: sel ? 0.001 : base, isSelected: sel }
    })
    return [...sites, ...gateways]
  }, [zoomedIn, activeSlug])

  const selectedPoint = useMemo(
    () => points.find((p) => p.isSelected) || null,
    [points]
  )

  // Pulsing ring at the EXACT selected coordinates — pinpoints the spot precisely
  const rings = useMemo(() => {
    if (!selectedPoint) return []
    const ringColor = selectedPoint.isGateway
      ? COLOR_GATEWAY
      : selectedPoint.isCapital
      ? COLOR_CAPITAL
      : COLOR_SITE
    return [{ lat: selectedPoint.lat, lng: selectedPoint.lng, color: ringColor }]
  }, [selectedPoint])

  // A star marker sitting exactly on the selected point
  const starData = useMemo(() => {
    if (!selectedPoint) return []
    return [{ lat: selectedPoint.lat, lng: selectedPoint.lng, ...selectedPoint }]
  }, [selectedPoint])

  // HTML overlay data: country name labels (always) + the star (when selected).
  // Country labels are tagged _kind:'country', the star _kind:'star'.
  const htmlData = useMemo(() => {
    const labels = countryLabels.map((c) => ({ ...c, _kind: 'country' }))
    const star = starData.map((s) => ({ ...s, _kind: 'star' }))
    return [...labels, ...star]
  }, [starData])

  // Live-position the popup next to its marker using screen projection
  useEffect(() => {
    if (!selectedPoint || !zoomedIn) return
    let raf
    const update = () => {
      const g = globeRef.current
      const el = popupRef.current
      if (g && el && typeof g.getScreenCoords === 'function') {
        try {
          const c = g.getScreenCoords(selectedPoint.lat, selectedPoint.lng, 0.01)
          if (c && Number.isFinite(c.x) && Number.isFinite(c.y)) {
            // Clamp so the popup never spills outside the globe canvas.
            const pad = 12
            const popW = el.offsetWidth || 220
            const popH = el.offsetHeight || 180
            // horizontal: keep the (center-anchored) card fully visible
            const minX = pad + popW / 2
            const maxX = (width || 0) - pad - popW / 2
            const x = Math.min(Math.max(c.x, minX), Math.max(minX, maxX))
            // vertical: the card sits above the point (translateY -100%). If the
            // point is too high to fit the card above it, flip the card below.
            const fitsAbove = c.y - popH - 18 > pad
            el.style.left = `${x}px`
            el.style.top = `${c.y}px`
            el.dataset.placement = fitsAbove ? 'above' : 'below'
            el.style.opacity = '1'
          }
        } catch { /* ignore */ }
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [selectedPoint, zoomedIn])

  const arcs = useMemo(() => {
    if (zoomedIn) return []
    const ub = mongoliaSites.find((s) => s.slug === 'ulaanbaatar')
    if (!ub) return []

    // Phase 1 — foreign cities → Ulaanbaatar (blue).
    // A gradient color array makes each dash glow at its leading head and
    // fade at the tail — like a comet of light travelling the route.
    const inbound = gatewayCities.map((c, i) => ({
      startLat: c.lat, startLng: c.lng,
      endLat: ub.lat, endLng: ub.lng,
      // transparent tail → solid head
      color: [`${COLOR_ARC_INBOUND}00`, COLOR_ARC_INBOUND],
      stroke: 0.45,
      // Phase 1 occupies the first part of the loop; small per-line stagger
      dashInitial: -(i * 0.06),
      leg: 'in',
    }))

    // Phase 2 — Ulaanbaatar → domestic tourist sites (red).
    // Offset their initial gap so they begin AFTER the inbound lines have
    // visually "arrived", creating the world→UB→sites story.
    const domestic = mongoliaSites
      .filter((s) => !s.isCapital)
      .map((s, i) => ({
        startLat: ub.lat, startLng: ub.lng,
        endLat: s.lat, endLng: s.lng,
        color: [`${COLOR_ARC_OUTBOUND}00`, COLOR_ARC_OUTBOUND],
        stroke: 0.45,
        // start roughly half a loop later than inbound → sequential phases
        dashInitial: 0.5 - (i * 0.05),
        leg: 'out',
      }))

    // Phase 3 — Ulaanbaatar → foreign cities (red), the return leg.
    // This makes the UB↔world connection visible in both directions.
    const outboundForeign = gatewayCities.map((c, i) => ({
      startLat: ub.lat, startLng: ub.lng,
      endLat: c.lat, endLng: c.lng,
      color: [`${COLOR_ARC_OUTBOUND}00`, COLOR_ARC_OUTBOUND],
      stroke: 0.32,
      dashInitial: 0.5 - (i * 0.06),
      leg: 'out-foreign',
    }))

    return [...inbound, ...domestic, ...outboundForeign]
  }, [zoomedIn])

  const zoomBy = useCallback((factor) => {
    const g = globeRef.current
    if (!g) return
    try {
      const pov = g.pointOfView?.()
      if (!pov) return
      const nextAlt = Math.min(MAX_ALT, Math.max(MIN_ALT, pov.altitude * factor))
      g.pointOfView?.({ ...pov, altitude: nextAlt }, 500)
      setTimeout(() => setZoomedIn(nextAlt < ZOOM_THRESHOLD), 520)
    } catch { /* ignore */ }
  }, [])

  const resetView = useCallback(() => {
    const g = globeRef.current
    if (!g) return
    try {
      g.pointOfView?.(HOME_VIEW, 900)
      setZoomedIn(false)
      onSelect?.(null)
      const controls = g.controls?.()
      if (controls) controls.autoRotate = true
    } catch { /* ignore */ }
  }, [onSelect])

  const capColor = useCallback((feat) => {
    const n = feat?.properties?.NAME
    if (n === selectedCountry && zoomedIn) return COLOR_SELECTED
    if (n === 'Mongolia') return COLOR_MN
    if (n === 'South Korea') return COLOR_KR
    return COLOR_LAND
  }, [selectedCountry, zoomedIn])

  const strokeColor = useCallback((feat) => {
    const n = feat?.properties?.NAME
    if (n === selectedCountry && zoomedIn) return COLOR_SELECTED_STROKE
    if (n === 'Mongolia') return COLOR_MN_STROKE
    if (n === 'South Korea') return COLOR_KR_STROKE
    return COLOR_LAND_STROKE
  }, [selectedCountry, zoomedIn])

  const sel = selectedPoint
  const selAccent = sel?.isGateway ? 'border-brand-blue' : sel?.isCapital ? 'border-sun' : 'border-brand-red'
  const selBar = sel?.isGateway ? 'bg-brand-blue' : sel?.isCapital ? 'bg-sun' : 'bg-brand-red'
  const selChip = sel?.isGateway ? 'bg-brand-blue-soft' : sel?.isCapital ? 'bg-sun-soft' : 'bg-brand-red-soft'
  const selText = sel?.isGateway ? 'text-brand-blue' : sel?.isCapital ? 'text-sun' : 'text-brand-red'

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
        polygonAltitude={(feat) => (feat?.properties?.NAME === selectedCountry && zoomedIn ? 0.012 : 0.006)}
        polygonCapColor={capColor}
        polygonSideColor={() => 'rgba(0,0,0,0)'}
        polygonStrokeColor={strokeColor}
        polygonsTransitionDuration={300}

        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.008}
        pointRadius="radius"
        pointResolution={14}
        onPointClick={(p) => { if (p?.slug && onSelect) onSelect(p.slug) }}
        pointLabel={(p) =>
          p.isSelected
            ? '' // selected one shows the full popup, not a tooltip
            : `<div style="display:flex;align-items:center;gap:6px;background:rgba(10,24,84,0.95);color:#fff;padding:6px 12px;border-radius:8px;font-family:Onest,sans-serif;font-size:12.5px;font-weight:600;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,0.2);"><span style="font-size:15px;">${p.icon || '📍'}</span>${t(p.name)}</div>`
        }

        // Pulsing locator ring at the exact selected coordinate
        ringsData={rings}
        ringLat="lat"
        ringLng="lng"
        ringColor={(r) => (tInterp) => {
          // fade from solid to transparent as the ring expands
          const c = r.color
          const a = Math.max(0, 1 - tInterp)
          return `${c}${Math.round(a * 255).toString(16).padStart(2, '0')}`
        }}
        ringMaxRadius={3.2}
        ringPropagationSpeed={1.6}
        ringRepeatPeriod={1100}
        ringAltitude={0.009}

        // Star marker (selected) + country name labels
        htmlElementsData={htmlData}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.01}
        htmlElement={(d) => {
          const el = document.createElement('div')

          // Country name label
          if (d._kind === 'country') {
            const isMn = d.key === 'Mongolia'
            const isKr = d.key === 'South Korea'
            const col = isMn ? '#E5331F' : isKr ? '#15803D' : '#5A6B9E'
            el.style.cssText = 'pointer-events:none;transform:translate(-50%,-50%);'
            el.innerHTML = `
              <div style="font-family:Onest,sans-serif;font-weight:${isMn || isKr ? 700 : 600};
                font-size:${isMn ? 13 : 11}px;color:${col};white-space:nowrap;letter-spacing:0.02em;
                text-shadow:0 1px 3px rgba(251,248,241,0.95),0 0 8px rgba(251,248,241,0.95);">
                ${t(d.name)}
              </div>`
            return el
          }

          // Star marker pinned EXACTLY on the selected point
          const starColor = d.isGateway ? '#1735C8' : d.isCapital ? '#F59E0B' : '#E5331F'
          el.style.cssText = 'pointer-events:none;transform:translate(-50%,-50%);'
          el.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 24 24" fill="${starColor}"
              stroke="#FBF8F1" stroke-width="1.4" stroke-linejoin="round"
              style="filter:drop-shadow(0 2px 5px rgba(10,24,84,0.45));">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>`
          return el
        }}

        arcsData={arcs}
        arcColor="color"
        arcStroke="stroke"
        arcAltitude={0.24}
        arcAltitudeAutoScale={0.55}
        arcDashLength={0.45}
        arcDashGap={0.7}
        arcDashInitialGap="dashInitial"
        arcDashAnimateTime={6000}
        arcsTransitionDuration={600}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at center, transparent 62%, rgba(251,248,241,0.4) 100%)' }}
      />

      {/* Anchored popup — tracks the selected marker's screen position */}
      {sel && (
        <div
          ref={popupRef}
          data-placement="above"
          style={{ position: 'absolute', left: 0, top: 0, opacity: 0, zIndex: 20, pointerEvents: 'none' }}
        >
          <div
            className={`globe-popup-card relative w-[210px] sm:w-[250px] bg-white rounded-2xl ring-1 ring-line shadow-card-hover overflow-hidden border-t-4 ${selAccent}`}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`shrink-0 h-10 w-10 rounded-xl flex items-center justify-center text-xl ${selChip}`}>
                  {sel.icon || '📍'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`flex items-center gap-1 text-[9px] uppercase tracking-[0.16em] font-bold ${selText}`}>
                    {sel.isGateway ? <Plane className="h-3 w-3" strokeWidth={2.2} /> : <MapPin className="h-3 w-3" strokeWidth={2.2} />}
                    {t(sel.region)}
                  </div>
                  <h4 className="font-display font-bold text-[15px] text-ink leading-tight mt-0.5">
                    {t(sel.name)}
                  </h4>
                </div>
                <button
                  onClick={() => onSelect?.(null)}
                  aria-label="Close"
                  className="shrink-0 h-6 w-6 rounded-full hover:bg-bone flex items-center justify-center text-ink-2 transition"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              </div>
              <p className="mt-2.5 text-[12px] text-ink-2 leading-relaxed line-clamp-4">
                {t(sel.description)}
              </p>
              <Link
                to={sel.isGateway ? '/trips' : '/destinations/mongolia'}
                className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-blue hover:text-brand-red transition"
              >
                {sel.isGateway
                  ? t({ mn: 'Нислэг үзэх', en: 'View flights', kr: '항공편 보기' })
                  : t({ mn: 'Аяллыг үзэх', en: 'See trips', kr: '여행 보기' })}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {/* little pointer tail */}
            <div
              className="globe-popup-tail absolute left-1/2 -bottom-[7px] -translate-x-1/2 w-3 h-3 bg-white rotate-45 ring-1 ring-line"
              style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
            />
          </div>
        </div>
      )}

      {/* Overview hint */}
      {!zoomedIn && ready && (
        <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 max-w-[90%] bg-white/90 backdrop-blur rounded-full px-3 py-1.5 sm:px-4 sm:py-2 ring-1 ring-line text-[10px] sm:text-[11px] font-semibold text-ink-2 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
          <Plus className="h-3.5 w-3.5 text-brand-blue shrink-0" strokeWidth={2.4} />
          {t({ mn: 'Ойртуулж газруудыг үзнэ үү', en: 'Zoom in to reveal the sites', kr: '확대하면 명소가 나타납니다' })}
        </div>
      )}

      {/* Flight-route legend (overview only) */}
      {!zoomedIn && ready && (
        <div className="pointer-events-none absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-xl px-3 py-2.5 ring-1 ring-line text-[10px] sm:text-[11px] font-semibold space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-[3px] rounded-full" style={{ background: COLOR_ARC_INBOUND }} />
            <span className="text-ink-2">{t({ mn: 'Дэлхийгээс → Улаанбаатар', en: 'World → Ulaanbaatar', kr: '세계 → 울란바토르' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-[3px] rounded-full" style={{ background: COLOR_ARC_OUTBOUND }} />
            <span className="text-ink-2">{t({ mn: 'Улаанбаатар → Аялал', en: 'Ulaanbaatar → Sites', kr: '울란바토르 → 명소' })}</span>
          </div>
        </div>
      )}

      {/* Dot legend (zoomed-in only) — shows what the markers mean */}
      {zoomedIn && ready && (
        <div className="pointer-events-none absolute bottom-4 left-4 right-16 sm:right-auto hidden xs:flex flex-wrap items-center gap-x-3 gap-y-1 bg-white/90 backdrop-blur rounded-2xl sm:rounded-full px-3 py-2 ring-1 ring-line text-[10px] sm:text-[11px] font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-sun" />
            {t({ mn: 'Нийслэл', en: 'Ulaanbaatar', kr: '울란바토르' })}
          </span>
          <span className="text-line hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-red" />
            {t({ mn: 'Аяллын газар', en: 'Tourist site', kr: '명소' })}
          </span>
          <span className="text-line hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-blue" />
            {t({ mn: 'Шууд нислэг', en: 'Direct flight', kr: '직항' })}
          </span>
        </div>
      )}

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-30">
        <button onClick={() => zoomBy(0.6)} aria-label="Zoom in"
          className="h-10 w-10 rounded-xl bg-white/95 backdrop-blur ring-1 ring-line shadow-card flex items-center justify-center text-ink hover:bg-brand-blue hover:text-white transition active:scale-95">
          <Plus className="h-4.5 w-4.5" strokeWidth={2.4} />
        </button>
        <button onClick={() => zoomBy(1.5)} aria-label="Zoom out"
          className="h-10 w-10 rounded-xl bg-white/95 backdrop-blur ring-1 ring-line shadow-card flex items-center justify-center text-ink hover:bg-brand-blue hover:text-white transition active:scale-95">
          <Minus className="h-4.5 w-4.5" strokeWidth={2.4} />
        </button>
        <button onClick={resetView} aria-label="Reset view"
          className="h-10 w-10 rounded-xl bg-white/95 backdrop-blur ring-1 ring-line shadow-card flex items-center justify-center text-ink hover:bg-clay hover:text-white transition active:scale-95">
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
