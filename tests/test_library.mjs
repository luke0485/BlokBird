import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root = './';
const source = fs.readFileSync(root + 'script.js', 'utf8');
const cutoff = source.indexOf("\ndocument.querySelectorAll('[data-add]')");
assert.ok(cutoff > 0);
const context = vm.createContext({ localStorage: { getItem: () => null }, crypto: globalThis.crypto, console, setTimeout, clearTimeout });
vm.runInContext(source.slice(0, cutoff), context);
const counts = vm.runInContext('Object.fromEntries(Object.entries(VARIANTS).map(([type,list])=>[type,list.length]))', context);
assert.deepEqual(JSON.parse(JSON.stringify(counts)), { heading: 10, text: 10, button: 25, image: 27, divider: 8, card: 13, layout: 5, input: 7, switch: 4 });
assert.equal(vm.runInContext('BUILTINS.length', context), 26);
for (const type of ['heading', 'text', 'button', 'image', 'divider', 'card', 'layout', 'input', 'switch']) {
  const exports = vm.runInContext(`VARIANTS.${type}.map(v => exportElement(makeItem('${type}',v.id)))`, context);
  assert.equal(exports.length, counts[type]);
  for (const html of exports) assert.ok(typeof html === 'string');
}
const animationNames = ['fade','rise','pop','slide-left','slide-right','drop','zoom','blur','rotate','bounce'];
for (const name of animationNames) assert.ok(vm.runInContext(`PRESET_CSS.includes('.anim-${name}')`, context), name);
const itemHtml = vm.runInContext("(function(){const item=makeItem('card','stat');item.detail='安全 < 内容';item.animation='slide-left';return exportElement(item)})()", context);
assert.ok(itemHtml.includes('安全 &lt; 内容'));
assert.ok(itemHtml.includes('anim-slide-left'));
const page = fs.readFileSync(root + 'index.html', 'utf8');
assert.ok(page.includes('id="guideTab"'));
assert.ok(!page.includes('id="lessonTab"') && !page.includes('id="checklist"'));
assert.ok(page.includes('id="assetSearch"'));
assert.ok(page.includes('id="templatesTab"'));
const templates = vm.runInContext('PAGE_TEMPLATES.map(t=>({id:t.id,cover:t.cover,count:composeTemplate(t.id,"demo").length}))', context);
assert.equal(templates.length, 7);
for (const template of templates) { assert.ok(template.count >= 5, template.id); assert.ok(template.cover < 26, template.id); }
for (const template of templates) {
  const flow = vm.runInContext(`(function(){const before=state.pages.length;update=()=>{};editorToast=()=>{};createTemplatePage(${JSON.stringify(template.id)});const pages=state.pages.slice(before);return {pages,buttons:state.items.filter(i=>pages.includes(i.page)&&i.type==='button').map(i=>({page:i.page,target:i.targetPage,action:i.action}))}})()`, context);
  assert.equal(flow.pages.length, 3, template.id);
  assert.ok(flow.buttons.some(button => button.page === flow.pages[0] && button.target === flow.pages[1] && button.action === 'page'));
  assert.ok(flow.buttons.some(button => button.page === flow.pages[1] && button.target === flow.pages[2] && button.action === 'page'));
  assert.ok(flow.buttons.some(button => button.page === flow.pages[2] && button.target === flow.pages[1] && button.action === 'page'));
}
const layout = vm.runInContext(`(function(){const parent=makeItem('layout','two');const child=makeItem('button','pixel');child.layoutId=parent.id;state.items.push(parent,child);const html=exportElement(parent);return {parent,child,html}})()`, context);
assert.ok(layout.html.includes('variant-layout-two'));
assert.ok(layout.html.includes('variant-button-pixel'));
assert.equal(vm.runInContext(`state.items.filter(item=>item.layoutId===${JSON.stringify(layout.parent.id)}).length`, context), 1);
assert.ok(vm.runInContext(`PRESET_CSS.includes('.state-disabled')`, context));
console.log('Library counts, all preset exports, animation styles, card detail escaping, and guide UI passed.');

