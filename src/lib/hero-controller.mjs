/** Owns media listeners for one mounted hero. Cleanup is safe under React Strict Mode. */
export function createHeroController(
  video,
  host,
  environment = { window, document, navigator },
) {
  const { window: win, document: doc, navigator: nav } = environment;
  const reduced = win.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = win.matchMedia("(max-width: 700px)");
  const connection = nav.connection;
  const failed = new Set();
  const cleanups = [];
  let ready = false,
    visible = true,
    paused = false,
    disposed = false,
    source = "";
  let cancelStart = () => {};
  video.muted = true;
  function listen(target, name, handler) {
    if (!target?.addEventListener) return;
    target.addEventListener(name, handler);
    cleanups.push(() => target.removeEventListener(name, handler));
  }
  function sync() {
    if (disposed) return;
    const next = mobile.matches
      ? video.dataset.mobileSrc
      : video.dataset.desktopSrc;
    const still = reduced.matches || Boolean(connection?.saveData);
    if (still || (source && source !== next)) {
      video.pause();
      video.classList.remove("is-playing");
      if (source) {
        source = "";
        video.removeAttribute("src");
        video.load();
      }
    }
    if (
      !ready ||
      !visible ||
      doc.hidden ||
      paused ||
      still ||
      failed.has(next)
    ) {
      video.pause();
      return;
    }
    if (source !== next) {
      source = next;
      video.src = next;
      video.load();
    }
    video.play()?.catch((error) => {
      if (!disposed && error.name !== "AbortError" && source === next)
        video.classList.remove("is-playing");
    });
  }
  listen(video, "playing", () => {
    if (
      disposed ||
      paused ||
      reduced.matches ||
      !visible ||
      doc.hidden ||
      connection?.saveData
    )
      video.pause();
    else video.classList.add("is-playing");
  });
  listen(video, "error", () => {
    if (source) failed.add(source);
    video.classList.remove("is-playing");
  });
  listen(reduced, "change", sync);
  listen(mobile, "change", sync);
  listen(connection, "change", sync);
  listen(doc, "visibilitychange", sync);
  function enable() {
    const start = () => {
      ready = true;
      sync();
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(start, { timeout: 1800 });
      cancelStart = () => win.cancelIdleCallback(id);
    } else {
      const id = win.setTimeout(start, 200);
      cancelStart = () => win.clearTimeout(id);
    }
  }
  if (doc.readyState === "complete") enable();
  else listen(win, "load", enable);
  if (win.IntersectionObserver) {
    const observer = new win.IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      sync();
    });
    observer.observe(host);
    cleanups.push(() => observer.disconnect());
  }
  return {
    setPaused(value) {
      paused = value;
      sync();
    },
    destroy() {
      disposed = true;
      cancelStart();
      cleanups.forEach((cleanup) => cleanup());
      video.pause();
      video.classList.remove("is-playing");
      video.removeAttribute("src");
      video.load();
    },
  };
}
