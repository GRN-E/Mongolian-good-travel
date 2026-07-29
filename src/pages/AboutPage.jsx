import { stats, pillars, reviews, company } from '../data'
import { useT } from '../i18n/LanguageContext'
import PageHero from '../components/shared/PageHero'
import CTA from '../components/CTA'
import { Star, Quote, Phone } from 'lucide-react'

const colors = ['text-brand-red', 'text-brand-blue', 'text-steppe', 'text-sun']
const avatarColorMap = {
  sun: 'bg-sun text-white', sky: 'bg-sky text-white', clay: 'bg-clay text-white',
  plum: 'bg-plum text-white', steppe: 'bg-steppe text-white', brand: 'bg-brand-blue text-white',
}

export default function AboutPage() {
  const t = useT()
  return (
    <>
      <PageHero
        eyebrow={{ mn: 'Бидний тухай', en: 'About us', kr: '회사 소개' }}
        title={{ mn: 'Mongolian Good Travel', en: 'Mongolian Good Travel', kr: 'Mongolian Good Travel' }}
        subtitle={{
          mn: '10 гаруй жилийн турш Монголын аяллын салбарт бид мянга мянган үйлчлүүлэгчид жинхэнэ, мартагдашгүй туршлагыг бэлэглэсэн.',
          en: 'For over 10 years we have given thousands of guests real, unforgettable experiences in the Mongolian travel industry.',
          kr: '10년 이상 몽골 여행 업계에서 수천 명의 고객에게 진정한 여행 경험을 선사해 왔습니다.',
        }}
        image="https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: { mn: 'Бидний тухай', en: 'About', kr: '회사 소개' } }]}
      />

      {/* Story */}
      <section className="py-12 sm:py-12 sm:py-16 md:py-24 bg-white">
        <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-line">
              <img src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80"
                alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow text-brand-red">{t({ mn: 'Бидний түүх', en: 'Our story', kr: '회사 이야기' })}</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-5xl text-ink">
              {t({ mn: 'Жинхэнэ аяллын үнэлэмж', en: 'A genuine sense of travel', kr: '진정한 여행의 가치' })}
            </h2>
            <p className="mt-6 text-lg text-ink-2 leading-relaxed">
              {t({
                mn: 'Mongolian Good Travel-ийг 2014 онд Улаанбаатар хотноо үүсгэн байгуулсан. Зорилго нь нэг л — Монголчуудад дэлхийн хамгийн сайн аяллын туршлагыг бэлэглэх, гадаадын жуулчдад Монгол орны үнэт өвийг танилцуулах.',
                en: 'Mongolian Good Travel was founded in 2014 in Ulaanbaatar. The mission was simple — bring the best travel experiences in the world to Mongolians, and introduce Mongolia\'s priceless heritage to international guests.',
                kr: 'Mongolian Good Travel은 2014년 울란바토르에서 설립되었습니다. 단 하나의 목표 — 몽골인들에게 세계 최고의 여행 경험을, 국제 손님들에게는 몽골의 귀중한 유산을 소개하는 것입니다.',
              })}
            </p>
            <p className="mt-4 text-ink-2 leading-relaxed">
              {t({
                mn: 'Өнөөдөр бид 100+ маршрут, 10+ улсад тогтмол үйл ажиллагаа явуулдаг. Бид зөвхөн зорьсон газар хүргэдэггүй — аяллын баяр баясгаланг хуваалцдаг.',
                en: 'Today we operate 100+ routes across 10+ countries. We do not just take you somewhere — we share the joy of travel.',
                kr: '오늘날 우리는 10개국 이상에서 100개 이상의 코스를 운영하고 있습니다. 단순한 안내가 아닌, 여행의 기쁨을 함께 나눕니다.',
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-12 sm:py-16 md:py-20 bg-bone">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden ring-1 ring-line">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-6 md:p-10 text-center">
                <div className={`font-display font-bold text-5xl md:text-7xl ${colors[i]} leading-none tracking-tightest`}>
                  {s.value}
                </div>
                <div className="mt-3 text-sm font-semibold text-ink">{t(s.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-12 sm:py-12 sm:py-16 md:py-20 bg-white">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="eyebrow text-brand-red justify-center">{t({ mn: 'Бидний үнэт зүйл', en: 'Our values', kr: '우리의 가치' })}</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-5xl text-ink">
              {t({ mn: 'Юу биднийг ялгаруулдаг вэ', en: 'What sets us apart', kr: '우리의 차별점' })}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <div key={i} className="bg-bone rounded-2xl p-6 ring-1 ring-line">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-display font-bold text-lg text-ink leading-tight">{t(p.title)}</h3>
                <p className="mt-3 text-sm text-ink-2 leading-relaxed">{t(p.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 sm:py-12 sm:py-16 md:py-20 bg-bone">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="eyebrow text-sun justify-center">{t({ mn: 'Үйлчлүүлэгчдийн үг', en: 'What our guests say', kr: '고객의 목소리' })}</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-5xl text-ink">
              {t({ mn: '500+ зочны итгэл', en: 'Trusted by 500+ guests', kr: '500+ 고객의 신뢰' })}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((r, i) => {
              const avatarCls = avatarColorMap[r.color] || avatarColorMap.brand
              return (
                <article key={i} className="bg-white rounded-2xl p-6 md:p-7 ring-1 ring-line relative">
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-brand-blue/15" strokeWidth={1.5} />
                  <div className="flex mb-4">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-sun text-sun" />
                    ))}
                  </div>
                  <p className="text-ink leading-relaxed text-[15px]">"{t(r.text)}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-full ${avatarCls} flex items-center justify-center font-display font-bold text-lg`}>
                      {r.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-ink text-sm">{r.name}</div>
                      <div className="text-xs text-ink-2">{t(r.role)}</div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
