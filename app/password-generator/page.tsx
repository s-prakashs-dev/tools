import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ToolSchema from '@/components/ToolSchema';
import { getToolBySlug } from '@/lib/tools';
import PasswordGeneratorTool from './PasswordGeneratorTool';

const tool = getToolBySlug('password-generator')!;

export function generateMetadata(): Metadata {
  return {
    title: 'Password Generator Online Free — Strong Random Passwords',
    description:
      'Free online password generator. Create strong random passwords and UUIDs instantly. Customize length and character sets. Browser-based, no signup needed.',
    keywords: [
      'password generator',
      'random password generator',
      'strong password generator',
      'secure password generator online',
      'free password generator',
      'password generator online free',
    ],
    openGraph: {
      title: 'Password Generator Online Free — Strong Random Passwords',
      description:
        'Generate strong random passwords and UUIDs instantly. Customize length and character sets. Browser-based and secure.',
      url: 'https://toolyfy.in/password-generator',
      images: [{ url: 'https://toolyfy.in/og/password-generator.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Password Generator Online Free — Strong Random Passwords',
      description: 'Generate strong random passwords and UUIDs instantly. Browser-based and completely private.',
      images: ['https://toolyfy.in/og/password-generator.png'],
    },
    alternates: {
      canonical: 'https://toolyfy.in/password-generator',
    },
  };
}

export default function PasswordGeneratorPage() {
  return (
    <>
      <ToolSchema
        toolName={tool.title}
        toolSlug={tool.slug}
        description={tool.metaDescription}
        faqs={tool.faqs || []}
      />
      <ToolLayout tool={tool}>
        <PasswordGeneratorTool />
      </ToolLayout>
    </>
  );
}