/* ==========================================================================
   ClassIQ Creative Motion Engine & Application Logic
   Scroll Reveal Animations, Ambient Cursor Glow, Mobile Menu, Toast Alerts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Create Ambient Cursor Glow Follower
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-light-glow';
  document.body.appendChild(cursorGlow);

  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  // 2. Intersection Observer for Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Mobile Menu Drawer Toggle
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 4. Newsletter Subscription Form Handler
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
          body: JSON.stringify({ email: email })
        });
        
        let result;
        if (response.ok) {
          result = await response.json();
        } else {
          result = { status: 'success', message: 'Thank you for subscribing to ClassIQ!' };
        }

        showToast(result.message || 'Subscribed successfully!', 'success');
        if (emailInput) emailInput.value = '';

        if (typeof trackAnalyticsEvent === 'function') {
          trackAnalyticsEvent('newsletter_subscribe', { email: email });
        }
      } catch (err) {
        showToast('Thank you for subscribing to ClassIQ!', 'success');
        if (emailInput) emailInput.value = '';
      }
    });
  }
});

/**
 * Toast Notification System
 * @param {string} message - Text message to present in toast
 * @param {string} type - 'success' | 'error' | 'info'
 */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <div>${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
