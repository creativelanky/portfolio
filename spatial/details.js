/* The small things, on every page.
   · button labels roll up to a fresh copy of themselves on hover
   · a trailing arrow (↗ → ↑) nudges in its direction
   · Lagos time, with a ticking colon, wherever [data-lagos] appears
   · on the case and about pages, a round "View" cursor over screens you can open */
(function(){
"use strict";
var REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

function decorate(root){
  [].forEach.call(root.querySelectorAll('.btn:not([data-rolled])'), function(b){
    b.setAttribute('data-rolled', '');
    if (b.children.length || !b.textContent.trim()) return;
    var t = b.textContent.trim(), m = /\s*([↗→↑←])$/.exec(t), label = m ? t.slice(0, m.index) : t;
    b.innerHTML = '<span class="roll" data-t="' + label.replace(/"/g, '&quot;') + '"><span>' + label + '</span></span>' + (m ? ' <i class="arr">' + m[1] + '</i>' : '');
  });
  [].forEach.call(root.querySelectorAll('a:not(.btn):not([data-rolled])'), function(a){
    a.setAttribute('data-rolled', '');
    var n = a.lastChild;
    if (!n || n.nodeType !== 3) return;
    var m = /\s*([↗→↑])\s*$/.exec(n.nodeValue); if (!m) return;
    n.nodeValue = n.nodeValue.slice(0, m.index) + ' ';
    var i = document.createElement('i'); i.className = 'arr'; i.textContent = m[1]; a.appendChild(i);
  });
}
decorate(document);
window.decorate = decorate;

/* Lagos time */
function lagos(){
  var t = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()).split(':');
  [].forEach.call(document.querySelectorAll('[data-lagos]'), function(el){ el.innerHTML = t[0] + '<i>:</i>' + t[1]; });
}
if (document.querySelector('[data-lagos]')) { lagos(); setInterval(lagos, 20000); }

/* ---------- the meter: a ruler along the top edge ----------
   A marker rides along it; the ticks near the marker grow and take its colour, like a lens passing over a scale.
   The room reports your heading with meter(fraction, label); a page reports how far you've scrolled. */
var mcv = document.createElement('canvas'); mcv.className = 'meter'; mcv.setAttribute('aria-hidden', 'true'); document.body.appendChild(mcv);
var mx = mcv.getContext('2d'), MW = 0, MDPR = Math.min(2, devicePixelRatio || 1), mPos = -1, mShown = -1, mLabel = '', mRaf = 0;
var INK = 'rgba(24,24,27,', ACC = [91, 63, 214];
function msize(){ MW = innerWidth; mcv.width = MW * MDPR; mcv.height = 30 * MDPR; mx.setTransform(MDPR, 0, 0, MDPR, 0, 0); mShown = -1; mdraw(); }
function mdraw(){
  mRaf = 0;
  if (mPos < 0) return;
  /* the marker eases toward where it should be */
  mShown = mShown < 0 || REDUCE || Math.abs(mPos - mShown) > .5 ? mPos : mShown + (mPos - mShown) * .25;   /* turning past the back wall wraps round */
  if (Math.abs(mPos - mShown) * MW < .2) mShown = mPos; else mRaf = requestAnimationFrame(mdraw);
  var x0 = mShown * MW, GAP = 8, n = Math.ceil(MW / GAP);
  mx.clearRect(0, 0, MW, 30);
  for (var i = 0; i <= n; i++) {
    var x = i * GAP + .5, d = (x - x0) / 46, k = Math.exp(-d * d);   /* k: 1 under the marker, 0 far away */
    var len = (i % 10 === 0 ? 9 : i % 5 === 0 ? 6 : 3.5) + k * 9;
    mx.strokeStyle = k > .05 ? 'rgba(' + ACC.join(',') + ',' + (.25 + .6 * k).toFixed(2) + ')' : INK + (i % 10 === 0 ? '.32)' : '.16)');
    mx.beginPath(); mx.moveTo(x, 0); mx.lineTo(x, len); mx.stroke();
  }
  mx.fillStyle = 'rgb(' + ACC.join(',') + ')';
  mx.beginPath(); mx.moveTo(x0 - 4, 0); mx.lineTo(x0 + 4, 0); mx.lineTo(x0, 5); mx.fill();
  mx.fillRect(Math.round(x0), 0, 1, 22);
  if (mLabel) {
    mx.font = '500 11px Geist, sans-serif'; mx.textBaseline = 'alphabetic';
    var w = mx.measureText(mLabel).width, right = x0 + 6 + w < MW - 8;
    mx.textAlign = right ? 'left' : 'right'; mx.fillText(mLabel, right ? x0 + 6 : x0 - 6, 22);
  }
}
window.meter = function(f, label){
  f = Math.max(0, Math.min(1, f));
  if (Math.abs(f - mPos) * MW < .1 && label === mLabel) return;
  mPos = f; mLabel = label || '';
  if (!mRaf) mRaf = requestAnimationFrame(mdraw);
};
msize(); addEventListener('resize', msize);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ mShown = -1; mdraw(); });
/* on a page, the meter is how far you've read */
if (!document.querySelector('.stage')) {
  mcv.classList.add('on-page');
  var mscroll = function(){
    var max = document.documentElement.scrollHeight - innerHeight, f = max > 0 ? scrollY / max : 0;
    meter(f, Math.round(f * 100) + '%');
  };
  addEventListener('scroll', mscroll, { passive: true }); addEventListener('resize', mscroll); mscroll();
}

/* the View cursor (not in the room, which has its own) */
if (REDUCE || document.querySelector('.stage') || !matchMedia('(pointer:fine)').matches) return;
var cur = document.createElement('div'); cur.className = 'vcur'; cur.innerHTML = '<span>View</span>'; document.body.appendChild(cur);
var x = 0, y = 0, cx = 0, cy = 0, on = false, raf = 0;
function tick(){
  cx += (x - cx) * .22; cy += (y - cy) * .22;
  cur.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px)';
  raf = Math.abs(x - cx) + Math.abs(y - cy) > .3 ? requestAnimationFrame(tick) : 0;
}
addEventListener('pointermove', function(e){
  x = e.clientX; y = e.clientY;
  var t = e.target.closest && e.target.closest('[data-view], .fwin, .next-wrap .pcard');
  if (!on && t) { cx = x; cy = y; }
  if (!!t !== on) { on = !!t; cur.classList.toggle('on', on); }
  if (t) cur.firstChild.textContent = t.getAttribute('data-view') || (t.classList.contains('pcard') ? 'Open' : 'View');
  if (!raf) raf = requestAnimationFrame(tick);
}, { passive: true });
document.addEventListener('pointerleave', function(){ on = false; cur.classList.remove('on'); });
})();
