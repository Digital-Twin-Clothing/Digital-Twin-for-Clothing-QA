# Digital Twins — Web (frontend)

Landing page for the Digital Twins virtual fitting room, built with
**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**.

Monochrome, no gradients. All motion uses CSS transitions plus small React hooks,
with no animation library:

| Effect | Where | File |
|---|---|---|
| Line-by-line headline reveal, count-up stats | Hero | `components/landing/Hero.tsx` |
| Scan line, drawn measurement call-outs, orbiting turntable dot, mouse-parallax tilt | Hero figure | `components/landing/Hero.tsx` |
| Infinite marquee (pauses on hover) | Below hero | `components/landing/Marquee.tsx` |
| Scrollytelling: pinned stage + scrolling steps, rolling step counter | How it works | `components/landing/HowItWorks.tsx` |
| Sliding size pill, springy fit meters, resizing shirt | Fit panel | `components/landing/FitPanel.tsx` |
| Card lift + outline re-draw on hover | Garments | `components/landing/Garments.tsx` |
| Label roll, press scale, click ripple, magnetic pull | All buttons | `components/ui/Button.tsx` |
| Fade-up on scroll | Anywhere | `components/ui/Reveal.tsx` |
| Hide-on-scroll nav, scroll progress bar | Nav | `components/landing/Nav.tsx` |

Everything is switched off automatically for users with **Reduce motion** enabled.

---

## 1. Install the prerequisites (one time)

You need **Node.js 20.9 or newer** (Node 22 LTS recommended) and **npm** (comes with Node).

Check what you have:

```bash
node -v
npm -v
```

If Node is missing or older than 20.9:

- **macOS / Windows:** download the LTS installer from https://nodejs.org and run it.
- **Using nvm (macOS/Linux):** `nvm install 22 && nvm use 22`

Recommended editor: **VS Code**, with the **Tailwind CSS IntelliSense** extension.

## 2. Unzip and open the project

```bash
# after downloading digital-twins-web.zip
unzip digital-twins-web.zip        # or double-click it
cd digital-twins-web
code .                             # opens in VS Code (optional)
```

## 3. Install dependencies

```bash
npm install
```

This creates the `node_modules/` folder. It takes about 20–60 seconds.

## 4. Run the dev server

```bash
npm run dev
```

Open **http://localhost:3000**. The page hot-reloads whenever you save a file.

## 5. Production build (optional)

```bash
npm run build     # compile + type-check
npm start         # serve the production build on http://localhost:3000
npm run typecheck # type-check only
```

## 6. Put it on GitHub (optional)

```bash
git init
git add .
git commit -m "Landing page with motion design"
git branch -M main
git remote add origin https://github.com/<you>/digital-twins-web.git
git push -u origin main
```

To deploy, import the repo at https://vercel.com/new. No settings to change.

---

## Project structure

```
src/
  app/
    layout.tsx          root HTML, fonts, metadata
    page.tsx            assembles the landing sections
    globals.css         design tokens (@theme) + motion classes + keyframes
  components/
    figure/BodyDefs.tsx shared SVG avatar (symbol, clip path, shirt) + mesh lines
    landing/            Nav, Hero, Marquee, HowItWorks, FitPanel, Garments, Cta, Footer
    ui/                 Button (ripple/magnetic), Reveal / RevealLines
  hooks/                useInView, useCountUp, useReducedMotion
  lib/
    fit-data.ts         mock size/fit data (replace with API results later)
    motion.ts           delay() + cx() helpers
```

## Customising

- **Colours / fonts / easing:** edit the `@theme` block at the top of `src/app/globals.css`.
  Every token becomes a Tailwind class, for example `bg-bg`, `text-ink`, `border-line`,
  `font-serif` and `ease-smooth`.
- **Motion timing:** `--ease-smooth` is for reveals and scene changes, which gives a luxury
  feel. `--ease-snap` (slight overshoot) is for buttons and controls. Per-element delays use
  the `delay(seconds)` helper.
- **Copy:** each section keeps its text in a constant at the top of its file
  (`HEADLINE`, `STEPS`, `GARMENTS` …).
- **Fit numbers:** `src/lib/fit-data.ts`.

## Troubleshooting

| Problem | Fix |
|---|---|
| `npm: command not found` | Node isn't installed. See step 1, then restart your terminal. |
| `You are using Node.js 18…` | Upgrade to Node 20.9+ (see step 1). |
| `Port 3000 is in use` | Next will offer another port, or run `npm run dev -- -p 3001`. |
| Headings show in a plain serif | You're offline. Fonts load from Google Fonts and fall back to Georgia/system fonts. |
| Weird errors after pulling changes | Delete `node_modules` and `.next`, then run `npm install` again. |

## Next steps (from the frontend plan)

1. Supabase auth (`@supabase/ssr`) + protected routes
2. `/studio` with the React Three Fiber viewer (`three`, `@react-three/fiber`, `@react-three/drei`)
3. `/avatar/new` capture wizard with MediaPipe pose validation
4. Replace `lib/fit-data.ts` with real fit results from the FastAPI backend
