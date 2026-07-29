import { trips } from '../data'
import { useT } from '../i18n/LanguageContext'
import PageHero from '../components/shared/PageHero'
import TripCard from '../components/shared/TripCard'
import CTA from '../components/CTA'

export default function DealsPage() {
  const t = useT()
  const dealTrips = trips.filter((tr) => tr.priceWas && tr.priceWas > tr.priceFrom)

  return (
    <>
      <PageHero
        eyebrow={{ mn: '🎉 Тусгай хямдрал', en: '🎉 Special offers', kr: '🎉 특가 상품' }}
        title={{ mn: 'Хямдралтай аяллууд', en: 'Trips on sale', kr: '할인 여행' }}
        subtitle={{
          mn: 'Цаг хязгаартай хямдрал. Эдгээр тусгай үнүүд хязгаарлагдмал хугацаатай.',
          en: 'Limited-time discounts. These special prices are available for a short window.',
          kr: '한정 기간 할인. 이 특별 가격은 짧은 기간 동안만 제공됩니다.',
        }}
        image="https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: { mn: 'Хямдрал', en: 'Deals', kr: '할인' } }]}
      />

      <section className="py-12 sm:py-12 sm:py-16 md:py-20 bg-bone">
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {dealTrips.map((tr) => <TripCard key={tr.id} trip={tr} full />)}
          </div>
          {dealTrips.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">💰</div>
              <p className="text-lg text-ink-2">
                {t({ mn: 'Одоогоор идэвхтэй хямдрал алга. Тун удахгүй!', en: 'No active deals right now. Coming soon!', kr: '현재 진행 중인 할인이 없습니다. 곧 시작됩니다!' })}
              </p>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  )
}
