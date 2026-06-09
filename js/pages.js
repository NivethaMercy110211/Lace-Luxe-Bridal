/* ==========================================
   LACE LUXE BRIDAL – pages.js
   Shared JS for all inner pages
   ========================================== */

'use strict';

// ─── AOS Init ────────────────────────────────────────────────────────────────
AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, offset: 60 });

// ─── Sticky Navbar ────────────────────────────────────────────────────────────
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ─── Back To Top ──────────────────────────────────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─── Scroll Progress Bar ─────────────────────────────────────────────────────
(function initScrollProgress() {
  document.querySelectorAll('.scroll-progress, [data-scroll-progress]').forEach(bar => bar.remove());
})();

// ─── Smooth Scroll for Nav Links ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    const navCollapse = document.getElementById('navMenu');
    if (navCollapse && navCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // Open clicked if wasn't open
    if (!isOpen) item.classList.add('open');
  });
});

// ─── Pattern Filter (if present on page) ─────────────────────────────────────
(function initPatternFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const patternItems = document.querySelectorAll('.pattern-item[data-category]');
  if (!filterBtns.length) return;
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      patternItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);
        if (show) item.style.animation = 'fadeInItem 0.4s ease both';
      });
    });
  });
})();

// ─── Gallery Filter ───────────────────────────────────────────────────────────
(function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-gfilter]');
  const galleryItems = document.querySelectorAll('.gallery-item[data-gcat]');
  if (!filterBtns.length) return;
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.gfilter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.gcat === filter;
        item.classList.toggle('hidden', !show);
        if (show) item.style.animation = 'fadeInItem 0.4s ease both';
      });
    });
  });
})();

// ─── Lightbox ─────────────────────────────────────────────────────────────────
(function initLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay) return;
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  let images = [], currentIndex = 0;

  function collectImages() {
    images = [];
    document.querySelectorAll('.gallery-item:not(.hidden) .gallery-card img').forEach(img => images.push(img.src));
  }

  function open(i) { collectImages(); currentIndex = Math.max(0, Math.min(i, images.length - 1)); lightboxImg.src = images[currentIndex]; overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function close() { overlay.classList.remove('active'); document.body.style.overflow = ''; }
  function navigate(dir) { currentIndex = (currentIndex + dir + images.length) % images.length; lightboxImg.style.opacity = '0'; setTimeout(() => { lightboxImg.src = images[currentIndex]; lightboxImg.style.opacity = '1'; }, 160); }

  lightboxImg.style.transition = 'opacity 0.18s ease';
  document.querySelectorAll('.btn-gallery-expand').forEach((btn, i) => btn.addEventListener('click', e => { e.stopPropagation(); open(i); }));
  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', () => navigate(1));
  prevBtn.addEventListener('click', () => navigate(-1));
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
  });
})();

// ─── Veil Guide ───────────────────────────────────────────────────────────────
(function initVeilGuide() {
  const tabs = document.querySelectorAll('.veil-tab');
  const compRows = document.querySelectorAll('.comp-row');
  if (!tabs.length) return;

  const veilData = {
    blusher: { title: 'Blusher Veil', badge: '30 – 40 cm', img: 'images/veil_blusher.png', description: 'A short, face-covering layer. Lifted at the altar for a timeless romantic reveal.', features: ['Perfect for intimate ceremonies', 'Adds romantic drama', 'Works with all dress lengths', 'Ideal for first look moments'], pairs: ['A-Line', 'Ball Gown', 'Mermaid'] },
    elbow: { title: 'Elbow Length Veil', badge: '70 – 80 cm', img: 'images/veyil_elbow_1.jpg', description: 'Falling just at the elbow, this versatile mid-length veil complements any venue without overpowering your gown.', features: ['Versatile for any venue', 'Easy to move in', 'Beautiful in motion', 'Great for outdoor weddings'], pairs: ['Sheath', 'Tea-Length', 'A-Line'] },
    fingertip: { title: 'Fingertip Length Veil', badge: '95 – 105 cm', img: 'images/veil_fingertip.png', description: 'One of the most popular lengths, reaching exactly to fingertips at rest. Photogenic at every angle.', features: ['Most popular bridal choice', 'Photogenic at any angle', 'Flatters most silhouettes', 'Perfect for dancing'], pairs: ['Ball Gown', 'A-Line', 'Trumpet'] },
    chapel: { title: 'Chapel Length Veil', badge: '180 – 220 cm', img: 'images/veil_chapel.png', description: 'Extending 1–2 feet beyond the gown, the chapel veil creates stunning visual impact at formal venues.', features: ['Dramatic ceremony entrance', 'Stunning in formal venues', 'Heirloom quality trailing', 'Pairs with royal trains'], pairs: ['Ball Gown', 'Sheath', 'A-Line'] },
    cathedral: { title: 'Cathedral Length Veil', badge: '270 – 320 cm', img: 'images/veil_cathedral.png', description: 'The grandest of all — sweeping 8–10 feet behind the bride. Reserved for the most formal ceremonies.', features: ['Ultimate bridal grandeur', 'Iconic runway presence', 'Formal venues only', 'Professional handling advised'], pairs: ['Full Ball Gown', 'Royal Train', 'Duchess Satin'] }
  };

  function updateVeil(key) {
    const d = veilData[key]; if (!d) return;
    const veilImg = document.getElementById('veilImg');
    if (veilImg) { veilImg.style.opacity = '0'; setTimeout(() => { veilImg.src = d.img; veilImg.style.opacity = '1'; veilImg.style.transition = 'opacity 0.3s ease'; }, 180); }
    const titleEl = document.getElementById('veilTitle'); if (titleEl) titleEl.textContent = d.title;
    const badgeEl = document.getElementById('veilLengthBadge'); if (badgeEl) badgeEl.textContent = d.badge;
    const descEl = document.getElementById('veilDescription'); if (descEl) descEl.textContent = d.description;
    const featuresList = document.getElementById('veilFeaturesList');
    if (featuresList) featuresList.innerHTML = d.features.map(f => `<li><i class="bi bi-check-circle-fill"></i> ${f}</li>`).join('');
    const dressTags = document.querySelector('.dress-tags');
    if (dressTags) dressTags.innerHTML = d.pairs.map(p => `<span class="dress-tag">${p}</span>`).join('');
    compRows.forEach(r => r.classList.toggle('active', r.dataset.veil === key));
  }

  tabs.forEach(tab => tab.addEventListener('click', () => { tabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); updateVeil(tab.dataset.veil); }));
  compRows.forEach(row => row.addEventListener('click', () => { const k = row.dataset.veil; tabs.forEach(t => t.classList.toggle('active', t.dataset.veil === k)); updateVeil(k); }));
})();

// ─── Contact Form ─────────────────────────────────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('consultationForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(el => {
      if (!el.value.trim()) { el.style.borderColor = '#e57373'; valid = false; el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true }); }
    });
    if (!valid) return;
    document.getElementById('btnText')?.classList.add('d-none');
    document.getElementById('btnLoading')?.classList.remove('d-none');
    setTimeout(() => {
      form.style.display = 'none';
      const s = document.getElementById('formSuccess'); if (s) { s.classList.remove('d-none'); s.style.animation = 'fadeInItem 0.5s ease both'; }
    }, 1800);
  });
})();

// ─── Counter Animation (stat-strip on About page) ────────────────────────────
(function initStripCounters() {
  const stripItems = document.querySelectorAll('.stat-strip-item [data-target]');
  if (!stripItems.length) return;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      stripItems.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let start = 0;
        const inc = target / (1600 / 16);
        const timer = setInterval(() => {
          start += inc; if (start >= target) { start = target; clearInterval(timer); }
          el.textContent = Math.floor(start).toLocaleString();
        }, 16);
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(stripItems[0]);
})();

// ─── Marquee Pause on Hover ────────────────────────────────────────────────────
(function initMarquee() {
  const strip = document.querySelector('.marquee-strip');
  const inner = document.querySelector('.marquee-inner');
  if (!strip || !inner) return;
  strip.addEventListener('mouseenter', () => inner.style.animationPlayState = 'paused');
  strip.addEventListener('mouseleave', () => inner.style.animationPlayState = 'running');
})();

// ─── Newsletter helper ────────────────────────────────────────────────────────
function handleNewsletter(inputId) {
  const input = document.getElementById(inputId);
  if (!input || !input.value.includes('@')) { if (input) input.style.borderColor = '#e57373'; return; }
  input.value = ''; input.placeholder = '✓ Subscribed!'; input.style.borderColor = 'var(--clr-gold)';
}

// ─── Inject animation keyframe ────────────────────────────────────────────────
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes fadeInItem {
    from { opacity: 0; transform: scale(0.96) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  .active-nav::after { left: 12px !important; right: 12px !important; }
`;
document.head.appendChild(styleTag);

// ─── Upload Zone Interaction ──────────────────────────────────────────────────
(function initUploadZone() {
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
})();
