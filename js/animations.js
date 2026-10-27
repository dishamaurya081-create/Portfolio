/**
 * Disha Maurya Portfolio — Animation Engine
 * Scroll reveals | Hero stagger | Count-ups | Canvas nodes
 * | Timeline | Cursor glow | Page transitions | Loading screen
 */

(function () {
  'use strict';

  // Mark JS enabled immediately so CSS knows JS is running
  document.documentElement.classList.add('js');

  /* ========================================================================
     FEATURE FLAGS
     ======================================================================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/Portfolio/') || window.location.pathname === '';

  if (isTouchDevice) document.body.classList.add('touch-device');

  /* ========================================================================
     1. FAST DIRECT PAGE READY
     ======================================================================== */
  function initLoadingScreen() {
    // Reveal content immediately — no blocking delay
    document.body.classList.add('page-ready');
  }

  /* ========================================================================
     2. PAGE TRANSITIONS (Subtle fade between HTML pages)
     Preserves browser back/forward and direct loading
     ======================================================================== */
  function initPageTransitions() {
    if (prefersReducedMotion) return;

    // Restore page opacity on browser back/forward (bfcache)
    window.addEventListener('pageshow', () => {
      document.body.classList.remove('page-exit');
      document.body.classList.add('page-ready');
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      // Only handle same-origin HTML links; ignore anchors, mailto, tel, pdfs, and downloads
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        href.endsWith('.pdf') ||
        link.target === '_blank' ||
        link.hasAttribute('download') ||
        e.ctrlKey || e.metaKey || e.shiftKey
      ) return;

      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(() => { window.location.href = href; }, 180);
    });
  }

  /* ========================================================================
     2B. HERO ROLE SUBTLE TYPING / REVEAL EFFECT
     Applies only to the existing role tagline, prevents layout shifts,
     and ensures the full text remains accessible to assistive technology.
     ======================================================================== */
  function initHeroRoleTyping() {
    if (!isHomePage) return;

    const roleEl = document.querySelector('.hero-role');
    if (!roleEl) return;

    const fullText = (roleEl.getAttribute('data-role-text') || roleEl.textContent || 'Computer Science & Engineering Student').trim();
    // Semantic accessibility label
    roleEl.setAttribute('aria-label', fullText);

    if (prefersReducedMotion) {
      roleEl.textContent = fullText;
      return;
    }

    // Lock rendered height so layout never shifts during typing
    const rect = roleEl.getBoundingClientRect();
    if (rect.height > 0) {
      roleEl.style.minHeight = `${rect.height}px`;
    }

    const textSpan = document.createElement('span');
    textSpan.className = 'typewriter-text';
    textSpan.setAttribute('aria-hidden', 'true');

    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typewriter-cursor';
    cursorSpan.setAttribute('aria-hidden', 'true');
    cursorSpan.textContent = '❘';

    roleEl.innerHTML = '';
    roleEl.appendChild(textSpan);
    roleEl.appendChild(cursorSpan);

    let charIndex = 0;
    const charDelay = 38; // ms per char
    const startDelay = 350; // trigger along with hero entrance

    setTimeout(() => {
      function typeNextChar() {
        if (charIndex < fullText.length) {
          textSpan.textContent += fullText.charAt(charIndex);
          charIndex++;
          setTimeout(typeNextChar, charDelay);
        } else {
          // Finished typing: cursor blinks and fades away gracefully
          setTimeout(() => {
            cursorSpan.classList.add('fade-out');
            setTimeout(() => {
              if (cursorSpan.parentNode) cursorSpan.remove();
            }, 450);
          }, 1200);
        }
      }
      typeNextChar();
    }, startDelay);
  }

  /* ========================================================================
     3. PAGE HEADER QUICK REVEAL
     ======================================================================== */
  function initPageHeader() {
    const header = document.querySelector('.page-header');
    if (!header) return;
    // Trigger immediately on inner pages
    requestAnimationFrame(() => {
      setTimeout(() => header.classList.add('header-visible'), 80);
    });
  }

  /* ========================================================================
     4. HERO STAGGER ANIMATION & MASKED TITLE
     ======================================================================== */
  function initHeroAnimation() {
    if (!isHomePage) return;

    const heroTargets = [
      '.hero-status-pill',
      '.hero-title',
      '.hero-role',
      '.hero-desc',
      '.hero-cta-group',
      '.social-links',
      '.stats-grid'
    ];

    heroTargets.forEach((selector, i) => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.classList.add('hero-animate', `hero-anim-${i}`);
    });

    // Animate right column (hero visual) with progressive assembly
    const heroVisual = document.querySelector('.hero-visual');
    const workspaceCard = document.querySelector('.cse-workspace-card');
    if (heroVisual) {
      heroVisual.classList.add('hero-animate', 'hero-anim-2');
    }

    // Trigger hero reveal
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelectorAll('.hero-animate').forEach(el => {
          el.classList.add('hero-visible');
        });
        if (workspaceCard) {
          setTimeout(() => {
            workspaceCard.classList.add('assembled');
          }, prefersReducedMotion ? 0 : 200);
        }
      }, prefersReducedMotion ? 0 : 100);
    });
  }

  /* ========================================================================
     5. HERO WORKSPACE ENTRANCE (Software Engineering Architecture)
     ======================================================================== */
  function initHeroWorkspaceEntrance() {
    if (!isHomePage) return;
    const workspaceVisual = document.querySelector('.hero-visual');
    if (workspaceVisual) {
      workspaceVisual.classList.add('hero-animate', 'hero-anim-2');
    }
  }

  /* ========================================================================
     6. AMBIENT BACKGROUND ORBS + GRID
     ======================================================================== */
  function initAmbientBackground() {
    if (prefersReducedMotion) return;

    const canvas = document.createElement('div');
    canvas.className = 'bg-canvas';
    canvas.innerHTML = `
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="bg-orb bg-orb-3"></div>
    `;
    document.body.prepend(canvas);

    const grid = document.createElement('div');
    grid.className = 'bg-grid';
    document.body.prepend(grid);
  }

  /* ========================================================================
     7. SCROLL REVEAL — IntersectionObserver
     ======================================================================== */
  function initScrollReveal() {
    if (prefersReducedMotion) {
      // Make everything visible immediately
      document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .section-heading-reveal, .focus-domain-card, .stat-card, .journey-milestone').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const revealSelectors = [
      '.card',
      '.project-card',
      '.stat-card',
      '.section-heading-reveal',
      '.filter-bar',
    ];

    // Auto-add reveal class to common elements not already marked
    document.querySelectorAll(revealSelectors.join(', ')).forEach((el, i) => {
      if (!el.classList.contains('reveal') &&
          !el.classList.contains('reveal-scale') &&
          !el.classList.contains('reveal-left') &&
          !el.classList.contains('reveal-right')) {
        el.classList.add('reveal');

        // Add stagger if inside a grid
        const parent = el.parentElement;
        const siblings = parent ? [...parent.children].filter(c => c.classList.contains('reveal')) : [];
        const idx = siblings.indexOf(el);
        if (idx >= 0 && idx <= 5) el.classList.add(`stagger-${idx + 1}`);
      }
    });

    // Featured project cards — scale reveal
    document.querySelectorAll('.featured-project-card').forEach(el => {
      if (!el.classList.contains('reveal-scale')) {
        el.classList.add('reveal-scale');
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    // Observe all standard reveal elements
    document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .section-heading-reveal').forEach(el => {
      observer.observe(el);
    });

    // Also observe focus-domain-cards for icon pop + bar animations
    document.querySelectorAll('.focus-domain-card').forEach(el => {
      observer.observe(el);
    });

    // Also observe stat-cards for number pop animation
    document.querySelectorAll('.stat-card').forEach(el => {
      observer.observe(el);
    });
  }

  /* ========================================================================
     8. DYNAMIC TIMELINE SCROLL REVEAL (Experience & Journey)
     ======================================================================== */
  function initTimelineReveal() {
    const timelines = document.querySelectorAll('.timeline, .illuminated-timeline');
    if (!timelines.length) return;

    if (prefersReducedMotion) {
      timelines.forEach(tl => {
        tl.classList.add('timeline-revealed');
        tl.querySelectorAll('.timeline-item, .journey-milestone').forEach(item => {
          item.classList.add('visible');
        });
      });
      return;
    }

    // Dynamic line draw and milestone reveal driven by viewport scroll
    function updateTimelines() {
      const vh = window.innerHeight;
      timelines.forEach(tl => {
        const rect = tl.getBoundingClientRect();
        
        // Check if timeline is in viewport range
        if (rect.top < vh * 0.88 && rect.bottom > 0) {
          tl.classList.add('timeline-revealed');
          
          // Calculate scroll progress percentage (0 to 1) through the timeline
          const progress = Math.min(1, Math.max(0.06, (vh * 0.75 - rect.top) / rect.height));
          tl.style.setProperty('--timeline-progress', progress.toFixed(3));
          
          // Apply progress height to the vertical pseudo/line
          const lineEl = tl.querySelector('.timeline-line-fill');
          if (lineEl) {
            lineEl.style.height = `${progress * 100}%`;
          }
        }

        // Progressively reveal individual milestone cards as they reach trigger zone
        const items = tl.querySelectorAll('.timeline-item, .journey-milestone');
        items.forEach((item, idx) => {
          const itemRect = item.getBoundingClientRect();
          if (itemRect.top < vh * 0.88) {
            if (!item.classList.contains('visible')) {
              setTimeout(() => {
                item.classList.add('visible');
              }, idx * 60);
            }
          }
        });
      });
    }

    // Scroll listener with requestAnimationFrame throttle
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          updateTimelines();
          scrollTicking = false;
        });
      }
    }, { passive: true });

    // Initial check
    updateTimelines();
  }

  /* ========================================================================
     9. COUNT-UP ANIMATION
     ======================================================================== */
  function countUp(el, target, duration = 1600) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;

      el.textContent = isDecimal
        ? current.toFixed(2)
        : Math.floor(current).toLocaleString();

      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = isDecimal ? target.toFixed(2) : target.toLocaleString();
    }

    requestAnimationFrame(update);
  }

  function initCountUps() {
    const statNumbers = document.querySelectorAll('.stat-number, .count-up-number');

    if (prefersReducedMotion) {
      statNumbers.forEach(el => {
        el.setAttribute('data-countup-done', 'true');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        if (el.hasAttribute('data-countup-done')) {
          observer.unobserve(el);
          return;
        }
        el.setAttribute('data-countup-done', 'true');
        observer.unobserve(el);

        const text = el.textContent.trim();
        const isTop = text.startsWith('Top ');
        const hasHash = text.startsWith('#');
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');

        const raw = text
          .replace(/,/g, '')
          .replace('Top ', '')
          .replace('+', '')
          .replace('%', '')
          .replace('#', '');

        const num = parseFloat(raw);
        if (!isNaN(num) && num > 0 && num < 100000) {
          const isDecimal = raw.includes('.');
          const decimalPlaces = isDecimal ? (raw.split('.')[1] || '').length : 0;
          const prefix = isTop ? 'Top ' : (hasHash ? '#' : '');
          const suffix = hasPercent ? '%' : (hasPlus ? '+' : '');

          const innerEl = document.createElement('span');
          innerEl.className = 'count-up-val';
          innerEl.textContent = isDecimal
            ? `${prefix}${(0).toFixed(decimalPlaces)}${suffix}`
            : `${prefix}0${suffix}`;
          el.innerHTML = '';
          el.appendChild(innerEl);

          const start = performance.now();
          const duration = 1200; // smooth 1.2s duration

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth cubic ease-out curve (continuous, no pauses)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * num;

            if (isDecimal) {
              innerEl.textContent = `${prefix}${current.toFixed(decimalPlaces)}${suffix}`;
            } else {
              innerEl.textContent = `${prefix}${Math.floor(current).toLocaleString()}${suffix}`;
            }

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              innerEl.textContent = isDecimal
                ? `${prefix}${num.toFixed(decimalPlaces)}${suffix}`
                : `${prefix}${num.toLocaleString()}${suffix}`;
            }
          }

          requestAnimationFrame(update);
        }
      });
    }, { threshold: 0.15 });

    statNumbers.forEach(el => {
      if (!el.hasAttribute('data-countup-done')) {
        observer.observe(el);
      }
    });
  }

  /* ========================================================================
     9B. CARD BORDER-LIGHTING DYNAMICS
     ======================================================================== */
  function initCardLighting() {
    if (prefersReducedMotion || isTouchDevice) return;

    const cards = document.querySelectorAll('.card, .focus-domain-card, .project-card, .stat-card, .journey-card, .editorial-project');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }

  /* ========================================================================
     10. CURSOR GLOW (desktop only)
     ======================================================================== */
  function initCursorGlow() {
    if (prefersReducedMotion || isTouchDevice) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';

    document.body.appendChild(glow);
    document.body.appendChild(dot);

    let mouseX = -9999, mouseY = -9999;
    let glowX = -9999, glowY = -9999;
    let dotX = -9999, dotY = -9999;

    // Smooth cursor lag for glow, near-instant for dot
    function animateCursor() {
      glowX += (mouseX - glowX) * 0.07;
      glowY += (mouseY - glowY) * 0.07;
      dotX  += (mouseX - dotX)  * 0.55;
      dotY  += (mouseY - dotY)  * 0.55;

      glow.style.left = `${glowX}px`;
      glow.style.top  = `${glowY}px`;
      dot.style.left  = `${dotX}px`;
      dot.style.top   = `${dotY}px`;

      requestAnimationFrame(animateCursor);
    }

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Magnetic effect on interactive elements
    document.addEventListener('mouseover', e => {
      if (e.target.closest('.btn, .social-link, [data-certificate-src], .nav-link')) {
        document.body.classList.add('hovering-btn');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('.btn, .social-link, [data-certificate-src], .nav-link')) {
        document.body.classList.remove('hovering-btn');
      }
    });

    requestAnimationFrame(animateCursor);
  }

  /* ========================================================================
     11. FOOTER REVEAL
     ======================================================================== */
  function initFooterReveal() {
    const footer = document.querySelector('.site-footer');
    if (!footer || prefersReducedMotion) {
      if (footer) footer.classList.add('footer-visible');
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        footer.classList.add('footer-visible');
        observer.disconnect();
      }
    }, { threshold: 0.05 });

    observer.observe(footer);
  }

  /* ========================================================================
     12. LOADING SCREEN (Disabled in favor of instant direct page load)
     ======================================================================== */
  function injectLoadingScreen() {
    // Direct page loading without blocking DOM injection
  }

  /* ========================================================================
     13. PARALLAX — Hero section subtle mouse parallax
     ======================================================================== */
  function initHeroParallax() {
    if (!isHomePage || prefersReducedMotion || isTouchDevice) return;

    const heroContent = document.querySelector('.hero-section .container');
    if (!heroContent) return;

    let ticking = false;
    document.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 3;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        heroContent.style.transform = `translate(${dx * 4}px, ${dy * 3}px)`;
        ticking = false;
      });
    });

    document.addEventListener('mouseleave', () => {
      heroContent.style.transform = 'translate(0, 0)';
    });
  }

  /* ========================================================================
     14. EDUCATION REVEAL — Progression Line Draw
     ======================================================================== */
  function initEducationReveal() {
    const eduSection = document.getElementById('education');
    if (!eduSection) return;

    const fillLine = document.getElementById('eduProgressionFill');
    if (!fillLine) return;

    if (prefersReducedMotion) {
      fillLine.classList.add('drawn');
      return;
    }

    const eduObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          fillLine.classList.add('drawn');
        }, 220);
        eduObserver.disconnect();
      }
    }, { threshold: 0.15 });

    eduObserver.observe(eduSection);
  }

  /* ========================================================================
     INIT — DOMContentLoaded
     ======================================================================== */
  function init() {
    initLoadingScreen();
    initAmbientBackground();
    initPageHeader();
    initHeroAnimation();
    initHeroRoleTyping();
    initHeroWorkspaceEntrance();
    initHeroParallax();
    initPageTransitions();
    initScrollReveal();
    initTimelineReveal();
    initEducationReveal();
    initCountUps();
    initCardLighting();
    initCursorGlow();
    initFooterReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
