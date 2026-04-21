export interface Tool {
  slug: string;
  title: string;
  h1: string;
  shortDescription: string;
  metaDescription: string;
  keywords: string[];
  fullDescription: string;
  icon?: string;
}

export const TOOLS: Tool[] = [
  {
    slug: "json-formatter",
    title: "JSON Formatter & Validator — Free Online Tool",
    h1: "Free Online JSON Formatter & Validator",
    shortDescription: "Format, validate and beautify JSON instantly",
    metaDescription:
      "Format, validate and beautify JSON instantly in your browser. Free online JSON formatter with syntax highlighting and error detection.",
    keywords: [
      "json formatter",
      "json validator",
      "json beautifier",
      "format json online",
    ],
    fullDescription: `A free online JSON formatter and validator tool that allows you to instantly beautify, minify, and validate JSON data directly in your browser. Our JSON formatter supports pretty printing with customizable indentation, error detection with line numbers, and clipboard functionality. Whether you're working with API responses, configuration files, or data structures, this tool helps you format and validate JSON without sending any data to external servers. All processing happens locally on your device for maximum privacy and security.`,
  },
  {
    slug: "csv-formatter",
    title: "CSV Formatter & Viewer — Free Online Tool",
    h1: "Free Online CSV Formatter & Viewer",
    shortDescription: "Format and preview CSV data as a clean table",
    metaDescription:
      "Format and preview CSV data as a clean table in your browser. Free CSV formatter, converter and viewer — no upload needed.",
    keywords: ["csv formatter", "csv viewer", "csv to table", "format csv online"],
    fullDescription: `Transform your CSV data into formatted tables with our free online CSV formatter and viewer. View your comma-separated values in a clean, organized table format, toggle between raw and table views, and handle complex CSV structures with quoted fields and embedded commas. Download formatted data or convert between formats. All CSV parsing and processing happens directly in your browser with zero server uploads, ensuring your data stays private.`,
  },
  {
    slug: "cron-builder",
    title: "Cron Expression Builder — Free Online Cron Generator",
    h1: "Cron Expression Builder & Generator",
    shortDescription: "Build and validate cron expressions visually",
    metaDescription:
      "Build and validate cron expressions visually. Understand cron schedule syntax with human-readable descriptions. Free online cron builder.",
    keywords: [
      "cron expression builder",
      "cron generator",
      "cron syntax",
      "online cron builder",
    ],
    fullDescription: `Master cron scheduling with our intuitive visual cron expression builder. Create complex cron schedules using simple dropdown menus for minutes, hours, days, months, and days of the week. Instantly see human-readable descriptions of your schedule (e.g., "At 09:00 AM, Monday through Friday") and the next 5 run times. Use preset templates for common schedules like daily, weekly, or business hours. All cron expression generation and time calculations happen locally in your browser.`,
  },
  {
    slug: "gst-calculator",
    title: "GST Calculator India — Calculate GST Online Free",
    h1: "GST Calculator India — Calculate GST Online Free",
    shortDescription: "Calculate GST amount, CGST, SGST and IGST instantly",
    metaDescription:
      "Calculate GST amount, CGST, SGST and IGST instantly. Free online GST calculator for India — add or remove GST from any amount.",
    keywords: [
      "gst calculator",
      "gst calculator india",
      "calculate gst online",
      "cgst sgst calculator",
    ],
    fullDescription: `A comprehensive GST calculator for India that helps you instantly calculate GST, CGST, SGST, and IGST for any transaction amount. Calculate GST forward (add GST to price) or reverse (remove GST from total). Select from standard GST rates (0%, 5%, 12%, 18%, 28%) and toggle between interstate (IGST) and intrastate (CGST + SGST) calculations. Results are displayed with proper Indian number formatting. Includes a reference table of common goods and services with their applicable GST rates.`,
  },
  {
    slug: "color-palette",
    title: "Color Palette Generator — Free Online Tool",
    h1: "Color Palette Generator — Free Online Tool",
    shortDescription: "Generate beautiful color palettes and schemes",
    metaDescription:
      "Generate beautiful color palettes instantly. Get HEX, RGB and HSL values. Create complementary, triadic and analogous color schemes online.",
    keywords: [
      "color palette generator",
      "color scheme generator",
      "color picker online",
      "hex color palette",
    ],
    fullDescription: `Create stunning color palettes instantly with our free online color palette generator. Start with any color and generate harmonious 5-color palettes using complementary, triadic, analogous, or split-complementary color theory. Each color in your palette displays HEX, RGB, and HSL values, and you can copy any color value with a single click. Randomize to explore new combinations or refine your selection manually. Perfect for designers, developers, and creative professionals looking for color inspiration.`,
  },
  {
    slug: "invoice-maker",
    title: "Free Invoice Maker — Create Invoice PDF Online",
    h1: "Free Online Invoice Maker — Create Invoice PDF",
    shortDescription: "Create professional invoices and receipts online",
    metaDescription:
      "Create professional invoices and receipts online for free. Add items, GST, logo and download as PDF. No signup required.",
    keywords: [
      "free invoice maker",
      "invoice generator online",
      "create invoice pdf",
      "receipt maker",
    ],
    fullDescription: `Generate professional invoices and receipts directly in your browser with our free online invoice maker. Add your business details, client information, line items with quantities and rates, and apply GST (with CGST/SGST or IGST breakdown). Your invoice calculates totals automatically and displays in a print-ready format. Download as PDF or print directly from your browser. All data remains on your device with no server storage or signup required. Perfect for small businesses and freelancers.`,
  },
  {
    slug: "password-generator",
    title: "Password Generator & UUID Generator — Free Online Tool",
    h1: "Password Generator & UUID Generator — Free Online Tool",
    shortDescription: "Generate strong random passwords and UUIDs",
    metaDescription:
      "Generate strong random passwords and UUIDs instantly. Customise length, character sets and complexity. Free online password and UUID generator.",
    keywords: [
      "password generator",
      "uuid generator",
      "random password generator",
      "strong password generator",
    ],
    fullDescription: `A powerful tool for generating secure random passwords and UUIDs. Create strong passwords with customizable length (8–128 characters) and character sets (uppercase, lowercase, numbers, symbols). See real-time strength indicators and generate multiple passwords at once. Also includes a UUID v4 generator for creating unique identifiers for databases and applications. All cryptographic generation happens locally in your browser using secure browser APIs with no external API calls.`,
  },
  {
    slug: "image-compressor",
    title: "Image Compressor & Resizer — Free Online Tool",
    h1: "Image Compressor & Resizer — Free Online Tool",
    shortDescription: "Compress and resize images online for free",
    metaDescription:
      "Compress and resize images online for free. Reduce image file size without losing quality. Supports JPG, PNG and WebP. No upload to server.",
    keywords: [
      "image compressor",
      "image resizer",
      "compress image online",
      "reduce image size",
    ],
    fullDescription: `Compress and resize images directly in your browser with our free online image optimizer. Upload JPG, PNG, or WebP images, adjust compression quality, resize by percentage or exact dimensions (with aspect ratio lock), and preview results side-by-side with the original. See exact file size reduction and download optimized images instantly. All image processing uses HTML5 Canvas for maximum performance, and your images never leave your device.`,
  },
];

export const getToolBySlug = (slug: string): Tool | undefined => {
  return TOOLS.find((tool) => tool.slug === slug);
};
