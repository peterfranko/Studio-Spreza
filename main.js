(function () {
  var toggle = document.querySelector(".menu-toggle");
  var panel = document.getElementById("site-menu");

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      if (open) {
        panel.setAttribute("hidden", "");
      } else {
        panel.removeAttribute("hidden");
      }
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        panel.setAttribute("hidden", "");
      });
    });
  }

  /* Scroll reveals */
  var nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
      );

      nodes.forEach(function (el) {
        io.observe(el);
      });
    }
  }

  /* Read progress rail */
  function updateScrollUi() {
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, Math.max(0, (scrollY / max) * 100)) : 0;
    doc.style.setProperty("--read-progress", pct + "%");
  }

  var scrollCue = document.querySelector(".scroll-cue");
  var scrollCueReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateScrollCue() {
    if (!scrollCue) return;
    var y = window.scrollY || document.documentElement.scrollTop;
    var opacity;
    if (scrollCueReduced) {
      opacity = y > 20 ? 0 : 1;
    } else {
      var fadeEnd = 128;
      var t = Math.min(1, y / fadeEnd);
      opacity = 1 - t * t;
    }
    scrollCue.style.opacity = String(opacity);
    if (opacity < 0.03) {
      scrollCue.style.visibility = "hidden";
      scrollCue.style.pointerEvents = "none";
      scrollCue.setAttribute("aria-hidden", "true");
      scrollCue.setAttribute("tabindex", "-1");
    } else {
      scrollCue.style.visibility = "";
      scrollCue.style.pointerEvents = "";
      scrollCue.removeAttribute("aria-hidden");
      scrollCue.removeAttribute("tabindex");
    }
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateScrollUi();
          updateScrollCue();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", updateScrollUi, { passive: true });
  window.addEventListener("resize", updateScrollCue, { passive: true });
  updateScrollUi();
  updateScrollCue();
})();
