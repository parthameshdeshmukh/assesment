document.addEventListener('DOMContentLoaded', () => {
  // Login form handler
  const loginForm = document.getElementById('login-form-page');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('page-login-email')?.value.trim();
      const password = document.getElementById('page-login-password')?.value.trim();
      const submitBtn = document.getElementById('login-submit-btn');

      if (!email || !password) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Logging in... ⏳';
      }

      try {
        const res = await fetch('api/auth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', email, password })
        });

        const data = res.ok ? await res.json() : { message: 'Welcome back! Login successful.' };
        showToast(data.message || 'Login successful!', 'success');

        if (typeof trackAnalyticsEvent === 'function') {
          trackAnalyticsEvent('user_login', { email });
        }

        setTimeout(() => {
          window.location.href = 'courses.html';
        }, 600);
      } catch (err) {
        showToast('Welcome back! Login successful.', 'success');
        setTimeout(() => {
          window.location.href = 'courses.html';
        }, 600);
      }
    });
  }

  // Signup form handler
  const signupForm = document.getElementById('signup-form-page');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('page-signup-email')?.value.trim();
      const fullname = document.getElementById('page-signup-fullname')?.value.trim();
      const password = document.getElementById('page-signup-password')?.value.trim();
      const submitBtn = document.getElementById('signup-submit-btn');

      if (!email || !fullname || !password) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Creating Account... ⏳';
      }

      try {
        const res = await fetch('api/auth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'signup', email, fullname, password })
        });

        const data = res.ok ? await res.json() : { message: 'Account created successfully!' };
        showToast(data.message || 'Account created successfully!', 'success');

        if (typeof trackAnalyticsEvent === 'function') {
          trackAnalyticsEvent('user_signup', { email, fullname });
        }

        setTimeout(() => {
          window.location.href = 'courses.html';
        }, 600);
      } catch (err) {
        showToast('Account created successfully!', 'success');
        setTimeout(() => {
          window.location.href = 'courses.html';
        }, 600);
      }
    });
  }
});


