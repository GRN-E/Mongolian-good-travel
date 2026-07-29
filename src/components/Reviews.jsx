import { reviews, ui } from '../data'
import { Star, Quote } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import { motion } from 'framer-motion'
import { Reveal, EASE } from './shared/motion'

const avatarColorMap = {
  sun: 'bg-sun text-white',
  sky: 'bg-sky text-white',
  clay: 'bg-clay text-white',
  plum: 'bg-plum text-white',
  steppe: 'bg-steppe text-white',
  brand: 'bg-brand-blue text-white',
}

export default function Reviews() {
  const t = useT()
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-white">
      <div className="container-x">
        <div className="text-center mb-12">
          <p className="eyebrow text-sun justify-center">{t(ui.ebReviews)}</p>
          <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-5xl text-ink">{t(ui.titleReviews)}</h2>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-ink-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-sun text-sun" />
              ))}
            </div>
            <span className="font-bold text-ink">4.9 / 5.0</span>
            <span>· {t(ui.ratingBased)}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => {
            const avatarCls = avatarColorMap[r.color] || avatarColorMap.brand
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                className="bg-bone rounded-2xl p-6 md:p-7 ring-1 ring-line relative hover:shadow-card transition-shadow duration-300"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-brand-blue/15" strokeWidth={1.5} />
                <div className="flex mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-sun text-sun" />
                  ))}
                </div>
                <p className="text-ink leading-relaxed text-[15px]">"{t(r.text)}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className={`h-11 w-11 rounded-full ${avatarCls} flex items-center justify-center font-display font-bold text-lg`}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-ink text-sm">{r.name}</div>
                    <div className="text-xs text-ink-2">{t(r.role)}</div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
