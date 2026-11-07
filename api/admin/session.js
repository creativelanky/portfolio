/* /api/admin/session
   GET: are you signed in?  POST {password}: sign in.  DELETE: sign out. */
import { json, checkPassword, sessionCookie, clearCookie, isAdmin } from '../_lib.js';

export function GET(req){ return json({ signedIn: isAdmin(req), dev: !!globalThis.__devRedis }); }

export async function POST(req){
  let pw = '';
  try { pw = (await req.json()).password; } catch (_) {}
  /* a short pause on every try makes guessing slow */
  await new Promise(r => setTimeout(r, 400));
  if (!checkPassword(pw)) return json({ error: 'Wrong password' }, 401);
  return json({ signedIn: true }, 200, { 'Set-Cookie': sessionCookie() });
}

export function DELETE(){ return json({ signedIn: false }, 200, { 'Set-Cookie': clearCookie() }); }
