const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHeroController } = require('../src/lib/hero-controller.mjs');
function setup({ reduced = false, saveData = false, mobile = false } = {}) {
  const emitter = extra => Object.assign({ handlers: {}, addEventListener(n, f) { (this.handlers[n] ??= new Set()).add(f); }, removeEventListener(n, f) { this.handlers[n]?.delete(f); }, emit(n) { for (const f of this.handlers[n] ?? []) f({ matches: this.matches }); } }, extra);
  const classes = new Set();
  const video = emitter({ dataset: { desktopSrc: 'desktop.mp4', mobileSrc: 'mobile.mp4' }, src: '', paused: true, plays: 0, loads: 0,
    classList: { add: x => classes.add(x), remove: x => classes.delete(x) },
    play() { this.paused = false; this.plays++; this.emit('playing'); return Promise.resolve(); }, pause() { this.paused = true; }, load() { this.loads++; }, removeAttribute(n) { if (n === 'src') this.src = ''; } });
  const reducedQuery = emitter({ matches: reduced });
  const mobileQuery = emitter({ matches: mobile });
  const connection = emitter({ saveData });
  const document = emitter({ readyState: 'complete', hidden: false });
  let observe;
  let disconnected = false;
  const window = emitter({ matchMedia: q => q.includes('reduced') ? reducedQuery : mobileQuery,
    requestIdleCallback(f) { f(); return 1; }, cancelIdleCallback() {},
    IntersectionObserver: class { constructor(f) { observe = f; } observe() {} disconnect() { disconnected = true; } },
  });
  const controller = createHeroController(video, {}, { window, document, navigator: { connection } });
  return { controller, video, classes, reducedQuery, mobileQuery, connection, document, window,
    visibility: value => observe([{ isIntersecting: value }]), disconnected: () => disconnected };
}
test('loads the matching source and supports user pause/resume', () => {
  const s = setup(); assert.equal(s.video.src, 'desktop.mp4'); assert.equal(s.video.paused, false);
  s.controller.setPaused(true); assert.equal(s.video.paused, true);
  s.controller.setPaused(false); assert.equal(s.video.paused, false);
  assert.equal(setup({ mobile: true }).video.src, 'mobile.mp4');
});
test('reduced motion and data saving avoid video requests', () => {
  for (const preferences of [{ reduced: true }, { saveData: true }]) {
    const s = setup(preferences); assert.equal(s.video.src, ''); assert.equal(s.video.loads, 0); assert.equal(s.video.plays, 0);
  }
});
test('preference changes release video and restore playback when allowed', () => {
  const s = setup(); s.reducedQuery.matches = true; s.reducedQuery.emit('change');
  assert.equal(s.video.src, ''); assert.equal(s.video.paused, true); assert.ok(!s.classes.has('is-playing'));
  s.reducedQuery.matches = false; s.reducedQuery.emit('change'); assert.equal(s.video.src, 'desktop.mp4');
});
test('breakpoint changes replace sources and hidden tabs pause playback', () => {
  const s = setup(); s.mobileQuery.matches = true; s.mobileQuery.emit('change'); assert.equal(s.video.src, 'mobile.mp4');
  s.document.hidden = true; s.document.emit('visibilitychange'); assert.equal(s.video.paused, true);
  s.document.hidden = false; s.document.emit('visibilitychange'); assert.equal(s.video.paused, false);
});
test('offscreen heroes pause until visible', () => {
  const s = setup(); s.visibility(false); assert.equal(s.video.paused, true); s.visibility(true); assert.equal(s.video.paused, false);
});
test('decoder failure keeps the poster and does not retry the failed source', () => {
  const s = setup(); s.video.emit('error'); assert.ok(!s.classes.has('is-playing'));
  const plays = s.video.plays; s.visibility(false); s.visibility(true); assert.equal(s.video.plays, plays);
});
test('unmount releases media, observers, and listeners; remount works', () => {
  const s = setup(); s.controller.destroy(); const plays = s.video.plays;
  assert.equal(s.video.src, ''); assert.equal(s.video.paused, true); assert.ok(s.disconnected());
  s.document.emit('visibilitychange'); s.mobileQuery.emit('change'); assert.equal(s.video.plays, plays);
  for (const source of [s.video, s.window, s.document, s.mobileQuery, s.reducedQuery, s.connection]) {
    for (const listeners of Object.values(source.handlers)) assert.equal(listeners.size, 0);
  }
  const next = createHeroController(s.video, {}, { window: s.window, document: s.document, navigator: { connection: s.connection } });
  assert.equal(s.video.src, 'desktop.mp4'); assert.equal(s.video.paused, false); next.destroy();
});
