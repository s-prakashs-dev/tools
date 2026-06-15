import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'JWT Decoder & Validator Online Free';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'JWT Decoder & Validator',
    'Free • Browser-based • No Signup'
  );
}
