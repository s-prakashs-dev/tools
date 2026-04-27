'use client';

import { useState } from 'react';

export default function JSONFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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
      alert('✓ Valid JSON!');
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMsg);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output || input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    formatJSON(input, false);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'Format':
        handleFormat();
        break;
      case 'Minify':
        formatJSON(input, true);
        break;
      case 'Validate':
        handleValidate();
        break;
      case 'Clear':
        handleClear();
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Side by side input/output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input panel */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-h-[320px] font-mono text-sm bg-white border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={'Paste your JSON here...\n{\n  "key": "value"\n}'}
          />
        </div>
        
        {/* Output panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Output
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
        {['Format', 'Minify', 'Validate', 'Clear'].map(action => (
          <button 
            key={action}
            onClick={() => handleAction(action)}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-4 py-2 text-sm font-medium transition-colors"
          >
            {action}
          </button>
        ))}
        <button 
          onClick={handleFormat}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2 text-sm font-medium ml-auto"
        >
          Format JSON
        </button>
      </div>
    </div>
  );
}