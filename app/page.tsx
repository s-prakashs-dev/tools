import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Toolyfy — Free Online Tools for Developers & Professionals",
  description:
    "14+ free browser-based tools: JSON formatter, JWT decoder, Base64 encoder, GST calculator, EMI calculator, invoice maker, and more. No signup, 100% private, works offline.",
  keywords: [
    "free tools",
    "online tools",
    "json formatter",
    "jwt decoder",
    "base64 encoder",
    "gst calculator",
    "invoice maker",
    "developer tools",
  ],
  openGraph: {
    title: "Toolyfy — Free Online Tools for Developers & Professionals",
    description: "14+ free tools for developers and professionals. JSON, JWT, Base64, GST, Invoice, Password, and more. No signup, browser-based, always free.",
    type: "website",
    url: "https://toolyfy.in",
    images: [{ url: 'https://toolyfy.in/og/toolyfy-home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Toolyfy — Free Online Tools for Developers & Professionals",
    description: "14+ free tools for developers and professionals. No signup, browser-based, always free.",
    images: ['https://toolyfy.in/og/toolyfy-home.png'],
  },
  alternates: {
    canonical: 'https://toolyfy.in',
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Toolyfy",
    url: "https://toolyfy.in",
    description: "Free online tools for developers and professionals",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://toolyfy.in/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient />
    </>
  );
}
