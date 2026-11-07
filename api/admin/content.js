/* /api/admin/content (signed in only)
   GET: the saved content, or null if nothing has been saved yet (the admin then starts from the site's built-in content).
   PUT: save the whole document. The last 20 saves are kept, so a bad save can be rolled back with POST {restore: n}. */
import { json, redis, isAdmin, denied, readContent, CONTENT_KEY } from '../_lib.js';

const HISTORY = 'cms:history';

export async function GET(req){
  if (!isAdmin(req)) return denied();
  const [content, history] = await Promise.all([readContent(), redis(['LRANGE', HISTORY, 0, 19])]);
  return json({ content, history: (history || []).map(h => { const x = JSON.parse(h); return { at: x.at }; }) });
}

function valid(c){
  if (!c || typeof c !== 'object') return 'Nothing to save';
  if (!Array.isArray(c.cases) || !Array.isArray(c.playground)) return 'Projects and playground must be lists';
  const slugs = new Set();
  for (const p of c.cases) {
    if (!p || !/^[a-z0-9-]+$/.test(p.slug || '')) return 'Every project needs a slug of lowercase letters, numbers and dashes';
    if (slugs.has(p.slug)) return 'Two projects share the slug "' + p.slug + '"';
    slugs.add(p.slug);
    if (!p.name) return 'A project is missing its name';
  }
  return '';
}

export async function PUT(req){
  if (!isAdmin(req)) return denied();
  let c;
  try { c = await req.json(); } catch (_) { return json({ error: 'That was not valid JSON' }, 400); }
  const bad = valid(c);
  if (bad) return json({ error: bad }, 400);
  const doc = JSON.stringify({ cases: c.cases, playground: c.playground, cover: c.cover || {}, site: c.site || {}, savedAt: Date.now() });
  if (doc.length > 900000) return json({ error: 'That is too much text to save in one go' }, 413);
  const prev = await redis(['GET', CONTENT_KEY]);
  const cmds = [['SET', CONTENT_KEY, doc]];
  if (prev) cmds.push(['LPUSH', HISTORY, JSON.stringify({ at: Date.now(), doc: prev })], ['LTRIM', HISTORY, 0, 19]);
  await redis(cmds);
  return json({ ok: true, savedAt: JSON.parse(doc).savedAt });
}

/* roll back to an earlier save: {restore: index in the history list} */
export async function POST(req){
  if (!isAdmin(req)) return denied();
  let n = -1;
  try { n = +(await req.json()).restore; } catch (_) {}
  const h = await redis(['LINDEX', HISTORY, n]);
  if (!h) return json({ error: 'No such save' }, 404);
  const cur = await redis(['GET', CONTENT_KEY]);
  await redis([['SET', CONTENT_KEY, JSON.parse(h).doc], ['LPUSH', HISTORY, JSON.stringify({ at: Date.now(), doc: cur })], ['LTRIM', HISTORY, 0, 19]]);
  return json({ ok: true });
}
