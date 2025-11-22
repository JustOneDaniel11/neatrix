export type SupportedImageType = 'image/jpeg' | 'image/png' | 'image/webp';

export interface CompressOptions {
  maxWidth?: number; // px
  maxHeight?: number; // px
  quality?: number; // 0-1
  outputType?: SupportedImageType;
}

export const allowedTypes: SupportedImageType[] = ['image/jpeg', 'image/png', 'image/webp'];

export function validateImage(file: File, maxSizeMB = 10): { valid: boolean; message?: string } {
  if (!allowedTypes.includes(file.type as SupportedImageType)) {
    return { valid: false, message: 'Please upload JPG, PNG, or WEBP images.' };
  }
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > maxSizeMB) {
    return { valid: false, message: `Image too large. Max ${maxSizeMB}MB.` };
  }
  return { valid: true };
}

export async function compressImage(file: File, opts: CompressOptions = {}): Promise<File> {
  const options: CompressOptions = {
    maxWidth: 1024,
    maxHeight: 1024,
    quality: 0.8,
    outputType: (file.type as SupportedImageType) || 'image/jpeg',
    ...opts
  };

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  // Compute target dimensions while preserving aspect ratio
  const scale = Math.min(
    (options.maxWidth || width) / width,
    (options.maxHeight || height) / height,
    1 // never upscale
  );
  const targetWidth = Math.floor(width * scale);
  const targetHeight = Math.floor(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');
  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob(
      (b) => resolve(b as Blob),
      options.outputType,
      options.quality
    )
  );

  return new File([blob], file.name.replace(/\.[^.]+$/, '') + getExt(options.outputType!), {
    type: options.outputType,
    lastModified: Date.now()
  });
}

function getExt(type: SupportedImageType): string {
  switch (type) {
    case 'image/jpeg':
      return '.jpg';
    case 'image/png':
      return '.png';
    case 'image/webp':
      return '.webp';
  }
}