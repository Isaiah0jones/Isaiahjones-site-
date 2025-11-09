// Sticky nav: mobile toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Scroll spy: highlight active section link
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = '#' + entry.target.id;
    const link = navLinks.find(a => a.getAttribute('href') === id);
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

sections.forEach(sec => spy.observe(sec));

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revObs.observe(el));

// Back to top
const toTop = document.getElementById('to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 360) toTop.classList.add('show'); else toTop.classList.remove('show');
});
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Keyboard shortcuts: E = email, T = top
window.addEventListener('keydown', (e) => {
  if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (e.key.toLowerCase() === 'e') window.location.href = 'mailto:isaiah0joness@gmail.com?subject=Coaching%20Inquiry';
  if (e.key.toLowerCase() === 't') window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Parallax on hero
const hero = document.querySelector('[data-parallax] .hero-inner') || document.querySelector('.hero-inner');
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = 180; // approximate hero center
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  if (hero) hero.style.transform = `translate3d(${dx * 6}px, ${dy * 4}px, 0)`;
});
