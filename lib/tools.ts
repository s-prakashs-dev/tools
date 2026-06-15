export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  step: number;
  title: string;
  description: string;
}

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
  faqs?: FAQItem[];
  howToSteps?: HowToStep[];
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
      'A free online JSON formatter and validator tool that lets you beautify, minify, and validate JSON directly in your browser. JSON (JavaScript Object Notation) is the most popular data format for APIs, configuration files, and web applications. Working with minified or poorly formatted JSON can be frustrating and error-prone, especially when debugging API responses or editing configuration files.\n\nOur JSON formatter tool solves this problem by automatically beautifying your JSON with proper indentation, line breaks, and syntax highlighting. Whether you are receiving a minified JSON response from an API, need to validate the syntax of a JSON file before deployment, or simply want to make your JSON more readable, this tool handles it all instantly.\n\nThe tool features three core functions: Format (beautify with proper indentation), Minify (compress for smaller file size), and Validate (check for syntax errors). All processing happens 100% in your browser—nothing is sent to our servers, so your data stays completely private and secure.\n\nKey features include automatic error detection with clear error messages showing exactly where the JSON is invalid, support for large files, copy-to-clipboard functionality for quick sharing, and a clean interface that works on desktop and mobile. Whether you are a developer working with APIs, a DevOps engineer managing configuration files, or someone learning JSON syntax, this tool saves time and eliminates formatting errors.',
    keywords: ['json formatter', 'json validator', 'json beautifier'],
    faqs: [
      {
        question: 'What is JSON and why do I need to format it?',
        answer: 'JSON is a lightweight, text-based data format widely used in APIs and web applications. Formatting (beautifying) JSON makes it much more readable by adding proper indentation and line breaks. This is essential when debugging API responses or editing configuration files where syntax errors can break your application.',
      },
      {
        question: 'Is my data safe when using this tool?',
        answer: 'Absolutely. Our JSON formatter is 100% client-side, meaning all processing happens in your web browser. Your data never leaves your computer—we don\'t have any servers that receive, store, or process your JSON. You can even use this tool offline once the page loads.',
      },
      {
        question: 'Can I minify JSON to reduce file size?',
        answer: 'Yes. The Minify button removes all unnecessary whitespace and line breaks from your JSON, significantly reducing file size. This is useful when you need to send JSON over the network or store it in a database where size matters.',
      },
      {
        question: 'What happens if my JSON has errors?',
        answer: 'The tool will immediately highlight any syntax errors and show you the exact error message. Common errors include missing commas, unclosed brackets, invalid quotes, or duplicate keys. The error message tells you exactly where the problem is, making it easy to fix.',
      },
      {
        question: 'Does this tool work offline?',
        answer: 'Yes. Once the page loads in your browser, you can use the JSON formatter even without an internet connection. The entire tool runs locally in your browser, so there\'s no reliance on server connectivity.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Paste your JSON',
        description: 'Copy and paste your JSON content into the left input panel. You can paste minified JSON, API responses, configuration files, or any valid JSON data.',
      },
      {
        step: 2,
        title: 'Choose an action',
        description: 'Click the Format button to beautify with indentation, Minify to compress, or Validate to check for errors. The result appears immediately in the output panel.',
      },
      {
        step: 3,
        title: 'Copy and use',
        description: 'Click the Copy button to copy the formatted JSON to your clipboard, then paste it anywhere you need it—in your code editor, documentation, or elsewhere.',
      },
    ],
  },
  {
    slug: 'csv-formatter',
    shortName: 'CSV',
    icon: '⊞',
    h1: 'Free Online CSV Formatter & Viewer',
    title: 'CSV Formatter & Viewer - Free Online Tool',
    shortDescription: 'Format and preview CSV data as a clean table',
    metaDescription:
      'Format and preview CSV data as a clean table in your browser. Free CSV formatter and viewer with raw and table modes.',
    fullDescription:
      'Transform CSV content into a readable table view instantly. This tool helps you inspect comma-separated data, switch between raw and table layouts, and keep everything local in your browser. CSV (Comma-Separated Values) is one of the most widely used data formats for storing and sharing tabular data, yet working with raw CSV in a text editor is difficult and error-prone.\n\nOur CSV formatter and viewer lets you paste raw CSV data and instantly see it formatted as a beautiful, easy-to-read table. The tool automatically detects delimiters (commas, tabs, semicolons) and can handle quoted fields with embedded special characters. Whether you are importing data from a spreadsheet, exporting from a database, or working with large datasets, this tool makes it simple to inspect and verify your data without needing to open a spreadsheet application.\n\nSwitch between raw and table views to see your data in different formats. The raw view shows the original CSV with line breaks preserved, while the table view displays it as a clean, sortable grid. This is especially useful for spotting data quality issues like missing fields, extra commas, or malformed quotes that would cause import failures.\n\nCommon use cases include data import validation before uploading to a database, CSV format inspection when working with APIs that export data, debugging ETL pipelines, and collaborating with team members on data files. The tool is completely free, runs locally in your browser, and requires no registration or software installation.',
    keywords: ['csv formatter', 'csv viewer', 'csv to table'],
    faqs: [
      {
        question: 'What is CSV and how is it used?',
        answer: 'CSV stands for Comma-Separated Values—a simple text format for storing tabular data where each line represents a row and commas separate columns. CSVs are widely used for data export/import in spreadsheets, databases, CRM systems, and analytics platforms.',
      },
      {
        question: 'Can this tool handle large CSV files?',
        answer: 'Yes, the tool can handle large CSV files limited only by your browser\'s memory. For very large files (over 100MB), performance may slow down, but typical CSV imports work instantly without any issues.',
      },
      {
        question: 'What if my CSV uses a delimiter other than commas?',
        answer: 'The tool automatically detects common delimiters including commas, tabs, semicolons, and pipes. If your CSV uses a different delimiter, the table view will still render correctly in most cases.',
      },
      {
        question: 'Can I edit the data in the table view?',
        answer: 'The current version displays your CSV data but doesn\'t allow editing within the table. However, you can easily copy the table data and edit it in a spreadsheet application or text editor.',
      },
      {
        question: 'Is there a way to download the formatted CSV?',
        answer: 'You can copy the table data from the raw view and save it to a text file with a .csv extension. Alternatively, you can use your browser\'s save function to preserve the formatted output.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Paste your CSV data',
        description: 'Copy and paste your CSV content into the input area. This can come from a spreadsheet export, database export, or any text file with CSV data.',
      },
      {
        step: 2,
        title: 'View as table',
        description: 'The tool automatically converts your CSV into a readable table format. Check that the columns and data look correct—this helps spot any formatting issues before importing elsewhere.',
      },
      {
        step: 3,
        title: 'Switch between views',
        description: 'Toggle between the raw CSV view and the formatted table view to compare and verify your data from different perspectives.',
      },
    ],
  },
  {
    slug: 'cron-builder',
    shortName: 'Cron',
    icon: '⏱',
    h1: 'Cron Expression Builder & Generator',
    title: 'Cron Expression Builder - Free Online Cron Generator',
    shortDescription: 'Build and validate cron expressions visually',
    metaDescription:
      'Build and validate cron expressions visually. Create schedules faster with human-readable output and next run previews.',
    fullDescription:
      'Build cron expressions with a simple visual interface. Adjust each field, preview the generated expression, read a human-friendly explanation, and review upcoming runtimes in one place. Cron is a time-based job scheduler used in Unix/Linux systems and many modern applications to run tasks at specific times or intervals.\n\nCron expressions use a compact 5-field syntax (minute, hour, day, month, day-of-week) that most developers find difficult to remember and error-prone to write. A single typo in your cron expression can cause jobs to run at the wrong time or not run at all, potentially breaking critical workflows like backups, data syncs, or report generation.\n\nOur visual cron builder eliminates guesswork by letting you adjust each field using intuitive controls and immediately seeing the human-readable explanation of your schedule. For example, "0 9 * * 1-5" means "every weekday at 9 AM"—our tool explains that in plain English so you know exactly when your job will run.\n\nFeatures include support for all standard cron syntax including wildcards, ranges, step values, and special characters. You can preview the next 10 upcoming run times to verify your expression is correct before deploying it. The tool also includes preset templates for common schedules like "daily", "weekly", "monthly", and "every 5 minutes".\n\nWhether you are a DevOps engineer scheduling server tasks, a developer setting up automated jobs, or a system administrator managing scheduled backups, this tool saves time and prevents scheduling mistakes.',
    keywords: ['cron expression builder', 'cron generator', 'cron schedule'],
    faqs: [
      {
        question: 'What is a cron expression?',
        answer: 'A cron expression is a string that specifies when a scheduled task should run. It uses five fields: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6 where 0=Sunday). For example, "0 9 * * *" means every day at 9:00 AM.',
      },
      {
        question: 'What do the wildcard symbols mean?',
        answer: '"*" means "every value" for that field. "," separates multiple values, "-" defines a range, and "/" specifies step intervals. For example, "*/5" in the minute field means "every 5 minutes".',
      },
      {
        question: 'How can I run a task every N minutes?',
        answer: 'Use "*/N" in the minute field where N is the interval. For example, "*/15 * * * *" runs every 15 minutes. For intervals longer than an hour, use the hour field similarly.',
      },
      {
        question: 'What\'s the difference between day and day-of-week fields?',
        answer: 'Day (field 3) specifies the date of the month (1-31), while day-of-week (field 5) specifies which day(s) of the week (0-6). Using both can cause unexpected behavior—typically you use one or the other.',
      },
      {
        question: 'Can I preview when my scheduled task will run?',
        answer: 'Yes! Our tool shows you the next 10 upcoming run times for your cron expression. This helps you verify the schedule is correct before deploying it to your production system.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Adjust each cron field',
        description: 'Use the input fields or dropdown menus to set minute, hour, day, month, and day-of-week values. You can enter specific numbers, wildcards (*), ranges (1-5), or step values (*/15).',
      },
      {
        step: 2,
        title: 'Review the explanation',
        description: 'The tool displays your cron expression in plain English (e.g., "every weekday at 9 AM"). Verify this matches your intended schedule.',
      },
      {
        step: 3,
        title: 'Check upcoming run times',
        description: 'See the next 10 scheduled run times. This helps confirm your expression is correct before using it in production.',
      },
      {
        step: 4,
        title: 'Copy your expression',
        description: 'Copy the generated cron expression and paste it into your cron job configuration, CI/CD pipeline, or scheduled task system.',
      },
    ],
  },
  {
    slug: 'gst-calculator',
    shortName: 'GST',
    icon: '₹',
    h1: 'GST Calculator India - Calculate GST Online Free',
    title: 'GST Calculator India - Free Online GST Calculator',
    shortDescription: 'Calculate GST amount, CGST, SGST and IGST instantly',
    metaDescription:
      'Calculate GST amount, CGST, SGST and IGST instantly. Add or remove GST from any amount with quick rate presets.',
    fullDescription:
      'A practical GST calculator for India that helps you add or remove GST from any amount. It includes intrastate and interstate modes, standard GST rates, and a simple reference table for common categories. GST (Goods and Services Tax) is India\'s unified taxation system that replaced multiple indirect taxes. Whether you are a freelancer generating invoices, a small business owner calculating prices, or an accountant managing tax compliance, calculating the correct GST amount is critical.\n\nOur GST calculator handles both scenarios: adding GST to a base amount (finding final price) and removing GST from a total amount (finding pre-tax price). This is especially useful for invoice preparation and reverse calculations. The tool supports CGST + SGST (intrastate transactions) and IGST (interstate transactions).\n\nYou can quickly switch between common GST rates (5%, 12%, 18%, 28%) or enter a custom rate if needed. The calculator shows a detailed breakdown of the amount, GST, and total, making it easy to verify calculations before finalizing invoices or tax documents.\n\nThe tool also includes a reference guide showing standard GST rates for common product and service categories—useful if you are unsure what rate applies to your products. Everything is calculated in your browser with no data sent to any server, so you can confidently use this for sensitive financial calculations.\n\nCommon use cases include invoice generation for freelancers, price quoting in GST-compliant businesses, tax compliance calculations, and educational purposes for understanding India\'s GST system.',
    keywords: ['gst calculator', 'gst calculator india', 'gst rate calculator'],
    faqs: [
      {
        question: 'What is GST and who needs to register?',
        answer: 'GST (Goods and Services Tax) is India\'s unified tax system. Registration is mandatory for most businesses with annual turnover above ₹40 lakhs (₹20 lakhs for some states). Our calculator is useful whether you are registered or calculating GST for educational purposes.',
      },
      {
        question: 'What\'s the difference between CGST, SGST, and IGST?',
        answer: 'CGST (Central GST) and SGST (State GST) apply to intrastate transactions (within same state). IGST (Integrated GST) applies to interstate transactions. The total rate is the same (CGST + SGST = IGST), but the component matters for tax filing.',
      },
      {
        question: 'How do I calculate reverse GST (remove GST from total)?',
        answer: 'Select the "Reverse Calculate" option, enter the total amount including GST, select the GST rate, and the calculator automatically shows the base amount and GST component. This is useful for invoice verification.',
      },
      {
        question: 'What are the standard GST rates in India?',
        answer: 'The main GST rates are 5%, 12%, 18%, and 28%. Essential items are often at 5%, most goods/services at 18%, and luxury items at 28%. Some items are GST-exempt. Our tool includes a reference table for common categories.',
      },
      {
        question: 'Is this calculator accurate for compliance?',
        answer: 'This calculator is a useful tool for quick calculations, but for tax compliance and invoicing, always refer to official GST rates and consult a tax professional. Laws and rates can change, so verify current rates on the GST portal.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Choose calculation mode',
        description: 'Select whether you want to add GST to a base amount or remove GST from a total. Choose CGST+SGST (intrastate) or IGST (interstate).',
      },
      {
        step: 2,
        title: 'Enter amount and rate',
        description: 'Input the amount and select or enter the GST rate (5%, 12%, 18%, 28%, or custom). The calculator updates instantly.',
      },
      {
        step: 3,
        title: 'Review the breakdown',
        description: 'Check the detailed breakdown showing base amount, GST components, and total. Verify this matches your invoicing needs.',
      },
    ],
  },
  {
    slug: 'color-palette',
    shortName: 'Colors',
    icon: '🎨',
    h1: 'Color Palette Generator - Free Online Tool',
    title: 'Color Palette Generator - Free Online Color Palette Tool',
    shortDescription: 'Generate beautiful color palettes instantly',
    metaDescription:
      'Generate beautiful color palettes instantly. Explore complementary, triadic, analogous and split-complementary schemes.',
    fullDescription:
      'Create harmonious color palettes from a single base color. Review HEX, RGB, and HSL values, experiment with different harmony types, and copy colors quickly for design or development work. Choosing a cohesive color palette is one of the most important aspects of design—whether you are creating a website, mobile app, brand identity, or graphic design. A well-chosen palette creates visual harmony and professional appearance, while a poor palette looks amateurish and can confuse users.\n\nOur color palette generator takes one base color and instantly generates five complementary colors using different color theory principles. Choose from multiple harmony types: Complementary (opposite colors), Analogous (colors next to each other), Triadic (evenly spaced colors), Tetradic (two pairs of complements), and Split-Complementary (main color plus two variants).\n\nEach generated color is displayed with HEX, RGB, and HSL values so you can use them in any design tool, website, or application. The tool also shows a preview of how the colors work together, helping you see if the palette suits your design vision before committing.\n\nYou can fine-tune colors by adjusting hue, saturation, and brightness sliders, or simply generate new palettes by selecting a different harmony type. Copy individual colors or the entire palette to your clipboard for quick use in Figma, Adobe XD, CSS code, or any design software.\n\nWhether you are a web designer creating site color schemes, a UI/UX designer building component libraries, a graphic designer working on branding, or a developer trying to choose consistent colors for your application, this tool saves hours of trial-and-error color selection.',
    keywords: ['color palette generator', 'color scheme generator', 'complementary colors'],
    faqs: [
      {
        question: 'What is a color harmony and why does it matter?',
        answer: 'Color harmony is the pleasing arrangement of colors based on color theory. Different harmony types (complementary, analogous, triadic) create different visual effects. A harmonious palette looks professional and cohesive, while random colors look disjointed.',
      },
      {
        question: 'What\'s the difference between the harmony types?',
        answer: 'Complementary = opposite colors (high contrast). Analogous = adjacent colors (calm). Triadic = three evenly spaced colors (balanced). Tetradic = four colors (complex). Split-Complementary = safer than complementary. Each creates a different mood.',
      },
      {
        question: 'Can I export palettes for use in design software?',
        answer: 'Yes! You can copy individual color values in HEX, RGB, or HSL format and paste them directly into any design software like Figma, Adobe XD, or Sketch. Many tools also support importing colors via JSON or text.',
      },
      {
        question: 'How do I choose the right harmony type for my project?',
        answer: 'For professional and safe palettes, use Analogous or Triadic. For high-impact designs, use Complementary. For complex layouts with many elements, use Tetradic. Experiment with each to see what fits your design vision.',
      },
      {
        question: 'Are there accessibility considerations with color palettes?',
        answer: 'Yes. Ensure sufficient contrast between text and background colors for readability. Avoid using color alone to convey information—colorblind users won\'t see the distinction. Test your palette with contrast checking tools.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Pick a base color',
        description: 'Click the color picker or paste a HEX code to select your primary color. This is the foundation for all generated colors.',
      },
      {
        step: 2,
        title: 'Choose a harmony type',
        description: 'Select a color harmony (Complementary, Analogous, Triadic, etc.) to generate colors based on color theory principles.',
      },
      {
        step: 3,
        title: 'Fine-tune if needed',
        description: 'Adjust hue, saturation, and brightness sliders to refine the palette. Generate new variations until you find one you like.',
      },
      {
        step: 4,
        title: 'Copy colors for your project',
        description: 'Click any color to copy its HEX/RGB value, or select the entire palette to copy multiple colors at once.',
      },
    ],
  },
  {
    slug: 'invoice-maker',
    shortName: 'Invoice',
    icon: '🧾',
    h1: 'Free Online Invoice Maker - Create Invoice PDF',
    title: 'Free Invoice Maker - Create and Download Invoice PDF Online',
    shortDescription: 'Create professional invoices and receipts online',
    metaDescription:
      'Create professional invoices and receipts online for free. Add line items, GST details, and print-ready totals.',
    fullDescription:
      'Generate polished invoices directly in your browser with editable business details, client information, line items, and GST calculations. The preview is designed for quick review and printing. Creating professional invoices is essential for any freelancer or business—it\'s not just about getting paid, but also maintaining proper business records for tax compliance and professionalism.\n\nTraditional invoicing methods are time-consuming: downloading templates, editing in Word or spreadsheets, formatting tables, calculating totals, and managing invoice numbers. Errors in calculations or formatting can damage your professional image and create accounting headaches.\n\nOur invoice maker streamlines this process. Start with your business details (name, address, tax ID), add client information, and input line items with descriptions, quantities, and rates. The tool automatically calculates subtotals, GST (with CGST/SGST support), and final totals. Everything is formatted professionally and ready to print or save as PDF.\n\nFeatures include customizable invoice numbers and dates, support for multiple line items, automatic calculation of taxes and discounts, a print-optimized layout, and a clean interface that works on desktop and mobile. The invoice preview shows exactly how it will print, so there are no surprises.\n\nThis is ideal for freelancers, consultants, contractors, small businesses, and anyone who needs to issue professional invoices without expensive accounting software. All calculations and formatting happen locally in your browser—nothing is stored on our servers.\n\nCommon use cases include generating invoices for client work, creating receipts for services rendered, maintaining records for tax filing, and maintaining a professional image with properly formatted invoices.',
    keywords: ['free invoice maker', 'invoice generator online', 'invoice template'],
    faqs: [
      {
        question: 'Is this invoice legally valid for tax purposes?',
        answer: 'This tool helps you create professionally formatted invoices, but legality depends on your local tax laws and invoice requirements. In India, invoices must include GST ID, item details, and tax calculations. Always verify your local requirements and consult an accountant.',
      },
      {
        question: 'Can I save or download the invoice as PDF?',
        answer: 'Yes. The invoice preview is print-ready and can be saved as PDF using your browser\'s print function (Ctrl+P or Cmd+P, then "Save as PDF"). Some browsers and plugins may offer direct PDF download options.',
      },
      {
        question: 'How do I add multiple line items?',
        answer: 'The tool allows you to add as many line items as needed. Each line item has fields for description, quantity, unit rate, and tax rate. Totals and taxes are calculated automatically.',
      },
      {
        question: 'Does this tool store my invoice data?',
        answer: 'No. All data is stored locally in your browser. Your invoice information is never sent to our servers or stored permanently. Close your browser and your draft is deleted unless you save it locally.',
      },
      {
        question: 'Can I use this for recurring invoices?',
        answer: 'This tool is designed for one-time invoice generation. For recurring invoices, you would need to recreate the invoice each time. For business automation, consider accounting software like Zoho or GST Portal.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Enter business details',
        description: 'Fill in your business name, address, phone, email, and GST/Tax ID. These appear as the invoice issuer details.',
      },
      {
        step: 2,
        title: 'Add client information',
        description: 'Enter the client/customer name, address, and any reference details. This identifies who is being billed.',
      },
      {
        step: 3,
        title: 'Add line items',
        description: 'Add each service or product with description, quantity, unit rate, and applicable GST rate. Totals are calculated automatically.',
      },
      {
        step: 4,
        title: 'Preview and print',
        description: 'Review the invoice preview to verify all details are correct. Print directly or save as PDF using your browser\'s print function.',
      },
    ],
  },
  {
    slug: 'password-generator',
    shortName: 'Password',
    icon: '🔑',
    h1: 'Password Generator & UUID Generator - Free Online Tool',
    title: 'Password Generator & UUID Generator - Free Online Security Tools',
    shortDescription: 'Generate strong random passwords and UUIDs',
    metaDescription:
      'Generate strong random passwords and UUIDs instantly. Customize length, character sets, and review password strength.',
    fullDescription:
      'Create secure passwords with adjustable length and character options, then generate UUIDs in the same workspace. Everything runs locally, making it a quick utility for development and account setup workflows. Weak passwords are one of the leading causes of security breaches. Using simple passwords like "123456" or "password" puts your accounts at risk, yet creating truly random, strong passwords manually is difficult and time-consuming.\n\nOur password generator creates cryptographically random passwords tailored to your exact requirements. Specify length (typically 12-20 characters), character types (uppercase, lowercase, numbers, special characters), and exclude confusing characters if needed. The generator shows password strength instantly so you know if it meets security requirements.\n\nBeyond passwords, the tool also generates UUIDs (Universally Unique Identifiers)—essential for developers working with databases, APIs, and distributed systems. Generate single UUIDs or batch generate up to 100 at once.\n\nFeatures include customizable password length and character sets, password strength indicator, copyable output, batch UUID generation, and support for UUID v1 and v4 formats. All generation happens locally in your browser—no random data leaves your computer or is logged anywhere.\n\nCommon use cases include creating strong passwords for new accounts, generating API keys for applications, testing password validation logic during development, creating UUIDs for database records, and batch generating identifiers for system testing.\n\nFor production systems requiring cryptographically secure randomness, use a proper cryptography library in your application rather than relying on browser-based generation.',
    keywords: ['password generator', 'uuid generator', 'random password'],
    faqs: [
      {
        question: 'How long should my password be?',
        answer: 'Most security experts recommend at least 12-16 characters. Longer passwords are exponentially harder to crack. For critical accounts (email, banking), use 16+ characters with a mix of character types.',
      },
      {
        question: 'What character types should I include?',
        answer: 'Use a mix of uppercase letters, lowercase letters, numbers, and special characters (!@#$%^&*) for maximum strength. However, some websites have restrictions, so customize based on the site\'s password requirements.',
      },
      {
        question: 'Is this secure for creating important account passwords?',
        answer: 'Yes. Passwords generated here are created using your browser\'s random number generator and never leave your computer. This is suitable for personal and business accounts. For ultra-sensitive systems, use offline password managers.',
      },
      {
        question: 'What is a UUID and why do developers need it?',
        answer: 'A UUID (Universally Unique Identifier) is a 128-bit unique identifier used in databases, APIs, and distributed systems. UUID v4 is random and suitable for most cases. UUID v1 includes timestamp and MAC address information.',
      },
      {
        question: 'Can I generate multiple passwords at once?',
        answer: 'The current version generates one password at a time, but you can run the generator multiple times to create several passwords. For batch operations, use password managers or system command-line tools.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Set password length',
        description: 'Choose a length between 8 and 64 characters. Longer passwords are more secure. 12-16 characters is a good balance.',
      },
      {
        step: 2,
        title: 'Select character types',
        description: 'Check boxes for uppercase, lowercase, numbers, and special characters. More character types = stronger password.',
      },
      {
        step: 3,
        title: 'Generate and check strength',
        description: 'Click Generate to create a password. Check the strength indicator to confirm it meets your security needs.',
      },
      {
        step: 4,
        title: 'Copy to clipboard',
        description: 'Click Copy to save the password to your clipboard. Paste it into your account setup or password manager.',
      },
    ],
  },
  {
    slug: 'image-compressor',
    shortName: 'Images',
    icon: '🖼️',
    h1: 'Image Compressor & Resizer - Free Online Tool',
    title: 'Image Compressor & Resizer - Free Online Image Optimizer',
    shortDescription: 'Compress and resize images online for free',
    metaDescription:
      'Compress and resize images online for free. Adjust quality, resize settings, and compare original vs compressed output.',
    fullDescription:
      'Optimize JPG, PNG, and WebP images directly in your browser. Tweak compression quality, resize by percentage or exact dimensions, and download smaller files after previewing the savings. Large, unoptimized images are a major cause of slow website loading times, which hurts both user experience and search engine rankings. Whether you are preparing images for a website, optimizing photos for email, or reducing storage costs, image compression is essential.\n\nOur image compressor tool handles JPG, PNG, WebP, and other common formats. Adjust compression quality with an easy slider—higher quality means larger file size, while lower quality reduces file size but may show artifacts. The preview window shows the original image alongside the compressed version so you can see the quality tradeoff before downloading.\n\nBeyond compression, the tool also resizes images by percentage or exact dimensions (width × height in pixels). This is useful for creating thumbnails, fitting images to specific layouts, or reducing dimensions for faster uploads and downloads.\n\nFeatures include real-time quality preview, file size comparison (original vs compressed), support for multiple formats, batch resizing capability, and zero uploads—all processing happens locally in your browser. See the file size reduction before committing to download.\n\nCommon use cases include optimizing images for website performance, creating properly sized images for social media, reducing storage usage for cloud backups, preparing photos for email sharing, and creating responsive images for different screen sizes. Professional photographers, web developers, content creators, and anyone working with images benefit from this tool.',
    keywords: ['image compressor', 'image resizer', 'image optimizer'],
    faqs: [
      {
        question: 'What\'s the difference between compression and resizing?',
        answer: 'Compression reduces file size while keeping dimensions the same by removing visual redundancy. Resizing changes dimensions (width/height) which also reduces file size. Use both together for maximum optimization.',
      },
      {
        question: 'Will compression affect image quality?',
        answer: 'Yes, but you control how much. High compression = small file + visible quality loss. Low compression = larger file + barely visible quality loss. Preview the result before downloading to find your ideal balance.',
      },
      {
        question: 'What image formats are supported?',
        answer: 'The tool supports JPG, PNG, WebP, GIF, and BMP. Different formats have different compression characteristics—JPG is best for photos, PNG for graphics with transparency, and WebP offers excellent compression.',
      },
      {
        question: 'Can I batch compress multiple images?',
        answer: 'The current version processes one image at a time. For batch compression, you can compress multiple images individually by repeating the process, or use command-line tools like ImageMagick.',
      },
      {
        question: 'Is my image data private?',
        answer: 'Yes, completely. All image processing happens in your browser. Your images are never uploaded to servers or stored anywhere. Close your browser and the image is gone—perfect for privacy-sensitive photos.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Upload your image',
        description: 'Click to select an image file from your computer, or drag and drop an image. Supported formats: JPG, PNG, WebP, GIF, BMP.',
      },
      {
        step: 2,
        title: 'Adjust quality and dimensions',
        description: 'Use the quality slider to adjust compression (1-100). Optionally resize by percentage or enter specific width/height. Preview updates in real-time.',
      },
      {
        step: 3,
        title: 'Compare file sizes',
        description: 'See the original file size vs compressed size. The percentage reduction helps you decide if the quality/size tradeoff is acceptable.',
      },
      {
        step: 4,
        title: 'Download optimized image',
        description: 'Click Download to save the compressed/resized image to your computer. The file size will be significantly smaller than the original.',
      },
    ],
  },
  {
    slug: 'jwt-decoder',
    shortName: 'JWT',
    icon: '🔐',
    h1: 'JWT Decoder - Decode JWT Tokens Online Free',
    title: 'JWT Decoder & Validator - Decode JSON Web Tokens Online',
    shortDescription: 'Decode and inspect JWT tokens with expiry check',
    metaDescription:
      'Decode JWT tokens online free. View header, payload, signature and check token expiry. No signup, completely private, browser-based.',
    fullDescription:
      'A free online JWT (JSON Web Token) decoder that lets you paste any JWT and instantly see the decoded header, payload, and signature. JWT tokens are used extensively in modern web applications for authentication and authorization, but they are encoded in Base64—you can\'t read them directly. Understanding what\'s inside a JWT is crucial for debugging authentication issues, verifying claims, and understanding token expiry.\n\nOur JWT decoder instantly decodes any token and displays three sections: the Header (algorithm and token type information), the Payload (user claims and metadata), and the Signature (cryptographic hash). The tool automatically detects if the token is expired and shows a clear indicator: green for valid tokens, red for expired tokens.\n\nUnlike many JWT decoders online, this tool runs 100% in your browser—your tokens are never sent to any server, making it completely safe for decoding sensitive authentication tokens. You can use this tool for debugging, learning about JWT structure, verifying token contents before making API calls, or understanding authentication claims in your application.\n\nFeatures include automatic token validation, expiry status indicator, one-click copy for each section, support for standard JWT format, and color-coded output. Whether you are a developer debugging authentication issues, a security engineer inspecting tokens, or someone learning how JWTs work, this tool provides quick insights without compromising privacy.\n\nCommon use cases include debugging authentication errors, inspecting OAuth tokens, verifying JWT claims before API requests, learning JWT structure, and troubleshooting token-related issues in microservices and API-based architectures.',
    keywords: ['jwt decoder', 'jwt decoder online', 'decode jwt token', 'jwt parser', 'jwt validator'],
    faqs: [
      {
        question: 'What is a JWT and why is it encoded?',
        answer: 'A JWT (JSON Web Token) is a standard format for securely transmitting information between systems. It\'s Base64-encoded (not encrypted) to create a compact, URL-safe string. The three parts (header, payload, signature) are separated by dots. Encoding compresses and standardizes the format, not to hide data.',
      },
      {
        question: 'Is it safe to decode tokens online?',
        answer: 'For public tokens and testing, yes. This decoder runs entirely in your browser—tokens are never sent to our servers. However, for highly sensitive production tokens, consider decoding locally or using secure offline tools. Remember: decoding doesn\'t validate the signature.',
      },
      {
        question: 'What does the expiry status mean?',
        answer: 'The "exp" (expiration time) claim in the payload indicates when the token becomes invalid. Green "Valid" means the token hasn\'t expired yet. Red "Expired" means the token can no longer be used for authentication. This is just informational—verify tokens server-side.',
      },
      {
        question: 'Can I edit a JWT and use it again?',
        answer: 'No. Even if you modify the payload, the signature will no longer match, and the server will reject it. JWTs are tamper-proof—the signature ensures integrity. Creating valid signed tokens requires the private key, which you shouldn\'t share.',
      },
      {
        question: 'What\'s the difference between decoding and validating?',
        answer: 'Decoding reads the contents (what this tool does). Validating checks if the signature is correct using the secret key (requires server-side verification). This decoder only reads the contents. Always validate tokens server-side for authentication.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Paste your JWT token',
        description: 'Copy a JWT token from your browser console, authorization header, or local storage and paste it into the input field.',
      },
      {
        step: 2,
        title: 'Click Decode',
        description: 'The tool instantly parses the token and displays the three sections: Header, Payload, and Signature. Check the expiry status indicator.',
      },
      {
        step: 3,
        title: 'Review the claims',
        description: 'Examine the payload to see user information, roles, permissions, expiry time, and any custom claims stored in the token.',
      },
      {
        step: 4,
        title: 'Copy sections as needed',
        description: 'Use the Copy button on any section to copy the JSON to your clipboard for documentation, debugging, or analysis.',
      },
    ],
  },
  {
    slug: 'base64',
    shortName: 'Base64',
    icon: '🔤',
    h1: 'Base64 Encoder & Decoder - Encode and Decode Online Free',
    title: 'Base64 Encoder & Decoder - Encode Decode Text Online Free',
    shortDescription: 'Encode text to Base64 or decode Base64 strings instantly',
    metaDescription:
      'Base64 encoder and decoder online free. Encode text to Base64 or decode Base64 strings. No signup, browser-based, supports file upload.',
    fullDescription:
      'A free online Base64 encoder and decoder that lets you instantly convert between plain text and Base64 encoding. Base64 is a widely-used encoding scheme that converts binary data into a text format using 64 ASCII characters, making it safe for transmission through text-based systems like email, APIs, and HTTP headers.\n\nOur tool supports two operations: Encode (convert text to Base64) and Decode (convert Base64 back to text). Simply choose your mode, paste your content, click the button, and get instant results. The tool handles special characters, Unicode, and multi-line content perfectly, preserving formatting while ensuring accurate encoding/decoding.\n\nBeyond simple text input, the tool also supports file uploads, so you can encode or decode the contents of text files directly. This is especially useful for handling configuration files, API responses, or any text-based content. The tool shows you real-time size comparison so you can see exactly how much the encoding expands your data (Base64 typically increases size by about 33%).\n\nFeatures include bidirectional encoding/decoding, Swap button to quickly convert between modes, file upload support, character count and size indicators, one-click copy to clipboard, and a clear interface that works perfectly on mobile devices. All processing happens in your browser—no data is sent to any server, ensuring complete privacy.\n\nCommon use cases include encoding authentication credentials for API headers, decoding base64-encoded email attachments, handling API responses in Base64 format, encoding binary data for safe transmission, preparing data for OAuth flows, testing and debugging Base64-related code, and converting between text and encoded formats in development workflows.',
    keywords: ['base64 encoder', 'base64 decoder', 'encode base64', 'decode base64', 'base64 online'],
    faqs: [
      {
        question: 'What is Base64 and why is it used?',
        answer: 'Base64 is an encoding scheme that converts any data (binary or text) into a string using 64 safe ASCII characters. It\'s used to safely transmit binary data over text-based systems like email and HTTP. For example, API authentication often encodes credentials as "username:password" → Base64 → HTTP header.',
      },
      {
        question: 'Why does Base64 make data larger?',
        answer: 'Base64 encoding converts 3 bytes of data into 4 Base64 characters, increasing size by approximately 33%. This is the trade-off for having text-safe, transmissible data. Despite the size increase, Base64 remains essential for many applications like data URIs, email attachments, and API communications.',
      },
      {
        question: 'Can I encode/decode binary files with this tool?',
        answer: 'This tool works best with text files. While it can technically encode binary files you upload, the encoded output may be extremely long and difficult to work with. For true binary-to-Base64 conversion, use command-line tools or programming libraries designed for binary data.',
      },
      {
        question: 'How do I use Base64 for authentication?',
        answer: 'Basic HTTP authentication encodes "username:password" as Base64 and sends it in the Authorization header as "Authorization: Basic base64(username:password)". This tool lets you generate the Base64-encoded credential string needed for testing and debugging API calls.',
      },
      {
        question: 'Is Base64 encoding secure?',
        answer: 'No. Base64 is encoding, not encryption. The encoded string is easily decoded. Never use Base64 alone for sensitive data like passwords—it provides no security, only text safety. Always combine with HTTPS/TLS encryption for secure transmission of sensitive information.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Choose your mode',
        description: 'Select "Encode to Base64" to convert text to Base64, or "Decode from Base64" to convert Base64 back to text.',
      },
      {
        step: 2,
        title: 'Paste your content',
        description: 'Enter text in the left panel, or use "Choose File" to upload a text file. The tool reads the file content automatically.',
      },
      {
        step: 3,
        title: 'Click Encode or Decode',
        description: 'The tool instantly converts your content and displays the result in the right panel. Check the size comparison to see the data size change.',
      },
      {
        step: 4,
        title: 'Copy your result',
        description: 'Click the Copy button to copy the output to your clipboard, then paste it wherever you need it—APIs, code, documentation, etc.',
      },
    ],
  },
  {
    slug: 'unix-timestamp',
    shortName: 'Unix Time',
    icon: '⏱',
    h1: 'Unix Timestamp Converter - Convert Epoch Time Online Free',
    title: 'Unix Timestamp Converter - Convert to/from Date Online',
    shortDescription: 'Convert Unix timestamps to human-readable dates and vice versa',
    metaDescription:
      'Unix timestamp converter online free. Convert epoch time to date and time in UTC and IST. Real-time Unix timestamp clock.',
    fullDescription:
      'A free online Unix timestamp converter that helps developers and engineers instantly convert between Unix epoch time and human-readable dates. Unix timestamps (also called epoch time or POSIX time) represent time as a single number—the number of seconds since January 1, 1970, 00:00:00 UTC. It\'s the standard way computers store and transmit dates across systems.\n\nOur converter makes it simple to work with Unix timestamps. Paste any Unix timestamp and instantly see it converted to human-readable format in both UTC and IST (Indian Standard Time, UTC+5:30). Going the other direction, enter any date and time using the date-time picker and get the corresponding Unix timestamp.\n\nThe tool includes a live Unix timestamp clock that updates every second, showing you the current epoch time. This is useful for understanding how Unix time progresses and for getting the current timestamp quickly. Perfect for debugging API responses that use Unix timestamps, understanding server logs, working with authentication tokens that use epoch time for expiry, and converting between time formats in development.\n\nFeatures include bidirectional conversion (Unix timestamp ↔ Date), live timestamp clock, simultaneous display of UTC and IST times, one-click copy buttons for each value, instant validation, and a clean interface that works on all devices. All processing happens in your browser—no data is sent to any server.\n\nCommon use cases include debugging API responses with Unix timestamps, converting log file timestamps, understanding JWT token expiry (exp claim), working with database timestamps, server administration and log analysis, understanding server-side time formats, and international development where timezone conversion matters.',
    keywords: ['unix timestamp', 'unix time converter', 'epoch time', 'timestamp converter', 'unix timestamp converter online'],
    faqs: [
      {
        question: 'What is a Unix timestamp and why do computers use it?',
        answer: 'A Unix timestamp (epoch time) is the number of seconds since January 1, 1970, 00:00:00 UTC. Computers use it because it\'s a single number that represents an exact moment in time universally, eliminating timezone confusion. It\'s easy to calculate time differences, sort events, and transmit across systems.',
      },
      {
        question: 'What\'s the difference between Unix timestamp in seconds vs milliseconds?',
        answer: 'Unix timestamps are typically in seconds (epoch), but JavaScript and many web APIs use milliseconds for higher precision. This tool works with second-based Unix timestamps. To convert milliseconds to seconds, divide by 1000.',
      },
      {
        question: 'How do I interpret a Unix timestamp like 1234567890?',
        answer: 'The timestamp 1234567890 represents Friday, February 13, 2009, 23:31:30 UTC. You can paste any Unix timestamp into this converter to see what date and time it represents. Use the "Copy" button to grab the formatted date for your documentation.',
      },
      {
        question: 'Why do dates show different times in UTC vs IST?',
        answer: 'UTC is Coordinated Universal Time (zone zero), while IST (Indian Standard Time) is UTC+5:30. The same moment in time appears as different clock times in different timezones. Unix timestamps are absolute points in time; the display just changes based on your timezone.',
      },
      {
        question: 'How do I use Unix timestamps with JWT tokens?',
        answer: 'JWT tokens include "exp" (expiration) and "iat" (issued at) claims as Unix timestamps in seconds. This converter helps you decode when a token was issued and when it expires. Use it to debug token expiry issues or understand authentication token lifespans.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'View the current Unix timestamp',
        description: 'See the live Unix timestamp clock at the top that updates every second. This shows you the current epoch time in real-time.',
      },
      {
        step: 2,
        title: 'Enter a Unix timestamp',
        description: 'Paste any Unix timestamp (in seconds) in the left field, or click "Use Now" to convert the current moment.',
      },
      {
        step: 3,
        title: 'See the conversion',
        description: 'The tool instantly displays the date and time in UTC, your local timezone, and IST. Copy any result with one click.',
      },
      {
        step: 4,
        title: 'Or enter a date to get the timestamp',
        description: 'Use the date-time picker on the right to select any date and time, and get the corresponding Unix timestamp.',
      },
    ],
  },
  {
    slug: 'url-encoder',
    shortName: 'URL Encoder',
    icon: '🔗',
    h1: 'URL Encoder & Decoder - Encode Decode URLs Online Free',
    title: 'URL Encoder & Decoder — Encode and Decode URL Strings',
    shortDescription: 'Encode text to URL format or decode URL-encoded strings instantly',
    metaDescription:
      'URL encoder and decoder online free. Encode text to URL-safe format or decode URL-encoded strings. Browser-based, no server upload.',
    fullDescription:
      'A free online URL encoder and decoder tool that helps developers instantly convert between plain text and URL-encoded format. URL encoding (also called percent encoding) converts special characters into a format safe for URLs and web transmission. When you see characters like %20 (space) or %2F (slash) in URLs, that\'s URL encoding.\n\nOur tool makes URL encoding and decoding simple. Choose your mode—encode plain text into URL-safe format or decode URL-encoded strings back to readable text. The tool handles all special characters including spaces, punctuation, Unicode characters, and more, ensuring accurate bidirectional conversion.\n\nURL encoding is essential for query parameters in URLs, form submissions, API requests, and any time you need to safely transmit text through web URLs. For example, if you want to include a space in a URL parameter, it must be encoded as %20. This tool lets you prepare text for URLs, debug encoded query strings, and understand what hidden characters are in encoded URLs.\n\nFeatures include bidirectional encoding/decoding, Swap button to convert between modes, character count comparison, real-time error handling, one-click copy to clipboard, and mobile-friendly interface. The tool preserves special formatting and handles Unicode characters correctly. All processing happens in your browser—no data is sent to any server.\n\nCommon use cases include preparing data for URL query parameters, debugging API requests with encoded parameters, creating SEO-friendly URLs, working with form submissions, understanding encoded URLs in browser history or logs, building query strings for web requests, and URL parameter manipulation in development.',
    keywords: ['url encoder', 'url decoder', 'encode url', 'decode url', 'url encoding'],
    faqs: [
      {
        question: 'What is URL encoding and why is it necessary?',
        answer: 'URL encoding converts special characters into a safe format for URLs and web transmission. Only unreserved characters (A-Z, a-z, 0-9, hyphen, underscore, period, tilde) are safe in URLs. Other characters like spaces become %20. This ensures URLs work correctly across all systems and browsers.',
      },
      {
        question: 'What does %20 mean in a URL?',
        answer: 'The %20 in a URL represents a space character. Spaces aren\'t safe in URLs, so they must be encoded. For example, "hello world" becomes "hello%20world". This tool lets you see what characters are hidden behind percent-encoded strings.',
      },
      {
        question: 'How do I use this for query parameters?',
        answer: 'When adding query parameters to URLs, special characters must be encoded. For example, to search for "C++ programming", encode it to "C%2B%2B%20programming". This tool helps you prepare text for inclusion in URL parameters.',
      },
      {
        question: 'What\'s the difference between URL encoding and HTML encoding?',
        answer: 'URL encoding (%20 for space) is for safe URLs. HTML encoding (&amp; for &) is for safe HTML display. They\'re different encoding schemes for different purposes. This tool focuses on URL encoding for web URLs and query strings.',
      },
      {
        question: 'Can I encode Unicode characters like emoji or international text?',
        answer: 'Yes! This tool handles Unicode characters perfectly. International characters and emoji are converted to their UTF-8 percent-encoded equivalents. For example, "café" becomes "caf%C3%A9". This works for any Unicode text.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Choose your mode',
        description: 'Select "Encode URL" to convert plain text to URL-safe format, or "Decode URL" to convert encoded strings back to text.',
      },
      {
        step: 2,
        title: 'Paste your text',
        description: 'Enter plain text in the left field (for encoding) or URL-encoded text (for decoding). The conversion happens instantly.',
      },
      {
        step: 3,
        title: 'Review the output',
        description: 'See the encoded or decoded result in the right field. The tool shows you the character count and size comparison.',
      },
      {
        step: 4,
        title: 'Copy or swap',
        description: 'Click Copy to copy the result to your clipboard. Use Swap to reverse modes and convert back.',
      },
    ],
  },
  {
    slug: 'uuid-generator',
    shortName: 'UUID Gen',
    icon: '🆔',
    h1: 'UUID Generator - Generate UUID v4 and v1 Online Free',
    title: 'UUID Generator - Generate Unique Identifiers Online',
    shortDescription: 'Generate UUID v4 and v1 identifiers with batch support',
    metaDescription:
      'Free UUID generator online. Generate UUID v4 (random) and UUID v1 (timestamp-based) identifiers. Batch generation, copy all, no signup needed.',
    fullDescription:
      'A free online UUID generator that creates unique identifiers for your applications and databases. UUIDs (Universally Unique Identifiers) are 128-bit numbers represented as 36-character strings that are virtually guaranteed to be globally unique. They\'re essential in modern software development for database primary keys, session tokens, request IDs, and anywhere you need a unique identifier.\n\nOur tool supports two UUID versions: UUID v4 (random) and UUID v1 (timestamp-based). UUID v4 is the most common, generating completely random identifiers perfect for most use cases. UUID v1 is timestamp-based, making it useful when you need sequence tracking or ordering by generation time.\n\nThe tool supports batch generation—generate 1 to 100 UUIDs at once with a single click. Each UUID is independently generated with the selected version. Copy individual UUIDs or copy all generated identifiers at once for bulk import into your application or database.\n\nFeatures include support for both UUID v4 and v1 standards, batch generation (1-100 at a time), one-click copy for individual UUIDs, copy-all functionality, clean list display with hover effects, and full compatibility with standard UUID formats. All generation happens in your browser with no server-side processing.\n\nCommon use cases include generating database primary keys, creating session tokens for authentication, generating request IDs for API logging, creating unique identifiers for distributed systems, populating test databases with realistic data, generating temporary resource identifiers, and creating unique user or transaction IDs.',
    keywords: ['uuid generator', 'uuid v4', 'uuid v1', 'generate uuid', 'uuid online'],
    faqs: [
      {
        question: 'What is a UUID and why do I need it?',
        answer: 'A UUID (Universally Unique Identifier) is a 128-bit number that\'s virtually guaranteed to be globally unique. Instead of relying on databases to auto-increment IDs, UUIDs let you generate unique IDs anywhere in your application. They\'re essential for distributed systems, databases, APIs, and any system that needs collision-free unique identifiers.',
      },
      {
        question: 'What\'s the difference between UUID v4 and UUID v1?',
        answer: 'UUID v4 is random-based, using completely random data for uniqueness. UUID v1 is timestamp-based, using your computer\'s MAC address and current time. UUID v4 is more common and secure. UUID v1 is useful when you want UUIDs to be sortable by creation time.',
      },
      {
        question: 'Are UUIDs truly unique or just probably unique?',
        answer: 'UUIDs are "virtually guaranteed" unique. With 2^128 possible values, the probability of collision is astronomically low. For practical purposes in any single application, you can treat them as guaranteed unique. Across billions of UUIDs, collisions remain statistically impossible.',
      },
      {
        question: 'Can I use UUIDs as database primary keys?',
        answer: 'Yes! UUIDs are commonly used as primary keys in databases, especially in distributed systems. They avoid auto-increment ID coordination issues. However, they\'re larger than integers (36 chars vs 11 chars), so they use more storage. For most applications, the uniqueness guarantee is worth the trade-off.',
      },
      {
        question: 'How do I import generated UUIDs into my application?',
        answer: 'Copy the UUIDs using the copy button and paste them where needed. For batch imports, use "Copy All" to get all UUIDs separated by newlines, then paste into your database or application code. Many databases support direct UUID import from tab or newline-delimited lists.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Choose UUID version',
        description: 'Select UUID v4 (random, most common) or UUID v1 (timestamp-based, sortable by creation time).',
      },
      {
        step: 2,
        title: 'Set count',
        description: 'Enter how many UUIDs to generate (1-100). You can generate single UUIDs or batch up to 100 at once.',
      },
      {
        step: 3,
        title: 'Click Generate',
        description: 'Instantly generate your UUIDs. The tool creates new identifiers without contacting any server.',
      },
      {
        step: 4,
        title: 'Copy and use',
        description: 'Copy individual UUIDs or use "Copy All" for batch imports. Paste them into your database, code, or configuration files.',
      },
    ],
  },
  {
    slug: 'html-encoder',
    shortName: 'HTML Encoder',
    icon: '🏷',
    h1: 'HTML Entity Encoder & Decoder - Encode Decode HTML Online',
    title: 'HTML Entity Encoder & Decoder - HTML Encoding Tool',
    shortDescription: 'Encode text to HTML entities or decode HTML entity strings',
    metaDescription:
      'HTML entity encoder and decoder online free. Encode text to HTML entities or decode HTML-encoded strings instantly. No signup needed.',
    fullDescription:
      'A free online HTML entity encoder and decoder that converts between plain text and HTML entity format. HTML entities are special codes that represent characters in HTML, used when you can\'t directly type a character or when you need to escape special HTML characters. For example, the less-than symbol < becomes &lt; and the ampersand & becomes &amp;.\n\nOur tool makes HTML encoding and decoding simple. Enter plain text and instantly encode it to HTML entities, or paste HTML-encoded text and decode it back to readable format. The tool handles all standard HTML entities including special characters, mathematical symbols, Greek letters, currency symbols, and Unicode characters.\n\nHTML encoding is essential for displaying user-generated content safely on web pages, preventing XSS (cross-site scripting) attacks, displaying code examples in web pages, and creating valid HTML when you need to escape special characters. For example, if you display a user comment containing < or > characters on your website, you must encode them to prevent HTML injection.\n\nFeatures include encoding/decoding of all common HTML entities, support for numeric entities (decimal and hexadecimal), Unicode character support, Swap button to toggle between modes, character count comparison, real-time processing, and mobile-friendly interface. All processing happens in your browser—no data is sent to any server.\n\nCommon use cases include sanitizing user input before displaying on web pages, escaping code examples for documentation, converting special characters for email newsletters, preparing content for CMS systems, encoding mathematical or scientific notation, handling international characters and symbols, and preventing HTML injection attacks.',
    keywords: ['html encoder', 'html decoder', 'html entity', 'encode html', 'decode html'],
    faqs: [
      {
        question: 'What are HTML entities and why do I need them?',
        answer: 'HTML entities are codes that represent characters in HTML. Some characters (like <, >, &, ") are special in HTML and must be encoded to display correctly. For example, < becomes &lt;. Using entities prevents browsers from misinterpreting your content as HTML tags and improves security.',
      },
      {
        question: 'Why is HTML encoding important for security?',
        answer: 'If you display unencoded user input on your website (like comments or form data), malicious users can inject HTML/JavaScript. HTML encoding converts < to &lt; and & to &amp;, so the browser displays the text literally instead of executing it. This prevents XSS (Cross-Site Scripting) attacks.',
      },
      {
        question: 'What\'s the difference between & and &amp;?',
        answer: '& is the literal ampersand character. &amp; is the HTML entity that represents an ampersand. In HTML, you must write &amp; because a bare & can confuse the parser. This tool automatically converts between them.',
      },
      {
        question: 'Can I encode special symbols like © or €?',
        answer: 'Yes! This tool encodes all special characters including currency symbols (€, £, ¥), copyright (©), trademark (™), mathematical symbols (±, ×), and more. Both named entities (&copy;) and numeric entities (&#169;) are supported.',
      },
      {
        question: 'Do I need to encode everything in HTML?',
        answer: 'No, only special characters. Regular letters, numbers, and most punctuation are safe. You only need to encode: < > & " \' and special symbols. This tool lets you safely encode content while keeping readable text as-is.',
      },
    ],
    howToSteps: [
      {
        step: 1,
        title: 'Choose your mode',
        description: 'Select "Encode HTML" to convert text to HTML entities, or "Decode HTML" to convert entities back to text.',
      },
      {
        step: 2,
        title: 'Paste your content',
        description: 'Enter plain text in the left field (for encoding) or HTML-encoded text (for decoding). Processing is instant.',
      },
      {
        step: 3,
        title: 'Review the result',
        description: 'See the encoded or decoded output in the right field. Special characters are converted to their entity equivalents.',
      },
      {
        step: 4,
        title: 'Copy and use',
        description: 'Click Copy to copy the result to your clipboard, then paste into your HTML, CMS, or documentation.',
      },
    ],
  },
];

export const RELATED_TOOLS: Record<string, string[]> = {
  'json-formatter': ['csv-formatter', 'jwt-decoder', 'base64'],
  'csv-formatter': ['json-formatter', 'base64', 'url-encoder'],
  'cron-builder': ['json-formatter', 'password-generator', 'unix-timestamp'],
  'gst-calculator': ['invoice-maker', 'csv-formatter', 'unix-timestamp'],
  'color-palette': ['image-compressor', 'csv-formatter', 'json-formatter'],
  'invoice-maker': ['gst-calculator', 'image-compressor', 'csv-formatter'],
  'password-generator': ['uuid-generator', 'jwt-decoder', 'base64'],
  'image-compressor': ['invoice-maker', 'color-palette', 'csv-formatter'],
  'jwt-decoder': ['base64', 'url-encoder', 'html-encoder'],
  'base64': ['jwt-decoder', 'url-encoder', 'html-encoder'],
  'unix-timestamp': ['cron-builder', 'jwt-decoder', 'json-formatter'],
  'url-encoder': ['base64', 'html-encoder', 'json-formatter'],
  'uuid-generator': ['password-generator', 'base64', 'json-formatter'],
  'html-encoder': ['jwt-decoder', 'url-encoder', 'json-formatter'],
};

export const getToolBySlug = (slug: string): Tool | undefined =>
  TOOLS.find((tool) => tool.slug === slug);
