import { Link } from 'react-router-dom'
import { Facebook, Youtube, Instagram, ArrowUpRight } from 'lucide-react'
import { company, nav, destinations, ui } from '../data'
import { useT } from '../i18n/LanguageContext'

export default function Footer() {
  const t = useT()
  return (
    <footer className="bg-brand-blue-deep text-white pt-20 pb-10">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-14 border-b border-white/10">
          <div className="lg:col-span-5">
            <Link to="/"><img src="/logo-white.png" alt="Mongolian Good Travel" className="h-12 w-auto" /></Link>
            <p className="mt-6 font-display text-xl md:text-2xl leading-snug max-w-md font-semibold">
              {(() => {
                const full = t(ui.footerTagline)
                const acc = t(ui.footerTaglineAccent)
                if (acc && full.includes(acc)) {
                  const [before, after] = full.split(acc)
                  return (<>{before}<span className="text-sun font-serif italic font-normal">{acc}</span>{after}</>)
                }
                return full
              })()}
            </p>
            <p className="mt-5 text-white/65 max-w-md leading-relaxed text-sm">{t(ui.footerAbout)}</p>
            <div className="mt-6 flex items-center gap-2">
              <Social href={company.social.facebook} Icon={Facebook} />
              <Social href={company.social.instagram} Icon={Instagram} />
              <Social href={company.social.youtube} Icon={Youtube} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <Title>{t(ui.menu)}</Title>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link to={n.href} className="text-sm text-white/70 hover:text-sun transition">{t(n.label)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <Title>{t(ui.destinations)}</Title>
            <ul className="space-y-3">
              {destinations.slice(0, 7).map((d) => (
                <li key={d.slug}>
                  <Link to={`/destinations/${d.slug}`} className="text-sm text-white/70 hover:text-sun transition">{t(d.name)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <Title>{t(ui.contact)}</Title>
            <a href={`tel:${company.phoneRaw}`} className="font-display font-bold text-2xl hover:text-sun transition block">{company.phone}</a>
            <a href={`mailto:${company.email}`} className="mt-2 text-sm text-white/75 hover:text-sun transition block">{company.email}</a>
            <div className="mt-3 text-sm text-white/60">{t(company.address)}</div>
            <div className="text-sm text-white/60">{t(company.hours)}</div>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6">
              <Title>{t(ui.newsletter)}</Title>
              <div className="flex items-stretch gap-0 rounded-full bg-white/10 ring-1 ring-white/15 focus-within:ring-sun overflow-hidden">
                <input type="email" required placeholder="name@email.com"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm placeholder:text-white/40 focus:outline-none" />
                <button type="submit" className="px-4 bg-sun text-brand-blue-deep hover:bg-white transition" aria-label="Subscribe">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} {company.legalName}. {t(ui.copyright)}.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">{t(ui.terms)}</a>
            <a href="#" className="hover:text-white">{t(ui.privacy)}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Title({ children }) {
  return <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 mb-5">{children}</div>
}
function Social({ href, Icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-sun hover:text-sun transition">
      <Icon className="h-4 w-4" strokeWidth={1.6} />
    </a>
  )
}
