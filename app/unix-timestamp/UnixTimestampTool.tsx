'use client';

import { useState, useEffect } from 'react';

export default function UnixTimestampTool() {
  const [unixTime, setUnixTime] = useState('');
  const [humanDate, setHumanDate] = useState('');
  const [utcTime, setUtcTime] = useState('');
  const [istTime, setIstTime] = useState('');
  const [currentUnix, setCurrentUnix] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  // Update current Unix timestamp every second
  useEffect(() => {
    const updateCurrent = () => {
      const now = Math.floor(Date.now() / 1000);
      setCurrentUnix(now.toString());
    };
    updateCurrent();
    const interval = setInterval(updateCurrent, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnixChange = (value: string) => {
    setUnixTime(value);
    setError('');
    if (!value.trim()) {
      setHumanDate('');
      setUtcTime('');
      setIstTime('');
      return;
    }

    try {
      const timestamp = parseInt(value);
      if (isNaN(timestamp)) {
        setError('Invalid Unix timestamp');
        setHumanDate('');
        return;
      }

      const date = new Date(timestamp * 1000);
      setHumanDate(date.toLocaleString());
      setUtcTime(date.toUTCString());

      // Convert to IST (UTC+5:30)
      const istDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      setIstTime(istDate.toLocaleString());
    } catch (e) {
      setError('Invalid timestamp');
      setHumanDate('');
    }
  };

  const handleDateChange = (value: string) => {
    setHumanDate(value);
    setError('');
    if (!value.trim()) {
      setUnixTime('');
      setUtcTime('');
      setIstTime('');
      return;
    }

    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        setError('Invalid date format');
        setUnixTime('');
        return;
      }

      const timestamp = Math.floor(date.getTime() / 1000);
      setUnixTime(timestamp.toString());
      setUtcTime(date.toUTCString());

      const istDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      setIstTime(istDate.toLocaleString());
    } catch (e) {
      setError('Invalid date');
      setUnixTime('');
    }
  };

  const handleNow = () => {
    const now = Math.floor(Date.now() / 1000);
    handleUnixChange(now.toString());
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Current Unix timestamp clock */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Current Unix Timestamp (Live)</h3>
        <div className="font-mono text-2xl font-bold text-blue-600 mb-2">{currentUnix}</div>
        <p className="text-sm text-gray-600">Updates every second. {new Date().toUTCString()}</p>
        <button
          onClick={() => handleCopy(currentUnix, 'current')}
          className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          {copied === 'current' ? '✓ Copied!' : 'Copy Current Timestamp'}
        </button>
      </div>

      {/* Input sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unix to Human */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Unix Timestamp to Date</label>
          <input
            type="number"
            value={unixTime}
            onChange={(e) => handleUnixChange(e.target.value)}
            placeholder="1516239022"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleNow}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Use Now
          </button>
        </div>

        {/* Human to Unix */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Date to Unix Timestamp</label>
          <input
            type="datetime-local"
            value={humanDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}

      {/* Output sections */}
      {(unixTime || humanDate) && (
        <div className="space-y-4">
          {/* Unix Timestamp */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-900">Unix Timestamp</h4>
              <button
                onClick={() => handleCopy(unixTime, 'unix')}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {copied === 'unix' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className="font-mono text-lg text-gray-900">{unixTime}</div>
          </div>

          {/* UTC Time */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-900">UTC Time</h4>
              <button
                onClick={() => handleCopy(utcTime, 'utc')}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {copied === 'utc' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className="text-sm text-gray-900">{utcTime}</div>
          </div>

          {/* IST Time */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-900">IST Time (UTC+5:30)</h4>
              <button
                onClick={() => handleCopy(istTime, 'ist')}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {copied === 'ist' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className="text-sm text-gray-900">{istTime}</div>
          </div>
        </div>
      )}
    </div>
  );
}
