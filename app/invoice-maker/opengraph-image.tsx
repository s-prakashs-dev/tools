import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'Free Invoice Maker Online';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'Free Invoice Maker',
    'Create GST Invoice PDF • Free • No Signup'
  );
}
