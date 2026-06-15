import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'Toolyfy — Free Online Tools for Developers & Professionals';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'Free Online Tools for Developers & Professionals',
    '14+ free tools • Browser-based • No signup'
  );
}
