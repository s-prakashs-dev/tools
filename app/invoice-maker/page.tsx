import Head from 'next/head';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';
import InvoiceMakerTool from './InvoiceMakerTool';

const tool = getToolBySlug('invoice-maker')!;

export function generateMetadata(): Metadata {
  return {
    title: 'Free Invoice Maker Online — Create GST Invoice PDF India',
    description:
      'Create professional GST invoices and receipts online free. Download as PDF. Add items, GST, logo. No signup. Made for India.',
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
      description:
        'Create professional GST invoices and receipts online free. Download as PDF. Add items, GST, logo. No signup.',
      url: 'https://toolyfy.in/invoice-maker',
    },
    alternates: {
      canonical: 'https://toolyfy.in/invoice-maker',
    },
  };
}

export default function InvoiceMakerPage() {
  return (
    <ToolLayout tool={tool}>
      <InvoiceMakerTool />
    </ToolLayout>
  );
}