/* ==========================================
   LACE LUXE BRIDAL – main.js
   ========================================== */

'use strict';

// ─── AOS Init ────────────────────────────────────────────────────────────────
if (window.AOS) {
  AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
  });
}

// ─── Sticky Navbar Scroll Effect ─────────────────────────────────────────────
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ─── Active Nav Link Highlight ────────────────────────────────────────────────
const highlightActivePage = () => {
  const currentUrl = new URL(window.location.href);
  let page = currentUrl.pathname.split('/').filter(Boolean).pop() || 'index.html';

  const dropdownToggle = document.getElementById('homeDropdown');
  if (dropdownToggle) dropdownToggle.classList.remove('active-nav');

  document.querySelectorAll('.active-nav').forEach(link => {
    link.classList.remove('active-nav');
    link.removeAttribute('aria-current');
  });

  const pageLinks = document.querySelectorAll('#mainNav a[href]');

  pageLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('tel:') || href.startsWith('mailto:')) return;

    const linkPage = href.split('#')[0].split('?')[0].split('/').pop() || 'index.html';
    const isActive = linkPage === page || (page === 'index.html' && linkPage === '');

    if (isActive) {
      link.classList.add('active-nav');
      link.setAttribute('aria-current', 'page');

      if (link.classList.contains('dropdown-item')) {
        if (dropdownToggle) dropdownToggle.classList.add('active-nav');
      }
    }
  });
};
document.addEventListener('DOMContentLoaded', highlightActivePage);

// ─── Hero Floating Particles ─────────────────────────────────────────────────
function createHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const symbols = ['✦', '❋', '✿', '◈', '⬡', '❀', '✾'];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span');
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const size = Math.random() * 14 + 8;
    const duration = Math.random() * 14 + 8;
    const delay = Math.random() * 8;
    const left = Math.random() * 100;
    const opacity = Math.random() * 0.18 + 0.04;
    Object.assign(p.style, {
      position: 'absolute',
      left: `${left}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${size}px`,
      color: Math.random() > 0.5 ? '#c8a96e' : '#c9826e',
      opacity: opacity,
      animation: `floatParticle ${duration}s ${delay}s ease-in-out infinite alternate`,
      pointerEvents: 'none',
      userSelect: 'none'
    });
    container.appendChild(p);
  }
}

// Inject particle keyframes dynamically
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes floatParticle {
    0%   { transform: translateY(0px) rotate(0deg) scale(1); }
    33%  { transform: translateY(-22px) rotate(12deg) scale(1.1); }
    66%  { transform: translateY(8px) rotate(-8deg) scale(0.95); }
    100% { transform: translateY(-14px) rotate(6deg) scale(1.05); }
  }
  .active-nav {
    color: var(--clr-rose) !important;
  }
  .active-nav::after {
    left: 12px !important;
    right: 12px !important;
  }
`;
document.head.appendChild(particleStyle);

// ─── Counter Animation ────────────────────────────────────────────────────────
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  let observed = false;
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !observed) {
      observed = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        animateCounter(counter, target);
      });
      observer.disconnect();
    }
  }, { threshold: 0.4 });
  if (counters.length) observer.observe(counters[0]);
}

// ─── Pattern Library Filter ───────────────────────────────────────────────────
function initPatternFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const patternItems = document.querySelectorAll('.pattern-item[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      patternItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeInItem 0.4s ease both';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

const filterAnim = document.createElement('style');
filterAnim.textContent = `
  @keyframes fadeInItem {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;
document.head.appendChild(filterAnim);

// ─── Veil Length Guide ────────────────────────────────────────────────────────
const veilData = {
  blusher: {
    title: 'Blusher Veil',
    badge: '30 – 40 cm',
    img: 'images/veil_blusher.png',
    description: 'The blusher veil is a short, face-covering layer. Traditionally worn over the face during the ceremony and lifted by the partner at the altar. Perfect for a romantic, classic wedding feel.',
    features: ['Perfect for intimate ceremonies', 'Adds romantic drama', 'Works with all dress lengths', 'Ideal for first look moments'],
    pairs: ['A-Line', 'Ball Gown', 'Mermaid']
  },
  elbow: {
    title: 'Elbow Length Veil',
    badge: '70 – 80 cm',
    img: 'images/veyil_elbow_1.jpg',
    description: 'Falling just at the elbow, this mid-length veil offers versatility and grace. It complements both formal and semi-formal weddings without overpowering your gown.',
    features: ['Versatile for any venue', 'Easy to move in', 'Beautiful in motion', 'Great for outdoor weddings'],
    pairs: ['Sheath', 'Tea-Length', 'A-Line']
  },
  fingertip: {
    title: 'Fingertip Length Veil',
    badge: '95 – 105 cm',
    img: 'images/veil_fingertip.png',
    description: 'One of the most popular lengths, reaching exactly to the fingertips when arms are at rest. Provides a classic bridal look that works beautifully in photographs.',
    features: ['Most popular bridal choice', 'Photogenic at any angle', 'Flatters most silhouettes', 'Perfect for dancing'],
    pairs: ['Ball Gown', 'A-Line', 'Trumpet']
  },
  chapel: {
    title: 'Chapel Length Veil',
    badge: '180 – 220 cm',
    img: 'images/veil_chapel.png',
    description: 'Extending 1–2 feet beyond the gown, the chapel veil creates stunning visual impact. Ideal for formal church ceremonies and grand ballroom venues.',
    features: ['Dramatic ceremony entrance', 'Stunning in formal venues', 'Heirloom quality trailing', 'Pairs with royal trains'],
    pairs: ['Ball Gown', 'Sheath', 'A-Line']
  },
  cathedral: {
    title: 'Cathedral Length Veil',
    badge: '270 – 320 cm',
    img: 'images/veil_cathedral.png',
    description: 'The most grand of all veil lengths, the cathedral veil sweeps 8–10 feet behind the bride. Reserved for the most formal ceremonies, it commands every entrance.',
    features: ['Ultimate bridal grandeur', 'Iconic runway presence', 'Formal venues only', 'Professional handling advised'],
    pairs: ['Full Ball Gown', 'Royal Train', 'Duchess Satin']
  }
};

function initVeilGuide() {
  const tabs = document.querySelectorAll('.veil-tab');
  const compRows = document.querySelectorAll('.comp-row');
  if (!tabs.length) return;

  function updateVeil(veilKey) {
    const data = veilData[veilKey];
    if (!data) return;

    // Update visual card
    const veilImg = document.getElementById('veilImg');
    if (veilImg) {
      veilImg.style.opacity = '0';
      setTimeout(() => {
        veilImg.src = data.img;
        veilImg.alt = data.title;
        veilImg.style.opacity = '1';
        veilImg.style.transition = 'opacity 0.4s ease';
      }, 200);
    }

    // Update info card
    document.getElementById('veilTitle').textContent = data.title;
    document.getElementById('veilLengthBadge').textContent = data.badge;
    document.getElementById('veilDescription').textContent = data.description;

    const featuresList = document.getElementById('veilFeaturesList');
    featuresList.innerHTML = data.features.map(f =>
      `<li><i class="bi bi-check-circle-fill"></i> ${f}</li>`
    ).join('');

    // Update dress tags
    const dressTagsContainer = document.querySelector('.dress-tags');
    if (dressTagsContainer) {
      dressTagsContainer.innerHTML = data.pairs.map(p =>
        `<span class="dress-tag">${p}</span>`
      ).join('');
    }

    // Update comparison rows
    compRows.forEach(row => {
      row.classList.toggle('active', row.dataset.veil === veilKey);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateVeil(tab.dataset.veil);
    });
  });

  compRows.forEach(row => {
    row.addEventListener('click', () => {
      const veilKey = row.dataset.veil;
      tabs.forEach(t => t.classList.toggle('active', t.dataset.veil === veilKey));
      updateVeil(veilKey);
    });
  });
}

// ─── Gallery Filter ───────────────────────────────────────────────────────────
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-gfilter]');
  const galleryItems = document.querySelectorAll('.gallery-item[data-gcat]');
  const galleryGrid = document.getElementById('galleryGrid');
  if (!filterBtns.length) return;

  function normalizeFilter(value) {
    return (value || '').trim().toLowerCase();
  }

  function refreshGalleryLayout() {
    if (window.AOS && typeof window.AOS.refreshHard === 'function') {
      window.AOS.refreshHard();
    } else if (window.AOS && typeof window.AOS.refresh === 'function') {
      window.AOS.refresh();
    }
  }

  function updateVisibleCount() {
    if (!galleryGrid) return;
    const visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    galleryGrid.dataset.visibleCount = String(visibleItems.length);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = normalizeFilter(btn.dataset.gfilter);
      galleryItems.forEach(item => {
        const show = filter === 'all' || normalizeFilter(item.dataset.gcat) === filter;
        item.classList.toggle('hidden', !show);
        item.setAttribute('aria-hidden', String(!show));

        if (show) {
          item.style.animation = 'none';
          item.offsetHeight;
          item.style.animation = 'fadeInItem 0.35s ease both';
        } else {
          item.style.animation = '';
        }
      });

      updateVisibleCount();
      refreshGalleryLayout();
    });
  });

  updateVisibleCount();
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function initLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay) return;
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  const expandBtns = document.querySelectorAll('.btn-gallery-expand');
  let currentIndex = 0;
  let images = [];

  function collectImages() {
    images = [];
    document.querySelectorAll('.gallery-item:not(.hidden) .gallery-card img').forEach(img => {
      images.push(img.src);
    });
  }

  function openLightbox(index) {
    collectImages();
    currentIndex = Math.max(0, Math.min(index, images.length - 1));
    lightboxImg.src = images[currentIndex];
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = images[currentIndex];
      lightboxImg.style.opacity = '1';
    }, 180);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = images[currentIndex];
      lightboxImg.style.opacity = '1';
    }, 180);
  }

  expandBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const visibleButtons = Array.from(document.querySelectorAll('.gallery-item:not(.hidden) .btn-gallery-expand'));
      openLightbox(Math.max(0, visibleButtons.indexOf(btn)));
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Transition style for lightbox image
  lightboxImg.style.transition = 'opacity 0.2s ease';
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('consultationForm');
  const btnText = document.getElementById('btnText');
  const btnLoading = document.getElementById('btnLoading');
  const formSuccess = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#e57373';
        valid = false;
        input.addEventListener('input', () => {
          input.style.borderColor = '';
        }, { once: true });
      }
    });

    if (!valid) return;

    // Show loading
    btnText.classList.add('d-none');
    btnLoading.classList.remove('d-none');

    // Simulate API call
    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.classList.remove('d-none');
      formSuccess.style.animation = 'fadeInItem 0.5s ease both';
    }, 1800);
  });
}

// ─── Back To Top ──────────────────────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Smooth Scroll for Nav Links ──────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile nav if open
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

// Keep the responsive drawer from allowing background scroll.
function initResponsiveMenuState() {
  const navMenu = document.getElementById('navMenu');
  if (!navMenu) return;

  forceCloseResponsiveMenu();

  navMenu.addEventListener('shown.bs.collapse', () => {
    document.body.classList.add('menu-open');
  });

  navMenu.addEventListener('hide.bs.collapse', () => {
    document.body.classList.remove('menu-open');
  });

  navMenu.addEventListener('hidden.bs.collapse', () => {
    document.body.classList.remove('menu-open');
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(forceCloseResponsiveMenu, 120);
  }, { passive: true });
}

function forceCloseResponsiveMenu() {
  const navMenu = document.getElementById('navMenu');
  if (!navMenu) return;

  document.body.classList.add('menu-direction-switching');

  const collapse = window.bootstrap && bootstrap.Collapse.getInstance(navMenu);
  if (collapse) collapse.dispose();

  navMenu.classList.remove('show', 'collapsing');
  navMenu.style.height = '';
  navMenu.style.visibility = '';

  const toggler = document.querySelector('[data-bs-target="#navMenu"]');
  if (toggler) {
    toggler.classList.add('collapsed');
    toggler.setAttribute('aria-expanded', 'false');
  }

  navMenu.querySelectorAll('.dropdown-menu.show, .dropdown-toggle.show').forEach(el => {
    el.classList.remove('show');
    if (el.hasAttribute('aria-expanded')) el.setAttribute('aria-expanded', 'false');
  });

  document.body.classList.remove('menu-open');

  requestAnimationFrame(() => {
    document.body.classList.remove('menu-direction-switching');
  });
}

// ─── Embroidery Card Hover Effects ────────────────────────────────────────────
function initEmbroideryCards() {
  document.querySelectorAll('.emb-option-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.emb-icon').style.background = 'rgba(201, 130, 110, 0.15)';
      card.querySelector('.emb-icon').style.color = 'var(--clr-rose)';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.emb-icon').style.background = 'rgba(200, 169, 110, 0.12)';
      card.querySelector('.emb-icon').style.color = 'var(--clr-gold)';
    });
  });
}

// ─── Parallax Lace Background ─────────────────────────────────────────────────
function initParallaxHero() {
  const overlay = document.getElementById('heroLace');
  if (!overlay) return;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      overlay.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
}

// ─── Number Counting for Stats ────────────────────────────────────────────────
function initScrollReveal() {
  const heroStats = document.querySelector('.hero-stats');
  if (!heroStats) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(heroStats);
}

// ─── Gallery Grid Hover Cursor Effect ────────────────────────────────────────
function initCursorEffect() {
  const cards = document.querySelectorAll('.gallery-card, .pattern-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
  });
}

// ─── Timeline Card Hover ──────────────────────────────────────────────────────
function initTimelineHover() {
  document.querySelectorAll('.timeline-card').forEach((card, idx) => {
    card.style.transitionDelay = `${idx * 0.05}s`;
  });
}

// ─── Marquee Speed Variation ─────────────────────────────────────────────────
function initMarquee() {
  const marquee = document.querySelector('.marquee-inner');
  if (!marquee) return;

  const strip = document.querySelector('.marquee-strip');
  strip.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });
  strip.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });
}

// ─── Scroll Progress Indicator (optional visual polish) ──────────────────────
function initScrollProgress() {
  document.querySelectorAll('.scroll-progress, [data-scroll-progress]').forEach(bar => bar.remove());
}

// ─── Testimonial Card Subtle Animation ───────────────────────────────────────
function initTestimonialCards() {
  const cards = document.querySelectorAll('.testimonial-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// ─── Upload Zone Interaction ──────────────────────────────────────────────────
function initUploadZone() {
  const zone = document.getElementById('uploadZone');
  const input = document.getElementById('photoUpload');
  if (!zone || !input) return;

  zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--clr-rose)'; });
  zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.style.borderColor = '';
    if (e.dataTransfer.files.length) {
      zone.querySelector('h6').textContent = `${e.dataTransfer.files.length} file(s) selected ✓`;
      zone.style.borderColor = 'var(--clr-gold)';
    }
  });
  input.addEventListener('change', () => {
    if (input.files.length) {
      zone.querySelector('h6').textContent = `${input.files.length} file(s) selected ✓`;
      zone.style.borderColor = 'var(--clr-gold)';
    }
  });
}

// ─── Global Newsletter handler ───────────────────────────────────────────────
function handleNewsletter(inputId) {
  const input = document.getElementById(inputId);
  if (!input || !input.value.includes('@')) { if (input) input.style.borderColor = '#e57373'; return; }
  input.value = ''; input.placeholder = '✓ Subscribed!'; input.style.borderColor = 'var(--clr-gold)';
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;
  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked if wasn't open
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ─── Theme Switcher Logic ─────────────────────────────────────────────────────
function initThemeSwitcher() {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  const icon = btn.querySelector('i');
  
  const updateIcon = (theme) => {
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
    }
  };

  // Restore state on load
  const savedTheme = localStorage.getItem('theme') || 'light';
  updateIcon(savedTheme);

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateIcon(theme);
  });
}

// ─── LTR/RTL Layout Toggler ──────────────────────────────────────────────────
function initDirectionSwitcher() {
  const btn = document.getElementById('dirToggleBtn');
  if (!btn) return;
  
  btn.addEventListener('click', () => {
    forceCloseResponsiveMenu();
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('dir', newDir);
  });
}

function initFooterBrandHomeLinks() {
  document.querySelectorAll('.footer-brand').forEach(brand => {
    brand.setAttribute('role', 'link');
    brand.setAttribute('tabindex', '0');
    brand.setAttribute('aria-label', 'Go to Lace Luxe Bridal home');

    const goHome = () => {
      window.location.href = 'index.html';
    };

    brand.addEventListener('click', goHome);
    brand.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        goHome();
      }
    });
  });
}

// Restore theme & direction immediately on script load to prevent visual flashes
(function restoreThemeAndDirection() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-theme'); // Apply to html for safety
    if (document.body) {
      document.body.classList.add('dark-theme');
    } else {
      const observer = new MutationObserver((mutations, obs) => {
        if (document.body) {
          document.body.classList.add('dark-theme');
          obs.disconnect();
        }
      });
      observer.observe(document.documentElement, { childList: true });
    }
  }
  const savedDir = localStorage.getItem('dir');
  if (savedDir) {
    document.documentElement.setAttribute('dir', savedDir);
  }
})();

// ─── Master Init ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createHeroParticles();
  initCounters();
  initScrollReveal();
  initPatternFilter();
  initVeilGuide();
  initGalleryFilter();
  initLightbox();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
  initResponsiveMenuState();
  initEmbroideryCards();
  initParallaxHero();
  initCursorEffect();
  initTimelineHover();
  initMarquee();
  initScrollProgress();
  initTestimonialCards();
  initUploadZone();
  initFaqAccordion();
  initThemeSwitcher();
  initDirectionSwitcher();
  initFooterBrandHomeLinks();
});
