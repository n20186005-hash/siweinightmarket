/**
 * 天氣資料層：向 Open-Meteo 取得即時、每日預報與海況資料。
 * 在 Cloudflare Workers 執行階段於伺服器端取得，並以 Cache API 快取約 30 分鐘；
 * 任一外部來源失敗時降級（天氣為 null 才整塊隱藏，海況失敗僅隱藏海況區塊）。
 */

export interface WeatherNow {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  weatherCode: number;
  precipitationProbability: number;
  windSpeed: number;
  windGust: number;
  time: string;
}

export interface WeatherDay {
  date: string;
  code: number;
  tempMax: number;
  tempMin: number;
  precipProb: number;
  uvIndexMax: number;
  windSpeedMax: number;
  windGustMax: number;
}

export interface WeatherSea {
  waveHeightMax: number;
  wavePeriodMax: number;
  seaTemp: number;
}

export interface WeatherData {
  now: WeatherNow;
  days: WeatherDay[];
  sea: WeatherSea | null;
  fetchedAt: string;
}

export type WeatherIcon = 'sun' | 'cloud' | 'rain' | 'storm' | 'snow' | 'fog';

export interface WeatherCondition {
  label: string;
  icon: WeatherIcon;
}

export type CodeKind = 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'heavy' | 'thunder' | 'snow';

const CODE_MAP: Record<number, WeatherCondition> = {
  0: { label: '晴', icon: 'sun' },
  1: { label: '大致晴朗', icon: 'sun' },
  2: { label: '局部多雲', icon: 'cloud' },
  3: { label: '陰天', icon: 'cloud' },
  45: { label: '有霧', icon: 'fog' },
  48: { label: '霧淞', icon: 'fog' },
  51: { label: '毛毛雨', icon: 'rain' },
  53: { label: '毛毛雨', icon: 'rain' },
  55: { label: '毛毛雨', icon: 'rain' },
  56: { label: '凍毛毛雨', icon: 'rain' },
  57: { label: '凍毛毛雨', icon: 'rain' },
  61: { label: '小雨', icon: 'rain' },
  63: { label: '雨天', icon: 'rain' },
  65: { label: '大雨', icon: 'rain' },
  66: { label: '凍雨', icon: 'rain' },
  67: { label: '凍雨', icon: 'rain' },
  71: { label: '小雪', icon: 'snow' },
  73: { label: '雪', icon: 'snow' },
  75: { label: '大雪', icon: 'snow' },
  77: { label: '米雪', icon: 'snow' },
  80: { label: '陣雨', icon: 'rain' },
  81: { label: '陣雨', icon: 'rain' },
  82: { label: '強陣雨', icon: 'rain' },
  85: { label: '陣雪', icon: 'snow' },
  86: { label: '陣雪', icon: 'snow' },
  95: { label: '雷雨', icon: 'storm' },
  96: { label: '雷雨冰雹', icon: 'storm' },
  99: { label: '雷雨冰雹', icon: 'storm' }
};

export function describeWeather(code: number): WeatherCondition {
  return CODE_MAP[code] ?? { label: '多雲', icon: 'cloud' };
}

export function codeKind(code: number): CodeKind {
  if (code === 45 || code === 48) return 'fog';
  if (code === 95 || code === 96 || code === 99) return 'thunder';
  if (code === 65 || code === 67 || code === 82) return 'heavy';
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) return 'drizzle';
  if (code === 61 || code === 63 || code === 66 || code === 80 || code === 81) return 'rain';
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return 'snow';
  if (code === 0 || code === 1) return 'clear';
  return 'cloudy';
}

/** 蒲福風級：把 m/s 換算成遊客聽得懂的「幾級風」 */
export function windLevel(speedMs: number): number {
  const v = Math.abs(speedMs);
  if (v < 0.3) return 0;
  if (v < 1.6) return 1;
  if (v < 3.4) return 2;
  if (v < 5.5) return 3;
  if (v < 8.0) return 4;
  if (v < 10.8) return 5;
  if (v < 13.9) return 6;
  if (v < 17.2) return 7;
  if (v < 20.8) return 8;
  if (v < 24.5) return 9;
  if (v < 28.5) return 10;
  if (v < 32.7) return 11;
  return 12;
}

export function windLevelLabel(level: number): string {
  if (level <= 2) return '微風';
  if (level <= 4) return '和風';
  if (level <= 6) return '強風';
  if (level <= 8) return '大風';
  if (level <= 10) return '烈風';
  return '暴風';
}

/** 紫外線指數翻成口語，不輸出專業術語 */
export function uvLabel(uv: number): string {
  if (uv >= 8) return '很強';
  if (uv >= 6) return '強';
  if (uv >= 3) return '中等';
  return '弱';
}

/** 濕度翻成體感用詞 */
export function humidityLabel(h: number): string {
  if (h >= 75) return '偏悶濕';
  if (h >= 60) return '舒適';
  if (h >= 40) return '偏乾爽';
  return '乾燥';
}

const CACHE_TTL = 1800;
const CACHE_KEY = 'https://siweinightmarket.com/.cache/weather.json';

/** 海況（浪高、週期、海水溫度）：四維路底緊鄰海濱公園，特別供海邊行程參考 */
async function getSea(lat: number, lon: number, today: string): Promise<WeatherSea | null> {
  const url = new URL('https://marine-api.open-meteo.com/v1/marine');
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('daily', 'wave_height_max,wave_period_max');
  url.searchParams.set('hourly', 'wave_height,sea_surface_temperature');
  url.searchParams.set('timezone', 'Asia/Taipei');
  url.searchParams.set('forecast_days', '2');

  try {
    const init = { cf: { cacheTtl: CACHE_TTL, cacheEverything: true } } as RequestInit;
    const res = await fetch(url.toString(), init);
    if (!res.ok) return null;
    const data = await res.json();
    const daily = data?.daily;
    const hourly = data?.hourly;
    if (!daily?.time?.length) return null;

    const idx = Math.max(0, (daily.time as string[]).indexOf(today));
    const waveHeightMax = daily.wave_height_max?.[idx];
    const wavePeriodMax = daily.wave_period_max?.[idx];
    if (typeof waveHeightMax !== 'number') return null;

    let sum = 0;
    let count = 0;
    if (hourly?.time?.length && Array.isArray(hourly.sea_surface_temperature)) {
      (hourly.time as string[]).forEach((t, i) => {
        const v = hourly.sea_surface_temperature[i];
        if (typeof v === 'number' && t.startsWith(today)) {
          sum += v;
          count += 1;
        }
      });
    }
    if (!count) return null;

    return {
      waveHeightMax: Math.round(waveHeightMax * 10) / 10,
      wavePeriodMax: typeof wavePeriodMax === 'number' ? Math.round(wavePeriodMax * 10) / 10 : 0,
      seaTemp: Math.round((sum / count) * 10) / 10
    };
  } catch {
    return null;
  }
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData | null> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation_probability,wind_speed_10m,wind_gusts_10m');
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max,wind_gusts_10m_max');
  url.searchParams.set('timezone', 'Asia/Taipei');
  url.searchParams.set('forecast_days', '7');
  url.searchParams.set('wind_speed_unit', 'ms');
  url.searchParams.set('precipitation_probability_unit', 'percent');

  const cs: any = (globalThis as any).caches;
  const cache: any = cs ? cs.default : undefined;

  if (cache) {
    try {
      const hit = await cache.match(CACHE_KEY);
      if (hit) return (await hit.json()) as WeatherData;
    } catch {
      /* 快取讀取失敗不影響主流程 */
    }
  }

  try {
    const init = { cf: { cacheTtl: CACHE_TTL, cacheEverything: true } } as RequestInit;
    const res = await fetch(url.toString(), init);
    if (!res.ok) throw new Error(`weather http ${res.status}`);
    const data = await res.json();
    const now = data?.current;
    const daily = data?.daily;
    if (!now || !daily?.time?.length) throw new Error('weather payload incomplete');

    const days: WeatherDay[] = (daily.time as string[]).map((date: string, i: number) => ({
      date,
      code: daily.weather_code[i],
      tempMax: Math.round(daily.temperature_2m_max[i]),
      tempMin: Math.round(daily.temperature_2m_min[i]),
      precipProb: daily.precipitation_probability_max[i] ?? 0,
      uvIndexMax: Math.round((daily.uv_index_max?.[i] ?? 0) * 10) / 10,
      windSpeedMax: Math.round((daily.wind_speed_10m_max?.[i] ?? 0) * 10) / 10,
      windGustMax: Math.round((daily.wind_gusts_10m_max?.[i] ?? 0) * 10) / 10
    }));

    const result: WeatherData = {
      now: {
        temperature: Math.round(now.temperature_2m),
        apparentTemperature: Math.round(now.apparent_temperature ?? now.temperature_2m),
        humidity: Math.round(now.relative_humidity_2m ?? 0),
        weatherCode: now.weather_code,
        precipitationProbability: now.precipitation_probability ?? 0,
        windSpeed: Math.round((now.wind_speed_10m ?? 0) * 10) / 10,
        windGust: Math.round((now.wind_gusts_10m ?? 0) * 10) / 10,
        time: now.time
      },
      days,
      sea: await getSea(lat, lon, days[0].date),
      fetchedAt: new Date().toISOString()
    };

    if (cache) {
      try {
        await cache.put(
          CACHE_KEY,
          new Response(JSON.stringify(result), {
            headers: { 'content-type': 'application/json', 'cache-control': `public, max-age=${CACHE_TTL}` }
          })
        );
      } catch {
        /* 寫入快取失敗不影響主流程 */
      }
    }
    return result;
  } catch {
    return null;
  }
}
