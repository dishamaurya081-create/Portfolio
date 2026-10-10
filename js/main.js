/**
 * Disha Maurya - Personal Portfolio JS
 * Interactions, Certificate Viewer Modal, Nav Drawer, Copy-to-Clipboard & Filter System
 */

// ── Route Scroll Restoration Fix ──────────────────────────────────────────────
// Ensure every page navigation opens at the very top of the destination page,
// preventing previous scroll offsets or blank gaps from carrying over.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function resetScrollToTop() {
  if (window.location.hash) {
    try {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    } catch (e) {}
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

// Immediate execution
resetScrollToTop();

document.addEventListener('DOMContentLoaded', () => {
  resetScrollToTop();

  initNavigation();
  initCertificateModal();
  initResumeButton();
  initCopyEmail();
  initFilters();
  initContactForm();
  initBackToTop();
});

window.addEventListener('load', () => {
  resetScrollToTop();
});

window.addEventListener('pageshow', (event) => {
  resetScrollToTop();
});

/* ==========================================================================
   Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-backdrop');

  if (toggleBtn && drawer && backdrop) {
    const toggleMenu = () => {
      drawer.classList.toggle('open');
      backdrop.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    };

    toggleBtn.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  }

  // Active link highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   Certificate Viewer Modal
   ========================================================================== */
function initCertificateModal() {
  let modal = document.querySelector('#certificateModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'certificateModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modalCertTitle">
        <div class="modal-header">
          <div class="modal-title" id="modalCertTitle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span id="modalCertTitleText">Certificate Preview</span>
          </div>
          <div class="modal-actions">
            <a id="modalExternalLink" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Open original in new tab">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Open File
            </a>
            <button class="btn btn-icon btn-sm" id="modalCloseBtn" aria-label="Close modal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div class="modal-body" id="modalCertBody">
          <!-- Dynamically populated iframe or img -->
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const modalTitleText = modal.querySelector('#modalCertTitleText');
  const modalExternalLink = modal.querySelector('#modalExternalLink');
  const modalCertBody = modal.querySelector('#modalCertBody');
  const closeBtn = modal.querySelector('#modalCloseBtn');

  function closeModal() {
    modal.classList.remove('active');
    modalCertBody.innerHTML = '';
    document.body.style.overflow = '';
  }

  function openModal(src, title) {
    modalTitleText.textContent = title || 'Verified Credential / Certificate';
    modalExternalLink.href = src;
    modalCertBody.innerHTML = '';

    const isPdf = src.toLowerCase().endsWith('.pdf');
    if (isPdf) {
      const iframe = document.createElement('iframe');
      iframe.className = 'modal-iframe';
      iframe.src = `${src}#toolbar=0&navpanes=0`;
      iframe.title = title || 'Certificate PDF';
      modalCertBody.appendChild(iframe);
    } else {
      const img = document.createElement('img');
      img.className = 'modal-image';
      img.src = src;
      img.alt = title || 'Certificate image preview';
      modalCertBody.appendChild(img);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Event delegation for opening certificates
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-certificate-src]');
    if (trigger) {
      e.preventDefault();
      const src = trigger.getAttribute('data-certificate-src');
      const title = trigger.getAttribute('data-certificate-title') || trigger.innerText.trim();
      openModal(src, title);
    }
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Copy Email to Clipboard
   ========================================================================== */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('[data-copy-email]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = 'dishamaurya081l@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard: ' + email);
      } catch (err) {
        showToast('Email: ' + email);
      }
    });
  });
}

/* ==========================================================================
   Resume Button Protocol Handler
   ========================================================================== */
function initResumeButton() {
  document.addEventListener('click', (e) => {
    const resumeLink = e.target.closest('a[href="/Disha_Maurya_Resume.pdf"]');
    if (!resumeLink) return;

    // If opened via local file: protocol where leading slash refers to drive root C:/,
    // explicitly route to the actual file in public/ folder.
    if (window.location.protocol === 'file:') {
      e.preventDefault();
      window.open('public/Disha_Maurya_Resume.pdf', '_blank');
    }
  });
}

/* ==========================================================================
   Toast Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('#globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-emerald);">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span class="toast-text">${message}</span>
    `;
    document.body.appendChild(toast);
  } else {
    toast.querySelector('.toast-text').textContent = message;
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   Filter System for Projects / Competitions / Achievements
   ========================================================================== */
function initFilters() {
  const filterBars = document.querySelectorAll('.filter-bar');
  filterBars.forEach(bar => {
    const buttons = bar.querySelectorAll('.filter-btn');
    const targetSelector = bar.getAttribute('data-filter-target') || '.filterable-item';
    const items = document.querySelectorAll(targetSelector);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter');

        items.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterVal === 'all' || category === filterVal || (category && category.includes(filterVal))) {
            item.style.display = '';
            item.classList.add('fade-in');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
}

/* ==========================================================================
   Contact Form Validation & Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const message = form.querySelector('[name="message"]')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all fields before submitting.');
        return;
      }

      // Friendly notification & reset
      showToast('Thank you for reaching out, ' + name + '! Your message draft is ready.');
      const mailtoUrl = `mailto:dishamaurya081l@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(email)}`;
      window.location.href = mailtoUrl;
      form.reset();
    });
  }
}

/* ==========================================================================
   Back to top
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('#backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
