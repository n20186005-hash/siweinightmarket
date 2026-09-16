/**
 * 天氣建議引擎：把氣象數據翻譯成遊客可直接執行的建議。
 * 原則：說人話、不講術語；不滿足條件的建議直接不產生（前端就不會顯示）。
 * 四維路底緊鄰海濱公園，因此額外輸出「海邊專項」提示。
 */

import { codeKind, windLevel, uvLabel, type WeatherData, type WeatherDay } from './weather';

export interface WeatherAdvice {
  headline: string;
  headlineDetail: string;
  needUmbrella: boolean;
  risks: string[];
  outfit: string[];
  plan: string[];
  carry: string[];
  sea: string[];
}

export function buildAdvice(w: WeatherData): WeatherAdvice {
  const today = w.days[0];
  const kind = codeKind(today.code);
  const precip = today.precipProb;
  const tMax = today.tempMax;
  const tMin = today.tempMin;
  const diff = tMax - tMin;
  const uv = today.uvIndexMax;
  const lv = windLevel(today.windSpeedMax);
  const gustLv = windLevel(today.windGustMax);
  const sea = w.sea;

  const wet = kind === 'rain' || kind === 'drizzle' || kind === 'heavy' || kind === 'thunder';
  const needUmbrella = precip >= 60 || wet;

  /* ---------- 一句話結論：出門要不要帶傘 ---------- */
  const headline = needUmbrella ? '今天的結論：建議帶傘出門' : '今天的結論：不用帶傘，輕裝出門就好';
  const headlineDetail = needUmbrella
    ? `今日降雨機率 ${precip}%（機率不等於一定會下雨，但備著比較安心）`
    : `今日降雨機率 ${precip}%，看起來不必帶傘`;

  /* ---------- 風險提醒：有才顯示，優先級最高 ---------- */
  const risks: string[] = [];
  if (kind === 'thunder') {
    risks.push('有雷雨，請勿在山區、海邊、空曠地或樹下停留，水上與海上活動大概率關閉。');
  }
  if (kind === 'heavy' || (kind === 'rain' && precip >= 80)) {
    risks.push('雨勢偏強，請避開低窪與容易積水的路段，山區、溪谷行程建議取消。');
  }
  if (lv >= 7 || gustLv >= 7) {
    risks.push(`風力可達 ${Math.max(lv, gustLv)} 級，請遠離廣告牌、臨時帳棚與海邊礁石。`);
  }
  if (kind === 'fog') {
    risks.push('能見度較差，海邊觀景與夜間騎車請放慢速度、留意路況。');
  }
  if (tMax >= 36) {
    risks.push('高溫警戒，避免正午長時間待在戶外，留意頭暈、噁心等中暑徵兆。');
  }
  if (tMax <= 10) {
    risks.push('氣溫偏低，請做好保暖；海邊風大，體感會比氣溫更冷。');
  }
  if (sea && sea.waveHeightMax >= 2) {
    risks.push(`海浪偏大（浪高約 ${sea.waveHeightMax} 公尺），不建議下水或靠近礁岩區。`);
  }
  const month = Number(today.date.slice(5, 7));
  if (month >= 7 && month <= 9) {
    risks.push('7–9 月是颱風好發期，出發前請先確認中央氣象署是否發布颱風警報。');
  }

  /* ---------- 出行穿搭 ---------- */
  const outfit: string[] = [];
  if (tMax >= 32) {
    outfit.push(`高溫上看 ${tMax} 度，建議輕薄透氣衣物，正午盡量待在室內。`);
  } else if (tMax >= 28) {
    outfit.push(`天氣偏熱（${tMax} 度），短袖為主，可多帶一件薄外套應付夜間海風。`);
  } else if (tMax <= 10) {
    outfit.push(`氣溫只有 ${tMax} 度，請穿厚外套並做好保暖。`);
  } else if (tMax <= 20) {
    outfit.push('偏涼，建議長袖加一件外套。');
  } else {
    outfit.push('氣溫舒適，穿著輕便即可。');
  }
  if (diff > 8) {
    outfit.push(`晝夜溫差約 ${diff} 度，建議多帶一件外套方便隨時增減。`);
  }
  if (needUmbrella) {
    outfit.push('地面容易濕滑，建議改穿防滑鞋，盡量不要穿涼鞋。');
  }
  if (kind === 'heavy' || (needUmbrella && lv >= 5)) {
    outfit.push('風雨明顯，建議改穿防水外套。');
  }
  if (lv >= 5) {
    outfit.push('風大，建議避免寬鬆長裙與容易被吹落的帽子。');
  } else if (gustLv >= 6) {
    outfit.push('陣風明顯，帽子容易被吹落，建議選可固定或不戴帽。');
  }

  /* ---------- 游玩安排 ---------- */
  const plan: string[] = [];
  if (kind === 'thunder') {
    plan.push('雷雨期間不適合戶外行程，建議等雨勢趨緩再出門，室內景點優先。');
  } else if (kind === 'heavy') {
    plan.push('雨勢較大，不建議戶外逛攤，建議改期或改走室內行程。');
  } else if (kind === 'rain') {
    plan.push('會下雨，露天逛攤的體驗會打折，可考慮延後出發。');
  } else if (precip >= 60) {
    plan.push('降雨機率高，建議縮短戶外行程，並先想好室內備案。');
  } else if (kind === 'drizzle') {
    plan.push('有小雨，路面濕滑，逛攤放慢腳步即可，不一定要取消行程。');
  } else if (kind === 'clear') {
    plan.push(tMax <= 15 ? '天氣晴朗但氣溫偏低，海邊風大，散步請先做好保暖。' : '天氣晴好，適合先去海邊散步看夕陽，傍晚再進夜市。');
  } else if (kind === 'cloudy') {
    plan.push('陰天光線柔和，很適合拍照，也適合長時間慢慢逛。');
  } else {
    plan.push('天況普通，行程可彈性安排。');
  }
  if (uv >= 5 && !wet) {
    plan.push(`白天紫外線${uvLabel(uv)}，出門記得防曬並補充水分。`);
  }
  if (tMax >= 32) {
    plan.push('正午高溫，建議把戶外行程排在傍晚以後，體感與人潮都比較舒服。');
  }
  if (lv >= 5) {
    plan.push('海邊風大，海上與高空遊樂設施可能停駛，出發前先確認。');
  } else if (gustLv >= 6) {
    plan.push('陣風可達 6 級，帳棚、遮陽傘與輕物容易被吹動，行走拍照請留意周邊。');
  }
  if (kind === 'fog') {
    plan.push('能見度差，不適合安排觀海、看山的景點。');
  }
  if (!wet && precip < 60 && lv < 7) {
    plan.push('整體天況適合逛夜市；18:30 後人潮開始聚集，想逛得從容可提早或延後進場。');
  }

  /* ---------- 隨身物品 ---------- */
  const carry: string[] = [];
  if (needUmbrella) {
    carry.push(lv >= 5 ? '輕便雨衣（風大不建議拿長柄傘）' : '摺疊傘或輕便雨衣');
  }
  if (uv >= 5 && !wet) {
    carry.push('防曬乳、墨鏡、遮陽帽');
  }
  if (tMax >= 32) {
    carry.push('充足飲用水與防暑小物（扇子、電解質）');
  }
  if (diff > 8) {
    carry.push('一件方便穿脫的薄外套');
  }
  if (tMax <= 10) {
    carry.push('厚外套、圍巾');
  }
  if (kind === 'fog') {
    carry.push('口罩');
  }
  if (lv >= 5 || gustLv >= 6) {
    carry.push('帽子請選可固定的款式');
  }
  if (!carry.length) {
    carry.push('沒什麼特別要準備的，基本隨身物品即可');
  }

  /* ---------- 海邊專項（依景點地理環境擴充） ---------- */
  const seaTips: string[] = [];
  if (sea) {
    if (sea.seaTemp >= 26) {
      seaTips.push(`海水溫度約 ${sea.seaTemp} 度，水溫溫暖；想玩水請選擇有救生人員的時段與區域。`);
    } else if (sea.seaTemp >= 22) {
      seaTips.push(`海水溫度約 ${sea.seaTemp} 度，水溫偏涼，下水時間不宜過長。`);
    } else {
      seaTips.push(`海水溫度約 ${sea.seaTemp} 度，水溫偏低，長時間下水容易失溫。`);
    }
    if (sea.waveHeightMax < 1) {
      seaTips.push(`今日浪高約 ${sea.waveHeightMax} 公尺，浪況平穩，岸邊散步拍照都合適。`);
    } else if (sea.waveHeightMax < 1.5) {
      seaTips.push(`今日浪高約 ${sea.waveHeightMax} 公尺，浪況中等，拍照請與浪線保持距離，不要站上礁岩。`);
    } else {
      seaTips.push(`今日浪高約 ${sea.waveHeightMax} 公尺，浪況偏大，請勿下水或靠近礁岩區。`);
    }
    if (kind === 'thunder') {
      seaTips.push('雷雨時請立刻離開海邊與開闊地，不要躲在岸邊遮蔭處。');
    }
    if (lv >= 7) {
      seaTips.push('強風期間海邊風險高，建議改走市區行程。');
    }
  }

  return { headline, headlineDetail, needUmbrella, risks, outfit, plan, carry, sea: seaTips };
}

/** 七日預報每日的極簡提示標籤，最多兩個 */
export function dayHints(day: WeatherDay): string[] {
  const hints: string[] = [];
  const k = codeKind(day.code);
  const wetDay = k === 'rain' || k === 'drizzle' || k === 'heavy' || k === 'thunder';
  if (day.precipProb >= 60 || wetDay) hints.push('帶傘');
  if (day.uvIndexMax >= 6) hints.push('防曬');
  if (windLevel(day.windSpeedMax) >= 5) hints.push('防風');
  if (day.tempMax >= 32) hints.push('防暑');
  if (day.tempMin <= 12) hints.push('保暖');
  if (k === 'fog') hints.push('留意路況');
  if (!hints.length) hints.push(k === 'clear' ? '好天氣' : '適合出門');
  return hints.slice(0, 2);
}
