/* ── CURSOR ────────────────────────────────────────────────── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cur && curR) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * .1;
    ry += (my - ry) * .1;
    curR.style.left = rx + 'px';
    curR.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();
}

/* ── NAV STUCK STATE ───────────────────────────────────────── */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', scrollY > 60);
  });
}

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: .07, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.rv').forEach(el => ro.observe(el));

/* ── HERO ENTRANCE (homepage only) ────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  ['.hero-kicker', '.hero-hl', '.hero-tagline', '.hero-pain-bar', '.hero-actions', '.hero-meta']
    .forEach((s, i) => {
      const el = document.querySelector(s);
      if (!el) return;
      el.style.cssText = `opacity:0;transform:translateY(20px);transition:opacity .8s ease ${i * .13}s,transform .8s ease ${i * .13}s`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }));
    });
});
