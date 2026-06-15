export interface SchemaProps {
  toolName: string;
  toolSlug: string;
  description: string;
  faqs: Array<{ question: string; answer: string }>;
}

export default function ToolSchema({ toolName, toolSlug, description, faqs }: SchemaProps) {
  // FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // WebApplication schema
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolName,
    url: `https://toolyfy.in/${toolSlug}`,
    description: description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    provider: {
      '@type': 'Organization',
      name: 'Toolyfy',
      url: 'https://toolyfy.in',
    },
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://toolyfy.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: toolName,
        item: `https://toolyfy.in/${toolSlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
