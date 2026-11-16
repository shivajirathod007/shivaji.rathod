import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,92,255,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 200,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,106,61,0.1) 0%, transparent 70%)',
          }}
        />

        <p
          style={{
            color: '#ff6a3d',
            fontSize: 14,
            fontFamily: 'monospace',
            marginBottom: 32,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          shivajirathod.dev
        </p>

        <h1
          style={{
            color: '#f3efe6',
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.0,
            margin: '0 0 20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0,
          }}
        >
          <span style={{ color: '#f3efe6' }}>Shivaji&nbsp;</span>
          <span style={{ color: '#ff6a3d' }}>Rathod</span>
        </h1>

        <p
          style={{
            color: '#9a98a8',
            fontSize: 24,
            margin: '0 0 48px',
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
          }}
        >
          Cybersecurity Researcher · Pune, India
        </p>

        <div style={{ display: 'flex', gap: 16 }}>
          {['Cloud Security', 'Vulnerability Research', 'Penetration Testing'].map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(255,106,61,0.15)',
                color: '#ff6a3d',
                border: '1px solid rgba(255,106,61,0.3)',
                borderRadius: 100,
                padding: '6px 16px',
                fontSize: 14,
                fontFamily: 'monospace',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
