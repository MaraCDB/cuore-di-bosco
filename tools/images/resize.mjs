import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const outDir = 'public/images/home';
fs.mkdirSync(outDir, { recursive: true });
const jobs = [
  ['public/images/cuore-casa.webp', 'casa', [900, 1600]],
  ['public/images/lampone/1.webp', 'lampone-camera', [900, 1600]],
  ['public/images/lampone/2.webp', 'lampone-divano', [900, 1280]],
  ['public/images/lampone/4.webp', 'lampone-balcone', [700, 1200]],
  ['public/images/lampone/5.webp', 'lampone-finestra', [700, 1200]],
  ['public/images/mirtillo/1.webp', 'mirtillo-camera', [900, 1280]],
  ['public/images/mirtillo/2.webp', 'mirtillo-armadio', [700, 960]],
  ['public/images/mirtillo/4.webp', 'porta-libri', [700, 960]],
  ['assets/images/colazioni.webp', 'colazione', [900, 1280]],
  ['assets/images/bosco.webp', 'bosco', [900, 1920]],
  ['assets/images/brentonico-large.webp', 'altopiano', [1000, 2000]],
];
for (const [src, name, widths] of jobs) {
  for (const width of widths) {
    const out = path.join(outDir, `${name}-${width}.webp`);
    const info = await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out);
    console.log(out, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
  }
}
