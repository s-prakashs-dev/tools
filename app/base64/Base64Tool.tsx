'use client';

import { useState } from 'react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Encoding failed';
      setError(errorMsg);
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid Base64 input';
      setError(errorMsg);
      setOutput('');
    }
  };

  const handleConvert = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleSwap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        setInput(content);
        setError('');
      } catch (err) {
        setError('Failed to read file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Mode selector */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="encode"
            checked={mode === 'encode'}
            onChange={(e) => setMode(e.target.value as 'encode' | 'decode')}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Encode to Base64</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="decode"
            checked={mode === 'decode'}
            onChange={(e) => setMode(e.target.value as 'encode' | 'decode')}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Decode from Base64</span>
        </label>
      </div>

      {/* Input/Output section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
            </label>
            <label className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
              Choose File
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept="text/plain,.txt"
              />
            </label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-h-[320px] font-mono text-sm bg-white border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
          />
        </div>

        {/* Output panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
            </label>
            <button
              onClick={handleCopy}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              {copied ? '✓ Copied!' : '⧉ Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className={`flex-1 min-h-[320px] font-mono text-sm rounded-xl p-4 resize-y focus:outline-none ${
              error
                ? 'bg-red-50 border border-red-300 text-red-700'
                : 'bg-gray-50 border border-gray-200 text-gray-900'
            }`}
          />
          {error && (
            <p className="text-red-600 text-xs flex items-center gap-1">
              <span>⚠</span> {error}
            </p>
          )}
        </div>
      </div>

      {/* Button bar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleConvert}
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <button
          onClick={handleSwap}
          className="bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          ⇄ Swap
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-200 text-gray-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Size indicator */}
      {output && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700">
            <strong>Input:</strong> {input.length} characters | <strong>Output:</strong> {output.length} characters
            {mode === 'encode' && (
              <>
                {' '}
                | <strong>Size increase:</strong> {((output.length / input.length - 1) * 100).toFixed(1)}%
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
