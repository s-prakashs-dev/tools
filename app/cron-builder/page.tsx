'use client';

import { useState } from 'react';
import Head from 'next/head';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';

const tool = getToolBySlug('cron-builder')!;

interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

const PRESETS = {
  'Every Minute': '* * * * *',
  'Every Hour': '0 * * * *',
  'Daily at Midnight': '0 0 * * *',
  'Weekdays 9 AM': '0 9 * * 1-5',
  'Weekly Sunday Midnight': '0 0 * * 0',
};

export default function CronBuilderPage() {
  const [fields, setFields] = useState<CronFields>({
    minute: '0',
    hour: '0',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
  });

  const getCronDescription = (f: CronFields): string => {
    const minute = f.minute === '*' ? 'every minute' : `at minute ${f.minute}`;
    const hour = f.hour === '*' ? 'every hour' : `at ${parseInt(f.hour)}:00`;
    const dom = f.dayOfMonth === '*' ? 'every day' : `on day ${f.dayOfMonth}`;
    const dow = f.dayOfWeek === '*' ? '' : `on ${getDayOfWeekName(f.dayOfWeek)}`;
    const month = f.month === '*' ? '' : `in ${getMonthName(f.month)}`;

    let desc = minute;
    if (f.minute === '0') desc = hour;
    if (f.dayOfMonth !== '*' || f.dayOfWeek !== '*') {
      desc = `${hour}, ${dom} ${dow}`.replace(/,\s*$/, '');
    }
    if (f.month !== '*') desc += ` ${month}`;

    return desc;
  };

  const getDayOfWeekName = (dow: string): string => {
    const days: Record<string, string> = {
      '0': 'Sunday',
      '1': 'Monday',
      '2': 'Tuesday',
      '3': 'Wednesday',
      '4': 'Thursday',
      '5': 'Friday',
      '6': 'Saturday',
    };
    if (dow.includes('-')) {
      const [start, end] = dow.split('-');
      return `${days[start]} through ${days[end]}`;
    }
    return days[dow] || dow;
  };

  const getMonthName = (month: string): string => {
    const months: Record<string, string> = {
      '1': 'January',
      '2': 'February',
      '3': 'March',
      '4': 'April',
      '5': 'May',
      '6': 'June',
      '7': 'July',
      '8': 'August',
      '9': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
    };
    return months[month] || month;
  };

  const matches = (pattern: string, value: number, min: number): boolean => {
    if (pattern === '*') return true;
    if (pattern === String(value)) return true;
    if (pattern.includes('-')) {
      const [start, end] = pattern.split('-').map(Number);
      return value >= start && value <= end;
    }
    if (pattern.includes(',')) {
      return pattern.split(',').map(Number).includes(value);
    }
    if (pattern.includes('/')) {
      const [start, step] = pattern.split('/').map(Number);
      const startVal = start === 0 ? min : start;
      return (value - startVal) % step === 0;
    }
    return false;
  };

  const matchesCron = (f: CronFields, date: Date): boolean => {
    return (
      matches(f.minute, date.getMinutes(), 0) &&
      matches(f.hour, date.getHours(), 0) &&
      matches(f.dayOfMonth, date.getDate(), 1) &&
      matches(f.month, date.getMonth() + 1, 1) &&
      matches(f.dayOfWeek, date.getDay(), 0)
    );
  };

  const getNextRuntimes = (f: CronFields, count: number): Date[] => {
    const runs: Date[] = [];
    const now = new Date();
    const next = new Date(now);
    next.setSeconds(0);
    next.setMilliseconds(0);
    next.setMinutes(next.getMinutes() + 1);

    for (let i = 0; i < count * 10 && runs.length < count; i++) {
      if (matchesCron(f, next)) runs.push(new Date(next));
      next.setMinutes(next.getMinutes() + 1);
    }

    return runs;
  };

  const applyPreset = (preset: string) => {
    const [minute, hour, dayOfMonth, month, dayOfWeek] = preset.split(' ');
    setFields({ minute, hour, dayOfMonth, month, dayOfWeek });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronString);
    alert('Cron string copied!');
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.h1,
    description: tool.metaDescription,
    url: 'https://toolkit.example.com/cron-builder',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const cronString = `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
  const description = getCronDescription(fields);
  const nextRuns = getNextRuntimes(fields, 5);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://toolkit.example.com/cron-builder" />
        <meta name="keywords" content={tool.keywords.join(', ')} />
        <meta property="og:title" content={tool.title} />
        <meta property="og:description" content={tool.metaDescription} />
        <meta property="og:url" content="https://toolkit.example.com/cron-builder" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <ToolLayout title={tool.h1} description={tool.fullDescription}>
        <div className="space-y-8">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Quick Presets</label>
            <div className="flex flex-wrap gap-3">
              {Object.entries(PRESETS).map(([name, preset]) => (
                <button
                  key={name}
                  onClick={() => applyPreset(preset)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {[
              { key: 'minute', label: 'Minute' },
              { key: 'hour', label: 'Hour' },
              { key: 'dayOfMonth', label: 'Day' },
              { key: 'month', label: 'Month' },
              { key: 'dayOfWeek', label: 'Day of Week' },
            ].map(({ key, label }) => (
              <div key={key} className="rounded-lg border border-gray-200 bg-white p-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="text"
                  value={fields[key as keyof CronFields]}
                  onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
                  placeholder="* or value"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-gray-900 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Cron expression</p>
                <p className="font-mono text-lg font-semibold text-green-400">{cronString}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="mb-1 text-sm text-gray-500">Human-readable</p>
            <p className="font-medium capitalize text-blue-600">{description}</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Next 5 runtimes</p>
            <div className="space-y-2">
              {nextRuns.map((run, idx) => (
                <div key={idx} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-sm text-gray-600">{run.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
