/* POST /api/track: one page view, sent by the site as a beacon.
   Where it came from is read from Vercel's own headers (country and city from the visitor's IP; the IP itself is never stored).
   Unique visitors are counted per day with a HyperLogLog of a salted hash, so nobody can be identified from the stats.
   Bots, and you while signed in to the CMS, are not counted. */
import { createHash } from 'node:crypto';
import { redis, isAdmin } from './_lib.js';

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|telegram|discord|headless|lighthouse|pingdom|uptime|curl|wget|python|node-fetch/i;

export async function POST(req){
  const ua = req.headers.get('user-agent') || '';
  if (BOT.test(ua) || isAdmin(req)) return new Response(null, { status: 204 });
  let b = {};
  try { b = JSON.parse(await req.text() || '{}'); } catch (_) {}
  const path = String(b.p || '/').slice(0, 160);
  let ref = '';
  try { const h = new URL(b.r).hostname.replace(/^www\./, ''); if (h && h !== new URL(req.url).hostname) ref = h; } catch (_) {}
  const h = req.headers, dec = s => { try { return decodeURIComponent(s || ''); } catch (_) { return s || ''; } };
  const country = h.get('x-vercel-ip-country') || '??', city = dec(h.get('x-vercel-ip-city'));
  const device = /ipad|tablet/i.test(ua) ? 'Tablet' : /mobi|iphone|android/i.test(ua) ? 'Phone' : 'Computer';
  const day = new Date().toISOString().slice(0, 10), now = Date.now();
  const ip = (h.get('x-forwarded-for') || '').split(',')[0].trim();
  const who = createHash('sha256').update(day + ip + ua + (process.env.ADMIN_SECRET || 'salt')).digest('hex').slice(0, 16);
  const caseSlug = (path.match(/case\.html\?(?:.*&)?p=([\w-]+)/) || [])[1];
  const page = caseSlug ? 'Case: ' + caseSlug : path.replace(/\?.*$/, '').replace(/index\.html$/, '') || '/';
  const visit = { t: now, page, country, city, ref, device, mode: b.m || '' };
  const cmds = [
    ['INCR', 'st:views'],
    ['HINCRBY', 'st:day', day, 1],
    ['PFADD', 'st:uv:' + day, who], ['EXPIRE', 'st:uv:' + day, 60 * 86400],
    ['PFADD', 'st:uv:all', who],
    ['HINCRBY', 'st:country', country, 1],
    ['HINCRBY', 'st:page', page, 1],
    ['HINCRBY', 'st:device', device, 1],
    ['LPUSH', 'st:recent', JSON.stringify(visit)], ['LTRIM', 'st:recent', 0, 299],
    ['SET', 'st:last', JSON.stringify(visit)]
  ];
  if (city) cmds.push(['HINCRBY', 'st:city', city + ', ' + country, 1]);
  if (ref) cmds.push(['HINCRBY', 'st:ref', ref, 1]);
  if (b.m) cmds.push(['HINCRBY', 'st:mode', b.m, 1]);
  try { await redis(cmds); } catch (_) {}
  return new Response(null, { status: 204 });
}
