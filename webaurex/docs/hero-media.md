# Navbar and hero

Only `StudioNavbar.js`, `StudioHero.js`, and the scoped `StudioHero.module.css` control this rebuilt introduction. Sections below it use their existing files and styles.

The current background is `public/images/webhero-placeholder.png`, served at `/images/webhero-placeholder.png`. It is centered, uses `object-fit: cover`, and has no image blur, tint, gradient, or darkening overlay.

No supplied Webaurex artwork existed at the requested path, so an original emerald architectural placeholder was generated with the built-in ImageGen tool.

## Future video

Place the finished video at `public/videos/webhero.mp4`, then change only the media configuration in `src/components/StudioHero.js`:

```js
const HERO_MEDIA = {
  type: "video",
  src: "/videos/webhero.mp4",
  poster: "/images/webhero-placeholder.png",
};
```

Both image and video share the same full-viewport media layer, positioning, and sizing. The image remains as the poster and fallback. Video plays muted and inline, loops, and respects reduced-motion preferences. No hero layout changes are needed. Video is not enabled in the current implementation.

## Placeholder generation prompt

Use case: stylized-concept. Asset: original Webaurex Studio full-viewport hero placeholder, wide landscape 16:9. Create a premium cinematic photorealistic 3D architectural art frame, a monumental assembly of thick interlocking rectangular emerald-green blocks and polished dark-green structural slabs, viewed from close low angle. Main architectural focal point centralized with large sculptural blocks spanning the central and right 70 percent; generous dark forest negative space in upper left and middle left for large editorial white headline overlay added in code. Main blocks have exquisite subtly textured deep emerald surfaces and precise edge highlights, an illuminated translucent emerald inset surface, believable solid mass, very subtle reflections. Camera looks diagonally along surfaces into geometric depth. Color strictly emerald, deep forest green, near black, and faint neutral mineral white reflections. Absolutely no yellow, gold, orange, pink, purple or blue, no teal/cyan cast, no multicolor accents. Natural soft emerald bounce lighting illuminates geometry, legible detailed material surfaces and confident simple architectural composition, atmospheric and premium, high quality sharp rendering, do not blur. Avoid neon outlines, sparks, particles, lens flares, logos, letters, text, people, tech icons and gradients as graphic elements. Main focal forms clearly visible near the center. Deep dark greens on left retain readable negative space but no added heavy darkening overlay or vignette. A lush, sophisticated emerald architectural environment, not a UI mockup.
