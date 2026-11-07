/* GET /api/admin/stats (signed in only): everything the stats page shows, in one call. */
import { json, redis, isAdmin, denied } from '../_lib.js';

const top = (flat, n = 12) => {
  const out = [];
  for (let i = 0; i < (flat || []).length; i += 2) out.push([flat[i], +flat[i + 1]]);
  return out.sort((a, b) => b[1] - a[1]).slice(0, n);
};

export async function GET(req){
  if (!isAdmin(req)) return denied();
  const days = [];
  for (let i = 29; i >= 0; i--) days.push(new Date(Date.now() - i * 864e5).toISOString().slice(0, 10));
  const r = await redis([
    ['GET', 'st:views'], ['HGETALL', 'st:day'], ['PFCOUNT', 'st:uv:all'],
    ['HGETALL', 'st:country'], ['HGETALL', 'st:city'], ['HGETALL', 'st:page'], ['HGETALL', 'st:ref'],
    ['HGETALL', 'st:device'], ['HGETALL', 'st:mode'], ['LRANGE', 'st:recent', 0, 59], ['GET', 'st:last'], ['GET', 'st:resume'],
    ...days.map(d => ['PFCOUNT', 'st:uv:' + d])
  ]);
  const byDay = Object.fromEntries(top(r[1], 9999));
  return json({
    views: +(r[0] || 0), visitors: +(r[2] || 0), resume: +(r[11] || 0),
    days: days.map((d, i) => ({ day: d, views: byDay[d] || 0, visitors: +(r[12 + i] || 0) })),
    countries: top(r[3]), cities: top(r[4]), pages: top(r[5], 20), referrers: top(r[6]), devices: top(r[7]), modes: top(r[8]),
    recent: (r[9] || []).map(x => JSON.parse(x)), last: r[10] ? JSON.parse(r[10]) : null
  });
}
