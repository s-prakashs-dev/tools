'use client';

import { useState } from 'react';
import Head from 'next/head';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';

const tool = getToolBySlug('invoice-maker')!;

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  fromName: string;
  fromAddress: string;
  fromGSTIN: string;
  toName: string;
  toAddress: string;
  items: LineItem[];
  gstEnabled: boolean;
  gstRate: number;
  gstType: 'intrastate' | 'interstate';
}

export default function InvoiceMakerPage() {
  const [invoice, setInvoice] = useState<InvoiceData>({
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    fromName: 'Your Company',
    fromAddress: '123 Main St, City, State',
    fromGSTIN: 'XXXXXXXXXXXX',
    toName: 'Client Name',
    toAddress: 'Client Address',
    items: [{ id: '1', description: 'Service/Product', quantity: 1, rate: 1000 }],
    gstEnabled: true,
    gstRate: 18,
    gstType: 'intrastate',
  });

  const formatIndianNumber = (num: number): string =>
    new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  const calculateLineAmount = (quantity: number, rate: number): number => quantity * rate;
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + calculateLineAmount(item.quantity, item.rate),
    0
  );
  const gstAmount = invoice.gstEnabled ? (subtotal * invoice.gstRate) / 100 : 0;
  const totalAmount = subtotal + gstAmount;

  const updateInvoice = <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) =>
    setInvoice({ ...invoice, [key]: value });

  const updateItem = <K extends keyof LineItem>(id: string, key: K, value: LineItem[K]) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    });
  };

  const addItem = () => {
    const newId = Math.max(...invoice.items.map((i) => parseInt(i.id) || 0), 0) + 1;
    setInvoice({
      ...invoice,
      items: [...invoice.items, { id: String(newId), description: '', quantity: 1, rate: 0 }],
    });
  };

  const removeItem = (id: string) => {
    if (invoice.items.length === 1) return;
    setInvoice({
      ...invoice,
      items: invoice.items.filter((item) => item.id !== id),
    });
  };

  const downloadPDF = () => window.print();

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.h1,
    description: tool.metaDescription,
    url: 'https://toolkit.example.com/invoice-maker',
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
        <link rel="canonical" href="https://toolkit.example.com/invoice-maker" />
        <meta name="keywords" content={tool.keywords.join(', ')} />
        <meta property="og:title" content={tool.title} />
        <meta property="og:description" content={tool.metaDescription} />
        <meta property="og:url" content="https://toolkit.example.com/invoice-maker" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <style>{`
          @media print {
            body {
              margin: 0;
              padding: 20px;
              background: white;
            }
            .no-print {
              display: none !important;
            }
            .invoice-preview {
              box-shadow: none !important;
              border: none !important;
              page-break-inside: avoid;
            }
          }
        `}</style>
      </Head>
      <ToolLayout title={tool.h1} description={tool.fullDescription}>
        <div className="space-y-8">
          <div className="no-print rounded-xl border border-gray-200 bg-white p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Invoice Number</label>
                  <input
                    type="text"
                    value={invoice.invoiceNumber}
                    onChange={(e) => updateInvoice('invoiceNumber', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={invoice.date}
                    onChange={(e) => updateInvoice('date', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-3 text-base font-semibold text-gray-900">From</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name/Company"
                      value={invoice.fromName}
                      onChange={(e) => updateInvoice('fromName', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Address"
                      value={invoice.fromAddress}
                      onChange={(e) => updateInvoice('fromAddress', e.target.value)}
                      className="h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="GSTIN (optional)"
                      value={invoice.fromGSTIN}
                      onChange={(e) => updateInvoice('fromGSTIN', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-3 text-base font-semibold text-gray-900">Bill To</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Client Name"
                      value={invoice.toName}
                      onChange={(e) => updateInvoice('toName', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Client Address"
                      value={invoice.toAddress}
                      onChange={(e) => updateInvoice('toAddress', e.target.value)}
                      className="h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-3 text-base font-semibold text-gray-900">GST Settings</h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={invoice.gstEnabled}
                      onChange={(e) => updateInvoice('gstEnabled', e.target.checked)}
                      className="mr-2 accent-blue-600"
                    />
                    Enable GST
                  </label>
                  {invoice.gstEnabled && (
                    <>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">GST Rate %</label>
                        <input
                          type="number"
                          value={invoice.gstRate}
                          onChange={(e) => updateInvoice('gstRate', parseFloat(e.target.value))}
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
                        <select
                          value={invoice.gstType}
                          onChange={(e) =>
                            updateInvoice('gstType', e.target.value as 'intrastate' | 'interstate')
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="intrastate">Intrastate</option>
                          <option value="interstate">Interstate</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-3 text-base font-semibold text-gray-900">Line Items</h3>
                <div className="space-y-3">
                  {invoice.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2">
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="col-span-12 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-6"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="col-span-4 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                      />
                      <input
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="col-span-4 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={invoice.items.length === 1}
                        className="col-span-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addItem}
                  className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Add Item
                </button>
              </div>

              <button
                onClick={downloadPDF}
                className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700"
              >
                Download as PDF
              </button>
            </div>
          </div>

          <div className="invoice-preview rounded-xl border border-gray-300 bg-white p-8 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">INVOICE</p>
                  <p className="mt-2 text-gray-500">{invoice.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{invoice.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">From</p>
                  <p className="font-semibold text-gray-900">{invoice.fromName}</p>
                  <p className="whitespace-pre-line text-sm text-gray-600">{invoice.fromAddress}</p>
                  {invoice.fromGSTIN && (
                    <p className="mt-2 text-sm text-gray-600">GSTIN: {invoice.fromGSTIN}</p>
                  )}
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Bill To</p>
                  <p className="font-semibold text-gray-900">{invoice.toName}</p>
                  <p className="whitespace-pre-line text-sm text-gray-600">{invoice.toAddress}</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-100 text-gray-700">
                      <th className="px-3 py-3 text-left font-semibold">Description</th>
                      <th className="w-20 px-3 py-3 text-right font-semibold">Qty</th>
                      <th className="w-24 px-3 py-3 text-right font-semibold">Rate</th>
                      <th className="w-24 px-3 py-3 text-right font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 text-gray-800">
                        <td className="px-3 py-3">{item.description}</td>
                        <td className="px-3 py-3 text-right">{item.quantity}</td>
                        <td className="px-3 py-3 text-right">Rs {formatIndianNumber(item.rate)}</td>
                        <td className="px-3 py-3 text-right">
                          Rs {formatIndianNumber(calculateLineAmount(item.quantity, item.rate))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <div className="w-full max-w-xs">
                  <div className="rounded-lg border-t border-gray-200 bg-gray-50 p-4">
                    <div className="flex justify-between py-2 text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900">Rs {formatIndianNumber(subtotal)}</span>
                    </div>
                    {invoice.gstEnabled &&
                      (invoice.gstType === 'intrastate' ? (
                        <>
                          <div className="flex justify-between border-t border-gray-100 py-2 text-gray-700">
                            <span>CGST ({invoice.gstRate / 2}%)</span>
                            <span className="font-semibold text-gray-900">
                              Rs {formatIndianNumber(gstAmount / 2)}
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-gray-100 py-2 text-gray-700">
                            <span>SGST ({invoice.gstRate / 2}%)</span>
                            <span className="font-semibold text-gray-900">
                              Rs {formatIndianNumber(gstAmount / 2)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between border-t border-gray-100 py-2 text-gray-700">
                          <span>IGST ({invoice.gstRate}%)</span>
                          <span className="font-semibold text-gray-900">
                            Rs {formatIndianNumber(gstAmount)}
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="flex justify-between">
                      <span className="text-xl font-bold text-gray-900">Grand Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        Rs {formatIndianNumber(totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
