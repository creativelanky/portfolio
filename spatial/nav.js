/* A black tab bar with a white pill that springs between tabs.
   · the pill's two edges are separate springs; the leading edge is stiffer, so the pill stretches as it travels,
     overshoots a touch and settles with a small bounce
   · it can be dragged along the bar (o.onOver fires as it crosses a tab) and, let go, snaps to the nearest tab (o.onPick)
   · o.hover: the pill follows the cursor and bounces back to the current tab when the cursor leaves
   The pill sits above the labels with mix-blend-mode:difference, so a label turns black wherever the pill covers it. */
(function(){
"use strict";
var REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

window.springNav = function(nav, o){
  o = o || {};
  var pill = document.createElement('i'); pill.className = 'pill'; pill.setAttribute('aria-hidden', 'true'); nav.appendChild(pill);
  function tabs(){ return [].slice.call(nav.querySelectorAll(o.tabs || 'a,button')); }
  tabs().forEach(function(t){ t.setAttribute('draggable', 'false'); });

  var L = { x: 0, v: 0, t: 0, k: 400 }, R = { x: 0, v: 0, t: 0, k: 400 }, A = { x: 0, v: 0, t: 0 };
  var home = null, shown = null, placed = false, raf = 0, last = 0, drag = null, hovering = false;

  function go(t){
    shown = t;
    if (!t) { A.t = 0; kick(); return; }
    var l = t.offsetLeft, r = l + t.offsetWidth, right = l + r > L.t + R.t;
    L.t = l; R.t = r; L.k = right ? 260 : 560; R.k = right ? 560 : 260; A.t = 1;
    if (!placed || REDUCE) { L.x = l; R.x = r; L.v = R.v = 0; if (!placed) A.x = 1; placed = true; }
    kick();
  }
  function spring(s, k, z, dt){ s.v += (-k * (s.x - s.t) - 2 * z * Math.sqrt(k) * s.v) * dt; s.x += s.v * dt; }
  function kick(){ if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function frame(now){
    raf = 0;
    var dt = Math.min(.032, (now - last) / 1000) / 2; last = now;
    for (var i = 0; i < 2; i++) { spring(L, L.k, .58, dt); spring(R, R.k, .58, dt); spring(A, 300, 1, dt); }   /* damping .58: one soft bounce */
    /* at either end of the bar the pill squashes against the edge instead of leaving it */
    var pad = 5, l = Math.max(pad, L.x), r = Math.min(nav.clientWidth - pad, R.x);
    pill.style.transform = 'translateX(' + l.toFixed(2) + 'px)';
    pill.style.width = Math.max(10, r - l).toFixed(2) + 'px';
    pill.style.opacity = Math.max(0, Math.min(1, A.x)).toFixed(3);
    var busy = [L, R, A].some(function(s){ return Math.abs(s.x - s.t) > .05 || Math.abs(s.v) > .05; });
    if (busy) raf = requestAnimationFrame(frame);
  }

  /* hover: the pill follows the cursor and returns home */
  if (o.hover && matchMedia('(hover:hover)').matches) {
    nav.addEventListener('pointerover', function(e){ var t = e.target.closest && e.target.closest(o.tabs || 'a,button'); if (t && !drag && tabs().indexOf(t) >= 0) { hovering = true; go(t); } });
    nav.addEventListener('pointerleave', function(){ hovering = false; if (!drag) go(home); });
  }

  /* drag: grab anywhere on the bar, slide, let go to snap */
  function under(x){
    var best = null, bd = 1e9;
    tabs().forEach(function(t){ var c = t.offsetLeft + t.offsetWidth / 2, d = Math.abs(c - x); if (d < bd) { bd = d; best = t; } });
    return best;
  }
  nav.addEventListener('pointerdown', function(e){
    if (e.button !== 0 || !tabs().length) return;
    var box = nav.getBoundingClientRect();
    drag = { id: e.pointerId, x0: e.clientX, left: box.left, on: false, over: null };
  });
  nav.addEventListener('pointermove', function(e){
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.on) {
      if (Math.abs(e.clientX - drag.x0) < 5) return;
      drag.on = true; nav.classList.add('dragging');
      try { nav.setPointerCapture(e.pointerId); } catch (_) {}
    }
    var x = e.clientX - drag.left, t = under(x), w = t ? t.offsetWidth : 60;
    /* the pill rides under the finger at the width of the tab it is over */
    L.t = x - w / 2; R.t = x + w / 2; L.k = R.k = 700; A.t = 1; shown = t; kick();
    if (t !== drag.over) { drag.over = t; if (o.onOver) o.onOver(t); }
  });
  function end(e){
    if (!drag || e.pointerId !== drag.id) return;
    var was = drag; drag = null; nav.classList.remove('dragging');
    if (!was.on) return;
    var t = under(e.clientX - was.left);
    go(t);
    if (o.onPick) o.onPick(t);
    /* a drag is not a click */
    function swallow(ev){ ev.preventDefault(); ev.stopPropagation(); }
    nav.addEventListener('click', swallow, true);
    setTimeout(function(){ nav.removeEventListener('click', swallow, true); }, 0);
    setTimeout(function(){ hovering = false; }, 0);
  }
  nav.addEventListener('pointerup', end);
  nav.addEventListener('pointercancel', end);

  addEventListener('resize', function(){ placed = false; go(shown); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ placed = false; go(shown); });

  return {
    /* the current tab: the pill goes there unless it is being dragged or hovered */
    set: function(t){ if (t === home) return; home = t; if (!drag && !hovering) go(t); },
    go: go,
    dragging: function(){ return !!(drag && drag.on); }
  };
};
})();
