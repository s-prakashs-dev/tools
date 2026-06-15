import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'Password Generator Online Free';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'Password Generator & UUID Generator',
    'Free • Browser-based • No Signup'
  );
}
