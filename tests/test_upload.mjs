import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const script = fs.readFileSync('script.js', 'utf8');
const cutoff = script.indexOf("\ndocument.querySelectorAll('[data-add]')");
const known = new Set(['png', 'jpeg', 'webp'].map((mime, index) => fs.readFileSync(`tests/fixtures/upload.${['png', 'jpg', 'webp'][index]}`).toString('base64')));
class FakeReader {
  async readAsDataURL(blob) {
    const encoded = Buffer.from(await blob.arrayBuffer()).toString('base64');
    this.result = `data:${blob.type};base64,${encoded}`;
    this.onload();
  }
}
class FakeImage {
  naturalWidth = 3;
  naturalHeight = 2;
  set src(data) { known.has(data.split(',')[1]) ? this.onload() : this.onerror(); }
}
const context = vm.createContext({ localStorage: { getItem: () => null }, crypto: globalThis.crypto, console, setTimeout, clearTimeout, Blob, FileReader: FakeReader, Image: FakeImage });
vm.runInContext(script.slice(0, cutoff), context);
for (const ext of ['png', 'jpg', 'webp']) {
  const bytes = fs.readFileSync(`tests/fixtures/upload.${ext}`);
  const file = { name: `uploaded.${ext}`, size: bytes.length, type: 'application/octet-stream', arrayBuffer: async () => bytes };
  context.file = file;
  const asset = await vm.runInContext('readImageAsset(file)', context);
  assert.equal(asset.name, file.name);
  assert.ok(asset.data.startsWith(`data:image/${ext === 'jpg' ? 'jpeg' : ext};base64,`));
  context.asset = asset;
  assert.equal(vm.runInContext('safeSrc(asset.data)', context), asset.data);
  const navIcon = await vm.runInContext('readNavIcon(file)', context);
  assert.equal(navIcon, asset.data);
  context.navIcon = navIcon;
  assert.equal(vm.runInContext('safeNavIcon(navIcon)', context), navIcon);
}
for (const [name, bytes] of [['unknown', Buffer.alloc(64)], ['corrupt.png', Buffer.concat([fs.readFileSync('tests/fixtures/upload.png').subarray(0, 16), Buffer.alloc(48)])]]) {
  context.file = { name, size: bytes.length, arrayBuffer: async () => bytes };
  await assert.rejects(vm.runInContext('readImageAsset(file)', context));
}
context.file = { name: 'large.png', size: 2 * 1024 * 1024 + 1, arrayBuffer: async () => { throw Error('must not read'); } };
await assert.rejects(vm.runInContext('readImageAsset(file)', context));
assert.equal(vm.runInContext("backgroundAlpha(255,255,255,hexToRgb('#ffffff'),30,20)", context), 0);
assert.equal(vm.runInContext("backgroundAlpha(0,0,0,hexToRgb('#ffffff'),30,20)", context), 255);
assert.ok(vm.runInContext("backgroundAlpha(215,215,215,hexToRgb('#ffffff'),60,30)", context) > 0);
assert.equal(vm.runInContext("rgbToHex(47,107,79)", context), '#2f6b4f');
console.log('Image upload validation and solid-background removal math passed.');
