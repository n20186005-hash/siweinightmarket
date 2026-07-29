export const site = {
  name: '四維夜市',
  fullName: '台東四維夜市',
  domain: 'SiweiNightMarket.com',
  url: 'https://siweinightmarket.com',
  description: '台東四維夜市每週日營業。本指南整理目前位置、營業時間、人氣美食、停車方式、親子遊戲與海濱公園順遊行程。',
  latitude: 22.7543813,
  longitude: 121.1605317,
  mapUrl: 'https://www.google.com/maps/place/%E5%9B%9B%E7%BB%B4%E5%A4%9C%E5%B8%82/@22.7543813,121.1605317,17z/data=!3m1!4b1!4m6!3m5!1s0x346fb9470bc452a5:0x8f11a8e4579483e8!8m2!3d22.7543813!4d121.1605317!16s%2Fg%2F11g_g0cyl?authuser=0&hl=zh-CN&entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.2963379084986!2d121.16053169999999!3d22.754381300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346fb9470bc452a5%3A0x8f11a8e4579483e8!2z5Zub57u05aSc5biC!5e0!3m2!1szh-CN!2stw!4v1785326243474!5m2!1szh-CN!2stw',
  officialNoticeUrl: 'https://www.facebook.com/100064769170713/',
  ga4: 'G-HXM22WWPKP'
} as const;

export const visitFacts = [
  { label: '營業日', value: '每週日' },
  { label: '建議抵達', value: '18:00–19:00' },
  { label: '常見時段', value: '約 18:00–22:30' },
  { label: '建議停留', value: '約 1–2 小時' },
  { label: '入場方式', value: '免費入場' },
  { label: '適合對象', value: '親子・朋友・情侶' }
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
  ['幾點去最合適？', '建議 18:00 至 19:00 抵達，攤位較齊全，也較容易安排停車。各攤位開收時間不同。'],
  ['下雨天會營業嗎？', '四維夜市為露天場地，雨勢與風況可能影響出攤。網站不以星期與時間直接判定實際開市。'],
  ['可以刷卡或行動支付嗎？', '各攤位收款方式不同，建議攜帶足夠現金，不要預設所有攤位都能刷卡。'],
  ['適合帶小孩嗎？', '適合。現場常有套圈圈、射氣球與彈珠類遊戲，但人多時要牽好兒童，消費前先問清楚規則與價格。'],
  ['四維夜市和台東觀光夜市一樣嗎？', '不一樣。四維夜市以週日為主，較偏在地生活與親子遊戲；台東觀光夜市位於正氣路，營業日與位置皆不同。']
] as const;
