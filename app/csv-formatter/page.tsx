import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import CSVFormatterTool from './CSVFormatterTool';

const tool = getToolBySlug('csv-formatter')!;

export function generateMetadata(): Metadata {
  return {
    title: 'CSV Formatter & Viewer Online Free — Format CSV Data',
    description:
      'Format and preview CSV data as a clean table online free. Convert CSV to table instantly in browser. No upload needed.',
    keywords: [
      'csv formatter',
      'csv viewer online',
      'csv to table',
      'format csv online free',
      'csv formatter online',
    ],
    openGraph: {
      title: 'CSV Formatter & Viewer Online Free — Format CSV Data',
      description:
        'Format and preview CSV data as a clean table online free. Convert CSV to table instantly in browser.',
      url: 'https://toolyfy.in/csv-formatter',
      images: [{ url: 'https://toolyfy.in/og/csv-formatter.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'CSV Formatter & Viewer Online Free — Format CSV Data',
      description: 'Format and preview CSV data as a clean table online free. Convert CSV to table instantly in browser.',
      images: ['https://toolyfy.in/og/csv-formatter.png'],
    },
    alternates: {
      canonical: 'https://toolyfy.in/csv-formatter',
    },
  };
}

export default function CSVFormatterPage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <CSVFormatterTool />
      </ToolLayout>
    </>
  );
}