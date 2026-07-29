// 🌍 DESTINATIONS
// Each destination becomes a page at /destinations/{slug}
// `image` is shown on tiles and as the page hero — use 900–2000px landscape.

export const destinations = [
  {
    slug: 'south-korea',
    name: { mn: 'Солонгос', en: 'South Korea', kr: '한국' },
    en: 'South Korea',
    trips: 18,
    image: 'https://images.unsplash.com/photo-1538485399081-7c8970b73ee8?auto=format&fit=crop&w=2000&q=80',
    accent: 'sun',
    intro: {
      mn: 'Сөүлийн орчин үеийн соёл, Бусаны далай, Чеджү арлын байгаль, Андон-Кёнжүгийн түүх — Солонгос орон таныг хүлээж байна.',
      en: 'Seoul\'s modern culture, Busan\'s coast, Jeju Island\'s nature, Andong-Gyeongju\'s history — South Korea has it all.',
      kr: '서울의 현대 문화, 부산의 해안, 제주도의 자연, 안동·경주의 역사 — 한국이 당신을 기다립니다.',
    },
    highlights: [
      { mn: 'Сөүл — Gyeongbokgung ордон, Hongdae', en: 'Seoul — Gyeongbokgung palace, Hongdae', kr: '서울 — 경복궁, 홍대' },
      { mn: 'Бусан — Haeundae далай, дарханы зах', en: 'Busan — Haeundae beach, fish market', kr: '부산 — 해운대 해변, 수산시장' },
      { mn: 'Чеджү — галт уулын байгаль, шарсан гахайн махан', en: 'Jeju — volcanic landscapes, black pork', kr: '제주 — 화산 지형, 흑돼지' },
      { mn: 'Кёнжү — UNESCO дурсгал', en: 'Gyeongju — UNESCO heritage', kr: '경주 — 유네스코 문화유산' },
    ],
  },
  {
    slug: 'mongolia',
    name: { mn: 'Монгол', en: 'Mongolia', kr: '몽골' },
    en: 'Mongolia',
    trips: 24,
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=2000&q=80',
    accent: 'clay',
    tag: { mn: 'Inbound', en: 'Inbound', kr: '입국 여행' },
    intro: {
      mn: 'Бид Монгол улсын мэргэшсэн inbound тур оператор. Говийн элс, Хөвсгөлийн ой, Алтайн өндөрлөг — таны мөрөөдлийн Монгол.',
      en: 'We are Mongolia\'s licensed inbound tour operator. Gobi dunes, Khövsgöl forests, Altai highlands — the Mongolia of your dreams.',
      kr: '저희는 몽골의 공식 인바운드 여행사입니다. 고비 사구, 훕스굴의 숲, 알타이 고원 — 꿈의 몽골.',
    },
    highlights: [
      { mn: 'Говь — Хонгорын элс, Ёлын ам', en: 'Gobi — Khongoryn Els dunes, Yolyn Am', kr: '고비 — 홍고린엘스 사구, 욜린암' },
      { mn: 'Хөвсгөл — “Хөх сувд” нуур', en: 'Khövsgöl — the “Blue Pearl” lake', kr: '훕스굴 — “푸른 진주” 호수' },
      { mn: 'Хархорин — эртний нийслэл', en: 'Kharkhorin — the ancient capital', kr: '카라코룸 — 옛 수도' },
      { mn: 'Тэрэлж — Улаанбаатараас 2 цаг', en: 'Terelj — 2 hours from Ulaanbaatar', kr: '테렐지 — 울란바토르에서 2시간' },
    ],
  },
  {
    slug: 'japan',
    name: { mn: 'Япон', en: 'Japan', kr: '일본' },
    en: 'Japan',
    trips: 12,
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=2000&q=80',
    accent: 'brand',
    intro: {
      mn: 'Токиогийн өдөр шөнөгүй амьдрал, Киотогийн уламжлал, Осакагийн хоол — Япон бол хязгааргүй илрэл.',
      en: 'Tokyo\'s round-the-clock life, Kyoto\'s tradition, Osaka\'s food scene — Japan is endless discovery.',
      kr: '도쿄의 24시간 삶, 교토의 전통, 오사카의 음식 — 일본은 끝없는 발견.',
    },
    highlights: [
      { mn: 'Токио — Shibuya, Asakusa, Akihabara', en: 'Tokyo — Shibuya, Asakusa, Akihabara', kr: '도쿄 — 시부야, 아사쿠사, 아키하바라' },
      { mn: 'Киото — Fushimi Inari, Arashiyama', en: 'Kyoto — Fushimi Inari, Arashiyama', kr: '교토 — 후시미 이나리, 아라시야마' },
      { mn: 'Осака — Dotonbori, Universal Studios', en: 'Osaka — Dotonbori, Universal Studios', kr: '오사카 — 도톤보리, 유니버설 스튜디오' },
      { mn: 'Хирошима — Itsukushima', en: 'Hiroshima — Itsukushima', kr: '히로시마 — 이쓰쿠시마' },
    ],
  },
  {
    slug: 'thailand',
    name: { mn: 'Тайланд', en: 'Thailand', kr: '태국' },
    en: 'Thailand',
    trips: 9,
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2000&q=80',
    accent: 'sky',
    intro: {
      mn: 'Дулаан, царайлаг, хямд — Тайланд бол анхны гадаад аяллын төгс сонголт.',
      en: 'Warm, friendly, affordable — Thailand is the perfect first international trip.',
      kr: '따뜻하고, 친절하고, 합리적인 — 태국은 첫 해외여행에 완벽한 선택.',
    },
    highlights: [
      { mn: 'Бангкок — Grand Palace, Khao San Road', en: 'Bangkok — Grand Palace, Khao San Road', kr: '방콕 — 왕궁, 카오산로드' },
      { mn: 'Пхүкет — Patong, Phi Phi арлууд', en: 'Phuket — Patong, Phi Phi islands', kr: '푸켓 — 빠통, 피피섬' },
      { mn: 'Чианг Май — уулын соёл, заан', en: 'Chiang Mai — mountain culture, elephants', kr: '치앙마이 — 산악 문화, 코끼리' },
    ],
  },
  {
    slug: 'switzerland',
    name: { mn: 'Швейцарь', en: 'Switzerland', kr: '스위스' },
    en: 'Switzerland',
    trips: 6,
    image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=2000&q=80',
    accent: 'steppe',
    intro: {
      mn: 'Альпийн уулс, цэвэр нуурууд, Glacier Express — Швейцарь бол премиум аяллын алтан стандарт.',
      en: 'The Alps, pristine lakes, the Glacier Express — Switzerland is the gold standard for premium travel.',
      kr: '알프스, 깨끗한 호수, 글래시어 익스프레스 — 스위스는 프리미엄 여행의 황금 기준.',
    },
    highlights: [
      { mn: 'Цермат — Маттерхорн уул', en: 'Zermatt — the Matterhorn', kr: '체르마트 — 마터호른' },
      { mn: 'Интерлакен — Jungfrau бүс', en: 'Interlaken — Jungfrau region', kr: '인터라켄 — 융프라우 지역' },
      { mn: 'Луцерн — нуур, Chapel Bridge', en: 'Lucerne — lake, Chapel Bridge', kr: '루체른 — 호수, 카펠 다리' },
    ],
  },
  {
    slug: 'italy',
    name: { mn: 'Итали', en: 'Italy', kr: '이탈리아' },
    en: 'Italy',
    trips: 7,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=80',
    accent: 'plum',
    intro: {
      mn: 'Ром, Венец, Флоренц — урлаг, хоол, түүхийн орон Итали.',
      en: 'Rome, Venice, Florence — Italy is art, food, and history.',
      kr: '로마, 베네치아, 피렌체 — 예술, 음식, 역사의 나라 이탈리아.',
    },
    highlights: [
      { mn: 'Ром — Colosseum, Vatican', en: 'Rome — Colosseum, Vatican', kr: '로마 — 콜로세움, 바티칸' },
      { mn: 'Венец — суваг, гондола', en: 'Venice — canals, gondolas', kr: '베네치아 — 운하, 곤돌라' },
      { mn: 'Флоренц — Renaissance урлаг', en: 'Florence — Renaissance art', kr: '피렌체 — 르네상스 예술' },
    ],
  },
  {
    slug: 'france',
    name: { mn: 'Франц', en: 'France', kr: '프랑스' },
    en: 'France',
    trips: 5,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80',
    accent: 'brand',
    intro: {
      mn: 'Парисын урлаг, Прованс-ын лаванда, Лазурын далайн эрэг — Франц бол романтикийн орон.',
      en: 'Parisian art, Provence lavender, Riviera coastline — France is the country of romance.',
      kr: '파리의 예술, 프로방스의 라벤더, 리비에라 해안 — 프랑스는 낭만의 나라.',
    },
    highlights: [
      { mn: 'Парис — Eiffel, Louvre', en: 'Paris — Eiffel, Louvre', kr: '파리 — 에펠탑, 루브르' },
      { mn: 'Нийс — Лазурын далай', en: 'Nice — French Riviera', kr: '니스 — 프렌치 리비에라' },
      { mn: 'Прованс — лаванда тариа', en: 'Provence — lavender fields', kr: '프로방스 — 라벤더 밭' },
    ],
  },
  {
    slug: 'indonesia',
    name: { mn: 'Индонез', en: 'Indonesia', kr: '인도네시아' },
    en: 'Indonesia',
    trips: 5,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2000&q=80',
    accent: 'sun',
    intro: {
      mn: 'Балигийн ариун сүмүүд, далайн усанд шумбах, амтлаг хоол — Индонез бол арлуудын ертөнц.',
      en: 'Bali temples, snorkelling, spicy food — Indonesia is a world of islands.',
      kr: '발리의 사원, 스노클링, 매콤한 음식 — 인도네시아는 섬의 세계.',
    },
    highlights: [
      { mn: 'Бали — Ubud, Seminyak', en: 'Bali — Ubud, Seminyak', kr: '발리 — 우붓, 스미냑' },
      { mn: 'Жакарта — нийслэл хот', en: 'Jakarta — the capital', kr: '자카르타 — 수도' },
      { mn: 'Гили арлууд — далайн усанд шумбах', en: 'Gili Islands — diving', kr: '길리 제도 — 다이빙' },
    ],
  },
]
