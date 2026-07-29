// 🗺️ MONGOLIA TOURIST SITES + INTERNATIONAL GATEWAY CITIES
// Coordinates verified to OpenStreetMap. `country` must match a NAME value
// in /public/data/countries.geojson (e.g. 'Mongolia', 'South Korea', 'China').

export const mongoliaSites = [
  {
    slug: 'ulaanbaatar',
    icon: '🏙️',
    name: { mn: 'Улаанбаатар', en: 'Ulaanbaatar', kr: '울란바토르' },
    region: { mn: 'Нийслэл хот', en: 'Capital City', kr: '수도' },
    country: 'Mongolia',
    lat: 47.9077, lng: 106.8832,
    description: {
      mn: 'Монголын нийслэл, 1.5 сая хүн амтай. Сүхбаатарын талбай, Гандан хийд, Богд хааны өргөө, Зайсан толгой — бүгд эндээс эхэлдэг.',
      en: "Mongolia's capital, home to 1.5M people. Sükhbaatar Square, Gandan Monastery, the Bogd Khan Palace and Zaisan Hill — every trip starts here.",
      kr: '몽골의 수도, 인구 150만. 수흐바타르 광장, 간단사, 복드 칸 궁전, 자이산 언덕 — 모든 여행이 여기서 시작됩니다.',
    },
    isCapital: true,
  },
  {
    slug: 'terelj',
    icon: '🐢',
    name: { mn: 'Тэрэлж', en: 'Terelj', kr: '테렐지' },
    region: { mn: 'Үндэсний цэцэрлэгт хүрээлэн', en: 'National Park', kr: '국립공원' },
    country: 'Mongolia',
    lat: 47.8050, lng: 107.4260,
    description: {
      mn: 'УБ-аас 2 цагт хүрэх ойр амралт. Мэлхий хад, 40 м өндөр Чингис хааны морьт хөшөө, морин аялал.',
      en: 'A 2-hour escape from UB. Turtle Rock, the 40m Chinggis Khaan equestrian statue, horseback trails.',
      kr: '울란바토르에서 2시간 거리. 거북바위, 40m 칭기즈칸 기마상, 승마 코스.',
    },
  },
  {
    slug: 'kharkhorin',
    icon: '🛕',
    name: { mn: 'Хархорин', en: 'Kharkhorin', kr: '카라코룸' },
    region: { mn: 'Эртний нийслэл', en: 'Ancient Capital', kr: '옛 수도' },
    country: 'Mongolia',
    lat: 47.1967, lng: 102.8246,
    description: {
      mn: '1235 онд Өгөдэй хааны байгуулсан Монгол Эзэнт Гүрний нийслэл. Эрдэнэ-Зуу хийд, UNESCO дурсгал.',
      en: "Founded by Ögedei Khan in 1235 as the Mongol Empire's capital. Erdene Zuu monastery and UNESCO heritage site.",
      kr: '1235년 오고타이 칸이 세운 몽골 제국의 수도. 에르덴 주 사원과 유네스코 문화유산.',
    },
  },
  {
    slug: 'khovsgol',
    icon: '💧',
    name: { mn: 'Хөвсгөл нуур', en: 'Lake Khövsgöl', kr: '훕스굴 호수' },
    region: { mn: '“Хөх сувд”', en: 'The Blue Pearl', kr: '“푸른 진주”' },
    country: 'Mongolia',
    lat: 51.0270, lng: 100.4520,
    description: {
      mn: 'Монголын хамгийн том цэнгэг устай нуур, 262 м гүн. Тайгын ой, цаатан ястан, морин аялал.',
      en: "Mongolia's largest freshwater lake, 262m deep. Taiga forests, the Tsaatan reindeer people, horse trails.",
      kr: '몽골에서 가장 큰 담수호, 깊이 262m. 타이가 숲, 차탕족(순록 유목민), 승마 코스.',
    },
  },
  {
    slug: 'dalanzadgad',
    icon: '✈️',
    name: { mn: 'Даланзадгад', en: 'Dalanzadgad', kr: '달란자드가드' },
    region: { mn: 'Говийн орох үүд', en: 'Gateway to the Gobi', kr: '고비 관문' },
    country: 'Mongolia',
    lat: 43.5708, lng: 104.4250,
    description: {
      mn: 'Өмнөговь аймгийн төв, говь руу хийгдэх ихэнх аяллын эхлэлийн цэг. Онгоцны буудалтай.',
      en: 'Capital of Ömnögovi province. The launch point for nearly every Gobi trip — has its own airport.',
      kr: '우문고비 아이막의 중심. 거의 모든 고비 여행의 출발지이자 자체 공항 보유.',
    },
  },
  {
    slug: 'khongoryn-els',
    icon: '🐪',
    name: { mn: 'Хонгорын элс', en: 'Khongoryn Els', kr: '홍고린엘스' },
    region: { mn: 'Дуулдаг манхан', en: 'Singing Dunes', kr: '노래하는 사구' },
    country: 'Mongolia',
    lat: 43.7670, lng: 102.2500,
    description: {
      mn: 'Говийн хамгийн том элсэн манхан — 100 км урт, 300 м өндөр. Салхинд элс дуу гаргадаг учир “дуулдаг манхан”.',
      en: "The Gobi's largest dunes — 100 km long, 300 m tall. The sand 'sings' in the wind, giving the dunes their name.",
      kr: '고비 최대 사구 — 길이 100 km, 높이 300 m. 바람에 모래가 “노래”한다 하여 이런 이름.',
    },
  },
  {
    slug: 'bayanzag',
    icon: '🦖',
    name: { mn: 'Баянзаг', en: 'Bayanzag', kr: '바얀작' },
    region: { mn: 'Улаан хадан хад', en: 'Flaming Cliffs', kr: '플레이밍 클리프' },
    country: 'Mongolia',
    lat: 44.1389, lng: 103.7283,
    description: {
      mn: '1922 онд Рой Чапман Эндрюс анх удаа динозаврын өндөг олсон газар. Нар жаргах үед улаан хадан үнэхээр шатдаг шиг.',
      en: 'Where Roy Chapman Andrews first discovered dinosaur eggs in 1922. The red sandstone literally appears to flame at sunset.',
      kr: '1922년 로이 채프먼 앤드루스가 공룡 알을 처음 발견한 곳. 해 질 녘 붉은 사암이 불타듯 빛납니다.',
    },
  },
  {
    slug: 'tsagaan-suvarga',
    icon: '🪨',
    name: { mn: 'Цагаан Суварга', en: 'Tsagaan Suvarga', kr: '차강 수바르가' },
    region: { mn: 'Цагаан хад', en: 'White Stupa', kr: '하얀 절벽' },
    country: 'Mongolia',
    lat: 44.6000, lng: 105.7500,
    description: {
      mn: '60 м өндөр, 400 м урт цагаан өнгөтэй хадан хана. Эртний далай ёроол байсан тул чулуунд хөшсөн зүйлс олдог.',
      en: '60 m tall, 400 m wide cliff of pure white limestone. Once an ancient sea floor — fossils are still found here.',
      kr: '높이 60m, 길이 400m의 새하얀 석회암 절벽. 고대 해저였던 곳이라 화석이 발견됩니다.',
    },
  },
  {
    slug: 'altai-tavan-bogd',
    icon: '🏔️',
    name: { mn: 'Алтай Таван Богд', en: 'Altai Tavan Bogd', kr: '알타이 타반복드' },
    region: { mn: 'Таван Ариун Оргил', en: 'Five Sacred Peaks', kr: '오성봉' },
    country: 'Mongolia',
    lat: 49.1431, lng: 87.8222,
    description: {
      mn: 'Монгол, Орос, Хятад гурвын хил уулзах хамгийн өндөр уулс. 4 374 м Хүйтэн орхил, мөстлөгүүд, казах бүргэдээр анчид.',
      en: 'Where Mongolia, Russia and China meet. 4,374 m Khüiten Peak, active glaciers, Kazakh eagle hunters.',
      kr: '몽골·러시아·중국 국경이 만나는 곳. 4,374m 휘텐 봉우리, 빙하, 카자흐 검독수리 사냥꾼.',
    },
  },
  {
    slug: 'khorgo-terkhiin',
    icon: '🌋',
    name: { mn: 'Хорго-Тэрх', en: 'Khorgo–Terkhiin Lake', kr: '호르고–테르히 차강호' },
    region: { mn: 'Галт уулын нуур', en: 'Volcanic Lake', kr: '화산호' },
    country: 'Mongolia',
    lat: 48.1670, lng: 99.8670,
    description: {
      mn: 'Хорго галт уул 8 000 жилийн өмнө дэлбэрсэн, лаавны урсгал Тэрхийн Цагаан нуурыг бүтээсэн. Нарс ой, тунгалаг ус.',
      en: 'The Khorgo volcano erupted 8,000 years ago — the lava flow created Terkhiin Tsagaan Lake. Pine forests, crystal water.',
      kr: '8천 년 전 호르고 화산 폭발로 용암이 흘러 테르히 차강호가 생성. 소나무 숲과 맑은 호수.',
    },
  },
  {
    slug: 'orkhon-waterfall',
    icon: '💦',
    name: { mn: 'Орхоны хүрхрээ', en: 'Orkhon Waterfall', kr: '오르혼 폭포' },
    region: { mn: 'UNESCO хөндий', en: 'UNESCO Valley', kr: '유네스코 계곡' },
    country: 'Mongolia',
    lat: 46.7919, lng: 101.9636,
    description: {
      mn: 'Орхоны хөндийд орших 20 м өндөр хүрхрээ. UNESCO-гийн соёлын дурсгалт хөндийн зүрх.',
      en: 'A 20m waterfall in the Orkhon Valley — the heart of the UNESCO cultural landscape that includes Kharkhorin.',
      kr: '오르혼 계곡의 20m 폭포 — 카라코룸을 포함한 유네스코 문화 경관의 중심.',
    },
  },
]

export const gatewayCities = [
  {
    slug: 'seoul',
    icon: '✈️', name: { mn: 'Сөүл', en: 'Seoul', kr: '서울' },
    region: { mn: 'Шууд нислэг · Солонгос', en: 'Direct flight · South Korea', kr: '직항 · 한국' },
    country: 'South Korea', lat: 37.5665, lng: 126.9780,
    description: {
      mn: 'Инчон болон Кимпо буудлаас өдөр бүр Улаанбаатар хүртэл шууд нислэг үйлчилдэг. ~3 цаг 30 мин.',
      en: 'Daily direct flights from Incheon and Gimpo airports to Ulaanbaatar. ~3h 30min.',
      kr: '인천·김포공항에서 울란바토르까지 매일 직항 운항. 약 3시간 30분.',
    },
    isGateway: true,
  },
  {
    slug: 'busan',
    icon: '✈️', name: { mn: 'Бусан', en: 'Busan', kr: '부산' },
    region: { mn: 'Шууд нислэг · Солонгос', en: 'Direct flight · South Korea', kr: '직항 · 한국' },
    country: 'South Korea', lat: 35.1796, lng: 129.0756,
    description: {
      mn: 'Бусан-Улаанбаатарын шууд нислэг улирлын чанартай. ~3 цаг 45 мин.',
      en: 'Seasonal direct flights between Busan and Ulaanbaatar. ~3h 45min.',
      kr: '부산–울란바토르 계절 직항편 운항. 약 3시간 45분.',
    },
    isGateway: true,
  },
  {
    slug: 'jeju',
    icon: '✈️', name: { mn: 'Чеджү', en: 'Jeju', kr: '제주' },
    region: { mn: 'Чартер нислэг · Солонгос', en: 'Charter flight · South Korea', kr: '전세기 · 한국' },
    country: 'South Korea', lat: 33.4996, lng: 126.5312,
    description: {
      mn: 'MGT-ийн зохион байгуулдаг чартер нислэгээр Чеджү руу. Зуны улирлын онцлох багц.',
      en: 'MGT organizes charter flights to Jeju. A summer-season signature package.',
      kr: 'MGT가 운영하는 제주행 전세기. 여름철 시그니처 패키지.',
    },
    isGateway: true,
  },
  {
    slug: 'beijing',
    icon: '✈️', name: { mn: 'Бээжин', en: 'Beijing', kr: '베이징' },
    region: { mn: 'Шууд нислэг · Хятад', en: 'Direct flight · China', kr: '직항 · 중국' },
    country: 'China', lat: 39.9042, lng: 116.4074,
    description: {
      mn: 'Бээжингээс УБ хүртэл өдөр бүр шууд нислэг. ~2 цаг 30 мин.',
      en: 'Daily direct flights from Beijing to UB. ~2h 30min.',
      kr: '베이징에서 울란바토르까지 매일 직항. 약 2시간 30분.',
    },
    isGateway: true,
  },
  {
    slug: 'tokyo',
    icon: '✈️', name: { mn: 'Токио', en: 'Tokyo', kr: '도쿄' },
    region: { mn: 'Шууд нислэг · Япон', en: 'Direct flight · Japan', kr: '직항 · 일본' },
    country: 'Japan', lat: 35.6762, lng: 139.6503,
    description: {
      mn: 'Нарита болон Ханэдагаас Улаанбаатар хүртэл шууд нислэг. ~5 цаг 30 мин.',
      en: 'Direct flights from Narita and Haneda to Ulaanbaatar. ~5h 30min.',
      kr: '나리타·하네다에서 울란바토르까지 직항. 약 5시간 30분.',
    },
    isGateway: true,
  },
  {
    slug: 'saigon',
    icon: '✈️', name: { mn: 'Сайгон', en: 'Ho Chi Minh City', kr: '호치민' },
    region: { mn: 'Шилжүүлэг · Вьетнам', en: 'Transit hub · Vietnam', kr: '경유 · 베트남' },
    country: 'Vietnam', lat: 10.8231, lng: 106.6297,
    description: {
      mn: 'Вьетнамын хамгийн том хот, Зүүн өмнөд Азийн нислэгийн төв. Бээжин эсвэл Сөүлээр дамжуулан Улаанбаатар.',
      en: "Vietnam's largest city and SE-Asia hub. Connect via Beijing or Seoul to Ulaanbaatar.",
      kr: '베트남 최대 도시이자 동남아 허브. 베이징 또는 서울 경유로 울란바토르까지.',
    },
    isGateway: true,
  },
]

// Country name labels shown on the globe (HTML — supports all languages).
// Positioned at approximate visual centroids.
export const countryLabels = [
  { name: { mn: 'Монгол', en: 'Mongolia', kr: '몽골' }, lat: 46.9, lng: 103.5, key: 'Mongolia', emphasis: 'mn' },
  { name: { mn: 'Өмнөд Солонгос', en: 'South Korea', kr: '한국' }, lat: 36.4, lng: 127.8, key: 'South Korea', emphasis: 'kr' },
  { name: { mn: 'Хятад', en: 'China', kr: '중국' }, lat: 35.0, lng: 103.0, key: 'China' },
  { name: { mn: 'Япон', en: 'Япон', kr: '일본' }, lat: 37.5, lng: 138.5, key: 'Japan' },
  { name: { mn: 'Орос', en: 'Russia', kr: '러시아' }, lat: 56.0, lng: 96.0, key: 'Russia' },
  { name: { mn: 'Вьетнам', en: 'Vietnam', kr: '베트남' }, lat: 15.5, lng: 107.5, key: 'Vietnam' },
]
