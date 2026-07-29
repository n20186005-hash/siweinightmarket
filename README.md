# SiweiNightMarket.com

台東四維夜市的繁體中文獨立旅遊指南，使用 Astro、Tailwind CSS、TypeScript 與 Cloudflare Workers。

## 功能

- 單一繁體中文介面（`zh-Hant-TW`）
- 四維夜市最新地址與舊地址提醒
- 依 Asia/Taipei 時區顯示例行營業狀態，但不宣稱即時官方營業
- 2026 人氣美食、交通停車、親子遊戲、附近景點與 FAQ
- Google Analytics 4：`G-HXM22WWPKP`
- TouristAttraction、WebSite、FAQPage JSON-LD
- Open Graph、robots.txt、sitemap.xml、Web App Manifest
- Cloudflare Worker 部署設定
- 無資料庫、無登入、無 CMS

## 本機開發

```bash
corepack enable
pnpm install
pnpm dev
```

預設開發網址通常為 `http://localhost:4321`。

## 型別檢查與建置

```bash
pnpm check
pnpm build
pnpm preview
```

## 部署到 Cloudflare Workers

1. 登入 Cloudflare：

```bash
pnpm wrangler login
```

2. 建置並部署：

```bash
pnpm deploy
```

3. 在 Cloudflare Workers 專案中綁定自訂網域：

```text
siweinightmarket.com
www.siweinightmarket.com
```

建議將 `www` 301 重新導向裸網域，正式 canonical 已設定為 `https://siweinightmarket.com`。

## 內容更新位置

- 景點與美食資料：`src/data/site.ts`
- 首頁內容：`src/pages/index.astro`
- 全站樣式：`src/styles/global.css`
- SEO 與 GA4：`src/layouts/BaseLayout.astro`
- Cloudflare 設定：`wrangler.jsonc`

## 上線前必做

- 閱讀 `PHOTO_RIGHTS.md`，替換或取得四維夜市部落格照片授權。
- 再次核對目前場地、當週營業方式與停車安排。
- 在 GA4 即時報表確認 `G-HXM22WWPKP` 已收到資料。
- 在 Cloudflare 設定 DNS、自訂網域及 HTTPS。
