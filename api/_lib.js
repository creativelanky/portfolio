/* Shared by the API routes (files starting with _ are not routes on Vercel).
   · redis(): Upstash Redis over its REST API, so no client library is needed
   · the admin session: a signed cookie, checked on every admin route
   · small Response helpers */
import { createHmac, timingSafeEqual } from 'node:crypto';

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

/* one command, or several at once: redis(['GET', 'k']) / redis([['INCR', 'a'], ['INCR', 'b']]) */
export async function redis(cmd){
  if (globalThis.__devRedis) return globalThis.__devRedis(cmd);   /* the local test server's stand-in */
  if (!URL_ || !TOKEN) throw new Error('Redis is not connected (KV_REST_API_URL / KV_REST_API_TOKEN)');
  const many = Array.isArray(cmd[0]);
  const r = await fetch(URL_ + (many ? '/pipeline' : ''), {
    method: 'POST', headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd)
  });
  if (!r.ok) throw new Error('Redis ' + r.status + ': ' + (await r.text()).slice(0, 200));
  const out = await r.json();
  return many ? out.map(x => x.result) : out.result;
}

export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers } });

/* ---------- the admin session ---------- */
const COOKIE = 'cms_session', DAYS = 14;
function secret(){
  const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error('ADMIN_PASSWORD is not set');
  return s;
}
const sign = v => createHmac('sha256', secret()).update(v).digest('base64url');

export function checkPassword(given){
  const real = process.env.ADMIN_PASSWORD || '';
  if (!real || typeof given !== 'string') return false;
  const a = createHmac('sha256', 'pw').update(given).digest(), b = createHmac('sha256', 'pw').update(real).digest();
  return timingSafeEqual(a, b);
}
export function sessionCookie(){
  const exp = String(Date.now() + DAYS * 864e5);
  return `${COOKIE}=${exp}.${sign(exp)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${DAYS * 86400}`;
}
export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;

export function isAdmin(req){
  const m = (req.headers.get('cookie') || '').match(new RegExp(COOKIE + '=([^;]+)'));
  if (!m) return false;
  const [exp, sig] = m[1].split('.');
  if (!exp || !sig || +exp < Date.now()) return false;
  try { const a = Buffer.from(sig), b = Buffer.from(sign(exp)); return a.length === b.length && timingSafeEqual(a, b); }
  catch (_) { return false; }
}
export const denied = () => json({ error: 'Not signed in' }, 401);

/* the site's content lives in one JSON document */
export const CONTENT_KEY = 'cms:content';
export async function readContent(){
  const raw = await redis(['GET', CONTENT_KEY]);
  return raw ? JSON.parse(raw) : null;
}
