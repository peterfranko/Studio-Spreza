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
