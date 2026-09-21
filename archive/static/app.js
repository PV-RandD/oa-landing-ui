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
  syncHeroVideo();
});

// Load only the matching video after the page is ready. Keep the picture for
// reduced motion, data saving, unsupported playback, or any media failure.
const hero = document.querySelector('.hero');
const heroVideo = document.querySelector('.hero-video');
const mobileMedia = window.matchMedia('(max-width: 700px)');
const connection = navigator.connection;
const failedVideoSources = new Set();
let videoReadyToLoad = false;
let heroVisible = true;
let requestedVideo = '';
heroVideo.muted = true;

function syncHeroVideo() {
  const source = mobileMedia.matches ? heroVideo.dataset.mobileSrc : heroVideo.dataset.desktopSrc;
  const useStill = motionQuery.matches || Boolean(connection?.saveData);
  if (useStill || (requestedVideo && requestedVideo !== source)) {
    heroVideo.pause();
    hero.classList.remove('video-visible');
    if (requestedVideo) {
      requestedVideo = '';
      heroVideo.removeAttribute('src');
      heroVideo.load();
    }
  }
  const shouldPlay = videoReadyToLoad && heroVisible && !document.hidden && !motionPaused && !useStill;
  if (!shouldPlay || failedVideoSources.has(source)) {
    heroVideo.pause();
    return;
  }
  if (requestedVideo !== source) {
    requestedVideo = source;
    heroVideo.src = source;
    heroVideo.load();
  }
  const pending = heroVideo.play();
  if (pending) pending.catch(error => {
    // A pause or breakpoint change may abort an in-flight play request.
    if (error.name !== 'AbortError' && requestedVideo === source) {
      hero.classList.remove('video-visible');
    }
  });
}
heroVideo.addEventListener('playing', () => {
  if (motionPaused || motionQuery.matches || !heroVisible || document.hidden || connection?.saveData) {
    heroVideo.pause();
    return;
  }
  hero.classList.add('video-visible');
});
heroVideo.addEventListener('error', () => {
  if (requestedVideo) failedVideoSources.add(requestedVideo);
  hero.classList.remove('video-visible');
});
mobileMedia.addEventListener('change', syncHeroVideo);
motionQuery.addEventListener('change', syncHeroVideo);
connection?.addEventListener?.('change', syncHeroVideo);
document.addEventListener('visibilitychange', syncHeroVideo);
function enableHeroVideo() {
  const start = () => { videoReadyToLoad = true; syncHeroVideo(); };
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1800 });
  else setTimeout(start, 200);
}
if (document.readyState === 'complete') enableHeroVideo();
else window.addEventListener('load', enableHeroVideo, { once: true });

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
window.matchMedia('(min-width: 1051px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// Accessible manual/keyboard benefit tabs. Images load only when requested.
const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(tab, focus = false) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    panel.hidden = !selected;
    panel.inert = !selected;
    panel.setAttribute('aria-hidden', String(!selected));
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

// Keep the process controls and illustration in sync, including collapsed steps.
const steps = [...document.querySelectorAll('.step')];
const stageButtons = [...document.querySelectorAll('[data-select-step]')];
function syncStep() {
  const active = steps.find(step => step.open);
  const index = active ? Number(active.dataset.step) : -1;
  document.querySelector('.rail-diagram').dataset.stage = String(index);
  document.getElementById('step-count').textContent = index < 0 ? '— / 04' : `0${index + 1} / 04`;
  document.getElementById('step-caption').textContent = active ? active.querySelector('summary span:nth-child(2)').textContent : 'Explore a step';
  stageButtons.forEach((button, i) => {
    button.classList.toggle('active', i <= index);
    button.setAttribute('aria-pressed', String(i === index));
  });
}
steps.forEach(step => step.addEventListener('toggle', () => {
  if (step.open) steps.forEach(other => { if (other !== step) other.open = false; });
  syncStep();
}));
stageButtons.forEach((button, index) => button.addEventListener('click', () => {
  steps.forEach((step, i) => { step.open = i === index; });
  syncStep();
}));

// Fixed navigation tracks the section at the reading line without changing history.
const header = document.querySelector('.site-header');
const navLinks = [...header.querySelectorAll('nav a[href^="#"]')];
const sections = [...document.querySelectorAll('main > section[id]')];
let scrollQueued = false;
function updateNavigation() {
  scrollQueued = false;
  const readingLine = header.getBoundingClientRect().bottom + 48;
  let current = '';
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= readingLine) current = section.id;
  });
  header.classList.toggle('is-scrolled', window.scrollY > 60);
  navLinks.forEach(link => {
    if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
function sizeHeader() {
  document.documentElement.style.setProperty('--anchor-offset', `${header.getBoundingClientRect().bottom + 24}px`);
  updateNavigation();
}
if ('ResizeObserver' in window) new ResizeObserver(sizeHeader).observe(header);
window.addEventListener('resize', sizeHeader);
sizeHeader();
// Move keyboard focus out of a closing menu to the destination, keeping native URLs.
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
}));
header.addEventListener('focusout', () => {
  requestAnimationFrame(() => { if (!header.contains(document.activeElement)) closeMenu(); });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.remove('awaiting'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.08 });
  if (!motionQuery.matches) document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('awaiting'); revealObserver.observe(el); }
  });
  const animationObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.classList.toggle('offscreen', !entry.isIntersecting);
    if (entry.target === hero) { heroVisible = entry.isIntersecting; syncHeroVideo(); }
  }));
  document.querySelectorAll('.hero,.process-visual').forEach(el => animationObserver.observe(el));
  motionQuery.addEventListener('change', event => {
    if (event.matches) document.querySelectorAll('.reveal.awaiting').forEach(el => el.classList.remove('awaiting'));
  });
}
document.getElementById('year').textContent = new Date().getFullYear();
