import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import GSTCalculatorTool from './GSTCalculatorTool';

const tool = getToolBySlug('gst-calculator')!;

export function generateMetadata(): Metadata {
  return {
    title: 'GST Calculator India Free Online — Calculate CGST SGST IGST',
    description:
      'Free GST calculator for India. Calculate CGST, SGST, IGST instantly. Add or remove GST from amounts. Intrastate and interstate transactions.',
    keywords: [
      'gst calculator',
      'gst calculator india',
      'gst calculator online free',
      'cgst sgst calculator',
      'igst calculator',
      'gst calculation online',
      'indian gst calculator',
    ],
    openGraph: {
      title: 'GST Calculator India Free Online — Calculate CGST SGST IGST',
      description: 'Calculate GST instantly for Indian businesses. Add/remove GST, CGST, SGST, IGST calculations in one click.',
      url: 'https://toolyfy.in/gst-calculator',
      images: [{ url: 'https://toolyfy.in/og/gst-calculator.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'GST Calculator India Free Online — Calculate CGST SGST IGST',
      description: 'Calculate GST instantly for Indian businesses. Add/remove GST, CGST, SGST, IGST calculations in one click.',
      images: ['https://toolyfy.in/og/gst-calculator.png'],
    },
    alternates: {
      canonical: 'https://toolyfy.in/gst-calculator',
    },
  };
}

export default function GSTCalculatorPage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <GSTCalculatorTool />
      </ToolLayout>
    </>
  );
}