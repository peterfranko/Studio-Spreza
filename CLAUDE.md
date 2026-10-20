# Studio Spreza site: build output

**Do not edit this folder by hand.** Since 2026-10-19 every file here except this one, `AGENTS.md` and `.gitignore` is written by `python3 /Users/peter/Developer/Scripts/build-studio-site.py` from the site's private source, `/Users/peter/Developer/GitHub/Studio-Spreza-Source/`. The source holds the full site and its agent guide. The build publishes it by launch tier (`launch-tiers.json` in the source) and refuses to write anything that would show an app before its tier allows. A hand edit here is overwritten by the next build, and the build stops rather than run over one, so make the change in the source and rebuild.

**Source control: Peter commits, agents never do.** This repo is Git-backed and GitHub Pages hosted, and that is exactly why the rule needs saying here. Read git history freely (`status`, `log`, `diff`, `show`, `blame`); never `commit`, `push`, stage, merge, rebase, reset, switch branches, tag, or open a PR, not even for a finished and verified change, and not via a branch or worktree. Build, then hand it over with the file list and a suggested commit message.

Workspace rules: `/Users/peter/Developer/CLAUDE.md`.
