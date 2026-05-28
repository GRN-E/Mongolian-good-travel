import { Link } from 'react-router-dom'
import { company, ui } from '../data'
import { useT } from '../i18n/LanguageContext'
import PageHero from '../components/shared/PageHero'
import { Phone, Mail, MapPin, Clock, Send, ArrowLeft } from 'lucide-react'

export function ContactPage() {
  const t = useT()
  return (
    <>
      <PageHero
        eyebrow={{ mn: 'Холбоо барих', en: 'Contact', kr: '연락처' }}
        title={{ mn: 'Бидэнтэй холбогдоорой', en: 'Get in touch', kr: '문의하기' }}
        subtitle={{
          mn: 'Утсаар, имэйлээр эсвэл доорх маягтыг бөглөж бидэнд хүсэлтээ илгээ.',
          en: 'Call us, email us, or fill out the form below.',
          kr: '전화, 이메일 또는 아래 양식을 통해 문의해 주세요.',
        }}
        image="https://images.unsplash.com/photo-1538485399081-7c8970b73ee8?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: { mn: 'Холбоо барих', en: 'Contact', kr: '연락처' } }]}
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container-x grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            <a href={`tel:${company.phoneRaw}`} className="block bg-bone rounded-2xl p-6 ring-1 ring-line hover:ring-brand-red transition group">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                  <Phone className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-2">{t({ mn: 'Утас', en: 'Phone', kr: '전화' })}</div>
                  <div className="font-display font-bold text-xl text-ink mt-1">{company.phone}</div>
                  <div className="text-sm text-ink-2 mt-1">{t(company.hours)}</div>
                </div>
              </div>
            </a>
            <a href={`mailto:${company.email}`} className="block bg-bone rounded-2xl p-6 ring-1 ring-line hover:ring-brand-blue transition group">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                  <Mail className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-2">{t({ mn: 'Имэйл', en: 'Email', kr: '이메일' })}</div>
                  <div className="font-display font-bold text-xl text-ink mt-1">{company.email}</div>
                  <div className="text-sm text-ink-2 mt-1">{t({ mn: '24 цагийн дотор хариу өгнө', en: 'Reply within 24 hours', kr: '24시간 이내 응답' })}</div>
                </div>
              </div>
            </a>
            <div className="bg-bone rounded-2xl p-6 ring-1 ring-line">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-steppe text-white flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-2">{t(ui.address)}</div>
                  <div className="font-display font-bold text-xl text-ink mt-1">{t(company.address)}</div>
                </div>
              </div>
            </div>
            <div className="bg-bone rounded-2xl p-6 ring-1 ring-line">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-sun text-white flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-2">{t(ui.officeHours)}</div>
                  <div className="font-display font-bold text-xl text-ink mt-1">{t(company.hours)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                const subject = encodeURIComponent(`MGT Inquiry — ${data.get('name')}`)
                const body = encodeURIComponent(
                  `Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nDestination: ${data.get('destination')}\n\n${data.get('message')}`
                )
                window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
              }}
              className="bg-bone rounded-2xl p-6 md:p-8 ring-1 ring-line space-y-5"
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
                {t({ mn: 'Маягт бөглөх', en: 'Send us a message', kr: '메시지 보내기' })}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field name="name" label={t({ mn: 'Нэр', en: 'Name', kr: '이름' })} required />
                <Field name="email" type="email" label={t({ mn: 'Имэйл', en: 'Email', kr: '이메일' })} required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field name="phone" type="tel" label={t({ mn: 'Утас', en: 'Phone', kr: '전화' })} />
                <Field name="destination" label={t({ mn: 'Сонирхож буй чиглэл', en: 'Destination', kr: '관심 목적지' })} placeholder="Korea, Mongolia, ..." />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-2 block mb-1.5">
                  {t({ mn: 'Зурвас', en: 'Message', kr: '메시지' })}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-white rounded-xl border border-line px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-y"
                  placeholder={t({
                    mn: 'Хэдэн хүн, хэзээ, төсөв... дэлгэрэнгүй бичээрэй',
                    en: 'Group size, dates, budget... share your details',
                    kr: '인원, 일정, 예산 등 자세히 알려주세요',
                  })}
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send className="h-4 w-4" strokeWidth={2.5} />
                {t({ mn: 'Илгээх', en: 'Send', kr: '보내기' })}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ name, label, type = 'text', required, placeholder }) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-2 block mb-1.5">
        {label}{required && ' *'}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white rounded-xl border border-line px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
      />
    </div>
  )
}

export function NotFoundPage() {
  const t = useT()
  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="container-x text-center">
        <div className="text-7xl md:text-9xl font-display font-bold text-brand-blue tracking-tightest">404</div>
        <h1 className="mt-6 h-display text-3xl md:text-5xl text-ink">{t(ui.notFoundTitle)}</h1>
        <p className="mt-4 text-ink-2 max-w-md mx-auto">{t(ui.notFoundBody)}</p>
        <Link to="/" className="mt-8 btn-primary inline-flex">
          <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          {t(ui.backHome)}
        </Link>
      </div>
    </section>
  )
}
