'use client';

import { useState } from 'react';
import Head from 'next/head';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';

const tool = getToolBySlug('csv-formatter')!;
type CSVRow = Record<string, string>;

export default function CSVFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<CSVRow[]>([]);
  const [view, setView] = useState<'raw' | 'table'>('table');
  const [error, setError] = useState('');

  const parseCSVLine = (line: string): string[] => {
    const result = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          current += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  };

  const parseCSV = (csv: string) => {
    try {
      setError('');
      if (!csv.trim()) {
        setOutput([]);
        return;
      }

      const lines = csv.trim().split('\n');
      const headers: string[] = [];
      const data: CSVRow[] = [];

      for (let i = 0; i < lines.length; i++) {
        const row = parseCSVLine(lines[i]);

        if (i === 0) {
          headers.push(...row);
        } else {
          const rowObj: CSVRow = {};
          headers.forEach((header, idx) => {
            rowObj[header] = row[idx] || '';
          });
          data.push(rowObj);
        }
      }

      setOutput(data);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid CSV';
      setError(errorMsg);
      setOutput([]);
    }
  };

  const downloadCSV = () => {
    if (!input) return;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(input));
    element.setAttribute('download', 'data.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyAsTab = () => {
    if (output.length === 0) return;
    const headers = Object.keys(output[0]);
    let tsv = headers.join('\t') + '\n';
    output.forEach((row) => {
      tsv += headers.map((h) => row[h] || '').join('\t') + '\n';
    });
    navigator.clipboard.writeText(tsv);
    alert('Copied as TSV!');
  };

  const clear = () => {
    setInput('');
    setOutput([]);
    setError('');
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.h1,
    description: tool.metaDescription,
    url: 'https://toolkit.example.com/csv-formatter',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const headers = output.length > 0 ? Object.keys(output[0]) : [];

  return (
    <>
      <Head>
        <link rel="canonical" href="https://toolkit.example.com/csv-formatter" />
        <meta name="keywords" content={tool.keywords.join(', ')} />
        <meta property="og:title" content={tool.title} />
        <meta property="og:description" content={tool.metaDescription} />
        <meta property="og:url" content="https://toolkit.example.com/csv-formatter" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <ToolLayout title={tool.h1} description={tool.fullDescription}>
        <div className="space-y-8">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">CSV Input</label>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                parseCSV(e.target.value);
              }}
              placeholder="name,age,city&#10;John,30,NYC&#10;Jane,28,LA"
              className="h-40 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setView('table')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                view === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setView('raw')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                view === 'raw'
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Raw View
            </button>
            <button
              onClick={downloadCSV}
              disabled={!input}
              className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download CSV
            </button>
            <button
              onClick={copyAsTab}
              disabled={output.length === 0}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy as TSV
            </button>
            <button
              onClick={clear}
              className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
            >
              Clear
            </button>
          </div>

          {view === 'table' && output.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100 text-gray-700">
                    {headers.map((header) => (
                      <th key={header} className="px-4 py-3 text-left font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {output.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100 text-gray-800 even:bg-gray-50">
                      {headers.map((header) => (
                        <td key={header} className="px-4 py-3">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === 'raw' && output.length > 0 && (
            <div className="max-h-96 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900">
                {JSON.stringify(output, null, 2)}
              </pre>
            </div>
          )}

          {output.length === 0 && input && (
            <p className="py-8 text-center text-sm text-gray-500">No data to display</p>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
