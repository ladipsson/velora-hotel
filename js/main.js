/* ============================================
   HOTEL Lasgidi — Main JavaScript
   ============================================ */

(function () {
  "use strict";

  /* ---- Navbar Scroll Effect ---- */
  const navbar = document.querySelector(".navbar");

  function handleNavbar() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    } else {
      navbar.classList.remove("scrolled");
      if (navbar.dataset.transparent !== undefined) {
        navbar.classList.add("transparent");
      }
    }
  }

  window.addEventListener("scroll", handleNavbar, { passive: true });
  handleNavbar();

  /* ---- Mobile Menu ---- */
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open")
        ? "hidden"
        : "";
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- Active Nav Link ---- */
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ---- Scroll Animations ---- */
  const animatedElements = document.querySelectorAll(
    ".fade-in, .fade-in-left, .fade-in-right"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  animatedElements.forEach((el) => observer.observe(el));

  /* ---- Smooth Counter Animation ---- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("[data-count]").forEach((el) => {
    counterObserver.observe(el);
  });

  /* ---- Parallax Hero ---- */
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY;
        const heroBg = heroSection.querySelector(".hero-bg");
        if (heroBg) {
          heroBg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.1)`;
        }
      },
      { passive: true }
    );
  }

  /* ---- Gallery Lightbox ---- */
  const galleryItems = document.querySelectorAll(".gallery-item");
  if (galleryItems.length > 0) {
    // Create lightbox elements
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close">✕</button>
        <button class="lightbox-prev" aria-label="Previous">‹</button>
        <img class="lightbox-img" src="" alt="" />
        <button class="lightbox-next" aria-label="Next">›</button>
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Inject lightbox styles
    const lbStyles = document.createElement("style");
    lbStyles.textContent = `
      .lightbox {
        position: fixed; inset: 0; z-index: 9999;
        display: none; align-items: center; justify-content: center;
      }
      .lightbox.open { display: flex; }
      .lightbox-overlay {
        position: absolute; inset: 0;
        background: rgba(0,0,0,0.95);
        animation: lbFadeIn 0.3s ease;
      }
      .lightbox-content {
        position: relative; z-index: 2;
        display: flex; align-items: center; gap: 20px;
        max-width: 90vw; max-height: 90vh;
        animation: lbZoomIn 0.3s ease;
      }
      .lightbox-img {
        max-width: 80vw; max-height: 80vh;
        object-fit: contain; display: block;
        border: 1px solid rgba(201,169,110,0.2);
      }
      .lightbox-close {
        position: absolute; top: -40px; right: 0;
        color: #C9A96E; font-size: 1.2rem;
        background: none; border: none; cursor: pointer;
        transition: transform 0.2s ease;
      }
      .lightbox-close:hover { transform: rotate(90deg); }
      .lightbox-prev, .lightbox-next {
        color: #C9A96E; font-size: 3rem; line-height: 1;
        background: none; border: none; cursor: pointer;
        opacity: 0.7; transition: opacity 0.2s ease; padding: 10px;
      }
      .lightbox-prev:hover, .lightbox-next:hover { opacity: 1; }
      .lightbox-caption {
        position: absolute; bottom: -32px; left: 0; right: 0;
        text-align: center; font-size: 0.72rem;
        color: #888; letter-spacing: 1px;
      }
      @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes lbZoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    `;
    document.head.appendChild(lbStyles);

    let currentIndex = 0;
    const images = Array.from(galleryItems).map((item) => ({
      src: item.querySelector("img")?.src || item.dataset.src,
      caption: item.dataset.caption || "",
    }));

    function openLightbox(index) {
      currentIndex = index;
      lightbox.classList.add("open");
      updateLightbox();
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }

    function updateLightbox() {
      const img = lightbox.querySelector(".lightbox-img");
      const caption = lightbox.querySelector(".lightbox-caption");
      img.src = images[currentIndex].src;
      caption.textContent = images[currentIndex].caption;
    }

    galleryItems.forEach((item, index) => {
      item.style.cursor = "pointer";
      item.addEventListener("click", () => openLightbox(index));
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-overlay").addEventListener("click", closeLightbox);
    lightbox
      .querySelector(".lightbox-prev")
      .addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
      });
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
      }
      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
      }
    });
  }

  /* ---- Testimonial / Slider Auto-rotation ---- */
  const testimonialSlider = document.querySelector(".testimonial-slider");
  if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll(".testimonial-slide");
    const dots = testimonialSlider.querySelectorAll(".slider-dot");
    let current = 0;
    let autoplay;

    function goToSlide(index) {
      slides[current].classList.remove("active");
      if (dots[current]) dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      if (dots[current]) dots[current].classList.add("active");
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        clearInterval(autoplay);
        goToSlide(i);
        autoplay = setInterval(() => goToSlide(current + 1), 5000);
      });
    });

    autoplay = setInterval(() => goToSlide(current + 1), 5000);
  }

  /* ---- Tabs ---- */
  document.querySelectorAll("[data-tab-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const group = trigger.dataset.tabGroup;
      const target = trigger.dataset.tabTrigger;

      document
        .querySelectorAll(`[data-tab-group="${group}"][data-tab-trigger]`)
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(`[data-tab-group="${group}"][data-tab-content]`)
        .forEach((c) => c.classList.remove("active"));

      trigger.classList.add("active");
      const content = document.querySelector(
        `[data-tab-group="${group}"][data-tab-content="${target}"]`
      );
      if (content) content.classList.add("active");
    });
  });

  /* ---- Lazy Loading Images ---- */
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach((img) => imageObserver.observe(img));

  /* ---- Current Year in Footer ---- */
  const yearEls = document.querySelectorAll(".current-year");
  yearEls.forEach((el) => (el.textContent = new Date().getFullYear()));
})();
