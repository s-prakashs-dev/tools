'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { TOOLS } from '@/lib/tools';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const pathname = usePathname();

  const filteredTools = TOOLS.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mobileFilteredTools = TOOLS.filter(tool =>
    tool.title.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
    tool.shortDescription.toLowerCase().includes(mobileSearchQuery.toLowerCase())
  );

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="5" y1="14" x2="11" y2="4" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="12" cy="3.5" r="3" stroke="white" strokeWidth="2" fill="none"/>
                <polyline points="4,8 1,11 5,11 2,15" fill="#93c5fd" stroke="#93c5fd" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">
              Tool<span className="text-blue-600">yfy</span>
            </span>
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 justify-center max-w-xs mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-4 z-50">
                  {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {filteredTools.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/${tool.slug}`}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-lg">{tool.icon}</span>
                          <span className="text-sm text-gray-900">{tool.title}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No tools found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop dropdown */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                All Tools
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">{TOOLS.length}</span>
                <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 z-50">
                  <div className="grid grid-cols-2 gap-2">
                    {TOOLS.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg">{tool.icon}</span>
                        <span className="text-sm text-gray-900">{tool.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 animate-fade-in">
          {/* Mobile search */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tools..."
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {(mobileSearchQuery ? mobileFilteredTools : TOOLS).map((tool) => {
              const isActive = pathname === `/${tool.slug}`;
              return (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-base" style={{ fontSize: '16px' }}>{tool.icon}</span>
                  <span>{tool.shortName}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}