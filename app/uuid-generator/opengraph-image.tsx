import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'UUID Generator Online Free';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'UUID Generator',
    'Free • Browser-based • No Signup'
  );
}
