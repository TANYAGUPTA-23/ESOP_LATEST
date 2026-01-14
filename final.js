// Fades out the page loader and smoothly reveals the main app content on load
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  const app = document.getElementById("app-root");

  if (!loader) return;
  loader.style.transition = "opacity 0.6s ease";
  loader.style.opacity = "0";
  if (app) {
    app.style.transition = "opacity 0.6s ease";
    app.style.opacity = "1";
  }

  setTimeout(() => {
    loader.remove();
  }, 600);
});

// Controls opening and closing of the mobile navigation menu and overlay
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileNav = document.getElementById("mobile-nav");
const mobileOverlay = document.getElementById("mobile-overlay");

const closeMenu = () => {
  mobileNav.classList.remove("open");
  hamburgerBtn.classList.remove("is-active");
  mobileOverlay.classList.remove("open");
  document.body.style.overflow = "";
};

hamburgerBtn.addEventListener("click", () => {
  const isOpen = mobileNav.classList.contains("open");
  if (isOpen) {
    closeMenu();
  } else {
    mobileNav.classList.add("open");
    hamburgerBtn.classList.add("is-active");
    mobileOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
});

// Closes the mobile menu when a valid navigation link is clicked
document.querySelectorAll(".mobile-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (
      link.classList.contains("mobile-main-link") ||
      (link.closest(".mobile-subgroup") &&
        !link.classList.contains("mobile-submenu-highlight"))
    ) {
      return;
    }

    closeMenu();
  });
});

mobileOverlay.addEventListener("click", closeMenu);

window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && mobileNav.classList.contains("open")) {
    closeMenu();
  }
});

// Handles expand/collapse behavior for mobile main menu and nested submenu items
document.addEventListener("click", (e) => {
  /* ===== LEVEL 2: OFFERINGS ===== */
  const subgroup = e.target.closest(".mobile-subgroup-title");
  if (subgroup) {
    e.preventDefault();
    e.stopPropagation();

    const wrapper = subgroup.closest(".mobile-subgroup");
    if (!wrapper) return;

    wrapper.classList.toggle("open");
    return;
  }

  /* ===== LEVEL 1: MAIN MENU ===== */
  const mainLink = e.target.closest(".mobile-main-link");
  if (mainLink) {
    e.preventDefault();
    e.stopPropagation();

    const currentItem = mainLink.closest(".mobile-item");
    if (!currentItem) return;

    const isOpen = currentItem.classList.contains("open");

    document
      .querySelectorAll(".mobile-item.open")
      .forEach((item) => item.classList.remove("open"));

    if (!isOpen) {
      currentItem.classList.add("open");
    }
  }
});

// Animates core rings in sequence and updates country code text based on select input
document.addEventListener("DOMContentLoaded", () => {
  const rings = document.querySelectorAll(".core-ring");

  if (rings.length > 0) {
    let step = 0;

    setInterval(() => {
      rings.forEach((r) => (r.style.opacity = 0));

      if (step >= 1 && rings[0]) rings[0].style.opacity = 1;
      if (step >= 2 && rings[1]) rings[1].style.opacity = 1;
      if (step >= 3 && rings[2]) rings[2].style.opacity = 1;

      step = (step + 1) % 4;
    }, 900);
  }

  const select = document.querySelector(".country-select");
  const text = document.querySelector(".code-text");

  if (select && text) {
    text.textContent = select.value;

    select.addEventListener("change", () => {
      text.textContent = select.value;
    });
  }
});

// Handles tab switching between tabs and their corresponding content
const tabss = document.querySelectorAll(".stakeholder-tab");
const contentWrappers = document.querySelectorAll(".content-text-wrapper");

tabss.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabss.forEach((t) => t.classList.remove("active"));
    contentWrappers.forEach((c) => c.classList.remove("active"));

    tab.classList.add("active");
    contentWrappers[index].classList.add("active");
  });
});

// Syncs stakeholder tabs with their corresponding images on click
const tabs = document.querySelectorAll(".stakeholder-tab");
const images = document.querySelectorAll(".details-media-image");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    images.forEach((img) => img.classList.remove("active"));
    images[index].classList.add("active");
  });
});

// Plays the YouTube video on button click and hides the overlay
document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  const videoOverlay = document.getElementById("videoOverlay");
  const videoIFrame = document.getElementById("videoIframe");
  const videoSource =
    "https://www.youtube.com/embed/cpoXLj24BDY?autoplay=1&mute=0&controls=1";

  if (playButton) {
    playButton.addEventListener("click", () => {
      videoIframe.src = videoSource;
      videoOverlay.style.opacity = "0";
      setTimeout(() => {
        videoOverlay.style.display = "none";
        videoIframe.style.display = "block";
      }, 500);
    });
  }
});

// Handles accordion expand/collapse behavior and ensures only one item is open at a time
document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".questions-section__accordion");

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");

    function toggleContent(item, open) {
      const content = item.querySelector(".accordion-item__content");
      const iconSpan = item.querySelector(".header__icon");

      if (open) {
        item.classList.add("is-open");
        content.style.maxHeight = content.scrollHeight + 44 + "px";
        iconSpan.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13H5v-2h14v2z"/>
          </svg>`;
      } else {
        item.classList.remove("is-open");
        content.style.maxHeight = "0";
        iconSpan.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>`;
      }
    }

    items.forEach((item) => {
      const header = item.querySelector(".accordion-item__header");

      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        items.forEach((other) => toggleContent(other, false));
        if (!isOpen) toggleContent(item, true);
      });
    });

    if (items.length) {
      toggleContent(items[0], true);
    }
  });
});

// Initialize testimonials marquee
document.addEventListener("DOMContentLoaded", () => {
  const testimonialGrid = document.querySelector(".testimonial-grid");
  if (testimonialGrid) {
    const originalTestimonialHTML = testimonialGrid.innerHTML;
    let testimonialMarqueeInitialized = false;

    function initTestimonialMarquee() {
      if (testimonialMarqueeInitialized || window.innerWidth <= 768) return;

      const cards = Array.from(
        testimonialGrid.querySelectorAll(".testimonial-card")
      );
      if (cards.length < 3) return;

      const cols = [
        document.createElement("div"),
        document.createElement("div"),
        document.createElement("div"),
      ];
      cols.forEach((c) => (c.className = "testimonials-column"));
      cards.forEach((card, idx) => {
        const targetCol = idx % 3;
        cols[targetCol].appendChild(card.cloneNode(true));
      });

      testimonialGrid.innerHTML = "";
      cols.forEach((col) => testimonialGrid.appendChild(col));
      testimonialGrid.classList.add("marquee-ready");

      cols.forEach((col, colIndex) => {
        const inner = document.createElement("div");
        inner.className = "testimonials-column-inner";

        const children = Array.from(col.children);
        children.forEach((child) => inner.appendChild(child));
        children.forEach((child) => inner.appendChild(child.cloneNode(true)));
        children.forEach((child) => inner.appendChild(child.cloneNode(true)));

        col.innerHTML = "";
        col.appendChild(inner);

        requestAnimationFrame(() => {
          const totalHeight = inner.scrollHeight;
          const singleSetHeight = totalHeight / 3;
          col.style.height = singleSetHeight + "px";
          col.style.overflow = "hidden";
          testimonialGrid.style.height = singleSetHeight + "px";
          inner.style.setProperty("--marquee-distance", singleSetHeight + "px");
          inner.style.setProperty("--marquee-duration", "15s");

          if (colIndex === 1) {
            inner.classList.add("marquee-up");
            inner.style.transform = "translateY(0)";
          } else {
            inner.classList.add("marquee-down");
            inner.style.transform = `translateY(${-singleSetHeight}px)`;
          }
        });
      });

      testimonialMarqueeInitialized = true;
      testimonialGrid.dataset.marqueeInit = "1";
    }

    function destroyTestimonialMarquee() {
      if (!testimonialMarqueeInitialized) return;
      testimonialGrid.innerHTML = originalTestimonialHTML;
      testimonialGrid.classList.remove("marquee-ready");
      testimonialGrid.style.height = "";
      delete testimonialGrid.dataset.marqueeInit;
      testimonialMarqueeInitialized = false;
    }

    initTestimonialMarquee();

    let testimonialResizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(testimonialResizeTimer);
      testimonialResizeTimer = setTimeout(() => {
        if (window.innerWidth <= 768) {
          destroyTestimonialMarquee();
        } else {
          initTestimonialMarquee();
        }
      }, 150);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  function setupModal({ openBtnId, modalSelector }) {
    const openBtn = document.getElementById(openBtnId);
    const modal = document.querySelector(modalSelector);

    if (!openBtn || !modal) return;

    const closeBtn = modal.querySelector(".close-btn");
    const form = modal.querySelector(".demo-form");
    const successOverlay = document.getElementById("successOverlay");

    /* ---------- OPEN MODAL ---------- */
    openBtn.addEventListener("click", () => {
      modal.classList.add("active");
      document.body.classList.add("no-scroll");
    });

    /* ---------- CLOSE MODAL ---------- */
    closeBtn?.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });

    /* ---------- FORM SUBMIT + VALIDATION ---------- */
    form?.addEventListener("submit", (e) => {
      e.preventDefault();

      // HTML5 validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Extra phone validation
      const phoneInput = form.querySelector('input[type="tel"]');
      const phone = phoneInput?.value.trim();

      if (phoneInput && !/^[6-9][0-9]{9}$/.test(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        phoneInput.focus();
        return;
      }

      // ✅ ALL VALID
      modal.classList.remove("active");
      document.body.classList.remove("no-scroll");
      successOverlay?.classList.add("active");

      form.reset();
    });
  }

  /* ===== INIT BOTH MODALS ===== */
  setupModal({
    openBtnId: "openModal",
    modalSelector: ".modal-overlay",
  });

  setupModal({
    openBtnId: "openModal2",
    modalSelector: ".brochure-modal-overlay",
  });
});

// Manages active state for type selectors and tab groups using event delegation
document.addEventListener("click", (e) => {
  const typeBtn = e.target.closest(".type-btn");
  if (typeBtn) {
    const group = typeBtn.closest(".type-selector");
    if (!group) return;

    e.preventDefault();
    e.stopPropagation();

    group
      .querySelectorAll(".type-btn")
      .forEach((btn) => btn.classList.remove("active"));

    typeBtn.classList.add("active");
    return;
  }

  const tab = e.target.closest(".tab");
  if (tab) {
    const group = tab.closest(".tab-group");
    if (!group) return;

    e.preventDefault();
    e.stopPropagation();

    group.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));

    tab.classList.add("active");
  }
});

// Manages active state switching within each filter button group
document.addEventListener("DOMContentLoaded", () => {
  const filterGroups = document.querySelectorAll(".upd-filter-group");

  filterGroups.forEach((group) => {
    const buttons = group.querySelectorAll(".upd-filter-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));

        button.classList.add("active");
      });
    });
  });
});

// Handles all viewport-based reveal animations (run-once and toggle) using a single IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".reveal, .blur-rise, .grid .card, .partner-card-4, .partner-section .card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const isVisible = entry.isIntersecting;

        // RUN-ONCE ELEMENTS
        if (el.dataset.once === "true") {
          if (isVisible) {
            el.classList.add("active", "show", "reveal");
            observer.unobserve(el);
          }
          return;
        }

        // NORMAL TOGGLE ELEMENTS
        if (el.classList.contains("blur-rise")) {
          el.classList.toggle("show", isVisible);
        }

        if (el.classList.contains("reveal")) {
          el.classList.toggle("active", isVisible);
        }

        if (
          el.matches(".grid .card, .partner-card-4, .partner-section .card")
        ) {
          el.classList.toggle("reveal", isVisible);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  let lastScrollY = window.scrollY;
  let scrollAnimationsEnabled = false;
  let ticking = false;

  // Cache DOM references ONCE
  const featureGrid = document.querySelector(".feature-showcase-grid");
  const featureCards = featureGrid
    ? [...featureGrid.querySelectorAll(".feature-card-wrapper")]
    : [];

  const textReveals = [...document.querySelectorAll(".text-reveal")];
  const serviceCards = [...document.querySelectorAll(".service-why-card")];

  function onScrollAnimations() {
    if (!scrollAnimationsEnabled) return;

    const windowHeight = window.innerHeight;
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    lastScrollY = currentScrollY;

    /* ================= FEATURE SHOWCASE ================= */
    if (featureGrid) {
      const rect = featureGrid.getBoundingClientRect();
      const triggerPoint = windowHeight * 0.85;
      const cards = scrollingDown ? featureCards : [...featureCards].reverse();

      if (rect.top <= triggerPoint && rect.bottom >= 0) {
        cards.forEach((card) => card.classList.add("show"));
      } else {
        cards.forEach((card) => card.classList.remove("show"));
      }
    }

    /* ================= TEXT REVEAL ================= */
    textReveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      el.classList.toggle(
        "show",
        rect.top <= windowHeight * 0.9 && rect.bottom >= 0
      );
    });

    /* ================= SERVICE CARDS ================= */
    serviceCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.classList.toggle(
        "show",
        rect.top <= windowHeight * 0.85 && rect.bottom >= 0
      );
    });
  }

  // rAF-throttled scroll listener
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  //  Enable scroll animations AFTER first paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollAnimationsEnabled = true;
      onScrollAnimations(); 
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("openContactSuccess");
  const form = document.getElementById("contactForm");
  const success = document.getElementById("contactSuccess");

  btn.addEventListener("click", () => {

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const phoneInput = form.querySelector('input[type="tel"]');
    if (!/^[0-9]{10}$/.test(phoneInput.value)) {
      alert("Please enter a valid 10-digit phone number");
      phoneInput.focus();
      return;
    }

    success.classList.add("is-active");
    document.body.classList.add("no-scroll");

    form.reset();
  });
});
