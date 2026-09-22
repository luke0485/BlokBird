import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source = fs.readFileSync('script.js', 'utf8');
const cutoff = source.indexOf("\ndocument.querySelectorAll('[data-add]')");
const project = vm.createContext({ localStorage: { getItem: () => null }, crypto: globalThis.crypto, console, setTimeout, clearTimeout });
vm.runInContext(source.slice(0, cutoff), project);
assert.ok(vm.runInContext('NAV_ICONS.length >= 12', project));
assert.ok(vm.runInContext("navIconHtml('icon:home').includes('<svg')", project));
assert.equal(vm.runInContext("safeNavIcon('⌂')", project), 'icon:home');
const flow = vm.runInContext(`(function(){update=()=>{};editorToast=()=>{};createTemplatePage('shop');const ids=state.pages.slice(-3);download=(name,data)=>{globalThis.html=data};exportHtml();return {ids,actions:ids.map(page=>state.items.find(item=>item.page===page&&item.type==='button'&&item.action==='page')?.id),html:globalThis.html}})()`, project);
assert.ok(flow.actions[0] && flow.actions[1]);
assert.ok(flow.html.includes('class="nav-icon"><svg'));
assert.ok(!flow.html.includes('class="nav-add"'));
const imported = vm.runInContext(`normalizeProject({name:'测试',pages:['one','two'],pageModes:{one:'detail',two:'detail'},items:[],assets:[]})`, project);
assert.equal(imported.pageModes.one, 'tab');
const script = flow.html.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1];
assert.ok(script);
const classList = node => ({ toggle(name, enabled) { if (name === 'active') node.active = enabled; } });
const pageNodes = Array.from(flow.html.matchAll(/<section class="app-page" data-page="([^"]+)"/g), match => { const node = { dataset: { page: match[1] }, active: false, querySelectorAll: () => [] }; node.classList = classList(node); return node; });
const formInput = { value: '', checkValidity: () => true, focus() {} };
pageNodes.find(node => node.dataset.page === flow.ids[1]).querySelectorAll = () => [formInput];
const navNodes = Array.from(flow.html.matchAll(/<button data-page-target="([^"]+)"/g), match => { const node = { dataset: { pageTarget: match[1] } }; node.classList = classList(node); return node; });
const elements = Object.fromEntries(['title', 'back', 'more', 'moreMenu', 'moreInfo', 'moreNext', 'moreClose', 'toast', 'modal', 'message', 'close'].map(id => [id, { style: {}, hidden: true }]));
const nav = { hidden: false };
const doc = {
  querySelectorAll(selector) { return selector === '.app-page' ? pageNodes : navNodes; },
  querySelector(selector) { return selector === 'nav' ? nav : selector === '.app-page.active' ? pageNodes.find(node => node.active) : { scrollTop: 0 }; },
  getElementById(id) { return elements[id]; },
  addEventListener() {}
};
const app = vm.createContext({ document: doc, setTimeout, clearTimeout, location: { href: '' } });
vm.runInContext(script, app);
vm.runInContext(`show(${JSON.stringify(flow.ids[0])})`, app);
assert.equal(nav.hidden, false);
vm.runInContext(`run(actions[${JSON.stringify(flow.actions[0])}])`, app);
assert.equal(vm.runInContext('current', app), flow.ids[1]);
assert.equal(nav.hidden, true);
assert.equal(elements.back.hidden, false);
vm.runInContext(`run(actions[${JSON.stringify(flow.actions[1])}])`, app);
assert.equal(vm.runInContext('current', app), flow.ids[1], 'empty form blocks navigation');
formInput.value = '收货地址';
vm.runInContext(`run(actions[${JSON.stringify(flow.actions[1])}])`, app);
assert.equal(vm.runInContext('current', app), flow.ids[2]);
elements.back.onclick();
assert.equal(vm.runInContext('current', app), flow.ids[1]);
elements.back.onclick();
assert.equal(vm.runInContext('current', app), flow.ids[0]);
assert.equal(nav.hidden, false);
console.log('Exported app detail-page navigation and two-step back flow passed.');
