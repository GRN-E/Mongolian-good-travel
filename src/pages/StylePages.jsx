import { Link, useParams, Navigate } from 'react-router-dom'
import { styles, trips, ui } from '../data'
import { useT, useLang, formatTripsCount } from '../i18n/LanguageContext'
import PageHero from '../components/shared/PageHero'
import TripCard from '../components/shared/TripCard'
import CTA from '../components/CTA'

const bgMap = {
  sun: 'bg-sun-soft hover:bg-sun text-clay hover:text-white',
  sky: 'bg-sky-soft hover:bg-sky text-sky hover:text-white',
  clay: 'bg-clay-soft hover:bg-clay text-clay hover:text-white',
  plum: 'bg-plum-soft hover:bg-plum text-plum hover:text-white',
  steppe: 'bg-steppe-soft hover:bg-steppe text-steppe hover:text-white',
  'brand-blue': 'bg-brand-blue-soft hover:bg-brand-blue text-brand-blue hover:text-white',
  'brand-red': 'bg-brand-red-soft hover:bg-brand-red text-brand-red hover:text-white',
}

export function WaysToTravelPage() {
  const t = useT()
  const { lang } = useLang()
  return (
    <>
      <PageHero
        eyebrow={{ mn: 'Аяллын төрөл', en: 'Ways to travel', kr: '여행 스타일' }}
        title={{ mn: 'Та ямар аяллыг хүсэж байна?', en: 'What style of trip suits you?', kr: '어떤 스타일의 여행을 원하시나요?' }}
        subtitle={{
          mn: 'Гэр бүл, хосуудад, адал явдалд дуртай — бид бүх төрөлд маршрут зохион байгуулна.',
          en: 'Family, honeymoon, adventure — we plan trips for every style.',
          kr: '가족, 신혼여행, 모험 — 모든 스타일에 맞춘 여행을 준비합니다.',
        }}
        image="https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: { mn: 'Аяллын төрөл', en: 'Ways to travel', kr: '여행 스타일' } }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {styles.map((s) => {
              const cls = bgMap[s.color] || bgMap['brand-blue']
              return (
                <Link key={s.slug} to={`/ways-to-travel/${s.slug}`}
                  className={`group rounded-2xl p-6 md:p-8 transition-all duration-300 ${cls}`}>
                  <div className="text-4xl md:text-5xl mb-4">{s.icon}</div>
                  <div className="font-display font-bold text-xl md:text-2xl leading-tight">{t(s.name)}</div>
                  <p className="mt-3 text-sm opacity-90 leading-relaxed">{t(s.intro)}</p>
                  <div className="mt-5 text-sm font-semibold inline-flex items-center gap-1.5">
                    {formatTripsCount(s.count, lang)}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
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

export function StyleDetailPage() {
  const { slug } = useParams()
  const t = useT()
  const style = styles.find((s) => s.slug === slug)
  if (!style) return <Navigate to="/ways-to-travel" replace />

  const matching = trips.filter((tr) => tr.styleSlug === slug)

  return (
    <>
      <PageHero
        eyebrow={{ mn: `${style.icon} Аяллын төрөл`, en: `${style.icon} Travel style`, kr: `${style.icon} 여행 스타일` }}
        title={style.name}
        subtitle={style.intro}
        image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[
          { label: { mn: 'Аяллын төрөл', en: 'Ways to travel', kr: '여행 스타일' }, href: '/ways-to-travel' },
          { label: style.name },
        ]}
      />

      <section className="py-16 md:py-20 bg-bone">
        <div className="container-x">
          {matching.length > 0 ? (
            <>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-8">
                {t({ mn: 'Энэ төрлийн аяллууд', en: 'Trips in this style', kr: '이 스타일의 여행' })}
                <span className="ml-3 text-ink-2 text-xl">({matching.length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {matching.map((tr) => <TripCard key={tr.id} trip={tr} full />)}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">{style.icon}</div>
              <p className="text-lg text-ink-2">
                {t({
                  mn: 'Энэ төрлийн аяллыг удахгүй нэмж байна. Утсаар хандана уу.',
                  en: 'Trips in this style coming soon. Call us for early access.',
                  kr: '이 스타일의 여행은 곧 추가됩니다. 미리 문의해 주세요.',
                })}
              </p>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  )
}
