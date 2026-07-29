// 🎬 HERO CAROUSEL SLIDES
// The big rotating hero on the home page. 3-5 slides recommended.
// `image` should be a wide landscape photo (2000x1200 ideal).

export const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1538485399081-7c8970b73ee8?auto=format&fit=crop&w=2000&q=80',
    eyebrow: { mn: 'Featured · 2026 өвөл', en: 'Featured · 2026 Winter', kr: '추천 · 2026 겨울' },
    title: { mn: 'Өвлийн Солонгос орноор', en: 'Winter in South Korea', kr: '한국의 겨울 여행' },
    subtitle: {
      mn: 'Цас, гэрэлтсэн ордон, халуун рамен — өвлийн хамгийн дулаахан аялал.',
      en: 'Snow, lantern-lit palaces, hot ramen — the warmest winter trip.',
      kr: '눈과 화려한 궁궐, 따뜻한 라멘 — 가장 포근한 겨울 여행.',
    },
    ctaKey: 'heroCtaTrips',
    href: '/trips',
  },
  {
    image:
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=2000&q=80',
    eyebrow: { mn: 'Inbound · Монгол', en: 'Inbound · Mongolia', kr: '입국 · 몽골' },
    title: { mn: 'Говь — Хөвсгөл хосолсон', en: 'Gobi to Khövsgöl', kr: '고비에서 훕스굴까지' },
    subtitle: {
      mn: 'Их говийн элсэн манхан, Хөвсгөлийн усан толь — 10 өдрийн адал.',
      en: 'Gobi dunes and the mirror waters of Khövsgöl — a 10-day adventure.',
      kr: '고비의 모래언덕과 훕스굴의 잔잔한 호수 — 10일간의 모험.',
    },
    ctaKey: 'heroCtaRoute',
    href: '/destinations/mongolia',
  },
  {
    image:
      'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=2000&q=80',
    eyebrow: { mn: 'Premium · Европ', en: 'Premium · Europe', kr: '프리미엄 · 유럽' },
    title: { mn: 'Альпийн орнуудаар', en: 'Across the Alps', kr: '알프스를 가로지르다' },
    subtitle: {
      mn: 'Швейцарь, Итали, Франц — амьдралд нэг удаа гарах premium аялал.',
      en: 'Switzerland, Italy, France — a once-in-a-lifetime premium trip.',
      kr: '스위스, 이탈리아, 프랑스 — 인생 단 한 번의 프리미엄 여행.',
    },
    ctaKey: 'heroCtaPremium',
    href: '/trips',
  },
]
