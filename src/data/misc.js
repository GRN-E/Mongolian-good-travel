// 📊 STATS, PILLARS, REVIEWS, STORIES
// Small data sets used in home page sections.

export const stats = [
  { value: '100+', label: { mn: 'Зохион байгуулсан аялал', en: 'Curated trips', kr: '진행한 여행' } },
  { value: '10+', label: { mn: 'Жилийн туршлага', en: 'Years on the road', kr: '연 운영 경력' } },
  { value: '95%', label: { mn: 'Сэтгэл ханамж', en: 'Satisfaction', kr: '만족도' } },
  { value: '24/7', label: { mn: 'Аяллын дэмжлэг', en: 'On-trip support', kr: '여행 중 지원' } },
]

export const pillars = [
  {
    icon: '🌍',
    title: { mn: 'Орон нутгийн мэдлэг', en: 'Local expertise', kr: '현지 전문성' },
    body: {
      mn: 'Тухайн орны соёл, хэл, замналыг сайн мэддэг туршлагатай гид нар таныг дагалдана.',
      en: 'Experienced guides who know the culture, language, and routes of each destination.',
      kr: '현지 문화와 언어, 코스를 잘 아는 경험 많은 가이드가 동행합니다.',
    },
  },
  {
    icon: '🛡️',
    title: { mn: 'Иж бүрэн үйлчилгээ', en: 'All-in-one service', kr: '올인원 서비스' },
    body: {
      mn: 'Виз, нислэг, буудал, даатгал, тээвэр — нэг л байгууллага, нэг л захиалга.',
      en: 'Visa, flights, hotel, insurance, transport — one company, one booking.',
      kr: '비자, 항공, 호텔, 보험, 교통 — 한 회사에서 한 번에 해결.',
    },
  },
  {
    icon: '💬',
    title: { mn: '24/7 дэмжлэг', en: '24/7 support', kr: '24시간 지원' },
    body: {
      mn: 'Аяллын турш бид таны хажууд. Шуурхай тусламж, шуурхай хариу.',
      en: 'We are by your side throughout the trip. Fast support, fast answers.',
      kr: '여행 내내 함께합니다. 신속한 지원과 빠른 응답.',
    },
  },
  {
    icon: '⭐',
    title: { mn: '10+ жилийн нэр хүнд', en: '10+ years of trust', kr: '10년 이상의 신뢰' },
    body: {
      mn: '10 гаруй жил, мянга мянган үйлчлүүлэгч — туршлага л итгэлийг бүтээдэг.',
      en: 'Over 10 years and thousands of guests — experience builds trust.',
      kr: '10년 이상의 경력과 수천 명의 고객 — 경험이 신뢰를 만듭니다.',
    },
  },
]

export const reviews = [
  {
    name: 'Б. Мөнхзул',
    role: { mn: 'Сөүл аяллын зочин', en: 'Seoul tour guest', kr: '서울 여행 고객' },
    text: {
      mn: 'Солонгос аялал маань маш сонирхолтой, зохион байгуулалт төгс байсан. Гид маань Солонгос хэлтэй, бүх асуудлыг шуурхай шийдэж байсан.',
      en: 'Our Korea trip was fascinating and perfectly organized. Our guide spoke Korean and handled every issue immediately.',
      kr: '한국 여행이 정말 흥미롭고 완벽하게 진행되었어요. 가이드가 한국어를 잘해서 모든 문제를 즉시 해결해 주셨습니다.',
    },
    rating: 5,
    avatar: 'M',
    color: 'sun',
  },
  {
    name: 'D. Erdene',
    role: { mn: 'Швейцарь Premium', en: 'Switzerland Premium', kr: '스위스 프리미엄' },
    text: {
      mn: 'Визээс эхлээд буудал хүртэл бүгдийг зохион байгуулж өгсөн. Альпийн хэсэг үнэхээр мартагдашгүй — дараа жил дахин MGT-тэй аялна.',
      en: 'From visa to hotel, everything was handled. The Alps part was unforgettable — we will travel with MGT again next year.',
      kr: '비자부터 호텔까지 모두 처리해 주셨어요. 알프스 일정은 잊지 못할 추억이에요 — 내년에도 MGT와 함께 여행할 거예요.',
    },
    rating: 5,
    avatar: 'E',
    color: 'sky',
  },
  {
    name: 'А. Алтанцэцэг',
    role: { mn: 'Говь-Хөвсгөл', en: 'Gobi & Khövsgöl', kr: '고비 & 훕스굴' },
    text: {
      mn: 'Дотоодын аялал ийм өндөр түвшинд зохион байгуулагдана гэж бодоогүй. Хоол, унаа, буудал бүгд маш сайн!',
      en: 'I did not expect a domestic trip to be organized at such a high level. Food, transport, and lodging were all excellent!',
      kr: '국내 여행이 이렇게 높은 수준으로 진행될 줄 몰랐어요. 음식, 교통, 숙소 모두 훌륭했습니다!',
    },
    rating: 5,
    avatar: 'А',
    color: 'clay',
  },
]

export const stories = [
  {
    category: { mn: 'Good Ideas', en: 'Good Ideas', kr: '좋은 아이디어' },
    title: {
      mn: 'Солонгосын өвөл — 4 өдөрт яаж их зүйл амжуулах вэ',
      en: 'Winter in Korea — how to do a lot in 4 days',
      kr: '한국의 겨울 — 4일 동안 알차게 보내는 법',
    },
    excerpt: {
      mn: 'Намрын төгсгөл, өвлийн эхэн — Солонгос орны хамгийн үзэсгэлэнт улирлыг бид яаж зохион байгуулдаг тухай.',
      en: 'Late autumn, early winter — how we organize trips during Korea is most scenic season.',
      kr: '늦가을부터 초겨울까지 — 한국이 가장 아름다운 계절을 우리가 어떻게 계획하는지 소개합니다.',
    },
    image: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?auto=format&fit=crop&w=900&q=80',
    accent: 'sky',
  },
  {
    category: { mn: 'Good Stories', en: 'Good Stories', kr: '좋은 이야기' },
    title: {
      mn: 'Говь дахь нэг үдэш — нүүдэлчдийн зочлох ёс',
      en: 'A night in the Gobi — nomadic hospitality',
      kr: '고비의 하룻밤 — 유목민의 환대',
    },
    excerpt: {
      mn: 'Манай гид Б.Болдын говь руу хийсэн сүүлийн аяллын тэмдэглэлээс. Адууны соёл, өвөг дээдсийн уламжлал.',
      en: 'Notes from our guide B. Bold is latest Gobi journey. Horse culture and ancestral traditions.',
      kr: '저희 가이드 B. 볼드의 최근 고비 여행 기록에서. 말 문화와 조상의 전통.',
    },
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=900&q=80',
    accent: 'clay',
  },
  {
    category: { mn: 'Партнёр', en: 'Partnership', kr: '파트너십' },
    title: {
      mn: 'Konkuk University Glocal Campus-тэй албан хамтын ажиллагаа',
      en: 'Official partnership with Konkuk University Glocal Campus',
      kr: '건국대학교 글로컬캠퍼스와의 공식 협력',
    },
    excerpt: {
      mn: 'Чунчжү хотод байрлах Konkuk University Glocal Campus-тэй MGT-ийн албан ёсны хамтын ажиллагааны тухай.',
      en: 'About MGT\'s official partnership with Konkuk University\'s Glocal Campus in Chungju.',
      kr: '충주에 있는 건국대학교 글로컬캠퍼스와 MGT의 공식 협력에 대해.',
    },
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80',
    accent: 'plum',
  },
]
