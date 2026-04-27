'use client';

import Link from "next/link";
import { useState } from "react";
import { TOOLS } from "@/lib/tools";

const CATEGORIES = [
  {
    name: 'Developer Tools',
    color: 'blue',
    tools: ['json-formatter', 'csv-formatter', 'cron-builder'],
  },
  {
    name: 'Finance & Business',
    color: 'green',
    tools: ['gst-calculator', 'invoice-maker'],
  },
  {
    name: 'Design & Security',
    color: 'purple',
    tools: ['color-palette', 'password-generator', 'image-compressor'],
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'blue': return 'bg-blue-50';
    case 'green': return 'bg-green-50';
    case 'purple': return 'bg-purple-50';
    default: return 'bg-blue-50';
  }
};

export default function HomeClient() {
  const [search, setSearch] = useState('');

  const filteredTools = search
    ? TOOLS.filter(t =>
      t.shortName.toLowerCase().includes(search.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(search.toLowerCase())
    )
    : null;

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full border border-blue-100 mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            8 free tools — no signup required
          </div>
          
          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
            Free Online Tools for
            <span className="text-blue-600"> Developers</span>
            {" & "}
            <span className="text-blue-600">Professionals</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Powerful browser-based utilities that work instantly.
            No signup, no data sent to servers, always free.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: '🔒', text: '100% Private' },
              { icon: '⚡', text: 'Instant Results' },
              { icon: '🆓', text: 'Always Free' },
              { icon: '🌐', text: 'Works Offline' },
            ].map(badge => (
              <span key={badge.text} className="flex items-center gap-1.5 bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full">
                <span>{badge.icon}</span>
                <span>{badge.text}</span>
              </span>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
            </svg>
            <input
              type="text"
              placeholder="Search tools... e.g. JSON, GST, Password"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center divide-x divide-gray-200 gap-y-2">
            {[
              { value: '8', label: 'Free Tools' },
              { value: '100%', label: 'Browser-Based' },
              { value: '0', label: 'Signup Required' },
              { value: '∞', label: 'Uses Per Day' },
            ].map(stat => (
              <div key={stat.label} className="px-6 text-center first:pl-0 last:pr-0">
                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tool Grid with Categories */}
      <div className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {filteredTools ? (
            <div>
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTools.map((tool) => (
                    <Link key={tool.slug} href={`/${tool.slug}`}>
                      <div className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer h-full">
                        
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${
                          CATEGORIES.find(cat => cat.tools.includes(tool.slug))?.color === 'blue' ? 'bg-blue-50' :
                          CATEGORIES.find(cat => cat.tools.includes(tool.slug))?.color === 'green' ? 'bg-green-50' :
                          'bg-purple-50'
                        }`}>
                          {tool.icon}
                        </div>
                        
                        {/* Name */}
                        <h2 className="text-base font-semibold text-gray-900 mb-1">
                          {tool.shortName} Tool
                        </h2>
                        
                        {/* Description */}
                        <p className="text-sm text-gray-500 leading-relaxed mb-4">
                          {tool.shortDescription}
                        </p>
                        
                        {/* CTA */}
                        <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                          Use Tool 
                          <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No tools found for '{search}'</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {CATEGORIES.map((category) => (
                <section key={category.name}>
                  <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 mt-10">
                    {category.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.tools.map((slug) => {
                      const tool = TOOLS.find(t => t.slug === slug)!;
                      return (
                        <Link key={tool.slug} href={`/${tool.slug}`}>
                          <div className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer h-full">
                            
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${getCategoryColor(category.color)}`}>
                              {tool.icon}
                            </div>
                            
                            {/* Name */}
                            <h2 className="text-base font-semibold text-gray-900 mb-1">
                              {tool.shortName} Tool
                            </h2>
                            
                            {/* Description */}
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">
                              {tool.shortDescription}
                            </p>
                            
                            {/* CTA */}
                            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                              Use Tool 
                              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}