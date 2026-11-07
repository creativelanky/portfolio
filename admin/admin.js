/* The portfolio CMS.
   Everything you edit lives in one document, {cases, playground, cover, site}, the same shapes cases.js uses, so the site
   renders a saved project exactly like the built-in ones. Edits stay in this page until you press Save; saving writes the
   whole document to the database (/api/admin/content) and the site picks it up within about a minute.
   Uploads go straight from your browser to Vercel Blob (/api/admin/upload hands out a short-lived token). */

const $ = (s, el = document) => el.querySelector(s);
const h = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) if (k != null && k !== false) e.append(k.nodeType ? k : document.createTextNode(k));
  return e;
};
const clone = o => JSON.parse(JSON.stringify(o));
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');

let doc = null, dirty = false, dev = false, tab = 'projects', editing = null;

/* ---------- talking to the API ---------- */
async function api(path, opts = {}){
  const r = await fetch(path, { credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, ...opts });
  const out = r.headers.get('content-type')?.includes('json') ? await r.json() : null;
  if (r.status === 401 && path !== '/api/admin/session') { showLogin(); throw new Error('Signed out'); }
  if (!r.ok) throw new Error(out?.error || 'Something went wrong (' + r.status + ')');
  return out;
}
function toast(msg, bad){
  const t = $('#toast'); t.textContent = msg; t.className = 'toast on' + (bad ? ' bad' : '');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.className = 'toast', bad ? 5000 : 2600);
}
function touch(){ dirty = true; $('#save').disabled = false; $('#status').textContent = 'Unsaved changes'; $('#status').className = 'status dirty'; }
addEventListener('beforeunload', e => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

/* ---------- sign in ---------- */
function showLogin(){ $('#app').hidden = true; $('#login').hidden = false; $('#pw').focus(); }
$('#loginForm').addEventListener('submit', async e => {
  e.preventDefault(); $('#loginErr').textContent = '';
  try { await api('/api/admin/session', { method: 'POST', body: JSON.stringify({ password: $('#pw').value }) }); $('#pw').value = ''; boot(); }
  catch (err) { $('#loginErr').textContent = err.message; }
});
$('#signOut').addEventListener('click', async () => {
  if (dirty && !confirm('You have unsaved changes. Sign out anyway?')) return;
  await api('/api/admin/session', { method: 'DELETE' }); dirty = false; showLogin();
});

async function boot(){
  const s = await api('/api/admin/session');
  dev = s.dev;
  if (!s.signedIn) return showLogin();
  const { content, history } = await api('/api/admin/content');
  /* nothing saved yet: start from what the site shows today */
  doc = content ? clone(content) : { cases: clone(window.CASES), playground: clone(window.PLAYGROUND), cover: clone(window.COVER || {}), site: {} };
  doc.site = Object.assign({}, window.SITE, doc.site);
  /* the normal home shows these nine loops until you choose others (mobile.js keeps the same list) */
  if (!doc.playground.some(g => g.home)) {
    const PICK = ['eikos-01-feed', '01-balance', '02-leave-types', 'eikos-03-buy', '03-network', '03-cee-books-leave', 'eikos-06-ask', '04-send', '05-sign-contract'];
    doc.playground.forEach(g => { if (PICK.includes(g.loop)) g.home = true; });
  }
  fillHistory(history);
  $('#login').hidden = true; $('#app').hidden = false;
  $('#status').textContent = content ? 'Saved ' + ago(content.savedAt) : 'Showing the built-in content. Save once to start editing it here.';
  $('#status').className = 'status';
  render();
}
function fillHistory(list){
  const sel = $('#history');
  sel.innerHTML = '<option value="">Earlier saves</option>' + (list || []).map((x, i) => `<option value="${i}">Before the save of ${new Date(x.at).toLocaleString()}</option>`).join('');
  sel.hidden = !(list || []).length;
}
$('#history').addEventListener('change', async e => {
  const i = e.target.value; e.target.value = '';
  if (i === '' || !confirm('Go back to this earlier version? What is saved now is kept in this list too.')) return;
  await api('/api/admin/content', { method: 'POST', body: JSON.stringify({ restore: +i }) });
  dirty = false; toast('Restored'); boot();
});

/* ---------- save ---------- */
$('#save').addEventListener('click', async () => {
  const b = $('#save'); b.disabled = true; b.textContent = 'Saving…';
  try {
    const r = await api('/api/admin/content', { method: 'PUT', body: JSON.stringify(doc) });
    dirty = false; $('#status').textContent = 'Saved just now. The site updates within a minute.'; $('#status').className = 'status';
    toast('Saved'); doc.savedAt = r.savedAt;
    const { history } = await api('/api/admin/content'); fillHistory(history);
  } catch (err) { toast(err.message, true); b.disabled = false; }
  b.textContent = 'Save changes';
});

/* ---------- uploads ---------- */
let blobClient = null;
async function uploadFile(file, onProgress){
  const name = file.name.replace(/[^\w.\-]+/g, '-').toLowerCase();
  if (dev) {   /* the local test server keeps files on disk */
    const r = await fetch('/api/dev-upload?name=' + encodeURIComponent(name), { method: 'POST', body: file, credentials: 'same-origin' });
    if (!r.ok) throw new Error('Upload failed'); onProgress?.(100); return (await r.json()).url;
  }
  blobClient = blobClient || await import('https://cdn.jsdelivr.net/npm/@vercel/blob@2.8.1/dist/client.js/+esm');
  const out = await blobClient.upload('portfolio/' + name, file, {
    access: 'public', handleUploadUrl: '/api/admin/upload', multipart: file.size > 20 * 1024 * 1024,
    onUploadProgress: p => onProgress?.(p.percentage)
  });
  return out.url;
}
/* a file picker that shows the current file and swaps it on upload */
function picker({ value, dir = '', accept = 'image/*', label = 'Image', onChange, video = false }){
  const pv = h('div', { class: 'pv' });
  const show = v => {
    pv.innerHTML = ''; pv.style.backgroundImage = '';
    if (!v) { pv.textContent = 'None'; return; }
    const url = window.asset(v, dir);
    if (video || /\.(mp4|webm|mov)(\?|$)/i.test(v)) pv.append(h('video', { src: url, muted: true, autoplay: true, loop: true, playsinline: true }));
    else if (/\.pdf(\?|$)/i.test(v)) pv.textContent = 'PDF';
    else pv.style.backgroundImage = `url("${url}")`;
  };
  show(value);
  const bar = h('div', { class: 'prog', hidden: true }, h('i'));
  const name = h('span', { class: 'hint' }, value ? String(value).split('/').pop().slice(0, 48) : 'Nothing uploaded');
  const input = h('input', { type: 'file', accept, hidden: true, onchange: async () => {
    const f = input.files[0]; if (!f) return;
    bar.hidden = false; name.textContent = 'Uploading ' + f.name + '…';
    try {
      const url = await uploadFile(f, p => bar.firstChild.style.width = p + '%');
      show(url); name.textContent = f.name; onChange(url); touch(); toast('Uploaded. Remember to save.');
    } catch (err) { name.textContent = 'Upload failed'; toast(err.message, true); }
    bar.hidden = true; bar.firstChild.style.width = 0; input.value = '';
  } });
  return h('div', { class: 'img-pick' }, pv,
    h('div', { class: 'col' }, h('b', {}, label), name, bar,
      h('div', {}, h('button', { class: 'btn sm', type: 'button', onclick: () => input.click() }, value ? 'Replace' : 'Upload'), input)));
}

/* ---------- small field builders: each edits obj[key] in place ---------- */
function text(obj, key, label, { area = false, hint = '', type = 'text', wide = false, placeholder = '' } = {}){
  const el = area ? h('textarea', { placeholder }) : h('input', { type, placeholder });
  el.value = obj[key] ?? '';
  el.addEventListener('input', () => { obj[key] = el.value; touch(); });
  return h('label', { class: 'f' + (wide ? ' wide' : '') }, label, el, hint ? h('span', { class: 'hint' }, hint) : null);
}
function color(obj, key, label){
  const el = h('input', { type: 'color', value: /^#[0-9a-f]{6}$/i.test(obj[key] || '') ? obj[key] : '#111111' });
  const tx = h('input', { type: 'text', value: obj[key] || '', placeholder: '#111111' });
  el.addEventListener('input', () => { obj[key] = tx.value = el.value; touch(); });
  tx.addEventListener('input', () => { obj[key] = tx.value; if (/^#[0-9a-f]{6}$/i.test(tx.value)) el.value = tx.value; touch(); });
  return h('label', { class: 'f' }, label, h('div', { style: 'display:flex;gap:8px' }, el, tx));
}
/* a reorderable list; each item is drawn by draw(item, index, list) */
function list(arr, draw, { make, addLabel = 'Add', pair = false } = {}){
  const box = h('div', { class: 'items' });
  const redraw = () => {
    box.innerHTML = '';
    arr.forEach((it, i) => {
      const item = h('div', { class: 'item has-tools' + (pair ? ' pair' : '') });
      item.append(h('div', { class: 'tools' },
        h('button', { class: 'icon', type: 'button', title: 'Move up', disabled: i === 0, onclick: () => { arr.splice(i - 1, 0, arr.splice(i, 1)[0]); touch(); redraw(); } }, '↑'),
        h('button', { class: 'icon', type: 'button', title: 'Move down', disabled: i === arr.length - 1, onclick: () => { arr.splice(i + 1, 0, arr.splice(i, 1)[0]); touch(); redraw(); } }, '↓'),
        h('button', { class: 'icon', type: 'button', title: 'Remove', onclick: () => { if (confirm('Remove this?')) { arr.splice(i, 1); touch(); redraw(); } } }, '✕')));
      draw(item, it, i);
      box.append(item);
    });
  };
  redraw();
  return h('div', {}, box, make ? h('button', { class: 'btn sm add', type: 'button', onclick: () => { arr.push(make()); touch(); redraw(); } }, '+ ' + addLabel) : null);
}
/* lists of plain strings (paragraphs) and of [title, text] pairs, which is how cases.js keeps them */
const strings = (arr, label, area = true) => list(arr, (item, v, i) => {
  const el = area ? h('textarea') : h('input', { type: 'text' }); el.value = v;
  el.addEventListener('input', () => { arr[i] = el.value; touch(); });
  item.append(el);
}, { make: () => '', addLabel: label });
const pairs = (arr, a, b, label) => list(arr, (item, v, i) => {
  const x = h('input', { type: 'text', placeholder: a }), y = h('textarea', { placeholder: b });
  x.value = v[0] || ''; y.value = v[1] || '';
  x.addEventListener('input', () => { arr[i][0] = x.value; touch(); });
  y.addEventListener('input', () => { arr[i][1] = y.value; touch(); });
  item.append(h('label', { class: 'f' }, a, x), h('label', { class: 'f' }, b, y));
}, { make: () => ['', ''], addLabel: label, pair: true });
const card = (title, hint, ...kids) => h('section', { class: 'card' }, h('h3', {}, title), hint ? h('p', { class: 'hint' }, hint) : null, ...kids);

/* ---------- tabs ---------- */
const TITLES = { projects: 'Projects', playground: 'Playground', details: 'Details', resume: 'Resume', stats: 'Visitors' };
$('#tabs').addEventListener('click', e => {
  const b = e.target.closest('button[data-tab]'); if (!b) return;
  tab = b.dataset.tab; editing = null;
  [...$('#tabs').children].forEach(x => x.classList.toggle('on', x === b));
  render();
});
function render(){
  $('#title').textContent = editing != null ? (doc.cases[editing]?.name || 'New project') : TITLES[tab];
  const v = $('#view'); v.innerHTML = ''; scrollTo(0, 0);
  ({ projects: editing != null ? projectEditor : projects, playground, details, resume, stats })[tab](v);
}

/* ---------- projects ---------- */
function projects(v){
  v.append(h('div', { class: 'toolbar' },
    h('p', { class: 'hint' }, 'The order here is the order on the site. Open a project to edit its case study.'),
    h('button', { class: 'btn pri', onclick: () => {
      doc.cases.push({ slug: 'new-project-' + (doc.cases.length + 1), name: 'New project', category: '', year: String(new Date().getFullYear()), tagline: '', headline: '', flag: '',
        logo: '', logoBg: '#111111', mark: 'N', summary: '', meta: [['Role', 'Lead product designer'], ['Year', String(new Date().getFullYear())], ['Platform', ''], ['Scope', '']],
        context: [''], problem: [''], before: [], role: [''], findings: [], process: [], decisions: [], screens: [], outcome: [], reflection: [''] });
      touch(); editing = doc.cases.length - 1; render();
    } }, '+ New project')));
  const rows = h('div', { class: 'rows' });
  doc.cases.forEach((c, i) => {
    const thumb = c.card || c.cover ? window.asset(c.card || c.cover) : '/spatial/covers/card/' + c.slug + '.jpg';
    rows.append(h('div', { class: 'row' },
      h('img', { class: 'thumb', src: thumb, alt: '', onerror: function(){ this.style.visibility = 'hidden'; } }),
      h('div', {}, h('b', {}, c.name), h('span', {}, [c.category, c.year].filter(Boolean).join(' · ') || 'No details yet')),
      h('div', { class: 'acts' },
        h('button', { class: 'icon', title: 'Move up', disabled: i === 0, onclick: () => { doc.cases.splice(i - 1, 0, doc.cases.splice(i, 1)[0]); touch(); render(); } }, '↑'),
        h('button', { class: 'icon', title: 'Move down', disabled: i === doc.cases.length - 1, onclick: () => { doc.cases.splice(i + 1, 0, doc.cases.splice(i, 1)[0]); touch(); render(); } }, '↓'),
        h('a', { class: 'btn sm', href: '/spatial/case.html?p=' + c.slug, target: '_blank', rel: 'noopener' }, 'View'),
        h('button', { class: 'btn sm pri', onclick: () => { editing = i; render(); } }, 'Edit'))));
  });
  v.append(rows);
}

function projectEditor(v){
  const c = doc.cases[editing];
  /* fill in anything an older project doesn't have, so every section can be edited */
  for (const k of ['meta', 'context', 'problem', 'before', 'role', 'findings', 'process', 'decisions', 'screens', 'outcome', 'reflection']) if (!Array.isArray(c[k])) c[k] = [];
  doc.cover[c.slug] = doc.cover[c.slug] || { base: '#111111', pos: '50% 50%' };
  const cov = doc.cover[c.slug];
  v.append(h('button', { class: 'link back', onclick: () => { editing = null; render(); } }, '← All projects'));

  const slug = text(c, 'slug', 'Slug (the link: case.html?p=slug)', { hint: 'Lowercase letters, numbers and dashes.' });
  slug.querySelector('input').addEventListener('change', e => {
    const s = e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
    if (s !== c.slug) { doc.cover[s] = doc.cover[c.slug]; }
    c.slug = e.target.value = s;
  });
  v.append(card('The basics', 'What shows on the project card and at the top of the case study.',
    h('div', { class: 'grid' },
      text(c, 'name', 'Name'), slug,
      text(c, 'category', 'Category', { placeholder: 'Web3 / DeFi' }), text(c, 'year', 'Year'),
      text(c, 'headline', 'Headline', { wide: true, placeholder: 'A DEX that feels as quick as a fintech app' }),
      text(c, 'summary', 'Summary', { area: true, wide: true }),
      text(c, 'tagline', 'Tagline'), text(c, 'flag', 'Badge', { placeholder: 'Shipped · 40+ screens' }))));

  v.append(card('Images', 'The card cover is square-ish and sits on the project card; the case cover is the wide image at the top of the case study.',
    h('div', { class: 'grid' },
      picker({ value: c.card || (c.cover ? '' : '/spatial/covers/card/' + c.slug + '.jpg'), label: 'Card cover', onChange: u => c.card = u }),
      picker({ value: c.cover || '/spatial/covers/' + c.slug + '.jpg', label: 'Case cover', onChange: u => c.cover = u }),
      picker({ value: c.logo ? c.logo : '', dir: '/spatial/', label: 'Logo', onChange: u => c.logo = u }),
      h('div', { class: 'grid' }, color(c, 'logoBg', 'Logo background'), text(c, 'mark', 'Letter (if no logo)')),
      color(cov, 'base', 'Colour behind the cover while it loads'), text(cov, 'pos', 'Cover focus point', { placeholder: '50% 50%' }))));

  v.append(card('Facts', 'Shown beside the summary. Role, Platform and Scope (or Timeline) also appear on the card.',
    list(c.meta, (item, m, i) => {
      const a = h('input', { type: 'text', placeholder: 'Role' }), b = h('input', { type: 'text', placeholder: 'Lead product designer' });
      a.value = m[0]; b.value = m[1];
      a.addEventListener('input', () => { c.meta[i][0] = a.value; touch(); }); b.addEventListener('input', () => { c.meta[i][1] = b.value; touch(); });
      item.classList.add('pair'); item.append(a, b);
    }, { make: () => ['', ''], addLabel: 'Add a fact' })));

  v.append(card('Context', null, strings(c.context, 'Add a paragraph')));
  v.append(card('The problem', null, strings(c.problem, 'Add a paragraph'),
    h('p', { class: 'hint', style: 'margin:16px 0 8px' }, 'How it worked before (a numbered list)'), strings(c.before, 'Add a step', false)));
  v.append(card('My role', null, strings(c.role, 'Add a paragraph')));
  v.append(card('What I found', null, pairs(c.findings, 'Finding', 'Explanation', 'Add a finding')));
  v.append(card('Process', null, pairs(c.process, 'Step', 'What happened', 'Add a step')));
  v.append(card('Decisions', 'Each decision can carry a wide image.',
    list(c.decisions, (item, d) => {
      item.append(h('div', { class: 'grid' },
        text(d, 't', 'Decision', { wide: true }), text(d, 'd', 'Why', { area: true, wide: true }), text(d, 'tradeoff', 'Trade-off', { area: true, wide: true }),
        picker({ value: d.img, dir: '/spatial/img/', label: 'Image', onChange: u => d.img = u }), text(d, 'cap', 'Caption')));
    }, { make: () => ({ t: '', d: '', tradeoff: '', img: '', cap: '' }), addLabel: 'Add a decision' })));
  v.append(card('More screens', 'A gallery near the end.',
    list(c.screens, (item, s) => {
      item.append(h('div', { class: 'grid' }, picker({ value: s.img, dir: '/spatial/img/', label: 'Image', onChange: u => s.img = u }),
        h('div', { class: 'items' }, text(s, 't', 'Title'), text(s, 'd', 'Description', { area: true }))));
    }, { make: () => ({ img: '', t: '', d: '' }), addLabel: 'Add a screen' }),
    h('div', { style: 'margin-top:14px' }, text(c, 'confidential', 'Note above the gallery (optional)', { area: true, placeholder: 'Some screens are under NDA…' }))));
  v.append(card('Outcome', null, pairs(c.outcome, 'Result', 'Detail', 'Add a result')));
  v.append(card('Looking back', null, strings(c.reflection, 'Add a paragraph')));
  v.append(h('div', { style: 'display:flex;justify-content:space-between;gap:10px;margin-top:10px' },
    h('button', { class: 'btn danger', onclick: () => {
      if (!confirm('Delete "' + c.name + '"? You can still get it back from Earlier saves after saving.')) return;
      doc.cases.splice(editing, 1); editing = null; touch(); render();
    } }, 'Delete project'),
    h('a', { class: 'btn', href: '/spatial/case.html?p=' + c.slug, target: '_blank', rel: 'noopener' }, 'View on the site ↗')));
}

/* ---------- playground ---------- */
function playground(v){
  v.append(h('div', { class: 'toolbar' },
    h('p', { class: 'hint' }, 'Loops are short muted videos; shots are still images. Tick "On home" for the ones shown on the normal home page.'),
    h('div', { style: 'display:flex;gap:8px' },
      h('button', { class: 'btn', onclick: () => { doc.playground.unshift({ shot: '', t: 'New shot', by: '' }); touch(); render(); } }, '+ Image'),
      h('button', { class: 'btn pri', onclick: () => { doc.playground.unshift({ video: '', poster: '', t: 'New loop', by: '', bg: '#f3eee5', home: true }); touch(); render(); } }, '+ Loop'))));
  const grid = h('div', { class: 'pg' });
  doc.playground.forEach((g, i) => {
    const isLoop = !!(g.loop || g.video || 'video' in g);
    const media = h('div', { class: 'pg-media', style: 'background:' + (g.bg || '#f4f4f2') });
    if (isLoop && (g.video || g.loop)) media.append(h('video', { src: window.asset(window.loopSrc(g), '/spatial/'), poster: g.poster || g.loop ? window.asset(window.loopPoster(g), '/spatial/') : null, muted: true, loop: true, playsinline: true, onmouseenter: function(){ this.play(); }, onmouseleave: function(){ this.pause(); } }));
    else if (!isLoop && g.shot) media.append(h('img', { src: window.asset(g.shot, '/spatial/thumbs/'), alt: '' }));
    else media.append(isLoop ? 'Upload a video' : 'Upload an image');
    grid.append(h('div', { class: 'pg-card' }, media,
      isLoop ? h('div', { class: 'items' },
        picker({ value: g.video || (g.loop ? 'loops/' + g.loop + '.mp4' : ''), dir: '/spatial/', accept: 'video/mp4,video/webm,video/quicktime', label: 'Video', video: true, onChange: u => { g.video = u; delete g.loop; render(); } }),
        picker({ value: g.poster || (g.loop ? 'loops/' + g.loop + '.jpg' : ''), dir: '/spatial/', label: 'Still (shows until it plays)', onChange: u => g.poster = u }))
        : picker({ value: g.shot, dir: '/spatial/thumbs/', label: 'Image', onChange: u => { g.shot = u; render(); } }),
      h('div', { class: 'grid' }, text(g, 't', 'Title'), text(g, 'by', 'For')),
      isLoop ? color(g, 'bg', 'Background around it') : null,
      h('div', { class: 'pg-foot' },
        h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: !!g.home, onchange: e => { g.home = e.target.checked; touch(); } }), 'On home'),
        h('div', { style: 'display:flex;gap:4px' },
          h('button', { class: 'icon', title: 'Earlier', disabled: i === 0, onclick: () => { doc.playground.splice(i - 1, 0, doc.playground.splice(i, 1)[0]); touch(); render(); } }, '←'),
          h('button', { class: 'icon', title: 'Later', disabled: i === doc.playground.length - 1, onclick: () => { doc.playground.splice(i + 1, 0, doc.playground.splice(i, 1)[0]); touch(); render(); } }, '→'),
          h('button', { class: 'icon', title: 'Remove', onclick: () => { if (confirm('Remove "' + g.t + '"?')) { doc.playground.splice(i, 1); touch(); render(); } } }, '✕')))));
  });
  v.append(grid);
}

/* ---------- details ---------- */
function details(v){
  const s = doc.site;
  v.append(card('Contact and availability', 'Used everywhere these appear: the nav, the footer, the contact wall and the About page.',
    h('div', { class: 'grid' }, text(s, 'email', 'Email', { type: 'email' }), text(s, 'avail', 'Availability line'),
      text(s, 'calendly', 'Book-a-call link', { type: 'url', wide: true }))));
  v.append(card('Social links', null, h('div', { class: 'grid' },
    text(s, 'x', 'X', { type: 'url' }), text(s, 'instagram', 'Instagram', { type: 'url' }),
    text(s, 'dribbble', 'Dribbble', { type: 'url' }), text(s, 'linkedin', 'LinkedIn', { type: 'url' }))));
  v.append(card('Home page', 'The paragraph under the headline on the normal home. Leave it empty to keep the current one.',
    text(s, 'lead', 'Intro paragraph', { area: true, placeholder: 'I’m Triumph, a product designer in Lagos…' })));
}

/* ---------- resume ---------- */
function resume(v){
  const s = doc.site;
  v.append(card('Your resume', 'Every "Resume" and "Download resume" link on the site opens this file. Upload a new PDF, then save.',
    picker({ value: s.resume || '/spatial/resume-default.pdf', accept: 'application/pdf', label: 'Resume (PDF)', onChange: u => { s.resume = u; render(); } }),
    h('p', { style: 'margin-top:14px' }, h('a', { class: 'btn sm', href: s.resume || '/spatial/resume-default.pdf', target: '_blank', rel: 'noopener' }, 'Open the current file ↗'))));
}

/* ---------- visitors ---------- */
const flag = cc => /^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(...[...cc].map(c => 127397 + c.charCodeAt(0))) + ' ' : '';
const COUNTRY = (() => { try { return new Intl.DisplayNames(['en'], { type: 'region' }); } catch (_) { return null; } })();
const cname = cc => (COUNTRY && /^[A-Z]{2}$/.test(cc) ? COUNTRY.of(cc) : cc === '??' ? 'Unknown' : cc);
function ago(t){
  if (!t) return 'never';
  const s = Math.round((Date.now() - t) / 1000);
  if (s < 60) return 'just now'; if (s < 3600) return Math.round(s / 60) + ' min ago';
  if (s < 86400) return Math.round(s / 3600) + ' h ago'; return Math.round(s / 86400) + ' days ago';
}
function bars(rows, label = x => x){
  if (!rows.length) return h('p', { class: 'empty' }, 'No visits yet');
  const max = Math.max(...rows.map(r => r[1]));
  return h('div', { class: 'bars' }, rows.map(([k, n]) => h('div', { style: '--w:' + Math.max(4, n / max * 100) + '%' }, h('span', {}, label(k)), h('b', {}, n.toLocaleString()))));
}
async function stats(v){
  v.append(h('p', { class: 'empty' }, 'Loading…'));
  let s;
  try { s = await api('/api/admin/stats'); } catch (err) { v.innerHTML = ''; v.append(h('p', { class: 'empty' }, err.message)); return; }
  if (tab !== 'stats') return;
  v.innerHTML = '';
  const week = s.days.slice(-7).reduce((a, d) => a + d.views, 0);
  const place = l => l ? [l.city, cname(l.country)].filter(Boolean).join(', ') : '';
  v.append(h('div', { class: 'kpis' },
    h('div', { class: 'kpi' }, h('span', {}, 'Page views'), h('b', {}, s.views.toLocaleString()), h('small', {}, week + ' in the last 7 days')),
    h('div', { class: 'kpi' }, h('span', {}, 'Visitors'), h('b', {}, s.visitors.toLocaleString()), h('small', {}, 'counted once a day each')),
    h('div', { class: 'kpi' }, h('span', {}, 'Last visit'), h('b', {}, s.last ? ago(s.last.t) : '—'), h('small', {}, s.last ? flag(s.last.country) + place(s.last) : 'No visits yet')),
    h('div', { class: 'kpi' }, h('span', {}, 'Resume opens'), h('b', {}, s.resume.toLocaleString()), h('small', {}, 'all time'))));
  const max = Math.max(1, ...s.days.map(d => d.views));
  v.append(card('The last 30 days', null,
    h('div', { class: 'chart' }, s.days.map((d, i) => h('div', { class: 'c', title: `${new Date(d.day).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}: ${d.views} views, ${d.visitors} visitors` },
      h('i', { style: 'height:calc(' + (d.views / max * 100) + '% - 18px)' }), h('i', { class: 'u', style: 'height:calc(' + (d.visitors / max * 100) + '% - 18px)' }),
      h('em', {}, i % 5 === 4 || i === 29 ? new Date(d.day).getDate() : '')))),
    h('div', { class: 'legend' }, h('span', {}, h('i', { style: 'background:var(--ink)' }), 'Views'), h('span', {}, h('i', { style: 'background:var(--accent)' }), 'Visitors'))));
  v.append(h('div', { class: 'cols' },
    card('Countries', null, bars(s.countries, k => flag(k) + cname(k))),
    card('Cities', null, bars(s.cities, k => { const [c, cc] = k.split(/, (?=[A-Z?]{2}$)/); return flag(cc) + c; })),
    card('Pages and projects', null, bars(s.pages, k => k.replace(/^\/spatial\/?/, 'Home ').replace(/^Case: /, 'Case study: ').replace('Home about.html', 'About page'))),
    card('Where they came from', 'Sites that linked here. Direct visits and apps that hide the source aren\'t listed.', bars(s.referrers)),
    card('Devices', null, bars(s.devices)),
    card('Home page mode', null, bars(s.modes, k => k === 'spatial' ? 'Spatial (3D room)' : 'Normal'))));
  v.append(card('Recent visits', 'The latest 60 page views.',
    s.recent.length ? h('div', { style: 'overflow-x:auto' }, h('table', {},
      h('thead', {}, h('tr', {}, ['When', 'Page', 'From', 'Device', 'Came from'].map(t => h('th', {}, t)))),
      h('tbody', {}, s.recent.map(r => h('tr', {},
        h('td', { title: new Date(r.t).toLocaleString() }, ago(r.t)), h('td', {}, r.page), h('td', {}, flag(r.country) + place(r)),
        h('td', {}, r.device + (r.mode ? ' · ' + r.mode : '')), h('td', {}, r.ref || 'Direct'))))))
      : h('p', { class: 'empty' }, 'No visits yet. They show up here as soon as someone opens the site.')));
}

boot().catch(err => { if (err.message !== 'Signed out') toast(err.message, true); });
