import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { useT } from '../../i18n/LanguageContext'
import { ui } from '../../data'

export default function PageHero({ eyebrow, title, subtitle, image, breadcrumbs = [] }) {
  const t = useT()
  return (
    <section className="relative">
      <div className="relative h-[360px] md:h-[480px] overflow-hidden bg-brand-blue-deep">
        {image && (
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-deep/30 via-brand-blue-deep/50 to-brand-blue-deep/85" />
        <div className="relative h-full container-x flex flex-col justify-end pb-12 md:pb-16 text-white">
          {/* Breadcrumbs */}
          <nav className="text-[11px] uppercase tracking-[0.18em] mb-5 flex items-center gap-2 text-white/70" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-sun inline-flex items-center gap-1">
              <Home className="h-3 w-3" strokeWidth={2.2} />
              {t(ui.backHome)}
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <ChevronRight className="h-3 w-3" strokeWidth={2.2} />
                {b.href ? (
                  <Link to={b.href} className="hover:text-sun">
                    {t(b.label)}
                  </Link>
                ) : (
                  <span className="text-white">{t(b.label)}</span>
                )}
              </span>
            ))}
          </nav>
          {eyebrow && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] mb-4 ring-1 ring-white/20">
              {t(eyebrow)}
            </div>
          )}
          <h1 className="h-display text-4xl md:text-6xl lg:text-7xl">{t(title)}</h1>
          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
              {t(subtitle)}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
