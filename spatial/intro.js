/* The opening of the normal home page: the name in particles, which plays on its own.
   · the grains drift in from all around and settle into "Triumph"
   · after a moment they blow apart, each in its own direction, and the page shows through as they go
   · it plays once per visit; "Skip intro", a click, a key or a scroll hurries it along
   runIntro(done) calls done as the page starts to show, so the page's own reveals play then. */
(function(){
"use strict";
window.runIntro = function(done){
  var el = document.getElementById('intro'), REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches, seen = false;
  try { seen = sessionStorage.getItem('introSeen') === '1'; sessionStorage.setItem('introSeen', '1'); } catch (e) {}
  if (!el || REDUCE || seen || location.hash) { if (el) el.remove(); done(); return; }

  var cv = el.querySelector('canvas'), ctx = cv.getContext('2d'), sub = document.getElementById('introSub'), cue = document.getElementById('introCue');
  if (cue) cue.remove();
  el.classList.add('auto');
  var root = document.documentElement; root.style.overflow = 'hidden';
  var W = 0, H = 0, DPR = Math.min(2, devicePixelRatio || 1), P = [], step = 4, ink = getComputedStyle(root).getPropertyValue('--text').trim() || '#18181b';
  var t0 = 0, hurry = 0, called = false, gone = false;
  /* the timeline, in seconds: gather until GATHER, hold, blow apart from BLOW to END */
  var GATHER = 1, BLOW = 1.7, END = 3.2;
  function ss(a, b, x){ x = Math.max(0, Math.min(1, (x - a) / (b - a))); return x * x * (3 - 2 * x); }

  function build(){
    W = innerWidth; H = innerHeight;
    if (!W || !H) return;
    cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var FONT = 'px "Helvetica Neue", Helvetica, Inter, Arial, sans-serif', oc = document.createElement('canvas'), g = oc.getContext('2d');
    oc.width = W; oc.height = H;
    g.font = '600 100' + FONT;
    var fs = Math.min(300, 100 * W * (W < 700 ? .88 : .72) / g.measureText('Triumph').width);
    g.font = '600 ' + fs + FONT; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#000';
    g.fillText('Triumph', W / 2, H * .44);
    var px = g.getImageData(0, 0, W, H).data;
    step = Math.max(2, Math.round(fs / 62)); P = [];
    for (var y = 0; y < H; y += step) for (var x = 0; x < W; x += step) {
      if (px[(y * W + x) * 4 + 3] < 128) continue;
      var a = Math.random() * 6.283, s = .35 + Math.random(), b = Math.random() * 6.283, r = .6 + Math.random() * .8;
      P.push({ hx: x + (Math.random() - .5) * step * .8, hy: y + (Math.random() - .5) * step * .8, c: Math.random() < .14, sz: step * (.35 + Math.random() * .45),
        fx: Math.cos(b) * r, fy: Math.sin(b) * r,          /* where it comes in from */
        ax: Math.cos(a) * s, ay: Math.sin(a) * s - .7,     /* where it drifts off to */
        n: Math.random() * 6.283, z: .5 + Math.random() * .8, d: Math.random() * .35 });
    }
    if (sub) sub.style.top = (H * .44 + fs * .6) + 'px';
  }

  function frame(now){
    if (gone) return;
    if (!t0) t0 = now;
    if (!P.length) build();
    var t = (now - t0) / 1000 + hurry;
    ctx.clearRect(0, 0, W, H);
    var blow = ss(BLOW, END - .3, t);
    for (var i = 0; i < P.length; i++) {
      var p = P[i], gin = ss(p.d, p.d + GATHER * .75, t), e = 1 - gin;
      /* coming in: from a scattered spot onto the letter; going out: drifting off and fading */
      var x = p.hx + p.fx * W * .45 * e * p.z + (p.ax * W * .5 + Math.sin(t * 1.2 + p.n) * 40) * blow * p.z;
      var y = p.hy + p.fy * H * .45 * e * p.z + p.ay * H * .55 * blow * p.z;
      var a = gin * (1 - blow) * (.75 + .25 * Math.sin(t * 2 + p.n));
      if (a < .02) continue;
      ctx.globalAlpha = a; ctx.fillStyle = p.c ? '#5b3fd6' : ink;
      ctx.fillRect(x, y, p.sz, p.sz);
    }
    ctx.globalAlpha = 1;
    if (sub) sub.style.opacity = (ss(.5, 1.1, t) * (1 - ss(BLOW, BLOW + .5, t))).toFixed(3);
    /* the page shows through as the name blows apart */
    el.style.backgroundColor = 'rgba(var(--bg-rgb),' + (1 - ss(BLOW + .3, END, t)).toFixed(3) + ')';
    if (!called && t > BLOW + .5) { called = true; root.style.overflow = ''; done(); }
    if (t < END) requestAnimationFrame(frame);
    else finish();
  }
  function finish(){ gone = true; el.remove(); root.style.overflow = ''; if (!called) { called = true; done(); } }
  function speed(){ if (t0) hurry = Math.max(hurry, BLOW - (performance.now() - t0) / 1000); }
  var skip = document.getElementById('introSkip'); if (skip) skip.addEventListener('click', speed);
  el.addEventListener('pointerdown', speed);
  addEventListener('keydown', speed, { once: true });
  addEventListener('wheel', speed, { once: true, passive: true });
  addEventListener('resize', build);
  build();
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function(){ requestAnimationFrame(frame); });
  /* if the browser isn't drawing frames (a background tab), don't hold the page: show it as it is */
  setTimeout(function(){ if (!t0) finish(); }, 4000);
};
})();
