import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'HTML Entity Encoder & Decoder Online Free';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'HTML Entity Encoder & Decoder',
    'Free • Browser-based • No Signup'
  );
}
