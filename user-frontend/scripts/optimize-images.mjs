import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(process.cwd());
const srcAssetsDir = path.join(projectRoot, 'src', 'assets');
const outDir = path.join(projectRoot, 'public', 'images');

const files = [
  'hero-cleaning.jpg',
  'house-cleaning.jpg',
  'office-cleaning.jpg',
  'school-cleaning.jpg',
];

const widths = [600, 900, 1200];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function optimize() {
  await ensureDir(outDir);

  for (const file of files) {
    const inputPath = path.join(srcAssetsDir, file);
    const base = path.parse(file).name;

    if (!fs.existsSync(inputPath)) {
      console.warn(`[optimize-images] Skipping missing file: ${inputPath}`);
      continue;
    }

    const buf = await fs.promises.readFile(inputPath);

    for (const w of widths) {
      const webpOut = path.join(outDir, `${base}-${w}.webp`);
      const jpgOut = path.join(outDir, `${base}-${w}.jpg`);

      // Generate WebP (quality ~70) targeting <200KB for 1200w hero where possible
      await sharp(buf)
        .resize({ width: w })
        .webp({ quality: 70 })
        .toFile(webpOut);

      // Generate compressed JPG fallback (quality ~75)
      await sharp(buf)
        .resize({ width: w })
        .jpeg({ quality: 75 })
        .toFile(jpgOut);

      console.log(`[optimize-images] Wrote ${path.basename(webpOut)} and ${path.basename(jpgOut)}`);
    }
  }

  console.log('\n[optimize-images] Completed image optimization.');
}

optimize().catch((err) => {
  console.error('[optimize-images] Failed:', err);
  process.exit(1);
});