export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolFAQProps {
  faqs: FAQItem[];
}

export default function ToolFAQ({ faqs }: ToolFAQProps) {
  return (
    <section className="bg-white rounded-2xl p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
