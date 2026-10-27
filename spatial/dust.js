/* The portrait as dust, on the phone home page. Same idea as the name in the room's intro:
   · the photo is sampled into grains, each one the colour of the photo under it; the bright background is left out
   · when the portrait comes into view the grains drift in from all around and settle into the face
   · a finger pushes grains away and they float back, like dust settling
   · scrolling it off the top lets the grains drift off, each in its own direction, and scrolling back gathers them again */
(function(){
"use strict";
var box = document.getElementById('dust'); if (!box) return;
var cv = box.querySelector('canvas'), ctx = cv.getContext('2d'), img = new Image();
var REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
var W = 0, H = 0, DPR = Math.min(2, devicePixelRatio || 1), P = [], step = 4, raf = 0, last = 0, born = -1, seen = false;
var touch = { x: -1e4, y: -1e4 };
function ss(a, b, x){ x = Math.max(0, Math.min(1, (x - a) / (b - a))); return x * x * (3 - 2 * x); }

function build(){
  W = box.clientWidth; H = box.clientHeight;
  if (!W || !img.naturalWidth) return;
  cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  step = Math.max(2.6, W / 112);
  /* sample the photo, cropped like object-fit: cover */
  var cols = Math.ceil(W / step), rows = Math.ceil(H / step), oc = document.createElement('canvas'); oc.width = cols; oc.height = rows;
  var o = oc.getContext('2d'), iw = img.naturalWidth, ih = img.naturalHeight, s = Math.max(cols / iw, rows / ih);
  o.drawImage(img, (cols - iw * s) / 2, (rows - ih * s) / 2, iw * s, ih * s);
  var px = o.getImageData(0, 0, cols, rows).data;
  P = [];
  for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
    var k = (r * cols + c) * 4, R = px[k], G = px[k + 1], B = px[k + 2], L = .299 * R + .587 * G + .114 * B;
    /* the face floats: grains thin out toward the edges of the card, and the ones out there are blown a little
       further out, so the portrait looks like it is already coming apart at its rim. Near-white pillow is dropped. */
    var u = (c / cols - .52) / .52, v = (r / rows - .46) / .6, rad = Math.sqrt(u * u + v * v);
    var keep = (L < 215 ? 1 : L < 240 ? (240 - L) / 25 : 0) * (1 - ss(.55, 1.05, rad));
    if (Math.random() > keep) continue;
    var a = Math.random() * 6.283, sp = .4 + Math.random(), blow = Math.max(0, rad - .6) * step * 6 * Math.random();
    P.push({
      hx: (c + .5) * step + (Math.random() - .5) * step * .3 + u * blow, hy: (r + .5) * step + (Math.random() - .5) * step * .3 + v * blow,
      ox: 0, oy: 0, vx: 0, vy: 0,
      col: Math.random() < .006 ? '91,63,214' : R + ',' + G + ',' + B,   /* a few grains of brand purple, like the intro */
      sz: step * (.8 + (1 - L / 255) * .3) * (1 - Math.max(0, rad - .55) * .7),
      ax: Math.cos(a) * sp, ay: Math.sin(a) * sp - .8,   /* where it drifts when the portrait disperses */
      n: Math.random() * 6.283, z: .5 + Math.random() * .9,
      d: Math.random() * .55 + (r / rows) * .35   /* when it arrives: a ragged sweep from the top */
    });
  }
  kick();
}

/* how far the portrait has left: 0 while it is on screen, 1 once it has scrolled off the top */
function gone(){
  var b = box.getBoundingClientRect();
  return ss(innerHeight * .1, -b.height * .55, b.top);
}

function frame(t){
  raf = 0;
  var dt = Math.min(.05, last ? (t - last) / 1000 : .016); last = t;
  var g = REDUCE ? 0 : gone(), age = born < 0 ? 0 : (t - born) / 1000, busy = g > 0 && g < 1;
  ctx.clearRect(0, 0, W, H);
  var CR = Math.max(60, step * 16), CR2 = CR * CR, K = 7, C = 2 * Math.sqrt(K) * .5;
  for (var i = 0; i < P.length; i++) {
    var p = P[i];
    /* arriving: each grain flies in from its scattered spot over about a second */
    var inn = REDUCE ? 1 : born < 0 ? 0 : ss(p.d, p.d + .9, age);
    if (inn < 1) busy = true;
    var x = p.hx + p.ox, y = p.hy + p.oy, dx = x - touch.x, dy = y - touch.y, d2 = dx * dx + dy * dy;
    if (d2 < CR2) {
      var d = Math.sqrt(d2) + .1, f = 1 - d / CR; f *= f;
      p.vx += (dx / d * 1800 * f + (Math.random() - .5) * 1400 * f) * dt;
      p.vy += (dy / d * 1800 * f + (Math.random() - .5) * 1400 * f - 500 * f) * dt;
    }
    p.vx += (-K * p.ox - C * p.vx) * dt; p.vy += (-K * p.oy - C * p.vy) * dt;
    p.ox += p.vx * dt; p.oy += p.vy * dt;
    if (Math.abs(p.ox) + Math.abs(p.oy) > .1 || Math.abs(p.vx) + Math.abs(p.vy) > .1) busy = true;
    /* scattered = not yet arrived, or drifting off as the portrait scrolls away */
    var e = Math.max(1 - inn, g), sx = (p.ax * W * .7 + Math.sin(t * .0012 + p.n) * 18) * e * p.z, sy = p.ay * H * .6 * e * p.z;
    var a = (1 - e * .9) * (inn * .9 + .1);
    if (a < .02) continue;
    ctx.globalAlpha = a;
    ctx.fillStyle = 'rgb(' + p.col + ')';
    ctx.fillRect(x + sx, y + sy, p.sz, p.sz);
  }
  ctx.globalAlpha = 1;
  if (busy || (touch.x > -1e4)) raf = requestAnimationFrame(frame);
}
function kick(){ if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }

/* a finger on the portrait pushes the grains; it does not stop the page from scrolling */
function at(e){ var b = box.getBoundingClientRect(), q = e.touches ? e.touches[0] : e; touch.x = q.clientX - b.left; touch.y = q.clientY - b.top; kick(); }
function off(){ touch.x = touch.y = -1e4; kick(); }
box.addEventListener('touchstart', at, { passive: true });
box.addEventListener('touchmove', at, { passive: true });
box.addEventListener('touchend', off);
box.addEventListener('pointermove', function(e){ if (e.pointerType === 'mouse') at(e); });
box.addEventListener('pointerleave', off);
addEventListener('scroll', kick, { passive: true });
var rt; addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(build, 150); });

if ('IntersectionObserver' in window) new IntersectionObserver(function(es, io){
  if (es[0].isIntersecting && !seen) { seen = true; born = performance.now(); kick(); io.disconnect(); }
}, { threshold: .25 }).observe(box);
else { seen = true; born = performance.now(); }

img.onload = build;
img.src = box.getAttribute('data-src');
})();
