export interface HowToStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolHowToProps {
  steps: HowToStep[];
}

export default function ToolHowTo({ steps }: ToolHowToProps) {
  return (
    <section className="bg-gray-50 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">How to Use This Tool</h2>
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.step} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-semibold">
                {step.step}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
