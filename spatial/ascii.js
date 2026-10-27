/* ---------- the portrait in ASCII ----------
   The photo is sampled into a grid; each cell becomes a character whose density matches how dark that part of the
   photo is. When the portrait comes into view the characters scramble and settle, top to bottom. */
(function(){
"use strict";
  var box = document.getElementById('ascii'), cv = document.getElementById('asciiCv'), img = document.getElementById('asciiPhoto');
  if (!box) return;
  var ctx = cv.getContext('2d'), RAMP = "  .:-=+*#%@", SCRAMBLE = ".:-=+*#%@$&";   /* light to dark; the light end is blank so the background falls away */
  var REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches, grid = null, start = 0, played = false;
  function build(){
    var W = box.clientWidth, H = box.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
    if (!W || !img.naturalWidth) return;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var cols = Math.max(56, Math.min(120, Math.round(W / 5))), cw = W / cols, fs = cw / .6, rows = Math.round(H / (fs * .92)), ch = H / rows;
    /* sample the photo, cropped like object-fit: cover */
    var oc = document.createElement('canvas'); oc.width = cols; oc.height = rows;
    var o = oc.getContext('2d'), iw = img.naturalWidth, ih = img.naturalHeight, s = Math.max(cols / iw, rows / ih);
    o.drawImage(img, (cols - iw * s) / 2, (rows - ih * s) / 2, iw * s, ih * s);
    var px = o.getImageData(0, 0, cols, rows).data, L = [], i;
    for (i = 0; i < cols * rows; i++) L.push(.299 * px[i * 4] + .587 * px[i * 4 + 1] + .114 * px[i * 4 + 2]);
    /* local contrast (an unsharp mask): each cell is compared with its neighbourhood, so eyes, nose, mouth and the jaw
       stand out even where the whole face sits in a similar tone */
    var B = [], RAD = 3, x, y, dx, dy;
    for (y = 0; y < rows; y++) for (x = 0; x < cols; x++) {
      var sum = 0, n = 0;
      for (dy = -RAD; dy <= RAD; dy++) for (dx = -RAD; dx <= RAD; dx++) { var yy = y + dy, xx = x + dx; if (yy >= 0 && yy < rows && xx >= 0 && xx < cols) { sum += L[yy * cols + xx]; n++; } }
      B.push(sum / n);
    }
    for (i = 0; i < L.length; i++) L[i] = L[i] + 1.8 * (L[i] - B[i]);
    /* histogram equalisation: tones are spread evenly across the characters, so the face gets the whole scale
       instead of only the darkest few */
    var order = L.map(function(v, j){ return j; }).sort(function(a, b){ return L[a] - L[b]; }), rank = new Array(L.length);
    for (i = 0; i < order.length; i++) rank[order[i]] = i / (order.length - 1);
    grid = { cols: cols, rows: rows, cw: cw, ch: ch, fs: fs, chars: [], tone: [] };
    for (i = 0; i < L.length; i++) {
      var d = Math.pow(1 - rank[i], 1.35);   /* 0 light … 1 dark */
      grid.chars.push(RAMP[Math.min(RAMP.length - 1, Math.round(d * (RAMP.length - 1)))]);
      grid.tone.push(d);
    }
    draw(REDUCE || played ? 2 : 0);
  }
  /* t: seconds into the reveal (anything past ~1.6 is the settled portrait) */
  function draw(t){
    var g = grid; if (!g) return;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.font = '500 ' + g.fs.toFixed(2) + 'px Geist, sans-serif'; ctx.textBaseline = 'top'; ctx.textAlign = 'center';   /* each character centred in its own cell keeps the grid */
    for (var r = 0; r < g.rows; r++) for (var c = 0; c < g.cols; c++) {
      var k = r * g.cols + c, ch = g.chars[k];
      var due = .15 + (r / g.rows) * 1.1 + ((c * 7919 + r * 104729) % 97) / 97 * .25;   /* top to bottom, a little ragged */
      if (t < due) { if (t < due - .45 || g.tone[k] < .08) continue; ch = SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]; }
      if (ch === ' ') continue;
      ctx.fillStyle = 'rgba(24,24,27,' + (.45 + .55 * g.tone[k]).toFixed(2) + ')';
      ctx.fillText(ch, (c + .5) * g.cw, r * g.ch);
    }
  }
  function play(){
    if (played || REDUCE) return; played = true; start = performance.now();
    (function tick(now){ var t = (now - start) / 1000; draw(t); if (t < 1.8) requestAnimationFrame(tick); })(start);
  }
  function ready(){
    build();
    if ('IntersectionObserver' in window) new IntersectionObserver(function(es, io){ if (es[0].isIntersecting) { play(); io.disconnect(); } }, { threshold: .3 }).observe(box);
    else play();
  }
  var fontsReady = document.fonts ? document.fonts.load('500 12px Geist') : Promise.resolve();
  Promise.all([fontsReady, img.decode ? img.decode().catch(function(){}) : Promise.resolve()]).then(ready);
  var rt; addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(build, 150); });
  /* a lens that shows the real photo under the cursor */
  box.addEventListener('pointermove', function(e){
    var r = box.getBoundingClientRect();
    cv.style.setProperty('--mx', (e.clientX - r.left) + 'px'); cv.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
  box.addEventListener('pointerenter', function(){ cv.style.setProperty('--lens', Math.round(box.clientWidth * .28) + 'px'); });
  box.addEventListener('pointerleave', function(){ cv.style.setProperty('--lens', '0px'); });
})();
