import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'Color Palette Generator Online Free';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'Color Palette Generator',
    'Free • Browser-based • No Signup'
  );
}
