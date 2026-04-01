document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    const toggleNav = () => navLinks.classList.toggle('open');

    hamburger.addEventListener('click', toggleNav);
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter') toggleNav();
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Scroll Reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
  }

  // Sticky nav shadow
  const nav = document.getElementById('mainNav');
  const updateNavShadow = () => {
    if (!nav) return;
    nav.classList.toggle('nav-scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', updateNavShadow);
  updateNavShadow();

  // Form submit (demo)
  const submitBtn = document.querySelector('.form-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      submitBtn.textContent = '✓ Anfrage gesendet – Wir melden uns bald!';
      submitBtn.classList.add('form-submit--sent');
      submitBtn.disabled = true;
    });
  }
});
