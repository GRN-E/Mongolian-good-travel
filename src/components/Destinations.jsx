import { Link } from 'react-router-dom'
import { destinations, ui } from '../data'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './shared/motion'
import { useT, useLang, formatTripsCount } from '../i18n/LanguageContext'

const overlayMap = {
  sun: 'from-clay/90', sky: 'from-sky/90', clay: 'from-clay/90',
  plum: 'from-plum/90', steppe: 'from-steppe/90', brand: 'from-brand-blue/90',
}

export default function Destinations() {
  const t = useT()
  const { lang } = useLang()
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-white">
      <div className="container-x">
        <Reveal className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow text-brand-blue">{t(ui.ebDestinations)}</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-6xl text-ink">{t(ui.titleDestinations)}</h2>
          </div>
          <Link to="/destinations" className="hidden md:inline-flex link-arrow text-brand-blue">
            {t(ui.allDest)} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {destinations.map((d, i) => {
            const overlay = overlayMap[d.accent] || overlayMap.brand
            const isWide = i === 0 || i === 5
            return (
              <Link
                key={d.slug}
                to={`/destinations/${d.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-line ${
                  isWide ? 'md:col-span-2 aspect-[4/3] md:aspect-[16/9]' : 'aspect-[3/4]'
                }`}
              >
                <img src={d.image} alt={t(d.name)}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy" />
                <div className={`absolute inset-0 bg-gradient-to-t ${overlay} via-black/20 to-transparent`} />
                {d.tag && <div className="absolute top-4 left-4 pill bg-white text-ink">{t(d.tag)}</div>}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                  <div className="text-[11px] uppercase tracking-[0.18em] opacity-80">{d.en}</div>
                  <div className="font-display font-bold text-2xl md:text-3xl mt-1">{t(d.name)}</div>
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
  )
}
