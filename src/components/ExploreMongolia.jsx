import { lazy, Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowUpRight, Sparkles, Search, Plane } from 'lucide-react'
import { mongoliaSites, gatewayCities } from '../data'
import { useT } from '../i18n/LanguageContext'

const MongoliaGlobe = lazy(() => import('./MongoliaGlobe'))

export default function ExploreMongolia() {
  const t = useT()
  const [selectedSlug, setSelectedSlug] = useState('ulaanbaatar')
  const [query, setQuery] = useState('')
  const containerRef = useRef(null)
  const [size, setSize] = useState({ w: 600, h: 600 })
  const [inView, setInView] = useState(false)

  // Responsive sizing
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect
      const w = Math.min(r.width, 720)
      const h = Math.min(w, 620)
      setSize({ w, h })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Lazy-mount when scrolled into view
  useEffect(() => {
    if (!containerRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    io.observe(containerRef.current)
    return () => io.disconnect()
  }, [])

  // Search filters across Mongolia sites + gateways in all 3 languages
  const filtered = useMemo(() => {
    const all = [
      ...mongoliaSites.map((s) => ({ ...s, kind: 'site' })),
      ...gatewayCities.map((c) => ({ ...c, kind: 'gateway' })),
    ]
    if (!query.trim()) return all
    const q = query.trim().toLowerCase()
    return all.filter((p) => {
      const nameMatch = Object.values(p.name || {}).some((v) => v.toLowerCase().includes(q))
      const regionMatch = Object.values(p.region || {}).some((v) => v.toLowerCase().includes(q))
      return nameMatch || regionMatch
    })
  }, [query])

  // Find the selected entry across both lists
  const selected = useMemo(() => {
    return (
      mongoliaSites.find((s) => s.slug === selectedSlug) ||
      gatewayCities.find((c) => c.slug === selectedSlug) ||
      null
    )
  }, [selectedSlug])

  return (
    <section id="explore" className="py-20 md:py-28 bg-bone relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-sky-soft/40 via-transparent to-clay-soft/30 blur-3xl" />

      <div className="container-x relative">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="eyebrow text-clay justify-center">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
            {t({ mn: 'Интерактив газрын зураг', en: 'Interactive map', kr: '인터랙티브 지도' })}
          </p>
          <h2 className="h-display mt-4 text-4xl md:text-6xl text-ink">
            {(() => {
              const full = t({
                mn: 'Монгол орныг ертөнцөөс үзэх',
                en: 'Mongolia, seen from space',
                kr: '우주에서 본 몽골',
              })
              const acc = t({ mn: 'ертөнцөөс', en: 'space', kr: '우주에서' })
              if (acc && full.includes(acc)) {
                const [before, after] = full.split(acc)
                return (<>{before}<span className="text-clay">{acc}</span>{after}</>)
              }
              return full
            })()}
          </h2>
          <p className="mt-5 text-ink-2 leading-relaxed">
            {t({
              mn: 'Дэлхийгээ эргүүлж, эсвэл доорх хайлтаар хайж газруудыг сонгоорой. Цэг бүр дээр дарж дэлгэрэнгүй мэдээлэл аваарай.',
              en: 'Spin the globe or search below to find a site. Click any point to read its brief.',
              kr: '지구본을 돌리거나 아래에서 검색해 명소를 찾으세요. 점을 클릭하면 간단한 소개가 나타납니다.',
            })}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-10 items-start">
          {/* Globe */}
          <div
            ref={containerRef}
            className="relative bg-white rounded-3xl ring-1 ring-line shadow-card overflow-hidden"
            style={{ height: size.h + 40 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {inView ? (
                <Suspense
                  fallback={
                    <div className="flex items-center gap-3 text-ink-2 text-sm">
                      <span className="inline-block h-5 w-5 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
                      {t({ mn: 'Газрын зураг ачаалж байна...', en: 'Loading globe...', kr: '지구본 로딩 중...' })}
                    </div>
                  }
                >
                  <MongoliaGlobe
                    width={size.w}
                    height={size.h}
                    selectedSlug={selectedSlug}
                    onSelect={setSelectedSlug}
                  />
                </Suspense>
              ) : (
                <div className="text-ink-2 text-sm flex items-center gap-3">
                  <span className="inline-block h-5 w-5 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
                  {t({ mn: 'Бэлдэж байна...', en: 'Preparing...', kr: '준비 중...' })}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 bg-white/90 backdrop-blur rounded-full px-4 py-2 ring-1 ring-line text-[11px] font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-sun" />
                {t({ mn: 'Нийслэл', en: 'Ulaanbaatar', kr: '울란바토르' })}
              </span>
              <span className="text-line">·</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-red" />
                {t({ mn: 'Аяллын газар', en: 'Tourist site', kr: '명소' })}
              </span>
              <span className="text-line">·</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-blue" />
                {t({ mn: 'Шууд нислэг', en: 'Direct flight', kr: '직항' })}
              </span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-32 space-y-4">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-2" strokeWidth={2} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t({
                  mn: 'Газар хайх... (ж.нь: Говь, Сөүл)',
                  en: 'Search a site... (e.g. Gobi, Seoul)',
                  kr: '명소 검색... (예: 고비, 서울)',
                })}
                className="w-full bg-white rounded-2xl border border-line pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue ring-1 ring-line"
              />
            </div>

            {/* Selected detail card */}
            {selected && (
              <div className="bg-white rounded-2xl p-5 md:p-6 ring-1 ring-line shadow-card">
                <div className="flex items-start gap-4">
                  {/* Iconic symbol */}
                  <div
                    className={`shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center text-3xl ${
                      selected.isGateway ? 'bg-brand-blue-soft' : selected.isCapital ? 'bg-sun-soft' : 'bg-brand-red-soft'
                    }`}
                  >
                    {selected.icon || '📍'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold mb-1 ${
                        selected.isGateway ? 'text-brand-blue' : selected.isCapital ? 'text-sun' : 'text-brand-red'
                      }`}
                    >
                      {selected.isGateway ? (
                        <Plane className="h-3.5 w-3.5" strokeWidth={2.2} />
                      ) : (
                        <MapPin className="h-3.5 w-3.5" strokeWidth={2.2} />
                      )}
                      {t(selected.region)}
                    </div>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-ink leading-tight">
                      {t(selected.name)}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink-2 leading-relaxed">
                  {t(selected.description)}
                </p>
                <Link
                  to={selected.isGateway ? '/trips' : '/destinations/mongolia'}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-red transition"
                >
                  {selected.isGateway
                    ? t({ mn: 'Нислэг үзэх', en: 'View flights', kr: '항공편 보기' })
                    : t({ mn: 'Аяллыг үзэх', en: 'See trips', kr: '여행 보기' })}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            {/* List */}
            <div className="bg-white rounded-2xl ring-1 ring-line overflow-hidden">
              <div className="px-5 py-3 border-b border-line bg-bone flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-2">
                  {query
                    ? t({ mn: 'Хайлтын үр дүн', en: 'Search results', kr: '검색 결과' })
                    : t({ mn: 'Бүх газрууд', en: 'All sites', kr: '전체 명소' })}
                </div>
                <div className="text-[10px] font-bold text-ink-2">{filtered.length}</div>
              </div>
              <div className="max-h-[340px] overflow-y-auto">
                {filtered.length === 0 && (
                  <div className="px-5 py-6 text-center text-sm text-ink-2">
                    {t({ mn: 'Илэрц олдсонгүй', en: 'No matches', kr: '결과 없음' })}
                  </div>
                )}
                {filtered.map((s) => {
                  const active = s.slug === selectedSlug
                  const dotColor = s.isGateway
                    ? 'bg-brand-blue'
                    : s.isCapital
                    ? 'bg-sun'
                    : 'bg-brand-red'
                  return (
                    <button
                      key={s.slug}
                      onClick={() => setSelectedSlug(s.slug)}
                      className={`w-full text-left px-5 py-3 border-b border-line last:border-b-0 flex items-center gap-3 transition ${
                        active ? 'bg-brand-blue-soft' : 'hover:bg-bone'
                      }`}
                    >
                      <span className="text-xl shrink-0 w-6 text-center">{s.icon || '📍'}</span>
                      <span className="flex-1 min-w-0">
                        <span className={`block font-semibold text-sm ${active ? 'text-brand-blue' : 'text-ink'}`}>
                          {t(s.name)}
                        </span>
                        <span className="block text-[11px] text-ink-2 truncate">{t(s.region)}</span>
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full shrink-0 ${dotColor} ${
                          active ? 'ring-2 ring-offset-2 ring-brand-blue' : ''
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
