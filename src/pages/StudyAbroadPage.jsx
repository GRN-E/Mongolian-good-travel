import { partners, company } from '../data'
import { useT } from '../i18n/LanguageContext'
import PageHero from '../components/shared/PageHero'
import CTA from '../components/CTA'
import { GraduationCap, Globe, MapPin, FileText, Plane, Home, Check, ExternalLink, Phone } from 'lucide-react'

export default function StudyAbroadPage() {
  const t = useT()
  const konkuk = partners.find((p) => p.slug === 'konkuk-glocal')

  return (
    <>
      <PageHero
        eyebrow={{ mn: '🎓 Сургууль зуучлал', en: '🎓 Study abroad', kr: '🎓 유학 상담' }}
        title={{
          mn: 'Konkuk University Glocal Campus',
          en: 'Konkuk University Glocal Campus',
          kr: '건국대학교 글로컬캠퍼스',
        }}
        subtitle={{
          mn: 'MGT — Konkuk Glocal Campus-ийн албан ёсны зуучлагч. Виз, бэлтгэл, оршин суух хүртэл бүх алхамд таныг дагалдана.',
          en: 'MGT is the official student placement partner for Konkuk Glocal Campus. From visa to housing — we guide you through every step.',
          kr: 'MGT는 건국대학교 글로컬캠퍼스의 공식 학생 파견 파트너입니다. 비자부터 숙소까지 모든 과정을 함께합니다.',
        }}
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: { mn: 'Сургууль зуучлал', en: 'Study abroad', kr: '유학 상담' } }]}
      />

      {/* Partnership badge */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-x">
          <div className="bg-gradient-to-br from-plum-soft to-white ring-1 ring-plum/20 rounded-3xl p-8 md:p-12">
            <div className="grid lg:grid-cols-[auto_1fr_auto] items-center gap-8">
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-2xl bg-plum text-white flex items-center justify-center shrink-0">
                <GraduationCap className="h-12 w-12 md:h-14 md:w-14" strokeWidth={1.4} />
              </div>
              <div>
                <div className="pill bg-plum text-white mb-3 inline-block">{t(konkuk.badge)}</div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">{konkuk.name}</h2>
                <p className="text-base text-ink-2 mt-1">
                  {konkuk.nameLocal} · {t(konkuk.location)}
                </p>
                <p className="mt-4 text-ink leading-relaxed max-w-2xl">{t(konkuk.description)}</p>
              </div>
              <a
                href={konkuk.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 rounded-full bg-plum text-white px-5 py-3 text-sm font-semibold hover:bg-plum/90 transition shrink-0"
              >
                {t({ mn: 'Албан вэбсайт', en: 'Official website', kr: '공식 웹사이트' })}
                <ExternalLink className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Konkuk Glocal */}
      <section className="py-16 md:py-20 bg-bone">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow text-plum">{t({ mn: 'Яагаад Konkuk Glocal Campus?', en: 'Why Konkuk Glocal Campus?', kr: '왜 건국대 글로컬캠퍼스?' })}</p>
            <h2 className="h-display mt-4 text-4xl md:text-5xl text-ink">
              {t({ mn: 'Глобал боловсрол, локал орчин', en: 'Global education, local setting', kr: '글로벌 교육, 로컬 환경' })}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Globe className="h-7 w-7" />,
                title: { mn: 'Олон улсын кампус', en: 'International campus', kr: '국제 캠퍼스' },
                body: { mn: '40+ улсаас оюутан суралцдаг.', en: 'Students from 40+ countries.', kr: '40개국 이상의 학생.' },
              },
              {
                icon: <MapPin className="h-7 w-7" />,
                title: { mn: 'Чүнжю хот', en: 'Chungju city', kr: '충주시' },
                body: {
                  mn: 'Сөүлээс 1.5 цаг — нам гүм, төсөвт нийцсэн оюутны хот.',
                  en: '1.5h from Seoul — quieter, more affordable student city.',
                  kr: '서울에서 1.5시간 — 조용하고 합리적인 학생 도시.',
                },
              },
              {
                icon: <FileText className="h-7 w-7" />,
                title: { mn: 'Виз дэмжлэг', en: 'Visa support', kr: '비자 지원' },
                body: { mn: 'D-2/D-4 виз бүрдүүлэх гарын авлага.', en: 'D-2/D-4 visa application support.', kr: 'D-2/D-4 비자 신청 지원.' },
              },
              {
                icon: <Home className="h-7 w-7" />,
                title: { mn: 'Оршин суух', en: 'Housing', kr: '숙소' },
                body: { mn: 'Кампус доторх дотуур байр зуучилна.', en: 'On-campus dormitory placement.', kr: '캠퍼스 내 기숙사 배정.' },
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 ring-1 ring-line">
                <div className="text-plum mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-lg text-ink leading-tight">{t(item.title)}</h3>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed">{t(item.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow text-brand-blue">{t({ mn: 'Үе шат', en: 'The process', kr: '진행 과정' })}</p>
            <h2 className="h-display mt-4 text-4xl md:text-5xl text-ink">
              {t({ mn: 'Та яаж бүртгүүлэх вэ?', en: 'How to apply', kr: '신청 방법' })}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden ring-1 ring-line">
            {[
              {
                n: '01',
                title: { mn: 'Зөвлөгөө', en: 'Consultation', kr: '상담' },
                body: { mn: 'MGT-тэй уулзаж, мэргэжил, төсвөө ярилц.', en: 'Meet MGT and discuss your major and budget.', kr: 'MGT와 만나 전공과 예산을 상담.' },
              },
              {
                n: '02',
                title: { mn: 'Бичиг баримт', en: 'Documents', kr: '서류 준비' },
                body: { mn: 'Аттестат, IELTS, өргөдөл бэлд.', en: 'Transcript, IELTS, application materials.', kr: '성적표, IELTS, 신청 서류 준비.' },
              },
              {
                n: '03',
                title: { mn: 'Виз', en: 'Visa', kr: '비자' },
                body: { mn: 'Konkuk-ээс admission ирсний дараа D-2 виз гаргуулна.', en: 'Once Konkuk admits you, apply for D-2 visa.', kr: '건국대 입학 허가 후 D-2 비자 신청.' },
              },
              {
                n: '04',
                title: { mn: 'Хүрэлцэн ирэх', en: 'Arrival', kr: '입국' },
                body: { mn: 'Чүнжю хүртэл тээвэр, дотуур байр.', en: 'Transport to Chungju + dorm check-in.', kr: '충주까지 교통편과 기숙사 입주.' },
              },
            ].map((p, i) => (
              <div key={i} className="bg-white p-6 md:p-8">
                <div className="font-display text-4xl font-bold text-plum">{p.n}</div>
                <h3 className="mt-3 font-display font-bold text-xl text-ink">{t(p.title)}</h3>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed">{t(p.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 md:py-20 bg-bone">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="eyebrow text-steppe">{t({ mn: 'Үйлчилгээнд багтсан', en: "What's included", kr: '서비스 포함' })}</p>
              <h2 className="h-display mt-4 text-4xl md:text-5xl text-ink">
                {t({ mn: 'MGT-ийн зуучлалын багц', en: 'MGT placement package', kr: 'MGT 유학 패키지' })}
              </h2>
              <p className="mt-5 text-lg text-ink-2 leading-relaxed">
                {t({
                  mn: 'Та зөвхөн суралцахад анхаарлаа төвлөрүүл — бусдыг бид хариуцна.',
                  en: 'You focus on studying — we handle the rest.',
                  kr: '공부에만 집중하세요 — 나머지는 저희가 처리합니다.',
                })}
              </p>
              <a href={`tel:${company.phoneRaw}`} className="mt-8 btn-primary inline-flex">
                <Phone className="h-4 w-4" strokeWidth={2.5} />
                {t({ mn: 'Үнэгүй зөвлөгөө авах', en: 'Free consultation', kr: '무료 상담 받기' })}
              </a>
            </div>

            <ul className="space-y-4">
              {[
                { mn: 'Их сургуулийн өргөдөл бэлтгэх', en: 'University application preparation', kr: '대학 지원서 작성 지원' },
                { mn: 'Бичиг баримтын орчуулга, нотариат', en: 'Document translation and notarization', kr: '서류 번역 및 공증' },
                { mn: 'IELTS бэлтгэлийн чиглүүлэг', en: 'IELTS preparation guidance', kr: 'IELTS 준비 안내' },
                { mn: 'D-2 студент виз бүрдүүлэх дэмжлэг', en: 'D-2 student visa application support', kr: 'D-2 학생 비자 지원' },
                { mn: 'Сөүл онгоцны буудлаас Чүнжю хүртэл тээвэр', en: 'Transport from Seoul airport to Chungju', kr: '인천공항에서 충주까지 교통편' },
                { mn: 'Дотуур байр зуучлах', en: 'On-campus dormitory placement', kr: '교내 기숙사 배정' },
                { mn: 'Анхны 2 долоо хоногт амьдрах удирдамж', en: 'First 2 weeks of on-arrival guidance', kr: '도착 후 2주간 정착 지원' },
                { mn: 'Суралцах хугацаанд тогтмол дэмжлэг', en: 'Ongoing support during your studies', kr: '학업 기간 지속적인 지원' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 ring-1 ring-line">
                  <span className="mt-0.5 shrink-0 h-6 w-6 rounded-full bg-steppe text-white flex items-center justify-center">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-ink">{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
