import { stats, ui } from '../data'
import { useT } from '../i18n/LanguageContext'
import { Reveal, Stagger, StaggerItem, CountUp } from './shared/motion'

const colors = ['text-brand-red', 'text-brand-blue', 'text-steppe', 'text-sun']

export default function TrustStrip() {
  const t = useT()
  return (
    <section className="bg-white pt-16 md:pt-20">
      <div className="container-x">
        <Reveal className="text-center mb-10">
          <p className="eyebrow text-brand-blue justify-center">{t(ui.ebWhyMgt)}</p>
          <h2 className="h-display mt-4 text-3xl md:text-5xl text-ink">{t(ui.titleTrust)}</h2>
        </Reveal>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden ring-1 ring-line">
          {stats.map((s, i) => (
            <StaggerItem key={i} className="bg-white p-6 md:p-8 text-center group">
              <div className={`font-display font-bold text-5xl md:text-6xl ${colors[i]} leading-none tracking-tightest transition-transform duration-300 group-hover:scale-105`}>
                <CountUp value={s.value} />
              </div>
              <div className="mt-3 text-sm font-semibold text-ink">{t(s.label)}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
