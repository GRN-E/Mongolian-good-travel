import { Link } from 'react-router-dom'
import { Phone, Mail, ArrowUpRight } from 'lucide-react'
import { company, ui } from '../data'
import { useT } from '../i18n/LanguageContext'

export default function CTA() {
  const t = useT()
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-deep text-white px-7 py-14 md:px-16 md:py-20 lg:px-20 lg:py-24">
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-red/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sun/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow text-white/80">{t(ui.ebPlan)}</p>
              <h2 className="h-display mt-4 text-4xl md:text-5xl lg:text-6xl">
                {(() => {
                  const full = t(ui.titleCta)
                  const acc = t(ui.ctaAccent)
                  if (acc && full.includes(acc)) {
                    const [before, after] = full.split(acc)
                    return (<>{before}<span className="text-sun font-serif italic font-normal">{acc}</span>{after}</>)
                  }
                  return full
                })()}
              </h2>
              <p className="mt-5 max-w-lg text-white/85 leading-relaxed text-lg">{t(ui.bodyCta)}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={`tel:${company.phoneRaw}`} className="btn-white">
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                  {company.phone}
                </a>
                <a href={`mailto:${company.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition">
                  <Mail className="h-4 w-4" strokeWidth={2.5} />
                  {t(ui.emailUs)}
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 space-y-6">
              <div className="border-t border-white/15 pt-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/55">{t(ui.officeHours)}</div>
                <div className="mt-1.5 font-display font-semibold text-xl">{t(company.hours)}</div>
              </div>
              <div className="border-t border-white/15 pt-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/55">{t(ui.address)}</div>
                <div className="mt-1.5 font-display font-semibold text-xl">{t(company.address)}</div>
              </div>
              <Link to="/trips" className="inline-flex items-center gap-2 text-sm font-semibold border-b-2 border-white/40 hover:border-sun hover:text-sun transition pb-0.5">
                {t(ui.catalog)} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
