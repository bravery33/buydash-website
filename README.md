# BUYDASH Website

Premium English website for BUYDASH semiconductor test interface solutions.

## Install Dependencies

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

The local Vite server will print a localhost URL, usually:

```text
http://localhost:5173/
```

## Build

```bash
npm run build
```

The production build is generated in:

```text
dist/
```

## Deploy to Vercel

This project is ready for Vercel as a Vite React app.

Recommended Vercel settings:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

The `vercel.json` file is included so direct visits to routes such as `/probe-cards`, `/burn-in-sockets`, `/htol-hast-boards`, `/temperature-controllers`, and `/contact` resolve to the React app instead of returning a 404.

To deploy with the Vercel CLI:

```bash
npm install -g vercel
vercel
vercel --prod
```

## Product Images

All production image assets used by the website are stored in:

```text
public/images/
```

The site references images with `/images/filename.png`, which maps to files inside `public/images`.

Current image files:

| Filename | Where it appears | Recommended replacement size / aspect ratio |
| --- | --- | --- |
| `logo-buydash.png` | Optional logo asset, not required by layout | 560 x 150 px transparent PNG |
| `homepage-mockup.png` | Reference asset only | Keep original reference image |
| `hero-probe-card.png` | Home hero collage, Probe Cards hero | 1:1 or 4:3 transparent PNG, 900 px wide |
| `hero-burnin-socket.png` | Home hero collage, Burn-in Sockets hero | 1:1 transparent PNG, 800 px wide |
| `hero-htol-board.png` | Home hero collage, HTOL / HAST Boards hero | 4:3 transparent or white-background PNG, 1000 px wide |
| `hero-temperature-controller.png` | Home hero collage, Temperature Controllers hero | 4:5 transparent or white-background PNG, 800 px tall |
| `probe-card.png` | Home product card, Probe Cards overview, Astar / S200 card | 1:1 product crop, 900 x 900 px |
| `burn-in-socket.png` | Home product card | 1:1 product crop, 900 x 900 px |
| `htol-hast-board.png` | Home product card, HTOL Board image card | 4:3 board crop, 1200 x 900 px |
| `temperature-controller.png` | Home product card, Temperature Controller detail | 4:5 product crop, 900 x 1125 px |
| `probe-pins.png` | Home product card, Probe Pins section, Contact hero | 4:3 transparent PNG, 900 x 650 px |
| `probe-v93000.png` | V93000 model card | 2:1 probe card crop, 1200 x 600 px |
| `probe-magnum2.png` | Magnum2 model card | 2:1 probe card crop, 1200 x 600 px |
| `probe-j750hd.png` | J750 / J750HD model card | 2:1 probe card crop, 1200 x 600 px |
| `probe-3380.png` | 3380 / 3360 model card | 2:1 probe card crop, 1200 x 600 px |
| `socket-23x30.png` | Burn-in Sockets type card | 1:1 or 4:3 socket product crop, 900 px wide |
| `socket-385x385.png` | Burn-in Sockets type card | 1:1 or 4:3 socket product crop, 900 px wide |
| `socket-40x50.png` | Burn-in Sockets type card | 1:1 or 4:3 socket product crop, 900 px wide |
| `socket-55x65.png` | Burn-in Sockets type card | 1:1 or 4:3 socket product crop, 900 px wide |
| `socket-high-pin-count.png` | Burn-in Sockets type card | 4:3 socket product crop, 1000 px wide |
| `htol-dl600.png` | DL600 Platform HTOL Board card | 4:3 board crop, 1200 x 900 px |
| `htol-dl601h.png` | DL601H Platform HTOL Board card | 4:3 board crop, 1200 x 900 px |
| `hast-board.png` | HAST Burn-in Board card | 4:3 board crop, 1200 x 900 px |
| `hast-mother-daughter.png` | HAST Mother-Daughter Board card | 4:3 board crop, 1200 x 900 px |

## Replace Product Images

To replace an image without changing the layout:

1. Prepare the new image with the same filename as the current asset.
2. Place it in `public/images/`.
3. Keep the recommended aspect ratio when possible.
4. Run `npm run build` to confirm there are no broken references.

If you want to use a different filename, update the relevant image entry in:

```text
src/App.jsx
```

Look for product data arrays such as `portfolio`, `probeGroups`, `socketTypes`, and `boardSpecs`.

## Update Footer Company Information

Footer company information is defined in:

```text
src/App.jsx
```

Search for:

```text
function Footer()
```

Update these values there:

```text
Business Registration No.
Mail-order Business Registration No.
Location
```

The contact page company information is also in `src/App.jsx`. Search for:

```text
contact-aside
```

Update the same company details there if they change.

## Notes

- No external CDN dependencies are used.
- Product copy is written in English.
- BUYDASH is described as a solutions partner, supply partner and technical sourcing partner, not as a manufacturer.
- Testrong company branding, slogans and company information are not used in site copy.
- The PDFs are used as technical source material only; product content is converted into website sections, cards and specification tables.
