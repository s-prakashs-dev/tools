import Link from 'next/link';
import { TOOLS, RELATED_TOOLS, type Tool } from '@/lib/tools';
import { getToolIcon } from '@/components/icons';
import { 
  Info, 
  HelpCircle, 
  ListTodo, 
  ChevronRight, 
  ArrowLeft,
  Share2,
  Sparkles
} from 'lucide-react';

export default function ToolLayout({
  tool,
  children,
}: {
  tool: Tool;
  children: React.ReactNode;
}) {
  const getCategory = (slug: string) => {
    if (['json-formatter', 'csv-formatter', 'cron-builder', 'jwt-decoder', 'password-generator', 'base64', 'unix-timestamp', 'url-encoder', 'uuid-generator', 'html-encoder'].includes(slug)) return 'developer';
    if (['gst-calculator', 'invoice-maker'].includes(slug)) return 'finance';
    return 'design';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'developer': return 'bg-blue-50/80 text-blue-700 border-blue-100';
      case 'finance': return 'bg-emerald-50/80 text-emerald-700 border-emerald-100';
      case 'design': return 'bg-pink-50/80 text-pink-700 border-pink-100';
      default: return 'bg-blue-50/80 text-blue-700 border-blue-100';
    }
  };

  const category = getCategory(tool.slug);
  const badgeColors = getCategoryColor(category);

  // Get related tools from RELATED_TOOLS map
  const relatedToolSlugs = RELATED_TOOLS[tool.slug] || [];
  const relatedTools = relatedToolSlugs
    .map(slug => TOOLS.find(t => t.slug === slug))
    .filter((t): t is Tool => t !== undefined);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-600 truncate">{tool.shortName} Formatter</span>
      </nav>

      {/* Tool Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
            {getToolIcon(tool.slug)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-800 tracking-tight">
              {tool.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              {tool.shortDescription}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border ${badgeColors} shadow-sm`}>
            {category}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 border border-slate-200/60 px-3 py-1.5 rounded-lg shadow-sm">
            Local Run
          </span>
        </div>
      </div>

      {/* Main workspace slot */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm shadow-slate-100/30">
        {children}
      </div>

      {/* Dynamic Ad space or spacer */}
      <div className="h-6" />

      {/* Info & Resource blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* About this tool card */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm shadow-slate-100/30 flex flex-col">
          <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-3">
            <Info className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-800">About this tool</h2>
          </div>
          <div className="text-sm text-slate-500 space-y-3 leading-relaxed flex-grow">
            {tool.fullDescription.split('\n\n').slice(0, 3).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* How to use card */}
        {tool.howToSteps && tool.howToSteps.length > 0 && (
          <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm shadow-slate-100/30 flex flex-col">
            <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-3">
              <ListTodo className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-800">How to use this tool</h2>
            </div>
            <div className="space-y-4 flex-grow">
              {tool.howToSteps.map((step) => (
                <div key={step.step} className="flex gap-3.5">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-6.5 h-6.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg text-xs font-bold shadow-sm">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-700 text-xs mt-0.5">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Frequently Asked Questions */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm shadow-slate-100/30">
          <div className="flex items-center gap-2.5 mb-6 border-b border-slate-100 pb-3">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-800">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.faqs.map((faq, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-sm font-bold text-slate-700 tracking-tight">{faq.question}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((relatedTool) => {
              const relatedCategory = getCategory(relatedTool.slug);
              return (
                <Link
                  key={relatedTool.slug}
                  href={`/${relatedTool.slug}`}
                  className="bg-white border border-slate-200/80 rounded-xl p-4.5 hover:border-blue-400 hover:shadow-sm hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                      {getToolIcon(relatedTool.slug)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-800 leading-none truncate">{relatedTool.shortName} Formatter</h3>
                      <p className="text-xs text-slate-400 mt-1.5 truncate">{relatedTool.shortDescription}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 self-center" />
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
