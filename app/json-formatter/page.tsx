import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import JSONFormatterTool from './JSONFormatterTool';

const tool = getToolBySlug('json-formatter')!;

export function generateMetadata(): Metadata {
  return {
    title: 'JSON Formatter & Validator Online Free — Beautify JSON',
    description:
      'Free online JSON formatter, validator and beautifier. Format, minify and validate JSON instantly in your browser. No upload needed, completely private.',
    keywords: [
      'json formatter',
      'json validator online',
      'beautify json',
      'json formatter online free',
      'json beautifier',
      'format json online',
      'json minifier',
    ],
    openGraph: {
      title: 'JSON Formatter & Validator Online Free — Beautify JSON',
      description: 'Format, validate and beautify JSON instantly in your browser. No signup, no server uploads, completely private.',
      url: 'https://toolyfy.in/json-formatter',
      images: [{ url: 'https://toolyfy.in/og/json-formatter.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'JSON Formatter & Validator Online Free — Beautify JSON',
      description: 'Format, validate and beautify JSON instantly in your browser. No signup, no server uploads, completely private.',
      images: ['https://toolyfy.in/og/json-formatter.png'],
    },
    alternates: {
      canonical: 'https://toolyfy.in/json-formatter',
    },
  };
}

export default function JSONFormatterPage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <JSONFormatterTool />
      </ToolLayout>
    </>
  );
}