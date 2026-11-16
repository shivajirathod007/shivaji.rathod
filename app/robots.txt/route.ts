export const dynamic = 'force-static';

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://shivajirathod.dev/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
