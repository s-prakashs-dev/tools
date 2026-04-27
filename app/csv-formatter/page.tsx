import Head from 'next/head';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
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
    },
    alternates: {
      canonical: 'https://toolyfy.in/csv-formatter',
    },
  };
}

export default function CSVFormatterPage() {
  return (
    <ToolLayout tool={tool}>
      <CSVFormatterTool />
    </ToolLayout>
  );
}