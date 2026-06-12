'use client';

import { useState } from 'react';

export default function HtmlEncoderTool() {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '©': '&copy;',
    '®': '&reg;',
    '™': '&trade;',
    '€': '&euro;',
    '£': '&pound;',
    '¥': '&yen;',
    '¢': '&cent;',
    '§': '&sect;',
    '¶': '&para;',
    '†': '&dagger;',
    '‡': '&Dagger;',
    '•': '&bull;',
    '‰': '&permil;',
    '′': '&prime;',
    '″': '&Prime;',
    '‾': '&oline;',
    '⁄': '&frasl;',
    '℘': '&weierp;',
    'ℑ': '&image;',
    'ℜ': '&real;',
    '∀': '&forall;',
    '∂': '&part;',
    '∃': '&exists;',
    '∅': '&empty;',
    '∇': '&nabla;',
    '∈': '&isin;',
    '∉': '&notin;',
    '∋': '&ni;',
    '∏': '&prod;',
    '∑': '&sum;',
  };

  const handleEncode = (text: string) => {
    try {
      setError('');
      if (!text.trim()) {
        setEncoded('');
        setDecoded('');
        return;
      }

      let result = text;
      // Encode in specific order: & first, then other characters
      result = result.replace(/&(?!#?\w+;)/g, '&amp;');
      result = result.replace(/</g, '&lt;');
      result = result.replace(/>/g, '&gt;');
      result = result.replace(/"/g, '&quot;');
      result = result.replace(/'/g, '&#39;');

      setEncoded(result);
      setDecoded(text);
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

      let result = text;
      // Decode named entities
      result = result.replace(/&amp;/g, '&');
      result = result.replace(/&lt;/g, '<');
      result = result.replace(/&gt;/g, '>');
      result = result.replace(/&quot;/g, '"');
      result = result.replace(/&#39;/g, "'");

      // Decode numeric entities
      result = result.replace(/&#(\d+);/g, (match, code) => {
        return String.fromCharCode(parseInt(code, 10));
      });

      result = result.replace(/&#x([0-9a-f]+);/gi, (match, code) => {
        return String.fromCharCode(parseInt(code, 16));
      });

      setDecoded(result);
      setEncoded(text);
    } catch (e) {
      setError('Decoding failed');
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
          <span className="text-sm font-medium text-gray-700">Encode HTML</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="decode"
            checked={mode === 'decode'}
            onChange={(e) => handleModeChange(e.target.value as 'encode' | 'decode')}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Decode HTML</span>
        </label>
      </div>

      {/* Input/Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            {mode === 'encode' ? 'Text to Encode' : 'HTML to Decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1 min-h-[320px] font-mono text-sm bg-white border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter HTML entities...'}
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

      {/* Entity reference */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Common HTML Entities</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div><code className="bg-gray-100 px-2 py-1 rounded">&amp;</code> → &amp;</div>
          <div><code className="bg-gray-100 px-2 py-1 rounded">&lt;</code> → &lt;</div>
          <div><code className="bg-gray-100 px-2 py-1 rounded">&gt;</code> → &gt;</div>
          <div><code className="bg-gray-100 px-2 py-1 rounded">&quot;</code> → &quot;</div>
          <div><code className="bg-gray-100 px-2 py-1 rounded">&#39;</code> → &#39;</div>
          <div><code className="bg-gray-100 px-2 py-1 rounded">&nbsp;</code> → (space)</div>
        </div>
      </div>
    </div>
  );
}
