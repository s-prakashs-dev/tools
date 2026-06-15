import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'GST Calculator India Free Online';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'GST Calculator India',
    'Free • Browser-based • No Signup'
  );
}
