export const dynamic = 'force-static';

export function GET() {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const content = `Contact: mailto:shivaji.rathod.in@gmail.com\nExpires: ${expires.toISOString()}\nPreferred-Languages: en\nCanonical: https://shivajirathod.dev/.well-known/security.txt\n`;

  return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
}
