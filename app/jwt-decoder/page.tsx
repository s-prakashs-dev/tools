import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import JwtDecoderTool from './JwtDecoderTool';

const tool = getToolBySlug('jwt-decoder')!;

export function generateMetadata(): Metadata {
  return {
    title: 'JWT Decoder & Validator — Decode JWT Tokens Online Free',
    description:
      'Decode and inspect JWT tokens online. View header, payload, signature and check token expiry. Browser-based, no server uploads, completely private.',
    keywords: [
      'jwt decoder',
      'jwt decoder online',
      'decode jwt token',
      'jwt parser',
      'jwt validator',
      'json web token decoder',
      'jwt online',
    ],
    openGraph: {
      title: 'JWT Decoder & Validator — Decode JWT Tokens Online',
      description: 'Decode JWT tokens instantly. View all claims and check expiry status. Completely private, browser-based.',
      url: 'https://toolyfy.in/jwt-decoder',
      images: [{ url: 'https://toolyfy.in/og/jwt-decoder.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: 'https://toolyfy.in/jwt-decoder',
    },
  };
}

export default function JwtDecoderPage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <JwtDecoderTool />
      </ToolLayout>
    </>
  );
}
