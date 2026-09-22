document.addEventListener('DOMContentLoaded', () => {
  const avatarCards = document.querySelectorAll('.hero-3d-card');

  avatarCards.forEach((card) => {
    const avatarImg = card.querySelector('.hero-avatar-img');

    // 3D Tilt on mouse move
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      const rotateX = -mouseY * 18;
      const rotateY = mouseX * 22;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

      if (avatarImg) {
        avatarImg.style.transform = `translate3d(${mouseX * 12}px, ${mouseY * 12}px, 40px)`;
      }
    });

    card.addEventListener('mouseenter', () => {
      card.classList.add('waving-arm-active');
      card.style.transition = 'transform 0.1s ease-out';
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('waving-arm-active');
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

      if (avatarImg) {
        avatarImg.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        avatarImg.style.transform = 'translate3d(0, 0, 30px)';
      }
    });

    // Touch support
    card.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = card.getBoundingClientRect();
        const mouseX = Math.max(-1, Math.min(1, (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
        const mouseY = Math.max(-1, Math.min(1, (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2)));

        card.style.transform = `rotateX(${-mouseY * 8}deg) rotateY(${mouseX * 10}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    }, { passive: true });

    const resetTouch = () => {
      card.style.transition = 'transform 0.4s ease-out';
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('touchend', resetTouch);
    card.addEventListener('touchcancel', resetTouch);
  });
});

