'use client';

import { useState } from 'react';
import Head from 'next/head';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug } from '@/lib/tools';

const tool = getToolBySlug('color-palette')!;

interface Color {
  hex: string;
  rgb: string;
  hsl: string;
}

export default function ColorPaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState('#3498db');
  const [harmonyType, setHarmonyType] = useState<
    'complementary' | 'triadic' | 'analogous' | 'splitComplementary'
  >('complementary');

  const hexToHSL = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [0, 0, 0];

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return [h * 360, s * 100, l * 100];
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    h = ((h % 360) + 360) % 360;
    s = s / 100;
    l = l / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 60) {
      r = c;
      g = x;
    } else if (h < 120) {
      r = x;
      g = c;
    } else if (h < 180) {
      g = c;
      b = x;
    } else if (h < 240) {
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }

    const toHex = (n: number) => {
      const hex = Math.round((m + n) * 255).toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const hexToRGB = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return 'rgb(0, 0, 0)';
    return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
  };

  const hslToString = (h: number, s: number, l: number): string =>
    `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;

  const colorToString = (hex: string): Color => {
    const [h, s, l] = hexToHSL(hex);
    return {
      hex: hex.toUpperCase(),
      rgb: hexToRGB(hex),
      hsl: hslToString(h, s, l),
    };
  };

  const generatePalette = (): Color[] => {
    const [h, s, l] = hexToHSL(baseColor);
    const colors: string[] = [baseColor];

    if (harmonyType === 'complementary') {
      colors.push(hslToHex((h + 180) % 360, s, l));
      colors.push(hslToHex((h + 90) % 360, s * 0.8, l * 1.1));
      colors.push(hslToHex((h + 270) % 360, s * 0.8, l * 1.1));
      colors.push(hslToHex(h, s * 0.5, l * 0.8));
    } else if (harmonyType === 'triadic') {
      colors.push(hslToHex((h + 120) % 360, s, l));
      colors.push(hslToHex((h + 240) % 360, s, l));
      colors.push(hslToHex((h + 60) % 360, s * 0.8, l * 1.1));
      colors.push(hslToHex((h + 180) % 360, s * 0.8, l * 1.1));
    } else if (harmonyType === 'analogous') {
      colors.push(hslToHex((h + 30) % 360, s, l));
      colors.push(hslToHex((h - 30 + 360) % 360, s, l));
      colors.push(hslToHex((h + 60) % 360, s * 0.8, l * 1.1));
      colors.push(hslToHex((h - 60 + 360) % 360, s * 0.8, l * 1.1));
    } else if (harmonyType === 'splitComplementary') {
      colors.push(hslToHex((h + 150) % 360, s, l));
      colors.push(hslToHex((h + 210) % 360, s, l));
      colors.push(hslToHex((h + 75) % 360, s * 0.8, l * 1.1));
      colors.push(hslToHex((h - 75 + 360) % 360, s * 0.8, l * 1.1));
    }

    return colors.slice(0, 5).map(colorToString);
  };

  const palette = generatePalette();

  const randomizeColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
    setBaseColor(randomColor);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    alert(`Copied ${hex}!`);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.h1,
    description: tool.metaDescription,
    url: 'https://toolkit.example.com/color-palette',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://toolkit.example.com/color-palette" />
        <meta name="keywords" content={tool.keywords.join(', ')} />
        <meta property="og:title" content={tool.title} />
        <meta property="og:description" content={tool.metaDescription} />
        <meta property="og:url" content="https://toolkit.example.com/color-palette" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <ToolLayout title={tool.h1} description={tool.fullDescription}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Base Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="h-12 w-14 rounded-lg border border-gray-300 bg-white"
                />
                <input
                  type="text"
                  value={baseColor.toUpperCase()}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Harmony Type</label>
              <select
                value={harmonyType}
                onChange={(e) =>
                  setHarmonyType(
                    e.target.value as
                      | 'complementary'
                      | 'triadic'
                      | 'analogous'
                      | 'splitComplementary'
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="complementary">Complementary</option>
                <option value="triadic">Triadic</option>
                <option value="analogous">Analogous</option>
                <option value="splitComplementary">Split-Complementary</option>
              </select>
            </div>
          </div>

          <button
            onClick={randomizeColor}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            Randomize Color
          </button>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {palette.map((color, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => copyColor(color.hex)}
                className="overflow-hidden rounded-xl border border-gray-200 text-left transition-all hover:border-blue-300 hover:shadow-sm"
                title="Click to copy HEX"
              >
                <div className="h-24 w-full" style={{ backgroundColor: color.hex }} />
                <div className="space-y-1 bg-white px-3 py-2">
                  <p className="font-mono text-sm text-gray-900">{color.hex}</p>
                  <p className="break-all font-mono text-xs text-gray-500">{color.rgb}</p>
                  <p className="break-all font-mono text-xs text-gray-500">{color.hsl}</p>
                  <p className="text-xs text-green-600">Click to copy</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
