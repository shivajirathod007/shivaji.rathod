import { getAllPosts } from '@/lib/mdx';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getAllPosts();
  const base = 'https://shivajirathod.dev';
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { url: base, date: today },
    { url: `${base}/blog`, date: today },
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, date: p.date })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.url}</loc><lastmod>${u.date}</lastmod></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
