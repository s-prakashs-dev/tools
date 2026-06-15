import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-16 mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-base text-slate-900 tracking-tight">
                Tool<span className="text-blue-600">yfy</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Free online utility suite built for developers and professionals.
              All tools execute client-side in your browser for 100% data privacy and offline capability.
            </p>
          </div>
          
          {/* Tools */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Popular Tools
            </h3>
            <ul className="space-y-2.5">
              {TOOLS.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`} className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                    {tool.shortName} Formatter
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company / Info */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              General
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-slate-200/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © 2026 Toolyfy. All tools run 100% browser-side.
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            Made for builders with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
