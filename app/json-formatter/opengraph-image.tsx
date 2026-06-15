import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'JSON Formatter & Validator Online Free';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'JSON Formatter & Validator',
    'Free • Browser-based • No Signup'
  );
}
