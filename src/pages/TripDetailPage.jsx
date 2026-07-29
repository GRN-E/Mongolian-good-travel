import { useParams, Link, Navigate } from 'react-router-dom'
import { trips, destinations, ui, company } from '../data'
import { useT, useLang, formatDays } from '../i18n/LanguageContext'
import PageHero from '../components/shared/PageHero'
import TripCard from '../components/shared/TripCard'
import CTA from '../components/CTA'
import { Star, Clock, MapPin, Users, Plane, Check, Phone } from 'lucide-react'

export default function TripDetailPage() {
  const { slug } = useParams()
  const t = useT()
  const { lang } = useLang()
  const trip = trips.find((tr) => tr.slug === slug)

  if (!trip) return <Navigate to="/trips" replace />

  const dest = destinations.find((d) => d.slug === trip.destinationSlug)
  const related = trips.filter((tr) => tr.destinationSlug === trip.destinationSlug && tr.id !== trip.id).slice(0, 3)

  const hasSale = trip.priceWas && trip.priceWas > trip.priceFrom
  const savings = hasSale ? Math.round(((trip.priceWas - trip.priceFrom) / trip.priceWas) * 100) : 0

  return (
    <>
      <PageHero
        eyebrow={trip.type}
        title={trip.title}
        subtitle={trip.location}
        image={trip.image}
        breadcrumbs={[
          { label: { mn: 'Аяллууд', en: 'Trips', kr: '여행' }, href: '/trips' },
          { label: trip.title },
        ]}
      />

      <section className="py-12 sm:py-12 sm:py-16 md:py-20 bg-white">
        <div className="container-x grid lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Quick facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              <Fact icon={<Clock className="h-5 w-5" />} label={t({ mn: 'Хугацаа', en: 'Duration', kr: '기간' })} value={formatDays(trip.days, lang)} />
              <Fact icon={<MapPin className="h-5 w-5" />} label={t({ mn: 'Бүс', en: 'Region', kr: '지역' })} value={dest ? t(dest.name) : '—'} />
              <Fact icon={<Users className="h-5 w-5" />} label={t({ mn: 'Бүлэг', en: 'Group size', kr: '인원' })} value="2-10" />
              <Fact icon={<Star className="h-5 w-5 fill-sun text-sun" />} label={t({ mn: 'Үнэлгээ', en: 'Rating', kr: '평점' })} value={`${trip.rating} (${trip.reviews})`} />
            </div>

            {/* Overview */}
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-5">
              {t({ mn: 'Аяллын тойм', en: 'Trip overview', kr: '여행 개요' })}
            </h2>
            <p className="text-lg text-ink-2 leading-relaxed mb-8">{t(trip.summary)}</p>

            {/* What's included */}
            <h3 className="font-display font-bold text-2xl text-ink mb-5">
              {t({ mn: 'Үнэд багтсан', en: "What's included", kr: '포함 사항' })}
            </h3>
            <ul className="space-y-3 mb-10">
              {[
                { mn: 'Олон улсын нислэг (эконом анги)', en: 'International flight (economy)', kr: '국제 항공편 (이코노미)' },
                { mn: '3-4* буудал, өглөөний цайтай', en: '3–4* hotel with breakfast', kr: '3–4성급 호텔 (조식 포함)' },
                { mn: 'Туршлагатай гид (Монгол хэлтэй)', en: 'Experienced guide (Mongolian-speaking)', kr: '경험 많은 가이드 (몽골어)' },
                { mn: 'Хотын дотоод тээвэр', en: 'Local transport', kr: '현지 교통' },
                { mn: 'Аяллын даатгал', en: 'Travel insurance', kr: '여행자 보험' },
                { mn: 'Виз бүрдүүлэх дэмжлэг', en: 'Visa application support', kr: '비자 신청 지원' },
              ].map((inc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 h-5 w-5 rounded-full bg-steppe-soft text-steppe flex items-center justify-center">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-ink">{t(inc)}</span>
                </li>
              ))}
            </ul>

            {/* Itinerary placeholder */}
            <h3 className="font-display font-bold text-2xl text-ink mb-5">
              {t({ mn: 'Маршрут', en: 'Itinerary', kr: '일정' })}
            </h3>
            <div className="space-y-3">
              {Array.from({ length: trip.days }).map((_, i) => (
                <div key={i} className="bg-bone rounded-xl p-5 ring-1 ring-line">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="font-display font-bold text-lg text-ink">
                      {t({ mn: `${i + 1}-р өдөр`, en: `Day ${i + 1}`, kr: `${i + 1}일차` })}
                    </div>
                  </div>
                  <p className="text-sm text-ink-2 pl-12">
                    {t({
                      mn: 'Дэлгэрэнгүй маршрут удахгүй нэмэгдэнэ. Утсаар холбогдож мэдээлэл аваарай.',
                      en: 'Detailed itinerary coming soon. Call us for full route details.',
                      kr: '상세 일정은 곧 공개됩니다. 자세한 코스는 전화로 문의해 주세요.',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky booking sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-32 bg-white rounded-2xl ring-1 ring-line shadow-card p-6">
              <div className="text-[11px] uppercase tracking-wide text-ink-2">{t(ui.priceFrom)}</div>
              <div className="flex items-baseline gap-3 mt-1">
                {hasSale && <span className="text-lg text-ink-2 line-through">${trip.priceWas}</span>}
                <span className="font-display font-bold text-4xl text-brand-red">${trip.priceFrom}</span>
              </div>
              {hasSale && (
                <div className="mt-2 inline-block bg-brand-red text-white pill">
                  -{savings}% {t(ui.saveDiscount)}
                </div>
              )}
              <p className="mt-2 text-xs text-ink-2">
                {t({ mn: 'Нэг хүний үнэ. Виз, даатгал багтсан.', en: 'Per person. Visa & insurance included.', kr: '1인 기준. 비자·보험 포함.' })}
              </p>

              <div className="mt-6 space-y-3">
                <a href={`tel:${company.phoneRaw}`} className="btn-primary w-full">
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                  {t({ mn: 'Захиалга өгөх', en: 'Book now', kr: '예약하기' })}
                </a>
                <a href={`mailto:${company.email}?subject=${encodeURIComponent(t(trip.title))}`}
                  className="btn-ghost w-full">
                  {t({ mn: 'Имэйлээр асуух', en: 'Email us', kr: '이메일 문의' })}
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-line text-sm text-ink-2 space-y-2">
                <div className="flex items-center gap-2"><Plane className="h-4 w-4 text-brand-blue" strokeWidth={2} /> {t({ mn: 'Нислэг багтсан', en: 'Flight included', kr: '항공권 포함' })}</div>
                <div className="flex items-center gap-2"><Check className="h-4 w-4 text-steppe" strokeWidth={2.5} /> {t({ mn: '24/7 дэмжлэг', en: '24/7 support', kr: '24시간 지원' })}</div>
                <div className="flex items-center gap-2"><Check className="h-4 w-4 text-steppe" strokeWidth={2.5} /> {t({ mn: 'Чөлөөтэй цуцлах', en: 'Free cancellation', kr: '무료 취소' })}</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-12 sm:py-12 sm:py-16 md:py-20 bg-bone">
          <div className="container-x">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-8">
              {t({ mn: 'Бусад төстэй аяллууд', en: 'Other trips you might like', kr: '추천 여행' })}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((tr) => <TripCard key={tr.id} trip={tr} full />)}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  )
}

function Fact({ icon, label, value }) {
  return (
    <div className="bg-bone rounded-xl p-4 ring-1 ring-line">
      <div className="flex items-center gap-2 text-brand-blue mb-2">{icon}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-ink-2">{label}</div>
      <div className="mt-0.5 font-display font-bold text-ink">{value}</div>
    </div>
  )
}
