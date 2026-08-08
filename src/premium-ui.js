const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

document.documentElement.classList.add('premium-ui');

const premiumCards = document.querySelectorAll([
  '.answer-card',
  '.method-list article',
  '.audience__stages article',
  '.impact__cards article',
  '.future__grid li',
].join(','));

premiumCards.forEach((card) => card.classList.add('premium-card'));

if (finePointer && !reduceMotion) {
  premiumCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--premium-glow-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--premium-glow-y', `${event.clientY - bounds.top}px`);
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--premium-glow-x');
      card.style.removeProperty('--premium-glow-y');
    }, { passive: true });
  });

  const hero = document.querySelector('.hero');
  const bus = document.querySelector('.hero__bus-cutout');
  const bee = document.querySelector('.hero__bee');
  const bird = document.querySelector('.hero__bird');
  let frame = 0;

  const resetHeroDepth = () => {
    [bus, bee, bird].forEach((element) => {
      element?.style.removeProperty('--premium-shift-x');
      element?.style.removeProperty('--premium-shift-y');
    });
  };

  hero?.addEventListener('pointermove', (event) => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      bus?.style.setProperty('--premium-shift-x', `${x * 8}px`);
      bus?.style.setProperty('--premium-shift-y', `${y * 5}px`);
      bee?.style.setProperty('--premium-shift-x', `${x * 18}px`);
      bee?.style.setProperty('--premium-shift-y', `${y * 12}px`);
      bird?.style.setProperty('--premium-shift-x', `${x * -14}px`);
      bird?.style.setProperty('--premium-shift-y', `${y * -9}px`);
    });
  }, { passive: true });

  hero?.addEventListener('pointerleave', resetHeroDepth, { passive: true });
}
