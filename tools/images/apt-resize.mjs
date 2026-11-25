import sharp from 'sharp';
const [,, src, name, ...widths] = process.argv;
for (const width of widths.map(Number)) {
  const out = `public/images/home/${name}-${width}.webp`;
  const info = await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out);
  console.log(out, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
}
