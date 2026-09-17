# Webaurex Studio

A single-screen studio introduction: a minimal navbar and cinematic hero. Next.js App Router, JavaScript, Tailwind CSS 4, and Motion for React (formerly Framer Motion).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run lint` and `npm run build` to validate; `npm start` serves the production build.

## Editing

- `src/app/page.js`: copy, navigation destinations, contact URL, and motion.
- `src/app/globals.css`: palette, typography, responsive layout, film grain, and camera drift.
- `src/app/layout.js`: Manrope font and page metadata.
- `public/monoliths.webp`: original cinematic background, optimized to approximately 89 KB.

The navigation and contact links are intentionally marked `aria-disabled` until real destinations are supplied. Set the `href` values in `navigation` and `contactHref` in `page.js`. A contact destination can be `mailto:your-address` or a booking URL. No additional pages or sections are included.

To replace the background with video, put the final MP4/WebM in `public/` and set `heroVideoSrc` in `page.js` to its public path. The monolith image stays as the poster/fallback. Video is muted, looping, and inline, and follows the motion control and device reduced-motion preference.

Motion includes staggered architectural curtain reveals, masked and rotated headline entrances, spring-based mouse parallax, slow camera drift, rolling navigation text, and a magnetic contact button. The pause control stops background motion; device reduced-motion settings disable movement. Content remains readable without JavaScript.

## Original imagery

The backdrop was created with the built-in image generation tool and saved in this project as `public/monoliths.webp`. It is original artwork, not an asset from the reference website. The generation prompt was:

> Use case: stylized-concept. Asset type: full-bleed cinematic website hero background, landscape 16:9, 2048x1152. Create original high-end architectural CGI: monumental brutalist rectangular monoliths and interlocking cubic volumes in near-black dark forest green, a large towering stepped composition on the RIGHT HALF of the frame. Grounded solid stone forms, not floating. Dramatic low camera angle with elegant strong perspective, museum-level abstract architecture, sophisticated physical materials with fine slightly rough dark green concrete grain. The LEFT HALF is mostly deep shadow and atmospheric negative space for large cream website typography added later, with low dark architectural silhouettes at the lower left. On the right a broad muted yellow-green warm light illuminates one tall vertical plane between deep dark blocks, a thin olive illuminated edge along one corner, faint hazy warm light above the structure. Restrained volumetric atmosphere, deep cinematic shadows but readable geometry, subtle analog film grain. Palette deep forest #10251b, near black #07100b, muted olive-gold #93985c, shadows green rather than blue. Composition spacious, imposing and premium; buildings extend out of top/right of frame, dark matte ground plane below. Beautiful photorealistic architectural rendering with natural bounced light. No text, no typography, no logos, no people, no plants, no icons, no sci-fi UI, no neon, no glossy glass, no blue, no gradient wallpaper. It should look like a frame from an experimental architectural art film.
