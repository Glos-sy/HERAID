/* ==========================================================================
   HERAID — GET INVOLVED PAGE — SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is clicked
    mainNav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on resize back to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) {
        mainNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------------- Animated stat counters ---------------- */
  var statNumbers = document.querySelectorAll(".stat-number");

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && statNumbers.length) {
    var statObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support
    statNumbers.forEach(animateCount);
  }

  /* ---------------- Donation impact slider ---------------- */
  var slider = document.getElementById("donationSlider");
  var donationValue = document.getElementById("donationValue");
  var birthKitsLabel = document.getElementById("birthKitsLabel");
  var vaccineLabel = document.getElementById("vaccineLabel");

  // Naira formatter
  function formatNaira(amount) {
    return "\u20A6" + Number(amount).toLocaleString("en-NG");
  }

  function updateSliderFill(input) {
    var min = Number(input.min) || 0;
    var max = Number(input.max) || 100;
    var val = Number(input.value);
    var pct = ((val - min) / (max - min)) * 100;
    input.style.setProperty("--fill", pct + "%");
  }

  function updateImpact(amount) {
    // Roughly: every ₦2,500 = 1 safe birth kit, every ₦5,000 = 1 tetanus vaccine
    var kits = Math.max(1, Math.round(amount / 2500));
    var vaccines = Math.max(1, Math.round(amount / 5000));

    if (donationValue) donationValue.textContent = formatNaira(amount);
    if (birthKitsLabel) {
      birthKitsLabel.textContent =
        kits + (kits === 1 ? " Safe Birth Kit" : " Safe Birth Kits");
    }
    if (vaccineLabel) {
      vaccineLabel.textContent =
        vaccines + (vaccines === 1 ? " Tetanus Vaccine" : " Tetanus Vaccines");
    }
  }

  if (slider) {
    updateSliderFill(slider);
    updateImpact(slider.value);

    slider.addEventListener("input", function () {
      updateSliderFill(slider);
      updateImpact(slider.value);
    });
  }

  /* ---------------- Newsletter form ---------------- */
  var newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailInput = newsletterForm.querySelector('input[type="email"]');
      var submitBtn = newsletterForm.querySelector('button[type="submit"]');

      if (emailInput && emailInput.value) {
        var originalText = submitBtn.textContent;
        submitBtn.textContent = "Subscribed!";
        submitBtn.disabled = true;

        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          emailInput.value = "";
        }, 2200);
      }
    });
  }

  /* ---------------- Sticky header shadow on scroll ---------------- */
  var siteHeader = document.getElementById("siteHeader");

  if (siteHeader) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 12) {
        siteHeader.style.boxShadow = "0 4px 20px rgba(23, 41, 58, 0.08)";
      } else {
        siteHeader.style.boxShadow = "none";
      }
    });
  }
});
