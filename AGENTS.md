# Agents Start Here

This site is a **tertiary downstream public-expression surface**. Do not use it as product truth; verify app claims against `/Users/peter/Developer/COMPASS.md` and the relevant app `APP_CONTEXT_FOR_ASSISTANTS.md`.

Source control boundary: this site lives under `/Users/peter/Developer/GitHub/` and is Git-backed/GitHub-hosted. It is **not** an exception to the commit rule: the older "use normal Git workflow here" licence was withdrawn 2026-09-03.

**Source control: Peter commits, agents never do.** Read git history freely (`status`, `log`, `diff`, `show`, `blame`); never `commit`, `push`, stage, merge, rebase, reset, switch branches, tag, or open a PR — not even for finished, verified work, and not via a branch or worktree. Hand the change over with the file list and a suggested commit message instead. Workspace rule, hardened 2026-09-03: `/Users/peter/Developer/COMPASS.md` Source Hierarchy.

**Personal data: off-limits, including looking.** Never read, write, list, copy, move, open, or index anything under `/Volumes/` other than the boot volume `Macintosh HD`; `~/Library/Mobile Documents/` (which is what iCloud Drive actually is on disk) or `~/Library/CloudStorage/`; `~/Pictures/Photos Library.photoslibrary`, any other `.photoslibrary` bundle, or the Photos app; Time Machine destinations, APFS local snapshots, `tmutil`, and `~/Library/Application Support/MobileSync/Backup/`. There is no read-only version of this: do not `ls` an external drive to see what is on it and do not `find` inside the Photos library to answer a question. Writing is default-deny: an agent authors files only in `/Users/peter/Developer/`, `~/Claude/Studio-Spreza/`, the session scratchpad, and a project's memory directory under `~/.claude/projects/` (opened 2026-09-05; only that subtree), and otherwise only in paths a tool writes for it (`~/Library/Developer/Xcode/DerivedData/`, `~/Library/Developer/CoreSimulator/`, `~/.swiftpm/` and the SwiftPM caches, the rest of `~/.claude/`), which are never hand-edited. If you are typing the path yourself, it is not one of those. Never root a recursive or destructive command at `~`, `/`, or `/Volumes/`. If a task looks like it needs a path outside the list, stop and ask. Workspace rule, added 2026-09-04: `/Users/peter/Developer/COMPASS.md` Personal Data Boundary.

**Type (2026-08-11): single-family Geist.** Cormorant Garamond and JetBrains Mono are both gone. Hierarchy is weight (400 body / 500 headings and labels / 600 `<strong>`), size, and case; uppercase with positive tracking is the label voice that the monospace used to carry. The size steps are tuned to Geist's x-height, so they do not transfer to another family. This is now a deliberate divergence from pf-portfolio, which still runs the serif pairing and the old token names: read the header comment in `styles.css` before syncing anything between the two.

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

**The card carries the brush mark since 2026-10-05**, centred like the hero, with the hero's
six-accent medley behind it since 2026-10-06 (it had the single glow on one centred ellipse). The template holds a `<!-- spreza-mark -->` placeholder and the build
script swaps in `Assets/studiospreza-script.svg`, so the path has one source and a retrace
reaches the card on the next build. The mark is 216px tall; content sits 48px from the top
and 54px from the bottom of the 630px card (68 and 73 until the subtitle took two lines,
2026-10-06), and the mark centres at x 600.0. Checked
downsampled to 500px wide, about the size most link previews show it: the mark still reads.

**Every page's card URL carries `?v=<hash>`** (2026-10-05), the first 8 hex of the PNG's
SHA-256, stamped by the build script. Scrapers cache a card by URL, so a rebuilt card at the
same address keeps showing the old one wherever the site was shared. A hash rather than a
date because the render is deterministic (two builds, identical bytes): a rebuild that changes
nothing rewrites no page. The script refuses (exit 1) if a page has lost either tag, so a new
page must carry both `og:image` and `twitter:image` before the next build. **Do not edit the
tag by hand**; run the script.

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

Normalised to a single OKLCH lightness and chroma per scheme so the set reads as one
ramp rather than three intensities. Only H differs: Kiwido 129.5, Upkeeper 92.3,
Bountiful 355.

**Amended 2026-09-22 (SDS-D008).** Kiwido's and Upkeeper's hues were sampled from the
144px icon masters and happen to match those apps' own signature accents — kiwi and
lemon — within 2.7 degrees. **Bountiful's did not.** Its icon is a pomegranate, so a
sampled hue gave 28.3, a terracotta, while the app's signature accent is **plum** at
355. The site was painting Bountiful in a colour the app does not use.

Peter's call, 2026-09-22: the swatch follows the **app's accent**, not the icon.
Lightness and chroma are unchanged, so the ramp still reads as one set; only H moved.
Where an icon hue and an app accent disagree in future, the app accent wins, and this
paragraph is why.

| Scheme | Ramp | Rendered | Contrast on ground |
| --- | --- | --- | --- |
| Light | `oklch(0.56 0.11 H)` | `#5f8136` `#8b7210` `#a65778` | 3.95, 4.09, 4.34 |
| Dark | `oklch(0.6 0.105 H)` | `#6c8c46` `#967e2a` `#b16483` | 4.87, 4.73, 4.47 |

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
**The share card no longer needs one** (2026-10-02): `Scripts/make-studio-og-card.sh`
falls back to `Scripts/lib/render-html-webkit.swift`, an offscreen `WKWebView` that ships
with macOS.
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

**Done 2026-10-02.** The publisher writes a 384px twin beside every frame
(`<app>-0N-<scheme>-384.webp`) and each `<img>` names both, with
`sizes="(max-width: 436px) 66vw, (max-width: 819px) 288px, 384px"`: the three
widths `.work-showcase-item` actually takes (`min(18rem, 66vw)` below 820px, 24rem
above), in px because a `sizes` rem is the initial 16px either way and `min()` in
`sizes` is not safe in every Safari still in use. Measured in Chromium at 2x: a
384px slot and a phone slot both resolve to the 768 file, and the 1x equivalent
resolves to the 384 one when neither is cached. Sixty frames are about 2.2MB at 768
and 1MB at 384, so a 1x reader who scrolls the whole shelf saves about 1.2MB.
**Chromium keeps the larger file once it has it**, so a probe against an already
loaded frame reports 768 at any size; test with uncached URLs. `height` is now
1670, the files' real height (it said 1669).

## Six apps on the shelf (2026-10-02)

Peter put **Bilberry, Notation and Homegrown** on the shelf, with the meta copy and the
share card to match. Compass Decision Log, 2026-10-02, carries the positioning; this
section carries the site.

**Order is launch priority**: Kiwido, Upkeeper, Bountiful, Bilberry, Notation, Homegrown.
**Taglines are the in-app shelf lines** (`DOC-SETTINGS-DESIGN-SYSTEM.md` S1a), word for
word. **Every badge is the same non-live placeholder**, and no copy may say any app is
available. Homegrown's frames show the pilot catalogue's wide, provisional estimates, so
no line here may claim care coverage or a plant count.

### Accents

The ramp is unchanged; three hues joined it, each the app's own accent (SDS-D008, above):

| App | H | Light | Contrast | Dark | Contrast |
| --- | --- | --- | --- | --- | --- |
| Bilberry | 263 (Blueberry) | `#5273b5` | 4.14 | `#5f7fbf` | 4.70 |
| Notation | 51 (Husk) | `#a76033` | 4.26 | `#b26d43` | 4.57 |
| Homegrown | 145 (Fern) | `#47854a` | 3.91 | `#569158` | 4.95 |

All in sRGB gamut at both points of the ramp, all over the 3:1 floor. **All six are traced**
by `Scripts/check-sds.sh` against each app's own spec dump: Blueberry, Husk and Fern land within
0.5° of their app's signature hue (Homegrown's dumper was written for this, 2026-10-02). **Fern and Kiwi sit
15.5 degrees apart**, the closest pair on the page. They are the apps' own accents, so
they stay; the rows are separated by their icons and names, not their rails.

### Icons, frames and the card

- **Icons** are manifest targets (`site/bilberry-icon`, `site/notation-icon`,
  `site/homegrown-icon`), one file per app for both schemes, as Bountiful's is. Never
  export one by hand.
- **The publisher refuses instead of half-publishing** (2026-10-02, after this
  pass): a missing stem, two slots showing the same screen, or a slot identical in
  light and dark exits 2 and writes nothing for that app. Run against the night's
  bad sets it refused all three, and caught one more: Bilberry's `04-entry-dark` was
  the day page, not the editor.
- **Frames**: `Scripts/publish-showcase-to-site.sh` maps all six. **Kiwido's mapping was
  stale when this pass began**: the capture test had renumbered its moments, so three
  stems no longer existed and the publisher would have put the composer under *Perfect
  days* while leaving three slots on old files. Read the frame, not the stem:
  `11-perfect-days` is the Rank page and `12-heatmap` is the Perfect Days sheet.
- **Bilberry's frames are the 2026-09-29 afternoon set**, published with
  `SHOWCASE_SET=2026-09-29`. Its demo seeds today's entries relative to the real clock, so
  the 2026-10-02 pass, shot after midnight, had one entry on today's page and a
  "scrolled" frame identical to the first. It is one polish commit behind (2026-09-30:
  day-page photo crop, month and search sheets). **Re-shoot it in the daytime.**
- **Bountiful's Patterns slot had been repeating Over time** in every capture since
  2026-09-28: the test's swipe went through the record chart and never scrolled. The
  site still showed the 2026-09-09 frame, so nothing public was wrong, but the next
  publish would have been. Fixed in the test, which now fails on identical frames.
- **Homegrown skips its Plants grid**: until Peter's demo photos land every tile is the
  leaf placeholder, and five of them read as an empty app.
- **The share card** lays the six out as columns, icon over label, since six
  icon-beside-label pairs need about 1700px of a 1024px measure.

### Privacy and support

- **Notation's policy was already live** and is now in every footer, the sitemap, and the
  other policies' footers. Its own footer was the pre-Support version and now matches.
- **Bilberry's and Homegrown's policies went live later on 2026-10-02**, written against
  each app's code, not its plan: Bilberry has no in-app sync switch, so its page names the
  system one; Homegrown has no in-app switch for sync, Spotlight or nudges, so its page names
  the system settings for each. Neither claims photos are end-to-end encrypted (unverified).
  Every page's footer now lists Support and the five other policies, and Notation's page
  lost its `noindex`, which it should have lost when it went on the shelf.
- **The Support page answers for all six** since later on 2026-10-02: a section per new app,
  each naming the settings and behaviours the app actually has (checked in the source, like
  the policies). Notation's and Bilberry's locks both fall back to the device passcode;
  Bilberry and Homegrown have no in-app sync switch, so Support names the system one.
- **Support's sections have addresses** (2026-10-02): every `h2` carries an id, the intro's
  app names link to them, and a jump lands 20px below the top edge (`.legal h2`
  `scroll-margin-top`). Use `/support/#<app>` as that app's support URL in App Store Connect.
- **Legal-page links are underlined again.** `.legal a` always set an underline offset and
  thickness, but the global `a` reset removed the underline itself, so every link in every
  policy and on Support read as plain text. `.legal :is(p, li) a` restores it; the caps back
  link is outside `p` and `li` and keeps its own treatment.
- **Homegrown's Plant frame stays over the Guide** (2026-10-02). Its "care guide is still
  being written" line is the honest state of the pilot. The Guide frame lists species under
  "Will it grow here?", which reads as the care-coverage claim the canon forbids until the
  catalogue run.


## The wordmark is Peter's brush lettering (2026-10-05)

Peter, with a scan of the hand-lettered mark: *"Can you vectorize this and utilize it on
the Studio Spreza site?"* The Geist 600 "Studio Spreza" in the hero and in the compact
header are both the traced mark now.

| Step | Command |
| --- | --- |
| Master raster (black on transparent) | `/Users/peter/Developer/Assets/studiospreza-script.png` |
| Trace it | `python3 Scripts/trace-wordmark.py 1.2 12 Assets/studiospreza-script.svg --src Assets/studiospreza-script.png --label "Studio Spreza" --crop 0` |
| Master vector | `/Users/peter/Developer/Assets/studiospreza-script.svg` |
| On the page | the `<symbol id="spreza-mark">` at the top of `index.html`'s `<body>` |

**Same tracer as the Peter Franko signature**, which gained `--src`, `--label` and `--crop`
for this. Run without them it is byte-identical to before (checked by sha).

**Tolerance 1.2, not the 2.4 the signature uses.** Compared against the source at native
scale: 1.6 starts sanding the dry-brush nicks off the edges and 2.4 turns the mark into a
clean vector, which loses what makes it lettering. 1.2 keeps them at 40 KB (15 KB gzipped);
IoU against the binarised source 0.982, mean error under 1/255 at 480px wide.

**One path, drawn twice.** The sprite holds the path once and the hero and header each
`<use>` it, so the 40 KB is not paid twice. Inline rather than an `<img>` for the reason the
signature gave: `currentColor` only resolves in the document, and that is what lets one
path follow all three theme states.

**The viewBox is cropped to the ink** (`getBBox` fills it to 0.07px), so the box is the mark:
its left edge is the stroke, flush to the column like the subtitle under it.

**Sizing.** The hero mark is `max(5.5em, 13.5rem)` on the old `--text-display` step, so it
keeps that step's responsive curve: 387px wide at 1440, 216 at 375. The floor exists because
the step bottoms out on phones and the mark came in at 189px, narrower than the one-line
subtitle beneath it. The header mark is `3.25rem` and takes the bar's padding with a negative
margin, as the theme toggle does, so the bar stays 56.19px. **The margin is on the link, not
the SVG**: on the SVG it shrank the link to 22px and the focus ring cut through the ink.

**Accessible name** is a `.visually-hidden` "Studio Spreza" beside an `aria-hidden` SVG in
both places, the pattern `pf-portfolio` uses for the signature.

**The hero is centred** (Peter, same day): `.hero-copy` is `text-align: center` with both
children on `margin-inline: auto`, and the scroll handoff's shrink now scales from
`center top`, not `left top`, so the mark recedes onto its own axis. Measured: mark box and
subtitle line both centre on the column to 0.00px at 1440 and 375. The subtitle's letters sit
1.7px left of that, the half-advance of its final period; too small to correct with the
punctuation hang `pf-portfolio` needed at 10px. Everything below the hero stays flush left.

**The header mark followed it onto the axis** (Peter, 2026-10-06, from `/polish-check`).
Centring the hero left the scroll handoff 486px wide at 1440 (hero mark centre 720, header
mark 234): the motion is built to read as one mark settling into the bar, and it read as two.
`.header-inner` is now a `1fr auto 1fr` grid with the mark in the middle track and the theme
toggle at the end of the last, so the mark holds the axis whatever the toggle's width,
including while it ships `hidden`. Measured from fresh loads: both marks centre at 720, 400,
187.5 and 160 at 1440, 800, 375 and 320, the bar is still 56.19px, and nothing overflows.
(A resize in the pane once reported a 611px page at 375; it was the pane, and a fresh load at
the same width measured 375.)

**The subtitle is `text-wrap: balance`.** At 320 it wrapped as "…apps made in" over a lone
"NYC.", which centring made louder. Now "Subscription-free" over "apps made in NYC.", lines
140 and 151px. One line from 375 up, unchanged.
**Since 2026-10-06 it breaks by hand** (Peter): "Subscription-free apps" over "made in NYC.",
a `<br />` in the markup, at every width. Measured at 336: both lines centre on the column to
0.5px. `balance` stays for a screen too narrow for the first line. The share card breaks the same way.

**The glow followed** (Peter, same day): `.hero-glow` was two layers at 22% and 82%, set for
the flush-left hero. It is now one, at 50%, with the old main layer's strength and reach.
Moving both to the centre would have stacked them to nearly twice the depth. Measured off a
2x render: peak darkening 219.8 against 219.6 before (paper 237.3), now symmetric about the
column axis; the right-hand corner is lighter for losing the second layer.

**Verified** at 1440, 800 and 375, light and dark, through the scroll handoff (hero mark
blurs out as the header mark settles in), and with keyboard focus on the header link. No
horizontal overflow, no console errors.

**Followed later:** the share card took the mark the same day (see the share card section),
and the favicon and the policy pages' back link the day after (2026-10-06).

**The policy pages draw the mark from `assets/spreza-mark.svg`**, not an inline sprite: seven
pages share one cached file through `<use href="/assets/spreza-mark.svg#spreza-mark">`, still
`currentColor`, so it follows the theme. The back link is the header's 3.25rem. Its colour is
`.legal a` (primary, muted on hover), which outranks `.legal-back`: the old uppercase label's
muted colour never actually applied. **The file is a copy of the `<symbol>` in `index.html`**;
after a retrace, refresh both, or the policy pages keep the old mark.
**`assets/spreza-mark-mask.svg` is a third copy** (2026-10-06): the master with its role and
label stripped, the mask for the hero's dye. After a retrace, refresh it too, or the colour
lands beside the new letterforms.

## The favicon is the S of the wordmark (2026-10-06)

Peter picked it from two rounds of sketches: the S of "Studio", paper on an ink tile, one
version for both colour schemes. It replaced a purple squircle with "Studio Spreza" set in
Geist, which was off-palette and unreadable at tab size. Ruled out on the way: the S of
"Spreza" (too narrow for a square), "St" and "Sp" (smudge at 16px), a paper tile (vanishes on
a light tab strip), the "o" (reads as a zero), six accent seeds (mush, and tied to the shelf).

| Need | Do this |
| --- | --- |
| Regenerate all four files | `python3 Scripts/make-studio-favicons.py` (workspace `Scripts/`) |
| Source | the leftmost subpath of `/Users/peter/Developer/Assets/studiospreza-script.svg`, so a retrace carries through |

**Never hand-edit the files.** `favicon.svg`, `favicon.png` (48px), `favicon.ico` (16/32/48,
unlinked, for clients that ask for `/favicon.ico` directly) and `apple-touch-icon.png` (180px,
full-bleed square: iOS rounds it) all come out of the script. The three tab sizes thicken the
stroke by 14 path units, because the traced brush is about 1px wide at 16px; the Home Screen
icon keeps the stroke as traced.

**The Home Screen icon carries the site's atmosphere; the tab files stay flat** (Peter,
2026-10-06, option F of six flavour sketches). Three layers, none of them in the tab sizes:
the hero's medley in its dark-mode accents (since 2026-10-06; it was the `.hero-glow` light,
`#c9bca8` at 13% from the top centre), ink that
runs `#262019` at the top to `#0f0d0a` at the bottom with a 7% rim along the top edge, and
the page grain multiplied into the paper S. The grain is seeded, so a rerun is byte-identical.
Passed over: a vermilion maker's seal under the S, which survived at 16px but read as a
sticker.

**Link order matters.** Every page lists the PNG with `sizes="48x48"` first and the SVG
second. With a sized raster ahead of it, Chrome and Firefox both take the SVG.

## The hero mark writes itself in, and dark mode lights it (2026-10-06)

Peter, on *"what could make this top section even cooler and more eye-catching, while
remaining restrained"*: five ideas were rendered from real copies of the site, critiqued, and
reworked; he picked these two.

**The write-on follows the pen, not a wipe.** The first version swept a soft mask across
each line, which filled letters column by column (the "d" stem appeared whole) and dragged
a grey band across every stroke. Now each letter is uncovered along its own centre-line, in
reading order, with pen lifts between strokes: about 2.1s, once per load.

| Step | Command |
| --- | --- |
| Regenerate after a retrace of the mark | `python3 Scripts/pen-wordmark.py` |
| Timing (pen speed, gaps, settle) | constants at the top of that script |
| The motion | `styles.css`, "Pen write-on" |

- **The script writes two marked blocks in `index.html`** (`spreza-sprite`, `spreza-pen`).
  Do not hand-edit either. The sprite's symbol is now one `<path>` per letter, so the header
  still draws the whole symbol and the hero `<use>`s each letter through its own mask: the
  path data is on the page once. Pen data is 7.9 KB.
- **Centre-lines are found, not drawn**: the master is thinned to one-pixel lines (Zhang-Suen,
  half resolution), each connected ink shape is a letter, and a greedy walk orders its line
  from the leftmost free end, lifting the pen only at a real gap. Stroke order is therefore a
  heuristic. If a letter writes in an order that looks wrong, fix it in the script, not here.
- **Masks are per letter**, so a 118-unit pen cannot uncover the letter beside it.
- **The resting state is the finished mark.** Pen lines carry no dash outside the
  reduced-motion guard, so Reduce Motion, or CSS that never loads, shows the whole mark. The
  dash is `1 1.2` with offset `1.1` because a dash ending exactly at a path's start still
  paints its round cap: the first build showed a dot on every letter before its pen arrived.
  `.pen-rest` covers each letter whole as its last stroke lands, so fray a centre-line never
  reached fills in rather than staying missing.
- **Verified**: with motion removed and after the write finishes, the mark matches the static
  render to 3 pixels of antialiasing (83,959 of 83,961 ink pixels). Frames at 0.6s and 1.2s
  show the write in progress. Live in the pane: every stroke and settle finishes, header
  mark intact, no console errors. **Capture note:** the pane cannot photograph a running mask
  reveal (it returns a stale or finished frame) and throttles a hidden tab's timeline, so mid-
  write stills come from `Scripts/lib/render-html-webkit.swift` with the animation paused at a
  negative delay.

**Phone check, dark mode (same day).** Two fixes came out of it. **Stroke order:** the walk
counted a letter's free ends once, up front, so after the z's top bar the pen jumped to the
caret's far stroke; ends are now recounted at every lift, and the z, a and caret write in
order. Thinning spurs under 24 units no longer get a pen of their own (they popped in as late
dabs; `.pen-rest` fills them), which took the write from 38 strokes and 2.2s to 20 and 1.7s.
**Lamp shape:** sized as a share of the hero box it was a wide pool at 1440 and a tall beam no
wider than the mark on a phone; its radii are now 1.12 and 0.68 times `--hero-mark-w`, the
mark's width, which `.hero` now defines and the mark itself uses. Verified at 375 and 320 in
the pane, and at 375 in WebKit (the Safari engine) with frames at 0.7s, 1.4s and done.

**Rhythm and the lamp's rise (Peter, same day).** The pen no longer runs strokes back to
back at one speed, which read like a plotter: strokes are quicker (9,500 units/s) with a
45ms lift between strokes of a letter and 35ms between letters, and a held 150ms beat before
the mark's last stroke, so the caret's down-stroke lands as a flick after the rest is
written. The ink is done at 1.89s, the last letter settled at 2.13s; the timeline is printed
by the script. In dark mode `.hero-glow` runs `lamp-up` (opacity 0 to 1, 1.4s ease-out, after
0.12s), so the light rises while the mark writes; switching the toggle to dark starts the
same rise, because the animating rule only matches once the page is dark, and moving between
explicit and automatic dark keeps the animation name, so it does not replay. Reduce Motion
gets the lamp at full strength and the mark finished. Verified: a frame inside the held beat
shows everything but the caret's down-stroke; the finished frame matches the static mark to
3 pixels; in the pane, a dark load starts the lamp at opacity 0 and the toggle's light-to-dark
step starts a fresh rise while light and automatic-light start none. **Capture note:** the
offscreen renderer keeps `localStorage` between runs, so a render that sets `spreza-theme`
leaves every later render in that theme until it is cleared.

**At night the glow is a lamp.** In dark mode `.hero-glow` becomes one warm pool behind the
mark (`--color-accent` at 13%, radii 1.12 and 0.68 mark widths), over the whole hero with its
own bottom fade; light mode keeps the centred top glow. Tried in daylight first and dropped: a lit
centre with darker edges on light paper read as a photo vignette.

**Not taken**, from the same review: a bigger mark (fine, optional, no reason of its own),
the subtitle in tracked caps (Peter's call, left open), the six app icons under the line
(read as status dots, duplicated the shelf), and an accent-coloured caret (the caret is the
"a"'s exit stroke, so no clean seam, and any app's colour favours one app).

## The six accents, blurred behind the mark (2026-10-06)

Peter: the monochrome blurred spotlight under the mark should become *"a series of arranged
varied shapes in colors that resemble our app accents"*, blurred into a medley. `.hero-glow`
and its lamp are gone, in both schemes; `.hero-medley` holds six `.medley-shape` spans, one
per app, each filled with that app's `--accent-*` token, so the medley follows the ramp and
its OKLCH guard with no colours of its own.

**Each shape nods to its codename:** a circle for the kiwi, an ellipse for the lemon, an
irregular blob for the pomegranate, a small circle for the berry, a rounded card for the note,
a leaf (`border-radius: 0 100% 0 100%`). Blurred at 0.07 mark widths they read as colour with
varied edges, not as icons.

**Neighbours are hue neighbours**, round the ring: blueberry, plum, husk, lemon, kiwi, fern.
Overlapping blurs mix, and an analogous pair mixes to a third colour where a complementary
one (plum on kiwi) mixes to grey: the mush the six-seed favicon sketches hit. All six weigh
the same, so no app is favoured, which is what ruled out an accent-coloured caret.

**Sized and centred off the mark**, like the lamp was: the box is 1.3 by 0.95 mark widths,
centred at `--hero-pad-top` plus 0.3513 mark widths (half the mark's 1061/1510 height), and
every shape length is a multiple of `--hero-mark-w`. One `filter: blur()` on the group, not
one per shape, so overlaps blend as they blur. Strength is the group's opacity: 0.4 on paper,
0.55 at night.

**The rise now runs in both schemes**: `medley-up` (opacity from 0, 1.4s ease-out, after
0.12s) on every load, so the colour comes up while the mark writes. Unlike the lamp, toggling
the theme does not replay it, because the animating rule matches in both schemes.

**Verified** in the pane at 1024 light and dark, and at 375 dark: medley centre on the mark
centre to 0.01px, no horizontal overflow, the blur ends inside the hero.

**It drifts** (Peter, same day: *"drift slowly and vary their degree of blurring and shapes
over time"*). Each shape runs six loops at once: x and y drift (up to 0.1 mark widths either
way), blur (0.045 to 0.11), stretch (up to 12% on one axis), tilt (10 to 20 degrees either
side of its rest angle) and an outline morph that stays in the shape's family (the kiwi
wobbles, the leaf keeps its two points). Every loop has its own period per shape, 7.8 to 28.2s
(0.6 of the first cut's 13 to 47s, Peter: *"a bit faster"*), no two alike on one shape, so the
whole never visibly repeats; negative delays start each
partway through. All run there and back on a sine ease. The blur moved from the group onto
each shape so each can soften on its own.

- **The drift offsets are registered** (`@property --medley-dx/--medley-dy`, at top level
  outside the layers). An unregistered custom property animates by flipping at the halfway
  point, so the shapes would jump. Two offsets rather than one `translate` so each axis has its
  own period.
- **Paused off screen**: `main.js` toggles `.hero.is-offscreen` from an IntersectionObserver
  and the loops pause on it. Reduce Motion gets the still medley, identical to the rest pose.
- **Verified** in the pane: all six values interpolate continuously (sampled 1s apart, no
  steps), 120fps with the loops running, `is-offscreen` pauses and resumes on scroll, and
  frames 9s apart in both schemes show the arrangement shifting.
- **The card and Home Screen icon stay still**: each is the rest pose, one blur on the group.

**Spread into a diamond, and wilder** (Peter, same evening: *"spread out more horizontally …
a squished rounded diamond … shake it up, make this feel dynamic and hypnotizing"*). This
supersedes the geometry, strengths and ranges above; `styles.css` is the source.

- **The diamond.** The box is `min(2.3 mark widths, 100%)` by 0.95: berry at the left tip
  (9%), lemon at the right (91%), pomegranate on top, kiwi below, note card and leaf on the two
  edges between, so clockwise is still the hue ring. Sizes run 0.34 to 0.74 mark widths. On a
  phone the tips run off the screen edges. A first cut at 0.22 to 0.58 read as six separate
  dots; the orbs have to overlap their neighbours to read as one medley.
- **Seven loops per orb**, 4.4 to 18.8s: the six above with wider ranges (drift to 0.2 mark
  widths, tilt to 34 degrees, per-orb blur ranges from 0.02 to 0.17) plus a swell (`transform:
  scale`, composing after the `scale` squash) of up to 0.7 to 1.48 that fades the orb to 0.72
  at its largest. Small orbs swell most, so the size order keeps changing; at its sharpest the
  leaf or note card briefly reads as its shape. The whole diamond also sways (2.5 degrees
  either way) and breathes (0.95 to 1.05) on a 17s loop.
- **Overlaps blend**: `screen` at night, so they add as light; `multiply` on paper, as ink
  does. Group opacity 0.45 on paper, 0.62 at night.
- **`.hero-atmosphere` fades out over its bottom 28%**, so a swollen, drifted, softened orb
  never meets the hero's `overflow: hidden` edge as a hard line on a phone.
- **The header's `saturate(140%)` now comes in with the scroll** (`--brand-progress`), like
  its blur. At rest it tinted whatever sat under the bar, which on bare paper was a 4-level
  shift nobody saw; with orbs drifting under it, it would show as a hard-edged strip.
- **Verified** in the pane at 1440 both schemes and 375 dark: 120fps, 44 loops running, no
  horizontal overflow, header `saturate(1)` at the top and `1.4` scrolled.
- **Softer** (Peter, same evening: *"the minimum amount of blur is too low"*): the per-orb
  blur floor rose from 0.02–0.06 to 0.09–0.12 mark widths and the ceiling from 0.12–0.17 to
  0.20–0.26; the still pose (Reduce Motion, the card, the icon) went from 0.08 to 0.14. A wider
  blur spreads the same colour thinner, so strength rose with it: 0.5 on paper, 0.7 at night,
  0.6 on the card. No orb sharpens into its outline any more; the shapes now show only as the
  varying contour of the wash.
- **The ink takes the colour** (Peter, same evening: *"some color let through, in both light
  and dark"*). A second copy of the medley (`.hero-dye`, six `.medley-shape` spans in the
  h1) sits over the mark, masked to the letterforms by `assets/spreza-mark-mask.svg`, with the
  same box, shapes and loops, started on the same frame (checked: identical `startTime` on
  every loop), so it stays in step with the medley behind. At night it is `hard-light`, so the
  cream goes pastel pink, yellow or green and stays bright; on paper it lies over the ink as it
  is, opacity 0.9, so the near-black goes dusky plum, olive or slate. Its blur is 0.55 of the
  medley's (`--blur-scale`), so the colour over a letter is dense enough to read. It fades in
  at 1.9s, when the pen is done: the mask is the finished mark, and earlier it would colour
  letters not yet written. Being in the h1, the scroll handoff fades and blurs it with the mark.
  - **Tried and dropped:** blending the mark itself with the medley behind it (`luminosity`,
    then `overlay`, which needed `.hero-content`'s z-index removed so the blend could see
    past it). A blend borrows only the colour that is there, the medley is soft by design, and
    the tint measured 4 to 34 chroma levels: invisible on paper, faint at night. Hard-light
    for the dye on paper was also faint, because near-black ink only rises in a channel where
    the dye passes mid-grey, and these accents barely do.
  - **The card has the dye too** (Peter, same evening), at rest: a `.dye` over the mark in
    `Scripts/lib/og-card-studio.html` with the card's own medley geometry, opacity 0.9, blur
    0.55 of the card medley's. **Its mask is inlined at build time** as a data URI cut from
    the master: CSS fetches a mask image CORS-style, a `file://` page cannot do that for a
    `file://` image, and a mask that fails to load hides its element outright. The first
    build came out byte-identical for exactly that reason. The live site is unaffected (same
    origin).
  - **The Home Screen icon's paper S is dyed too** (Peter, same evening), with the night
    treatment, since the icon is paper on ink: hard-light, blur 0.55 of the icon medley's,
    strength 0.75 rather than the site's 1, because the tile packs the whole diamond behind
    one letter and at full strength the S went lime and cyan. `dye()` in
    `Scripts/make-studio-favicons.py` works hard-light out as `paper × K + M` per channel on a
    coarse grid (K and M depend only on the smooth dye), so the full-size paper keeps its
    grain without numpy. Tab icons unchanged (sha), rerun byte-identical.
  - **The icon is one frame of the hero's motion** (Peter, same evening: *"blur more severe
    and the shapes more dynamic"*). `Scripts/make-studio-favicons.py` no longer keeps its own
    table: it parses each `.medley-shape` block and the dark accents out of `styles.css` and
    evaluates all seven loops at `POSE_T` (29s, Peter's pick from a sheet of six moments), so
    every orb is drifted, tilted, squashed, swollen, morphed and blurred as the hero has it
    then. Each orb has its own blur, 1.5 times the site's at that moment (`ICON_BLUR`), and
    they add as light (`screen`) as they do at night, at full strength (`MEDLEY_ALPHA` 1: the
    heavier blur spreads the colour thinner). The dye follows the same pose. The group sway
    is left out. `ICON_POSE_T=<seconds>` renders another moment without editing the file.
    A change to the medley in `styles.css` moves the icon on its next run, so rerun it.
  - **Not measured:** frame rate with the dye's 42 loops added. The pane was hidden for that
    check; the 120fps above was with the medley alone.
- **The card** takes the diamond at rest, scaled to 0.85 with the pomegranate and kiwi nudged
  toward the mark (22% and 78%): at the site's spacing on a 630px card the pomegranate ran off
  the top and the kiwi sat under the subtitle. **The Home Screen icon took the diamond too**
  (Peter, same evening), at 0.38 tile widths per mark width so the tips sit just inside the
  tile: at 0.45 the berry and lemon met its edges and read as a band cut off at the sides.
  Night strength, 0.62, rest blur 0.14. Tab icons unchanged (checked by sha).

**Followed the same day** (Peter): the share card draws the medley behind its mark with the
light hex at 0.5 (a card is seen small), copied into `Scripts/lib/og-card-studio.html`; and
the Home Screen icon swaps its top glow for the medley in the dark hex at 0.5, centred on the
S at 0.8 tile widths per unit, from `MEDLEY` in `Scripts/make-studio-favicons.py`. The card
holds its own copy of the geometry: **move a shape here and move it there**, then rerun the
card script. The icon reads the medley from `styles.css` itself (since 2026-10-06), so it follows on its next run. The tab icons are unchanged (checked by sha), and an icon rerun is byte-identical.
