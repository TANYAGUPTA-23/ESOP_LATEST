const videoSection = document.querySelector('.video-section');
const videoFrame = document.querySelector('.video-frame-outer');
const overlay = document.querySelector('.overlay-image');

window.addEventListener('scroll', () => {
  const screenWidth = window.innerWidth;
    // Reset on mobile/tablet
    videoFrame.style.transform = 'scale(1.2)';
    overlay.style.filter = 'brightness(100%)';
  
});





// JavaScript for 2-bounce effect
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.esop-cta-button');
  if (!button) return;

  const span = button.querySelector('span');
  const img = button.querySelector('img');

  function bounce() {
    span.classList.remove('bounce-text');
    img.classList.remove('bounce-icon');

    void span.offsetWidth; // restart animation
    void img.offsetWidth;

    span.classList.add('bounce-text');
    img.classList.add('bounce-icon');
  }

  // First bounce on hover
  button.addEventListener('mouseenter', () => bounce());

  // Second bounce on hover out
  button.addEventListener('mouseleave', () => bounce());

  // Clean up classes after animation
  span.addEventListener('animationend', () => span.classList.remove('bounce-text'));
  img.addEventListener('animationend', () => img.classList.remove('bounce-icon'));
});
const tabss = document.querySelectorAll('.stakeholder-tab');
const contentWrappers = document.querySelectorAll('.content-text-wrapper');

tabss.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and content
    tabss.forEach(t => t.classList.remove('active'));
    contentWrappers.forEach(c => c.classList.remove('active'));

    // Add active class to clicked tab and corresponding content
    tab.classList.add('active');
    contentWrappers[index].classList.add('active');
  });
});



const tabs = document.querySelectorAll('.stakeholder-tab');
const images = document.querySelectorAll('.details-media-image');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Active tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Active image
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
  });
});



















// Sticky overlay behavior: measure the choose section and offset the
// benefits section so benefits will slide up and visually cover the
// pinned choose section as the user scrolls. This mirrors the
// "benefits" marquee handling pattern and is only layout/JS helper.
document.addEventListener('DOMContentLoaded', () => {
  const chooseContainer = document.querySelector('.choose-sticky-container');
  const chooseSection = document.querySelector('.choose-section');
  const benefitsSection = document.querySelector('.benefits-section');

  if (!chooseContainer || !chooseSection || !benefitsSection) return;

  // Ensure the choose container sits in the DOM immediately before the
  // benefits section (i.e. between the video and benefits). This moves the
  // element only when it's not already in the expected position, preserving
  // the original order declared in the HTML.
  try {
    if (chooseContainer.nextElementSibling !== benefitsSection) {
      benefitsSection.parentNode.insertBefore(chooseContainer, benefitsSection);
    }
  } catch (e) {
    // If insertion fails for any reason, continue — measuring will still run
    // against whatever elements exist. This prevents throwing in older browsers.
    console.warn('Could not re-order choose/benefits sections:', e);
  }

  function updateChooseOffset() {
    // Round up to avoid sub-pixel gaps
    const h = Math.ceil(chooseSection.getBoundingClientRect().height);
    // expose CSS variable (used by CSS as fallback)
    document.documentElement.style.setProperty('--choose-height', `${h}px`);
    // apply explicit inline margin so layout reacts immediately
    benefitsSection.style.marginTop = `-${h}px`;
  }

  // initial
  updateChooseOffset();

  // update on resize (debounced)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateChooseOffset, 120);
  });
});

// final.js
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileOverlay = document.getElementById('mobile-overlay');

const closeMenu = () => {
  mobileNav.classList.remove('open');
  hamburgerBtn.classList.remove('is-active');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
};

hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileNav.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    mobileNav.classList.add('open');
    hamburgerBtn.classList.add('is-active');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
});

document.querySelectorAll('.mobile-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

mobileOverlay.addEventListener('click', closeMenu);

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
    closeMenu();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playButton');
  const videoOverlay = document.getElementById('videoOverlay');
  const videoIframe = document.getElementById('videoIframe');
  const videoSource = "https://www.youtube.com/embed/cpoXLj24BDY?autoplay=1&mute=0&controls=1";

  if (playButton) {
    playButton.addEventListener('click', () => {
      videoIframe.src = videoSource;
      videoOverlay.style.opacity = '0';
      setTimeout(() => {
        videoOverlay.style.display = 'none';
        videoIframe.style.display = 'block';
      }, 500);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const accordion = document.getElementById('accordion');
  const items = accordion.querySelectorAll('.accordion-item');

  function toggleContent(item, open) {
    const content = item.querySelector('.accordion-item__content');
    const iconSpan = item.querySelector('.header__icon');

    if (open) {
      item.classList.add('is-open');
      content.style.maxHeight = content.scrollHeight + 44 + 'px';
      iconSpan.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>`;
    } else {
      item.classList.remove('is-open');
      content.style.maxHeight = '0';
      iconSpan.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`;
    }
  }

  items.forEach(item => {
    const header = item.querySelector('.accordion-item__header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach(other => toggleContent(other, false));
      if (!isOpen) toggleContent(item, true);
    });
  });

  toggleContent(items[0], true);
});

// Initialize testimonials marquee
document.addEventListener('DOMContentLoaded', () => {
  const testimonialGrid = document.querySelector('.testimonial-grid');
  if (testimonialGrid) {
    const originalTestimonialHTML = testimonialGrid.innerHTML;
    let testimonialMarqueeInitialized = false;

    function initTestimonialMarquee() {
      if (testimonialMarqueeInitialized || window.innerWidth <= 768) return;

      const cards = Array.from(testimonialGrid.querySelectorAll('.testimonial-card'));
      if (cards.length < 3) return;

      const cols = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
      cols.forEach(c => c.className = 'testimonials-column');
      cards.forEach((card, idx) => {
        const targetCol = idx % 3;
        cols[targetCol].appendChild(card.cloneNode(true));
      });

      testimonialGrid.innerHTML = '';
      cols.forEach(col => testimonialGrid.appendChild(col));
      testimonialGrid.classList.add('marquee-ready');

      cols.forEach((col, colIndex) => {
        const inner = document.createElement('div');
        inner.className = 'testimonials-column-inner';

        const children = Array.from(col.children);
        children.forEach(child => inner.appendChild(child));
        children.forEach(child => inner.appendChild(child.cloneNode(true)));
        children.forEach(child => inner.appendChild(child.cloneNode(true)));

        col.innerHTML = '';
        col.appendChild(inner);

        requestAnimationFrame(() => {
          const totalHeight = inner.scrollHeight;
          const singleSetHeight = totalHeight / 3;
          col.style.height = singleSetHeight + 'px';
          col.style.overflow = 'hidden';
          testimonialGrid.style.height = singleSetHeight + 'px';
          inner.style.setProperty('--marquee-distance', singleSetHeight + 'px');
          inner.style.setProperty('--marquee-duration', '15s');

          if (colIndex === 1) {
            inner.classList.add('marquee-up');
            inner.style.transform = 'translateY(0)';
          } else {
            inner.classList.add('marquee-down');
            inner.style.transform = `translateY(${-singleSetHeight}px)`;
          }
        });
      });

      testimonialMarqueeInitialized = true;
      testimonialGrid.dataset.marqueeInit = '1';
    }

    function destroyTestimonialMarquee() {
      if (!testimonialMarqueeInitialized) return;
      testimonialGrid.innerHTML = originalTestimonialHTML;
      testimonialGrid.classList.remove('marquee-ready');
      testimonialGrid.style.height = '';
      delete testimonialGrid.dataset.marqueeInit;
      testimonialMarqueeInitialized = false;
    }

    initTestimonialMarquee();

    let testimonialResizeTimer = null;
    window.addEventListener('resize', () => {
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

// Initialize benefits marquee
// document.addEventListener('DOMContentLoaded', () => {
//   const grid = document.querySelector('.benefits-cards-grid');
//   if (!grid) return;

//   const originalHTML = grid.innerHTML;
//   let marqueeInitialized = false;

//   function initMarquee() {
//     if (marqueeInitialized || window.innerWidth <= 768) return;

//     const cards = Array.from(grid.querySelectorAll('.benefit-card'));
//     if (cards.length < 3) return;

//     const cols = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
//     cols.forEach(c => c.className = 'benefits-column');
//     cards.forEach((card, idx) => {
//       const targetCol = idx % 3;
//       cols[targetCol].appendChild(card.cloneNode(true));
//     });

//     grid.innerHTML = '';
//     cols.forEach(col => grid.appendChild(col));
//     grid.classList.add('marquee-ready');

//     cols.forEach((col, colIndex) => {
//       const inner = document.createElement('div');
//       inner.className = 'benefits-column-inner';

//       const children = Array.from(col.children);
//       if (colIndex !== 1) {
//         const originalChildren = [...children];
//         children.length = 0;
//         if (colIndex === 0 || colIndex === 2) {
//           children.push(
//             ...originalChildren.slice(6),
//             ...originalChildren.slice(0, 6)
//           );
//         }
//       }

//       children.forEach(child => inner.appendChild(child));
//       children.forEach(child => inner.appendChild(child.cloneNode(true)));
//       children.forEach(child => inner.appendChild(child.cloneNode(true)));

//       col.innerHTML = '';
//       col.appendChild(inner);

//       requestAnimationFrame(() => {
//         const totalHeight = inner.scrollHeight;
//         const singleSetHeight = totalHeight / 3;
//         col.style.height = singleSetHeight + 'px';
//         col.style.overflow = 'hidden';
//         grid.style.height = singleSetHeight + 'px';
//         inner.style.setProperty('--marquee-distance', singleSetHeight + 'px');
//         inner.style.setProperty('--marquee-duration', '11s');

//         if (colIndex === 1) {
//           inner.classList.add('marquee-up');
//           inner.style.transform = 'translateY(0)';
//         } else {
//           inner.classList.add('marquee-down');
//           inner.style.transform = `translateY(${-singleSetHeight}px)`;
//         }
//       });
//     });

//     marqueeInitialized = true;
//     grid.dataset.marqueeInit = '1';
//   }

//   function destroyMarquee() {
//     if (!marqueeInitialized) return;
//     grid.innerHTML = originalHTML;
//     grid.classList.remove('marquee-ready');
//     grid.style.height = '';
//     delete grid.dataset.marqueeInit;
//     marqueeInitialized = false;
//   }

//   initMarquee();

//   let resizeTimer = null;
//   window.addEventListener('resize', () => {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(() => {
//       if (window.innerWidth <= 768) {
//         destroyMarquee();
//       } else {
//         initMarquee();
//       }
//     }, 150);
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openModal");
  const modal = document.querySelector(".modal-overlay");
  const closeBtn = document.querySelector(".close-btn");

  const submitBtn = document.getElementById("submit-btn");
  const successCard = document.getElementById("successCard");
  const formContainer = document.querySelector(".form-container");

  /* ---------- OPEN MODAL ---------- */
  openBtn?.addEventListener("click", () => {
    modal.classList.add("active");
    document.body.classList.add("no-scroll");
  });

  /* ---------- CLOSE MODAL (X) ---------- */
  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });


  /* ---------- SUBMIT BUTTON ---------- */
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // close form modal
  modal.classList.remove("active");
  document.body.classList.remove("no-scroll");

  // show success overlay
  document.getElementById("successOverlay").classList.add("active");
});
});

document.querySelector(".demo-form").addEventListener("submit", (e) => {
  const form = e.target;

  if (!form.checkValidity()) {
    e.preventDefault(); // stop submit
    form.reportValidity(); // show browser messages
    return;
  }

  // ✅ form is valid here
  e.preventDefault();

  modal.classList.remove("active");
  document.body.classList.remove("no-scroll");

  document.getElementById("successOverlay").classList.add("active");
});

