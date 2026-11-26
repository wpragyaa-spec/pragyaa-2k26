// PRAGYA page loader: drives <sakuga-progress> (progress.js, loaded just before this file) from real
// page-load signals. Plain script, not a module.
//
// Progress = finished tasks / registered tasks. Tasks are: the HTML being parsed, web fonts, every
// eager <img> found in the page, the window "load" event, plus anything the page registers itself:
//
//   PragyaLoader.add(n) / PragyaLoader.done(n)   register / complete n tasks
//   PragyaLoader.track(promise)                  one task that completes when the promise settles
//   PragyaLoader.finish()                        give up waiting, complete now
//   PragyaLoader.whenDone(fn)                    run fn after sakuga:done (or now, if already done)
//
// When every task is done the bar is set to 1; on sakuga:done the overlay fades out and is removed.
// Clicking a same-site link shows the loader again (reset to 0) while the next page loads.
(() => {
  const host = document.getElementById('sk-loader');
  const bar = host && host.querySelector('sakuga-progress');
  const waiters = [];
  let isDone = false;
  const runWaiters = () => { isDone = true; waiters.splice(0).forEach((fn) => { try { fn(); } catch (e) { console.error(e); } }); };

  // progress.js missing or failed: never block the page.
  if (!host || !bar || !customElements.get('sakuga-progress') || typeof bar.set !== 'function') {
    if (host) host.remove();
    window.PragyaLoader = { add() {}, done() {}, track: (p) => p, finish() {}, whenDone: (fn) => fn(), navigate: (u) => { location.href = u; } };
    isDone = true;
    return;
  }

  // Doomsday theme for the canvas effects: emerald instead of pink. Only the colour changes.
  if (window.SakugaFX && SakugaFX.P) SakugaFX.P.accent = '#00ff88';

  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let total = 0, completed = 0, shown = 0, finished = false;

  function update() {
    if (finished) return;
    const ratio = total ? completed / total : 0;
    // never go backwards when a late task is registered; 1 is reserved for "really finished"
    shown = Math.max(shown, Math.min(0.99, ratio));
    bar.set(shown, calm);
    if (total && completed >= total) complete();
  }
  function complete() {
    if (finished) return;
    finished = true;
    bar.set(1, calm);   // sakuga:done fires when the bar reaches the end
  }

  const api = window.PragyaLoader = {
    add(n = 1) { if (!finished) { total += n; update(); } },
    done(n = 1) { if (!finished) { completed = Math.min(total, completed + n); update(); } },
    track(p) { api.add(); const end = () => api.done(); Promise.resolve(p).then(end, end); return p; },
    finish: complete,
    whenDone(fn) { if (isDone) fn(); else waiters.push(fn); },
    navigate(url) { showForNavigation(); location.href = url; },
  };

  // ── real load signals ──
  const seen = new WeakSet();
  function trackImages() {
    for (const img of document.images) {
      if (seen.has(img)) continue; seen.add(img);
      if (img.complete || img.loading === 'lazy') continue;
      api.track(new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); }));
    }
  }
  if (document.readyState === 'loading') {
    api.add();
    document.addEventListener('DOMContentLoaded', () => { trackImages(); requestAnimationFrame(trackImages); api.done(); }, { once: true });
  }
  if (document.fonts && document.fonts.ready) api.track(document.fonts.ready);
  if (document.readyState !== 'complete') {
    api.add();
    addEventListener('load', () => api.done(), { once: true });
  }
  update();
  // a stalled request must not trap the visitor behind the loader
  setTimeout(complete, 15000);

  // ── hide on done ──
  let hideTimer = 0;
  bar.addEventListener('sakuga:done', () => {
    runWaiters();
    // let ドン! and the check land before fading (no effects under reduced motion)
    hideTimer = setTimeout(hide, calm ? 0 : 650);
  });
  function hide() {
    clearTimeout(hideTimer);
    if (!host.isConnected) return;
    host.classList.add('sk-out');
    setTimeout(() => { if (host.classList.contains('sk-out')) host.remove(); }, calm ? 0 : 420);
  }

  // ── page navigation ──
  let navTimer = 0;
  function showForNavigation() {
    clearTimeout(hideTimer); clearTimeout(navTimer);
    host.classList.remove('sk-out');
    if (!host.isConnected) document.body.prepend(host);
    bar.reset();
    // navigation cancelled (Stop / Esc): don't leave the overlay up over the old page
    navTimer = setTimeout(hide, 12000);
  }
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target instanceof Element && e.target.closest('a[href]');
    if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self')) return;
    let url; try { url = new URL(a.href, location.href); } catch { return; }
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (url.pathname === location.pathname && url.search === location.search) return;   // same page / hash link
    showForNavigation();
  });
  // back/forward from the bfcache: the page is already loaded
  addEventListener('pageshow', (e) => { if (e.persisted) { clearTimeout(navTimer); hide(); } });
})();
