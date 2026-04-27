import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
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
    },
    alternates: {
      canonical: 'https://toolyfy.in/json-formatter',
    },
  };
}

export default function JSONFormatterPage() {
  return (
    <ToolLayout tool={tool}>
      <JSONFormatterTool />
    </ToolLayout>
  );
}