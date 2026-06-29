interface QrVersion {
  version: number;
  dataCodewords: number;
  errorCodewords: number;
  blocks: number;
}

const versions: QrVersion[] = [
  { version: 1, dataCodewords: 19, errorCodewords: 7, blocks: 1 },
  { version: 2, dataCodewords: 34, errorCodewords: 10, blocks: 1 },
  { version: 3, dataCodewords: 55, errorCodewords: 15, blocks: 1 },
  { version: 4, dataCodewords: 80, errorCodewords: 20, blocks: 1 },
  { version: 5, dataCodewords: 108, errorCodewords: 26, blocks: 1 },
  { version: 6, dataCodewords: 136, errorCodewords: 18, blocks: 2 },
];

function multiply(left: number, right: number): number {
  let result = 0;
  for (let index = 0; index < 8; index += 1) {
    if ((right & 1) !== 0) result ^= left;
    const carry = left & 0x80;
    left = (left << 1) & 0xff;
    if (carry) left ^= 0x1d;
    right >>>= 1;
  }
  return result;
}

function generatorPolynomial(degree: number): number[] {
  let result = [1];
  let root = 1;
  for (let index = 0; index < degree; index += 1) {
    const next = new Array(result.length + 1).fill(0) as number[];
    result.forEach((coefficient, coefficientIndex) => {
      next[coefficientIndex] ^= coefficient;
      next[coefficientIndex + 1] ^= multiply(coefficient, root);
    });
    result = next;
    root = multiply(root, 2);
  }
  return result;
}

function errorCorrection(data: number[], degree: number): number[] {
  const generator = generatorPolynomial(degree);
  const remainder = [...data, ...new Array(degree).fill(0) as number[]];
  for (let index = 0; index < data.length; index += 1) {
    const factor = remainder[index];
    if (factor === 0) continue;
    generator.forEach((coefficient, generatorIndex) => {
      remainder[index + generatorIndex] ^= multiply(coefficient, factor);
    });
  }
  return remainder.slice(data.length);
}

function appendBits(bits: number[], value: number, length: number) {
  for (let index = length - 1; index >= 0; index -= 1) bits.push((value >>> index) & 1);
}

function createCodewords(text: string, selected: QrVersion): number[] {
  const bytes = Array.from(new TextEncoder().encode(text));
  const bits: number[] = [];
  appendBits(bits, 0b0100, 4);
  appendBits(bits, bytes.length, 8);
  bytes.forEach((byte) => appendBits(bits, byte, 8));
  const capacity = selected.dataCodewords * 8;
  for (let index = 0; index < Math.min(4, capacity - bits.length); index += 1) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);
  const data: number[] = [];
  for (let index = 0; index < bits.length; index += 8) data.push(Number.parseInt(bits.slice(index, index + 8).join(""), 2));
  let pad = true;
  while (data.length < selected.dataCodewords) {
    data.push(pad ? 0xec : 0x11);
    pad = !pad;
  }

  if (selected.blocks === 1) return [...data, ...errorCorrection(data, selected.errorCodewords)];
  const blockLength = selected.dataCodewords / selected.blocks;
  const blocks = Array.from({ length: selected.blocks }, (_, blockIndex) => data.slice(blockIndex * blockLength, (blockIndex + 1) * blockLength));
  const corrections = blocks.map((block) => errorCorrection(block, selected.errorCodewords));
  const interleaved: number[] = [];
  for (let index = 0; index < blockLength; index += 1) blocks.forEach((block) => interleaved.push(block[index]));
  for (let index = 0; index < selected.errorCodewords; index += 1) corrections.forEach((block) => interleaved.push(block[index]));
  return interleaved;
}

export function createQrMatrix(text: string): boolean[][] {
  const byteLength = new TextEncoder().encode(text).length;
  const selected = versions.find((item) => byteLength <= item.dataCodewords - 2);
  if (!selected) throw new Error("This URL is too long to encode as a QR code.");
  const size = selected.version * 4 + 17;
  const modules = Array.from({ length: size }, () => new Array(size).fill(false) as boolean[]);
  const functional = Array.from({ length: size }, () => new Array(size).fill(false) as boolean[]);
  const setFunction = (x: number, y: number, dark: boolean) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    modules[y][x] = dark;
    functional[y][x] = true;
  };
  const drawFinder = (centerX: number, centerY: number) => {
    for (let y = -4; y <= 4; y += 1) for (let x = -4; x <= 4; x += 1) {
      const distance = Math.max(Math.abs(x), Math.abs(y));
      setFunction(centerX + x, centerY + y, distance !== 2 && distance !== 4);
    }
  };
  drawFinder(3, 3);
  drawFinder(size - 4, 3);
  drawFinder(3, size - 4);
  for (let index = 8; index < size - 8; index += 1) {
    setFunction(index, 6, index % 2 === 0);
    setFunction(6, index, index % 2 === 0);
  }
  if (selected.version > 1) {
    const center = size - 7;
    for (const [centerX, centerY] of [[center, center], [center, 6], [6, center]]) {
      if (functional[centerY][centerX]) continue;
      for (let y = -2; y <= 2; y += 1) for (let x = -2; x <= 2; x += 1) setFunction(centerX + x, centerY + y, Math.max(Math.abs(x), Math.abs(y)) !== 1);
    }
  }
  for (let index = 0; index < 9; index += 1) {
    if (!functional[8][index]) setFunction(index, 8, false);
    if (!functional[index][8]) setFunction(8, index, false);
  }
  for (let index = 0; index < 8; index += 1) {
    setFunction(size - 1 - index, 8, false);
    setFunction(8, size - 1 - index, false);
  }
  setFunction(8, size - 8, true);

  const codewords = createCodewords(text, selected);
  const dataBits: number[] = [];
  codewords.forEach((byte) => appendBits(dataBits, byte, 8));
  let bitIndex = 0;
  let upward = true;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right -= 1;
    for (let vertical = 0; vertical < size; vertical += 1) {
      const y = upward ? size - 1 - vertical : vertical;
      for (let offset = 0; offset < 2; offset += 1) {
        const x = right - offset;
        if (functional[y][x]) continue;
        const bit = bitIndex < dataBits.length ? dataBits[bitIndex] === 1 : false;
        modules[y][x] = bit !== ((x + y) % 2 === 0);
        bitIndex += 1;
      }
    }
    upward = !upward;
  }

  const formatBits = 0x77c4;
  const formatBit = (index: number) => ((formatBits >>> index) & 1) !== 0;
  for (let index = 0; index <= 5; index += 1) setFunction(8, index, formatBit(index));
  setFunction(8, 7, formatBit(6));
  setFunction(8, 8, formatBit(7));
  setFunction(7, 8, formatBit(8));
  for (let index = 9; index < 15; index += 1) setFunction(14 - index, 8, formatBit(index));
  for (let index = 0; index < 8; index += 1) setFunction(size - 1 - index, 8, formatBit(index));
  for (let index = 8; index < 15; index += 1) setFunction(8, size - 15 + index, formatBit(index));
  setFunction(8, size - 8, true);
  return modules;
}

export function qrMatrixToSvg(matrix: boolean[][], moduleSize = 8, quietZone = 4): string {
  const dimension = matrix.length + quietZone * 2;
  const path = matrix.flatMap((row, y) => row.map((dark, x) => dark ? `M${x + quietZone},${y + quietZone}h1v1h-1z` : "")).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dimension} ${dimension}" width="${dimension * moduleSize}" height="${dimension * moduleSize}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="white"/><path d="${path}" fill="#172033"/></svg>`;
}
