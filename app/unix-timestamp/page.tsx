import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import UnixTimestampTool from './UnixTimestampTool';

const tool = getToolBySlug('unix-timestamp')!;

export function generateMetadata(): Metadata {
  return {
    title: 'Unix Timestamp Converter - Convert to/from Date Online',
    description:
      'Free Unix timestamp converter online. Convert epoch time to date in UTC and IST. Real-time Unix timestamp clock.',
    keywords: [
      'unix timestamp',
      'unix timestamp converter',
      'epoch time',
      'timestamp converter',
      'unix time converter online',
    ],
    openGraph: {
      title: 'Unix Timestamp Converter - Convert to/from Date Online',
      description: 'Convert Unix epoch time to human-readable dates. Real-time timestamp clock, UTC and IST support.',
      url: 'https://toolyfy.in/unix-timestamp',
      images: [{ url: 'https://toolyfy.in/og/unix-timestamp.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: 'https://toolyfy.in/unix-timestamp',
    },
  };
}

export default function UnixTimestampPage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <UnixTimestampTool />
      </ToolLayout>
    </>
  );
}
