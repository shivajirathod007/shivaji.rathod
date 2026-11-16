import { type NextRequest } from 'next/server';

export const runtime = 'nodejs';

// Lazy-init rate limiter (only when env vars are present)
let ratelimit: { limit: (key: string) => Promise<{ success: boolean }> } | null = null;

async function getRatelimit() {
  if (ratelimit) return ratelimit;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    // No Redis configured — allow all (dev mode)
    ratelimit = { limit: async () => ({ success: true }) };
    return ratelimit;
  }
  const { Ratelimit } = await import('@upstash/ratelimit');
  const { Redis } = await import('@upstash/redis');
  const redis = new Redis({ url, token });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    analytics: false,
  });
  return ratelimit;
}

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  _honeypot: string;
  turnstileToken: string;
}

export async function POST(req: NextRequest) {
  let body: ContactRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  // Step 1: Honeypot check — silent discard
  if (body._honeypot && body._honeypot.trim() !== '') {
    return Response.json({ success: true, message: 'ok' });
  }

  // Step 2: Rate limiting (Upstash Redis or no-op in dev)
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1';

  const limiter = await getRatelimit();
  const { success: allowed } = await limiter.limit(ip);
  if (!allowed) {
    return Response.json({ success: false, error: 'Too many requests' }, { status: 429 });
  }

  // Step 3: Turnstile siteverify
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret && body.turnstileToken) {
    try {
      const cfRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: body.turnstileToken,
          remoteip: ip,
        }),
      });
      const cfData = (await cfRes.json()) as { success: boolean };
      if (!cfData.success) {
        return Response.json({ success: false, error: 'Bot check failed' }, { status: 403 });
      }
    } catch {
      // Turnstile unavailable — fail open in dev, fail closed in prod
      if (process.env.NODE_ENV === 'production') {
        return Response.json({ success: false, error: 'Bot check unavailable' }, { status: 503 });
      }
    }
  }

  // Step 4: Server-side field validation
  const errors: string[] = [];
  if (!body.name?.trim()) errors.push('Name is required');
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Valid email is required');
  if (!body.message?.trim() || body.message.trim().length < 10) errors.push('Message must be at least 10 characters');
  if ((body.name?.length ?? 0) > 100) errors.push('Name is too long');
  if ((body.message?.length ?? 0) > 2000) errors.push('Message is too long');
  if (errors.length > 0) {
    return Response.json({ success: false, error: errors.join('. ') }, { status: 400 });
  }

  // Step 5: Web3Forms submission
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return Response.json({ success: false, error: 'Contact form not configured' }, { status: 503 });
  }

  try {
    const w3fRes = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        name: body.name.trim(),
        email: body.email.trim(),
        message: body.message.trim(),
        subject: `Portfolio contact from ${body.name.trim()}`,
      }),
    });
    if (!w3fRes.ok) {
      return Response.json({ success: false, error: 'Upstream error — please try again later' }, { status: 502 });
    }
    return Response.json({ success: true, message: 'Sent!' });
  } catch {
    return Response.json({ success: false, error: 'Network error — please try again later' }, { status: 500 });
  }
}
