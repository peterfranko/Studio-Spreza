(function () {
  var root = document.documentElement;
  var compactLogo = document.querySelector(".site-header .logo");
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function setBrandProgress() {
    var transitionDistance = clamp(window.innerHeight * 0.24, 140, 220);
    var progress = clamp(window.scrollY / transitionDistance, 0, 1);
    var inverse = 1 - progress;

    root.style.setProperty("--brand-progress", progress.toFixed(3));
    root.style.setProperty("--hero-brand-opacity", Math.max(0, 1 - progress * 1.4).toFixed(3));
    root.style.setProperty("--header-surface-alpha", (progress * 88).toFixed(1) + "%");
    root.style.setProperty("--header-border-alpha", (progress * 100).toFixed(1) + "%");
    root.classList.toggle("has-compact-brand", progress > 0.55);

    if (compactLogo) {
      compactLogo.tabIndex = progress > 0.55 ? 0 : -1;
    }

    if (prefersReduced) {
      root.style.setProperty("--header-blur", "0px");
      root.style.setProperty("--brand-blur", "0px");
      root.style.setProperty("--brand-inverse-blur", "0px");
      root.style.setProperty("--hero-brand-offset", "0px");
      root.style.setProperty("--hero-brand-scale", "1");
      root.style.setProperty("--brand-settle-offset", "0px");
    } else {
      root.style.setProperty("--header-blur", (progress * 10).toFixed(2) + "px");
      root.style.setProperty("--brand-blur", (progress * 5).toFixed(2) + "px");
      root.style.setProperty("--brand-inverse-blur", (inverse * 4).toFixed(2) + "px");
      root.style.setProperty("--hero-brand-offset", (-progress * 14).toFixed(2) + "px");
      root.style.setProperty("--hero-brand-scale", (1 - progress * 0.025).toFixed(3));
      root.style.setProperty("--brand-settle-offset", (inverse * 6).toFixed(2) + "px");
    }
  }

  var brandFrame = 0;
  function requestBrandProgress() {
    if (brandFrame) {
      return;
    }

    brandFrame = window.requestAnimationFrame(function () {
      brandFrame = 0;
      setBrandProgress();
    });
  }

  setBrandProgress();
  window.addEventListener("scroll", requestBrandProgress, { passive: true });
  window.addEventListener("resize", requestBrandProgress);

  var appStorePlaceholders = document.querySelectorAll(".app-store-link[href='#']");
  appStorePlaceholders.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });

  /* Theme toggle.

     Three states, cycling auto -> light -> dark. `auto` is the absence of a stored
     choice, which is exactly what the colour tokens key off: bare :root for light,
     html[data-theme] for an explicit choice, and prefers-color-scheme guarded by
     :not([data-theme]) so an explicit light still wins on a dark machine. A
     two-state toggle would have no way back to following the system.

     The <head> carries a tiny synchronous copy of the read half of this, so a saved
     choice is on the element before first paint. */
  var THEME_KEY = "spreza-theme";
  var THEME_ORDER = ["auto", "light", "dark"];
  var THEME_NAME = { auto: "Automatic", light: "Light", dark: "Dark" };
  var themeToggle = document.getElementById("theme-toggle");

  function storedTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      return saved === "light" || saved === "dark" ? saved : "auto";
    } catch (error) {
      /* Private mode, or storage disabled. */
      return "auto";
    }
  }

  if (themeToggle) {
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

    themeToggle.addEventListener("click", function () {
      var next = THEME_ORDER[(THEME_ORDER.indexOf(storedTheme()) + 1) % THEME_ORDER.length];
      setTheme(next);
    });
  }

  /* Shelf rails.

     Each .work-shelf holds a horizontally scrolling .work-gallery and a
     .work-rail standing in for the native scrollbar, which ran the full viewport
     width instead of the content column and was the loudest thing on the page.
     The rail is aria-hidden and pointer-only: it duplicates scrolling the
     scrollport already has, and the scrollport is focusable and arrow-scrollable
     for anyone not using a pointer. */
  var MIN_THUMB = 40;

  document.querySelectorAll(".work-shelf").forEach(function (shelf) {
    var gallery = shelf.querySelector(".work-gallery");
    var rail = shelf.querySelector(".work-rail");
    var thumb = shelf.querySelector(".work-rail-thumb");

    if (!gallery || !rail || !thumb) {
      return;
    }

    var thumbWidth = 0;
    var travel = 0;

    function sync() {
      var overflow = gallery.scrollWidth - gallery.clientWidth;

      /* Nothing to scroll: a rail that cannot move is a control that lies. */
      if (overflow <= 1) {
        rail.hidden = true;
        return;
      }

      rail.hidden = false;

      var railWidth = rail.clientWidth;
      thumbWidth = Math.max(
        railWidth * (gallery.clientWidth / gallery.scrollWidth),
        MIN_THUMB
      );
      travel = railWidth - thumbWidth;

      thumb.style.setProperty("--rail-thumb-size", thumbWidth.toFixed(1) + "px");
      thumb.style.setProperty(
        "--rail-thumb-offset",
        (travel * clamp(gallery.scrollLeft / overflow, 0, 1)).toFixed(1) + "px"
      );
    }

    var railFrame = 0;
    function requestSync() {
      if (railFrame) {
        return;
      }

      railFrame = window.requestAnimationFrame(function () {
        railFrame = 0;
        sync();
      });
    }

    function scrollToPointer(clientX) {
      if (travel <= 0) {
        return;
      }

      var x = clamp(clientX - rail.getBoundingClientRect().left - thumbWidth / 2, 0, travel);
      gallery.scrollLeft = (x / travel) * (gallery.scrollWidth - gallery.clientWidth);
    }

    var dragging = false;

    rail.addEventListener("pointerdown", function (event) {
      if (rail.hidden) {
        return;
      }

      dragging = true;
      rail.classList.add("is-dragging");
      /* Snap re-snaps every scrollLeft we assign, which makes the thumb jump away
         from the pointer. Restoring the class on release re-snaps by itself. */
      gallery.classList.add("is-railing");

      try {
        rail.setPointerCapture(event.pointerId);
      } catch (error) {
        /* Pointer capture is a nicety; dragging still works without it. */
      }

      scrollToPointer(event.clientX);
      event.preventDefault();
    });

    rail.addEventListener("pointermove", function (event) {
      if (dragging) {
        scrollToPointer(event.clientX);
      }
    });

    ["pointerup", "pointercancel"].forEach(function (type) {
      rail.addEventListener(type, function (event) {
        if (!dragging) {
          return;
        }

        dragging = false;
        rail.classList.remove("is-dragging");
        gallery.classList.remove("is-railing");

        try {
          rail.releasePointerCapture(event.pointerId);
        } catch (error) {
          /* Already released. */
        }
      });
    });

    gallery.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    sync();
  });

  /* Scroll reveals */
  var nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    if (prefersReduced) {
      nodes.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        /* threshold 0, not 0.08. A percentage threshold scales with the element, so
           a tall one needs proportionally more of itself on screen: the 950px shelf
           needed 76px above the fire line and only ever had 40px there at the top of
           the page, so the first shelf's frames sat invisible until you scrolled.
           rootMargin already does the "not on a sliver" job, in pixels, for every
           element regardless of height. */
        { rootMargin: "0px 0px -10% 0px", threshold: 0 }
      );

      nodes.forEach(function (el) {
        io.observe(el);
      });
    }
  }
})();
