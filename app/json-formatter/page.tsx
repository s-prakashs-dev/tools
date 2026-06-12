import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import JSONFormatterTool from './JSONFormatterTool';

const tool = getToolBySlug('json-formatter')!;

export function generateMetadata(): Metadata {
  return {
    title: 'JSON Formatter & Validator Online Free — Toolyfy',
    description:
      'Format, beautify and validate JSON online for free. Instant JSON formatter with error detection. No signup required.',
    keywords: [
      'json formatter',
      'json formatter online',
      'json validator',
      'json beautifier',
      'format json online free',
      'json formatter india',
      'online json formatter',
    ],
    openGraph: {
      title: 'JSON Formatter & Validator Online Free — Toolyfy',
      description: 'Format and validate JSON instantly in your browser. Free, fast, no signup.',
      url: 'https://toolyfy.in/json-formatter',
      images: [{ url: 'https://toolyfy.in/og/json-formatter.png', width: 1200, height: 630 }],
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