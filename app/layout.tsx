import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ToolKit - Free Online Tools",
  description: "Collection of free online tools: JSON formatter, CSV viewer, cron builder, GST calculator, color palette generator, invoice maker, password generator, and image compressor.",
  openGraph: {
    title: "ToolKit - Free Online Tools",
    description: "Collection of free online tools for developers and professionals",
    url: "https://toolkit.example.com",
    siteName: "ToolKit",
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
