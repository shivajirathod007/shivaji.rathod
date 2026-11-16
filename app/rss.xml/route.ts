import { getAllPosts } from '@/lib/mdx';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getAllPosts();
  const base = 'https://shivajirathod.dev';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shivaji Rathod — Security Research</title>
    <link>${base}</link>
    <description>Cybersecurity writeups and research</description>
    <language>en</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (p) => `<item>
      <title><![CDATA[${p.title}]]></title>
      <link>${base}/blog/${p.slug}</link>
      <guid isPermaLink="true">${base}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.summary}]]></description>
    </item>`
      )
      .join('\n    ')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
