'use client';

import { useState } from 'react';
import Head from 'next/head';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';

const tool = getToolBySlug('gst-calculator')!;

const GST_RATES: Record<string, number> = {
  '0': 0,
  '5': 5,
  '12': 12,
  '18': 18,
  '28': 28,
};

export default function GSTCalculatorPage() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('18');
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [gstType, setGstType] = useState<'intrastate' | 'interstate'>('intrastate');

  const formatIndianNumber = (num: number): string =>
    new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  const parseAmount = (value: string): number => parseFloat(value.replace(/[^\d.]/g, '')) || 0;

  const calculateGST = () => {
    const baseAmount = parseAmount(amount);
    if (baseAmount <= 0) return null;

    const rateValue = parseFloat(rate);

    if (mode === 'add') {
      const gstAmount = (baseAmount * rateValue) / 100;
      return { baseAmount, gstAmount, totalAmount: baseAmount + gstAmount };
    }

    const totalAmount = baseAmount;
    const baseAmountReverse = totalAmount / (1 + rateValue / 100);
    const gstAmount = totalAmount - baseAmountReverse;
    return { baseAmount: baseAmountReverse, gstAmount, totalAmount };
  };

  const result = calculateGST();

  const GST_REFERENCE = [
    { item: 'Bread, cereals', rate: '0%', category: 'Essentials' },
    { item: 'Milk, dairy products', rate: '0%', category: 'Essentials' },
    { item: 'Fruits, vegetables', rate: '0%', category: 'Essentials' },
    { item: 'Sugar, salt', rate: '5%', category: 'Essentials' },
    { item: 'Cooking oil', rate: '5%', category: 'Essentials' },
    { item: 'Tea, coffee', rate: '5%', category: 'Essentials' },
    { item: 'Medicines', rate: '0% / 5%', category: 'Healthcare' },
    { item: 'Restaurants (non-AC)', rate: '5%', category: 'Food' },
    { item: 'Restaurants (AC)', rate: '5%', category: 'Food' },
    { item: 'Clothing (value > Rs 1000)', rate: '12%', category: 'Apparel' },
    { item: 'Footwear (value > Rs 500)', rate: '12%', category: 'Apparel' },
    { item: 'Jewellery', rate: '5%', category: 'Luxury' },
    { item: 'Mobile phones', rate: '18%', category: 'Electronics' },
    { item: 'Laptops', rate: '18%', category: 'Electronics' },
    { item: 'Cosmetics', rate: '18%', category: 'Personal Care' },
    { item: 'Hotels (non-AC)', rate: '12%', category: 'Hospitality' },
    { item: 'Electricity', rate: '5%', category: 'Utilities' },
    { item: 'Cars', rate: '28%', category: 'Vehicles' },
    { item: 'Luxury goods', rate: '28%', category: 'Luxury' },
    { item: 'Tobacco', rate: '28%', category: 'Excise' },
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.h1,
    description: tool.metaDescription,
    url: 'https://toolkit.example.com/gst-calculator',
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
        <link rel="canonical" href="https://toolkit.example.com/gst-calculator" />
        <meta name="keywords" content={tool.keywords.join(', ')} />
        <meta property="og:title" content={tool.title} />
        <meta property="og:description" content={tool.metaDescription} />
        <meta property="og:url" content="https://toolkit.example.com/gst-calculator" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <ToolLayout title={tool.h1} description={tool.fullDescription}>
        <div className="space-y-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Amount (Rs)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Mode</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'add', label: 'Add GST to Amount' },
                    { value: 'remove', label: 'Remove GST from Total' },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setMode(value as 'add' | 'remove')}
                      className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                        mode === value
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">GST Type</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'intrastate', label: 'Intrastate (CGST + SGST)' },
                    { value: 'interstate', label: 'Interstate (IGST)' },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setGstType(value as 'intrastate' | 'interstate')}
                      className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                        gstType === value
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">GST Rate</label>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(GST_RATES).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRate(key)}
                      className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                        rate === key
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {result && (
            <div className="space-y-3 rounded-lg bg-gray-50 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Base Amount</p>
                  <p className="text-xl font-bold text-gray-900">
                    Rs {formatIndianNumber(result.baseAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">GST Amount</p>
                  <p className="text-xl font-bold text-gray-900">
                    Rs {formatIndianNumber(result.gstAmount)}
                  </p>
                </div>
              </div>

              {gstType === 'intrastate' && (
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3 text-gray-700">
                  <div>
                    <p className="text-sm text-gray-500">CGST ({parseFloat(rate) / 2}%)</p>
                    <p className="font-semibold">Rs {formatIndianNumber(result.gstAmount / 2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">SGST ({parseFloat(rate) / 2}%)</p>
                    <p className="font-semibold">Rs {formatIndianNumber(result.gstAmount / 2)}</p>
                  </div>
                </div>
              )}

              {gstType === 'interstate' && (
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-sm text-gray-500">IGST ({rate}%)</p>
                  <p className="font-semibold text-gray-700">
                    Rs {formatIndianNumber(result.gstAmount)}
                  </p>
                </div>
              )}

              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-blue-900">
                <p className="text-sm">Total Amount</p>
                <p className="text-2xl font-bold">Rs {formatIndianNumber(result.totalAmount)}</p>
              </div>
            </div>
          )}

          {!result && amount && <p className="py-6 text-center text-gray-500">Enter an amount to see results</p>}

          <div>
            <h3 className="mb-3 text-xl font-semibold text-gray-800">Common GST Rates Reference</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse bg-white text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100 text-gray-700">
                    <th className="px-3 py-3 text-left font-semibold">Item / Service</th>
                    <th className="px-3 py-3 text-left font-semibold">GST Rate</th>
                    <th className="px-3 py-3 text-left font-semibold">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {GST_REFERENCE.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100 text-gray-800 even:bg-gray-50">
                      <td className="px-3 py-3">{row.item}</td>
                      <td className="px-3 py-3 font-semibold">{row.rate}</td>
                      <td className="px-3 py-3">{row.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
