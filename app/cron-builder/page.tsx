import Head from 'next/head';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';
import CronBuilderTool from './CronBuilderTool';

const tool = getToolBySlug('cron-builder')!;

export function generateMetadata(): Metadata {
  return {
    title: 'Cron Expression Builder & Generator Online Free',
    description:
      'Build and validate cron expressions visually online. Get human readable cron descriptions and next run times. Free cron generator.',
    keywords: [
      'cron expression builder',
      'cron generator',
      'cron expression generator online',
      'cron syntax builder',
      'online cron builder free',
    ],
    openGraph: {
      title: 'Cron Expression Builder & Generator Online Free',
      description:
        'Build and validate cron expressions visually online. Get human readable cron descriptions and next run times.',
      url: 'https://toolyfy.in/cron-builder',
    },
    alternates: {
      canonical: 'https://toolyfy.in/cron-builder',
    },
  };
}

export default function CronBuilderPage() {
  return (
    <ToolLayout tool={tool}>
      <CronBuilderTool />
    </ToolLayout>
  );
}