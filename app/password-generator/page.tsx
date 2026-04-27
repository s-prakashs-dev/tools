import Head from 'next/head';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';
import PasswordGeneratorTool from './PasswordGeneratorTool';

const tool = getToolBySlug('password-generator')!;

export function generateMetadata(): Metadata {
  return {
    title: 'Password Generator Online Free — Strong Random Password',
    description:
      'Generate strong random passwords and UUIDs instantly online. Customise length and complexity. Free secure password generator.',
    keywords: [
      'password generator',
      'random password generator',
      'strong password generator',
      'uuid generator',
      'secure password generator online',
      'free password generator',
    ],
    openGraph: {
      title: 'Password Generator Online Free — Strong Random Password',
      description:
        'Generate strong random passwords and UUIDs instantly online. Customise length and complexity. Free secure password generator.',
      url: 'https://toolyfy.in/password-generator',
    },
    alternates: {
      canonical: 'https://toolyfy.in/password-generator',
    },
  };
}

export default function PasswordGeneratorPage() {
  return (
    <ToolLayout tool={tool}>
      <PasswordGeneratorTool />
    </ToolLayout>
  );
}