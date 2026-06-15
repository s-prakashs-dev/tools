import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import UuidGeneratorTool from './UuidGeneratorTool';

const tool = getToolBySlug('uuid-generator')!;

export function generateMetadata(): Metadata {
  return {
    title: 'UUID Generator - Generate Unique Identifiers Online',
    description:
      'Free UUID generator online. Generate UUID v4 (random) and UUID v1 (timestamp-based) identifiers. Batch generation, copy all, no signup needed.',
    keywords: ['uuid generator', 'uuid v4', 'uuid v1', 'generate uuid', 'uuid online'],
    openGraph: {
      title: 'UUID Generator - Generate Unique Identifiers Online',
      description: 'Generate UUID v4 and v1 identifiers instantly. Batch support up to 100 UUIDs per generation.',
      url: 'https://toolyfy.in/uuid-generator',
      images: [{ url: 'https://toolyfy.in/og/uuid-generator.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'UUID Generator - Generate Unique Identifiers Online',
      description: 'Generate UUID v4 and v1 identifiers instantly. Batch support up to 100 UUIDs per generation.',
      images: ['https://toolyfy.in/og/uuid-generator.png'],
    },
    alternates: {
      canonical: 'https://toolyfy.in/uuid-generator',
    },
  };
}

export default function UuidGeneratorPage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <UuidGeneratorTool />
      </ToolLayout>
    </>
  );
}
