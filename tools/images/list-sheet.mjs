import sharp from 'sharp';
import { join } from 'node:path';
const [,, root, out, ...files] = process.argv;
const cell = 420, cols = 4, label = 24;
const composites = [];
for (const [i, file] of files.entries()) {
  const thumb = await sharp(join(root, file)).rotate().resize(cell, cell, { fit: 'contain', background: '#fff' }).toBuffer();
  const x = (i % cols) * cell, y = Math.floor(i / cols) * (cell + label);
  composites.push({ input: thumb, left: x, top: y + label });
  composites.push({ input: Buffer.from(`<svg width="${cell}" height="${label}"><rect width="100%" height="100%" fill="#000"/><text x="4" y="18" font-size="17" font-family="Arial" fill="#fff">${i + 1}</text></svg>`), left: x, top: y });
}
const height = Math.ceil(files.length / cols) * (cell + label);
await sharp({ create: { width: cols * cell, height, channels: 3, background: '#fff' } }).composite(composites).jpeg({ quality: 75 }).toFile(out);
console.log(files.length, 'photos ->', out);
