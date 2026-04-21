'use client';

import { useState } from 'react';
import Head from 'next/head';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';

const tool = getToolBySlug('password-generator')!;

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('medium');
  const [passwords, setPasswords] = useState<string[]>([]);
  const [uuids, setUuids] = useState<string[]>([]);

  const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS = '0123456789';
  const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += UPPERCASE;
    if (options.lowercase) chars += LOWERCASE;
    if (options.numbers) chars += NUMBERS;
    if (options.symbols) chars += SYMBOLS;

    if (chars.length === 0) {
      alert('Select at least one character type');
      return '';
    }

    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  };

  const calculateStrength = (pwd: string): string => {
    if (pwd.length < 8) return 'weak';
    if (pwd.length < 12) {
      if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 'medium';
      return 'weak';
    }
    if (pwd.length < 16) {
      if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 'strong';
      return 'medium';
    }
    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pwd)) return 'veryStrong';
    return 'strong';
  };

  const getStrengthColor = (str: string): string => {
    switch (str) {
      case 'weak':
        return 'bg-red-600';
      case 'medium':
        return 'bg-amber-600';
      case 'strong':
      case 'veryStrong':
        return 'bg-green-600';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthLabel = (str: string): string => {
    switch (str) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      case 'veryStrong':
        return 'Very Strong';
      default:
        return 'Unknown';
    }
  };

  const copyText = (value: string, message: string) => {
    navigator.clipboard.writeText(value);
    alert(message);
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

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.h1,
    description: tool.metaDescription,
    url: 'https://toolkit.example.com/password-generator',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://toolkit.example.com/password-generator" />
        <meta name="keywords" content={tool.keywords.join(', ')} />
        <meta property="og:title" content={tool.title} />
        <meta property="og:description" content={tool.metaDescription} />
        <meta property="og:url" content="https://toolkit.example.com/password-generator" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <ToolLayout title={tool.h1} description={tool.fullDescription}>
        <div className="space-y-8">
          <div className="space-y-4 border-b border-gray-100 pb-8">
            <h2 className="text-xl font-semibold text-gray-800">Password Generator</h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Length: {length} characters
              </label>
              <input
                type="range"
                min="8"
                max="128"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Character Sets</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { key: 'uppercase', label: 'Uppercase (A-Z)' },
                  { key: 'lowercase', label: 'Lowercase (a-z)' },
                  { key: 'numbers', label: 'Numbers (0-9)' },
                  { key: 'symbols', label: 'Symbols (!@#$...)' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center text-gray-700">
                    <input
                      type="checkbox"
                      checked={options[key as keyof typeof options]}
                      onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                      className="mr-2 accent-blue-600"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const pwd = generatePassword();
                  setPassword(pwd);
                  setStrength(calculateStrength(pwd));
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
              >
                Generate Password
              </button>
              <button
                onClick={() => {
                  const bulk = Array.from({ length: 10 }, () => generatePassword());
                  setPasswords(bulk);
                }}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Generate 10 Passwords
              </button>
            </div>

            {password && (
              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="break-all font-mono text-lg tracking-wider text-gray-900">{password}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Strength</span>
                    <span className="text-sm font-semibold text-gray-700">{getStrengthLabel(strength)}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full transition-all ${getStrengthColor(strength)}`}
                      style={{
                        width:
                          strength === 'weak'
                            ? '25%'
                            : strength === 'medium'
                              ? '50%'
                              : strength === 'strong'
                                ? '75%'
                                : '100%',
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => copyText(password, 'Copied to clipboard!')}
                  className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700"
                >
                  Copy Password
                </button>
              </div>
            )}

            {passwords.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Generated Passwords</p>
                <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
                  {passwords.map((pwd, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => copyText(pwd, 'Copied to clipboard!')}
                      className="mb-1 block w-full rounded px-2 py-2 text-left font-mono text-sm text-gray-900 transition-colors hover:bg-white"
                    >
                      {pwd}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copyText(passwords.join('\n'), 'All passwords copied!')}
                  className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700"
                >
                  Copy All
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">UUID Generator (v4)</h2>

            <div className="flex flex-wrap gap-3">
              {[1, 5, 10].map((count) => (
                <button
                  key={count}
                  onClick={() => setUuids(Array.from({ length: count }, () => generateUUID()))}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
                >
                  Generate {count}
                </button>
              ))}
            </div>

            {uuids.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Generated UUIDs</p>
                <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
                  {uuids.map((uuid, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => copyText(uuid, 'Copied to clipboard!')}
                      className="mb-1 block w-full rounded px-2 py-2 text-left font-mono text-sm text-gray-800 transition-colors hover:bg-white"
                    >
                      {uuid}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copyText(uuids.join('\n'), 'All UUIDs copied!')}
                  className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700"
                >
                  Copy All UUIDs
                </button>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
