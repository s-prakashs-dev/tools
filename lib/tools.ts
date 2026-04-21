export interface Tool {
  slug: string;
  shortName: string;
  icon: string;
  title: string;
  h1: string;
  shortDescription: string;
  metaDescription: string;
  fullDescription: string;
  keywords: string[];
}

export const TOOLS: Tool[] = [
  {
    slug: 'json-formatter',
    shortName: 'JSON',
    icon: '{}',
    h1: 'Free Online JSON Formatter & Validator',
    title: 'JSON Formatter & Validator - Free Online Tool',
    shortDescription: 'Format, validate and beautify JSON instantly',
    metaDescription:
      'Format, validate and beautify JSON instantly in your browser. Free online JSON formatter with error detection and minify support.',
    fullDescription:
      'A free online JSON formatter and validator tool that lets you beautify, minify, and validate JSON directly in your browser. It is ideal for API responses, configuration files, and debugging structured data without sending anything to a server.',
    keywords: ['json formatter', 'json validator', 'json beautifier'],
  },
  {
    slug: 'csv-formatter',
    shortName: 'CSV',
    icon: 'CSV',
    h1: 'Free Online CSV Formatter & Viewer',
    title: 'CSV Formatter & Viewer - Free Online Tool',
    shortDescription: 'Format and preview CSV data as a clean table',
    metaDescription:
      'Format and preview CSV data as a clean table in your browser. Free CSV formatter and viewer with raw and table modes.',
    fullDescription:
      'Transform CSV content into a readable table view instantly. This tool helps you inspect comma-separated data, switch between raw and table layouts, and keep everything local in your browser.',
    keywords: ['csv formatter', 'csv viewer', 'csv to table'],
  },
  {
    slug: 'cron-builder',
    shortName: 'Cron',
    icon: 'CR',
    h1: 'Cron Expression Builder & Generator',
    title: 'Cron Expression Builder - Free Online Cron Generator',
    shortDescription: 'Build and validate cron expressions visually',
    metaDescription:
      'Build and validate cron expressions visually. Create schedules faster with human-readable output and next run previews.',
    fullDescription:
      'Build cron expressions with a simple visual interface. Adjust each field, preview the generated expression, read a human-friendly explanation, and review upcoming runtimes in one place.',
    keywords: ['cron expression builder', 'cron generator'],
  },
  {
    slug: 'gst-calculator',
    shortName: 'GST',
    icon: 'Rs',
    h1: 'GST Calculator India - Calculate GST Online Free',
    title: 'GST Calculator India - Free Online GST Calculator',
    shortDescription: 'Calculate GST amount, CGST, SGST and IGST instantly',
    metaDescription:
      'Calculate GST amount, CGST, SGST and IGST instantly. Add or remove GST from any amount with quick rate presets.',
    fullDescription:
      'A practical GST calculator for India that helps you add or remove GST from any amount. It includes intrastate and interstate modes, standard GST rates, and a simple reference table for common categories.',
    keywords: ['gst calculator', 'gst calculator india'],
  },
  {
    slug: 'color-palette',
    shortName: 'Colors',
    icon: 'CP',
    h1: 'Color Palette Generator - Free Online Tool',
    title: 'Color Palette Generator - Free Online Color Palette Tool',
    shortDescription: 'Generate beautiful color palettes instantly',
    metaDescription:
      'Generate beautiful color palettes instantly. Explore complementary, triadic, analogous and split-complementary schemes.',
    fullDescription:
      'Create harmonious color palettes from a single base color. Review HEX, RGB, and HSL values, experiment with different harmony types, and copy colors quickly for design or development work.',
    keywords: ['color palette generator', 'color scheme generator'],
  },
  {
    slug: 'invoice-maker',
    shortName: 'Invoice',
    icon: 'IN',
    h1: 'Free Online Invoice Maker - Create Invoice PDF',
    title: 'Free Invoice Maker - Create and Download Invoice PDF Online',
    shortDescription: 'Create professional invoices and receipts online',
    metaDescription:
      'Create professional invoices and receipts online for free. Add line items, GST details, and print-ready totals.',
    fullDescription:
      'Generate polished invoices directly in your browser with editable business details, client information, line items, and GST calculations. The preview is designed for quick review and printing.',
    keywords: ['free invoice maker', 'invoice generator online'],
  },
  {
    slug: 'password-generator',
    shortName: 'Password',
    icon: 'PW',
    h1: 'Password Generator & UUID Generator - Free Online Tool',
    title: 'Password Generator & UUID Generator - Free Online Security Tools',
    shortDescription: 'Generate strong random passwords and UUIDs',
    metaDescription:
      'Generate strong random passwords and UUIDs instantly. Customize length, character sets, and review password strength.',
    fullDescription:
      'Create secure passwords with adjustable length and character options, then generate UUIDs in the same workspace. Everything runs locally, making it a quick utility for development and account setup workflows.',
    keywords: ['password generator', 'uuid generator'],
  },
  {
    slug: 'image-compressor',
    shortName: 'Images',
    icon: 'IM',
    h1: 'Image Compressor & Resizer - Free Online Tool',
    title: 'Image Compressor & Resizer - Free Online Image Optimizer',
    shortDescription: 'Compress and resize images online for free',
    metaDescription:
      'Compress and resize images online for free. Adjust quality, resize settings, and compare original vs compressed output.',
    fullDescription:
      'Optimize JPG, PNG, and WebP images directly in your browser. Tweak compression quality, resize by percentage or exact dimensions, and download smaller files after previewing the savings.',
    keywords: ['image compressor', 'image resizer'],
  },
];

export const getToolBySlug = (slug: string): Tool | undefined =>
  TOOLS.find((tool) => tool.slug === slug);
