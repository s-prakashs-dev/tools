'use client';

import { useState } from 'react';
import Head from 'next/head';

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ label: 'Good', color: 'bg-yellow-500', width: '60%' });
  const [copied, setCopied] = useState(false);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [uuids, setUuids] = useState<string[]>([]);

  const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS = '0123456789';
  const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const getStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score <= 1) return { label: 'Weak', color: 'bg-red-500', width: '20%' };
    if (score === 2) return { label: 'Fair', color: 'bg-amber-500', width: '40%' };
    if (score === 3) return { label: 'Good', color: 'bg-yellow-500', width: '60%' };
    if (score === 4) return { label: 'Strong', color: 'bg-blue-500', width: '80%' };
    return { label: 'Very Strong', color: 'bg-green-500', width: '100%' };
  };

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += UPPERCASE;
    if (options.lowercase) chars += LOWERCASE;
    if (options.numbers) chars += NUMBERS;
    if (options.symbols) chars += SYMBOLS;

    if (chars.length === 0) {
      alert('Select at least one character type');
      return;
    }

    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
    setStrength(getStrength(pwd));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggle = (key: keyof typeof options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  const generateUUID = (): string => {
    if (typeof window !== 'undefined' && window.crypto) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const copyText = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Password Generator Online Free',
    description: 'Free online password and UUID generator',
    url: 'https://toolyfy.in/password-generator',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <div className="space-y-8">
        {/* Password Generator Section */}
        <div className="space-y-6 border-b border-gray-100 pb-8">
          <h2 className="text-xl font-semibold text-gray-900">Password Generator</h2>

          {/* Password display box */}
          {password && (
            <div className="relative bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-4">
              <p className="font-mono text-xl text-gray-900 break-all pr-10 min-h-[2rem] tracking-wider">
                {password}
              </p>
              <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors text-lg"
              >
                {copied ? '✓' : '⧉'}
              </button>
            </div>
          )}

          {/* Strength meter */}
          {password && (
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Strength</span>
                <span className={`font-medium ${
                  strength.label === 'Weak' ? 'text-red-600' :
                  strength.label === 'Fair' ? 'text-amber-600' :
                  strength.label === 'Good' ? 'text-yellow-600' :
                  strength.label === 'Strong' ? 'text-blue-600' :
                  'text-green-600'
                }`}>{strength.label}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${strength.color}`} 
                  style={{ width: strength.width }} 
                />
              </div>
            </div>
          )}

          {/* Length slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label className="font-medium text-gray-700">Length</label>
              <span className="text-blue-600 font-medium">{length}</span>
            </div>
            <input
              type="range"
              min="8"
              max="128"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-blue-600 h-2 rounded-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Minimum</span>
              <span>Maximum</span>
            </div>
          </div>

          {/* Toggle switches */}
          <div className="space-y-0">
            {[
              { key: 'uppercase', label: 'Uppercase (A-Z)' },
              { key: 'lowercase', label: 'Lowercase (a-z)' },
              { key: 'numbers', label: 'Numbers (0-9)' },
              { key: 'symbols', label: 'Symbols (!@#$...)' },
            ].map(({ key, label }) => {
              const enabled = options[key as keyof typeof options];
              return (
                <label key={key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 px-2 -mx-2">
                  <span className="text-sm text-gray-700">{label}</span>
                  <button
                    onClick={() => toggle(key as keyof typeof options)}
                    className={`relative w-10 h-6 rounded-full transition-colors ${
                      enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span 
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        enabled ? 'left-5' : 'left-1'
                      }`} 
                    />
                  </button>
                </label>
              );
            })}
          </div>

          {/* Generate buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={generatePassword}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2.5 text-sm font-medium transition-colors"
            >
              Generate Password
            </button>
            <button
              onClick={() => {
                const bulk = Array.from({ length: 10 }, () => {
                  let chars = '';
                  if (options.uppercase) chars += UPPERCASE;
                  if (options.lowercase) chars += LOWERCASE;
                  if (options.numbers) chars += NUMBERS;
                  if (options.symbols) chars += SYMBOLS;
                  let pwd = '';
                  for (let i = 0; i < length; i++) {
                    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
                  }
                  return pwd;
                });
                setPasswords(bulk);
              }}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-6 py-2.5 text-sm font-medium transition-colors"
            >
              Generate 10
            </button>
          </div>

          {/* Generated passwords list */}
          {passwords.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Generated Passwords</p>
              <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-1">
                {passwords.map((pwd, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyText(pwd)}
                    className="w-full text-left font-mono text-xs bg-white hover:bg-blue-50 border border-gray-100 rounded-lg px-3 py-2 text-gray-700 transition-colors"
                  >
                    {pwd}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* UUID Generator Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">UUID Generator (v4)</h2>

          <div className="flex flex-wrap gap-3">
            {[1, 5, 10].map((count) => (
              <button
                key={count}
                onClick={() => setUuids(Array.from({ length: count }, () => generateUUID()))}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2 text-sm font-medium transition-colors"
              >
                Generate {count}
              </button>
            ))}
          </div>

          {uuids.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Generated UUIDs</p>
              <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-1">
                {uuids.map((uuid, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyText(uuid)}
                    className="w-full text-left font-mono text-xs bg-white hover:bg-blue-50 border border-gray-100 rounded-lg px-3 py-2 text-gray-700 transition-colors"
                  >
                    {uuid}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}