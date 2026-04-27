import Head from 'next/head';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';
import ImageCompressorTool from './ImageCompressorTool';

const tool = getToolBySlug('image-compressor')!;

export function generateMetadata(): Metadata {
  return {
    title: 'Image Compressor Online Free — Compress JPG PNG WebP',
    description:
      'Compress and resize images online for free. Reduce image file size without losing quality. Supports JPG PNG WebP. No upload to server.',
    keywords: [
      'image compressor',
      'compress image online',
      'image compressor online free',
      'reduce image size online',
      'jpg compressor',
      'png compressor',
      'image resizer online',
    ],
    openGraph: {
      title: 'Image Compressor Online Free — Compress JPG PNG WebP',
      description:
        'Compress and resize images online for free. Reduce image file size without losing quality. Supports JPG PNG WebP.',
      url: 'https://toolyfy.in/image-compressor',
    },
    alternates: {
      canonical: 'https://toolyfy.in/image-compressor',
    },
  };
}

export default function ImageCompressorPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageCompressorTool />
    </ToolLayout>
  );
}