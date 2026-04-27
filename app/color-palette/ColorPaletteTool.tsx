'use client';

import { useState } from 'react';

export default function ColorPaletteTool() {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [palette, setPalette] = useState<string[]>([]);
  const [harmony, setHarmony] = useState<'complementary' | 'triadic' | 'analogous'>('complementary');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const generateComplementary = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [hex];
    const { r, g, b } = rgb;
    const comp = rgbToHex(255 - r, 255 - g, 255 - b);
    return [hex, comp];
  };

  const generateTriadic = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [hex];
    const { r, g, b } = rgb;
    const tri1 = rgbToHex((r + 120) % 256, (g + 120) % 256, (b + 120) % 256);
    const tri2 = rgbToHex((r + 240) % 256, (g + 240) % 256, (b + 240) % 256);
    return [hex, tri1, tri2];
  };

  const generateAnalogous = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [hex];
    const { r, g, b } = rgb;
    const ana1 = rgbToHex((r + 30) % 256, (g + 30) % 256, (b + 30) % 256);
    const ana2 = rgbToHex((r - 30 + 256) % 256, (g - 30 + 256) % 256, (b - 30 + 256) % 256);
    return [ana2, hex, ana1];
  };

  const generatePalette = () => {
    let newPalette: string[];
    switch (harmony) {
      case 'complementary':
        newPalette = generateComplementary(baseColor);
        break;
      case 'triadic':
        newPalette = generateTriadic(baseColor);
        break;
      case 'analogous':
        newPalette = generateAnalogous(baseColor);
        break;
      default:
        newPalette = [baseColor];
    }
    setPalette(newPalette);
  };

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      alert(`${color} copied to clipboard!`);
    } catch (e) {
      alert('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <input
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className="w-20 h-20 rounded-xl border-4 border-gray-200 cursor-pointer"
        />
        <p className="mt-2 text-sm text-gray-600">Pick a base color</p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setHarmony('complementary')}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            harmony === 'complementary'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Complementary
        </button>
        <button
          onClick={() => setHarmony('triadic')}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            harmony === 'triadic'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Triadic
        </button>
        <button
          onClick={() => setHarmony('analogous')}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            harmony === 'analogous'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Analogous
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={generatePalette}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 text-sm font-medium transition-colors"
        >
          Generate Palette
        </button>
      </div>

      {palette.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {palette.map((color, index) => (
            <div key={index} className="text-center">
              <div
                className="w-full h-20 rounded-xl cursor-pointer relative group"
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
                  <span className="text-white font-medium opacity-0 group-hover:opacity-100">Copy</span>
                </div>
              </div>
              <p className="mt-2 text-sm font-mono text-gray-900">{color.toUpperCase()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}