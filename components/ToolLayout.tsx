import AdSlot from "./AdSlot";

export default function ToolLayout({
  title,
  description,
  children,
  descriptionHeader = "About this tool",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  descriptionHeader?: string;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-base text-gray-500">
          Fast, browser-based workflow with a clean interface and no server uploads.
        </p>
      </div>

      <div className="hidden md:block">
        <AdSlot slot="1234567890" className="mx-0" />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {children}
      </div>

      <AdSlot slot="0987654321" />

      <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="mb-3 text-xl font-semibold text-gray-800">{descriptionHeader}</h2>
        <p className="text-base leading-relaxed text-gray-700">{description}</p>
      </section>
    </div>
  );
}
