/* The home page in normal mode (the default, on every screen; spatial mode is the room).
   One scroll: who I am, the work, a row of loops, a short about and the footer. Case studies open as normal pages.
   The Spatial switch in the nav steps into the room instead. */
(function(){
"use strict";
if (!window.MOBILE) return;

/* take the room out, so nothing of it loads or runs */
['stage', 'hint', 'toplinks', 'orn', 'detail', 'portal', 'gaze', 'intro'].forEach(function(id){ var n = document.getElementById(id); if (n) n.remove(); });
var b = document.querySelector('.brand'); if (b) b.remove();
document.body.className = 'mhome';
var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'case.css?v=h12'; document.head.appendChild(css);

function th(f){ return 'thumbs/' + encodeURI(f); }
function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
/* the playground pieces marked "show on home" in the CMS; before anything is saved, these nine */
var PICK = ['eikos-01-feed', '01-balance', '02-leave-types', 'eikos-03-buy', '03-network', '03-cee-books-leave', 'eikos-06-ask', '04-send', '05-sign-contract'];
var loops = PLAYGROUND.filter(function(g){ return g.home; });
if (!loops.length) loops = PICK.map(function(k){ return PLAYGROUND.filter(function(g){ return g.loop === k; })[0]; }).filter(Boolean);

/* where I've worked: logo, company, role, dates and where — nothing more */
function experienceHTML(){
  return '<ul class="xp m-xp">' + (window.EXPERIENCE || []).map(function(x){
    return '<li class="rv"><span class="lg" style="background:' + x.bg + '">' + (x.logo ? '<img src="' + x.logo + '" alt="">' : esc(x.mark)) + '</span>' +
      '<h3>' + esc(x.co) + ' <span>· ' + esc(x.role) + '</span>' + (x.was ? '<small>formerly ' + esc(x.was) + '</small>' : '') + '</h3>' +
      '<span class="when">' + esc(x.when) + '<br>' + esc(x.where) + '</span></li>';
  }).join('') + '</ul>';
}

/* everyone I've designed for, drifting past; the row is doubled so it loops without a seam */
function logosHTML(){
  var row = (window.CLIENTS || []).map(function(c){
    return '<span class="lw-i"><span class="lw-m" style="background:' + (c.bg || '#111') + '">' + (c.logo ? '<img src="' + c.logo + '" alt="">' : esc(c.mark)) + '</span>' + esc(c.n) + '</span>';
  }).join('');
  return '<div class="lw rv" aria-label="Teams I’ve designed for: ' + esc((window.CLIENTS || []).map(function(c){ return c.n; }).join(', ')) + '"><div class="lw-t" aria-hidden="true">' + row + row + '</div></div>';
}

/* what I do and what I do it with, kept short and unlabelled */
function skillsHTML(){
  return '<div class="sk rv"><p class="sk-l">' + SKILLS.map(function(k){ return '<span>' + k + '</span>'; }).join('') + '</p>' +
    '<div class="sk-row">' + toolsHTML('sk-tools') + aiNoteHTML('sk-ai') + '</div></div>';
}

var m = document.createElement('main'); m.className = 'm';
m.innerHTML = navHTML('home') +
  /* the first two sections of the about page: who I am with the portrait, then the statement and the numbers */
  '<header class="ab-hero m-ab">' +
    '<div>' +
      '<p class="m-who"><img src="' + th('photo-3.jpg') + '" alt=""><span><b>Triumph Ohwojeheri</b>Product designer, Lagos</span></p>' +
      '<h1 class="mask"><span class="ln"><span>I design products</span></span><span class="ln"><span>that make <em>complex</em></span></span><span class="ln"><span>things feel simple.</span></span></h1>' +
      '<p class="lead rv">I’m Triumph, a product designer in Lagos with 4+ years of experience across fintech, Web3, DeFi, AI and SaaS. I work end to end, from research and user flows to high-fidelity UI, prototypes and design systems, and I’ve led zero-to-one design for trading, payments and decentralised apps. On the side, I vibe-code my designs to life.</p>' +
      companiesHTML() +
      '<div class="m-row rv"><a class="btn pri" href="#work">View work</a><a class="btn" href="mailto:triumphohwojeheri@gmail.com">Email me</a></div>' +
      '<p class="avail m-avail"><i></i>Available for select projects</p>' +
    '</div>' +
    '<div class="ab-photo ab-bust rv">' +
      '<div class="bust" id="bust" data-bust role="img" aria-label="Chrome bust of Triumph Ohwojeheri" data-src="img/bust-3.glb?v=2" data-paint="img/bust-paint-3.jpg" data-frame="196,830,62,950" data-strength=".6" data-hair="205,335,690,425"></div></div>' +
  '</header>' +
  '<dl class="ab-facts rv">' +
    '<div><dt>Experience</dt><dd>4+ years</dd></div><div><dt>Focus</dt><dd>Web3, fintech, AI, SaaS</dd></div>' +
    '<div><dt>Based in</dt><dd>Lagos, Nigeria</dd></div><div><dt>Works with</dt><dd>Teams in the US, Europe and Africa</dd></div>' +
  '</dl>' +
  '<section class="stmt-sec">' +
    '<div class="stmt-pin">' +
      '<p class="rv" style="margin-bottom:22px"><span class="eyebrow">In short</span></p>' +
      '<p class="stmt" data-scrub="sticky">I take complicated, high-stakes products like trading apps, cross-border payments, on-chain data and AI tools, and make them simple to use without hiding what matters.</p>' +
      '<dl class="stats" data-after>' +
        '<div class="stat"><dt>4+</dt><dd>years designing web and mobile products</dd></div>' +
        '<div class="stat"><dt>8</dt><dd>teams, from New York and Paris to Uganda</dd></div>' +
        '<div class="stat"><dt>20+</dt><dd>projects across Web3, fintech and AI</dd></div>' +
        '<div class="stat"><dt>0→1</dt><dd>product design led from first concept at Glitch Markets</dd></div>' +
      '</dl>' +
    '</div>' +
  '</section>' +
  '<section class="m-sec" id="work"><h2 class="m-h2 mask"><span class="ln"><span>Selected work</span></span></h2><div class="m-cards">' +
    CASES.map(function(c, i){ return cardHTML(c, i).replace('<article class="pcard">', '<article class="pcard rv">'); }).join('') + '</div></section>' +
  '<section class="m-sec" id="playground"><div class="m-head"><h2 class="m-h2 mask"><span class="ln"><span>Playground</span></span></h2><span>Swipe</span></div><div class="m-track">' +
    loops.map(function(g, i){
      return '<figure class="m-tile rv" style="--i:' + (i % 3) + '" aria-label="' + esc(g.t) + '"><div class="tm-media" style="background:' + (g.bg || 'var(--panel)') + ((g.loop || g.video) && loopPoster(g) ? ' url(' + loopPoster(g) + ') center / cover no-repeat' : '') + '">' + (g.loop || g.video ? '<video autoplay muted loop playsinline webkit-playsinline disablepictureinpicture preload="metadata" poster="' + loopPoster(g) + '" src="' + loopSrc(g) + '"></video>' : '<img src="' + asset(g.shot, 'thumbs/') + '" alt="">') + '</div>' +
             '</figure>';
    }).join('') + '</div></section>' +
  '<section class="m-sec" id="about"><h2 class="m-h2 mask"><span class="ln"><span>Work experience</span></span></h2>' + experienceHTML() + '</section>' +
  '<section class="m-sec m-logos"><h2 class="m-h2 mask"><span class="ln"><span>Teams I’ve designed for</span></span></h2>' + logosHTML() + '</section>' +
  '<section class="m-sec m-skills">' + skillsHTML() + '</section>' +
  footerHTML();
document.body.insertBefore(m, document.body.firstChild);

/* a whole project card is the link */
m.addEventListener('click', function(e){
  if (e.target.closest('a')) return;
  var c = e.target.closest('.pcard'), go = c && c.querySelector('.pc-go');
  if (go) location.href = go.getAttribute('href');
});

/* loops play while they're on screen.
   Each one is an always-visible, muted, inline autoplay video: that is what iPhone Safari will start by itself, and it pauses it
   off screen on its own. We also nudge play() as tiles come into view and finish revealing, and on every tap or swipe, because
   phones in Low Power Mode or saving data hold even muted videos until you touch the page (the still shows until then). */
var vids = [].slice.call(m.querySelectorAll('.m-track video'));
function playLoop(v){ v.muted = true; v.defaultMuted = true; v.playsInline = true; var p = v.play(); if (p && p.catch) p.catch(function(){}); }
function inView(v){ var r = v.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; }
function nudge(){ vids.forEach(function(v){ if (v.paused && inView(v)) playLoop(v); }); }
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){
    if (e.intersectionRatio > .2) playLoop(e.target); else e.target.pause();
  }); }, { threshold: [0, .2, .6] });
  vids.forEach(function(v){ io.observe(v); });
} else vids.forEach(playLoop);
/* a tile fades in as it's revealed; try again once it's fully shown, and whenever a video becomes ready */
[].forEach.call(m.querySelectorAll('.m-tile'), function(t){ t.addEventListener('transitionend', function(e){ if (e.propertyName === 'opacity') nudge(); }); });
vids.forEach(function(v){ v.addEventListener('canplay', function(){ if (v.paused && inView(v)) playLoop(v); }); });
var swipe = m.querySelector('.m-track'); if (swipe) swipe.addEventListener('scroll', function(){ clearTimeout(swipe._t); swipe._t = setTimeout(nudge, 120); }, { passive: true });
['touchend', 'pointerup', 'scrollend'].forEach(function(ev){ addEventListener(ev, nudge, { passive: true }); });

/* the shared page motion (reveals, the statement, the footer, the top bar's pill) */
(function start(){
  ['site.js?v=h13'].forEach(function(src){ var s = document.createElement('script'); s.src = src; s.async = false; document.body.appendChild(s); });
  /* the chrome bust, in 3D (three.js comes from the import map in the page's head); its space stays empty until it fades in */
  var b = document.createElement('script'); b.type = 'module'; b.src = 'bust.js?v=20'; document.body.appendChild(b);
})();
})();
