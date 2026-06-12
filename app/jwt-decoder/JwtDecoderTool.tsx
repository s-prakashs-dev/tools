'use client';

import { useState } from 'react';

interface JWTDecoded {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export default function JwtDecoderTool() {
  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState<JWTDecoded | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const decodeJWT = (token: string) => {
    try {
      setError('');
      const parts = token.trim().split('.');

      if (parts.length !== 3) {
        setError('Invalid JWT: Must have 3 parts separated by dots');
        setDecoded(null);
        return;
      }

      const decode = (part: string) => {
        try {
          const padded = part + '='.repeat((4 - (part.length % 4)) % 4);
          const decoded = atob(padded);
          return JSON.parse(decoded);
        } catch {
          return { raw: part };
        }
      };

      setDecoded({
        header: decode(parts[0]),
        payload: decode(parts[1]),
        signature: parts[2],
      });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Failed to decode JWT';
      setError(errorMsg);
      setDecoded(null);
    }
  };

  const isExpired = (payload: Record<string, unknown>) => {
    const exp = payload.exp as number | undefined;
    if (!exp) return null;
    return exp * 1000 < Date.now();
  };

  const handleDecode = () => {
    if (input.trim()) {
      decodeJWT(input);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClear = () => {
    setInput('');
    setDecoded(null);
    setError('');
  };

  const copyJSON = (obj: Record<string, unknown>) => {
    handleCopy(JSON.stringify(obj, null, 2), 'json');
  };

  const formatJson = (obj: Record<string, unknown>) => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="space-y-6">
      {/* Input section */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Paste your JWT token
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] font-mono text-sm bg-white border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        />
        {error && (
          <p className="text-red-600 text-xs flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>

      {/* Button bar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleDecode}
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Decode
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-200 text-gray-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Decoded output */}
      {decoded && (
        <div className="space-y-4">
          {/* Header */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Header</h3>
              <button
                onClick={() => copyJSON(decoded.header as Record<string, unknown>)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {copied === 'header' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200 overflow-x-auto">
              {formatJson(decoded.header as Record<string, unknown>)}
            </pre>
          </div>

          {/* Payload */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">Payload</h3>
                {decoded.payload && isExpired(decoded.payload as Record<string, unknown>) !== null && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isExpired(decoded.payload as Record<string, unknown>)
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {isExpired(decoded.payload as Record<string, unknown>) ? 'Expired' : 'Valid'}
                  </span>
                )}
              </div>
              <button
                onClick={() => copyJSON(decoded.payload as Record<string, unknown>)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {copied === 'payload' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200 overflow-x-auto">
              {formatJson(decoded.payload as Record<string, unknown>)}
            </pre>
          </div>

          {/* Signature */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Signature</h3>
              <button
                onClick={() => handleCopy(decoded.signature, 'signature')}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {copied === 'signature' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200 break-all font-mono">
              {decoded.signature}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
