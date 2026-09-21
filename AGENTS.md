# Agents Start Here

This site is a **tertiary downstream public-expression surface**. Do not use it as product truth; verify app claims against `/Users/peter/Developer/COMPASS.md` and the relevant app `APP_CONTEXT_FOR_ASSISTANTS.md`.

Source control boundary: this site lives under `/Users/peter/Developer/GitHub/` and is Git-backed/GitHub-hosted. It is **not** an exception to the commit rule: the older "use normal Git workflow here" licence was withdrawn 2026-09-03.

**Source control: Peter commits, agents never do.** Read git history freely (`status`, `log`, `diff`, `show`, `blame`); never `commit`, `push`, stage, merge, rebase, reset, switch branches, tag, or open a PR — not even for finished, verified work, and not via a branch or worktree. Hand the change over with the file list and a suggested commit message instead. Workspace rule, hardened 2026-09-03: `/Users/peter/Developer/COMPASS.md` Source Hierarchy.

**Personal data: off-limits, including looking.** Never read, write, list, copy, move, open, or index anything under `/Volumes/` other than the boot volume `Macintosh HD`; `~/Library/Mobile Documents/` (which is what iCloud Drive actually is on disk) or `~/Library/CloudStorage/`; `~/Pictures/Photos Library.photoslibrary`, any other `.photoslibrary` bundle, or the Photos app; Time Machine destinations, APFS local snapshots, `tmutil`, and `~/Library/Application Support/MobileSync/Backup/`. There is no read-only version of this: do not `ls` an external drive to see what is on it and do not `find` inside the Photos library to answer a question. Writing is default-deny: an agent authors files only in `/Users/peter/Developer/`, `~/Claude/Studio-Spreza/`, the session scratchpad, and a project's memory directory under `~/.claude/projects/` (opened 2026-09-05; only that subtree), and otherwise only in paths a tool writes for it (`~/Library/Developer/Xcode/DerivedData/`, `~/Library/Developer/CoreSimulator/`, `~/.swiftpm/` and the SwiftPM caches, the rest of `~/.claude/`), which are never hand-edited. If you are typing the path yourself, it is not one of those. Never root a recursive or destructive command at `~`, `/`, or `/Volumes/`. If a task looks like it needs a path outside the list, stop and ask. Workspace rule, added 2026-09-04: `/Users/peter/Developer/COMPASS.md` Personal Data Boundary.

**Type (2026-08-11): single-family Geist.** Cormorant Garamond and JetBrains Mono are both gone. Hierarchy is weight (400 body / 500 headings and labels / 600 wordmark and `<strong>`), size, and case; uppercase with positive tracking is the label voice that the monospace used to carry. The size steps are tuned to Geist's x-height, so they do not transfer to another family. This is now a deliberate divergence from pf-portfolio, which still runs the serif pairing and the old token names: read the header comment in `styles.css` before syncing anything between the two.

Geist ships with a metric-matched fallback: four `@font-face` rules at the top of `styles.css` reshape local Arial to Geist's exact box, so the `display=swap` handover does not rewrap text. One face per weight, because Geist widens with weight and Arial does not. The `size-adjust` values are browser-measured against this site's copy, not derived from OS/2 tables (the table-based estimate ran ~3% wide). Recalibrate with the console snippet in `.font-lab/metrics.py` after any change to the family, the weights used, or the body copy.

`.font-lab/` is the local specimen page that picked it (gitignored, not published, 560 families set in real site copy). Regenerate with `python3 .font-lab/build_specimens.py`; serve it, do not open it over `file://`.

## Compass

**Tier 1:** `/Users/peter/Developer/COMPASS.md` — Website Strategy summary, Studio guardrails, Update Protocol.

**Tier 2 (site work):** `/Users/peter/Developer/COMPASS-assessment.md` — site assessment, recommended copy, “what not to say”.

Apps are upstream truth; this site is downstream. Keep local site docs lean. Router: `/Users/peter/Developer/AGENTS.md`. Site copy: `@studio-site-copy`.

**Before done:** `@compass-update-check` — verify claims against app source; update assessment or COMPASS if public story changed.

Do not invent app claims from marketing copy alone.

## The showcase shelves carry both schemes (added 2026-09-08)

Peter: *"showcase screenshots showing light and dark mode UI variations dependent on whether the site
is being shown in light / dark mode, with a seamless fade transition."*

**Each slot holds two images, stacked and cross-faded on opacity.** The one matching the reader's
scheme is at full opacity and the other at zero, and the swap rides a 0.35s ease-out.

**Not `<picture>` with a `media` source**, which is the obvious answer and the wrong one here. The
site carries an explicit `data-theme` attribute and `<picture>` can only see `prefers-color-scheme`,
so a reader who ever gets a theme toggle would see the wrong screenshots. Stacked images also fade;
a `<picture>` source swap cuts.

**Three states, the same shape as the colour tokens:** bare `:root` for light, `html[data-theme]`
for an explicit choice, and `prefers-color-scheme` guarded by `html:not([data-theme])` so an explicit
light choice still wins on a dark machine.

**Reduced motion needs nothing.** The global rule already kills every transition, so the swap becomes
an instant cut.

### Accessibility: one name for the pair

The `.work-shot` span carries `role="img"` and the `aria-label`; **both images carry `alt=""`**. A
screen reader announcing two alt texts for one screenshot, one of them invisible, is worse than none.

### The pipeline

| Step | Command |
| --- | --- |
| Photograph the apps | `Scripts/capture-showcase.sh --app <name>` |
| Install into this site | `Scripts/publish-showcase-to-site.sh [app...]` |

The publisher writes **stable names** — `assets/<app>-h-scroll/<app>-0N-{light,dark}.webp` — so the
markup never changes and a re-shoot is two commands with no HTML edit. It picks which capture lands
in which slot; the labels live here in `index.html`.

**WebP at 768px**, because `.work-showcase-item` is at most 24rem and there are thirty of these. A
frame is roughly 45KB as WebP against 260KB as PNG, and every slot loads two.

**Labels changed with the images**, since a slot cannot be called *Rhythm setup* while showing the
status page. *Month view* went with them: the Month tier was shelved, so the slot is *Weeks*. Five
slots per app now rather than six, because five is what there are real captures for, and a shelf of
five real screens beats six with a placeholder in it.

## The app rows centre their icon, at every width (fixed 2026-09-08)

Peter, on a screenshot of the Bountiful row: *"fix this icon to text alignment."*

**`.work-lede` used `align-items: flex-start` below 820px** and `center` above it. The icon is
`4.5rem` and the name-plus-tagline block is about `3.4rem`, so top-aligning them left the icon
hanging **8.5px below the text's centre**. Measured, not eyeballed: the same 8.5px on all three rows.

It looked like a Bountiful problem because that is the row Peter happened to be looking at. It was the
shelf.

**The fix is one word.** `center` at every width, and the redundant declaration dropped from the
820px block. That is the narrow layout catching up with the wide one rather than a new decision.

**Verified at three widths** — 375, 610 and 1000 — with the icon-to-text centre delta measured at
each. Zero everywhere, including at 375 where Kiwido's tagline wraps to two lines and the text block
becomes *taller* than the icon.

## The full-bleed shelf measures itself in cqw, not vw (fixed 2026-09-20)

`.work-gallery` reached the viewport edges with `inline-size: 100vw` and a negative
start margin derived from `(100vw - 64rem) / 2`. **`100vw` counts the classic
scrollbar and the content column does not**, so on any desktop with a non-overlay
scrollbar the shelf overhung the layout viewport on the right by exactly the
scrollbar width and fell short of its own gutter on the left by the same amount.
Measured: `documentElement.scrollWidth` 1432 against `clientWidth` 1425 at a 1440
viewport, and the first screen started 7.5px left of where the comment said it did.

`body { overflow-x: hidden }` was hiding it. That is the tell: a clip on the body of
a page with no intentional horizontal scroll is almost always covering a vw
miscalculation.

**The fix is `100cqw` against `main#main`**, which now carries
`container-type: inline-size`. A container query length resolves against the
container's content box, which is the same box the column is centred in, so both
edges agree at every width. The body clip is gone with it.

Verified at 375, 600, 820, 1024, 1280, 1440 and 1920: zero horizontal overflow, the
scrollport's left edge at 0 and its right edge exactly at `clientWidth`, and the
first `.work-showcase-item` starting on the content column to the tenth of a pixel.

## One rule closes the app list, not two (fixed 2026-09-20)

`.work-row:last-child` drew an inset `border-bottom` and the `.section + .section`
band rule drew a full-bleed one 85px later, with nothing between them. Two hairlines
of the same colour that close to each other read as a mistake rather than a
hierarchy.

**The row rule went.** Each row's `border-top` is what separates one app from the
one above it; closing the *section* is the band rule's job, and it was already doing
it. Dropping the row's rule also moves the air to *before* the band rule rather than
after it, so the rule groups with the statement it introduces instead of trailing the
shelf it followed.

## The share card is authored as HTML (added 2026-09-20)

No page on this site carried an `og:image`, so every share of studiospreza.com
rendered a blank card. `og-image.png` at the site root now fills it, and all four
pages point at it with an absolute URL and `twitter:card` raised to
`summary_large_image`.

| Step | Command |
| --- | --- |
| Rebuild the card | `Scripts/make-studio-og-card.sh` |
| Edit the design | `Scripts/lib/og-card-studio.html` |

**HTML photographed headless, not drawn in PIL** like the pf-portfolio card, so the
card uses this site's own family, weights, tracking and colour tokens rather than a
second copy of them. Rendered at 2x and downsampled, because scrapers serve the PNG
at whatever size they like. The template is copied into the site root for the render
so its relative `assets/` paths resolve, and removed afterwards.

## Smaller, same day

- **`theme-color` has a dark value.** It carried only `#f4f0e8`, so browser chrome
  stayed paper-coloured against a near-black page. Both values are now `media`-scoped,
  on all four pages.
- **The font request stopped asking for what the site does not set.** It was
  `Geist:ital,wght@0,300..700;1,300..700`; the site uses 400, 500 and 600 and no
  italic anywhere. Now `Geist:wght@400..600`.
- **Kiwido's slot 4 and 5 labels were off by one against their captures.** Slot 4 read
  *Quick add* over the Perfect Days sheet, with an `aria-label` describing the
  composer; slot 5 read *Perfect days* over the Rank sheet. Now *Perfect days* and
  *Rank*, with matching `aria-label`s. The composer is not on the shelf at all.
  Upkeeper's *History* and Bountiful's *Patterns* were checked and are accurate: they
  describe the content, even though the screen's own nav title still reads *Detail*
  and *Over time*, because each is the previous slot's screen scrolled down.
- **Footer legal links are a 28px target**, up from 20px, which clears the 24px WCAG
  2.2 floor. The hit area is an absolutely positioned `::after` rather than padding,
  because padding would carry the hover underline away from the text.
- **`robots.txt` and `sitemap.xml`** added. The sitemap carries no `<lastmod>` on
  purpose: a hand-maintained date rots and a missing one is never wrong.

## The shelf: frames that sit on the paper, and a rail instead of a scrollbar (2026-09-20)

### Light mode had no separation at all

Measured off a render: the paper is `#f4f0e8` and the app screens photograph at about
`#f5f4f9`. **One L\* apart.** With only a hairline between them a frame read as a
window cut into the page rather than a device resting on it. Dark was 2 L\* apart and
already worked, because the border carries it there.

Four strengths were rendered side by side rather than guessed at. The quiet one was
still invisible; the lifted one started to read as a product landing page, which the
type system explicitly avoids. The middle one is what shipped:

```
--shadow-shot:
  0 1px 3px        color-mix(in oklab, var(--color-accent) 22%, transparent),
  0 10px 20px -4px color-mix(in oklab, var(--color-accent) 20%, transparent),
  0 30px 56px -14px color-mix(in oklab, var(--color-accent) 30%, transparent);
```

**Mixed from `--color-accent`, not black.** A grey shadow on this paper goes cool and
reads as a different material.

**Dark gets the edge, not the shadow.** All four dark variants looked identical: a
shadow cast on `#141210` is very nearly nothing. What changed anything was the border
weight, so dark carries 26% against light's 15%. An inset top rim was tried and
dropped: `.work-shot` clips to the image, which paints over any inset shadow, so it
drew literally nothing.

**The scrollport clips the shadow.** A box with `overflow-x: auto` computes
`overflow-y` to `auto` as well, so `.work-gallery` clips both axes. Its
`padding-block-end` is sized from the widest shadow layer (30 + 56/2 − 14 = 44px);
anything shorter cuts the shadow off in a straight line under every frame.

### The native scrollbar is gone

It ran the full viewport width instead of the content column:
`::-webkit-scrollbar-track`'s `margin-inline` is ignored, and the thumb started at
**x=3** where the design called for 208. It was also the loudest element on the page,
and on Safari's overlay scrollbars it may never appear, so the shelf's only affordance
was browser-dependent.

`.work-rail` replaces it: a hairline the width of the content column, thumb inked in
the row's own app accent, driven by `main.js`. Click to jump, drag to scrub.

- **`aria-hidden` and pointer-only on purpose.** It duplicates scrolling the
  scrollport already has, and the scrollport is focusable and arrow-scrollable.
- **It ships `hidden`** and `sync()` reveals it. With scripting off, or if the script
  fails, it would otherwise render a static bar at the CSS fallback width that cannot
  be dragged: a control that lies.
- **Snap is dropped for the duration of a drag** (`.is-railing`). Mandatory snap
  re-snaps every `scrollLeft` assignment, so the thumb jumps away from the pointer.
  Restoring the class re-snaps by itself.
- **The track is a hint at rest** (1.1:1) and comes up on shelf hover. At full
  strength it is a content-column hairline sitting 40px from the next row's
  `border-top`, and the two read as a doubled rule. The row's bottom padding went from
  `--space-9` to `--space-12` for the same reason.
- **`.work-shelf` needs `grid-template-columns: minmax(0, 1fr)`.** Left implicit, the
  column auto-sizes to max-content, and the gallery inside is deliberately wider than
  the page, so the track grew to the viewport edge and dragged the rail out with it:
  measured at 1425 where the column ends at 1224.

Verified by dispatching pointer events at known coordinates: click at clientX 400, 600
and 200 produced scrollLeft 503, 1034 and 0 against computed expectations of 503, 1034
and 0, and a down-then-move drag landed on 1231 of 1231.

### The three accents are the icons' own hues

Sampled from the 144px masters, then normalised to a single OKLCH lightness and chroma
per scheme so the set reads as one ramp rather than three intensities. Only H differs:
Kiwido 129.5, Upkeeper 92.3, Bountiful 28.3.

| Scheme | Ramp | Rendered | Contrast on ground |
| --- | --- | --- | --- |
| Light | `oklch(0.56 0.11 H)` | `#5f8136` `#8b7210` `#ac594f` | 3.95, 4.09, 4.30 |
| Dark | `oklch(0.6 0.105 H)` | `#6c8c46` `#967e2a` `#b7665c` | 4.87, 4.73, 4.51 |

All clear the 3:1 floor for a non-text indicator. The dark ramp was first set at
L 0.68 and measured 6.2–6.7:1, visibly louder than its light counterpart; L 0.60 puts
the two schemes within a few tenths of each other.

**Bountiful's mark reads red, not plum.** The icon's dominant hue is the pomegranate
seed at 28°. The accent is still *called* plum; the site matches what sits next to it
on the page.

### Rejected

- **A hover state on the frames.** They are not interactive in this pass, and a lift
  on hover promises a lightbox that does not exist. Revisit if one ships.
- **A bottom fade over the frame crop.** The frames do not crop: they are
  `1206/2622` against sources that are `768x1670`. Screens that end mid-content end
  that way in the capture, which is what a phone screen looks like. A fade would be
  faking a platform behaviour that is not broken.
- **A soft mask on the scrollport's left and right edges.** The hard cut at the
  viewport edge *is* the "there is more" signal; softening it weakens the only
  affordance the shelf has at rest.
- **Tinting the focus ring per app.** `--color-focus-ring` is a tuned value (raised
  from 0.45 alpha to clear 3:1); three new colours would each need re-tuning for one
  decorative gain. The ring's `outline-offset` did change, from +4px to −3px: on an
  element as wide as the viewport a positive offset drew the left and right edges
  off-screen, so keyboard focus showed as two stray horizontal lines.

### Capture note

Headless captures in this repo used Microsoft Edge, which is **no longer installed**.
Arc and Dia ignore `--headless` and open real windows, so they are not substitutes.
Until another Chromium is available, verification runs through the in-app Browser pane:
measure with `javascript_tool`, and nudge the page with a scroll before every
screenshot, because a hidden pane returns a stale or blank frame otherwise.

## The theme toggle, and the polish fixes that preceded it (2026-09-21)

### Two defects from the shelf pass, found by `/polish-check`

**The rail was hostile on touch.** Measured at 390px with `pointer: coarse` and
`hover: none` both true: the box was **350x20**, under the 24px WCAG 2.2 target
minimum that the footer links had been raised to clear one pass earlier, and its
`touch-action` was **`none`**, which hands the element every gesture including
vertical panning. A swipe begun anywhere on that strip would not scroll the page, and
there were three of them. The track's hover reveal can never fire on `hover: none`
either, so on a phone it was a permanently faint line offering a gesture the shelf
already answers directly.

Now 24px, `touch-action: pan-y` so vertical panning stays with the browser, and
`pointer-events: none` under `(pointer: coarse)`. On touch the rail is an indicator,
not a control. It still tracks position, which is worth having on the narrowest
screen.

**The accent ramp had no fallback, and the failure mode was an invisible control.**
Measured: with `--accent-kiwido` made unparseable, `.work-rail-thumb`'s background
computed to `rgba(0, 0, 0, 0)`. A `var()` fallback does not catch this. A declaration
referencing a custom property that holds an unparseable value is *invalid at
computed-value time*, and IACVT resets the property to its initial value; it does not
fall back to an earlier declaration, and `var(--row-accent, …)`'s fallback fires only
when the property is **unset**, never when it is invalid.

So the ramp now ships as sRGB hex in all nine declarations and is upgraded inside
`@supports (color: oklch(…))`. The hex is exactly what each OKLCH value resolves to.
Every other modern-colour feature here degrades to something visible when unsupported
(a failed `color-mix()` border falls back to `currentColor`), which is why this was
the one place that needed guarding.

### The toggle

**Three states, cycling auto → light → dark.** Two would be simpler and would throw
away the third state the tokens were built around: bare `:root`, `html[data-theme]`,
and `prefers-color-scheme` guarded by `:not([data-theme])`. A reader whose machine
turns dark at sunset can keep that, and can get back to it after trying the others.
`auto` is the *absence* of a stored key, not a stored value.

**One glyph, three readings**, and each state shows the mark for the state it is
**in**, not the one a press would move to: a control that displays its own value is
readable at a glance, one that displays its next value has to be reasoned about. Sun,
crescent, half-filled disc. The `aria-label` names both ("Theme: light. Switch to
dark."), and a visually hidden `aria-live` span announces the new state.

**A synchronous inline `<script>` in every `<head>`**, before the stylesheet, applies
a saved choice before first paint. It is mirrored onto the three policy pages, which
load no `main.js` at all, so a choice made on the home page carries to them. Verified:
`/privacy/kiwido/` loads at `rgb(20, 18, 16)` with no toggle present.

**`theme-color` reads the token, not the painted background.** The first version read
`getComputedStyle(document.body).backgroundColor` at the moment of the swap and got
whatever the cross-fade was part-way through, so browser chrome took the colour we
were *leaving*. Custom properties do not animate, so
`getComputedStyle(root).getPropertyValue('--color-surface-base')` is already the final
value. The two media-scoped tags are set to the chosen colour while a choice is
active, and restored to their originals on `auto`.

**The cross-fade is a class, not a standing rule.** Custom properties do not
transition, so swapping `data-theme` is an instant cut on every surface at once.
`html.is-theming` puts a `--duration-medium` transition on colour, border, shadow and
outline for one beat and is removed after 420ms. Left standing it would put the same
delay on every hover and focus ring on the page. The global reduced-motion rule turns
it back into a cut, and the class is not even added when reduced motion is set.

**The App Store badges came off `<picture media>`.** That can only see
`prefers-color-scheme`, so an explicit theme showed the wrong badge: the same argument
that made the showcase shelves stacked images. They are now a `--appstore-badge`
background token, and the anchor carries the accessible name (the old markup had the
name twice, on both the anchor's `aria-label` and the img's `alt`).

Verified across the full cycle: `data-theme`, body background, app icon, App Store
badge, showcase image opacity, rail accent, both `theme-color` tags and `localStorage`
all follow, and `is-theming` is never left on the element.

## The reveal was firing at the wrong things, and the page ended in two thin bands (2026-09-21)

### A 1,175px reveal unit only ever revealed its first 72px

`[data-reveal]` sat on `.work-row`. Measured at 1440x900: a row is **1175px** tall,
and IntersectionObserver fired it when its *top* crossed the fire line, which is
**1085px** before the shelf at the bottom of that row reached the screen. The 0.9s
animation was finished a thousand pixels earlier. The only thing that ever visibly
revealed was the app's name.

The row is no longer a reveal unit. `.work-lede` and `.work-shelf` are, and both now
fire when the thing they animate is actually arriving: `lateBy` measures 0 for every
lede.

### The shelf reveals its frames, not itself

The scrollport stays put and the five frames come up in sequence, 50ms apart, the last
one in at 0.65s. This is the one piece of motion on the site that explains something
rather than decorating: a strip whose contents arrive one after another reads as a
strip you can keep going along, which is the affordance the shelf most needs and least
has.

`.work-shelf[data-reveal]` therefore overrides the generic hidden state back to
visible and pushes it down to `.work-showcase-item`. **Three escape hatches had to
learn the new selector**, not one: the `prefers-reduced-motion` block, the
`@media (scripting: none)` block, and the `<noscript>` style in every `<head>`.
Verified by stripping every `is-visible`, applying the reduced-motion kill plus the
selector pair, and confirming all five frames sit at opacity 1 with `transform: none`.

**Per-frame observation was rejected.** Giving each `.work-showcase-item` its own
`data-reveal` would reveal frames as you scroll the shelf, which sounds better and is
worse: a frame peeking at the right-hand edge is only a few percent intersected, so it
would stay invisible, and that peek is the shelf's entire "there is more" signal at
rest.

### `threshold: 0.08` is a height-dependent trigger

With the shelf as the unit the first shelf never revealed at all on landing. A
percentage threshold scales with the element: 8% of a 950px shelf is 76px, and only
40px of it sits above the fire line at the top of the page. `threshold` is now **0**,
which leaves the "not on a sliver" job entirely to `rootMargin`, in pixels, the same
for every element whatever its height.

This was latent before rather than new. The old 1175px row needed 94px and happened to
have it.

### The page now ends with a sign-off, not two bands

`.studio-note` and `.contact` were two sections, each with its own padding and a rule
between them: 112px and a hairline separating one sentence from the address it belongs
to. They are one closing band now. The rule between is suppressed, the note carries
the top padding and the contact the bottom, and the gap between the sentence and the
address is 28px.

Verified after: zero horizontal overflow and the rail still exactly on the content
column at 390, 820, 1440 and 1920.

## Geist is self-hosted, and the site now makes no third-party request at all (2026-09-21)

### What was there

A render-blocking `<link>` to `fonts.googleapis.com` on all four pages. The browser
reports it as `renderBlockingStatus: "blocking"`, and it costs **two origins** before a
glyph is drawn: DNS and TLS to googleapis for the stylesheet, then the same again to
gstatic for the file. `preconnect` hides some of that and cannot remove it.

### What ships now

| File | Bytes |
| --- | --- |
| `assets/fonts/geist-latin.woff2` | 29,288 |
| `assets/fonts/geist-latin-ext.woff2` | 16,540 |
| `assets/fonts/OFL.txt` | 4,387 |

Both subsets are **variable across 400–600**, the only weights this site sets. The
other three subsets Google serves (cyrillic, cyrillic-ext, vietnamese) are neither
downloaded nor declared. `unicode-range` is copied verbatim from the Google stylesheet
so the split between the two files behaves exactly as it did. `index.html` and each
policy page preload the latin file only; latin-ext loads on demand and, on the current
copy, never does.

The licence file sits next to the fonts because redistributing an OFL family requires
it.

**Font URLs stay relative.** They resolve against `styles.css`, which lives at the
root, so `assets/fonts/…` is correct from the policy pages too. The `<link
rel="preload">` resolves against the *document*, so that one is root-absolute. Both
verified on `/privacy/upkeeper/`.

### Measured

- **Zero external requests** on both page types. The only non-origin entry in Resource
  Timing is the inline `data:` URI for the grain, which is not a network fetch.
- The latin face is fetched by the preload at 9ms and done at 14ms.
- The rendered heading measures 637.3px against Geist's 637.3 and the Arial stand-in's
  645.8: it is the real face, not the fallback.
- All four metric-matched fallback faces report `unloaded`. They are now belt and
  braces rather than load-bearing, and they stay: `local()` never downloads anything,
  and they still cover a cold cache, a slow link and a failed fetch.

Critical path before first meaningful paint is now HTML 3KB + CSS 16KB + font 29KB
gzipped, all same-origin. The heavy commenting in `styles.css` costs almost nothing
over the wire: 57KB raw, 16KB gzipped.

**This is worth keeping true.** A studio that ships privacy policies and sells nothing
by subscription now also phones nobody. Adding an analytics snippet or a hosted font
would quietly end that.

### The remaining payload is images, and it belongs to the re-shoot

A landing at 1440 pulls **828KB across 28 requests, of which 687KB is WebP** across 20
showcase frames. Every slot holds two images so the theme toggle can cross-fade them,
which is the right trade now that the toggle exists, but the frames are 768px sources
displayed at 384 CSS pixels: a 1x screen is being sent four times the pixels it can
show.

The fix is a `srcset` with a 384px variant, and it should be **emitted by
`Scripts/publish-showcase-to-site.sh` alongside the existing sizes**, not hand-written
into 30 `<img>` tags that the next re-shoot would invalidate. Doing it here would also
mean re-encoding captures that are already queued for replacement. It goes with the
capture-rig project.
