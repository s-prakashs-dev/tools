import Head from 'next/head';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';
import ColorPaletteTool from './ColorPaletteTool';

const tool = getToolBySlug('color-palette')!;

export function generateMetadata(): Metadata {
  return {
    title: 'Color Palette Generator Online Free — HEX RGB HSL Colors',
    description:
      'Generate beautiful color palettes online free. Get HEX RGB HSL values instantly. Create complementary triadic analogous color schemes.',
    keywords: [
      'color palette generator',
      'color scheme generator',
      'hex color generator',
      'rgb color generator',
      'hsl color generator',
      'complementary colors',
      'triadic colors',
      'analogous colors',
    ],
    openGraph: {
      title: 'Color Palette Generator Online Free — HEX RGB HSL Colors',
      description:
        'Generate beautiful color palettes online free. Get HEX RGB HSL values instantly. Create complementary triadic analogous color schemes.',
      url: 'https://toolyfy.in/color-palette',
    },
    alternates: {
      canonical: 'https://toolyfy.in/color-palette',
    },
  };
}

export default function ColorPalettePage() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Color Palette Generator',
              description: 'Free online color palette generator',
              url: 'https://toolyfy.in/color-palette',
              applicationCategory: 'DeveloperApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'INR',
              },
            }),
          }}
        />
      </Head>
      <ToolLayout tool={tool}>
        <ColorPaletteTool />
      </ToolLayout>
    </>
  );
}