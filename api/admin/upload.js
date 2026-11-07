/* POST /api/admin/upload (signed in only): hands the admin page a short-lived token so it can upload a file
   straight to Vercel Blob from your browser. Large videos never pass through this function. */
import { handleUpload } from '@vercel/blob/client';
import { json, isAdmin, denied } from '../_lib.js';

const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml', 'video/mp4', 'video/webm', 'video/quicktime', 'application/pdf'];

export async function POST(req){
  const body = await req.json();
  /* Vercel Blob calls back here when an upload finishes; that call has no cookie and is verified by the library */
  if (body.type !== 'blob.upload-completed' && !isAdmin(req)) return denied();
  try {
    const out = await handleUpload({
      request: req, body,
      onBeforeGenerateToken: async () => ({ allowedContentTypes: TYPES, maximumSizeInBytes: 300 * 1024 * 1024, addRandomSuffix: true }),
      onUploadCompleted: async () => {}
    });
    return json(out);
  } catch (e) { return json({ error: e.message }, 400); }
}
