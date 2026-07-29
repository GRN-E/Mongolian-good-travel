import { useEffect, useState } from 'react'
import { Menu, X, Phone, ChevronDown, Search, Heart, Check } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { company, nav, ui } from '../data'
import { useT, useLang, LANGS } from '../i18n/LanguageContext'

// Smart link: uses <Link> for /routes, <a> for external/hash
function SmartLink({ href, children, className, onClick }) {
  const isExternal = /^https?:\/\//.test(href)
  const isHash = href.startsWith('#')
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    )
  }
  if (isHash) {
    return <a href={href} className={className} onClick={onClick}>{children}</a>
  }
  return <Link to={href} className={className} onClick={onClick}>{children}</Link>
}

export default function Nav() {
  const t = useT()
  const { lang, setLang } = useLang()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hoverIdx, setHoverIdx] = useState(null)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setOpen(false)
    setHoverIdx(null)
    setLangOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!langOpen) return
    const close = () => setLangOpen(false)
    setTimeout(() => window.addEventListener('click', close, { once: true }), 0)
    return () => window.removeEventListener('click', close)
  }, [langOpen])

  return (
    <>
      <header
        onMouseLeave={() => setHoverIdx(null)}
        className={`sticky top-0 z-50 bg-white transition ${
          scrolled ? 'shadow-[0_1px_0_rgba(10,24,84,0.06)]' : ''
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6 py-4">
          <Link to="/" className="flex items-center" aria-label="Mongolian Good Travel">
            <img src="/logo.png" alt="Mongolian Good Travel" className="h-9 md:h-10 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item, idx) => {
              const active = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setHoverIdx(item.megaCols ? idx : null)}
                >
                  <SmartLink
                    href={item.href}
                    className={`inline-flex items-center gap-1 px-4 py-2 text-[15px] font-semibold transition ${
                      active ? 'text-brand-blue' : 'text-ink hover:text-brand-blue'
                    }`}
                  >
                    {t(item.label)}
                    {item.megaCols && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition ${hoverIdx === idx ? 'rotate-180' : ''}`}
                        strokeWidth={2.5}
                      />
                    )}
                  </SmartLink>
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-bone transition"
            >
              <Search className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              aria-label="Wishlist"
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-bone transition"
            >
              <Heart className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="hidden md:block relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 h-10 px-3 rounded-full text-sm font-bold text-ink hover:bg-bone transition"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <span className="text-base">🌐</span>
                {LANGS.find((l) => l.code === lang)?.label}
                <ChevronDown className={`h-3 w-3 transition ${langOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-card-hover ring-1 ring-line py-1.5 z-50">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code)
                        setLangOpen(false)
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-bone transition ${
                        lang === l.code ? 'text-brand-blue font-bold' : 'text-ink'
                      }`}
                    >
                      <span>{l.name}</span>
                      {lang === l.code && <Check className="h-4 w-4" strokeWidth={2.5} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" className="hidden md:inline-flex btn-primary py-2.5 px-5 text-[13px] ml-1">
              <span className="shine" />
              <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
              {t(ui.bookNow)}
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-bone"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {hoverIdx !== null && nav[hoverIdx]?.megaCols && (
          <div className="absolute inset-x-0 top-full bg-white border-t border-line shadow-lg">
            <div className="container-x grid grid-cols-4 gap-8 py-10">
              {nav[hoverIdx].megaCols.map((col, ci) => (
                <div key={ci}>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-blue mb-4">
                    {t(col.title)}
                  </div>
                  <ul className="space-y-2.5">
                    {col.items.map((it, ii) => (
                      <li key={ii}>
                        <SmartLink
                          href={it.href}
                          className="text-[15px] text-ink hover:text-brand-red transition"
                        >
                          {t(it.label)}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-white overflow-y-auto">
          <div className="container-x flex items-center justify-between py-4 border-b border-line">
            <Link to="/" onClick={() => setOpen(false)}>
              <img src="/logo.png" alt="MGT" className="h-9" />
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-bone"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
          <nav className="container-x flex flex-col py-6">
            {nav.map((item) => (
              <SmartLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 flex items-baseline justify-between"
              >
                <span className="font-display text-2xl font-bold text-ink">{t(item.label)}</span>
              </SmartLink>
            ))}

            <div className="mt-8">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-2 mb-3">
                🌐 Language
              </div>
              <div className="grid grid-cols-3 gap-2">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`py-3 rounded-xl font-bold text-sm transition ${
                      lang === l.code ? 'bg-brand-blue text-white' : 'bg-bone text-ink hover:bg-line'
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            <a href={`tel:${company.phoneRaw}`} className="mt-8 btn-primary w-full">
              <Phone className="h-4 w-4" strokeWidth={2.5} />
              {company.phone}
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
