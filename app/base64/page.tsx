import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import Base64Tool from './Base64Tool';

const tool = getToolBySlug('base64')!;

export function generateMetadata(): Metadata {
  return {
    title: 'Base64 Encoder & Decoder — Encode Decode Online Free',
    description:
      'Free Base64 encoder and decoder online. Encode text to Base64 or decode Base64 strings instantly. Browser-based, no upload needed.',
    keywords: [
      'base64 encoder',
      'base64 decoder',
      'encode base64',
      'decode base64',
      'base64 online',
      'base64 converter',
      'base64 encode decode',
    ],
    openGraph: {
      title: 'Base64 Encoder & Decoder — Encode Decode Online Free',
      description: 'Encode text to Base64 or decode Base64 strings online free. No signup, completely private, browser-based.',
      url: 'https://toolyfy.in/base64',
      images: [{ url: 'https://toolyfy.in/og/base64.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: 'https://toolyfy.in/base64',
    },
  };
}

export default function Base64Page() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <Base64Tool />
      </ToolLayout>
    </>
  );
}
