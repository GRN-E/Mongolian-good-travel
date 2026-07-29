import { createContext, useContext, useEffect, useState } from 'react'

// Three supported languages
export const LANGS = [
  { code: 'mn', label: 'MN', name: 'Монгол' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'kr', label: '한', name: '한국어' },
]

const LangContext = createContext({ lang: 'mn', setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'mn'
    const saved = window.localStorage.getItem('mgt_lang')
    if (saved && LANGS.some((l) => l.code === saved)) return saved
    // Auto-detect from browser
    const nav = window.navigator.language?.toLowerCase() || ''
    if (nav.startsWith('ko')) return 'kr'
    if (nav.startsWith('en')) return 'en'
    return 'mn'
  })

  useEffect(() => {
    window.localStorage.setItem('mgt_lang', lang)
    document.documentElement.lang = lang === 'kr' ? 'ko' : lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

// useT() returns a function that resolves a translation object to current-lang string.
// Accepts strings (returned as-is), null/undefined (returned as ''),
// or { mn, en, kr } objects (returns the right key).
export function useT() {
  const { lang } = useLang()
  return (value) => {
    if (value == null) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'number') return String(value)
    return value[lang] ?? value.mn ?? value.en ?? value.kr ?? ''
  }
}

// Format helpers (for "N days", "N trips", etc. that vary by language)
export function formatDays(n, lang) {
  if (lang === 'en') return `${n} ${n === 1 ? 'day' : 'days'}`
  if (lang === 'kr') return `${n}일`
  return `${n} өдөр`
}
export function formatTripsCount(n, lang) {
  if (lang === 'en') return `${n} ${n === 1 ? 'trip' : 'trips'}`
  if (lang === 'kr') return `${n}개 여행`
  return `${n} аялал`
}
export function formatReviewsCount(n, lang) {
  if (lang === 'en') return `(${n})`
  if (lang === 'kr') return `(${n})`
  return `(${n})`
}
export function formatFromPrice(price, lang) {
  if (lang === 'en') return `From $${price}`
  if (lang === 'kr') return `$${price}부터`
  return `-ээс $${price}`
}
