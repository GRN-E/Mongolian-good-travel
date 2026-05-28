import { stories, ui } from '../data'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './shared/motion'
import { useT } from '../i18n/LanguageContext'

const tagColorMap = {
  sky: 'bg-sky-soft text-sky', sun: 'bg-sun-soft text-clay', clay: 'bg-clay-soft text-clay',
  steppe: 'bg-steppe-soft text-steppe', plum: 'bg-plum-soft text-plum',
  brand: 'bg-brand-blue-soft text-brand-blue',
}

export default function Stories() {
  const t = useT()
  return (
    <section className="py-20 md:py-28 bg-bone">
      <div className="container-x">
        <Reveal className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow text-plum">{t(ui.ebStories)}</p>
            <h2 className="h-display mt-4 text-4xl md:text-6xl text-ink">{t(ui.titleStories)}</h2>
            <p className="mt-4 text-ink-2 max-w-xl">{t(ui.bodyStories)}</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => {
            const tagCls = tagColorMap[s.accent] || tagColorMap.brand
            return (
              <a key={i} href="#" className="group card-lift bg-white rounded-2xl overflow-hidden ring-1 ring-line shadow-card block">
                <div className="relative aspect-[16/10] overflow-hidden bg-line">
                  <img src={s.image} alt={t(s.title)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy" />
                </div>
                <div className="p-6">
                  <div className={`pill ${tagCls} mb-3`}>{t(s.category)}</div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-ink leading-snug group-hover:text-brand-red transition">{t(s.title)}</h3>
                  <p className="mt-3 text-sm text-ink-2 leading-relaxed">{t(s.excerpt)}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                    {t(ui.readMore)} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
