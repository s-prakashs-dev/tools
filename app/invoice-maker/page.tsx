import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import InvoiceMakerTool from './InvoiceMakerTool';

const tool = getToolBySlug('invoice-maker')!;

export function generateMetadata(): Metadata {
  return {
    title: 'Free Invoice Maker Online — Create GST Invoice PDF India',
    description:
      'Free online GST invoice maker for Indian businesses. Create, format and download professional invoices as PDF. No signup needed.',
    keywords: [
      'free invoice maker',
      'invoice generator online india',
      'gst invoice maker free',
      'create invoice pdf online',
      'free invoice maker india',
      'receipt maker online',
    ],
    openGraph: {
      title: 'Free Invoice Maker Online — Create GST Invoice PDF India',
      description: 'Create professional GST invoices instantly. Add items, calculate taxes, download PDF. Free and browser-based.',
      url: 'https://toolyfy.in/invoice-maker',
      images: [{ url: 'https://toolyfy.in/og/invoice-maker.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free Invoice Maker Online — Create GST Invoice PDF India',
      description: 'Create professional GST invoices instantly. Add items, calculate taxes, download PDF. Free and browser-based.',
      images: ['https://toolyfy.in/og/invoice-maker.png'],
    },
    alternates: {
      canonical: 'https://toolyfy.in/invoice-maker',
    },
  };
}

export default function InvoiceMakerPage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <InvoiceMakerTool />
      </ToolLayout>
    </>
  );
}