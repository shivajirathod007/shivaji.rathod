import { ImageResponse } from 'next/og';
import { getPost, getAllPosts } from '@/lib/mdx';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <p style={{ color: '#ff6a3d', fontSize: 14, fontFamily: 'monospace', marginBottom: 24 }}>
          shivajirathod.dev / blog
        </p>
        <h1
          style={{
            color: '#f3efe6',
            fontSize: post?.title && post.title.length > 60 ? 44 : 56,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
            margin: '0 0 24px',
          }}
        >
          {post?.title ?? 'Blog Post'}
        </h1>
        <p style={{ color: '#9a98a8', fontSize: 20, maxWidth: 800, lineHeight: 1.5 }}>
          {post?.summary ?? ''}
        </p>
        <div style={{ position: 'absolute', bottom: 80, right: 80, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <p style={{ color: '#9a98a8', fontSize: 16, fontFamily: 'monospace', margin: 0 }}>
            Shivaji Rathod
          </p>
          <p style={{ color: '#ff6a3d', fontSize: 14, fontFamily: 'monospace', margin: 0 }}>
            Cybersecurity Researcher
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
