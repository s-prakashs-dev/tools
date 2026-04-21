import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "ToolKit - Free Online Tools & Utilities",
  description:
    "Free online tools for developers: JSON formatter, CSV viewer, cron builder, GST calculator, color palette generator, invoice maker, password generator, and image compressor.",
  keywords: [
    "free tools",
    "online tools",
    "json formatter",
    "csv viewer",
    "cron builder",
    "gst calculator",
  ],
  openGraph: {
    title: "ToolKit - Free Online Tools",
    description: "Collection of free online tools for developers and professionals",
    type: "website",
    url: "https://toolkit.example.com",
  },
};

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Online utilities</p>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">ToolKit</h1>
        <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
          Free online tools for developers, designers, and professionals
        </p>
        <p className="text-sm text-gray-500">
          All tools run entirely in your browser. No data is sent to any server.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {TOOLS.map((tool) => (
          <div
            key={tool.slug}
            className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900">{tool.h1}</h2>
            <p className="mt-1 text-sm text-gray-500">{tool.shortDescription}</p>
            <Link
              href={`/${tool.slug}`}
              className="mt-5 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
            >
              Use tool
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
