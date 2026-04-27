'use client';

import { useState } from 'react';
import Head from 'next/head';

type CSVRow = Record<string, string>;

export default function CSVFormatterTool() {
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
    name: 'CSV Formatter & Viewer Online Free',
    description: 'Free online CSV formatter and table viewer',
    url: 'https://toolyfy.in/csv-formatter',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  const headers = output.length > 0 ? Object.keys(output[0]) : [];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
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
      <section className="prose max-w-none pt-10 text-gray-700">
        <h2 className="text-xl font-semibold text-gray-900">Using the CSV formatter for the first time</h2>
        <p>
          This CSV formatter helps anyone new to CSV files make data easier to read and share. Paste your comma-separated text into the editor, and the CSV formatter converts it into a neat table right away. If you have not worked with CSV before, the tool shows you how rows and columns line up clearly.
        </p>
        <p>
          The CSV formatter also lets you switch between raw text and table view so you can check your data quickly. It is especially useful for cleaning CSV files before importing them into spreadsheets or systems. The CSV formatter keeps the process simple and visual for first-time users.
        </p>
        <p>
          Whenever you need to understand a CSV file better, this CSV formatter makes it easy. It provides a friendly, step-by-step experience so your data looks organized and is ready to use.
        </p>
      </section>
    </>
  );
}