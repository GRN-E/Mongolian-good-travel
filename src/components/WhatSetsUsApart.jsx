import { motion } from 'framer-motion'
import { pillars, ui } from '../data'
import { ArrowUpRight } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import { Reveal, EASE } from './shared/motion'

export default function WhatSetsUsApart() {
  const t = useT()
  return (
    <section id="about" className="py-14 sm:py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-line"
            >
              <img
                src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80"
                alt="" className="h-full w-full object-cover" loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              className="absolute -bottom-5 right-2 sm:-right-6 md:-right-10 bg-white rounded-2xl shadow-card-hover p-4 sm:p-5 max-w-[240px] sm:max-w-xs ring-1 ring-line"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-sun-soft text-sun flex items-center justify-center text-2xl animate-floaty">⭐</div>
                <div>
                  <div className="font-display font-bold text-xl text-ink">4.9 / 5.0</div>
                  <div className="text-xs text-ink-2">{t({ mn: '500+ үнэлгээ', en: '500+ reviews', kr: '500+ 리뷰' })}</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow text-brand-red">{t(ui.ebApart)}</p>
              <h2 className="h-display mt-4 text-3xl sm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink">{t(ui.titleApart)}</h2>
              <p className="mt-5 text-lg text-ink-2 leading-relaxed">{t(ui.bodyApart)}</p>
            </Reveal>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                  className="group bg-white rounded-2xl p-5 ring-1 ring-line hover:ring-brand-blue/30 transition-all duration-300 hover:shadow-card"
                >
                  <motion.div
                    className="text-3xl mb-3 inline-block"
                    whileHover={{ scale: 1.2, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    {p.icon}
                  </motion.div>
                  <div className="font-display font-bold text-lg text-ink leading-tight">{t(p.title)}</div>
                  <p className="mt-2.5 text-sm text-ink-2 leading-relaxed">{t(p.body)}</p>
                </motion.div>
              ))}
            </div>

            <a href="#contact" className="mt-10 inline-flex link-arrow text-brand-red">
              {t(ui.ourStory)} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
