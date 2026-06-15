import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'CSV Formatter & Viewer Online Free';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'CSV Formatter & Viewer',
    'Free • Browser-based • No Signup'
  );
}
