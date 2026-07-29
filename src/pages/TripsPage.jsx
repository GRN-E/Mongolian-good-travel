import { useMemo, useState } from 'react'
import { trips, destinations, styles, ui } from '../data'
import { useT } from '../i18n/LanguageContext'
import PageHero from '../components/shared/PageHero'
import TripCard from '../components/shared/TripCard'
import CTA from '../components/CTA'
import { Search } from 'lucide-react'

export default function TripsPage() {
  const t = useT()
  const [destFilter, setDestFilter] = useState('all')
  const [styleFilter, setStyleFilter] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return trips.filter((tr) => {
      if (destFilter !== 'all' && tr.destinationSlug !== destFilter) return false
      if (styleFilter !== 'all' && tr.styleSlug !== styleFilter) return false
      if (query) {
        const q = query.toLowerCase()
        const inTitle = Object.values(tr.title).some((v) => v.toLowerCase().includes(q))
        const inLoc = Object.values(tr.location).some((v) => v.toLowerCase().includes(q))
        if (!inTitle && !inLoc) return false
      }
      return true
    })
  }, [destFilter, styleFilter, query])

  return (
    <>
      <PageHero
        eyebrow={{ mn: 'Аяллын каталог', en: 'Trip catalog', kr: '여행 카탈로그' }}
        title={{ mn: 'Бүх аяллууд', en: 'All trips', kr: '전체 여행' }}
        subtitle={{
          mn: '100+ маршрутаас өөрт тохирох аяллыг сонгож, шууд захиалаарай.',
          en: 'Choose from 100+ routes and book the one that fits you.',
          kr: '100개 이상의 코스에서 당신에게 맞는 여행을 선택하고 바로 예약하세요.',
        }}
        image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: { mn: 'Аяллууд', en: 'Trips', kr: '여행' } }]}
      />

      {/* Filter bar */}
      <section className="py-10 bg-white border-b border-line sticky top-[68px] z-30">
        <div className="container-x">
          <div className="grid md:grid-cols-[1fr_1fr_1.5fr] gap-3">
            <select
              value={destFilter}
              onChange={(e) => setDestFilter(e.target.value)}
              className="rounded-xl bg-bone border border-line px-4 py-3 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
            >
              <option value="all">🌍 {t(ui.allDestinations)}</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>{t(d.name)}</option>
              ))}
            </select>
            <select
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              className="rounded-xl bg-bone border border-line px-4 py-3 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
            >
              <option value="all">🎨 {t({ mn: 'Бүх төрөл', en: 'All styles', kr: '전체 스타일' })}</option>
              {styles.map((s) => (
                <option key={s.slug} value={s.slug}>{s.icon} {t(s.name)}</option>
              ))}
            </select>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-2" strokeWidth={2} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t({ mn: 'Хайх...', en: 'Search...', kr: '검색...' })}
                className="w-full rounded-xl bg-bone border border-line pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>
          <div className="mt-4 text-sm text-ink-2">
            {filtered.length} {t(ui.trips)}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 sm:py-12 sm:py-16 md:py-20 bg-bone">
        <div className="container-x">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔎</div>
              <p className="text-lg text-ink-2">
                {t({
                  mn: 'Тохирох аялал олдсонгүй. Шүүлтүүрээ өөрчилнө үү.',
                  en: 'No trips match your filters. Try adjusting them.',
                  kr: '조건에 맞는 여행이 없습니다. 필터를 조정해 보세요.',
                })}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {filtered.map((tr) => <TripCard key={tr.id} trip={tr} full />)}
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  )
}
