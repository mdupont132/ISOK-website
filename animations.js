// ═══════════════════════════════════════════════════
//  ISOK — SHARED ANIMATIONS
// ═══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL EFFECT ──────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ── ACTIVE NAV LINK ───────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── SCROLL REVEAL ─────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  // ── COUNTER ANIMATION ─────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  // ── TYPEWRITER EFFECT ─────────────────────────────
  function typeWriter(el) {
    const text = el.dataset.type;
    if (!text) return;
    let i = 0;
    el.textContent = '';
    el.style.borderRight = '2px solid var(--gold)';
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => { el.style.borderRight = 'none'; }, 1000);
      }
    }, 50);
  }

  const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.typed) {
        entry.target.dataset.typed = 'true';
        setTimeout(() => typeWriter(entry.target), 300);
        typeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  document.querySelectorAll('[data-type]').forEach(el => typeObserver.observe(el));

  // ── PARALLAX HERO (subtle, no zoom) ───────────────
  const parallaxEl = document.querySelector('.parallax-bg');
  if (parallaxEl) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY * 0.12;
      parallaxEl.style.backgroundPositionY = `calc(30% + ${offset}px)`;
    }, { passive: true });
  }

  // ── GRAIN OVERLAY ANIMATION ───────────────────────
  const grainCanvas = document.getElementById('grain');
  if (grainCanvas) {
    const ctx = grainCanvas.getContext('2d');
    let frame = 0;
    function resize() {
      grainCanvas.width = window.innerWidth;
      grainCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    function drawGrain() {
      const imageData = ctx.createImageData(grainCanvas.width, grainCanvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 20;
        data[i] = data[i+1] = data[i+2] = v;
        data[i+3] = 15;
      }
      ctx.putImageData(imageData, 0, 0);
      frame++;
      if (frame % 3 === 0) requestAnimationFrame(drawGrain);
      else requestAnimationFrame(drawGrain);
    }
    drawGrain();
  }

  // ── PAGE TRANSITION ───────────────────────────────
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity .3s';
        setTimeout(() => { window.location.href = href; }, 300);
      });
    }
  });
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .4s';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  });

  // ── CONTACT FORM ──────────────────────────────────
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      submitBtn.textContent = '✓ Inquiry Sent';
      submitBtn.style.background = '#2a6a2a';
      setTimeout(() => { submitBtn.textContent = 'Submit Inquiry'; submitBtn.style.background = ''; }, 3500);
    });
  }

});
