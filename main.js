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
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
      );

      nodes.forEach(function (el) {
        io.observe(el);
      });
    }
  }
})();
