import { ImageResponse } from 'next/og';

export const ogSize = {
  width: 1200,
  height: 630,
};

export function generateToolOGImage(toolName: string, tagline: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          fontFamily: 'sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Top-left brand */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            T
          </div>
          <span style={{ color: '#94a3b8', fontSize: '24px', fontWeight: 600 }}>
            Toolyfy
          </span>
        </div>

        {/* Center tool name */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#f8fafc',
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}
        >
          {toolName}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '24px',
            color: '#94a3b8',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          {tagline}
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '6px',
            background: 'linear-gradient(90deg, #2563eb, #7c3aed, #2563eb)',
          }}
        />
      </div>
    ),
    { ...ogSize }
  );
}
