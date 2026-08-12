(function () {
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
})();
