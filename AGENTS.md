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
