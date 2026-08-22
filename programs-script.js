/* =========================================================
   HERAID — Programs — main.js
   Handles the mobile hamburger nav and the program filter pills.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("nav-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("nav-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 767) {
        mainNav.classList.remove("nav-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Program category filter ---------- */
  var filterPills = document.querySelectorAll(".filter-pill");
  var programCards = document.querySelectorAll(".program-card");

  filterPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      filterPills.forEach(function (p) {
        p.classList.remove("is-active");
      });
      pill.classList.add("is-active");

      var filter = pill.getAttribute("data-filter");

      programCards.forEach(function (card) {
        var category = card.getAttribute("data-category");
        var show = filter === "all" || category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
});
