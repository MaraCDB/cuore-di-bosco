import sharp from 'sharp';
const [,, out, ...files] = process.argv;
const cell = 300, cols = 4, rows = Math.ceil(files.length / cols);
const tiles = await Promise.all(files.map(async (f, i) => ({
  input: await sharp(f).rotate().resize(cell, cell, { fit: 'contain', background: '#fff' }).toBuffer(),
  left: (i % cols) * cell, top: Math.floor(i / cols) * cell })));
await sharp({ create: { width: cols * cell, height: rows * cell, channels: 3, background: '#fff' } }).composite(tiles).jpeg({ quality: 70 }).toFile(out);
