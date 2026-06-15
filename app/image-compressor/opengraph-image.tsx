import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'Image Compressor Online Free';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'Image Compressor & Resizer',
    'Free • Browser-based • No Signup'
  );
}
