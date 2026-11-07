/* GET /api/resume (and /spatial/resume.pdf, rewritten here in vercel.json): sends you to the resume uploaded in the CMS,
   or to the one in the repo if none has been uploaded. Each open is counted in the stats. */
import { readContent, redis } from './_lib.js';

export async function GET(req){
  let to = '/spatial/resume-default.pdf';
  try {
    const c = await readContent();
    if (c && c.site && c.site.resume) to = c.site.resume;
    await redis(['INCR', 'st:resume']);
  } catch (_) {}
  return new Response(null, { status: 302, headers: { Location: new URL(to, req.url).href, 'Cache-Control': 'no-store' } });
}
