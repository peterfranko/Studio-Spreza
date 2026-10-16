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
     for anyone not using a pointer.

     A shelf can hold one gallery per device (2026-10-14), behind the device
     tabs below. Only one is shown at a time and the one rail follows it. */
  var MIN_THUMB = 40;

  document.querySelectorAll(".work-shelf").forEach(function (shelf) {
    var galleries = Array.prototype.slice.call(shelf.querySelectorAll(".work-gallery"));
    var gallery = galleries[0];
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

    galleries.forEach(function (each) {
      each.addEventListener("scroll", requestSync, { passive: true });
    });
    window.addEventListener("resize", requestSync);
    sync();

    /* Device tabs (Peter, 2026-10-14: "a toggle to jump between iPhone, iPad,
       Mac, and Watch screenshots"). Only a shelf with frames for more than one
       device carries them, and they ship hidden like the rail: without scripting
       the reader gets the iPhone shelf and no control that does nothing.

       The ARIA tabs pattern with automatic activation, since a switch is free:
       one tab stop, arrows and Home/End move between devices. The panels are
       regions in the markup and become tabpanels here, for the same reason. */
    var tablist = shelf.querySelector(".work-devices");
    if (!tablist) {
      return;
    }

    var tabs = Array.prototype.slice.call(tablist.querySelectorAll("[role='tab']"));

    function select(tab) {
      tabs.forEach(function (each) {
        var on = each === tab;
        var panel = document.getElementById(each.getAttribute("aria-controls"));

        each.setAttribute("aria-selected", on ? "true" : "false");
        each.tabIndex = on ? 0 : -1;

        if (panel) {
          panel.hidden = !on;
          if (on) {
            gallery = panel;
          }
        }
      });

      /* Each device's shelf starts from its first frame, and its frames come up
         in sequence as they do on the first reveal. Removing and re-adding the
         class restarts the animation; the reflow between is what makes it. */
      gallery.scrollLeft = 0;
      gallery.classList.remove("is-arriving");
      void gallery.offsetWidth;
      gallery.classList.add("is-arriving");
      sync();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        select(tab);
      });

      tab.addEventListener("keydown", function (event) {
        var next = null;

        if (event.key === "ArrowRight") {
          next = tabs[(index + 1) % tabs.length];
        } else if (event.key === "ArrowLeft") {
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (event.key === "Home") {
          next = tabs[0];
        } else if (event.key === "End") {
          next = tabs[tabs.length - 1];
        }

        if (next) {
          event.preventDefault();
          select(next);
          next.focus();
        }
      });
    });

    galleries.forEach(function (each) {
      each.setAttribute("role", "tabpanel");
    });
    tablist.hidden = false;
  });

  /* The hero medley drifts only while the hero is on screen: six blurred
     shapes repainting every frame is work nobody sees once it has scrolled
     away. The class pauses the loops in styles.css. */
  var hero = document.querySelector(".hero");
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      hero.classList.toggle("is-offscreen", !entries[0].isIntersecting);
    }).observe(hero);
  }

  /* The lean (Peter, 2026-10-15: "responsive to mouse positioning? and/or
     phone gyro on mobile"). The medley leans toward a mouse or pen, and on a
     phone it runs toward whichever edge dips, as colour would in a dish. Both
     set one aim, -1 to 1 on each axis. The lean eases after it over 0.6s, so
     it trails like something wet rather than tracking like a cursor, and is
     written onto both medleys, the one behind the mark and the dye in it, so
     they stay in step. styles.css turns it into each shape's share. The loop
     stops once it has caught up, input is ignored while the hero is off
     screen, and Reduce Motion gets none of it. */
  var medleys = document.querySelectorAll(".hero-medley, .hero-dye-medley");
  var heroMark = document.querySelector(".hero-title .brand-mark");

  if (hero && heroMark && medleys.length && !prefersReduced) {
    var LEAN_EASE = 0.6;
    var aimX = 0;
    var aimY = 0;
    var leanX = 0;
    var leanY = 0;
    var leanFrame = 0;
    var leanTime = 0;

    function stepLean(now) {
      var dt = leanTime ? Math.min((now - leanTime) / 1000, 0.1) : 1 / 60;
      var follow = 1 - Math.exp(-dt / LEAN_EASE);

      leanX += (aimX - leanX) * follow;
      leanY += (aimY - leanY) * follow;

      var settled = Math.abs(aimX - leanX) < 0.002 && Math.abs(aimY - leanY) < 0.002;
      if (settled) {
        leanX = aimX;
        leanY = aimY;
      }

      medleys.forEach(function (medley) {
        medley.style.setProperty("--lean-x", leanX.toFixed(4));
        medley.style.setProperty("--lean-y", leanY.toFixed(4));
      });

      leanTime = settled ? 0 : now;
      leanFrame = settled ? 0 : window.requestAnimationFrame(stepLean);
    }

    function aim(x, y) {
      aimX = clamp(x, -1, 1);
      aimY = clamp(y, -1, 1);

      if (!leanFrame) {
        leanFrame = window.requestAnimationFrame(stepLean);
      }
    }

    /* A mouse aims from the mark's centre, half a screen either way for the
       full lean. The centre is measured on load and resize rather than per
       move, so moving the mouse never forces a layout. Leaving the window
       lets the colour settle back. */
    var markX = 0;
    var markY = 0;
    var pointerX = null;
    var pointerY = 0;
    var mouseTime = -Infinity;

    function measureMark() {
      var box = heroMark.getBoundingClientRect();
      markX = box.left + box.width / 2 + window.scrollX;
      markY = box.top + box.height / 2 + window.scrollY;
    }

    function aimAtPointer() {
      if (pointerX === null || hero.classList.contains("is-offscreen")) {
        return;
      }

      aim(
        (pointerX - markX + window.scrollX) / (window.innerWidth / 2),
        (pointerY - markY + window.scrollY) / (window.innerHeight / 2)
      );
    }

    function settleLean() {
      pointerX = null;
      aim(0, 0);
    }

    measureMark();
    window.addEventListener("load", measureMark);
    window.addEventListener("resize", measureMark);
    window.addEventListener("scroll", aimAtPointer, { passive: true });
    window.addEventListener("blur", settleLean);

    document.addEventListener(
      "pointermove",
      function (event) {
        if (event.pointerType === "touch") {
          return;
        }

        pointerX = event.clientX;
        pointerY = event.clientY;
        mouseTime = event.timeStamp;
        aimAtPointer();
      },
      { passive: true }
    );

    document.addEventListener("pointerout", function (event) {
      if (!event.relatedTarget && event.pointerType !== "touch") {
        settleLean();
      }
    });

    /* A phone aims by tilt: 20 degrees for the full lean. The level it
       measures from follows the phone over a few seconds, so however it is
       held the colour comes to rest centred, and only a change of tilt moves
       it. gamma tips the device's sides and beta its top and bottom, so a
       phone held sideways swaps and flips them onto the screen's axes. Only
       on a screen with no hover, so a laptop's motion sensor never fights its
       trackpad, and not within two seconds of a mouse moving. */
    var TILT_FULL = 20;
    var TILT_SETTLE = 4;
    var levelX = 0;
    var levelY = 0;
    var levelTurn = null;
    var tiltTime = 0;
    var tiltSeen = false;

    function onTilt(event) {
      if (event.beta === null || event.gamma === null) {
        return;
      }

      tiltSeen = true;

      var turn =
        window.screen.orientation && typeof window.screen.orientation.angle === "number"
          ? window.screen.orientation.angle
          : window.orientation || 0;
      var x = event.gamma;
      var y = event.beta;

      if (turn === 90) {
        x = event.beta;
        y = -event.gamma;
      } else if (turn === 270 || turn === -90) {
        x = -event.beta;
        y = event.gamma;
      } else if (turn === 180) {
        x = -event.gamma;
        y = -event.beta;
      }

      /* A new grip starts level: the first reading, and the first after the
         screen turns, since the axes have just changed under it. */
      if (turn !== levelTurn) {
        levelTurn = turn;
        levelX = x;
        levelY = y;
        tiltTime = event.timeStamp;
      }

      var settle = 1 - Math.exp(-Math.min((event.timeStamp - tiltTime) / 1000, 1) / TILT_SETTLE);
      tiltTime = event.timeStamp;
      levelX += (x - levelX) * settle;
      levelY += (y - levelY) * settle;

      /* The level keeps up while the hero is away or a mouse is moving, so
         neither hands back a lurch when it ends. */
      if (hero.classList.contains("is-offscreen") || event.timeStamp - mouseTime < 2000) {
        return;
      }

      aim((x - levelX) / TILT_FULL, (y - levelY) / TILT_FULL);
    }

    var Orientation = window.DeviceOrientationEvent;
    var noHover = window.matchMedia && window.matchMedia("(hover: none)").matches;

    if (Orientation && noHover) {
      window.addEventListener("deviceorientation", onTilt);

      /* Safari on iPhone and iPad sends no tilt until the page asks, and it
         may ask only from a tap. A tap on the hero is that tap: it is the
         colour's own ground and holds no links. It asks once, and not at all
         where tilt is already arriving, as it does on Android, where Chrome
         also has the method. It listens again after a grant, in case Safari
         starts the sensor only for a listener added once access is given. */
      if (typeof Orientation.requestPermission === "function") {
        hero.addEventListener("click", function askForTilt() {
          hero.removeEventListener("click", askForTilt);

          if (tiltSeen) {
            return;
          }

          Orientation.requestPermission().then(
            function (state) {
              if (state === "granted") {
                window.removeEventListener("deviceorientation", onTilt);
                window.addEventListener("deviceorientation", onTilt);
              }
            },
            function () {
              /* Refused or unavailable: the medley keeps its drift. */
            }
          );
        });
      }
    }
  }

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
