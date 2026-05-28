import { Link } from 'react-router-dom'
import { Star, Clock, MapPin, ArrowUpRight } from 'lucide-react'
import { ui } from '../../data'
import { useT, useLang, formatDays } from '../../i18n/LanguageContext'

const accentMap = {
  sun: 'bg-sun-soft text-clay border-sun/30',
  sky: 'bg-sky-soft text-sky border-sky/30',
  clay: 'bg-clay-soft text-clay border-clay/30',
  plum: 'bg-plum-soft text-plum border-plum/30',
  steppe: 'bg-steppe-soft text-steppe border-steppe/30',
  brand: 'bg-brand-blue-soft text-brand-blue border-brand-blue/30',
  'brand-red': 'bg-brand-red-soft text-brand-red border-brand-red/30',
}

export default function TripCard({ trip, full = false }) {
  const t = useT()
  const { lang } = useLang()
  const accent = accentMap[trip.accent] || accentMap.brand
  const hasSale = trip.priceWas && trip.priceWas > trip.priceFrom
  const savings = hasSale ? Math.round(((trip.priceWas - trip.priceFrom) / trip.priceWas) * 100) : 0

  return (
    <Link
      to={`/trips/${trip.slug}`}
      className={`group card-lift bg-white rounded-2xl overflow-hidden ring-1 ring-line shadow-card block ${
        full ? 'w-full' : 'snap-start shrink-0 w-[300px] md:w-[340px]'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        <img
          src={trip.image}
          alt={t(trip.title)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {hasSale && (
          <div className="absolute top-3 left-3 bg-brand-red text-white pill">
            -{savings}% {t(ui.saveDiscount)}
          </div>
        )}
        {trip.tag && !hasSale && (
          <div className={`absolute top-3 left-3 pill border ${accent}`}>{t(trip.tag)}</div>
        )}
      </div>
      <div className="p-5">
        <div className={`pill border ${accent} mb-3`}>{t(trip.type)}</div>
        <h3 className="font-display font-bold text-lg md:text-xl text-ink leading-snug min-h-[2.5em]">
          {t(trip.title)}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-2">
          <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          <span className="truncate">{t(trip.location)}</span>
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="star" />
            <span className="font-semibold text-ink">{trip.rating}</span>
            <span className="text-ink-2">({trip.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-ink-2">
            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{formatDays(trip.days, lang)}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-line flex items-end justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-ink-2">{t(ui.priceFrom)}</div>
            <div className="flex items-baseline gap-2">
              {hasSale && <span className="text-sm text-ink-2 line-through">${trip.priceWas}</span>}
              <span className="font-display font-bold text-2xl text-brand-red">${trip.priceFrom}</span>
            </div>
          </div>
          <span className="text-brand-blue text-xs font-bold group-hover:translate-x-1 transition inline-flex items-center gap-1">
            {t(ui.viewTrip)} <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
