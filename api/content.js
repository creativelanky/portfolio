/* GET /api/content: the content saved in the CMS, as a script the pages load before cases.js.
   It sets window.CMS; cases.js uses it in place of its built-in projects, playground and details.
   Until anything is saved (or if the database is unreachable) it sets nothing and the site shows its built-in content. */
import { readContent } from './_lib.js';

export async function GET(){
  let body = '/* no saved content: built-in content is used */';
  try {
    const c = await readContent();
    if (c) body = 'window.CMS=' + JSON.stringify(c).replace(/</g, '\\u003c') + ';';
  } catch (e) { body = '/* content unavailable: ' + String(e.message).replace(/\*\//g, '') + ' */'; }
  return new Response(body, { headers: {
    'Content-Type': 'application/javascript; charset=utf-8',
    /* browsers always ask again; only Vercel's CDN keeps a copy, for 20s (serving it while it fetches a new one),
       so saves show up within about a minute and nobody's browser holds on to old content */
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'Vercel-CDN-Cache-Control': 's-maxage=20, stale-while-revalidate=60'
  } });
}
