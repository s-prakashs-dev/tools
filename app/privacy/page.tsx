import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | toolyfy",
  description: "Learn how toolyfy handles data, cookies, and privacy for its browser-based tools.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/40">
        <h1 className="text-3xl font-semibold text-slate-950">Privacy Policy</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          toolyfy is a browser-first utility suite built for developers and professionals. We respect your privacy and
          do not collect personal information or upload your data to a server.
        </p>

        <section className="mt-10 space-y-6 text-slate-700">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">What we collect</h2>
            <p className="mt-3 text-sm leading-7">
              toolyfy operates entirely in your browser. Input data for tools like JSON formatter, password generator,
              and image compressor stays on your device and is not transmitted to any backend service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">Cookies and analytics</h2>
            <p className="mt-3 text-sm leading-7">
              We do not use cookies for tracking or login. Any analytics on the site is minimal and used only to monitor
              site performance and reliability.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">Third-party content</h2>
            <p className="mt-3 text-sm leading-7">
              Some components may include third-party scripts for advertising or embeds, but they do not receive data
              from your tool usage. Your inputs remain private in the browser.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-3 text-sm leading-7">
              If you have questions about this policy, please visit the <a href="/contact" className="font-semibold text-slate-900 underline underline-offset-2">Contact</a> page.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
