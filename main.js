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
      /* The whole strip already on screen at rest (3440 wide, say): drop the
         trailing inset, so there is no scroll that only slides whole frames off
         the column. Measured to the frame's own edge in scroll coordinates, so
         neither the inset nor the current scroll position changes the answer.
         Half a pixel of slack, like the rail's overflow <= 1 below: at 3135
         wide the last frame ends at 3135.5.
         The tab stop goes with the scroll: the scrollport is focusable only so
         the arrow keys can move it, and a strip with nothing to move gave six
         stops that ringed the frames and went nowhere. -1, not removing the
         attribute, so a shelf that has focus through a resize keeps it; the
         markup's 0 stands with scripting off, where the inset and the scroll
         stay. */
      var last = gallery.lastElementChild;
      if (last) {
        var origin = gallery.getBoundingClientRect().left - gallery.scrollLeft;
        var end = last.getBoundingClientRect().right - origin;
        var whole = end <= gallery.clientWidth + 0.5;
        gallery.classList.toggle("is-whole", whole);
        gallery.tabIndex = whole ? -1 : 0;
      }

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

  /* The hero medley drifts only while the hero is on screen: six blurred
     shapes repainting every frame is work nobody sees once it has scrolled
     away. The class pauses the loops in styles.css. */
  var hero = document.querySelector(".hero");
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      hero.classList.toggle("is-offscreen", !entries[0].isIntersecting);
    }).observe(hero);
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

      /* Landing (2026-10-13). The fire line above sits 10% up from the bottom
         so that nothing reveals on a sliver while you scroll. On landing there
         is no scroll to wait for, and the line was hiding what was already on
         screen: at 1280x720 Kiwido's lede sits whole at 645-717px, but the
         reveal's 14px drop puts its top at 659, under the line at 648px; at
         1440x900 the top 67px of its frames stand under the line at 810px.
         Both stayed blank until the first scroll. So the first look runs to
         the bottom edge: what is on screen comes in now, and the rest goes to
         the observer above, including anything above the screen after a
         reload partway down, which reveals as it comes back, as before.
         Less than 16px on screen still counts as a sliver and waits: a reveal
         there plays where nobody sees it and spends the shelf's stagger, so
         nothing arrives when you get to it (1440x780: 7px of frames).
         Rejected: dropping the margin from the observer above (it is right
         while scrolling), and adding is-visible before first paint (what is on
         screen would skip the fade that everything after it gets). */
      var landing = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            landing.unobserve(entry.target);
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            } else {
              io.observe(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -16px 0px", threshold: 0 }
      );

      nodes.forEach(function (el) {
        landing.observe(el);
      });
    }
  }
})();
