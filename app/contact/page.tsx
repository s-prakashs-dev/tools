import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | toolyfy",
  description: "Get in touch with the toolyfy team for feedback, support, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/40">
        <h1 className="text-3xl font-semibold text-slate-950">Contact</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Have feedback, feature requests, or a question about toolyfy? We&apos;d love to hear from you.
        </p>

        <div className="mt-10 space-y-8 text-slate-700">
          <div className="rounded-2xl bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Email</h2>
            <p className="mt-3 text-sm leading-7">
              Send us a message at <a href="mailto:hello@toolyfy.in" className="font-semibold text-slate-900 underline underline-offset-2">hello@toolyfy.in</a>.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Support</h2>
            <p className="mt-3 text-sm leading-7">
              For bug reports or technical issues, please include as much detail as possible so we can resolve it quickly.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Partnerships</h2>
            <p className="mt-3 text-sm leading-7">
              Interested in collaborating? Reach out using the email above and we&apos;ll respond promptly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
