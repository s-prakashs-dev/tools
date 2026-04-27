import Link from 'next/link';
import { TOOLS, RELATED_TOOLS, type Tool } from '@/lib/tools';

export default function ToolLayout({
  tool,
  children,
}: {
  tool: Tool;
  children: React.ReactNode;
}) {
  const getCategory = (slug: string) => {
    if (['json-formatter', 'csv-formatter', 'cron-builder'].includes(slug)) return 'developer';
    if (['gst-calculator', 'invoice-maker'].includes(slug)) return 'finance';
    return 'design';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'developer': return 'bg-blue-50 text-blue-600';
      case 'finance': return 'bg-green-50 text-green-600';
      case 'design': return 'bg-purple-50 text-purple-600';
      default: return 'bg-blue-50 text-blue-600';
    }
  };

  const category = getCategory(tool.slug);
  const iconBg = getCategoryColor(category);

  // Get related tools from RELATED_TOOLS map
  const relatedToolSlugs = RELATED_TOOLS[tool.slug] || [];
  const relatedTools = relatedToolSlugs
    .map(slug => TOOLS.find(t => t.slug === slug))
    .filter((t): t is Tool => t !== undefined);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-600">{tool.title}</span>
      </nav>

      {/* Tool header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${getCategoryColor(category).split(' ')[0]}`}>
          {tool.icon}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{tool.title}</h1>
          <p className="text-base text-gray-500 mt-1">{tool.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-3 py-1">Free</span>
            <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-3 py-1">Browser-based</span>
            <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-3 py-1">No signup</span>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <div className="w-full min-h-[50px] md:min-h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl" aria-hidden="true" />

      {/* Tool content */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        {children}
      </div>

      {/* SEO description */}
      <section className="bg-gray-50 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3">About this tool</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{tool.fullDescription}</p>
      </section>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((relatedTool) => {
              const relatedCategory = getCategory(relatedTool.slug);
              const relatedIconBg = getCategoryColor(relatedCategory);
              return (
                <Link
                  key={relatedTool.slug}
                  href={`/${relatedTool.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${relatedIconBg.split(' ')[0]}`}>
                      {relatedTool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{relatedTool.shortName}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{relatedTool.shortDescription}</p>
                    </div>
                    <span className="text-sm text-blue-600 font-medium flex-shrink-0">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
