export const site = {
  name: '四維夜市',
  /** 官方全稱（對應 Google 地圖地點名稱） */
  fullName: '臺東市四維夜市',
  /** 常用簡稱，也是網域名稱對應的含義 */
  shortName: '四維夜市',
  alternateNames: ['臺東四維夜市', '四維路夜市', 'Siwei Night Market'],
  category: '夜市',
  domain: 'SiweiNightMarket.com',
  url: 'https://siweinightmarket.com',
  description: '每週日限定的台東四維夜市怎麼玩？整理營業時間（約 18:00–22:30）、10 個必吃美食攤位與逛吃順序、四維路底位置導航、汽機車停車與交通，以及海濱公園周邊順遊行程。',
  /** 首頁與全站預設的 SEO 標題（以實際搜尋用語「台東」在前） */
  seoTitle: '台東四維夜市｜每週日限定！營業時間、必吃美食與停車交通指南',
  city: '臺東市',
  state: '臺東縣',
  country: '臺灣',
  countryCode: 'TW',
  postalCode: '950',
  /** Google 地圖地點頁登錄地址 */
  streetAddress: '四維路一段464巷',
  googleAddress: '950 臺東縣臺東市四維路一段464巷',
  latitude: 22.7543813,
  longitude: 121.1605317,
  mapUrl: 'https://www.google.com/maps/place/%E5%9B%9B%E7%BB%B4%E5%A4%9C%E5%B8%82/@22.7543813,121.1605317,17z/data=!3m1!4b1!4m6!3m5!1s0x346fb9470bc452a5:0x8f11a8e4579483e8!8m2!3d22.7543813!4d121.1605317!16s%2Fg%2F11g_g0cyl?authuser=0&hl=zh-CN&entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D',
  /** Google 地圖分享短連結 */
  mapsShareUrl: 'https://maps.app.goo.gl/tTzJq5528HNALb9C9',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.2963379084986!2d121.16053169999999!3d22.754381300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346fb9470bc452a5%3A0x8f11a8e4579483e8!2z5Zub57u05aSc5biC!5e0!3m2!1szh-CN!2stw!4v1785326243474!5m2!1szh-CN!2stw',
  officialNoticeUrl: 'https://www.facebook.com/100064769170713/',
  /** 當地政府／官方觀光旅遊入口 */
  govtTourismUrl: 'https://tour.taitung.gov.tw/',
  govtTourismLabel: '臺東縣政府觀光旅遊網',
  ga4: 'G-HXM22WWPKP'
} as const;

/** 周邊核心地標（語義集群用） */
export const nearbyLandmarks = [
  { name: '台東海濱公園', note: '看海與拍照的傍晚據點，也是前往四維路底前確認停車的好位置。' },
  { name: 'TAITUNG 英文字母地標', note: '四維路底最易辨認的地標，導航時可比對它確認方向是否正確。' }
] as const;

/**
 * Google 地圖評分與評價數。
 * 僅供頁面展示使用，不寫入 JSON-LD（避免第三方評論被包裝為本站自己的 AggregateRating）。
 */
export const googleRating = {
  ratingValue: 4,
  ratingText: '4.0',
  reviewCount: 5401,
  reviewCountText: '5,401',
  category: '夜市',
  syncedAt: '2026 年 9 月',
  sourceLabel: '谷歌地圖（Google Maps）用戶評價',
  /** 評分與評價數來源小字（首頁評分下方） */
  inlineNote: '評分與評價數同步自谷歌地圖（Google Maps）用戶評價 · 2026 年 9 月 · ',
  inlineLinkText: '點擊查看谷歌地圖全部評價↗',
  /** 評價區塊來源說明 */
  sourceNote: '同步自 Google 地圖用戶評價，同步時間 2026 年 9 月；版權歸原作者與 Google 地圖所有',
  ctaText: '在谷歌地圖查看全部評價',
  url: 'https://maps.app.goo.gl/tTzJq5528HNALb9C9'
} as const;

/**
 * Google 地圖公開評價的歸納重點。
 * 為主題摘要，非逐字轉載個別評論；實際評論請至 Google 地圖查看。
 */
export const reviewHighlights = [
  { theme: '在地生活型夜市', summary: '評價多把四維夜市描述成偏向在地人的週日夜市，小吃、遊戲與生活雜貨並存，觀光客比例相對不高。' },
  { theme: '週日限定與人潮', summary: '因為只在週日營業，熱門時段人潮集中，評價常建議提早抵達、預留排隊時間。' },
  { theme: '停車與動線', summary: '停車位置與進場動線是影響體驗的關鍵，多篇評價提醒先找好停車再進場。' },
  { theme: '遊戲攤與親子', summary: '套圈圈、射氣球、彈珠台等傳統遊戲讓親子家庭停留更久，是常見的加分項目。' },
  { theme: '天候與出攤', summary: '露天場地受天候影響，雨勢與海風會影響出攤數和逛街舒適度。' }
] as const;

export const visitFacts = [
  { label: '營業日', value: '每週日' },
  { label: '建議抵達', value: '18:00–19:00' },
  { label: '常見時段', value: '約 18:00–22:30' },
  { label: '建議停留', value: '約 1–2 小時' },
  { label: '入場方式', value: '免費入場' },
  { label: '適合對象', value: '親子・朋友・情侶' }
] as const;

/**
 * 例行營業時間。
 * 供結構化資料（openingHoursSpecification）與頁面展示使用；
 * 露天流動夜市實際開收仍受天候與當週公告影響，不以此保證當週一定開市。
 */
export const openingHours = {
  /** schema.org DayOfWeek */
  dayOfWeek: 'https://schema.org/Sunday',
  dayLabel: '每週日',
  opens: '18:00',
  closes: '22:30',
  /** 建議抵達時段 */
  arrive: '18:00–19:00',
  note: '各攤位開收時間不同；遇天候、施工或活動調整時可能變動，出發前請確認當週公告。'
} as const;

/**
 * 停車與臨停提醒。
 * 本站為非營利指南，不推薦特定收費停車場；僅就「流動夜市周邊通常怎麼停」提供類型中立的判斷。
 */
export const parkingOptions = [
  {
    title: '汽車：停在海濱公園周邊再走進去',
    note: '多數人以台東海濱公園、TAITUNG 英文字母地標周邊的路邊與公有停車空間為主，再步行進入四維路底。週日傍晚車位緊張，建議 18:00 前抵達。'
  },
  {
    title: '機車：路邊彈性高，但別擋動線',
    note: '四維路底周邊路邊空間彈性較高，仍請避免併排、停在攤車動線與出入口，以免影響攤商進出。'
  },
  {
    title: '不要在夜市入口臨停',
    note: '四維路底是攤區主要進出動線，臨停會立刻造成回堵。先停好車再進場，體驗差很多。'
  },
  {
    title: '記下停車地標，散場才找得到車',
    note: '週日夜市人潮集中，建議拍下周邊地標或把手機地圖定位存起來；若逛到較晚，也先想好叫車或接送備案。'
  },
  {
    title: '活動日可能有臨時交通調整',
    note: '攤區周邊可能因活動或施工調整動線，請以現場指標與當週公告為準。'
  }
] as const;

export const foods = [
  { name: 'WOOOOF! 肉蛋堡', type: '主食', note: '肉排、蛋與麵包組合，適合先墊胃。', bestFor: '一人一份', round: '第一輪', shareable: false },
  { name: '鐵犇牛排', type: '鐵板', note: '夜市經典鐵板主食，適合當作晚餐核心。', bestFor: '兩人同行', round: '第一輪', shareable: true },
  { name: '有饃有樣肉夾饃', type: '主食', note: '麵餅夾肉、份量感明確，適合邊走邊吃。', bestFor: '快速墊胃', round: '第一輪', shareable: false },
  { name: '台東地瓜球夜來客店', type: '甜點', note: '方便帶著走的夜市點心，適合安排在後段。', bestFor: '親子共享', round: '最後一輪', shareable: true },
  { name: '小上海香酥雞', type: '炸物', note: '鹹香炸物適合同行者共享，也方便邊逛邊吃。', bestFor: '多人分食', round: '第二輪', shareable: true },
  { name: '尚品臭豆腐', type: '小吃', note: '臺灣夜市代表性小吃，可和其他炸物錯開選擇。', bestFor: '經典小吃', round: '第二輪', shareable: true },
  { name: '大麗士可麗餅', type: '甜點', note: '甜鹹口味皆常見，適合當作整晚收尾。', bestFor: '甜點收尾', round: '最後一輪', shareable: false },
  { name: '紐西蘭牛排', type: '鐵板', note: '傳統夜市牛排選擇之一，可作為正餐。', bestFor: '完整晚餐', round: '第一輪', shareable: true },
  { name: '酥炸大魷魚', type: '炸物', note: '份量感較明確，適合兩人以上一起分食。', bestFor: '多人分食', round: '第二輪', shareable: true },
  { name: '兄弟來找茶', type: '飲品', note: '補充飲品的選擇，適合搭配後段逛攤。', bestFor: '解膩補水', round: '最後一輪', shareable: false }
] as const;

export const visitSteps = [
  { step: '01', title: '先確認停車與回程', copy: '抵達前先決定停車位置；若逛到較晚，也要預留叫車或接送安排。' },
  { step: '02', title: '先吃一份主食', copy: '牛排、肉蛋堡或肉夾饃先選一種，避免一開始就被零食塞飽。' },
  { step: '03', title: '炸物一起分食', copy: '香酥雞、臭豆腐與大魷魚適合同行者共享，一次多試幾種。' },
  { step: '04', title: '甜點飲料收尾', copy: '地瓜球、可麗餅與茶飲帶著走，再慢慢逛遊戲和雜貨攤。' }
] as const;

export const transportTips = [
  { num: '01', title: '自駕／機車', copy: '由台東火車站前往屬市區短程。週日傍晚建議提早抵達，不要在夜市入口臨停。' },
  { num: '02', title: '汽車停車', copy: '可先查看海濱公園國際地標周邊停車區，再步行前往；活動日可能有臨時交通調整。' },
  { num: '03', title: '大眾運輸', copy: '晚間班次較有限。若預計逛到 21:00 之後，不要只依賴末班公車，先準備叫車或接送方案。' },
  { num: '04', title: '沿海天候', copy: '目前位置靠近海岸，風勢與陣雨可能比市中心明顯；秋冬或雨後多帶一件薄外套。' }
] as const;

export const routePlans = [
  {
    name: '輕鬆版',
    audience: '不想趕行程',
    stops: [['17:00', '台東海濱公園'], ['18:00', '四維夜市'], ['20:00', '海邊散步']]
  },
  {
    name: '完整版',
    audience: '第一次到台東市區',
    stops: [['15:30', '台東森林公園'], ['17:00', '台東海濱公園'], ['18:00', '四維夜市'], ['20:30', '返回市區']]
  },
  {
    name: '雨天備案',
    audience: '天候不穩定',
    stops: [['出發前', '確認當週公告'], ['傍晚', '縮短戶外停留'], ['用餐後', '視雨勢提早回程']]
  }
] as const;

export const faqs = [
  ['四維夜市星期幾營業？', '例行營業日為每週日。露天夜市可能因天候、施工或活動調整，出發前仍應確認當週公告。'],
  ['四維夜市現在在哪裡？', '目前位於四維路底、TAITUNG 英文字母地標與台東海濱公園附近。網路上的四維路一段舊地址可能仍指向搬遷前場地。'],
  ['四維夜市營業時間是幾點到幾點？', '例行營業日為每週日，常見時段約 18:00 至 22:30，建議 18:00–19:00 抵達。四維夜市是露天流動夜市，各攤位開收時間不同，天候與現場安排也可能影響；本站不以固定時間保證當週一定開市。'],
  ['四維夜市有停車場嗎？該怎麼停車？', '四維夜市屬流動型夜市，攤區周邊沒有固定的專用停車場。多數人會停在台東海濱公園、TAITUNG 英文字母地標周邊的路邊與公有停車空間，再步行進入四維路底；週日傍晚車位緊張，建議提早抵達，並避免在夜市入口臨停。'],
  ['四維夜市必吃什麼？', '本站用「類型」而不是「保證出攤的名店」來整理：先選一份主食（牛排、肉蛋堡或肉夾饃），再和同行者共享炸物（香酥雞、臭豆腐、大魷魚），最後用甜點飲料收尾。流動攤位不保證每週固定出攤，名單僅供找攤方向。'],
  ['幾點去最合適？', '建議 18:00 至 19:00 抵達，攤位較齊全，也較容易安排停車。各攤位開收時間不同。'],
  ['下雨天會營業嗎？', '四維夜市為露天場地，雨勢與風況可能影響出攤。網站不以星期與時間直接判定實際開市。'],
  ['可以刷卡或行動支付嗎？', '各攤位收款方式不同，建議攜帶足夠現金，不要預設所有攤位都能刷卡。'],
  ['適合帶小孩嗎？', '適合。現場常有套圈圈、射氣球與彈珠類遊戲，但人多時要牽好兒童，消費前先問清楚規則與價格。'],
  ['四維夜市和台東觀光夜市一樣嗎？', '不一樣。四維夜市以週日為主，較偏在地生活與親子遊戲；台東觀光夜市位於正氣路，營業日與位置皆不同。'],
  ['四維夜市在 Google 地圖上的評價如何？', 'Google 地圖顯示臺東市四維夜市為 4.0 分、5,401 則用戶評價（2026 年 9 月同步）。評價內容僅於本頁摘要呈現，完整評論請至 Google 地圖地點頁查看。'],
  ['Google 地圖地址是四維路一段464巷，為什麼要導航到四維路底？', 'Google 地圖地點頁登錄地址仍為 950 臺東縣臺東市四維路一段464巷；實際攤區位於四維路底、TAITUNG 英文字母地標附近。建議直接以本頁座標 22.7543813, 121.1605317 導航，不要只輸入舊門牌。'],
  ['四維夜市需要門票嗎？', '不需要。四維夜市為免費入場的露天夜市，各攤位餐飲與遊戲另依現場計價，建議攜帶現金。']
] as const;
