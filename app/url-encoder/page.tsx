import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import UrlEncoderTool from './UrlEncoderTool';

const tool = getToolBySlug('url-encoder')!;

export function generateMetadata(): Metadata {
  return {
    title: 'URL Encoder & Decoder — Encode and Decode URL Strings',
    description: 'Free URL encoder and decoder online. Encode text to URL-safe format or decode URL-encoded strings instantly.',
    keywords: ['url encoder', 'url decoder', 'encode url', 'decode url', 'url encoding', 'percent encoding'],
    openGraph: {
      title: 'URL Encoder & Decoder — Encode and Decode URL Strings',
      description: 'Encode text to URL format or decode percent-encoded strings. Browser-based, no server upload needed.',
      url: 'https://toolyfy.in/url-encoder',
      images: [{ url: 'https://toolyfy.in/og/url-encoder.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'URL Encoder & Decoder — Encode and Decode URL Strings',
      description: 'Encode text to URL format or decode percent-encoded strings. Browser-based, no server upload needed.',
      images: ['https://toolyfy.in/og/url-encoder.png'],
    },
    alternates: {
      canonical: 'https://toolyfy.in/url-encoder',
    },
  };
}

export default function UrlEncoderPage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <UrlEncoderTool />
      </ToolLayout>
    </>
  );
}
