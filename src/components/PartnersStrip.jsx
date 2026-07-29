import { Link } from 'react-router-dom'
import { ArrowUpRight, GraduationCap } from 'lucide-react'
import { partners, partnerStrip, ui } from '../data'
import { useT } from '../i18n/LanguageContext'

export default function PartnersStrip() {
  const t = useT()
  const featured = partners.find((p) => p.featured)

  return (
    <section className="py-12 sm:py-12 sm:py-16 md:py-20 bg-bone">
      <div className="container-x">
        <div className="text-center mb-10">
          <p className="eyebrow text-plum justify-center">{t(ui.ebPartners)}</p>
        </div>

        {/* Featured partner card — Konkuk */}
        {featured && (
          <Link
            to={`/study-abroad`}
            className="group block bg-white rounded-2xl ring-1 ring-line shadow-card hover:shadow-card-hover transition p-6 md:p-8 mb-10"
          >
            <div className="grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-plum-soft text-plum flex items-center justify-center shrink-0">
                <GraduationCap className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.5} />
              </div>
              <div>
                <div className="pill bg-plum-soft text-plum mb-2">{t(featured.badge)}</div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-ink leading-tight">
                  {featured.name}
                </h3>
                <p className="text-sm text-ink-2 mt-1">
                  {featured.nameLocal} · {t(featured.location)}
                </p>
                <p className="mt-3 text-sm md:text-base text-ink-2 leading-relaxed max-w-2xl">
                  {t(featured.relationship)}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-brand-blue font-semibold text-sm whitespace-nowrap group-hover:text-brand-red transition">
                {t(ui.learnMore)} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        )}

        {/* Other partner names — simple logo strip placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {partnerStrip.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-white rounded-xl ring-1 ring-line px-4 py-5 text-center"
            >
              <span className="text-xs md:text-sm font-bold text-ink-2 uppercase tracking-wide">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
