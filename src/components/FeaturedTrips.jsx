import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { trips, ui } from '../data'
import { Reveal } from './shared/motion'
import { useT } from '../i18n/LanguageContext'
import TripCard from './shared/TripCard'

export default function FeaturedTrips() {
  const t = useT()
  const scrollerRef = useRef(null)
  const scroll = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * 380, behavior: 'smooth' })
  }
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-x">
        <Reveal className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow text-brand-red">{t(ui.ebFeatured)}</p>
            <h2 className="h-display mt-4 text-4xl md:text-6xl text-ink">
              {(() => {
                const full = t(ui.titleFeatured)
                const acc = t(ui.titleFeaturedAccent)
                if (acc && full.includes(acc)) {
                  const [before, after] = full.split(acc)
                  return (<>{before}<span className="text-brand-red">{acc}</span>{after}</>)
                }
                return full
              })()}
            </h2>
            <p className="mt-4 text-ink-2 max-w-xl">{t(ui.bodyFeatured)}</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll(-1)} aria-label="Previous"
              className="h-11 w-11 rounded-full bg-bone hover:bg-brand-blue hover:text-white transition flex items-center justify-center">
              <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Next"
              className="h-11 w-11 rounded-full bg-bone hover:bg-brand-blue hover:text-white transition flex items-center justify-center">
              <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>
        </Reveal>
        <div ref={scrollerRef}
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-5 px-5">
          {trips.map((tr) => <TripCard key={tr.id} trip={tr} />)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/trips" className="btn-ghost">
            {t(ui.allTrips)} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
