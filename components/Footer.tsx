import Link from 'next/link';
import { TOOLS } from '@/lib/tools';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
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
            <p className="text-sm text-gray-500 leading-relaxed">
              Free online tools for developers, designers and professionals.
              All tools run in your browser — private and instant.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Tools</h3>
            <ul className="space-y-2">
              {TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6">
          <p className="text-center text-sm text-gray-400">
            © 2026 Toolyfy. All tools are free and run in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
