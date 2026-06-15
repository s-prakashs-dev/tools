import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'Unix Timestamp Converter Online Free';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'Unix Timestamp Converter',
    'Free • Browser-based • No Signup'
  );
}
