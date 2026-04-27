'use client';
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import Head from 'next/head';

interface ProcessedImage {
  id: string;
  original: {
    file: File;
    size: number;
    width: number;
    height: number;
    preview: string;
  };
  compressed: {
    size: number;
    width: number;
    height: number;
    preview: string;
    blob?: Blob;
  };
}

export default function ImageCompressorTool() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [quality, setQuality] = useState(75);
  const [compressWidth, setCompressWidth] = useState(100);
  const [compressHeight, setCompressHeight] = useState(100);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [resizeMode, setResizeMode] = useState<'percentage' | 'dimensions'>('percentage');
  const [outputFormat, setOutputFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    const newImages: ProcessedImage[] = [];

    for (let i = 0; i < Math.min(files.length, 5 - images.length); i++) {
      const file = files[i];
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Please upload JPG, PNG, or WebP images');
        continue;
      }

      const img = new Image();
      const preview = URL.createObjectURL(file);

      await new Promise((resolve) => {
        img.onload = () => {
          const processedImage: ProcessedImage = {
            id: `${Date.now()}${i}`,
            original: {
              file,
              size: file.size,
              width: img.width,
              height: img.height,
              preview,
            },
            compressed: {
              size: 0,
              width: img.width,
              height: img.height,
              preview: '',
            },
          };

          compressImage(processedImage, preview, img.width, img.height).then(() => {
            newImages.push(processedImage);
            resolve(null);
          });
        };
        img.src = preview;
      });
    }

    setImages([...images, ...newImages]);
  };

  const compressImage = async (
    processedImage: ProcessedImage,
    preview: string,
    originalWidth: number,
    originalHeight: number
  ): Promise<void> =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');

        let width = originalWidth;
        let height = originalHeight;

        if (resizeMode === 'percentage') {
          width = Math.round((originalWidth * compressWidth) / 100);
          height = Math.round((originalHeight * compressHeight) / 100);
        } else {
          width = compressWidth;
          height = maintainAspect
            ? Math.round((compressWidth * originalHeight) / originalWidth)
            : compressHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                processedImage.compressed = {
                  size: blob.size,
                  width,
                  height,
                  preview: URL.createObjectURL(blob),
                  blob,
                };
              }
              resolve();
            },
            `image/${outputFormat}`,
            quality / 100
          );
        } else {
          resolve();
        }
      };
      img.src = preview;
    });

  const reprocessImages = async () => {
    const updated = await Promise.all(
      images.map(
        (img) =>
          new Promise<ProcessedImage>((resolve) => {
            compressImage(img, img.original.preview, img.original.width, img.original.height).then(
              () => resolve(img)
            );
          })
      )
    );
    setImages(updated);
  };

  const downloadImage = (processedImage: ProcessedImage) => {
    if (!processedImage.compressed.blob) return;
    const url = URL.createObjectURL(processedImage.compressed.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed-${processedImage.id}.${outputFormat}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearImages = () => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.original.preview);
      URL.revokeObjectURL(img.compressed.preview);
    });
    setImages([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const calculationSaved = images.reduce(
    (sum, img) => sum + Math.max(0, img.original.size - img.compressed.size),
    0
  );

  const percentageSaved =
    images.length > 0 && images.some((img) => img.compressed.size > 0)
      ? Math.round(
          (calculationSaved / images.reduce((sum, img) => sum + img.original.size, 0)) * 100
        )
      : 0;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Image Compressor Online Free',
    description: 'Free online image compressor for JPG, PNG and WebP.',
    url: 'https://toolyfy.in/image-compressor',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <div className="space-y-8">
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center transition-colors hover:border-blue-400 hover:bg-blue-50">
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            id="imageInput"
          />
          <label htmlFor="imageInput" className="block cursor-pointer">
            <svg
              className="mx-auto mb-3 h-12 w-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-7"
              />
            </svg>
            <p className="text-base font-medium text-gray-700">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">JPG, PNG or WebP, up to 5 images</p>
          </label>
        </div>

        {images.length > 0 && (
          <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Output Format</label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as 'jpeg' | 'png' | 'webp')}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'percentage', label: 'Resize by %' },
                  { value: 'dimensions', label: 'Resize to dimensions' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setResizeMode(value as 'percentage' | 'dimensions')}
                    className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                      resizeMode === value
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {resizeMode === 'percentage' ? (
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={compressWidth}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 100;
                    setCompressWidth(val);
                    setCompressHeight(val);
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Percentage"
                />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={compressWidth}
                    onChange={(e) => setCompressWidth(parseInt(e.target.value) || 100)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Width"
                  />
                  <input
                    type="number"
                    value={compressHeight}
                    onChange={(e) => setCompressHeight(parseInt(e.target.value) || 100)}
                    disabled={maintainAspect}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Height"
                  />
                </div>
              )}

              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={maintainAspect}
                  onChange={(e) => setMaintainAspect(e.target.checked)}
                  className="mr-2 accent-blue-600"
                />
                Maintain aspect ratio
              </label>
            </div>

            <button
              onClick={reprocessImages}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Reprocess Images
            </button>
          </div>
        )}

        {images.length > 0 && percentageSaved > 0 && (
          <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Saved {formatFileSize(calculationSaved)} ({percentageSaved}%)
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {images.map((processedImage) => (
            <div key={processedImage.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-700">Original</p>
                  <img
                    src={processedImage.original.preview}
                    alt="Original"
                    className="w-full rounded-lg border border-gray-200 bg-white object-contain"
                  />
                  <div className="mt-2 space-y-1 text-sm text-gray-700">
                    <p>Size: {formatFileSize(processedImage.original.size)}</p>
                    <p>
                      Dimensions: {processedImage.original.width} x {processedImage.original.height}px
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-700">Compressed</p>
                  {processedImage.compressed.preview && (
                    <>
                      <img
                        src={processedImage.compressed.preview}
                        alt="Compressed"
                        className="w-full rounded-lg border border-gray-200 bg-white object-contain"
                      />
                      <div className="mt-2 space-y-1 text-sm text-gray-700">
                        <p>Size: {formatFileSize(processedImage.compressed.size)}</p>
                        <p>
                          Dimensions: {processedImage.compressed.width} x {processedImage.compressed.height}px
                        </p>
                        <p className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          Saved{' '}
                          {formatFileSize(
                            Math.max(0, processedImage.original.size - processedImage.compressed.size)
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => downloadImage(processedImage)}
                        className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                      >
                        Download
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {images.length > 0 && (
          <button
            onClick={clearImages}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
          >
            Clear All
          </button>
        )}
      </div>
      <section className="prose max-w-none pt-10 text-gray-700">
        <h2 className="text-xl font-semibold text-gray-900">How to use the image compressor</h2>
        <p>
          This image compressor is created for first-time users who want to shrink picture files without losing visual quality. Upload a JPG, PNG, or WebP image and choose how much compression you need. The image compressor will then reduce the file size while keeping the image looking good.
        </p>
        <p>
          If you are new to an image compressor, focus on the preview and the size savings the tool shows. This makes it easy to understand how much space you can save before you download the final image. The image compressor is designed to keep the workflow simple and fast.
        </p>
        <p>
          You can use this image compressor whenever you need smaller images for web pages, email attachments, or sharing. It is a convenient online tool for anyone who wants a quick and user-friendly way to reduce image size.
        </p>
      </section>
    </>
  );
}