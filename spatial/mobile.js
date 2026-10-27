/* The home page on a phone.
   The room is made for a mouse and a big screen, so a phone gets one quick scroll instead:
   who I am, the work, a swipeable row of loops, a short about and the footer. Case studies open as normal pages. */
(function(){
"use strict";
if (!window.MOBILE) return;

/* take the room out, so nothing of it loads or runs */
['stage', 'hint', 'toplinks', 'orn', 'detail', 'portal', 'intro', 'gaze'].forEach(function(id){ var n = document.getElementById(id); if (n) n.remove(); });
var b = document.querySelector('.brand'); if (b) b.remove();
document.body.className = 'mhome';
var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'case.css?v=space'; document.head.appendChild(css);

function th(f){ return 'thumbs/' + encodeURI(f); }
function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
var PICK = ['eikos-01-feed', '01-balance', '02-leave-types', 'eikos-03-buy', '03-network', '03-cee-books-leave', 'eikos-06-ask', '04-send', '05-sign-contract'];
var loops = PICK.map(function(k){ return PLAYGROUND.filter(function(g){ return g.loop === k; })[0]; }).filter(Boolean);

var m = document.createElement('main'); m.className = 'm';
m.innerHTML = navHTML('') +
  /* the first two sections of the about page: who I am with the portrait, then the statement and the numbers */
  '<header class="ab-hero m-ab">' +
    '<div>' +
      '<p class="m-who"><img src="' + th('photo-4.jpg') + '" alt=""><span><b>Triumph Ohwojeheri</b>Product designer, Lagos</span></p>' +
      '<h1 class="mask"><span class="ln"><span>I design products</span></span><span class="ln"><span>that make <em>complex</em></span></span><span class="ln"><span>things feel simple.</span></span></h1>' +
      '<p class="lead rv">I’m Triumph, a product designer in Lagos with 4+ years of experience across fintech, Web3, DeFi, AI and SaaS. I work end to end, from research and user flows to high-fidelity UI, prototypes and design systems, and I’ve led zero-to-one design for trading, payments and decentralised apps. On the side, I vibe-code my designs to life.</p>' +
      '<div class="m-row rv"><a class="btn pri" href="#work">View work</a><a class="btn" href="mailto:triumphohwojeheri@gmail.com">Email me</a></div>' +
      '<p class="avail m-avail"><i></i>Available for select projects</p>' +
    '</div>' +
    '<div class="ab-photo rv"><div class="dust" id="dust" role="img" aria-label="Portrait of Triumph Ohwojeheri" data-src="' + th('photo-3.jpg') + '"><canvas></canvas></div></div>' +
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
  '<section class="m-sec" id="work"><h2 class="m-h2">Selected work</h2><div class="m-cards">' +
    CASES.map(function(c, i){ return cardHTML(c, i); }).join('') + '</div></section>' +
  '<section class="m-sec" id="playground"><div class="m-head"><h2 class="m-h2">Playground</h2><span>Swipe</span></div><div class="m-track">' +
    loops.map(function(g){
      return '<figure class="m-tile"><div class="tm-media" style="background:' + g.bg + '"><video muted loop playsinline preload="none" poster="loops/' + g.loop + '.jpg" src="loops/' + g.loop + '.mp4"></video></div>' +
             '<figcaption><b>' + esc(g.t) + '</b><span>' + esc(g.by) + '</span></figcaption></figure>';
    }).join('') + '</div></section>' +
  '<section class="m-sec" id="about"><h2 class="m-h2">About</h2><div class="m-about">' +
    '<div class="fan open"><figure class="fp fp-l"><img src="' + th('photo-3.jpg') + '" alt=""></figure><figure class="fp fp-r"><img src="' + th('photo-8.jpg') + '" alt=""></figure>' +
      '<figure class="fp fp-c"><img src="' + th('photo-4.jpg') + '" alt="Triumph Ohwojeheri"></figure></div>' +
    '<div class="m-sum"><div class="m-h3">Curious by nature.<br>Intentional by design.</div>' +
      '<p class="m-p">A product designer in Lagos with 4+ years across fintech, Web3, AI and SaaS. I work end to end, from research and flows to high-fidelity UI and design systems.</p>' +
      '<div class="m-row"><a class="btn pri" href="about.html">My story</a><a class="btn" href="resume.pdf" target="_blank" rel="noopener">Resume</a></div></div>' +
  '</div></section>' +
  footerHTML();
document.body.insertBefore(m, document.body.firstChild);

/* a whole project card is the link */
m.addEventListener('click', function(e){
  if (e.target.closest('a')) return;
  var c = e.target.closest('.pcard'), go = c && c.querySelector('.pc-go');
  if (go) location.href = go.getAttribute('href');
});

/* loops play only while most of them is on screen */
var vids = [].slice.call(m.querySelectorAll('.m-track video'));
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){
    var v = e.target;
    if (e.intersectionRatio > .6) { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function(){}); } else v.pause();
  }); }, { threshold: [0, .6, 1] });
  vids.forEach(function(v){ io.observe(v); });
}

/* the portrait, then the shared page motion (reveals, the statement, the footer, the top bar's pill) */
['dust.js?v=3', 'site.js?v=mobile2'].forEach(function(src){ var s = document.createElement('script'); s.src = src; s.async = false; document.body.appendChild(s); });
})();
