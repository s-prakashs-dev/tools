export interface AboutSection {
  title?: string;
  content: string;
}

export default function ToolAbout({ title = 'About this tool', content }: AboutSection) {
  return (
    <section className="bg-gray-50 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
        {content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
