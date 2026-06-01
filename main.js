/* =========================================================
   R&R Outdoor Essentials — interactions
   Header scroll inversion · project filter · estimate modal
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Header scroll inversion ---------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 80) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Project gallery ---------- */
  var projects = [
    { img: "assets/photo-outdoor-living.jpg", title: "Lakeside patio retreat",              category: "Outdoor living",   location: "Birch Lake · 6 wk build" },
    { img: "assets/photo-greenhouse.jpg",     title: "Backyard greenhouse",                 category: "Landscape design", location: "Cedar Hollow · 3 wk install" },
    { img: "assets/photo-garden-rows.jpg",    title: "Kitchen garden, 8 beds",              category: "Landscape design", location: "Old Mill Road · 4 wk install" },
    { img: "assets/photo-harvest-basket.jpg", title: "Heirloom plot, full season care",     category: "Lawn care",        location: "Maple Acres · weekly" },
    { img: "assets/photo-pond-geese.jpg",     title: "Pond edge restoration",               category: "Landscape design", location: "Goose Pond · 5 wk build" },
    { img: "assets/photo-sunset.jpg",         title: "Twelve-acre meadow maintenance",      category: "Lawn care",        location: "County Line · seasonal" }
  ];

  var catClass = {
    "Outdoor living":   "cat-sun",
    "Landscape design": "cat-pond",
    "Lawn care":        "cat-sage"
  };

  var grid = document.getElementById("projects-grid");
  var filterRow = document.getElementById("filter-row");
  var currentFilter = "All projects";

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderProjects() {
    var visible = currentFilter === "All projects"
      ? projects
      : projects.filter(function (p) { return p.category === currentFilter; });

    grid.innerHTML = visible.map(function (p, i) {
      var feature = (i === 0 && currentFilter === "All projects");
      var cc = catClass[p.category] || "cat-sun";
      return (
        '<a href="#contact" class="project-card' + (feature ? " feature" : "") + '">' +
          '<div class="project-card__img" style="background-image:url(\'' + p.img + '\')"></div>' +
          '<div class="project-card__scrim"></div>' +
          '<div class="project-card__action"><svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right"></use></svg></div>' +
          '<div class="project-card__text">' +
            '<p class="eyebrow ' + cc + '">' + escapeHtml(p.category) + " &middot; " + escapeHtml(p.location) + "</p>" +
            "<h3>" + escapeHtml(p.title) + "</h3>" +
          "</div>" +
        "</a>"
      );
    }).join("");
  }

  if (filterRow) {
    filterRow.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      currentFilter = btn.getAttribute("data-filter");
      Array.prototype.forEach.call(filterRow.querySelectorAll(".chip"), function (c) {
        c.classList.toggle("active", c === btn);
      });
      renderProjects();
    });
  }
  renderProjects();

  /* ---------- Estimate modal ---------- */
  var modal = document.getElementById("estimate-modal");
  var modalCard = document.getElementById("modal-card");
  var stepForm = document.getElementById("modal-step-form");
  var stepSuccess = document.getElementById("modal-step-success");
  var form = document.getElementById("estimate-form");
  var successName = document.getElementById("success-name");
  var lastFocused = null;
  var resetTimer = null;

  function showStep(step) {
    stepForm.hidden = step !== 0;
    stepSuccess.hidden = step !== 1;
  }

  function openModal() {
    if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
    lastFocused = document.activeElement;
    showStep(0);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var firstInput = form.querySelector("input, select, textarea");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    // reset to step 0 after the dismiss animation so the form doesn't flash
    resetTimer = setTimeout(function () { showStep(0); if (form) form.reset(); }, 300);
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-open-modal]"), function (btn) {
    btn.addEventListener("click", openModal);
  });

  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-back").addEventListener("click", closeModal);

  // backdrop click closes; clicks inside the card don't bubble out
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var name = (form.elements.name.value || "").trim();
    var first = name.split(" ")[0] || "neighbor";
    successName.textContent = first;
    // NOTE: wire this to a real endpoint (Resend/Postmark/CRM webhook) for production.
    showStep(1);
    document.getElementById("modal-back").focus();
  });
})();
