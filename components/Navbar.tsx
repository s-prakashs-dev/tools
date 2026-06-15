'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { TOOLS } from '@/lib/tools';
import { ChevronDown, Menu, X, Sparkles } from 'lucide-react';
import { getToolIcon } from '@/components/icons';

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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-sm shadow-blue-500/10 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <span className="font-heading font-bold text-lg text-slate-900 tracking-tight">
            Tool<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">yfy</span>
          </span>
        </Link>
        
        {/* Desktop Navbar Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100/80 text-slate-700 hover:text-slate-900 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 border border-slate-100 hover:border-slate-200/60"
            >
              Explore Tools
              <span className="bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm shadow-blue-500/20">
                {TOOLS.length}
              </span>
              <ChevronDown 
                className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-slate-100 rounded-2xl shadow-xl p-3 grid grid-cols-2 gap-1 animate-scale-up z-50">
                {TOOLS.map(tool => (
                  <Link 
                    key={tool.slug} 
                    href={`/${tool.slug}`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100/50 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                      {getToolIcon(tool.slug)}
                    </div>
                    <span className="text-sm text-slate-700 font-medium tracking-tight truncate">{tool.shortName}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-4 max-h-[75vh] overflow-y-auto animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {TOOLS.map(tool => (
              <Link 
                key={tool.slug} 
                href={`/${tool.slug}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                  pathname === `/${tool.slug}`
                    ? 'border-blue-100 bg-blue-50/50 text-blue-700 font-medium'
                    : 'border-slate-100 bg-slate-50/30 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  {getToolIcon(tool.slug)}
                </div>
                <span className="text-sm font-medium text-slate-700">{tool.shortName}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}