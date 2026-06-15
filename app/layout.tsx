import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Toolyfy — Free Online Tools for Developers & Professionals",
    template: "%s | Toolyfy",
  },
  description:
    "14+ free browser-based tools: JSON formatter, JWT decoder, Base64 encoder, GST calculator, invoice maker, password generator, and more. No signup, 100% private, works offline.",
  metadataBase: new URL("https://toolyfy.in"),
  openGraph: {
    title: "Toolyfy — Free Online Tools for Developers & Professionals",
    description:
      "14+ free tools for developers and professionals. JSON, JWT, Base64, GST, Invoice, Password, and more. No signup, browser-based, always free.",
    url: "https://toolyfy.in",
    siteName: "Toolyfy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolyfy — Free Online Tools for Developers & Professionals",
    description:
      "14+ free tools for developers and professionals. No signup, browser-based, always free.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex min-h-full flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1 w-full bg-white">
          <div className="mx-auto w-full max-w-4xl px-4 pt-8 pb-16 sm:px-6">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
