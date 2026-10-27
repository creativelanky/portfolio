/* Motion shared by the case and about pages (the room has its own).
   · .rv / .mask   reveal once when they enter the viewport (fade-up, or lines sliding out of a mask)
   · .stmt         a statement whose words scrub from pale to ink as you scroll
   · [data-to]     numbers that count up once their group is revealed */
(function(){
"use strict";
var REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- reveal on entry ---------- */
function watch(){
  var els = [].slice.call(document.querySelectorAll('.rv:not(.shown), .mask:not(.shown), .countup:not(.shown):not([data-after])'));
  if (REDUCE || !('IntersectionObserver' in window)) { els.forEach(function(el){ el.classList.add('shown'); if (el.classList.contains('countup')) count(el); }); return; }
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){
    if (!e.isIntersecting) return;
    e.target.classList.add('shown'); io.unobserve(e.target);
    if (e.target.classList.contains('countup')) count(e.target);
  }); }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(function(el){ io.observe(el); });
}

/* ---------- numbers count up once ---------- */
function count(group){
  var nums = [].slice.call(group.querySelectorAll('[data-to]'));
  if (REDUCE) { nums.forEach(function(n){ n.firstChild.nodeValue = n.getAttribute('data-to'); }); return; }
  var t0 = performance.now(), dur = 1100;
  (function tick(now){
    var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    nums.forEach(function(n){ n.firstChild.nodeValue = Math.round(+n.getAttribute('data-to') * e); });
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}

/* ---------- statements scrub word by word with scroll ----------
   data-scrub="sticky": the statement sits in a tall section and fills as you scroll through it.
   otherwise: it fills as it travels up through the middle of the screen. */
function splitWords(el){
  var out = [];
  [].slice.call(el.childNodes).forEach(function(n){
    if (n.nodeType === 3) {
      var frag = document.createDocumentFragment();
      n.nodeValue.split(/(\s+)/).forEach(function(part){
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var w = document.createElement('span'); w.className = 'w'; w.textContent = part; frag.appendChild(w); out.push(w);
      });
      el.replaceChild(frag, n);
    } else if (n.nodeType === 1) { n.classList.add('w'); out.push(n); }
  });
  return out;
}
var STMTS = [].slice.call(document.querySelectorAll('.stmt')).map(function(el){
  var box = el.getAttribute('data-scrub') === 'sticky' ? el.closest('.stmt-sec') : null;
  return { el: el, box: box, words: splitWords(el), after: box ? [].slice.call(box.querySelectorAll('[data-after]')) : [] };
});
var raf = 0;
function scrub(){
  raf = 0;
  STMTS.forEach(function(s){
    var p, FIN = s.box ? .62 : 1;
    if (s.box) { var r = s.box.getBoundingClientRect(), span = r.height - innerHeight; p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1; }
    else { var q = s.el.getBoundingClientRect(); p = Math.min(1, Math.max(0, (innerHeight * .88 - q.top) / (innerHeight * .55))); }
    if (REDUCE) p = 1;
    var N = s.words.length, pos = (p / FIN) * (N + 1.5);
    for (var i = 0; i < N; i++) s.words[i].style.setProperty('--o', (0.14 + 0.86 * Math.min(1, Math.max(0, (pos - i) / 1.5))).toFixed(3));
    /* what follows the statement (a sign-off, the stats) arrives once it has been read */
    s.after.forEach(function(a){ var on = p > FIN + .02; if (on && !a.classList.contains('shown')) { a.classList.add('shown'); if (a.classList.contains('countup')) count(a); } });
  });
}
function onScroll(){ if (!raf) raf = requestAnimationFrame(scrub); }
if (STMTS.length) { addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); scrub(); }

/* ---------- the top bar: the pill follows the cursor, rests on this page, and can be dragged onto another ---------- */
var bar = document.querySelector('.navpill');
if (bar && window.springNav) springNav(bar, { tabs: 'a:not(.tm)', hover: true, onPick: function(t){ if (t) t.click(); } }).set(bar.querySelector('a.on'));

/* ---------- footer: copy the email ---------- */
document.addEventListener('click', function(e){
  var b = e.target.closest('[data-copy]'); if (!b) return;
  var done = function(){ b.textContent = 'Copied'; setTimeout(function(){ b.textContent = 'Copy'; }, 1600); };
  if (navigator.clipboard) navigator.clipboard.writeText(b.getAttribute('data-copy')).then(done, done); else done();
});
document.addEventListener('click', function(e){ if (e.target.closest('[data-top]')) { e.preventDefault(); scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' }); } });

/* ---------- inside the room's window ----------
   Links back to the room close the window instead of reloading it; links to another page stay in the window. */
var EMBED = document.documentElement.classList.contains('embed') && window.parent !== window;
function here(){ return location.pathname.split('/').pop() + location.search.replace(/[?&]embed=1/, '').replace(/^&/, '?'); }
if (EMBED) {
  window.parent.postMessage({ type: 'page', href: here() }, '*');
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href]'); if (!a || a.target === '_blank') return;
    var href = a.getAttribute('href');
    if (/^index\.html/.test(href)) { e.preventDefault(); window.parent.postMessage({ type: 'room', hash: href.split('#')[1] || '' }, '*'); }
    else if (/^(case|about)\.html/.test(href)) { e.preventDefault(); location.replace(href + (href.indexOf('?') < 0 ? '?' : '&') + 'embed=1'); }
  });
}

window.siteWatch = watch;
watch();
})();
