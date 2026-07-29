import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { styles, ui } from '../data'
import { useT, useLang, formatTripsCount } from '../i18n/LanguageContext'
import { Reveal, EASE } from './shared/motion'

const bgMap = {
  sun: 'bg-sun-soft hover:bg-sun text-clay hover:text-white',
  sky: 'bg-sky-soft hover:bg-sky text-sky hover:text-white',
  clay: 'bg-clay-soft hover:bg-clay text-clay hover:text-white',
  plum: 'bg-plum-soft hover:bg-plum text-plum hover:text-white',
  steppe: 'bg-steppe-soft hover:bg-steppe text-steppe hover:text-white',
  'brand-blue': 'bg-brand-blue-soft hover:bg-brand-blue text-brand-blue hover:text-white',
  'brand-red': 'bg-brand-red-soft hover:bg-brand-red text-brand-red hover:text-white',
}

export default function ByStyle() {
  const t = useT()
  const { lang } = useLang()
  return (
    <section id="styles" className="py-14 sm:py-20 md:py-28 bg-bone">
      <div className="container-x">
        <Reveal className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow text-steppe">{t(ui.ebStyles)}</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-6xl text-ink">{t(ui.titleStyles)}</h2>
            <p className="mt-4 text-ink-2 max-w-xl">{t(ui.bodyStyles)}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {styles.map((s, i) => {
            const cls = bgMap[s.color] || bgMap['brand-blue']
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.07 }}
              >
                <Link
                  to={`/ways-to-travel/${s.slug}`}
                  className={`group block rounded-2xl p-5 md:p-6 h-full transition-all duration-300 ${cls}`}
                >
                  <motion.div
                    className="text-3xl md:text-4xl mb-3 inline-block"
                    whileHover={{ scale: 1.25, rotate: -8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    {s.icon}
                  </motion.div>
                  <div className="font-display font-bold text-lg md:text-xl leading-tight">{t(s.name)}</div>
                  <div className="mt-4 text-sm font-semibold inline-flex items-center gap-1.5">
                    {formatTripsCount(s.count, lang)}
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
