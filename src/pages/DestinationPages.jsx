import { Link, useParams, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { destinations, trips, ui } from '../data'
import { useT, useLang, formatTripsCount } from '../i18n/LanguageContext'
import PageHero from '../components/shared/PageHero'
import TripCard from '../components/shared/TripCard'
import CTA from '../components/CTA'
import ErrorBoundary from '../components/shared/ErrorBoundary'
import { ArrowUpRight, Check } from 'lucide-react'

const ExploreMongolia = lazy(() => import('../components/ExploreMongolia'))

const overlayMap = {
  sun: 'from-clay/90', sky: 'from-sky/90', clay: 'from-clay/90',
  plum: 'from-plum/90', steppe: 'from-steppe/90', brand: 'from-brand-blue/90',
}

export function DestinationsPage() {
  const t = useT()
  const { lang } = useLang()
  return (
    <>
      <PageHero
        eyebrow={{ mn: 'Чиглэлүүд', en: 'Destinations', kr: '목적지' }}
        title={{ mn: 'Хаашаа аялмаар байна?', en: 'Where do you want to go?', kr: '어디로 가고 싶으세요?' }}
        subtitle={{
          mn: '10 гаруй улсаас өөрт тохирох чиглэлээ сонгоорой.',
          en: 'Choose your destination from 10+ countries.',
          kr: '10개 이상의 국가에서 목적지를 선택하세요.',
        }}
        image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: { mn: 'Чиглэлүүд', en: 'Destinations', kr: '목적지' } }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {destinations.map((d) => {
              const overlay = overlayMap[d.accent] || overlayMap.brand
              return (
                <Link
                  key={d.slug}
                  to={`/destinations/${d.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-line aspect-[4/5]"
                >
                  <img src={d.image} alt={t(d.name)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${overlay} via-black/30 to-transparent`} />
                  {d.tag && <div className="absolute top-4 left-4 pill bg-white text-ink">{t(d.tag)}</div>}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <div className="text-[11px] uppercase tracking-[0.18em] opacity-80">{d.en}</div>
                    <div className="font-display font-bold text-3xl mt-1">{t(d.name)}</div>
                    <div className="mt-2 text-sm flex items-center gap-2 opacity-90">
                      <span>{formatTripsCount(d.trips, lang)}</span>
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}

export function DestinationDetailPage() {
  const { slug } = useParams()
  const t = useT()
  const { lang } = useLang()
  const dest = destinations.find((d) => d.slug === slug)
  if (!dest) return <Navigate to="/destinations" replace />

  const matchingTrips = trips.filter((tr) => tr.destinationSlug === slug)

  return (
    <>
      <PageHero
        eyebrow={{ mn: 'Чиглэл', en: 'Destination', kr: '목적지' }}
        title={dest.name}
        subtitle={dest.intro}
        image={dest.image}
        breadcrumbs={[
          { label: { mn: 'Чиглэлүүд', en: 'Destinations', kr: '목적지' }, href: '/destinations' },
          { label: dest.name },
        ]}
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-5">
              {t({ mn: 'Танилцуулга', en: 'About', kr: '소개' })}
            </h2>
            <p className="text-lg text-ink-2 leading-relaxed">{t(dest.intro)}</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-ink mb-4">
              {t({ mn: 'Онцлох газрууд', en: 'Highlights', kr: '하이라이트' })}
            </h3>
            <ul className="space-y-3">
              {dest.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-ink-2">
                  <Check className="h-5 w-5 text-steppe shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{t(h)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {matchingTrips.length > 0 && (
        <section className="py-16 md:py-20 bg-bone">
          <div className="container-x">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-8">
              {t({ mn: 'Энэ чиглэлийн аяллууд', en: 'Trips to this destination', kr: '이 목적지 여행' })}
              <span className="ml-3 text-ink-2 text-xl">({matchingTrips.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {matchingTrips.map((tr) => <TripCard key={tr.id} trip={tr} full />)}
            </div>
          </div>
        </section>
      )}

      {/* Interactive Mongolia globe — only on the Mongolia page */}
      {slug === 'mongolia' && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <ExploreMongolia />
          </Suspense>
        </ErrorBoundary>
      )}

      <CTA />
    </>
  )
}
