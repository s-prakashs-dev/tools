import { generateToolOGImage, ogSize } from '@/lib/og-image';

export const alt = 'Cron Expression Builder & Generator Online Free';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return generateToolOGImage(
    'Cron Expression Builder',
    'Free • Browser-based • No Signup'
  );
}
