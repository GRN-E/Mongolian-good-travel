import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Calendar, Users, Sparkles } from 'lucide-react'
import { heroSlides, ui } from '../data'
import { useT } from '../i18n/LanguageContext'
import { EASE } from './shared/motion'

export default function Hero() {
  const t = useT()
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 6500)
    return () => clearInterval(id)
  }, [])

  const slide = heroSlides[i]

  return (
    <section id="top" className="relative">
      <div className="relative h-[560px] sm:h-[620px] md:h-[720px] overflow-hidden">
        {heroSlides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
              idx === i ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={idx !== i}
          >
            <img
              src={s.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover scale-105"
              style={{
                transform: idx === i ? 'scale(1)' : 'scale(1.06)',
                transition: 'transform 7s ease-out',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-deep/40 via-brand-blue-deep/20 to-brand-blue-deep/85" />
          </div>
        ))}

        <div className="relative h-full container-x flex flex-col justify-end pb-32 sm:pb-40 md:pb-52">
          <div className="max-w-3xl text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] mb-5 ring-1 ring-white/20">
                  <Sparkles className="h-3.5 w-3.5 animate-softpulse" strokeWidth={2} />
                  {t(slide.eyebrow)}
                </div>
                <h1 className="h-display text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-[5.5rem] text-white">
                  {t(slide.title)}
                </h1>
                <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                  {t(slide.subtitle)}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={slide.href} className="btn-primary">
                <span className="shine" />
                {t(ui[slide.ctaKey])}
              </Link>
              <Link to="/contact" className="btn-white">
                {t(ui.freeConsult)}
              </Link>
            </div>
          </div>

          <div className="absolute bottom-32 right-5 sm:bottom-40 sm:right-6 md:bottom-52 md:right-12 flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1 rounded-full transition-all ${
                  idx === i ? 'bg-white w-8' : 'bg-white/40 w-4 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        className="container-x relative -mt-16 sm:-mt-20 md:-mt-28 z-10"
      >
        <SearchWidget />
      </motion.div>
    </section>
  )
}

function SearchWidget() {
  const t = useT()
  return (
    <div className="bg-white rounded-2xl shadow-card-hover p-3 md:p-4 ring-1 ring-line/60">
      <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-2 md:gap-1">
        <Field
          icon={<MapPin className="h-4 w-4 text-brand-red" strokeWidth={2.2} />}
          label={t(ui.whereTo)}
          input={
            <select className="w-full bg-transparent text-[15px] font-medium text-ink focus:outline-none cursor-pointer">
              <option>{t(ui.allDestinations)}</option>
              <option>{t({ mn: 'Солонгос', en: 'South Korea', kr: '한국' })}</option>
              <option>{t({ mn: 'Монгол (Inbound)', en: 'Mongolia (Inbound)', kr: '몽골 (입국)' })}</option>
              <option>{t({ mn: 'Япон', en: 'Japan', kr: '일본' })}</option>
              <option>{t({ mn: 'Тайланд', en: 'Thailand', kr: '태국' })}</option>
              <option>{t({ mn: 'Европ', en: 'Europe', kr: '유럽' })}</option>
            </select>
          }
        />
        <Field
          icon={<Calendar className="h-4 w-4 text-brand-blue" strokeWidth={2.2} />}
          label={t(ui.when)}
          input={
            <input
              type="date"
              className="w-full bg-transparent text-[15px] font-medium text-ink focus:outline-none cursor-pointer"
            />
          }
        />
        <Field
          icon={<Calendar className="h-4 w-4 text-brand-blue" strokeWidth={2.2} />}
          label={t(ui.howLong)}
          input={
            <select className="w-full bg-transparent text-[15px] font-medium text-ink focus:outline-none cursor-pointer">
              <option>{t(ui.anyDuration)}</option>
              <option>{t(ui.d1_3)}</option>
              <option>{t(ui.d4_7)}</option>
              <option>{t(ui.d8_14)}</option>
              <option>{t(ui.d14plus)}</option>
            </select>
          }
        />
        <Field
          icon={<Users className="h-4 w-4 text-steppe" strokeWidth={2.2} />}
          label={t(ui.travellers)}
          input={
            <select className="w-full bg-transparent text-[15px] font-medium text-ink focus:outline-none cursor-pointer">
              <option>{t(ui.p2)}</option>
              <option>{t(ui.p3_5)}</option>
              <option>{t(ui.p6_10)}</option>
              <option>{t(ui.p10plus)}</option>
            </select>
          }
        />
        <button className="bg-brand-red text-white rounded-xl px-6 py-4 font-semibold inline-flex items-center justify-center gap-2 hover:bg-brand-red/90 active:scale-[0.98] transition">
          <Search className="h-4 w-4" strokeWidth={2.5} />
          {t(ui.search)}
        </button>
      </div>
    </div>
  )
}

function Field({ icon, label, input }) {
  return (
    <label className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-bone transition cursor-pointer">
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-2 mb-0.5">
          {label}
        </div>
        {input}
      </div>
    </label>
  )
}
