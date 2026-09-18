// Small progressive enhancements; all narrative content is server-readable HTML.
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
let motionPaused = false;
motionButton.addEventListener('click', () => {
  motionPaused = !motionPaused;
  document.body.classList.toggle('motion-paused', motionPaused);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.setAttribute('aria-label', motionPaused ? 'Resume decorative motion' : 'Pause decorative motion');
  motionButton.querySelector('.motion-label').textContent = motionPaused ? 'Resume motion' : 'Pause motion';
  motionButton.firstElementChild.textContent = motionPaused ? '▷' : 'Ⅱ';
  if (motionPaused) document.querySelectorAll('.reveal.awaiting').forEach(el => el.classList.remove('awaiting'));
});

// Mobile navigation supports Escape, outside click, and anchor selection.
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu');
function closeMenu(returnFocus = false) {
  menu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const opening = menu.hidden;
  menu.hidden = !opening;
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) closeMenu(true); });
document.addEventListener('click', event => { if (!document.querySelector('.site-header').contains(event.target)) closeMenu(); });
window.matchMedia('(min-width: 851px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// Accessible manual/keyboard benefit tabs. Images load only when requested.
const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(tab, focus = false) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    panel.hidden = !selected;
    if (selected) {
      const image = panel.querySelector('img[data-src]');
      if (image) { image.src = image.dataset.src; delete image.dataset.src; }
    }
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = tabs.length - 1;
    if (target !== undefined) { event.preventDefault(); activateTab(tabs[target], true); }
  });
});

// Native details remain usable without JavaScript; the illustration follows selection.
const steps = [...document.querySelectorAll('.step')];
steps.forEach(step => step.addEventListener('toggle', () => {
  if (!step.open) return;
  steps.forEach(other => { if (other !== step) other.open = false; });
  const index = Number(step.dataset.step);
  document.querySelector('.rail-diagram').dataset.stage = String(index);
  document.getElementById('step-count').textContent = `0${index + 1} / 04`;
  document.getElementById('step-caption').textContent = step.querySelector('summary span:nth-child(2)').textContent;
  document.querySelectorAll('.stage-track span').forEach((segment, i) => segment.classList.toggle('active', i <= index));
}));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.remove('awaiting'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.08 });
  if (!motionQuery.matches) document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('awaiting'); revealObserver.observe(el); }
  });
  const animationObserver = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('offscreen', !entry.isIntersecting)));
  document.querySelectorAll('.hero,.process-visual').forEach(el => animationObserver.observe(el));
  motionQuery.addEventListener('change', event => {
    if (event.matches) document.querySelectorAll('.reveal.awaiting').forEach(el => el.classList.remove('awaiting'));
  });
}
document.getElementById('year').textContent = new Date().getFullYear();
