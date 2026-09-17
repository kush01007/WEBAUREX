# Webaurex homepage V2

## Stage 1

Preview: `/preview`. The existing homepage remains at `/`.

Implemented: scoped design tokens, navigation with a native mobile dialog, original-video grayscale/colour reveal, text entrance, scroll exit, pause control, and a short studio introduction to exercise the transition.

The original `/videos/webhero.mp4` is used directly, at the user's request. Do not replace or compress it automatically. `/images/webhero-v2-poster.webp` is a still extracted from that same clip. No generated media or new dependencies are needed for this stage.

## Editing map

- `src/data/homepage-v2.js`: copy, destinations, project order/scope, and services.
- `components/homepage-v2/tokens.module.css`: scoped colours, spacing and shared values.
- `HomepageV2.jsx`: page composition.
- Each section owns its JSX and CSS Module. Readable `v2-*` classes and `data-section` attributes are DevTools hooks, not global styling targets.
- `hero/shaders.js`: grayscale blend and soft local colour mask.
- `hero/createVideoRenderer.js`: single-video WebGL texture and resource lifecycle.
- `hero/HeroVideoReveal.jsx`: pointer, viewport, playback and visibility handling.
- `hero/Hero.module.css`: composition, typography, responsive behaviour and entrances.

No V2 section rules are added to `globals.css`. Legacy `homepage.css` is imported by the original page, not the root layout. Existing globally named legacy classes do not match the V2 classes. For small Tailwind edits, use layout wrappers or unowned properties; avoid defining the same property in both a utility and a CSS Module.

## Stage 2 — Selected Work

Implemented at `/preview#work`, in this order: Bold Cave, Sumukh Visuals, Styleloom. Work navigation and both explore links now stay on the preview page.

- `work/SelectedWork.jsx`: section heading, project index and closing enquiry link.
- `work/ProjectCard.jsx`: server-rendered project art, title, scope and external website links. No project detail pages are created.
- `work/SelectedWork.module.css`: all project layouts, three art directions, stack transforms and responsive styles. Bold Cave has the largest title and a warm spotlight. Existing images are served through Next Image.
- `work/WorkMotion.jsx`: native scroll with a perspective stack, gentle image movement, spotlight and eased local visit cursor. A single scheduled scroll frame batches geometry reads; it does not intercept wheel/touch scrolling. Plain anchors preserve project navigation and keyboard access to covered cards.
- Desktop panels use most of the viewport height, with a flexible image area above the actual content height. The scrolled navigation is approximately 64px high; the initial desktop navigation is 80px.
- Below 900px width, below 650px height, with reduced motion, or without JavaScript, projects use the normal document flow. Keyboard focus inside the stack also restores normal flow so later cards cannot cover the focused link. Reduced motion also disables cursor and hover animation.

Edit names, URLs, image paths, descriptions, statements and scope in `src/data/homepage-v2.js`. Styleloom is not labelled as client work. Supplied imagery is used as project art; the page does not claim photography or visual-asset authorship.

The original 40 MB hero video is unchanged. Work, Services and enquiry now stay on the V2 homepage.

## Stage 3 — Services through footer

Implemented on `/preview`:

- `services/Services.jsx` and its CSS Module: four numbered, expandable rows with a single open panel, smooth height transitions and inert collapsed content. Small decorative wireframes live in `ServiceDiagram.jsx`.
- `process/Process.jsx`: a quiet light section with four steps, scope/outcome copy and no animated counters or scroll pinning.
- `stories/ClientStories.jsx`: all five existing quotes from `src/data/homepageData.js`, unchanged. No names, avatars or ratings were invented. Manual previous/next controls, five position buttons and native swipe/scroll; no automatic advance.
- `faq/Faq.jsx`: six native, single-open disclosures. These work without JavaScript.
- `contact/Contact.jsx` and `EnquiryForm.jsx`: cinematic heading using a faint still from the original hero, followed by a project enquiry form. Required name/email/message, optional service choices, timeline and budget; a review step retains the entered details when editing.
- `footer/Footer.jsx`: page navigation, email, back-to-top and the studio wordmark. No location or unused destination links.

Each section owns its CSS Module. The new section copy, process steps, FAQ entries and service choices are in `src/data/homepage-v2.js`; the retained quote copy stays in `src/data/homepageData.js`. No section styles were added to `globals.css`, and no dependencies were added.

### Enquiry delivery boundary

The form prepares an encoded `mailto:` draft for `webaurex@gmail.com`. It does not claim a message was sent, make a network submission, or persist form data. The visitor reviews the brief and explicitly opens/sends it in their email app. A copy button and selectable plain-text brief cover email-client limitations. Direct server-to-inbox delivery remains Stage 5.

Verified: required-field validation, two service selections, newline/ampersand preservation in the email draft, review focus, and returning to edit without losing the brief. No test email was sent. Services open one panel at a time, all five quote positions are present, the last quote disables Next, and FAQ disclosure grouping works. Targeted ESLint and production build pass.

## Behaviour and fallbacks

- One original video supplies both colour and monochrome regions; no independent video clocks.
- Pixel ratio is capped and texture upload is skipped while the video's playback timestamp is unchanged.
- Canvas rendering stops when the hero leaves the viewport. Video playback stays warm offscreen to avoid a restart hitch when returning to the hero, and pauses when the tab is hidden.
- Reduced-motion users start with a still poster and can explicitly start playback.
- Coarse pointers get a slow local colour sweep and touch-following reveal; scrolling is not prevented. The idle sweep stops with Pause or reduced motion.
- No WebGL / lost context falls back to the native video with a grayscale CSS filter.
- Mobile navigation uses native dialog focus handling and Escape dismissal.
- All main navigation stays on the preview. The enquiry flow prepares an email draft; direct inbox delivery is a later stage.

## Agreed next stages

2. Completed: animated Selected Work, using the three existing project images. Bold Cave leads. No full project pages.
3. Completed: four expandable services, studio/process content, existing five quotes, simple FAQ, cinematic contact/enquiry review and footer. Email: webaurex@gmail.com. No location or invented client identities.
4. One simplified crystal assembly matching the hero's material and green light; explore connected Higgsfield tools only when asset work is needed.
5. Responsive/performance/accessibility checks, real enquiry delivery, homepage switch, then unused legacy cleanup.

## Hero rebuild — 10 September 2026

The `/preview` hero now uses a neutral monochrome base, silver letter-by-letter wordmark entrance, compact two-line copy, and a seven-point optical colour trail. The shader refracts the original video sample and draws bloom from its highlights, with eased pointer movement and a fading trail. The same original 40,415,054-byte video remains in place. Desktop navigation is 72px initially and 64px after scrolling, with neutral accents.

The wordmark now renders each complete word as one text run, preserving kerning and every glyph edge while keeping a two-step entrance and silver material pass. Its baseline sits lower in the viewport, and the earlier “Design & development studio” eyebrow has been removed. The pointer field uses a tighter irregular contour and a refractive lens edge with restrained bloom.

Hero video preload begins immediately, the reduced-motion server fallback no longer delays ordinary playback, and the shader canvas appears on its first rendered frame without a long crossfade. Scroll-linked media scaling and wordmark translation were removed to avoid compositing blur while returning to the top.

Hero markup, layout, input/animation lifecycle, renderer and shader remain separate in `hero/`; navigation styling remains in its own CSS Module. No dependencies or global styles were added. Desktop shader output, pointer reveal, pause/play, mobile menu, and 360px/390px layout were checked in the preview; physical touch-device verification is still needed. The rest of the homepage retains its earlier stage implementation and needs a separate redesign pass.

## Checkpoint

The Git index was already unreadable (`index file smaller than expected`) before Stage 1. Git metadata was left untouched. The source/config/docs snapshot is `C:/Users/kushg/AppData/Local/Temp/webaurex-before-stage1-20260910-011651.zip`.
