'use client';

import { useState } from 'react';

export default function UrlEncoderTool() {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleEncode = (text: string) => {
    try {
      setError('');
      if (!text.trim()) {
        setEncoded('');
        setDecoded('');
        return;
      }
      const enc = encodeURIComponent(text);
      const dec = text;
      setEncoded(enc);
      setDecoded(dec);
    } catch (e) {
      setError('Encoding failed');
      setEncoded('');
    }
  };

  const handleDecode = (text: string) => {
    try {
      setError('');
      if (!text.trim()) {
        setEncoded('');
        setDecoded('');
        return;
      }
      const dec = decodeURIComponent(text);
      setDecoded(dec);
      setEncoded(text);
    } catch (e) {
      setError('Invalid URL encoding');
      setDecoded('');
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (mode === 'encode') {
      handleEncode(value);
    } else {
      handleDecode(value);
    }
  };

  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    setInput('');
    setEncoded('');
    setDecoded('');
    setError('');
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClear = () => {
    setInput('');
    setEncoded('');
    setDecoded('');
    setError('');
  };

  const handleSwap = () => {
    if (mode === 'encode') {
      setMode('decode');
      setInput(encoded);
      handleDecode(encoded);
    } else {
      setMode('encode');
      setInput(decoded);
      handleEncode(decoded);
    }
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
            onChange={(e) => handleModeChange(e.target.value as 'encode' | 'decode')}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Encode URL</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="decode"
            checked={mode === 'decode'}
            onChange={(e) => handleModeChange(e.target.value as 'encode' | 'decode')}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Decode URL</span>
        </label>
      </div>

      {/* Input/Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            {mode === 'encode' ? 'Text to Encode' : 'Encoded Text to Decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1 min-h-[320px] font-mono text-sm bg-white border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter encoded URL...'}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
            </label>
            <button
              onClick={() => handleCopy(mode === 'encode' ? encoded : decoded, 'output')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              {copied === 'output' ? '✓ Copied!' : '⧉ Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={mode === 'encode' ? encoded : decoded}
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

      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleSwap}
          className="bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          ⇄ Swap & Convert
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-200 text-gray-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Info */}
      {(encoded || decoded) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700">
            <strong>Original:</strong> {mode === 'encode' ? input.length : decoded.length} chars |{' '}
            <strong>Result:</strong> {mode === 'encode' ? encoded.length : input.length} chars
          </p>
        </div>
      )}
    </div>
  );
}
