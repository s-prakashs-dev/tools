'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { TOOLS } from '@/lib/tools';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-gray-900">
            Tool<span className="text-blue-600">yfy</span>
          </span>
        </Link>
        
        {/* Desktop: All Tools dropdown */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm font-medium transition-colors"
            >
              All Tools
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {TOOLS.length}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-lg p-3 grid grid-cols-2 gap-1">
                {TOOLS.map(tool => (
                  <Link 
                    key={tool.slug} 
                    href={`/${tool.slug}`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{tool.icon}</span>
                    <span className="text-sm text-gray-700 font-medium">{tool.shortName}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile hamburger */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileOpen 
                ? "M6 18L18 6M6 6l12 12" 
                : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            {TOOLS.map(tool => (
              <Link 
                key={tool.slug} 
                href={`/${tool.slug}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 p-3 rounded-xl border transition-colors ${
                  pathname === `/${tool.slug}`
                    ? 'border-blue-200 bg-blue-50 text-blue-700'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{tool.icon}</span>
                <span className="text-sm font-medium text-gray-700">{tool.shortName}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}