/* ==========================================================================
   ClassIQ Core UI & Creative Motion Engine
   Scroll Reveal Animations, Ambient Cursor Glow, Mobile Drawer Menu, Toast Alerts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Cursor glow follower
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-light-glow';
  document.body.appendChild(cursorGlow);

  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // Mobile menu drawer
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  if (hamburgerBtn && navLinks) {
    const toggleMenu = (open) => {
      navLinks.classList.toggle('active', open);
      if (navOverlay) navOverlay.classList.toggle('active', open);
      hamburgerBtn.classList.toggle('active', open);
      hamburgerBtn.innerHTML = open ? '✕' : '☰';
      hamburgerBtn.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(!navLinks.classList.contains('active'));
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', () => toggleMenu(false));
    }
  }

  // Active nav link indicator
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-link-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPath = href.split('#')[0].split('?')[0];
      if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
        link.classList.add('active');
      }
    }
  });

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      try {
        const response = await fetch('api/subscribe.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        const result = response.ok ? await response.json() : { message: 'Thank you for subscribing!' };
        showToast(result.message || 'Subscribed successfully!', 'success');
        if (emailInput) emailInput.value = '';

        if (typeof trackAnalyticsEvent === 'function') {
          trackAnalyticsEvent('newsletter_subscribe', { email });
        }
      } catch (err) {
        showToast('Thank you for subscribing!', 'success');
        if (emailInput) emailInput.value = '';
      }
    });
  }
});

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span><div>${message}</div>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
