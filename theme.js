/* Theme toggle.

   Its own file since 2026-10-13, so every page can carry the same control. It
   used to live in main.js, which only the home page loads: a choice made there
   carried to Support and the policies through the <head> script, but could not be
   changed on them. Every page with the button loads this; the home page also
   loads main.js, which no longer knows about the theme.

   Three states, cycling auto -> light -> dark. `auto` is the absence of a stored
   choice, which is exactly what the colour tokens key off: bare :root for light,
   html[data-theme] for an explicit choice, and prefers-color-scheme guarded by
   :not([data-theme]) so an explicit light still wins on a dark machine. A
   two-state toggle would have no way back to following the system.

   The <head> carries a tiny synchronous copy of the read half of this, so a saved
   choice is on the element before first paint. */
(function () {
  var root = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");

  if (!themeToggle) {
    return;
  }

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var THEME_KEY = "spreza-theme";
  var THEME_ORDER = ["auto", "light", "dark"];
  var THEME_NAME = { auto: "Automatic", light: "Light", dark: "Dark" };

  /* null when storage cannot be read at all (site data blocked), which is not the
     same as nothing stored: see the pageshow handler at the end. */
  function readStoredTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      return saved === "light" || saved === "dark" ? saved : "auto";
    } catch (error) {
      /* Private mode, or storage disabled. */
      return null;
    }
  }

  function storedTheme() {
    return readStoredTheme() || "auto";
  }

  var themeMetas = Array.prototype.slice.call(
    document.querySelectorAll('meta[name="theme-color"]')
  );
  /* The two tags are media-scoped, which is right while we follow the system and
     wrong the moment there is a choice. Keep the originals so `auto` restores them. */
  var themeMetaDefaults = themeMetas.map(function (meta) {
    return meta.getAttribute("content");
  });

  function paintThemeColor(state) {
    if (state === "auto") {
      themeMetas.forEach(function (meta, i) {
        meta.setAttribute("content", themeMetaDefaults[i]);
      });
      return;
    }

    /* The token, not the painted background. Reading backgroundColor here returns
       whatever the cross-fade is part-way through, so the browser chrome got the
       colour we were leaving rather than the one we were going to. Custom
       properties do not animate, so the token is already the final value. */
    var painted = window
      .getComputedStyle(root)
      .getPropertyValue("--color-surface-base")
      .trim();
    themeMetas.forEach(function (meta) {
      meta.setAttribute("content", painted);
    });
  }

  function applyTheme(state) {
    if (state === "auto") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", state);
    }

    themeToggle.dataset.themeState = state;
    themeToggle.setAttribute(
      "aria-label",
      "Theme: " +
        THEME_NAME[state].toLowerCase() +
        ". Switch to " +
        THEME_NAME[THEME_ORDER[(THEME_ORDER.indexOf(state) + 1) % 3]].toLowerCase() +
        "."
    );

    var label = themeToggle.querySelector(".theme-toggle-label");
    if (label) {
      label.textContent = THEME_NAME[state];
    }

    paintThemeColor(state);
  }

  var themingTimer = 0;
  function setTheme(state) {
    try {
      if (state === "auto") {
        localStorage.removeItem(THEME_KEY);
      } else {
        localStorage.setItem(THEME_KEY, state);
      }
    } catch (error) {
      /* The choice still applies for this page view. */
    }

    /* Custom properties do not transition, so the swap is an instant cut without
       this. The class goes on for one beat and comes off again: left standing, it
       would put the same delay on every hover and focus ring on the page. */
    if (!prefersReduced) {
      root.classList.add("is-theming");
      window.clearTimeout(themingTimer);
      themingTimer = window.setTimeout(function () {
        root.classList.remove("is-theming");
      }, 420);
    }

    applyTheme(state);
  }

  applyTheme(storedTheme());
  themeToggle.hidden = false;

  /* A press steps from the state the button shows, not from storage (2026-10-13).
     Read from storage, a page whose storage throws stepped from "auto" every time,
     so it stuck on Light while its label offered Dark; and a page left behind by
     another tab's choice moved two states, or none, on one press. */
  themeToggle.addEventListener("click", function () {
    var shown = themeToggle.dataset.themeState || storedTheme();
    setTheme(THEME_ORDER[(THEME_ORDER.indexOf(shown) + 1) % THEME_ORDER.length]);
  });

  /* Back to a page restored from the back-forward cache brings back the DOM it was
     left with, and the <head> script does not run again, so a choice made on the
     page after it (home, then Support, Dark, then Back) did not show until a
     reload. Re-read on restore, as a cut: the page is reappearing, not changing.
     Skipped when storage cannot be read, where the page's own state is the only
     record of the choice. The storage event does the same for a choice made in
     another open tab. */
  window.addEventListener("pageshow", function (event) {
    var saved = readStoredTheme();
    if (event.persisted && saved !== null && saved !== themeToggle.dataset.themeState) {
      applyTheme(saved);
    }
  });

  window.addEventListener("storage", function (event) {
    if (event.key === THEME_KEY || event.key === null) {
      applyTheme(storedTheme());
    }
  });
})();
