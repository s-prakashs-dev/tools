import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "toolyfy - Free Online Tools & Utilities",
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
    title: "toolyfy - Free Online Tools",
    description: "Collection of free online tools for developers and professionals",
    type: "website",
    url: "https://toolkit.example.com",
  },
};

export default function Home() {
  return <HomeClient />;
}
