'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { TOOLS } from "@/lib/tools";
import { getToolIcon } from "@/components/icons";
import { 
  Search, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Sparkles 
} from "lucide-react";

const CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'developer', name: 'Developer Tools' },
  { id: 'finance', name: 'Finance & Business' },
  { id: 'design', name: 'Design & Security' }
];

const getToolCategory = (slug: string) => {
  if (['json-formatter', 'csv-formatter', 'cron-builder', 'jwt-decoder', 'base64', 'unix-timestamp', 'url-encoder', 'uuid-generator', 'html-encoder'].includes(slug)) return 'developer';
  if (['gst-calculator', 'invoice-maker'].includes(slug)) return 'finance';
  return 'design';
};

export default function HomeClient() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search input on "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter tools based on search and category
  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = 
      tool.shortName.toLowerCase().includes(search.toLowerCase()) ||
      tool.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      tool.title.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      getToolCategory(tool.slug) === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm shadow-slate-100/40">
        
        {/* Background glow effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-indigo-50/10 to-transparent pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto space-y-6">
          
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50/50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
            <span>{TOOLS.length} Browser Utilities — No Login Required</span>
          </div>
          
          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
            Free Utilities for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold"> Developers</span>
            {" & "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 font-extrabold">Professionals</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Powerful browser-based tools that execute 100% locally.
            No signup, no server uploads, complete privacy.
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-lg mx-auto pt-4 group">
            <div className="absolute inset-y-0 left-4 top-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search tools... e.g. JSON, GST, Password"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200/80 focus:border-blue-500 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
            />
            <div className="absolute inset-y-0 right-4 top-4 flex items-center">
              {search ? (
                <button 
                  onClick={() => setSearch('')}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-xs font-mono text-slate-400">
                  /
                </kbd>
              )}
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            {[
              { icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />, text: '100% Private (No Uploads)' },
              { icon: <Zap className="w-4 h-4 text-amber-500" />, text: 'Instant Execution' },
              { icon: <Globe className="w-4 h-4 text-blue-500" />, text: 'Offline Friendly' },
            ].map((badge, idx) => (
              <span key={idx} className="flex items-center gap-2 bg-slate-50/80 border border-slate-100/50 text-slate-600 text-xs px-4 py-2 rounded-xl">
                {badge.icon}
                <span className="font-medium">{badge.text}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-white border border-slate-100 rounded-2xl py-6 shadow-sm shadow-slate-100/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x md:divide-slate-100">
            {[
              { value: String(TOOLS.length), label: 'Total Utilities' },
              { value: '100%', label: 'Browser-Based' },
              { value: '0', label: 'Signup Required' },
              { value: 'Unlimited', label: 'Daily Free Usage' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center md:px-4">
                <div className="text-2xl font-bold font-heading text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills & Tool Grid */}
      <div className="space-y-6">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-100 pb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-white border border-slate-200/80 hover:border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dynamic Tool Grid */}
        <div>
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.map((tool) => {
                const categoryColor = getToolCategory(tool.slug);
                return (
                  <Link key={tool.slug} href={`/${tool.slug}`}>
                    <div className="group bg-white border border-slate-200/70 hover:border-blue-400 rounded-2xl p-5 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                      
                      {/* Subtle accent top border based on category */}
                      <div className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                        categoryColor === 'developer' ? 'bg-blue-500/0 group-hover:bg-blue-500' :
                        categoryColor === 'finance' ? 'bg-emerald-500/0 group-hover:bg-emerald-500' :
                        'bg-pink-500/0 group-hover:bg-pink-500'
                      }`} />

                      <div className="flex items-center gap-3.5 mb-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-slate-50 flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                          {getToolIcon(tool.slug)}
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-slate-800 tracking-tight leading-none">
                            {tool.shortName} Formatter
                          </h2>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1 inline-block">
                            {getToolCategory(tool.slug)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
                        {tool.shortDescription}
                      </p>
                      
                      {/* CTA */}
                      <div className="flex items-center text-blue-600 text-sm font-semibold pt-2 border-t border-slate-50 mt-auto">
                        <span>Launch Tool</span> 
                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl">
              <p className="text-slate-400 text-sm font-medium">No tools found matching your query.</p>
              <button 
                onClick={() => { setSearch(''); setSelectedCategory('all'); }} 
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-2 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}