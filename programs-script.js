/* =========================================================
   main.js
   Two small, dependency-free behaviours:
   1. Mobile nav dropdown (hamburger open/close)
   2. Program grid filtering by category

   No frameworks, no build step — just drop this file next
   to index.html (in /js) and it runs as-is.
   ========================================================= */
(function () {
  "use strict";

  /* -----------------------------------------------------
     1. Mobile nav toggle
     ----------------------------------------------------- */
  function initMobileNav() {
    var menuBtn = document.querySelector(".navbar__menu-btn");
    var links = document.querySelector(".navbar__links");
    if (!menuBtn || !links) return;

    menuBtn.setAttribute("aria-expanded", "false");

    function closeMenu() {
      links.classList.remove("navbar__links--open");
      menuBtn.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      links.classList.add("navbar__links--open");
      menuBtn.setAttribute("aria-expanded", "true");
    }

    menuBtn.addEventListener("click", function () {
      var isOpen = links.classList.contains("navbar__links--open");
      isOpen ? closeMenu() : openMenu();
    });

    // Close the menu after a link is tapped
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    // Close the menu if the viewport grows past the mobile breakpoint
    // (e.g. rotating a tablet, or resizing a desktop browser window)
    var mobileBreakpoint = window.matchMedia("(min-width: 768px)");
    mobileBreakpoint.addEventListener("change", function (e) {
      if (e.matches) closeMenu();
    });

    // Close on Escape for keyboard users
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* -----------------------------------------------------
     2. Program filters
     ----------------------------------------------------- */
  function initProgramFilters() {
    var filterButtons = document.querySelectorAll(".filter[data-filter]");
    var cards = document.querySelectorAll(".program-card[data-category]");
    if (!filterButtons.length || !cards.length) return;

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var value = btn.getAttribute("data-filter");

        // Update active button state
        filterButtons.forEach(function (b) {
          b.classList.remove("filter--active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("filter--active");
        btn.setAttribute("aria-selected", "true");

        // Show/hide matching cards
        cards.forEach(function (card) {
          var matches =
            value === "all" || card.getAttribute("data-category") === value;
          card.classList.toggle("program-card--hidden", !matches);
        });
      });
    });
  }

  /* -----------------------------------------------------
     Init once the DOM is ready
     ----------------------------------------------------- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initMobileNav();
      initProgramFilters();
    });
  } else {
    initMobileNav();
    initProgramFilters();
  }
})();
