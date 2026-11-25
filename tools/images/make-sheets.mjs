import sharp from 'sharp';
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const [,, root, out] = process.argv;
const folders = ['PRIMAVERA', 'ESTATE', 'AUTUNNO', 'INVERNO', 'CASA'];
const cell = 240, rows = 5, cols = 6, label = 22;
const index = {};
for (const folder of folders) {
  const files = readdirSync(join(root, folder)).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  for (let start = 0, sheet = 1; start < files.length; start += rows * cols, sheet++) {
    const batch = files.slice(start, start + rows * cols);
    const composites = [];
    for (const [i, file] of batch.entries()) {
      const id = `${folder[0]}${start + i + 1}`;
      index[id] = `${folder}/${file}`;
      const thumb = await sharp(join(root, folder, file)).rotate().resize(cell, cell, { fit: 'cover' }).toBuffer();
      const x = (i % cols) * cell, y = Math.floor(i / cols) * (cell + label);
      composites.push({ input: thumb, left: x, top: y + label });
      composites.push({ input: Buffer.from(`<svg width="${cell}" height="${label}"><rect width="100%" height="100%" fill="#000"/><text x="4" y="17" font-size="16" font-family="Arial" fill="#fff">${id}</text></svg>`), left: x, top: y });
    }
    const height = Math.ceil(batch.length / cols) * (cell + label);
    await sharp({ create: { width: cols * cell, height, channels: 3, background: '#fff' } }).composite(composites).jpeg({ quality: 70 }).toFile(join(out, `${folder}-${sheet}.jpg`));
  }
}
writeFileSync(join(out, 'index.json'), JSON.stringify(index, null, 1));
console.log(Object.keys(index).length, 'photos');
