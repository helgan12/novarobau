document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    const openNav = () => navLinks.classList.add('open');
    const closeNav = () => navLinks.classList.remove('open');
    const toggleNav = () => {
      if (navLinks.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    };

    // Hamburger click / keyboard
    hamburger.addEventListener('click', toggleNav);
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter') toggleNav();
    });

    // Linke tıklayınca menüyü kapat
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeNav());
    });

    // Menü açıksa nav dışına tıklayınca kapat
    document.addEventListener('click', (event) => {
      if (!navLinks.classList.contains('open')) return;
      if (event.target.closest('nav')) return;
      closeNav();
    });

    // Basit dokunmatik sürükleme (swipe) ile kapatma
    let touchStartY = null;

    document.addEventListener('touchstart', (event) => {
      if (!navLinks.classList.contains('open')) return;
      if (event.touches.length !== 1) return;
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (event) => {
      if (touchStartY === null) return;
      const currentY = event.touches[0].clientY;
      const deltaY = currentY - touchStartY;

      // Yaklaşık 50px yukarı / aşağı sürükleme menüyü kapatsın
      if (Math.abs(deltaY) > 50) {
        closeNav();
        touchStartY = null;
      }
    }, { passive: true });

    document.addEventListener('touchend', () => {
      touchStartY = null;
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


  

  // Make service cards clickable
  const serviceCards = document.querySelectorAll('.leistung-card[data-href]');
  serviceCards.forEach(card => {
    const url = card.getAttribute('data-href');
    if (!url) return;

    card.style.cursor = 'pointer';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');

    const navigate = () => {
      window.location.href = url;
    };

    card.addEventListener('click', (event) => {
      // Wenn direkt auf einen echten Link geklickt wird, nicht doppelt navigieren
      if (event.target.closest && event.target.closest('a')) return;
      navigate();
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigate();
      }
    });
  });
});
