// 🤝 PARTNERS
// Organizations MGT collaborates with. Featured on home + /study-abroad page.
// Konkuk Glocal Campus is the lead partner (Chungju, South Korea).

export const partners = [
  {
    slug: 'konkuk-glocal',
    name: 'Konkuk University Glocal Campus',
    nameLocal: '건국대학교 글로컬캠퍼스',
    location: { mn: 'Чүнжю хот, БНСУ', en: 'Chungju, South Korea', kr: '충청북도 충주시, 대한민국' },
    description: {
      mn: 'Konkuk University-ийн дэд кампус. “Glocal” буюу global + local үзэл санааг тээгч, олон улсын оюутны хөтөлбөртэй.',
      en: 'Konkuk University\'s secondary campus. Built on the "Glocal" (global + local) idea, with active international student programs.',
      kr: '건국대학교의 글로컬캠퍼스. “글로벌+로컬” 철학에 기반한 활발한 국제 학생 프로그램 운영.',
    },
    relationship: {
      mn: 'MGT Konkuk Glocal Campus-тэй албан ёсны зуучлалын гэрээтэй. Бид Монгол оюутнуудыг кампус руу бэлдэн илгээх онцгой эрхтэй.',
      en: 'MGT has an official placement agreement with Konkuk Glocal Campus. We are authorized to prepare and place Mongolian students at the campus.',
      kr: 'MGT는 건국대학교 글로컬캠퍼스와 공식 학생 파견 협약을 맺고 있습니다. 몽골 학생을 캠퍼스로 준비·파견할 수 있는 공식 권한을 보유합니다.',
    },
    badge: { mn: 'Албан хамтрагч', en: 'Official partner', kr: '공식 파트너' },
    featured: true,
    // Konkuk Glocal Campus official site
    website: 'https://glocal.konkuk.ac.kr/',
    color: 'plum',
    // Optional: drop a real logo at /public/partners/konkuk.png and switch this path
    logo: null,
  },
  // Add more partners by following the same shape. Examples to add later:
  // - Korean Air / Mongolian Airlines
  // - Hotel chains
  // - Insurance providers
]

// Light partner-logo strip on the home page.
// `name` is a plain label shown if no `logo` image is provided.
export const partnerStrip = [
  { name: 'Konkuk Glocal Campus', logo: null, accent: 'plum' },
  { name: 'Korean Air', logo: null, accent: 'sky' },
  { name: 'MIAT Mongolian Airlines', logo: null, accent: 'brand-red' },
  { name: 'Air Busan', logo: null, accent: 'sky' },
  { name: 'TK Insurance', logo: null, accent: 'steppe' },
  { name: 'Mongolia Tourism Assoc.', logo: null, accent: 'sun' },
]
