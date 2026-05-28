// 🧭 NAVIGATION
// Top menu items. `href` is a route (starts with /), an anchor (#), or external (https://).

export const promoMessages = [
  {
    mn: '🎉 2026 оны өвлийн Солонгос аялал — 15% хүртэл хямдрал',
    en: '🎉 Winter 2026 Korea tours — up to 15% off',
    kr: '🎉 2026 겨울 한국 여행 — 최대 15% 할인',
  },
  {
    mn: '✈️ Виз болон даатгал багтсан иж бүрэн үйлчилгээ',
    en: '✈️ Visa and insurance included in every package',
    kr: '✈️ 비자 및 보험이 포함된 올인원 서비스',
  },
  {
    mn: '🌏 100+ маршрут · 10+ улс · 10 жилийн туршлага',
    en: '🌏 100+ routes · 10+ countries · 10 years of experience',
    kr: '🌏 100+개 코스 · 10+개국 · 10년 경력',
  },
  {
    mn: '🎓 Konkuk University Glocal Campus-тэй албан ёсны хамтын ажиллагаа',
    en: '🎓 Official partnership with Konkuk University Glocal Campus',
    kr: '🎓 건국대학교 글로컬캠퍼스 공식 협력',
  },
]

export const nav = [
  {
    label: { mn: 'Чиглэлүүд', en: 'Destinations', kr: '목적지' },
    href: '/destinations',
    megaCols: [
      {
        title: { mn: 'Зүүн Ази', en: 'East Asia', kr: '동아시아' },
        items: [
          { label: { mn: 'Солонгос', en: 'South Korea', kr: '한국' }, href: '/destinations/south-korea' },
          { label: { mn: 'Япон', en: 'Japan', kr: '일본' }, href: '/destinations/japan' },
          { label: { mn: 'Хятад', en: 'China', kr: '중국' }, href: '/destinations/china' },
          { label: { mn: 'Тайвань', en: 'Taiwan', kr: '대만' }, href: '/destinations/taiwan' },
        ],
      },
      {
        title: { mn: 'Зүүн өмнөд Ази', en: 'Southeast Asia', kr: '동남아시아' },
        items: [
          { label: { mn: 'Тайланд', en: 'Thailand', kr: '태국' }, href: '/destinations/thailand' },
          { label: { mn: 'Вьетнам', en: 'Vietnam', kr: '베트남' }, href: '/destinations/vietnam' },
          { label: { mn: 'Сингапур', en: 'Singapore', kr: '싱가포르' }, href: '/destinations/singapore' },
          { label: { mn: 'Индонез', en: 'Indonesia', kr: '인도네시아' }, href: '/destinations/indonesia' },
        ],
      },
      {
        title: { mn: 'Европ', en: 'Europe', kr: '유럽' },
        items: [
          { label: { mn: 'Швейцарь', en: 'Switzerland', kr: '스위스' }, href: '/destinations/switzerland' },
          { label: { mn: 'Итали', en: 'Italy', kr: '이탈리아' }, href: '/destinations/italy' },
          { label: { mn: 'Франц', en: 'France', kr: '프랑스' }, href: '/destinations/france' },
          { label: { mn: 'Турк', en: 'Turkey', kr: '터키' }, href: '/destinations/turkey' },
        ],
      },
      {
        title: { mn: 'Дотоод (Монгол)', en: 'Domestic (Mongolia)', kr: '몽골 국내' },
        items: [
          { label: { mn: 'Говь', en: 'Gobi', kr: '고비' }, href: '/destinations/mongolia#gobi' },
          { label: { mn: 'Хөвсгөл', en: 'Khövsgöl', kr: '훕스굴' }, href: '/destinations/mongolia#khovsgol' },
          { label: { mn: 'Алтай', en: 'Altai', kr: '알타이' }, href: '/destinations/mongolia#altai' },
          { label: { mn: 'Хархорин', en: 'Kharkhorin', kr: '카라코룸' }, href: '/destinations/mongolia#kharkhorin' },
        ],
      },
    ],
  },
  { label: { mn: 'Аяллын төрөл', en: 'Ways to travel', kr: '여행 스타일' }, href: '/ways-to-travel' },
  { label: { mn: 'Хямдрал', en: 'Deals', kr: '할인' }, href: '/deals' },
  { label: { mn: 'Сургууль зуучлал', en: 'Study Abroad', kr: '유학 상담' }, href: '/study-abroad' },
  { label: { mn: 'Бидний тухай', en: 'About', kr: '회사 소개' }, href: '/about' },
]
