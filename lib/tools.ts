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

export const TOOLS = [
  {
    slug: 'json-formatter',
    shortName: 'JSON',
    icon: '{}',
    h1: 'Free Online JSON Formatter & Validator',
    title: 'JSON Formatter & Validator — Free Online Tool',
    description: 'Format, validate and beautify JSON instantly in your browser.',
    keywords: ['json formatter', 'json validator', 'json beautifier'],
  },
  {
    slug: 'csv-formatter',
    shortName: 'CSV',
    icon: '⊞',
    h1: 'Free Online CSV Formatter & Viewer',
    title: 'CSV Formatter & Viewer — Free Online Tool',
    description: 'Format and preview CSV data as a clean table in your browser.',
    keywords: ['csv formatter', 'csv viewer', 'csv to table'],
  },
  {
    slug: 'cron-builder',
    shortName: 'Cron',
    icon: '⏰',
    h1: 'Cron Expression Builder & Generator',
    title: 'Cron Expression Builder — Free Online Cron Generator',
    description: 'Build and validate cron expressions visually.',
    keywords: ['cron expression builder', 'cron generator'],
  },
  {
    slug: 'gst-calculator',
    shortName: 'GST',
    icon: '₹',
    h1: 'GST Calculator India — Calculate GST Online Free',
    title: 'GST Calculator India — Free Online GST Calculator',
    description: 'Calculate GST amount, CGST, SGST and IGST instantly.',
    keywords: ['gst calculator', 'gst calculator india'],
  },
  {
    slug: 'color-palette',
    shortName: 'Colors',
    icon: '🎨',
    h1: 'Color Palette Generator — Free Online Tool',
    title: 'Color Palette Generator — Free Online Color Palette Tool',
    description: 'Generate beautiful color palettes instantly.',
    keywords: ['color palette generator', 'color scheme generator'],
  },
  {
    slug: 'invoice-maker',
    shortName: 'Invoice',
    icon: '🧾',
    h1: 'Free Online Invoice Maker — Create Invoice PDF',
    title: 'Free Invoice Maker — Create & Download Invoice PDF Online',
    description: 'Create professional invoices and receipts online for free.',
    keywords: ['free invoice maker', 'invoice generator online'],
  },
  {
    slug: 'password-generator',
    shortName: 'Password',
    icon: '🔑',
    h1: 'Password Generator & UUID Generator — Free Online Tool',
    title: 'Password Generator & UUID Generator — Free Online Security Tools',
    description: 'Generate strong random passwords and UUIDs instantly.',
    keywords: ['password generator', 'uuid generator'],
  },
  {
    slug: 'image-compressor',
    shortName: 'Images',
    icon: '🖼️',
    h1: 'Image Compressor & Resizer — Free Online Tool',
    title: 'Image Compressor & Resizer — Free Online Image Optimizer',
    description: 'Compress and resize images online for free.',
    keywords: ['image compressor', 'image resizer'],
  },
];

export const getToolBySlug = (slug: string): Tool | undefined => {
  return TOOLS.find((tool) => tool.slug === slug);
};
