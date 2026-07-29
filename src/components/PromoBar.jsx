import { useEffect, useState } from 'react'
import { promoMessages } from '../data'
import { useT } from '../i18n/LanguageContext'

export default function PromoBar() {
  const t = useT()
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % promoMessages.length), 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-brand-blue-deep text-white text-[12.5px]">
      <div className="container-x flex items-center justify-center gap-2 py-2 overflow-hidden">
        <div className="relative h-5 flex-1 max-w-3xl text-center">
          {promoMessages.map((m, idx) => (
            <span
              key={idx}
              className="absolute inset-0 flex items-center justify-center transition-all duration-500"
              style={{
                opacity: idx === i ? 1 : 0,
                transform: idx === i ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              {t(m)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
