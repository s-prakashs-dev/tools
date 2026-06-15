import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import HtmlEncoderTool from './HtmlEncoderTool';

const tool = getToolBySlug('html-encoder')!;

export function generateMetadata(): Metadata {
  return {
    title: 'HTML Entity Encoder & Decoder - HTML Encoding Tool',
    description:
      'HTML entity encoder and decoder online free. Encode text to HTML entities or decode HTML-encoded strings instantly. No signup needed.',
    keywords: ['html encoder', 'html decoder', 'html entity', 'encode html', 'decode html'],
    openGraph: {
      title: 'HTML Entity Encoder & Decoder - HTML Encoding Tool',
      description: 'Encode text to HTML entities or decode HTML-encoded strings online. Prevent XSS attacks with safe HTML encoding.',
      url: 'https://toolyfy.in/html-encoder',
      images: [{ url: 'https://toolyfy.in/og/html-encoder.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'HTML Entity Encoder & Decoder - HTML Encoding Tool',
      description: 'Encode text to HTML entities or decode HTML-encoded strings online. Prevent XSS attacks with safe HTML encoding.',
      images: ['https://toolyfy.in/og/html-encoder.png'],
    },
    alternates: {
      canonical: 'https://toolyfy.in/html-encoder',
    },
  };
}

export default function HtmlEncoderPage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <HtmlEncoderTool />
      </ToolLayout>
    </>
  );
}
