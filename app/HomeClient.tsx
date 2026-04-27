'use client';

import Link from "next/link";
import { useState } from "react";
import { TOOLS } from "@/lib/tools";

const categories = {
  "Developer Tools": TOOLS.filter(tool => ['json-formatter', 'csv-formatter', 'cron-builder'].includes(tool.slug)),
  "Finance & Business": TOOLS.filter(tool => ['gst-calculator', 'invoice-maker'].includes(tool.slug)),
  "Design & Security": TOOLS.filter(tool => ['color-palette', 'password-generator', 'image-compressor'].includes(tool.slug)),
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Developer Tools': return 'bg-blue-50';
    case 'Finance & Business': return 'bg-green-50';
    case 'Design & Security': return 'bg-purple-50';
    default: return 'bg-blue-50';
  }
};

export default function HomeClient() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = TOOLS.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Free Online Tools for Developers & Professionals
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          8 powerful tools that run entirely in your browser. No signup. No data sent to servers. 100% free.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 flex items-center gap-2">
            <span>🔒</span>
            100% Private
          </div>
          <div className="bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 flex items-center gap-2">
            <span>⚡</span>
            Instant Results
          </div>
          <div className="bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 flex items-center gap-2">
            <span>🆓</span>
            Always Free
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="text-center py-4">
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
          <span>8 Tools Available</span>
          <span className="text-gray-300">•</span>
          <span>100% Browser-Based</span>
          <span className="text-gray-300">•</span>
          <span>No Signup Required</span>
          <span className="text-gray-300">•</span>
          <span>Always Free</span>
        </div>
      </section>

      {/* Search bar */}
      <section className="text-center">
        <div className="relative max-w-lg mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search tools... (e.g. JSON, GST, Password)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </section>

      {/* Tools */}
      {searchQuery ? (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${getCategoryColor(Object.keys(categories).find(cat => categories[cat as keyof typeof categories].some(t => t.slug === tool.slug)) || '')} rounded-xl flex items-center justify-center text-2xl`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 ml-3">{tool.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{tool.shortDescription}</p>
                <div className="text-blue-600 text-sm font-medium mt-4 hover:text-blue-700 flex items-center gap-1">
                  Use Tool →
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div className="space-y-12">
          {Object.entries(categories).map(([categoryName, tools]) => (
            <section key={categoryName}>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                {categoryName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${getCategoryColor(categoryName)} rounded-xl flex items-center justify-center text-2xl`}>
                        {tool.icon}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 ml-3">{tool.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{tool.shortDescription}</p>
                    <div className="text-blue-600 text-sm font-medium mt-4 hover:text-blue-700 flex items-center gap-1">
                      Use Tool →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}