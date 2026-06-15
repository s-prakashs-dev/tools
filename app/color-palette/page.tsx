import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
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
      images: [{ url: 'https://toolyfy.in/og/color-palette.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Color Palette Generator Online Free — HEX RGB HSL Colors',
      description: 'Generate beautiful color palettes online free. Get HEX RGB HSL values instantly.',
      images: ['https://toolyfy.in/og/color-palette.png'],
    },
    alternates: {
      canonical: 'https://toolyfy.in/color-palette',
    },
  };
}

export default function ColorPalettePage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <ColorPaletteTool />
      </ToolLayout>
    </>
  );
}