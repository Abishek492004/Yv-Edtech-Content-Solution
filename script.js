/* =========================================================
   Yv EdTech — Animations, Mobile Nav & Interactions
   Content is NOT changed. Only behaviour/animations added.
   ========================================================= */

(() => {
  'use strict';

  /* -----------------------------------------------
     Helpers
  ----------------------------------------------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;
  const reduceMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    buildMobileNav();
    setActiveNavLink();
    handleNavbarScroll();
    handleSmoothAnchors();
    revealOnScroll();
    staggerServiceCards();
    animateCounters();
    parallaxDecorShapes();
    tiltCards();
    rippleButtons();
    enhanceForm();
    initLogoSlider();
    initHeroTyping();
    handleBackToTop();
    initYear();
  }

  /* -----------------------------------------------
     1) MOBILE NAVIGATION (hamburger built in JS)
  ----------------------------------------------- */
  function buildMobileNav() {
    const navbar = $('.navbar');
    if (!navbar) return;

    // Find the existing nav-links list
    const navLinks = $('.nav-links', navbar);
    if (!navLinks) return;

    // Build hamburger button (purely injected — content unchanged)
    const burger = document.createElement('button');
    burger.className = 'hamburger';
    burger.setAttribute('aria-label', 'Toggle navigation menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = `
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    `;

    // Insert before navLinks if not already there
    if (!$('.hamburger', navbar)) {
      navbar.appendChild(burger);
    }

    navLinks.classList.add('yv-menu');

    // Inject minimal CSS for the mobile menu / hamburger
    injectStyle(`
      .hamburger{
        display:none; position:relative; width:40px; height:36px;
        background:transparent; border:0; cursor:pointer; z-index:1100;
        padding:0; margin-left:auto;
      }
      .hamburger .bar{
        position:absolute; left:6px; right:6px; height:3px;
        background:#fff; border-radius:3px;
        transition:transform .35s ease, opacity .25s ease, top .35s ease;
      }
      .hamburger .bar:nth-child(1){ top:9px; }
      .hamburger .bar:nth-child(2){ top:16px; }
      .hamburger .bar:nth-child(3){ top:23px; }
      .hamburger.is-open .bar:nth-child(1){ top:16px; transform:rotate(45deg); }
      .hamburger.is-open .bar:nth-child(2){ opacity:0; }
      .hamburger.is-open .bar:nth-child(3){ top:16px; transform:rotate(-45deg); }

      .yv-menu{ transition: transform .35s ease, opacity .25s ease; }

      @media (max-width: 900px){
        .hamburger{ display:block; }
        .navbar{ flex-wrap:wrap; }
        .yv-menu{
          position:fixed; top:0; right:0; height:100vh; width:78%; max-width:320px;
          background:linear-gradient(180deg, #005f7a, #0099cc);
          flex-direction:column; gap:0 !important; padding:90px 24px 24px;
          margin:0; box-shadow:-10px 0 30px rgba(0,0,0,.25);
          transform:translateX(105%); opacity:0; pointer-events:none;
          overflow-y:auto; z-index:1050;
        }
        .yv-menu.is-open{ transform:translateX(0); opacity:1; pointer-events:auto; }
        .yv-menu li{ width:100%; border-bottom:1px solid rgba(255,255,255,.12); }
        .yv-menu a{
          display:block; padding:14px 4px; font-size:1.05rem; color:#fff !important;
        }
        .yv-menu a:hover{ color:#ffd9b3 !important; }

        body.yv-no-scroll{ overflow:hidden; }

        /* slide-in link animation */
        .yv-menu li{ opacity:0; transform:translateX(30px);
          transition:opacity .35s ease, transform .35s ease; }
        .yv-menu.is-open li{ opacity:1; transform:translateX(0); }
        .yv-menu.is-open li:nth-child(1){ transition-delay:.05s; }
        .yv-menu.is-open li:nth-child(2){ transition-delay:.10s; }
        .yv-menu.is-open li:nth-child(3){ transition-delay:.15s; }
        .yv-menu.is-open li:nth-child(4){ transition-delay:.20s; }
        .yv-menu.is-open li:nth-child(5){ transition-delay:.25s; }
        .yv-menu.is-open li:nth-child(6){ transition-delay:.30s; }
      }

      @media (max-width: 600px){
        .navbar{ padding:.9rem 1rem !important; }
        .logo-text{ font-size:1rem !important; }
      }
    `);

    const toggleMenu = (open) => {
      const willOpen = open ?? !navLinks.classList.contains('is-open');
      navLinks.classList.toggle('is-open', willOpen);
      burger.classList.toggle('is-open', willOpen);
      burger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      document.body.classList.toggle('yv-no-scroll', willOpen);
    };

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when a link is clicked
    $$('a', navLinks).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

    // Close on outside click / Escape
    document.addEventListener('click', (e) => {
      if (!navLinks.classList.contains('is-open')) return;
      if (!navLinks.contains(e.target) && !burger.contains(e.target)) toggleMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleMenu(false);
    });

    // Close when window resized to desktop
    window.addEventListener('resize', () => {
      if (!isMobile() && navLinks.classList.contains('is-open')) toggleMenu(false);
    });
  }

  /* -----------------------------------------------
     2) ACTIVE NAV LINK
  ----------------------------------------------- */
  function setActiveNavLink() {
    const here = location.pathname.split('/').pop() || 'index.html';
    $$('.nav-links a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === here) a.classList.add('is-active');
    });
    injectStyle(`
      .nav-links a.is-active{ color:#ffd9b3 !important; }
      .nav-links a.is-active::after{ width:100%; }
    `);
  }

  /* -----------------------------------------------
     3) NAVBAR SHADOW ON SCROLL
  ----------------------------------------------- */
  function handleNavbarScroll() {
    const nav = $('.navbar');
    if (!nav) return;
    injectStyle(`
      .navbar{ transition: box-shadow .3s ease, background .3s ease, padding .3s ease; }
      .navbar.is-scrolled{ box-shadow:0 6px 22px rgba(0,0,0,.18); padding:.7rem 1.4rem !important; }
    `);
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -----------------------------------------------
     4) SMOOTH ANCHOR SCROLL
  ----------------------------------------------- */
  function handleSmoothAnchors() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: reduceMotion() ? 'auto' : 'smooth' });
      });
    });
  }

  /* -----------------------------------------------
     5) REVEAL ON SCROLL
  ----------------------------------------------- */
  function revealOnScroll() {
    const targets = [
      '.hero-content', '.hero h1', '.hero h2', '.hero p',
      '.services-section1', '.card',
      '.clients h2', '.logo-slider',
      '.content1 > *', '.container1 > *',
      '.about h2', '.about p', '.about li',
      '.animate2', '.services-container .service-card',
      '.contact-container', '.info-box',
      'h2', 'footer h3',
      '.service-card-last', '.services-note', '.services-interested',
    ];
    const nodes = $$(targets.join(','));
    if (!nodes.length) return;

    injectStyle(`
      .yv-reveal:not(.is-visible){
        opacity:0; transform: translateY(28px);
        transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1);
      }
      .yv-reveal.is-visible{ opacity:1; transform:translateY(0); }
      @media (prefers-reduced-motion: reduce){
        .yv-reveal:not(.is-visible){ opacity:1; transform:none; }
      }
    `);

    // Only hide elements that are below (or near) the fold on initial load —
    // anything already visible should appear immediately so the page isn't blank.
    const fold = window.innerHeight * 1.1;
    const toObserve = [];
    nodes.forEach(n => {
      const r = n.getBoundingClientRect();
      if (r.top < fold && r.bottom > 0) {
        n.classList.add('yv-reveal', 'is-visible');     // skip the animation
      } else {
        n.classList.add('yv-reveal');
        toObserve.push(n);
      }
    });

    if (!toObserve.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    toObserve.forEach(n => io.observe(n));
  }

  /* -----------------------------------------------
     5b) SERVICE CARD STAGGER REVEAL
  ----------------------------------------------- */
  function staggerServiceCards() {
    const cards = $$('.service-card');
    if (!cards.length) return;

    injectStyle(`
      .service-card {
        transition: opacity 0.6s ease, transform 0.6s cubic-bezier(.25,.8,.25,1), box-shadow 0.4s ease, border-color 0.4s ease;
      }
      .service-card:nth-child(1) { transition-delay: 0s; }
      .service-card:nth-child(2) { transition-delay: 0.08s; }
      .service-card:nth-child(3) { transition-delay: 0.16s; }
      .service-card:nth-child(4) { transition-delay: 0.24s; }
      .service-card:nth-child(5) { transition-delay: 0.32s; }
      .service-card:nth-child(6) { transition-delay: 0.40s; }
      .service-card:nth-child(7) { transition-delay: 0.48s; }
      .service-card:nth-child(8) { transition-delay: 0.56s; }
      .service-card:nth-child(9) { transition-delay: 0.64s; }
      .service-card:nth-child(10) { transition-delay: 0.72s; }
    `);

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    cards.forEach(c => io.observe(c));
  }

  /* -----------------------------------------------
     6) ANIMATED COUNTERS
  ----------------------------------------------- */
  function animateCounters() {
    const candidates = $$('h1, h2, h3, p, .focus b, .services-section1 p');
    const counters = candidates.filter(el => /(\d{2,})\s*\+?/.test(el.textContent || ''));
    if (!counters.length) return;

    counters.forEach(el => {
      const m = el.textContent.match(/(\d{2,})\s*\+?/);
      if (!m) return;
      const target = parseInt(m[1], 10);
      const original = el.textContent;
      // Only animate "count" looking numbers in body text
      if (!/\b\d{2,}\b/.test(original)) return;

      let current = 0;
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - p, 3);
        current = Math.floor(target * ease);
        el.textContent = original.replace(/\d{2,}\+?/, current + (original.includes('+') ? '+' : ''));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = original;
      };

      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            if (!reduceMotion()) requestAnimationFrame(step);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  /* -----------------------------------------------
     7) PARALLAX FOR DECORATIVE SHAPES
  ----------------------------------------------- */
  function parallaxDecorShapes() {
    const shapes = $$('.decor-circle, .decor-square, .decor-diamond, .decor-ring');
    if (!shapes.length) return;
    if (reduceMotion()) return;
    const onScroll = () => {
      const y = window.scrollY;
      shapes.forEach((s, i) => {
        const speed = 0.05 + (i % 4) * 0.04;
        s.style.translate = `0 ${(y * speed).toFixed(1)}px`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -----------------------------------------------
     8) TILT EFFECT ON CARDS
  ----------------------------------------------- */
  function tiltCards() {
    const cards = $$('.card, .service-card, .info-box');
    if (!cards.length) return;
    if (reduceMotion()) return;
    // Skip on touch devices — mousemove never fires
    if (window.matchMedia('(hover: none)').matches) return;
    injectStyle(`
      .card, .service-card, .info-box{ will-change: transform; transform-style: preserve-3d; }
    `);
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* -----------------------------------------------
     9) RIPPLE EFFECT ON BUTTONS
  ----------------------------------------------- */
  function rippleButtons() {
    const btns = $$('button, .apply-btn, .contact-form button');
    if (!btns.length) return;
    injectStyle(`
      button, .apply-btn, .contact-form button{ position:relative; overflow:hidden; }
      .yv-ripple{
        position:absolute; border-radius:50%; pointer-events:none;
        background: rgba(255,255,255,.45);
        transform: scale(0); opacity:1;
        animation: yv-ripple .65s ease-out forwards;
      }
      @keyframes yv-ripple{
        to{ transform: scale(4); opacity:0; }
      }
    `);
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const r = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'yv-ripple';
        const size = Math.max(r.width, r.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - r.left - size / 2) + 'px';
        ripple.style.top  = (e.clientY - r.top  - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });
    });
  }

  /* -----------------------------------------------
     10) FORM ENHANCEMENTS
  ----------------------------------------------- */
  function enhanceForm() {
    const form = $('.contact-form') || $('#contact-form');
    if (!form) return;
    injectStyle(`
      .contact-form input, .contact-form select, .contact-form textarea{
        transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease;
      }
      .contact-form input:focus, .contact-form select:focus, .contact-form textarea:focus{
        border-color:#ff6f00 !important;
        box-shadow:0 0 0 3px rgba(255,111,0,.18);
        transform: translateY(-1px);
        outline:none;
      }
      .contact-form button{
        transition: transform .2s ease, box-shadow .2s ease, background .25s ease;
      }
      .contact-form button:hover{ transform: translateY(-2px); box-shadow:0 8px 20px rgba(229,57,53,.35); }
      .yv-success{
        margin-top:10px; padding:10px 12px; border-radius:8px;
        background:#e8f7ee; color:#1b7a3a; font-weight:600;
        animation: yv-pop .4s ease both;
      }
      @keyframes yv-pop{ from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:translateY(0);} }
    `);

    if (!form.id) form.id = 'contact-form';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const old = $('.yv-success', form);
      if (old) old.remove();
      const ok = document.createElement('div');
      ok.className = 'yv-success';
      ok.textContent = '✓ Thanks! Your message has been received.';
      form.appendChild(ok);
      form.reset();
      setTimeout(() => ok.remove(), 4500);
    });
  }

  /* -----------------------------------------------
     11) LOGO SLIDER (pause on hover, ensure seamless)
  ----------------------------------------------- */
  function initLogoSlider() {
    const track = $('.logo-track');
    if (!track) return;
    const slider = $('.logo-slider');
    slider?.addEventListener('mouseenter', () => (track.style.animationPlayState = 'paused'));
    slider?.addEventListener('mouseleave', () => (track.style.animationPlayState = 'running'));

    // Restart the animation once all images are decoded so the browser
    // re-measures the track at its true width (avoids the "skip" you see
    // when the keyframe -50% was computed before images had dimensions).
    const imgs = Array.from(track.querySelectorAll('img'));
    if (!imgs.length) return;
    const restart = () => {
      track.style.animation = 'none';
      // force reflow
      void track.offsetWidth;
      track.style.animation = '';
    };
    if (imgs.every(img => img.complete && img.naturalWidth > 0)) {
      restart();
    } else {
      imgs.forEach(img => img.addEventListener('load', restart, { once: true }));
      imgs.forEach(img => img.addEventListener('error', restart, { once: true }));
    }
    window.addEventListener('resize', () => {
      clearTimeout(window.__yvResize);
      window.__yvResize = setTimeout(restart, 150);
    });
  }

  /* -----------------------------------------------
     12) HERO TYPING EFFECT (subtle, content unchanged)
  ----------------------------------------------- */
  function initHeroTyping() {
    const heroH1 = $('.hero-content h1');
    if (!heroH1) return;
    if (reduceMotion()) return;
    if (isMobile()) return;        // skip on phones — animation is slow & intrusive on small screens
    const text = heroH1.textContent.trim();
    heroH1.textContent = '';
    heroH1.style.borderRight = '2px solid #fff';
    let i = 0;
    const tick = () => {
      heroH1.textContent = text.slice(0, i++);
      if (i <= text.length) setTimeout(tick, 35);
      else setTimeout(() => (heroH1.style.borderRight = '0'), 900);
    };
    setTimeout(tick, 250);
  }

  /* -----------------------------------------------
     13) BACK-TO-TOP BUTTON
  ----------------------------------------------- */
  function handleBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'yv-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);

    injectStyle(`
      .yv-top{
        position:fixed; right:18px; bottom:18px; width:44px; height:44px;
        border-radius:50%; background:#ff6f00; color:#fff; font-size:20px; font-weight:700;
        border:0; cursor:pointer; box-shadow:0 8px 22px rgba(0,0,0,.22);
        opacity:0; transform: translateY(20px); pointer-events:none;
        transition: opacity .3s ease, transform .3s ease, background .2s ease;
        z-index:1090;
      }
      .yv-top.is-show{ opacity:1; transform: translateY(0); pointer-events:auto; }
      .yv-top:hover{ background:#e55a00; }
      @media (max-width: 600px){
        .yv-top{ right:12px; bottom:12px; width:40px; height:40px; font-size:18px; }
      }
    `);

    const onScroll = () => btn.classList.toggle('is-show', window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' })
    );
  }

  /* -----------------------------------------------
     14) FOOTER YEAR
  ----------------------------------------------- */
  function initYear() {
    $$('.footer-bottom p').forEach(p => {
      if (/\b20\d{2}\b/.test(p.textContent) && p.textContent.length < 80) {
        p.textContent = p.textContent.replace(/\b20\d{2}\b/, new Date().getFullYear());
      }
    });
  }

  /* -----------------------------------------------
     INJECT STYLE (helper)
  ----------------------------------------------- */
  function injectStyle(css) {
    const tag = document.createElement('style');
    tag.setAttribute('data-yv', '1');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
})();
