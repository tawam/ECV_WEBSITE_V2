document.documentElement.classList.add('experience-edition');
document.title = 'ECV Experience — conhecimento em movimento';

const loaderWord = document.querySelector('.loader__word');
if (loaderWord) loaderWord.textContent = 'Preparando uma nova rota';

const lucideArrowDown = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 5v14"></path>
    <path d="m19 12-7 7-7-7"></path>
  </svg>
`;

const lucideArrowUpRight = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7 7h10v10"></path>
    <path d="M7 17 17 7"></path>
  </svg>
`;

const roundLinkIcon = document.querySelector('.round-link b');
if (roundLinkIcon) roundLinkIcon.innerHTML = lucideArrowDown;

document.querySelectorAll('.contact-button__arrow').forEach((icon) => {
  icon.innerHTML = lucideArrowUpRight;
});
