import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root = './';
const script = fs.readFileSync(root + 'script.js', 'utf8');
const marker = "\ndocument.querySelectorAll('[data-add]').forEach(button => button.onclick";
const cutoff = script.indexOf(marker);
assert.ok(cutoff > 0, 'startup bindings marker');
const context = vm.createContext({ localStorage: { getItem: () => null }, crypto: globalThis.crypto, console, setTimeout, clearTimeout });
vm.runInContext(script.slice(0, cutoff), context);
const data = vm.runInContext(`({
  pages: state.pages,
  counts: Object.fromEntries(Object.entries(VARIANTS).map(([type, values]) => [type, values.length])),
  items: state.items.map(item => ({type:item.type,page:item.page})),
  newButton: makeItem('button','pill','profile'),
  imported: normalizeProject({name:'old',items:[{id:'x',type:'heading',text:'x'}],assets:[]}).items[0]
})`, context);
assert.deepEqual(Array.from(data.pages), ['home', 'discover', 'profile']);
for (const [type, count] of Object.entries(data.counts)) assert.ok(count >= 3, `${type} presets`);
assert.ok(data.items.some(item => item.page === 'home'));
assert.ok(data.items.some(item => item.page === 'profile'));
assert.equal(data.newButton.radius, 99);
assert.equal(data.newButton.page, 'profile');
assert.equal(data.imported.page, 'home');
const migrated = vm.runInContext("normalizeProject({name:'我的第一个应用',items:[{id:'old',type:'button',page:'home',variant:'rounded',background:'#E07A5F',color:'#FFFFFF'}],assets:[],styled:false})", context);
assert.equal(migrated.name, '未命名项目');
assert.equal(migrated.items[0].background, '#2F6B4F');
const reorder = vm.runInContext(`(function(){const before=state.items.filter(i=>i.page==='home').map(i=>i.id);update=()=>{};reorderItem(before[3],before[0]);return {before,after:state.items.filter(i=>i.page==='home').map(i=>i.id)}})()`, context);
assert.equal(reorder.after[0], reorder.before[3]);
assert.equal(reorder.after.length, 4);
const output = vm.runInContext(`(function(){download=(name,data)=>{globalThis.output={name,data}};editorToast=()=>{};exportHtml();return globalThis.output})()`, context);
assert.equal(output.name, 'blokbird-app.html');
for (const page of ['home','discover','profile']) assert.ok(output.data.includes(`data-page="${page}"`), `${page} exported`);
assert.ok(output.data.includes('data-action-id='), 'button actions exported');
assert.ok(output.data.includes('</script></body></html>'), 'export script closes correctly');
const runtimeSource = output.data.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1];
assert.ok(runtimeSource, 'exported runtime present');
const classList = () => ({ values: new Set(), toggle(name, enabled) { if (enabled) this.values.add(name); else this.values.delete(name); } });
const pageNodes = ['home','discover','profile'].map(page => ({ dataset: { page }, classList: classList() }));
const navNodes = ['home','discover','profile'].map(page => ({ dataset: { pageTarget: page }, classList: classList() }));
const elements = {
  title: { textContent: '' }, back: { hidden: true, onclick: null }, more: { textContent: '', onclick: null }, moreMenu: { style: {} },
  moreInfo: { onclick: null }, moreNext: { onclick: null }, moreClose: { onclick: null },
  toast: { textContent: '', style: {} }, modal: { style: {} },
  message: { textContent: '' }, close: { onclick: null }
};
let clickHandler;
const fakeDocument = {
  querySelectorAll(selector) { return selector === '.app-page' ? pageNodes : navNodes; },
  querySelector() { return { scrollTop: 0 }; },
  getElementById(id) { return elements[id]; },
  addEventListener(type, callback) { if (type === 'click') clickHandler = callback; }
};
const runtime = vm.createContext({ document: fakeDocument, setTimeout, clearTimeout, location: { href: '' } });
vm.runInContext(runtimeSource, runtime);
assert.equal(elements.title.textContent, '首页');
vm.runInContext("show('profile')", runtime);
assert.equal(elements.title.textContent, '我的');
const actionId = vm.runInContext('Object.keys(actions)[0]', runtime);
clickHandler({ target: { closest(selector) { return selector === '[data-action-id]' ? { dataset: { actionId } } : null; } } });
assert.equal(elements.title.textContent, '发现');
vm.runInContext("actions.test={action:'toast',prompt:'已保存'}", runtime);
clickHandler({ target: { closest(selector) { return selector === '[data-action-id]' ? { dataset: { actionId: 'test' } } : null; } } });
assert.equal(elements.toast.textContent, '已保存');
vm.runInContext("actions.dialog={action:'modal',prompt:'确定继续？'}", runtime);
clickHandler({ target: { closest(selector) { return selector === '[data-action-id]' ? { dataset: { actionId: 'dialog' } } : null; } } });
assert.equal(elements.message.textContent, '确定继续？');
const toggle = { dataset: { checked: 'false' }, setAttribute(name, value) { this[name] = value; } };
clickHandler({ target: { closest(selector) { return selector === '[role="switch"]' ? toggle : null; } } });
assert.equal(toggle.dataset.checked, 'true');
assert.equal(toggle['aria-checked'], 'true');
const html = fs.readFileSync(root + 'index.html', 'utf8');
for (const id of ['canvasPage','phoneNav','phoneToast','phoneModal','variantPanel','builtInAssets']) assert.ok(html.includes(`id="${id}"`), `${id} in page`);
const phone = fs.readFileSync(root + 'phone.css', 'utf8');
assert.ok(phone.includes('aspect-ratio:13/24'));
assert.ok(phone.includes('width:min(468px,100%)'));
const shellRule = phone.match(/\.canvas-frame\.mobile\s*\{([^}]*)\}/)?.[1] || '';
assert.ok(!shellRule.includes('transform:scale('), 'phone frame should not scale children');
console.log('Presets, page assignment, legacy import, export interactions, and phone geometry passed.');

