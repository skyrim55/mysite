/* mylearn theme — main.js */

// ---------- Mobile Nav ----------
const navToggle = document.getElementById('navToggle');
const siteNav   = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
}

// ---------- Header scroll shadow ----------
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20
      ? '0 4px 24px rgba(0,0,0,0.5)'
      : 'none';
  }, { passive: true });
}

// ---------- TOC Toggle ----------
const tocToggle  = document.getElementById('tocToggle');
const tocContent = document.getElementById('tocContent');

if (tocToggle && tocContent) {
  tocContent.style.display = 'none'; // start collapsed
  tocToggle.addEventListener('click', () => {
    const visible = tocContent.style.display !== 'none';
    tocContent.style.display = visible ? 'none' : 'block';
    tocToggle.textContent = visible
      ? '📋 Table of Contents'
      : '📋 Hide Contents';
  });
}

// ---------- Card filter ----------
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const cards  = document.querySelectorAll('.post-card');

    cards.forEach(card => {
      if (filter === 'all' || card.dataset.tags?.includes(filter)) {
        card.style.display = '';
        card.style.animationName = 'none';
        requestAnimationFrame(() => {
          card.style.animationName = '';
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---------- Animate progress bars when visible ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress-fill').forEach(bar => {
        bar.style.animationPlayState = 'running';
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.progress-section').forEach(el => {
  el.querySelectorAll('.progress-fill').forEach(bar => {
    bar.style.animationPlayState = 'paused';
  });
  observer.observe(el);
});

// ---------- Fade-in on scroll ----------
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.post-card, .section-card, .progress-item').forEach(el => {
  fadeObserver.observe(el);
});

console.log('%c⚡ mylearn theme loaded', 'color: #6c63ff; font-weight: bold;');
