

const tabss = document.querySelectorAll(".stakeholder-tab");
const contentWrappers = document.querySelectorAll(".content-text-wrapper");

tabss.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and content
    tabss.forEach((t) => t.classList.remove("active"));
    contentWrappers.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked tab and corresponding content
    tab.classList.add("active");
    contentWrappers[index].classList.add("active");
  });
});

const tabs = document.querySelectorAll(".stakeholder-tab");
const images = document.querySelectorAll(".details-media-image");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Active tab
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // Active image
    images.forEach((img) => img.classList.remove("active"));
    images[index].classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const chooseContainer = document.querySelector(".choose-sticky-container");
  const chooseSection = document.querySelector(".choose-section");
  const benefitsSection = document.querySelector(".benefits-section");

  if (!chooseContainer || !chooseSection || !benefitsSection) return;

  // the original order declared in the HTML.
  try {
    if (chooseContainer.nextElementSibling !== benefitsSection) {
      benefitsSection.parentNode.insertBefore(chooseContainer, benefitsSection);
    }
  } catch (e) {
    // If insertion fails for any reason, continue — measuring will still run
    // against whatever elements exist. This prevents throwing in older browsers.
    console.warn("Could not re-order choose/benefits sections:", e);
  }

  function updateChooseOffset() {
    // Round up to avoid sub-pixel gaps
    const h = Math.ceil(chooseSection.getBoundingClientRect().height);
    // expose CSS variable (used by CSS as fallback)
    document.documentElement.style.setProperty("--choose-height", `${h}px`);
    // apply explicit inline margin so layout reacts immediately
    benefitsSection.style.marginTop = `-${h}px`;
  }

  // initial
  updateChooseOffset();

  // update on resize (debounced)
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateChooseOffset, 120);
  });
});

// final.js
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

document.querySelectorAll(".mobile-links a").forEach((link) => {
  link.addEventListener("click", (e) => {

    // ❌ Do NOT close menu for accordion triggers
    if (
      link.classList.contains("mobile-main-link") || // level 1
      link.closest(".mobile-subgroup") &&             // inside offerings
      !link.classList.contains("mobile-submenu-highlight") // except Pricing
    ) {
      return;
    }

    closeMenu(); // ✅ only real navigation links
  });
});



mobileOverlay.addEventListener("click", closeMenu);

window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && mobileNav.classList.contains("open")) {
    closeMenu();
  }
});

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

    // Open first item of EACH accordion by default
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
  function setupModal({
    openBtnId,
    modalSelector
  }) {
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

      // 1️⃣ HTML5 validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // 2️⃣ Extra phone validation
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
    modalSelector: ".modal-overlay"
  });

  setupModal({
    openBtnId: "openModal2",
    modalSelector: ".brochure-modal-overlay"
  });
});



// cards.forEach(card => observer.observe(card));
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.2   // 20% visible = trigger
    }
  );

  reveals.forEach(el => observer.observe(el));

document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     RIPPLE RINGS (SAFE)
  ========================= */

  const rings = document.querySelectorAll('.core-ring');

  if (rings.length > 0) {
    let step = 0;

    setInterval(() => {
      rings.forEach(r => r.style.opacity = 0);

      if (step >= 1 && rings[0]) rings[0].style.opacity = 1;
      if (step >= 2 && rings[1]) rings[1].style.opacity = 1;
      if (step >= 3 && rings[2]) rings[2].style.opacity = 1;

      step = (step + 1) % 4;
    }, 900);
  }

  /* =========================
     COUNTRY CODE SELECT
  ========================= */

  const select = document.querySelector('.country-select');
  const text = document.querySelector('.code-text');

  if (select && text) {
    text.textContent = select.value;

    select.addEventListener('change', () => {
      text.textContent = select.value;
    });
  }


});

document.addEventListener("click", (e) => {

  /* ===== TYPE SELECTOR ===== */
  const typeBtn = e.target.closest(".type-btn");
  if (typeBtn) {
    const group = typeBtn.closest(".type-selector");
    if (!group) return;

    e.preventDefault();
    e.stopPropagation();

    group.querySelectorAll(".type-btn")
      .forEach(btn => btn.classList.remove("active"));

    typeBtn.classList.add("active");
    return; // stop here so tab logic doesn't run
  }

  /* ===== TAB GROUP ===== */
  const tab = e.target.closest(".tab");
  if (tab) {
    const group = tab.closest(".tab-group");
    if (!group) return;

    e.preventDefault();
    e.stopPropagation();

    group.querySelectorAll(".tab")
      .forEach(t => t.classList.remove("active"));

    tab.classList.add("active");
  }

});


document.addEventListener("click", (e) => {

  /* ===== LEVEL 2: OFFERINGS ===== */
  const subgroup = e.target.closest(".mobile-subgroup-title");
  if (subgroup) {
    e.preventDefault();
    e.stopPropagation();

    const wrapper = subgroup.closest(".mobile-subgroup");
    if (!wrapper) return;

    wrapper.classList.toggle("open");
    return; // 🔥 stop here, do NOT touch parent
  }

  /* ===== LEVEL 1: MAIN MENU ===== */
  const mainLink = e.target.closest(".mobile-main-link");
  if (mainLink) {
    e.preventDefault();
    e.stopPropagation();

    const currentItem = mainLink.closest(".mobile-item");
    if (!currentItem) return;

    const isOpen = currentItem.classList.contains("open");

    // close other main menus
    document.querySelectorAll(".mobile-item.open")
      .forEach(item => item.classList.remove("open"));

    // toggle current
    if (!isOpen) {
      currentItem.classList.add("open");
    }
  }

});



document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // run once
        }
      });
    },
    { threshold: 0.3 }
  );

  reveals.forEach(el => observer.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
  const filterGroups = document.querySelectorAll(".upd-filter-group");

  filterGroups.forEach(group => {
    const buttons = group.querySelectorAll(".upd-filter-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active from all buttons in this group
        buttons.forEach(btn => btn.classList.remove("active"));

        // Add active to clicked button
        button.classList.add("active");
      });
    });
  });
});

function revealOnScroll() {
  const elements = document.querySelectorAll(".text-reveal");
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const triggerPoint = windowHeight * 0.9;

    if (rect.top <= triggerPoint && rect.bottom >= 0) {
      // Element is visible
      el.classList.add("show");
    } else {
      // Element is out of view → reset
      el.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".partner-card-4");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
        } else {
          entry.target.classList.remove("reveal");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  cards.forEach((card) => observer.observe(card));
});

function revealServiceCards() {
  const cards = document.querySelectorAll(".service-why-card");
  const windowHeight = window.innerHeight;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const triggerPoint = windowHeight * 0.85;

    if (rect.top <= triggerPoint && rect.bottom >= 0) {
      card.classList.add("show");
    } else {
      card.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", revealServiceCards);
window.addEventListener("load", revealServiceCards);
