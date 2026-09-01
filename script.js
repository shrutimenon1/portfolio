// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// "Track Changes" markup toggle
// Reveals editorial-style annotations & diff marks across the page,
// echoing the site owner's copyediting background.
// =========================================================
const markupToggle = document.getElementById('markup-toggle');

function setMarkup(on) {
  document.body.classList.toggle('markup-on', on);
  markupToggle.setAttribute('aria-pressed', String(on));
}

markupToggle.addEventListener('click', () => {
  const isOn = document.body.classList.contains('markup-on');
  setMarkup(!isOn);
});

// Turn markup on briefly on first load so visitors notice the feature,
// then switch it off. Skipped if the visitor prefers reduced motion.
/* const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  window.addEventListener('load', () => {
    setTimeout(() => setMarkup(true), 500);
    setTimeout(() => setMarkup(false), 3200);
  });
} */
setMarkup(true);

// Like button on the editorial annotation
const annotationLike = document.querySelector('.annotation-like');
if (annotationLike) {
  const countEl = annotationLike.querySelector('.annotation-like-count');
  let liked = false;
  let count = 0;

  annotationLike.addEventListener('click', () => {
    liked = !liked;
    count += liked ? 1 : -1;
    countEl.textContent = count;
    annotationLike.setAttribute('aria-pressed', String(liked));
  });
}

// =========================================================
// Mobile nav burger
// =========================================================
const navBurger = document.getElementById('nav-burger');
const siteNav = document.getElementById('site-nav');

navBurger.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navBurger.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navBurger.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Scroll reveal for sections
// =========================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback: just show everything
  revealEls.forEach(el => el.classList.add('is-visible'));
}
