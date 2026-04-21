import Link from 'next/link';
import { TOOLS } from '@/lib/tools';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-900">Tools</h3>
            <ul className="space-y-2">
              {TOOLS.slice(0, 2).map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`} className="text-gray-600 hover:text-blue-600">
                    {tool.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-900">More Tools</h3>
            <ul className="space-y-2">
              {TOOLS.slice(2, 4).map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`} className="text-gray-600 hover:text-blue-600">
                    {tool.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-900">Additional</h3>
            <ul className="space-y-2">
              {TOOLS.slice(4, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`} className="text-gray-600 hover:text-blue-600">
                    {tool.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-900">Generators</h3>
            <ul className="space-y-2">
              {TOOLS.slice(6).map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`} className="text-gray-600 hover:text-blue-600">
                    {tool.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-400">
            Copyright {new Date().getFullYear()} ToolKit. All tools are free and run entirely in
            your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
