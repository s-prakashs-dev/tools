'use client';

import { useState } from 'react';

export default function UuidGeneratorTool() {
  const [version, setVersion] = useState<'v1' | 'v4'>('v4');
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  // Simple UUID v4 generator
  const generateUUIDv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Simple UUID v1 generator (timestamp-based)
  const generateUUIDv1 = (): string => {
    const now = Date.now();
    const version = '1';
    const variant = '10';
    const rand = Math.random().toString(16).substr(2, 12).padEnd(12, '0');
    
    const timeHigh = ((now >>> 32) & 0xfff).toString(16).padStart(3, '0');
    const timeMid = ((now >>> 16) & 0xffff).toString(16).padStart(4, '0');
    const timeLow = (now & 0xffff).toString(16).padStart(4, '0');
    
    return `${timeLow}${timeMid}${timeHigh}-${timeMid.substr(0, 4)}-${version}${timeMid.substr(4)}-${variant}${rand.substr(0, 2)}-${rand.substr(2)}`;
  };

  const handleGenerate = () => {
    const generated: string[] = [];
    const countNum = Math.min(Math.max(1, count), 100);
    for (let i = 0; i < countNum; i++) {
      if (version === 'v4') {
        generated.push(generateUUIDv4());
      } else {
        generated.push(generateUUIDv1());
      }
    }
    setUuids(generated);
  };

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyAll = () => {
    const text = uuids.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClear = () => {
    setUuids([]);
    setCopied(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
        {/* Version selector */}
        <div>
          <label className="text-sm font-semibold text-gray-900 block mb-2">UUID Version</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="v4"
                checked={version === 'v4'}
                onChange={(e) => setVersion(e.target.value as 'v4' | 'v1')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">
                UUID v4 <span className="text-gray-500">(random)</span>
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="v1"
                checked={version === 'v1'}
                onChange={(e) => setVersion(e.target.value as 'v4' | 'v1')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">
                UUID v1 <span className="text-gray-500">(timestamp-based)</span>
              </span>
            </label>
          </div>
        </div>

        {/* Count input */}
        <div>
          <label className="text-sm font-semibold text-gray-900 block mb-2">Generate Count</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.min(Math.max(1, parseInt(e.target.value) || 1), 100))}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-600 self-center">(1-100)</span>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate {count} UUID{count > 1 ? 's' : ''}
        </button>
      </div>

      {/* UUIDs list */}
      {uuids.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Generated UUIDs ({uuids.length})</h3>
            <button
              onClick={handleCopyAll}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              {copied === -1 ? '✓ Copied All!' : 'Copy All'}
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {uuids.map((uuid, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="font-mono text-sm text-gray-900 break-all">{uuid}</div>
                <button
                  onClick={() => handleCopy(index, uuid)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap ml-3"
                >
                  {copied === index ? '✓' : '⧉'}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleClear}
            className="w-full bg-gray-200 text-gray-900 font-medium py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">About UUIDs</h4>
        <div className="text-xs text-blue-800 space-y-1">
          <p><strong>UUID v4:</strong> Random-based identifiers (most common). Perfect for most use cases.</p>
          <p><strong>UUID v1:</strong> Time-based identifiers with MAC address. Useful for sequence tracking.</p>
          <p>Each UUID is globally unique with extremely high probability (~340 trillion trillion combinations).</p>
        </div>
      </div>
    </div>
  );
}
