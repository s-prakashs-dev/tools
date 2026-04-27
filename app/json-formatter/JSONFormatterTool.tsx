'use client';

import { useState } from 'react';

export default function JSONFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output || input);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (e) {
      alert('Failed to copy');
    }
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const getOutputWithLineNumbers = (text: string) => {
    if (!text) return '';
    const lines = text.split('\n');
    return lines.map((line, i) => `${(i + 1).toString().padStart(3, ' ')} | ${line}`).join('\n');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            className={`w-full min-h-[200px] resize-y bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-300 bg-red-50' : ''
            }`}
          />
        </div>
        <div className="relative">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-300 rounded-xl p-4 text-red-600 text-sm">
              Error: {error}
            </div>
          )}
          <div className="relative bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm text-gray-900 min-h-[200px]">
            <pre className="whitespace-pre-wrap break-words">{getOutputWithLineNumbers(output)}</pre>
            <button
              onClick={copyToClipboard}
              className={`absolute top-2 right-2 px-3 py-1 rounded text-xs font-medium transition-colors ${
                copySuccess
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => formatJSON(input, false)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-colors duration-150 flex items-center gap-2"
        >
          Format
        </button>
        <button
          onClick={() => formatJSON(input, true)}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-5 py-2.5 text-sm font-medium"
        >
          Minify
        </button>
        <button
          onClick={handleValidate}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-5 py-2.5 text-sm font-medium"
        >
          Validate
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output && !input}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-5 py-2.5 text-sm font-medium disabled:opacity-50"
        >
          Copy
        </button>
        <button
          onClick={clear}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-5 py-2.5 text-sm font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  );
}