import Lenis from 'lenis';
import './styles.css';
import './sections-a.css';
import './sections-b.css';
import './responsive.css';
import './corrections.css';

const html = document.documentElement;
const body = document.body;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

html.classList.remove('no-js');
html.classList.add('js');

const loaderCount = document.querySelector('.loader__count');
let pageReady = false;
let loaderFinished = false;
const loaderStartedAt = performance.now();

const finishLoader = () => {
  if (loaderFinished) return;
  loaderFinished = true;
  if (loaderCount) loaderCount.textContent = '100';
  window.setTimeout(() => body.classList.add('is-ready'), reducedMotion ? 0 : 320);
};

const updateLoader = (time) => {
  if (loaderFinished) return;
  const elapsed = time - loaderStartedAt;
  const value = pageReady ? 100 : Math.min(94, Math.floor(elapsed / 15));
  if (loaderCount) loaderCount.textContent = String(value).padStart(2, '0');

  if (pageReady && elapsed > 650) {
    finishLoader();
    return;
  }

  requestAnimationFrame(updateLoader);
};

requestAnimationFrame(updateLoader);

const markPageReady = async () => {
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Font fallback remains available.
    }
  }
  pageReady = true;
};

if (document.readyState === 'complete') {
  markPageReady();
} else {
  window.addEventListener('load', markPageReady, { once: true });
}

window.setTimeout(() => {
  pageReady = true;
  finishLoader();
}, 2600);

let lenis;

if (!reducedMotion) {
  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.9,
    anchors: true,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
}

const header = document.querySelector('[data-header]');
const progress = document.querySelector('.scroll-progress span');
const darkSections = [...document.querySelectorAll('.section--dark, .section--grass, .section--orange')];

const updateScrollUI = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0;

  progress?.style.setProperty('transform', `scaleX(${ratio})`);
  header?.classList.toggle('is-scrolled', scrollTop > 24);

  if (header) {
    const probe = header.getBoundingClientRect().bottom / 2;
    const overDark = darkSections.some((section) => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= probe && bounds.bottom >= probe;
    });
    header.classList.toggle('on-dark', overDark);
  }
};

updateScrollUI();
window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);

const revealItems = document.querySelectorAll('[data-reveal]');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-nav');

const setMenu = (open) => {
  if (!menuButton || !menu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('.sr-only').textContent = open ? 'Fechar menu' : 'Abrir menu';
  menu.classList.toggle('is-open', open);
  body.classList.toggle('menu-open', open);
  if (open) lenis?.stop();
  else lenis?.start();
};

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
