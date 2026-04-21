'use client';

import { useState } from 'react';
import Head from 'next/head';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';

const tool = getToolBySlug('json-formatter')!;

export default function JSONFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = (json: string, minify: boolean) => {
    try {
      setError('');
      if (!json.trim()) {
        setOutput('');
        return;
      }
      const parsed = JSON.parse(json);
      setOutput(minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2));
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMsg);
      setOutput('');
    }
  };

  const handleValidate = () => {
    try {
      JSON.parse(input);
      setError('');
      alert('Valid JSON!');
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMsg);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output || input);
    alert('Copied to clipboard!');
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.h1,
    description: tool.metaDescription,
    url: 'https://toolkit.example.com/json-formatter',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://toolkit.example.com/json-formatter" />
        <meta name="keywords" content={tool.keywords.join(', ')} />
        <meta property="og:title" content={tool.title} />
        <meta property="og:description" content={tool.metaDescription} />
        <meta property="og:url" content="https://toolkit.example.com/json-formatter" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <ToolLayout title={tool.h1} description={tool.fullDescription}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Input JSON</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name": "John", "age": 30}'
                className={`h-64 w-full resize-none rounded-lg border px-3 py-2 font-mono text-sm placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  error
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            <div className="space-y-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Output JSON</label>
              <div className="h-64 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900 whitespace-pre-wrap break-words">
                {output}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => formatJSON(input, false)}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
            >
              Format
            </button>
            <button
              onClick={() => formatJSON(input, true)}
              className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700"
            >
              Minify
            </button>
            <button
              onClick={handleValidate}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Validate
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!output && !input}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy
            </button>
            <button
              onClick={clear}
              className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
            >
              Clear
            </button>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
