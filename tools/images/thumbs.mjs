import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const [,, outDir, ...files] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
for (const file of files) {
  const meta = await sharp(file).metadata();
  const name = file.replace(/[/:]/g, '_').replace(/^_+/, '') + '.jpg';
  await sharp(file).rotate().resize({ width: 480 }).jpeg({ quality: 60 }).toFile(path.join(outDir, name));
  console.log(meta.width + 'x' + meta.height, meta.orientation ?? '', file);
}
