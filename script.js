// ===== CyberLearn — script.js =====

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Smooth scroll for nav links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Sticky header shrink/shadow on scroll ---------- */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 8px 24px rgba(0,0,0,.35)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  /* ---------- Animated stat counters (98%, 2000+, 40+) ---------- */
  const stats = document.querySelectorAll('.stat h3');
  const animateCount = (el) => {
    const raw = el.textContent.trim();
    const suffix = raw.replace(/[0-9]/g, '');
    const target = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  };

  /* ---------- Generic scroll-reveal using IntersectionObserver ---------- */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // trigger stat counters once, when hero-stats section appears
        if (entry.target.classList.contains('hero-stats')) {
          stats.forEach(animateCount);
        }

        // trigger dashboard bar fill animation on view
        if (entry.target.id === 'dashboard') {
          entry.target.querySelectorAll('.bar-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            requestAnimationFrame(() => {
              bar.style.transition = 'width 1.4s ease';
              bar.style.width = width;
            });
          });
        }

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  document
    .querySelectorAll('.feature-card, .step, .hero-stats, #dashboard, .price-card')
    .forEach(el => revealObserver.observe(el));

  /* ---------- Interactive demo phishing email card ---------- */
  const mailCard = document.querySelector('.mail-card');
  const fakeBtn = document.querySelector('.fake-btn');

  if (fakeBtn) {
    fakeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fakeBtn.textContent = '⚠️ This was a simulated phish!';
      fakeBtn.style.background = '#c62828';
      mailCard.style.transform = 'rotate(-2deg) scale(1.03)';
      setTimeout(() => {
        mailCard.style.transform = 'rotate(-2deg) scale(1)';
      }, 300);

      setTimeout(() => {
        fakeBtn.textContent = 'Verify Account →';
        fakeBtn.style.background = '';
      }, 2500);
    });
  }

  /* ---------- Mobile nav toggle (in case a hamburger is added later) ---------- */
  const nav = document.querySelector('nav');
  if (window.innerWidth <= 768 && nav) {
    // Placeholder hook — extend with a hamburger button if needed
    nav.style.display = 'none';
  }

});