const KEY = 'blokbird-ui-design-v4';
const OLD_KEYS = ['blokbird-studio-v2', 'blokbird-palette-v1', 'interface-lab-monochrome-v1'];
const DEFAULT_PAGES = ['home', 'discover', 'profile'];
const PAGE_LABELS = { home: '首页', discover: '发现', profile: '我的' };
const PAGE_ICONS = { home: 'icon:home', discover: 'icon:compass', profile: 'icon:person' };
const NAV_ICONS = [
  { id: 'home', name: '首页', outline: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>', filled: '<path d="m12 2 10 8v10a2 2 0 0 1-2 2h-6v-7h-4v7H4a2 2 0 0 1-2-2V10z"/>' },
  { id: 'compass', name: '发现', outline: '<circle cx="12" cy="12" r="9"/><path d="m15.8 8.2-2.5 5.1-5.1 2.5 2.5-5.1z"/>', filled: '<circle cx="12" cy="12" r="10"/><path d="m16.5 7.5-3 6-6 3 3-6z" fill="#fff"/>' },
  { id: 'person', name: '我的', outline: '<circle cx="12" cy="7.5" r="3.5"/><path d="M4.5 21v-2.2a7.5 7.5 0 0 1 15 0V21z"/>', filled: '<circle cx="12" cy="7.5" r="4"/><path d="M3 21v-2a9 9 0 0 1 18 0v2z"/>' },
  { id: 'search', name: '搜索', outline: '<circle cx="10.8" cy="10.8" r="7"/><path d="m16 16 5 5"/>' },
  { id: 'heart', name: '喜欢', outline: '<path d="M20.5 5.5a5 5 0 0 0-7.1 0L12 6.9l-1.4-1.4a5 5 0 0 0-7.1 7.1L12 21l8.5-8.4a5 5 0 0 0 0-7.1z"/>', filled: '<path d="M12 21 2.7 11.8a6 6 0 0 1 8.5-8.5L12 4l.8-.7a6 6 0 0 1 8.5 8.5z"/>' },
  { id: 'music', name: '音乐', outline: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>' },
  { id: 'library', name: '资料库', outline: '<path d="M4 4h4v16H4zM10 4h4v16h-4zM16 6l3-1 4 14-3 1z"/>' },
  { id: 'bell', name: '消息', outline: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 10h18c0-2-3-3-3-10zM10 21h4"/>' },
  { id: 'calendar', name: '日程', outline: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>' },
  { id: 'cart', name: '购物', outline: '<path d="M3 4h2l2.2 11.5h11.6L21 7H6M8 20h.01M18 20h.01"/>' },
  { id: 'play', name: '播放', outline: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>', filled: '<circle cx="12" cy="12" r="10"/><path d="m10 7 7 5-7 5z" fill="#fff"/>' },
  { id: 'settings', name: '设置', outline: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>' }
];
const DEFAULT_NAV_ICON_STYLE = { size: 23, stroke: 1.9, activeColor: '#1F2A24', inactiveColor: '#7B857E' };
const DEFAULT_NAV_STYLE = { background: '#FFFFFF', borderColor: '#DFE2DB', height: 72, radius: 0, shape: 'bar', activeState: 'icon' };
const $ = selector => document.querySelector(selector);
const clone = value => JSON.parse(JSON.stringify(value));
const uid = () => globalThis.crypto?.randomUUID?.() || `bb-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const svgData = body => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 200">${body}</svg>`);

const LEGACY_BUILTINS = [
  { name: '几何封面', data: svgData('<rect width="360" height="200" fill="#FAF9F6"/><circle cx="278" cy="44" r="92" fill="#2A6B6B"/><path d="M0 200 142 25l138 175" fill="#E07A5F"/><rect x="23" y="118" width="82" height="82" fill="#2E2A27"/>') },
  { name: '柔和曲线', data: svgData('<rect width="360" height="200" fill="#FAF9F6"/><path d="M0 152Q90 35 180 145T360 120V200H0" fill="#2A6B6B"/><path d="M0 184Q90 65 180 175T360 150" fill="none" stroke="#E07A5F" stroke-width="20"/>') },
  { name: '卡片插画', data: svgData('<rect width="360" height="200" fill="#E8E4DF"/><rect x="55" y="24" width="250" height="152" rx="18" fill="#FFFFFF"/><circle cx="118" cy="87" r="32" fill="#E07A5F"/><rect x="173" y="69" width="91" height="13" rx="6" fill="#2E2A27"/><rect x="173" y="93" width="66" height="9" rx="4" fill="#6B6560"/><rect x="89" y="139" width="181" height="9" rx="4" fill="#E8E4DF"/>') },
  { name: '日落山丘', data: svgData('<rect width="360" height="200" fill="#F4E8DC"/><circle cx="274" cy="64" r="41" fill="#E07A5F"/><path d="M0 169 95 72l69 75 63-54 133 107H0" fill="#2A6B6B"/><path d="M0 190 71 139l88 61H0" fill="#2E2A27"/>') },
  { name: '海面晨光', data: svgData('<rect width="360" height="200" fill="#DDEDEB"/><circle cx="104" cy="83" r="42" fill="#E07A5F"/><path d="M0 126Q70 110 140 126T280 126T420 126V200H0" fill="#2A6B6B"/><path d="M0 154Q90 138 180 154T360 154" fill="none" stroke="#FFFFFF" stroke-width="5"/>') },
  { name: '城市夜景', data: svgData('<rect width="360" height="200" fill="#263449"/><circle cx="288" cy="47" r="23" fill="#FAF9F6"/><path d="M0 200V94h60v38h48V60h61v88h49V83h66v49h76v68" fill="#18222F"/><path d="M35 120h9m82-36h9m20 0h9m76 25h9m22 0h9m35 48h9" stroke="#E8C88D" stroke-width="6"/>') },
  { name: '植物剪影', data: svgData('<rect width="360" height="200" fill="#EAF0E8"/><path d="M180 200V49M180 139Q96 123 88 65M180 160Q260 139 278 77" fill="none" stroke="#2A6B6B" stroke-width="8"/><ellipse cx="103" cy="78" rx="39" ry="17" transform="rotate(35 103 78)" fill="#4D8D72"/><ellipse cx="251" cy="88" rx="46" ry="18" transform="rotate(-33 251 88)" fill="#2A6B6B"/><ellipse cx="168" cy="53" rx="17" ry="39" fill="#82A68B"/>') },
  { name: '柔彩圆环', data: svgData('<rect width="360" height="200" fill="#FAF9F6"/><circle cx="180" cy="100" r="72" fill="none" stroke="#E07A5F" stroke-width="31"/><circle cx="180" cy="100" r="43" fill="none" stroke="#2A6B6B" stroke-width="17"/><circle cx="180" cy="100" r="23" fill="#F1D59D"/>') },
  { name: '棋盘波纹', data: svgData('<rect width="360" height="200" fill="#2E2A27"/><path d="M0 25h360M0 75h360M0 125h360M0 175h360M45 0v200M135 0v200M225 0v200M315 0v200" stroke="#6B6560" stroke-width="2"/><circle cx="180" cy="100" r="66" fill="#E07A5F"/><circle cx="180" cy="100" r="43" fill="#FAF9F6"/><circle cx="180" cy="100" r="19" fill="#2A6B6B"/>') },
  { name: '抽象阶梯', data: svgData('<rect width="360" height="200" fill="#E8E4DF"/><path d="M30 180v-45h55V93h60V54h72V25h112v155" fill="#E07A5F"/><path d="M30 180h300" stroke="#2E2A27" stroke-width="5"/><circle cx="108" cy="47" r="24" fill="#2A6B6B"/>') },
  { name: '纸张拼贴', data: svgData('<rect width="360" height="200" fill="#E8E4DF"/><rect x="37" y="28" width="120" height="145" rx="6" fill="#FFFFFF" transform="rotate(-9 97 100)"/><rect x="178" y="30" width="137" height="142" rx="6" fill="#F1D59D" transform="rotate(8 245 100)"/><circle cx="245" cy="91" r="36" fill="#E07A5F"/><path d="M62 73h72M62 92h55M62 111h63" stroke="#2A6B6B" stroke-width="7"/>') },
  { name: '行星轨道', data: svgData('<rect width="360" height="200" fill="#243B48"/><ellipse cx="180" cy="100" rx="136" ry="52" fill="none" stroke="#9CCBC4" stroke-width="3" transform="rotate(-22 180 100)"/><circle cx="180" cy="100" r="53" fill="#E07A5F"/><circle cx="91" cy="49" r="12" fill="#F1D59D"/><circle cx="290" cy="156" r="7" fill="#FFFFFF"/>') },
  { name: '彩条海报', data: svgData('<rect width="360" height="200" fill="#FAF9F6"/><path d="M0 0h85v200H0" fill="#E07A5F"/><path d="M85 0h64v200H85" fill="#F1D59D"/><path d="M149 0h79v200h-79" fill="#2A6B6B"/><path d="M228 0h50v200h-50" fill="#6B6560"/><path d="M278 0h82v200h-82" fill="#2E2A27"/>') },
  { name: '咖啡杯', data: svgData('<rect width="360" height="200" fill="#F5EDE6"/><ellipse cx="180" cy="166" rx="100" ry="12" fill="#E8D6C7"/><path d="M104 61h142l-14 93H118Z" fill="#FFFFFF" stroke="#6B6560" stroke-width="4"/><path d="M245 76q67-5 52 39-9 24-57 19" fill="none" stroke="#6B6560" stroke-width="11"/><ellipse cx="175" cy="61" rx="70" ry="19" fill="#7E5344"/><path d="M144 34q-15-16 0-28m35 30q-15-16 0-28m34 30q-15-16 0-28" fill="none" stroke="#CBAE9A" stroke-width="5"/>') },
  { name: '天气晴空', data: svgData('<rect width="360" height="200" fill="#DCECF7"/><circle cx="264" cy="63" r="39" fill="#F1D59D"/><path d="M74 139a40 40 0 0 1 56-37 56 56 0 0 1 107 14 35 35 0 1 1 8 69H79a24 24 0 0 1-5-46" fill="#FFFFFF"/>') },
  { name: '数据看板', data: svgData('<rect width="360" height="200" fill="#F5F7F7"/><rect x="23" y="23" width="314" height="154" rx="13" fill="#FFFFFF"/><path d="M49 142h260" stroke="#E8E4DF" stroke-width="3"/><path d="M59 131V93h37v38m19 0V70h37v61m19 0V109h37v22m19 0V52h37v79" fill="#2A6B6B"/><circle cx="293" cy="47" r="12" fill="#E07A5F"/>') },
  { name: '抽象花朵', data: svgData('<rect width="360" height="200" fill="#FAF9F6"/><ellipse cx="180" cy="58" rx="24" ry="48" fill="#E07A5F"/><ellipse cx="180" cy="142" rx="24" ry="48" fill="#E07A5F"/><ellipse cx="138" cy="100" rx="48" ry="24" fill="#F1D59D"/><ellipse cx="222" cy="100" rx="48" ry="24" fill="#F1D59D"/><circle cx="180" cy="100" r="27" fill="#2A6B6B"/>') },
  { name: '霓虹网格', data: svgData('<rect width="360" height="200" fill="#101225"/><path d="M0 40h360M0 80h360M0 120h360M0 160h360M40 0v200M80 0v200M120 0v200M160 0v200M200 0v200M240 0v200M280 0v200M320 0v200" stroke="#41486A"/><circle cx="180" cy="100" r="65" fill="none" stroke="#F058BD" stroke-width="14"/><path d="M104 125 170 51l84 95" fill="none" stroke="#39D6DB" stroke-width="13"/>') },
  { name: '像素山脉', data: svgData('<rect width="360" height="200" fill="#BCD4F0"/><path d="M0 160h50v-20h30v-20h30V95h25V70h35v35h25v30h30v25h135v40H0" fill="#4967A6"/><path d="M0 175h100v-20h40v-15h50v20h35v15h135v25H0" fill="#1F3562"/><rect x="260" y="35" width="40" height="40" fill="#FFE68C"/>') },
  { name: '水彩云朵', data: svgData('<rect width="360" height="200" fill="#F5EAF1"/><ellipse cx="100" cy="82" rx="83" ry="43" fill="#D9C6EB" opacity=".72"/><ellipse cx="193" cy="107" rx="91" ry="54" fill="#B9D7E8" opacity=".68"/><ellipse cx="281" cy="75" rx="72" ry="40" fill="#F0BFCC" opacity=".68"/><ellipse cx="170" cy="145" rx="140" ry="34" fill="#FFFFFF" opacity=".48"/>') },
  { name: '黑白建筑', data: svgData('<rect width="360" height="200" fill="#F5F5F2"/><rect x="31" y="60" width="120" height="140" fill="#202020"/><rect x="168" y="22" width="164" height="178" fill="#D2D2CE"/><path d="M49 83h84M49 105h84M49 127h84M49 149h84M190 50h120M190 73h120M190 96h120M190 119h120" stroke="#FFFFFF" stroke-width="7"/><path d="M0 190h360" stroke="#111" stroke-width="5"/>') },
  { name: '复古波点', data: svgData('<rect width="360" height="200" fill="#F8DBBE"/><g fill="#B44E42"><circle cx="45" cy="42" r="12"/><circle cx="118" cy="42" r="12"/><circle cx="191" cy="42" r="12"/><circle cx="264" cy="42" r="12"/><circle cx="337" cy="42" r="12"/><circle cx="45" cy="112" r="12"/><circle cx="118" cy="112" r="12"/><circle cx="191" cy="112" r="12"/><circle cx="264" cy="112" r="12"/><circle cx="337" cy="112" r="12"/></g><path d="M0 179h360" stroke="#3C5C63" stroke-width="18"/>') },
  { name: '玻璃几何', data: svgData('<defs><linearGradient id="g"><stop stop-color="#9ECDE1"/><stop offset="1" stop-color="#DCC6F4"/></linearGradient></defs><rect width="360" height="200" fill="url(#g)"/><rect x="55" y="32" width="123" height="135" rx="26" fill="#FFFFFF" opacity=".46" stroke="#FFFFFF" stroke-width="4"/><circle cx="231" cy="99" r="64" fill="#FFFFFF" opacity=".35" stroke="#FFFFFF" stroke-width="4"/>') },
  { name: '金属银灰', data: svgData('<defs><linearGradient id="m"><stop stop-color="#6F7782"/><stop offset=".5" stop-color="#E6E8EA"/><stop offset="1" stop-color="#7D8590"/></linearGradient></defs><rect width="360" height="200" fill="#1D2128"/><circle cx="180" cy="100" r="75" fill="url(#m)"/><circle cx="180" cy="100" r="44" fill="#1D2128"/><path d="M45 100h67m136 0h67" stroke="#DDE0E4" stroke-width="9"/>') },
  { name: '孟菲斯形状', data: svgData('<rect width="360" height="200" fill="#FFEBD7"/><circle cx="92" cy="70" r="44" fill="#FF6B6B"/><rect x="177" y="29" width="87" height="87" transform="rotate(18 220 72)" fill="#4C67C9"/><path d="M30 168q30-52 60 0t60 0t60 0t60 0t60 0" fill="none" stroke="#2E2A27" stroke-width="8"/><circle cx="309" cy="48" r="14" fill="#F6C644"/>') },
  { name: '禅意留白', data: svgData('<rect width="360" height="200" fill="#F6F3EA"/><circle cx="180" cy="93" r="55" fill="none" stroke="#2B2B2B" stroke-width="8" stroke-dasharray="300 50"/><path d="M52 162q75-35 145 0t119 0" fill="none" stroke="#777268" stroke-width="3"/><circle cx="253" cy="58" r="8" fill="#A9473E"/>') }
];

const productScene = (accent, body, surface = '#F7F8FA') => svgData(`<rect width="360" height="200" fill="${surface}"/><rect x="18" y="16" width="324" height="168" rx="18" fill="#fff"/><rect x="18" y="16" width="324" height="7" rx="3.5" fill="${accent}"/>${body}`);
const BUILTINS = [
  { name: '白色运动鞋商品图', data: 'assets/brand-free-sneaker.png' },
  { name: '护肤品商品图', data: productScene('#FF6680', '<ellipse cx="181" cy="160" rx="92" ry="10" fill="#F0DDE2"/><rect x="96" y="70" width="61" height="84" rx="12" fill="#F7C9D3"/><rect x="108" y="46" width="37" height="28" rx="6" fill="#17233C"/><rect x="177" y="53" width="88" height="101" rx="16" fill="#FFF1E5" stroke="#FF6680" stroke-width="4"/><circle cx="221" cy="99" r="22" fill="#FF6680"/><path d="M207 99h28M221 85v28" stroke="#fff" stroke-width="5"/>') },
  { name: '咖啡外卖主图', data: productScene('#FFAB19', '<ellipse cx="184" cy="159" rx="105" ry="10" fill="#E7DED3"/><path d="M105 61h126l-13 92h-99Z" fill="#EFE4D4" stroke="#5B3B2A" stroke-width="4"/><path d="M231 77q53-3 42 36-8 24-49 18" fill="none" stroke="#5B3B2A" stroke-width="10"/><ellipse cx="168" cy="61" rx="63" ry="16" fill="#73472F"/><path d="M145 112c18 12 37 12 55 0" fill="none" stroke="#FFAB19" stroke-width="6"/>') },
  { name: '餐厅菜品主图', data: productScene('#59C059', '<ellipse cx="180" cy="118" rx="117" ry="53" fill="#E9EEF2"/><ellipse cx="180" cy="111" rx="94" ry="39" fill="#fff"/><path d="M113 115q32-45 64 0t66 0" fill="none" stroke="#F2A33A" stroke-width="15"/><circle cx="142" cy="95" r="16" fill="#E85555"/><circle cx="214" cy="99" r="13" fill="#59C059"/><path d="m180 82 10 27m-28-17 9 30" stroke="#356C3F" stroke-width="5"/>') },
  { name: '服饰陈列主图', data: productScene('#9966FF', '<path d="m95 70 38-24 31 22 31-22 70 46-28 35-25-14v50H119v-50l-26 14-25-35Z" fill="#8BA7D9" stroke="#17233C" stroke-width="4"/><path d="M134 47q12 32 30 21 18 11 31-21" fill="none" stroke="#fff" stroke-width="7"/><rect x="137" y="98" width="55" height="8" rx="4" fill="#fff"/>') },
  { name: '酒店房间主图', data: productScene('#4C97FF', '<rect x="50" y="48" width="125" height="82" rx="5" fill="#BFE1FF"/><path d="m56 119 45-39 29 27 23-21 16 15v25H56Z" fill="#78B36B"/><rect x="60" y="129" width="238" height="34" rx="6" fill="#D9C7AD"/><rect x="84" y="101" width="76" height="36" rx="9" fill="#fff"/><rect x="191" y="76" width="72" height="62" rx="7" fill="#F0B66A"/><path d="M180 58v80" stroke="#17233C" stroke-width="5"/>') },
  { name: '旅行目的地主图', data: productScene('#00B6B6', '<rect x="44" y="43" width="272" height="119" rx="15" fill="#C8EEFF"/><circle cx="268" cy="72" r="24" fill="#FFD55C"/><path d="M44 135 118 72l52 45 48-37 98 82H44Z" fill="#5DB58C"/><path d="M44 151q70-27 136 0t136 0v11H44Z" fill="#3C8AC5"/><path d="M91 147q29-18 61-4" fill="none" stroke="#fff" stroke-width="5"/>') },
  { name: '航班行程卡', data: productScene('#4C97FF', '<path d="M70 75h220v82H70z" fill="#F4F7FB" stroke="#B7C5D8" stroke-width="3"/><path d="M180 75v82" stroke="#B7C5D8" stroke-dasharray="7 6"/><text x="91" y="108" font-size="27" font-weight="700" fill="#17233C">SHA</text><text x="213" y="108" font-size="27" font-weight="700" fill="#17233C">CAN</text><path d="M139 119h80m-9-8 12 8-12 8" stroke="#4C97FF" stroke-width="4" fill="none"/><text x="91" y="143" font-size="12" fill="#66758A">08:35</text><text x="238" y="143" font-size="12" fill="#66758A">11:10</text>') },
  { name: '地图路线卡', data: productScene('#59C059', '<path d="M52 50 122 35l64 18 68-18 55 17v110l-55-17-68 18-64-18-70 15Z" fill="#EDF3E9"/><path d="m122 35v110m64-92v110m68-128v110" stroke="#C1CFBA" stroke-width="3"/><path d="M82 128q55-86 111-22t86-29" fill="none" stroke="#4C97FF" stroke-width="7" stroke-dasharray="9 7"/><circle cx="82" cy="128" r="10" fill="#59C059"/><path d="m279 65 13 13-13 22-13-22Z" fill="#FF6680"/>') },
  { name: '优惠活动横幅', data: productScene('#FF6680', '<rect x="46" y="49" width="268" height="112" rx="18" fill="#FF6680"/><circle cx="271" cy="105" r="45" fill="#FFCF3F"/><text x="68" y="93" font-size="17" font-weight="700" fill="#fff">限时好价</text><text x="66" y="128" font-size="33" font-weight="800" fill="#fff">满 199 减 40</text><path d="m268 83 8 15 17 2-12 12 3 17-16-8-15 8 3-17-12-12 17-2Z" fill="#fff"/>') },
  { name: '午夜歌单封面', data: productScene('#9966FF', '<rect x="74" y="37" width="212" height="130" rx="8" fill="#171B35"/><circle cx="180" cy="102" r="48" fill="#6B52C7"/><circle cx="180" cy="102" r="27" fill="#171B35"/><circle cx="180" cy="102" r="7" fill="#fff"/><path d="M92 139c34-18 54-8 82 1s55 10 94-9" fill="none" stroke="#55D8FF" stroke-width="4"/><circle cx="253" cy="61" r="8" fill="#FFCF3F"/>') },
  { name: '晨光歌单封面', data: productScene('#FFAB19', '<rect x="74" y="37" width="212" height="130" rx="8" fill="#FFE1A8"/><circle cx="180" cy="101" r="43" fill="#FF8B5C"/><path d="M74 142q45-36 89 0t85 0 38 0v25H74Z" fill="#4D9B86"/><path d="M111 67h35M111 78h53" stroke="#17233C" stroke-width="5"/>') },
  { name: '歌单拼贴封面', data: productScene('#4C97FF', '<rect x="75" y="38" width="98" height="61" fill="#4C97FF"/><rect x="187" y="38" width="98" height="61" fill="#FF6680"/><rect x="75" y="107" width="98" height="60" fill="#FFCF3F"/><rect x="187" y="107" width="98" height="60" fill="#59C059"/><circle cx="236" cy="69" r="18" fill="#fff" opacity=".8"/><path d="m112 131 12 14 21-25" fill="none" stroke="#17233C" stroke-width="7"/>') },
  { name: '播客节目封面', data: productScene('#9966FF', '<rect x="76" y="37" width="208" height="130" rx="12" fill="#EFE7FF"/><circle cx="180" cy="95" r="39" fill="#9966FF"/><rect x="167" y="69" width="26" height="54" rx="13" fill="#fff"/><path d="M148 101a32 32 0 0 0 64 0m-32 32v17m-22 0h44" fill="none" stroke="#17233C" stroke-width="5"/><path d="M99 73v45m162-45v45" stroke="#9966FF" stroke-width="6"/>') },
  { name: '课程封面卡', data: productScene('#4C97FF', '<rect x="52" y="43" width="256" height="116" rx="14" fill="#E7F2FF"/><rect x="71" y="61" width="90" height="80" rx="9" fill="#4C97FF"/><path d="m91 111 20-20 15 15 17-23" fill="none" stroke="#fff" stroke-width="7"/><text x="181" y="87" font-size="13" fill="#66758A">前端入门</text><text x="181" y="116" font-size="23" font-weight="700" fill="#17233C">从界面到代码</text><rect x="181" y="130" width="74" height="8" rx="4" fill="#B8CDE8"/>') },
  { name: '校园活动海报', data: productScene('#FF6680', '<rect x="77" y="35" width="206" height="132" rx="8" fill="#17233C"/><circle cx="239" cy="69" r="24" fill="#FFCF3F"/><text x="99" y="80" font-size="12" fill="#8FE8FF">CAMPUS DAY</text><text x="98" y="113" font-size="29" font-weight="800" fill="#fff">校园创意节</text><text x="99" y="140" font-size="12" fill="#fff">周六 14:00 · 中心广场</text><path d="M77 154h206" stroke="#FF6680" stroke-width="10"/>') },
  { name: '图书馆推荐卡', data: productScene('#59C059', '<rect x="55" y="46" width="72" height="110" rx="5" fill="#335F54"/><rect x="143" y="38" width="70" height="118" rx="5" fill="#FFCF3F"/><rect x="229" y="55" width="76" height="101" rx="5" fill="#F1A2A2"/><path d="M70 70h42m46-8h40m46 18h46" stroke="#fff" stroke-width="5"/><path d="M70 132h42m46 0h40m46 0h46" stroke="#fff" stroke-width="3"/>') },
  { name: '社团招新卡', data: productScene('#FFAB19', '<rect x="46" y="47" width="268" height="111" rx="14" fill="#FFF0CF"/><circle cx="105" cy="103" r="37" fill="#FFAB19"/><path d="M88 107q17-31 34 0m-37 12h41" fill="none" stroke="#17233C" stroke-width="6"/><text x="162" y="89" font-size="13" fill="#66758A">一起做有趣的事</text><text x="162" y="119" font-size="24" font-weight="700" fill="#17233C">设计社招新</text><rect x="162" y="132" width="81" height="8" rx="4" fill="#FFAB19"/>') },
  { name: '用户头像·短发', data: productScene('#4C97FF', '<circle cx="180" cy="99" r="63" fill="#D9ECFF"/><circle cx="180" cy="89" r="31" fill="#F3C6A7"/><path d="M149 88q2-42 37-39 31 4 26 43-18-7-30-27-12 17-33 23Z" fill="#17233C"/><path d="M122 163q8-42 58-42t58 42" fill="#4C97FF"/>') },
  { name: '用户头像·长发', data: productScene('#FF6680', '<circle cx="180" cy="99" r="63" fill="#FFE0E6"/><path d="M143 96q-5-52 38-52 42 0 37 55v44h-75Z" fill="#55392F"/><circle cx="180" cy="89" r="30" fill="#F3C6A7"/><path d="M123 163q9-42 57-42t57 42" fill="#FF6680"/>') },
  { name: '群聊封面', data: productScene('#59C059', '<circle cx="133" cy="91" r="34" fill="#BFE2FF"/><circle cx="227" cy="91" r="34" fill="#FFE0E6"/><path d="M83 158q8-44 50-44t50 44m-6 0q8-44 50-44t50 44" fill="#4C97FF"/><circle cx="180" cy="72" r="30" fill="#FFF0CF"/><path d="M137 156q6-55 43-55t43 55" fill="#59C059"/>') },
  { name: '订单状态卡', data: productScene('#59C059', '<circle cx="112" cy="99" r="42" fill="#DDF5DD"/><path d="m91 99 15 15 29-33" fill="none" stroke="#36A852" stroke-width="9"/><text x="176" y="91" font-size="14" fill="#66758A">订单已完成</text><text x="176" y="119" font-size="23" font-weight="700" fill="#17233C">感谢你的购买</text><rect x="176" y="133" width="94" height="9" rx="4.5" fill="#CFD8E3"/>') },
  { name: '数据趋势图', data: productScene('#4C97FF', '<path d="M55 151h250M55 53v98" stroke="#CAD4E1" stroke-width="3"/><path d="m67 132 49-37 42 18 50-54 40 27 47-42" fill="none" stroke="#4C97FF" stroke-width="7"/><path d="M67 132 116 95l42 18 50-54 40 27 47-42v107H67Z" fill="#4C97FF" opacity=".12"/><g fill="#4C97FF"><circle cx="116" cy="95" r="7"/><circle cx="208" cy="59" r="7"/><circle cx="295" cy="44" r="7"/></g>') },
  { name: '空状态插图', data: productScene('#4C97FF', '<rect x="91" y="65" width="178" height="86" rx="11" fill="#EFF4FA" stroke="#BAC8D8" stroke-width="3"/><path d="m121 126 34-31 26 22 28-33 31 42" fill="none" stroke="#4C97FF" stroke-width="6"/><circle cx="133" cy="88" r="11" fill="#FFCF3F"/><path d="M148 160h64" stroke="#BAC8D8" stroke-width="6"/>') },
  { name: '加载进度插图', data: productScene('#9966FF', '<circle cx="180" cy="94" r="49" fill="none" stroke="#E6DEFA" stroke-width="15"/><path d="M180 45a49 49 0 0 1 46 66" fill="none" stroke="#9966FF" stroke-width="15" stroke-linecap="round"/><circle cx="180" cy="94" r="8" fill="#9966FF"/><rect x="118" y="157" width="124" height="8" rx="4" fill="#D7DDE7"/>') },
  { name: '消息通知插图', data: productScene('#FFAB19', '<path d="M129 137h102l-13-22V84a38 38 0 0 0-76 0v31Z" fill="#FFF0CF" stroke="#17233C" stroke-width="4"/><path d="M165 143q15 22 30 0" fill="none" stroke="#17233C" stroke-width="5"/><circle cx="223" cy="62" r="19" fill="#FF6680"/><text x="217" y="69" font-size="18" font-weight="700" fill="#fff">3</text>') }
];

const VARIANTS = {
  heading: [
    { id: 'hero', name: '主标题', desc: '页面最醒目的标题', mini: 'H1', props: { text: '欢迎来到我的应用', size: 32, color: '#1F2A24', align: 'left' } },
    { id: 'section', name: '区块标题', desc: '用于内容区域', mini: 'H2', props: { text: '精选内容', size: 22, color: '#1F2A24', align: 'left' } },
    { id: 'eyebrow', name: '小标签标题', desc: '适合模块提示', mini: 'Aa', props: { text: '为你推荐', size: 12, color: '#2F6B4F', align: 'left' } },
    { id: 'center', name: '居中标题', desc: '适合欢迎页', mini: '≡', props: { text: '开始探索', size: 27, color: '#1F2A24', align: 'center' } },
    { id: 'display', name: '超大标题', desc: '启动页与专题封面', mini: 'Aa', props: { text: '创造新世界', size: 42, color: '#1F2A24' } },
    { id: 'serif', name: '衬线标题', desc: '编辑感与作品展示', mini: 'Tt', props: { text: '一份新的灵感', size: 29, color: '#1F2A24' } },
    { id: 'underline', name: '下划线标题', desc: '突出当前章节', mini: 'T̲', props: { text: '今日精选', size: 24, color: '#1F2A24' } },
    { id: 'overline', name: '上标标题', desc: '栏目和页面导语', mini: '01', props: { text: '最新动态', size: 20, color: '#2F6B4F' } },
    { id: 'inverse', name: '反白标题', desc: '深色标题横幅', mini: '▣', props: { text: '特别企划', size: 24, color: '#FFFFFF', background: '#1F2A24', radius: 8 } },
    { id: 'marker', name: '色块标题', desc: '强调关键词', mini: '▰', props: { text: '值得关注', size: 23, color: '#1F2A24', background: '#F1D59D', radius: 4 } }
  ],
  text: [
    { id: 'body', name: '正文', desc: '常规说明文字', mini: '☷', props: { text: '在这里写下你的内容。', size: 15, color: '#66716A' } },
    { id: 'lead', name: '引导文案', desc: '更醒目的介绍', mini: '¶', props: { text: '用自己的想法，搭建一款小应用。', size: 18, color: '#1F2A24' } },
    { id: 'caption', name: '辅助说明', desc: '时间、提示与注释', mini: '···', props: { text: '点击下方按钮继续', size: 12, color: '#66716A' } },
    { id: 'quote', name: '引用文本', desc: '展示一句观点', mini: '“”', props: { text: '好设计从清晰的表达开始。', size: 19, color: '#1F2A24' } },
    { id: 'note', name: '提示说明', desc: '帮助用户理解操作', mini: 'ⓘ', props: { text: '你可以随时修改这里的内容。', size: 13, color: '#2F6B4F', background: '#EAF0E8', radius: 8 } },
    { id: 'label', name: '小标签', desc: '分类和状态文字', mini: 'TAG', props: { text: '新内容', size: 11, color: '#2F6B4F', background: '#EAF0E8', radius: 99 } },
    { id: 'number', name: '数字强调', desc: '展示数据和统计', mini: '42', props: { text: '1,280', size: 34, color: '#1F2A24' } },
    { id: 'muted', name: '弱化文本', desc: '次要信息与日期', mini: 'abc', props: { text: '更新于今天', size: 12, color: '#66716A' } },
    { id: 'centered', name: '居中文案', desc: '空状态与欢迎语', mini: '≡', props: { text: '这里有无限可能', size: 16, color: '#66716A', align: 'center' } },
    { id: 'list', name: '列表文案', desc: '要点和步骤', mini: '•', props: { text: '• 清晰的结构\n• 易读的内容\n• 自然的交互', size: 14, color: '#1F2A24' } }
  ],
  button: [
    { id: 'square', name: '方形按钮', desc: '利落的直角样式', mini: '▭', props: { text: '立即开始', radius: 0, background: '#2F6B4F', color: '#FFFFFF' } },
    { id: 'rounded', name: '圆角按钮', desc: '常用主操作', mini: '▢', props: { text: '继续', radius: 10, background: '#2F6B4F', color: '#FFFFFF' } },
    { id: 'pill', name: '胶囊按钮', desc: '柔和的圆形边角', mini: '⬭', props: { text: '了解更多', radius: 99, background: '#2F6B4F', color: '#FFFFFF' } },
    { id: 'outline', name: '描边按钮', desc: '适合次要操作', mini: '▣', props: { text: '查看详情', radius: 9, background: '#FFFFFF', color: '#2F6B4F' } },
    { id: 'text-button', name: '文字按钮', desc: '轻量导航操作', mini: '→', props: { text: '前往我的 →', radius: 0, background: '#FFFFFF', color: '#2F6B4F', action: 'page', targetPage: 'profile' } },
    { id: 'dark', name: '深色按钮', desc: '稳重的主操作', mini: '■', props: { text: '查看作品', radius: 8, background: '#1F2A24', color: '#FFFFFF' } },
    { id: 'teal', name: '墨绿按钮', desc: '适合确认操作', mini: '■', props: { text: '完成设置', radius: 10, background: '#2F6B4F', color: '#FFFFFF' } },
    { id: 'soft', name: '浅色按钮', desc: '柔和的次要操作', mini: '▤', props: { text: '稍后再说', radius: 10, background: '#F5F3EF', color: '#1F2A24' } },
    { id: 'wide', name: '通栏按钮', desc: '表单底部常用', mini: '▬', props: { text: '提交', radius: 10, background: '#2F6B4F', color: '#FFFFFF' } },
    { id: 'circle', name: '圆形按钮', desc: '图标式快捷操作', mini: '●', props: { text: '+', radius: 99, background: '#2F6B4F', color: '#FFFFFF', size: 25 } },
    { id: 'icon-left', name: '带图标按钮', desc: '操作含义更清晰', mini: '★', props: { text: '★ 收藏', radius: 9, background: '#F1D59D', color: '#1F2A24' } },
    { id: 'ghost', name: '轻描边按钮', desc: '低权重辅助操作', mini: '□', props: { text: '了解详情', radius: 8, background: '#FFFFFF', color: '#2F6B4F' } },
    { id: 'danger', name: '警示按钮', desc: '需谨慎的操作', mini: '!', props: { text: '删除内容', radius: 8, background: '#B95045', color: '#FFFFFF' } },
    { id: 'gradient', name: '渐变按钮', desc: '活动与强调入口', mini: '◩', props: { text: '立即体验', radius: 12, background: '#2F6B4F', color: '#FFFFFF' } },
    { id: 'pixel', name: '像素按钮', desc: '复古游戏风格', mini: '▦', props: { text: '开始游戏', radius: 0, background: '#425B98', color: '#FFFFFF' } },
    { id: 'neon', name: '霓虹按钮', desc: '高对比科技风格', mini: '✧', props: { text: '进入空间', radius: 7, background: '#14182C', color: '#75F4E0' } },
    { id: 'glass', name: '玻璃按钮', desc: '透明轻盈的入口', mini: '◻', props: { text: '探索更多', radius: 12, background: '#DDEAF4', color: '#23415C' } },
    { id: 'shadow', name: '立体按钮', desc: '有按压感的操作', mini: '▰', props: { text: '确认选择', radius: 8, background: '#D9A441', color: '#1F2A24' } },
    { id: 'underline', name: '下划线按钮', desc: '简约文字入口', mini: 'T̲', props: { text: '查看全部 →', radius: 0, background: '#FFFFFF', color: '#1F2A24' } },
    { id: 'outline-double', name: '双线按钮', desc: '复古编辑风格', mini: '▣', props: { text: '阅读详情', radius: 0, background: '#FFFFFF', color: '#1F2A24' } }
    ,{ id: 'compact', name: '紧凑操作', desc: '工具栏与列表操作', mini: '▭', props: { text: '编辑', radius: 5, background: '#2F6B4F', color: '#FFFFFF' } }
    ,{ id: 'floating', name: '悬浮操作', desc: '突出的快捷入口', mini: '＋', props: { text: '+', radius: 99, background: '#2F6B4F', color: '#FFFFFF', size: 24 } }
    ,{ id: 'brutalist', name: '粗线按钮', desc: '醒目的硬朗操作', mini: '▣', props: { text: '立即加入', radius: 0, background: '#D9A441', color: '#171E30' } }
    ,{ id: 'link-arrow', name: '箭头链接', desc: '内容详情与导航', mini: '→', props: { text: '阅读更多  ↗', radius: 0, background: '#FFFFFF', color: '#2F6B4F' } }
    ,{ id: 'loading', name: '加载状态', desc: '异步任务反馈', mini: '◌', props: { text: '处理中', radius: 8, background: '#E8EDF6', color: '#43546D', visualState: 'disabled' } }
  ],
  image: [
    ...BUILTINS.map((asset, index) => ({ id: `builtin-${index}`, name: asset.name, desc: '内置设计素材', mini: '▧', props: { src: asset.data, text: asset.name } })),
    { id: 'upload', name: '我的图片', desc: '从素材页上传', mini: '↑', props: { src: '', text: '图片说明' } }
  ],
  divider: [
    { id: 'line', name: '实线', desc: '清晰分隔内容', mini: '―', props: {} },
    { id: 'dashed', name: '虚线', desc: '轻量分隔', mini: '┄', props: {} },
    { id: 'wave', name: '曲线', desc: '柔和的波浪线', mini: '﹏', props: {} },
    { id: 'dotted', name: '点线', desc: '轻量节奏分隔', mini: '···', props: {} },
    { id: 'thick', name: '粗线', desc: '强调内容区块', mini: '━', props: {} },
    { id: 'short', name: '短线', desc: '标题下方装饰', mini: '—', props: {} },
    { id: 'gradient', name: '渐变线', desc: '过渡分隔效果', mini: '▰', props: {} },
    { id: 'double', name: '双线', desc: '章节边界', mini: '═', props: {} }
  ],
  card: [
    { id: 'basic', name: '基础卡片', desc: '白色内容区域', mini: '▣', props: { text: '卡片标题', background: '#FFFFFF', radius: 12 } },
    { id: 'outline', name: '描边卡片', desc: '突出信息边界', mini: '□', props: { text: '项目概览', background: '#FFFFFF', radius: 10 } },
    { id: 'profile', name: '人物卡片', desc: '头像与简介组合', mini: '◉', props: { text: '我的个人介绍', background: '#F5F3EF', radius: 12 } },
    { id: 'accent', name: '强调卡片', desc: '侧边重点标记', mini: '▌', props: { text: '今日推荐', background: '#F5F3EF', radius: 10 } },
    { id: 'shadow', name: '浮起卡片', desc: '层级清晰的内容块', mini: '▣', props: { text: '最新消息', background: '#FFFFFF', radius: 14 } },
    { id: 'stat', name: '数据卡片', desc: '展示关键指标', mini: '42', props: { text: '今日访问 · 1,280', background: '#FFFFFF', radius: 12 } },
    { id: 'feature', name: '功能卡片', desc: '突出核心功能', mini: '✦', props: { text: '探索新功能', background: '#EAF0E8', radius: 14 } },
    { id: 'dark', name: '深色卡片', desc: '深底重点内容', mini: '■', props: { text: '会员专区', background: '#1F2A24', color: '#FFFFFF', radius: 12 } },
    { id: 'warm', name: '暖色卡片', desc: '活动和精选推荐', mini: '▨', props: { text: '本周精选', background: '#F4E8DC', radius: 14 } },
    { id: 'horizontal', name: '横向卡片', desc: '列表中的紧凑信息', mini: '▱', props: { text: '继续阅读', background: '#FFFFFF', radius: 10 } },
    { id: 'ticket', name: '票券卡片', desc: '优惠与兑换入口', mini: '⌁', props: { text: '专属礼遇', background: '#F5F3EF', radius: 14 } },
    { id: 'minimal', name: '极简卡片', desc: '无边界的内容区', mini: '□', props: { text: '内容概览', background: '#FFFFFF', radius: 0 } },
    { id: 'gradient', name: '渐变卡片', desc: '醒目的推广区域', mini: '◩', props: { text: '发现更多可能', background: '#EAF0E8', radius: 16 } }
  ],
  layout: [
    { id: 'two', name: '双栏布局', desc: '并排放置两个或更多组件', mini: '▥', props: { text: '双栏布局', columns: 2, gap: 10, padding: 10, background: '#FFFFFF', radius: 8 } },
    { id: 'three', name: '三栏布局', desc: '指标、图标和小卡片', mini: '▤', props: { text: '三栏布局', columns: 3, gap: 7, padding: 8, background: '#FFFFFF', radius: 8 } },
    { id: 'stack', name: '纵向容器', desc: '把相关内容组合在一起', mini: '☷', props: { text: '纵向容器', columns: 1, gap: 8, padding: 14, background: '#F5F3EF', radius: 12 } },
    { id: 'split', name: '主次分栏', desc: '左窄右宽的信息布局', mini: '▯▭', props: { text: '主次分栏', columns: 2, gap: 10, padding: 10, background: '#FFFFFF', radius: 8 } },
    { id: 'panel', name: '内容面板', desc: '有背景的组合区域', mini: '▣', props: { text: '内容面板', columns: 1, gap: 9, padding: 16, background: '#EAF0E8', radius: 14 } }
  ],
  input: [
    { id: 'rounded', name: '圆角输入框', desc: '通用表单输入', mini: '▭', props: { text: '请输入内容', radius: 9, inputType: 'text' } },
    { id: 'search', name: '搜索框', desc: '内容检索入口', mini: '⌕', props: { text: '搜索你感兴趣的内容', radius: 99, background: '#F5F3EF', inputType: 'search' } },
    { id: 'underline', name: '下划线输入', desc: '简洁的表单风格', mini: 'T̲', props: { text: '输入你的名字', radius: 0, inputType: 'text' } },
    { id: 'filled', name: '填充输入框', desc: '柔和的内容区域', mini: '▤', props: { text: '写点什么吧', radius: 8, background: '#EAF0E8', inputType: 'text' } },
    { id: 'email', name: '邮箱输入框', desc: '联系与订阅表单', mini: '@', props: { text: '你的邮箱地址', radius: 8, inputType: 'email' } },
    { id: 'password', name: '密码输入框', desc: '登录与注册界面', mini: '••', props: { text: '输入密码', radius: 8, inputType: 'password' } },
    { id: 'dark', name: '深色输入框', desc: '深色主题界面', mini: '■', props: { text: '输入内容', radius: 8, background: '#1F2A24', color: '#FFFFFF', inputType: 'text' } }
  ],
  switch: [
    { id: 'teal', name: '墨绿开关', desc: '默认开启', mini: '◉', props: { text: '消息通知', checked: true, background: '#2F6B4F' } },
    { id: 'orange', name: '琥珀开关', desc: '醒目的设置项', mini: '◉', props: { text: '自动同步', checked: true, background: '#D9A441' } },
    { id: 'off', name: '关闭开关', desc: '默认关闭', mini: '○', props: { text: '深色模式', checked: false, background: '#66716A' } },
    { id: 'compact', name: '紧凑开关', desc: '列表中的轻量控件', mini: '◉', props: { text: '接收提醒', checked: true, background: '#425B98' } }
  ]
};

const TYPE_LABELS = { heading: '标题', text: '文本', button: '按钮', image: '图片', divider: '分隔线', card: '卡片', layout: '布局', input: '输入框', switch: '开关' };
const CARD_DETAILS = { basic: '在这里介绍内容。', outline: '为重要信息留出空间。', profile: '在这里介绍自己，展示个人资料。', accent: '值得关注的精选内容。', shadow: '及时了解最新消息。', stat: '比昨天有新的增长。', feature: '简单几步，探索更多可能。', dark: '解锁更多专属内容。', warm: '本周值得一看的内容。', horizontal: '从上次的位置继续。', ticket: '领取你的专属权益。', minimal: '内容简洁，一目了然。', gradient: '从这里开始新的探索。' };
const MOTIONS = [['none', '无动画', '保持静止'], ['fade', '淡入', '柔和出现'], ['rise', '上滑', '从下方进入'], ['pop', '弹出', '轻快放大'], ['slide-left', '左侧滑入', '横向移动'], ['slide-right', '右侧滑入', '横向移动'], ['drop', '向下落入', '从上方进入'], ['zoom', '缩放进入', '由大变小'], ['blur', '清晰浮现', '模糊到清晰'], ['rotate', '轻微旋入', '旋转入场'], ['bounce', '弹跳进入', '有弹性的移动']];
const EFFECTS = [['none', '无效果', '保持原样'], ['soft-shadow', '柔和阴影', '增加层次'], ['deep-shadow', '深色投影', '突出悬浮感'], ['glow', '彩色发光', '适合强调入口'], ['glass', '玻璃质感', '半透明与背景模糊'], ['gradient', '渐变表面', '由主色过渡到效果色'], ['outline', '强调描边', '清晰划出边界']];
let activePage = 'home';
let pageHistory = [];
let selected = null;
let clipboard = null;
let contextTarget = null;
let selectedCategory = 'button';
let cutoutAssetIndex = -1;
let componentCategoryOpen = false;
let preview = false;
let history = [];
let future = [];
let codeMode = 'css';
let state = load();

function makeItem(type, variantId, page = activePage) {
  const variant = VARIANTS[type].find(v => v.id === variantId) || VARIANTS[type][0];
  const base = { id: uid(), type, page, layoutId: null, variant: variant.id, text: '', detail: '', color: '#1F2A24', background: '#FFFFFF', size: type === 'button' ? 14 : 16, radius: 0, align: 'left', width: 100, height: 0, src: '', href: '#', action: type === 'button' ? 'toast' : 'none', prompt: '操作成功', targetPage: 'profile', requiresInput: false, animation: 'none', animationDuration: 600, animationDelay: 0, animationEasing: 'ease', animationTrigger: 'enter', effect: 'none', effectColor: '#2F6B4F', opacity: 100, visualState: 'default', inputType: 'text', checked: false, columns: 1, gap: 10, padding: 10 };
  Object.assign(base, clone(variant.props)); if (type === 'card') base.detail = CARD_DETAILS[variant.id] || ''; return base;
}

function initialState() {
  const homeTitle = makeItem('heading', 'hero', 'home');
  const homeText = makeItem('text', 'body', 'home'); homeText.text = '选择左侧预设，拼出你自己的手机界面。';
  const homeButton = makeItem('button', 'rounded', 'home'); homeButton.text = '看看发现页'; homeButton.action = 'page'; homeButton.targetPage = 'discover';
  const homeCard = makeItem('card', 'accent', 'home'); homeCard.text = '从一个组件开始';
  const discoverTitle = makeItem('heading', 'section', 'discover'); discoverTitle.text = '发现灵感';
  const discoverText = makeItem('text', 'body', 'discover'); discoverText.text = '这里可以放你的作品、内容或功能入口。';
  const profileTitle = makeItem('heading', 'section', 'profile'); profileTitle.text = '关于我';
  const profileCard = makeItem('card', 'profile', 'profile');
  return { name: '未命名项目', pages: [...DEFAULT_PAGES], pageTitles: clone(PAGE_LABELS), pageIcons: clone(PAGE_ICONS), navStyle: clone(DEFAULT_NAV_STYLE), headerActions: { home: { icon: '•••', action: 'menu', prompt: '欢迎来到首页', targetPage: 'discover' }, discover: { icon: '•••', action: 'menu', prompt: '这里是发现页', targetPage: 'profile' }, profile: { icon: '•••', action: 'menu', prompt: '这里是我的页面', targetPage: 'home' } }, items: [homeTitle, homeText, homeButton, homeCard, discoverTitle, discoverText, profileTitle, profileCard], assets: [], styled: false };
}
const PAGE_TEMPLATES = [
  { id: 'portfolio', name: '音乐播放器', desc: '歌单、正在播放与收藏路径', icon: '♪', cover: 11 },
  { id: 'shop', name: '商品详情', desc: '商品展示、价格与购买入口', icon: '◇', cover: 14 },
  { id: 'dashboard', name: '校园助手', desc: '课程、待办与校园服务入口', icon: '▥', cover: 15 },
  { id: 'event', name: '校园活动', desc: '活动介绍、报名与完成状态', icon: '☼', cover: 16 },
  { id: 'profile', name: '创作者主页', desc: '头像、简介与作品数据', icon: '◉', cover: 19 },
  { id: 'notes', name: '内容阅读', desc: '封面、文章与收藏路径', icon: '☷', cover: 17 },
  { id: 'signup', name: '注册页面', desc: '输入框、开关与提交交互', icon: '✚', cover: 24 }
];
function composeTemplate(id, page) {
  const items = [];
  const add = (type, variant, props = {}, layoutId = null) => { const item = Object.assign(makeItem(type, variant, page), props); item.layoutId = layoutId; items.push(item); return item; };
  const group = (variant, children) => { const layout = add('layout', variant); for (const [type, style, props] of children) add(type, style, props, layout.id); return layout; };
  if (id === 'portfolio') { add('image', 'builtin-11'); add('heading', 'section', { text: '城市夜行' }); add('text', 'body', { text: '为专注时刻准备的电子与氛围音乐。' }); group('two', [['card', 'stat', { text: '12 首', detail: '完整歌单' }], ['card', 'feature', { text: '42 分钟', detail: '连续播放时长' }]]); add('button', 'dark', { text: '▶ 立即播放', action: 'toast', prompt: '开始播放《城市夜行》' }); }
  if (id === 'shop') { add('image', 'builtin-0'); add('heading', 'section', { text: '轻量缓震跑鞋' }); add('text', 'body', { text: '透气鞋面与稳定缓震，适合日常通勤和轻运动。' }); group('two', [['card', 'stat', { text: '¥ 399', detail: '会员价格' }], ['card', 'warm', { text: '限时优惠', detail: '今日下单免运费' }]]); add('button', 'wide', { text: '加入购物袋', action: 'toast', prompt: '已加入购物袋' }); }
  if (id === 'dashboard') { add('heading', 'section', { text: '今天的校园' }); add('text', 'caption', { text: '课程、任务和服务集中查看' }); group('three', [['card', 'stat', { text: '3', detail: '今日课程' }], ['card', 'stat', { text: '2', detail: '待交作业' }], ['card', 'stat', { text: '1', detail: '校园活动' }]]); add('image', 'builtin-15'); add('card', 'accent', { text: '前端基础 · 14:00', detail: '教学楼 A302，记得提前签到。' }); }
  if (id === 'event') { add('image', 'builtin-16'); add('heading', 'hero', { text: '校园创意节' }); add('text', 'lead', { text: '展示作品、认识伙伴，把有趣的想法变成现实。' }); add('card', 'ticket', { text: '本周六 · 14:00', detail: '中心广场，报名后可收到日程提醒。' }); add('button', 'gradient', { text: '立即报名', action: 'modal', prompt: '报名成功，期待见到你！' }); }
  if (id === 'profile') { add('heading', 'center', { text: '我的主页' }); add('card', 'profile', { text: '你好，我是 Alex', detail: '喜欢记录生活、分享作品和探索新事物。' }); group('two', [['card', 'stat', { text: '36', detail: '动态' }], ['card', 'stat', { text: '128', detail: '收藏' }]]); add('button', 'teal', { text: '编辑资料', action: 'toast', prompt: '这里可以设置编辑资料流程' }); }
  if (id === 'notes') { add('heading', 'serif', { text: '阅读清单' }); add('text', 'caption', { text: '为好内容留一个位置' }); add('image', 'builtin-11'); add('card', 'minimal', { text: '从一杯咖啡开始', detail: '生活里细小而值得记录的瞬间。' }); add('divider', 'double'); add('card', 'minimal', { text: '设计的日常', detail: '重新观察我们熟悉的界面。' }); add('button', 'underline', { text: '查看全部 →', action: 'toast', prompt: '已显示全部内容' }); }
  if (id === 'signup') { add('heading', 'hero', { text: '创建你的账号' }); add('text', 'body', { text: '填写基本信息，开始探索。' }); add('input', 'email', { text: '邮箱地址' }); add('input', 'password', { text: '设置密码' }); add('switch', 'teal', { text: '接收产品更新', checked: true }); add('button', 'wide', { text: '创建账号', action: 'modal', prompt: '这里可以连接注册流程。' }); add('text', 'caption', { text: '继续即表示你了解此页面的示例交互。' }); }
  return items;
}
const TEMPLATE_FLOWS = {
  portfolio: ['作品详情', '联系我'], shop: ['购物袋', '下单完成'], dashboard: ['趋势详情', '分析完成'],
  event: ['报名信息', '报名成功'], profile: ['编辑资料', '保存完成'], notes: ['文章详情', '收藏成功'], signup: ['确认信息', '注册完成']
};
const FLOW_COPY = {
  portfolio: ['这个项目从需求整理到视觉实现，记录了完整的设计过程。', '联系方式已展示。你可以把按钮改成邮件或网页链接。'],
  shop: ['核对商品与收货信息，然后提交订单。', '订单已提交。这里可展示订单编号和后续操作。'],
  dashboard: ['查看访问、收藏和分享的变化趋势。', '分析已生成。可继续扩充图表和筛选状态。'],
  event: ['填写报名信息，确认参与本次活动。', '报名成功。可加入活动时间和地点提醒。'],
  profile: ['修改昵称、简介和展示资料。', '资料已保存。返回主页查看更新后的内容。'],
  notes: ['阅读正文，继续收藏或分享。', '文章已收藏。可返回阅读列表继续浏览。'],
  signup: ['检查邮箱和账号信息，确认创建。', '账号已创建。可继续设计欢迎和个人资料页。']
};
function composeFlowPage(templateId, page, title, index, previous, next) {
  const add = (type, variant, props = {}) => Object.assign(makeItem(type, variant, page), props);
  const content = [add('heading', index === 1 ? 'section' : 'center', { text: title }), add('text', 'body', { text: FLOW_COPY[templateId][index - 1] })];
  if (index === 1) {
    if (['shop', 'event', 'signup', 'profile'].includes(templateId)) content.push(add('input', 'rounded', { text: templateId === 'shop' ? '收货信息' : '请输入信息' }));
    if (templateId === 'notes' || templateId === 'portfolio') content.push(add('image', `builtin-${templateId === 'notes' ? 11 : 22}`));
    if (templateId === 'dashboard') content.push(add('image', 'builtin-16'));
    const labels = { portfolio: '查看联系方式', shop: '确认下单', dashboard: '完成分析', event: '确认报名', profile: '保存资料', notes: '收藏文章', signup: '创建账号' };
    content.push(add('button', 'wide', { text: labels[templateId], action: 'page', targetPage: next, requiresInput: ['shop', 'event', 'signup', 'profile'].includes(templateId), animation: 'rise' }));
  } else content.push(add('card', 'feature', { text: '已完成', detail: '这是可编辑的流程结果状态。' }));
  content.push(add('button', 'text-button', { text: '← 返回上一步', action: 'page', targetPage: previous }));
  return content;
}
function createTemplatePage(templateId) {
  const template = PAGE_TEMPLATES.find(entry => entry.id === templateId); if (!template) return;
  commit(); const pages = [0, 1, 2].map(() => `page-${uid()}`); const names = [template.name, ...TEMPLATE_FLOWS[templateId]];
  state.pageModes ||= {}; state.pageParent ||= {};
  const templateIcons = { portfolio: 'library', shop: 'cart', dashboard: 'library', event: 'calendar', profile: 'person', notes: 'library', signup: 'person' };
  pages.forEach((page, index) => { state.pages.push(page); state.pageTitles[page] = names[index]; state.pageIcons[page] = `icon:${templateIcons[templateId]}`; state.pageIconSettings ||= {}; state.pageIconSettings[page] = clone(DEFAULT_NAV_ICON_STYLE); state.pageModes[page] = index === 0 ? 'tab' : 'detail'; if (index) state.pageParent[page] = pages[index - 1]; state.headerActions[page] = { icon: '•••', action: 'menu', prompt: names[index], targetPage: pages[index === 2 ? 0 : index + 1] }; });
  const first = composeTemplate(templateId, pages[0]); let primary = first.find(item => item.type === 'button');
  if (!primary) { primary = makeItem('button', 'wide', pages[0]); primary.text = '查看详情'; first.push(primary); }
  primary.action = 'page'; primary.targetPage = pages[1]; primary.animation = 'rise';
  state.items.push(...first, ...composeFlowPage(templateId, pages[1], names[1], 1, pages[0], pages[2]), ...composeFlowPage(templateId, pages[2], names[2], 2, pages[1], pages[0]));
  activePage = pages[0]; selected = null; update(); editorToast(`已添加${template.name}流程：3 个可跳转页面`);
}

function validProject(value) {
  return value && typeof value.name === 'string' && Array.isArray(value.items) && Array.isArray(value.assets) && value.items.every(item => item && TYPE_LABELS[item.type]);
}
function normalizeProject(value) {
  if (!validProject(value)) return initialState();
  const result = clone(value);
  if (['我的第一个应用', '我的第一个页面'].includes(result.name)) result.name = '未命名项目';
  result.pages = Array.isArray(result.pages) && result.pages.length ? [...new Set(result.pages.filter(page => typeof page === 'string'))] : [...DEFAULT_PAGES];
  result.pageTitles = { ...PAGE_LABELS, ...(result.pageTitles || {}) };
  result.pageIcons = { ...PAGE_ICONS, ...(result.pageIcons || {}) };
  for (const page of result.pages) result.pageIcons[page] = safeNavIcon(result.pageIcons[page]);
  result.pageIconSettings = Object.fromEntries(result.pages.map(page => { const style = result.pageIconSettings?.[page] || {}; return [page, { size: Math.max(16, Math.min(32, Number(style.size) || 23)), stroke: Math.max(1, Math.min(3, Number(style.stroke) || 1.9)), activeColor: safeColor(style.activeColor, '#1F2A24'), inactiveColor: safeColor(style.inactiveColor, '#7B857E') }]; }));
  const navStyle = result.navStyle || {};
  result.navStyle = { background: safeColor(navStyle.background, DEFAULT_NAV_STYLE.background), borderColor: safeColor(navStyle.borderColor, DEFAULT_NAV_STYLE.borderColor), height: Math.max(56, Math.min(110, Number(navStyle.height) || 72)), radius: Math.max(0, Math.min(40, Number(navStyle.radius) || 0)), shape: ['bar', 'floating', 'pill'].includes(navStyle.shape) ? navStyle.shape : 'bar', activeState: ['icon', 'tint', 'underline'].includes(navStyle.activeState) ? navStyle.activeState : 'icon' };
  result.pageModes = Object.fromEntries(result.pages.map(page => [page, result.pageModes?.[page] === 'detail' ? 'detail' : 'tab']));
  if (!result.pages.some(page => result.pageModes[page] === 'tab')) result.pageModes[result.pages[0]] = 'tab';
  result.pageParent = Object.fromEntries(result.pages.filter(page => result.pageModes[page] === 'detail' && result.pages.includes(result.pageParent?.[page]) && result.pageParent[page] !== page).map(page => [page, result.pageParent[page]]));
  result.headerActions = result.headerActions || {};
  for (const page of result.pages) { if (!result.pageTitles[page]) result.pageTitles[page] = '新页面'; if (!result.pageIcons[page]) result.pageIcons[page] = '□'; if (!result.headerActions[page]) result.headerActions[page] = { icon: '•••', action: 'menu', prompt: '这是' + result.pageTitles[page], targetPage: result.pages[0] }; }
  result.items = result.items.map(item => ({ ...item, src: item.src === 'assets/white-sneaker-unsplash.jpg' ? 'assets/brand-free-sneaker.png' : item.src, page: result.pages.includes(item.page) ? item.page : result.pages[0], variant: item.variant || VARIANTS[item.type][0].id, detail: item.detail ?? CARD_DETAILS[item.variant] ?? '', width: Math.max(10, Math.min(100, Number(item.width) || 100)), height: Math.max(0, Math.min(800, Number(item.height) || 0)), animation: item.animation || 'none', animationDuration: item.animationDuration ?? 600, animationDelay: item.animationDelay ?? 0, animationEasing: item.animationEasing || 'ease', animationTrigger: item.animationTrigger || 'enter', effect: item.effect || 'none', effectColor: item.effectColor || '#2F6B4F', opacity: item.opacity ?? 100, visualState: item.visualState || 'default', inputType: item.inputType || 'text', checked: Boolean(item.checked), layoutId: item.type === 'layout' ? null : item.layoutId || null, columns: item.columns || 1, gap: item.gap ?? 10, padding: item.padding ?? 10, action: item.action || (item.type === 'button' ? 'toast' : 'none'), prompt: item.prompt || '操作成功', targetPage: item.targetPage || result.pages[0], requiresInput: Boolean(item.requiresInput) }));
  if (!result.paletteVersion && !result.styled) {
    const previousDefaults = { '#e07a5f': '#2F6B4F', '#2a6b6b': '#2F6B4F', '#2e2a27': '#1F2A24', '#6b6560': '#66716A', '#faf9f6': '#F5F3EF', '#e8e4df': '#DFE2DB', '#2455c5': '#2F6B4F' };
    for (const item of result.items) for (const key of ['color', 'background', 'effectColor']) if (typeof item[key] === 'string') item[key] = previousDefaults[item[key].toLowerCase()] || item[key];
  }
  result.paletteVersion = 'chalk-1';
  for (const item of result.items) if (item.layoutId && !result.items.some(layout => layout.id === item.layoutId && layout.type === 'layout' && layout.page === item.page)) item.layoutId = null;
  return result;
}
function load() {
  try {
    let raw = localStorage.getItem(KEY);
    if (!raw) for (const old of OLD_KEYS) { raw = localStorage.getItem(old); if (raw) break; }
    return raw ? normalizeProject(JSON.parse(raw)) : initialState();
  } catch { return initialState(); }
}
function commit() { history.push(clone(state)); if (history.length > 50) history.shift(); future = []; }
function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { editorToast('浏览器空间不足，请导出项目备份'); } }
function update() { persist(); render(); }

function editorToast(message) { const box = $('#toast'); box.textContent = message; box.classList.add('show'); clearTimeout(editorToast.timer); editorToast.timer = setTimeout(() => box.classList.remove('show'), 2400); }
function phoneToast(message) { const box = $('#phoneToast'); box.textContent = message; box.classList.add('show'); clearTimeout(phoneToast.timer); phoneToast.timer = setTimeout(() => box.classList.remove('show'), 2700); }
function showModal(message) { $('#modalMessage').textContent = message; $('#phoneModal').classList.remove('hidden'); }
function safeHref(value) { return typeof value === 'string' && /^(https?:\/\/|mailto:|#)/i.test(value) ? value : '#'; }
function safeColor(value, fallback = '#1F2A24') { return /^#[0-9a-f]{6}$/i.test(value || '') ? value : fallback; }
function safeNavIcon(value) {
  const old = { '⌂': 'icon:home', '◇': 'icon:compass', '◉': 'icon:person', '□': 'icon:home' };
  if (old[value]) return old[value];
  if (typeof value === 'string' && value.startsWith('icon:') && NAV_ICONS.some(icon => icon.id === value.slice(5))) return value;
  if (typeof value === 'string' && value.length < 900000 && /^data:image\/(?:png|jpeg|webp|svg\+xml)[;,]/i.test(value)) return value;
  if (typeof value === 'string' && value.length <= 6 && !/[<>]/.test(value)) return value;
  return 'icon:home';
}
function navIconSettings(page) {
  const value = state.pageIconSettings?.[page] || {};
  return { size: Math.max(16, Math.min(32, Number(value.size) || 23)), stroke: Math.max(1, Math.min(3, Number(value.stroke) || 1.9)), activeColor: safeColor(value.activeColor, '#1F2A24'), inactiveColor: safeColor(value.inactiveColor, '#7B857E') };
}
function navSvgMarkup(value) { const icon = NAV_ICONS.find(entry => `icon:${entry.id}` === safeNavIcon(value)) || NAV_ICONS[0]; return `<svg${icon.filled ? ' class="has-fill"' : ''} viewBox="0 0 24 24" aria-hidden="true"><g class="icon-outline">${icon.outline}</g>${icon.filled ? `<g class="icon-filled">${icon.filled}</g>` : ''}</svg>`; }
function navIconHtml(value) { const safe = safeNavIcon(value); return safe.startsWith('icon:') ? navSvgMarkup(safe) : safe.startsWith('data:image/') ? `<img src="${escapeHtml(safe)}" alt="">` : `<span aria-hidden="true">${escapeHtml(safe)}</span>`; }
function navIconElement(value) { const box = document.createElement('span'); box.className = 'nav-icon'; const safe = safeNavIcon(value); if (safe.startsWith('icon:')) box.innerHTML = navSvgMarkup(safe); else if (safe.startsWith('data:image/')) { const img = document.createElement('img'); img.src = safe; img.alt = ''; box.append(img); } else box.textContent = safe; return box; }
function safeEasing(value) { return ['ease', 'linear', 'ease-in', 'ease-out', 'cubic-bezier(.2,1.5,.45,1)'].includes(value) ? value : 'ease'; }
function safeInputType(value) { return ['text', 'search', 'email', 'password'].includes(value) ? value : 'text'; }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }

function isDetailPage(page) { return state.pageModes?.[page] === 'detail'; }
function switchPage(page, remember = false) { if (!state.pages.includes(page)) return; if (remember && page !== activePage) pageHistory.push(activePage); else if (!remember) pageHistory = []; activePage = page; selected = null; $('#canvasPage').scrollTop = 0; $('#phoneMoreMenu').classList.add('hidden'); hideContextMenu(); render(); }
function goBack() { const fromHistory = pageHistory.pop(); const parent = state.pageParent?.[activePage]; const target = [fromHistory, parent, state.pages.find(page => !isDetailPage(page))].find(page => page && page !== activePage && state.pages.includes(page)); if (target) { const remaining = pageHistory; switchPage(target, false); pageHistory = remaining; } }
function setPageMode(page, mode) { if (mode === 'detail' && state.pages.filter(id => !isDetailPage(id)).length <= 1 && !isDetailPage(page)) { editorToast('至少保留一个主导航页面'); return; } commit(); state.pageModes ||= {}; state.pageParent ||= {}; state.pageModes[page] = mode; if (mode === 'detail') state.pageParent[page] = state.pages.find(id => id !== page && !isDetailPage(id)) || state.pages[0]; else delete state.pageParent[page]; update(); }
function addPage() { const title = prompt('新页面名称', `新页面 ${state.pages.length + 1}`); if (title === null) return; commit(); const page = `page-${uid()}`; state.pages.push(page); state.pageTitles[page] = title.trim().slice(0, 16) || `新页面 ${state.pages.length}`; state.pageIcons[page] = '□'; state.pageModes ||= {}; state.pageModes[page] = 'tab'; state.headerActions[page] = { icon: '•••', action: 'menu', prompt: `这是${state.pageTitles[page]}`, targetPage: state.pages[0] }; activePage = page; selected = null; update(); }
function renamePage(page) { const title = prompt('页面名称', state.pageTitles[page]); if (title === null) return; commit(); state.pageTitles[page] = title.trim().slice(0, 16) || state.pageTitles[page]; update(); }
function duplicatePage(page) { commit(); const copy = `page-${uid()}`; const index = state.pages.indexOf(page); state.pages.splice(index + 1, 0, copy); state.pageTitles[copy] = `${state.pageTitles[page]} 副本`; state.pageIcons[copy] = state.pageIcons[page]; state.pageIconSettings ||= {}; state.pageIconSettings[copy] = clone(navIconSettings(page)); state.pageModes ||= {}; state.pageParent ||= {}; state.pageModes[copy] = isDetailPage(page) ? 'detail' : 'tab'; if (state.pageParent[page]) state.pageParent[copy] = state.pageParent[page]; state.headerActions[copy] = clone(state.headerActions[page]); const originals = state.items.filter(item => item.page === page); const ids = Object.fromEntries(originals.map(item => [item.id, uid()])); const items = originals.map(item => ({ ...clone(item), id: ids[item.id], page: copy, layoutId: item.layoutId ? ids[item.layoutId] || null : null })); state.items.push(...items); activePage = copy; selected = null; update(); }
function deletePage(page) { if (state.pages.length <= 1) { editorToast('至少保留一个页面'); return; } if (!confirm(`删除“${state.pageTitles[page]}”及其中的元素？可使用撤销恢复。`)) return; commit(); state.pages = state.pages.filter(id => id !== page); state.items = state.items.filter(item => item.page !== page); delete state.pageTitles[page]; delete state.pageIcons[page]; if (state.pageIconSettings) delete state.pageIconSettings[page]; delete state.headerActions[page]; if (state.pageModes) delete state.pageModes[page]; const promoted = !state.pages.some(id => !isDetailPage(id)); if (promoted) { state.pageModes ||= {}; state.pageModes[state.pages[0]] = 'tab'; } if (state.pageParent) { delete state.pageParent[page]; if (promoted) delete state.pageParent[state.pages[0]]; for (const [child, parent] of Object.entries(state.pageParent)) if (parent === page) state.pageParent[child] = state.pages.find(id => !isDetailPage(id)) || state.pages[0]; } for (const item of state.items) if (item.targetPage === page) item.targetPage = state.pages[0]; for (const action of Object.values(state.headerActions)) if (action.targetPage === page) action.targetPage = state.pages[0]; if (activePage === page) activePage = state.pages[0]; pageHistory = []; selected = null; update(); }
function runAction(item) {
  if (item.visualState === 'disabled') return;
  if (item.requiresInput) { const inputs = [...$('#canvasPage').querySelectorAll('input.ui-input')]; const invalid = inputs.find(input => !input.value.trim() || !input.checkValidity()); if (!inputs.length || invalid) { phoneToast(!inputs.length ? '请先在当前页面添加输入框' : '请填写有效的输入内容'); invalid?.focus(); return; } }
  if (item.action === 'toast') phoneToast(item.prompt || '操作成功');
  if (item.action === 'modal') showModal(item.prompt || '请确认操作');
  if (item.action === 'page') switchPage(item.targetPage || 'home', true);
  if (item.action === 'link' && safeHref(item.href) !== '#') window.open(safeHref(item.href), '_blank', 'noopener');
}
function runHeaderAction() { const config = state.headerActions[activePage]; if (!config || config.action === 'menu') { $('#phoneMoreMenu').classList.toggle('hidden'); return; } runAction(config); }
function changeHeader(key, value) { commit(); state.headerActions[activePage][key] = value; update(); }

function renderNav() {
  const nav = $('#phoneNav'); nav.replaceChildren();
  const style = { ...DEFAULT_NAV_STYLE, ...(state.navStyle || {}) };
  nav.className = `phone-nav nav-shape-${style.shape} nav-state-${style.activeState}`;
  nav.style.setProperty('--nav-background', safeColor(style.background, '#FFFFFF'));
  nav.style.setProperty('--nav-border', safeColor(style.borderColor, '#DFE2DB'));
  nav.style.setProperty('--nav-height', `${Math.max(56, Math.min(110, Number(style.height) || 72))}px`);
  nav.style.setProperty('--nav-radius', `${Math.max(0, Math.min(40, Number(style.radius) || 0))}px`);
  const pages = document.createElement('div'); pages.className = 'nav-pages';
  for (const page of state.pages.filter(page => !isDetailPage(page))) {
    const button = document.createElement('button'); button.type = 'button'; button.className = page === activePage ? 'active' : '';
    button.setAttribute('aria-label', state.pageTitles[page]); button.setAttribute('aria-current', page === activePage ? 'page' : 'false');
    const icon = navIconElement(state.pageIcons[page]); const settings = navIconSettings(page);
    button.style.setProperty('--icon-size', `${settings.size}px`); button.style.setProperty('--icon-stroke', settings.stroke); button.style.setProperty('--nav-active', settings.activeColor); button.style.setProperty('--nav-inactive', settings.inactiveColor);
    const label = document.createElement('span'); label.textContent = state.pageTitles[page]; button.append(icon, label);
    button.onclick = () => {
      if (preview) { switchPage(page); return; }
      activePage = page;
      selected = '__nav__';
      $('#canvasPage').scrollTop = 0;
      $('#phoneMoreMenu').classList.add('hidden');
      hideContextMenu();
      render();
    };
    pages.append(button);
  }
  nav.append(pages); nav.classList.toggle('hidden', isDetailPage(activePage)); $('#phoneBackBtn').classList.toggle('hidden', !isDetailPage(activePage));
}
function renderPageManager() {
  const manager = $('#pageManager'); manager.replaceChildren();
  const heading = document.createElement('div'); heading.className = 'page-manager-head'; const name = document.createElement('span'); name.textContent = `页面 ${state.pages.length}`; const add = document.createElement('button'); add.type = 'button'; add.textContent = '+ 新建页'; add.onclick = addPage; heading.append(name, add); manager.append(heading);
  const list = document.createElement('div'); list.className = 'page-manager-list';
  state.pages.forEach((page, index) => { const row = document.createElement('div'); row.className = 'page-manager-row'; const select = document.createElement('button'); select.type = 'button'; select.className = 'page-select' + (page === activePage ? ' active' : ''); select.textContent = `${isDetailPage(page) ? '↳' : index + 1 + '.'} ${state.pageTitles[page]}${isDetailPage(page) ? ' · 子页面' : ''}`; select.onclick = () => switchPage(page); select.oncontextmenu = event => { event.preventDefault(); event.stopPropagation(); openContextMenu(event.clientX, event.clientY, 'page', page); }; const edit = document.createElement('button'); edit.type = 'button'; edit.className = 'page-edit'; edit.title = '重命名页面'; edit.textContent = '✎'; edit.onclick = () => renamePage(page); row.append(select, edit); list.append(row); }); manager.append(list);
}
function hideContextMenu() { $('#contextMenu').classList.add('hidden'); contextTarget = null; }
function copyItem(id) { const item = state.items.find(entry => entry.id === id); if (!item) return; clipboard = { item: clone(item), children: item.type === 'layout' ? state.items.filter(entry => entry.layoutId === id).map(clone) : [] }; editorToast('元素已复制'); }
function pasteItem() { if (!clipboard) { editorToast('先复制一个元素'); return; } commit(); const copy = clone(clipboard.item); copy.id = uid(); copy.page = activePage; copy.layoutId = copy.type === 'layout' ? null : state.items.some(item => item.id === copy.layoutId && item.page === activePage) ? copy.layoutId : null; const children = clipboard.children.map(entry => ({ ...clone(entry), id: uid(), page: activePage, layoutId: copy.id })); const index = state.items.findIndex(item => item.id === selected && item.page === activePage); state.items.splice(index < 0 ? state.items.length : index + 1, 0, copy, ...children); selected = copy.id; update(); editorToast('元素已粘贴'); }
function openContextMenu(x, y, kind, id = null) {
  const menu = $('#contextMenu'); menu.replaceChildren(); contextTarget = { kind, id };
  const option = (label, action, disabled = false, danger = false) => { const button = document.createElement('button'); button.type = 'button'; button.setAttribute('role', 'menuitem'); button.textContent = label; button.disabled = disabled; if (danger) button.className = 'menu-danger'; button.onclick = event => { event.stopPropagation(); hideContextMenu(); action(); }; menu.append(button); };
  const rule = () => { const line = document.createElement('hr'); menu.append(line); };
  if (kind === 'item') {
    option('复制元素  Ctrl+C', () => copyItem(id));
    option('粘贴元素  Ctrl+V', pasteItem, !clipboard);
    option('复制一个', duplicate); rule();
    option('上移', () => move(-1)); option('下移', () => move(1)); rule();
    option('删除元素  Delete', () => deleteItem(id), false, true);
  } else if (kind === 'page') {
    option('打开页面', () => switchPage(id)); option('重命名', () => renamePage(id)); option('复制页面', () => duplicatePage(id));
    option(isDetailPage(id) ? '放入底部主导航' : '设为详情／子页面', () => setPageMode(id, isDetailPage(id) ? 'tab' : 'detail')); rule();
    option('新建页面', addPage); option('删除页面', () => deletePage(id), state.pages.length <= 1, true);
  } else { option('粘贴元素  Ctrl+V', pasteItem, !clipboard); option('新建页面', addPage); rule(); option('刷新画布', render); }
  menu.classList.remove('hidden'); menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - 172))}px`; menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - menu.offsetHeight - 8))}px`;
}

function applyPresentation(node, item) {
  node.classList.add('effect-' + (item.effect || 'none'));
  node.style.setProperty('--effect-color', safeColor(item.effectColor, '#2F6B4F'));
  node.style.opacity = String(Math.max(0, Math.min(100, Number(item.opacity ?? 100) || 0)) / 100 * (item.visualState === 'disabled' ? .48 : 1));
  if (item.animation && item.animation !== 'none') {
    node.classList.add('anim-' + item.animation, 'anim-on-' + (item.animationTrigger || 'enter'));
    node.style.setProperty('--anim-duration', `${Math.max(100, Math.min(3000, Number(item.animationDuration) || 600))}ms`);
    node.style.setProperty('--anim-delay', `${Math.max(0, Math.min(2000, Number(item.animationDelay) || 0))}ms`);
    node.style.setProperty('--anim-ease', safeEasing(item.animationEasing));
  }
}
function replayNodeAnimation(node) { if (!node || ![...node.classList].some(name => name.startsWith('anim-'))) return; node.classList.remove('animation-running'); void node.offsetWidth; node.classList.add('animation-running'); }
function createElementNode(item) {
  let node;
  if (item.type === 'layout') {
    node = document.createElement('div'); node.className = 'ui-layout variant-layout-' + item.variant;
    node.style.setProperty('--layout-columns', Math.max(1, Math.min(4, Number(item.columns) || 1)));
    node.style.gap = `${Math.max(0, Math.min(40, Number(item.gap) || 0))}px`;
    node.style.padding = `${Math.max(0, Math.min(50, Number(item.padding) || 0))}px`;
    node.style.background = safeColor(item.background, '#FFFFFF'); node.style.borderRadius = `${Math.max(0, Math.min(99, Number(item.radius) || 0))}px`;
    applyPresentation(node, item);
    const children = state.items.filter(child => child.page === item.page && child.layoutId === item.id);
    if (children.length) for (const child of children) node.append(buildCanvasWrapper(child));
    else if (!preview) { const hint = document.createElement('div'); hint.className = 'layout-hint'; hint.textContent = '选中这个布局，再从左侧添加组件'; node.append(hint); }
    return node;
  }
  if (item.type === 'heading') { node = document.createElement('h2'); node.className = 'ui-heading'; node.textContent = item.text; }
  if (item.type === 'text') { node = document.createElement('p'); node.className = 'ui-text'; node.textContent = item.text; }
  if (item.type === 'button') {
    node = document.createElement('button'); node.type = 'button'; node.className = 'ui-button state-' + (item.visualState || 'default'); node.textContent = item.text || '按钮'; node.disabled = preview && item.visualState === 'disabled';
    node.onclick = event => { if (!preview) return; event.stopPropagation(); if (item.animationTrigger === 'click') replayNodeAnimation(node); runAction(item); };
  }
  if (item.type === 'input') { node = document.createElement('input'); node.className = 'ui-input variant-input-' + item.variant; node.type = safeInputType(item.inputType); node.placeholder = item.text || '请输入内容'; node.readOnly = !preview; }
  if (item.type === 'switch') { node = document.createElement('button'); node.type = 'button'; node.className = 'ui-switch variant-switch-' + item.variant; node.setAttribute('role', 'switch'); node.setAttribute('aria-checked', String(Boolean(item.checked))); node.dataset.checked = String(Boolean(item.checked)); node.style.setProperty('--switch-color', safeColor(item.background, '#2F6B4F')); const label = document.createElement('span'); label.className = 'switch-label'; label.textContent = item.text || '开关'; const track = document.createElement('span'); track.className = 'switch-track'; const knob = document.createElement('i'); track.append(knob); node.append(label, track); node.onclick = event => { if (!preview) return; event.stopPropagation(); const next = node.dataset.checked !== 'true'; node.dataset.checked = String(next); node.setAttribute('aria-checked', String(next)); if (item.animationTrigger === 'click') replayNodeAnimation(node); }; }
  if (item.type === 'image') {
    if (item.src) { node = document.createElement('img'); node.src = item.src; node.alt = item.text || '图片'; node.style.width = '100%'; }
    else { node = document.createElement('div'); node.className = 'canvas-placeholder'; node.textContent = '到“素材”上传图片'; }
  }
  if (item.type === 'divider') {
    if (item.variant === 'wave') { node = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); node.setAttribute('viewBox', '0 0 320 27'); node.setAttribute('aria-hidden', 'true'); node.classList.add('ui-wave'); const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); path.setAttribute('d', 'M0 15 Q40 1 80 15 T160 15 T240 15 T320 15'); path.setAttribute('fill', 'none'); path.setAttribute('stroke', '#DFE2DB'); path.setAttribute('stroke-width', '3'); node.append(path); }
    else { node = document.createElement('hr'); node.className = 'ui-divider variant-divider-' + item.variant; }
  }
  if (item.type === 'card') {
    node = document.createElement('div'); node.className = 'ui-card variant-card-' + item.variant;
    if (item.variant === 'profile') { const avatar = document.createElement('span'); avatar.className = 'avatar'; avatar.textContent = '我'; node.append(avatar); }
    if (item.variant === 'accent') { const kicker = document.createElement('span'); kicker.className = 'card-kicker'; kicker.textContent = '精选'; node.append(kicker); }
    const title = document.createElement('strong'); title.className = 'card-title'; title.textContent = item.text || '卡片标题';
    const detail = document.createElement('span'); detail.className = 'card-detail'; detail.textContent = item.detail ?? CARD_DETAILS[item.variant] ?? '';
    node.append(title, detail);
  }
  if (['heading', 'text', 'button'].includes(item.type)) node.classList.add('variant-' + item.type + '-' + item.variant);
  applyPresentation(node, item);
  if (item.type !== 'divider') {
    node.style.color = safeColor(item.color);
    node.style.fontSize = `${Math.max(8, Math.min(100, Number(item.size) || 16))}px`;
    node.style.borderRadius = `${Math.max(0, Math.min(99, Number(item.radius) || 0))}px`;
    node.style.textAlign = item.align || 'left';
  }
  if (['heading', 'text', 'button', 'card', 'input'].includes(item.type)) node.style.background = safeColor(item.background, '#FFFFFF');
  return node;
}

function buildCanvasWrapper(item) {
  const wrapper = document.createElement('div'); wrapper.className = 'canvas-element' + (selected === item.id && !preview ? ' selected' : '');
  wrapper.dataset.label = TYPE_LABELS[item.type]; wrapper.dataset.type = item.type; wrapper.dataset.id = item.id;
  wrapper.style.width = `${Math.max(10, Math.min(100, Number(item.width) || 100))}%`;
  if (Number(item.height) > 0) { wrapper.style.height = `${Math.max(28, Math.min(800, Number(item.height)))}px`; wrapper.classList.add('has-custom-height'); }
  wrapper.append(createElementNode(item));
  if (selected === item.id && !preview) for (const direction of ['nw', 'ne', 'sw', 'se']) { const handle = document.createElement('span'); handle.className = `resize-handle resize-${direction}`; handle.setAttribute('aria-hidden', 'true'); handle.onpointerdown = event => beginResize(event, item, wrapper, direction); wrapper.append(handle); }
  wrapper.onclick = event => { event.stopPropagation(); if (preview) { if (item.animationTrigger === 'click') replayNodeAnimation(wrapper.firstElementChild); return; } selected = item.id; render(); };
  wrapper.oncontextmenu = event => { if (preview) return; event.preventDefault(); event.stopPropagation(); selected = item.id; renderInspector(); openContextMenu(event.clientX, event.clientY, 'item', item.id); };
  wrapper.draggable = !preview;
  wrapper.ondragstart = event => { if (preview) return; event.stopPropagation(); event.dataTransfer.setData('text/plain', item.id); event.dataTransfer.effectAllowed = 'move'; };
  wrapper.ondragover = event => { if (preview) return; event.preventDefault(); event.stopPropagation(); wrapper.classList.add('drag-over'); };
  wrapper.ondragleave = () => wrapper.classList.remove('drag-over');
  wrapper.ondrop = event => { if (preview) return; event.preventDefault(); event.stopPropagation(); wrapper.classList.remove('drag-over'); const dragged = event.dataTransfer.getData('text/plain'); if (item.type === 'layout' && dragged !== item.id) moveIntoLayout(dragged, item.id); else reorderItem(dragged, item.id); };
  return wrapper;
}
function beginResize(event, item, wrapper, direction) {
  event.preventDefault(); event.stopPropagation();
  const page = $('#canvasPage'); const pageRect = page.getBoundingClientRect(); const start = wrapper.getBoundingClientRect(); const startX = event.clientX; const startY = event.clientY;
  commit(); wrapper.setPointerCapture?.(event.pointerId);
  const move = current => { const horizontal = direction.includes('e') ? current.clientX - startX : startX - current.clientX; const vertical = direction.includes('s') ? current.clientY - startY : startY - current.clientY; const widthPx = Math.max(56, Math.min(pageRect.width, start.width + horizontal)); const heightPx = Math.max(28, Math.min(800, start.height + vertical)); wrapper.style.width = `${widthPx / pageRect.width * 100}%`; wrapper.style.height = `${heightPx}px`; wrapper.classList.add('has-custom-height', 'is-resizing'); };
  const finish = current => { move(current); const rect = wrapper.getBoundingClientRect(); item.width = Math.round(Math.max(10, Math.min(100, rect.width / pageRect.width * 100)) * 10) / 10; item.height = Math.round(Math.max(28, Math.min(800, rect.height))); wrapper.releasePointerCapture?.(event.pointerId); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', finish); update(); };
  window.addEventListener('pointermove', move); window.addEventListener('pointerup', finish, { once: true });
}
function renderCanvas() {
  const page = $('#canvasPage'); const scroll = page.scrollTop; page.replaceChildren();
  page.oncontextmenu = event => { if (preview) return; event.preventDefault(); selected = null; renderInspector(); openContextMenu(event.clientX, event.clientY, 'blank'); };
  const items = state.items.filter(item => item.page === activePage);
  if (!items.length) { const empty = document.createElement('div'); empty.className = 'empty-page'; empty.innerHTML = '<strong>这个页面还是空的</strong>从左侧选择组件和样式开始搭建。'; page.append(empty); }
  for (const item of items.filter(item => !item.layoutId)) page.append(buildCanvasWrapper(item));
  $('#elementCount').textContent = `${items.length} 个当前页面元素`;
  page.scrollTop = scroll;
}

function render() {
  if (!state.pages.includes(activePage)) activePage = state.pages[0];
  $('#projectName').textContent = state.name;
  $('#phonePageTitle').textContent = state.pageTitles[activePage];
  const header = state.headerActions[activePage] || { icon: '•••', action: 'menu', prompt: '' };
  $('#phoneMoreBtn').textContent = header.icon || '•••'; $('#phoneMoreBtn').classList.toggle('selected', selected === '__header__' && !preview);
  $('#previewBtn').textContent = preview ? '退出预览' : '预览交互';
  document.body.classList.toggle('previewing', preview);
  $('#undoBtn').disabled = !history.length; $('#redoBtn').disabled = !future.length;
  renderNav(); renderPageManager(); renderCanvas(); renderInspector();
}

function field(container, label, value, kind = 'text', options = []) {
  const row = document.createElement('div'); row.className = 'field';
  const caption = document.createElement('label'); caption.textContent = label; row.append(caption);
  let input;
  if (kind === 'textarea') { input = document.createElement('textarea'); input.value = value ?? ''; }
  else if (kind === 'select') { input = document.createElement('select'); for (const [key, name] of options) { const option = document.createElement('option'); option.value = key; option.textContent = name; input.append(option); } input.value = value; }
  else { input = document.createElement('input'); input.type = kind; input.value = value ?? ''; if (kind === 'number') { input.min = '0'; input.max = '100'; } }
  row.append(input); container.append(row); return input;
}
function colorField(container, label, value, onChange) {
  const input = field(container, label, safeColor(value), 'color'); input.onchange = () => onChange(input.value);
}
function section(container, title) { const label = document.createElement('div'); label.className = 'inspector-section'; label.textContent = title; container.append(label); }
function renderNavIconInspector(box, page) {
  section(box, '底部导航图标');
  const picker = document.createElement('div'); picker.className = 'nav-icon-picker';
  for (const icon of NAV_ICONS) { const button = document.createElement('button'); button.type = 'button'; button.title = icon.name; button.setAttribute('aria-label', `使用${icon.name}图标`); button.classList.toggle('active', state.pageIcons[page] === `icon:${icon.id}`); button.innerHTML = navSvgMarkup(`icon:${icon.id}`); button.onclick = () => { commit(); state.pageIcons[page] = `icon:${icon.id}`; update(); }; picker.append(button); }
  box.append(picker);
  const upload = document.createElement('div'); upload.className = 'nav-icon-upload'; const current = navIconElement(state.pageIcons[page]); const choose = document.createElement('button'); choose.type = 'button'; choose.textContent = '上传自己的图标'; const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/svg+xml,image/png,image/jpeg,image/webp,.svg'; input.hidden = true; choose.onclick = () => input.click(); input.onchange = async () => { const file = input.files?.[0]; if (!file) return; try { const data = await readNavIcon(file); commit(); state.pageIcons[page] = data; update(); editorToast('导航图标已更新'); } catch (error) { editorToast(error.message || '图标导入失败'); } }; upload.append(current, choose, input); box.append(upload);
  const hint = document.createElement('p'); hint.className = 'nav-icon-hint'; hint.textContent = '内置图标可改颜色和线条；上传的 SVG、PNG、JPG、WEBP 会随项目保存。'; box.append(hint);
  const settings = navIconSettings(page);
  const changeSetting = (key, value) => { commit(); state.pageIconSettings ||= {}; state.pageIconSettings[page] = { ...navIconSettings(page), [key]: value }; update(); };
  const size = field(box, '图标大小（px）', settings.size, 'number'); size.min = '16'; size.max = '32'; size.onchange = () => changeSetting('size', Math.max(16, Math.min(32, Number(size.value) || 23)));
  const stroke = field(box, '线条粗细', settings.stroke, 'number'); stroke.min = '1'; stroke.max = '3'; stroke.step = '0.2'; stroke.onchange = () => changeSetting('stroke', Math.max(1, Math.min(3, Number(stroke.value) || 1.9)));
  colorField(box, '选中颜色', settings.activeColor, value => changeSetting('activeColor', value));
  colorField(box, '未选中颜色', settings.inactiveColor, value => changeSetting('inactiveColor', value));
}
function renderNavBarInspector(box) {
  section(box, '底部导航栏');
  const current = { ...DEFAULT_NAV_STYLE, ...(state.navStyle || {}) };
  const changeNav = (key, value) => { commit(); state.navStyle = { ...current, [key]: value }; update(); };
  colorField(box, '导航栏背景', current.background, value => changeNav('background', value));
  colorField(box, '顶部分割线', current.borderColor, value => changeNav('borderColor', value));
  const shape = field(box, '导航栏形状', current.shape, 'select', [['bar', '通栏'], ['floating', '悬浮卡片'], ['pill', '胶囊']]); shape.onchange = () => changeNav('shape', shape.value);
  const active = field(box, '选中状态', current.activeState, 'select', [['icon', '填充图标'], ['tint', '浅色底'], ['underline', '下划线']]); active.onchange = () => changeNav('activeState', active.value);
  const height = field(box, '导航栏高度（px）', current.height, 'number'); height.min = '56'; height.max = '110'; height.onchange = () => changeNav('height', Math.max(56, Math.min(110, Number(height.value) || 72)));
  const radius = field(box, '外形圆角（px）', current.radius, 'number'); radius.max = '40'; radius.onchange = () => changeNav('radius', Math.max(0, Math.min(40, Number(radius.value) || 0)));
}
function change(key, value) { const item = state.items.find(entry => entry.id === selected); if (!item) return; commit(); item[key] = value; if (['color', 'background', 'radius'].includes(key)) state.styled = true; update(); }
function applyVariant(value) { const item = state.items.find(entry => entry.id === selected); if (!item) return; const preset = VARIANTS[item.type].find(variant => variant.id === value); if (!preset) return; commit(); const text = item.text; Object.assign(item, { color: '#1F2A24', background: '#FFFFFF', size: item.type === 'button' ? 14 : 16, radius: 0, align: 'left' }, clone(preset.props)); item.text = text; if (item.type === 'card') item.detail = CARD_DETAILS[value] || ''; item.variant = value; state.styled = true; update(); }
function moveIntoLayout(itemId, layoutId) { const item = state.items.find(entry => entry.id === itemId && entry.page === activePage); if (!item || item.type === 'layout') return; if (layoutId && !state.items.some(entry => entry.id === layoutId && entry.type === 'layout' && entry.page === activePage)) return; commit(); item.layoutId = layoutId || null; selected = item.id; update(); }
function move(direction) { const item = state.items.find(entry => entry.id === selected && entry.page === activePage); if (!item) return; const peers = state.items.filter(entry => entry.page === activePage && (entry.layoutId || null) === (item.layoutId || null)); const position = peers.findIndex(entry => entry.id === selected); const other = peers[position + direction]; if (!other) return; const index = state.items.indexOf(item); const next = state.items.indexOf(other); commit(); [state.items[index], state.items[next]] = [state.items[next], state.items[index]]; update(); }
function reorderItem(draggedId, targetId) { if (draggedId === targetId) return; const dragged = state.items.find(item => item.id === draggedId && item.page === activePage); const target = state.items.find(item => item.id === targetId && item.page === activePage); if (!dragged || !target || (dragged.layoutId || null) !== (target.layoutId || null)) return; commit(); state.items.splice(state.items.indexOf(dragged), 1); state.items.splice(state.items.indexOf(target), 0, dragged); selected = dragged.id; update(); }
function duplicate() { const item = state.items.find(entry => entry.id === selected); if (!item) return; commit(); const copy = clone(item); copy.id = uid(); const children = item.type === 'layout' ? state.items.filter(entry => entry.layoutId === item.id).map(entry => ({ ...clone(entry), id: uid(), layoutId: copy.id })) : []; state.items.splice(state.items.indexOf(item) + 1, 0, copy, ...children); selected = copy.id; update(); }
function deleteItem(id) { const item = state.items.find(entry => entry.id === id); if (!item) return; commit(); if (item.type === 'layout') for (const child of state.items) if (child.layoutId === id) child.layoutId = null; state.items = state.items.filter(entry => entry.id !== id); if (selected === id) selected = null; update(); editorToast(`已删除${TYPE_LABELS[item.type]}`); }

function renderMotionFields(box, item) {
  section(box, '动画与效果');
  const animation = field(box, '动画', item.animation || 'none', 'select', MOTIONS.map(([id, name]) => [id, name])); animation.onchange = () => change('animation', animation.value);
  if (item.animation && item.animation !== 'none') {
    const trigger = field(box, '触发方式', item.animationTrigger || 'enter', 'select', [['enter', '进入页面'], ['hover', '鼠标悬停'], ['click', '点击元素']]); trigger.onchange = () => change('animationTrigger', trigger.value);
    const duration = field(box, '时长（毫秒）', item.animationDuration ?? 600, 'number'); duration.min = '100'; duration.max = '3000'; duration.onchange = () => change('animationDuration', Math.max(100, Math.min(3000, Number(duration.value) || 600)));
    const delay = field(box, '延迟（毫秒）', item.animationDelay ?? 0, 'number'); delay.max = '2000'; delay.onchange = () => change('animationDelay', Math.max(0, Math.min(2000, Number(delay.value) || 0)));
    const easing = field(box, '运动节奏', item.animationEasing || 'ease', 'select', [['ease', '自然'], ['linear', '匀速'], ['ease-in', '渐快'], ['ease-out', '渐慢'], ['cubic-bezier(.2,1.5,.45,1)', '弹性']]); easing.onchange = () => change('animationEasing', easing.value);
  }
  const effect = field(box, '视觉效果', item.effect || 'none', 'select', EFFECTS.map(([id, name]) => [id, name])); effect.onchange = () => change('effect', effect.value);
  if (['glow', 'gradient', 'outline'].includes(item.effect)) colorField(box, '效果颜色', item.effectColor || '#2F6B4F', value => change('effectColor', value));
  const opacity = field(box, '不透明度（%）', item.opacity ?? 100, 'number'); opacity.onchange = () => change('opacity', Math.max(0, Math.min(100, Number(opacity.value) || 0)));
}
function renderInspector() {
  const box = $('#inspector'); box.replaceChildren();
  if (selected === '__nav__') {
    const heading = document.createElement('div'); heading.className = 'section-label'; heading.textContent = '底部导航栏 / ' + state.pageTitles[activePage]; box.append(heading);
    renderNavBarInspector(box);
    renderNavIconInspector(box, activePage);
    showCode(null); return;
  }
  if (selected === '__header__') {
    const heading = document.createElement('div'); heading.className = 'section-label'; heading.textContent = '右上角操作 / ' + state.pageTitles[activePage]; box.append(heading);
    const config = state.headerActions[activePage];
    const icon = field(box, '显示符号', config.icon); icon.onchange = () => changeHeader('icon', icon.value.slice(0, 5) || '•••');
    const action = field(box, '点击后的行为', config.action, 'select', [['menu', '展开操作菜单'], ['toast', '底部提示'], ['modal', '弹窗提示'], ['page', '切换页面']]); action.onchange = () => changeHeader('action', action.value);
    if (config.action !== 'page') { const message = field(box, '菜单信息 / 提示词', config.prompt); message.onchange = () => changeHeader('prompt', message.value); }
    if (config.action === 'page') { const target = field(box, '目标页面', config.targetPage, 'select', state.pages.map(page => [page, state.pageTitles[page]])); target.onchange = () => changeHeader('targetPage', target.value); }
    showCode(null); return;
  }
  const item = state.items.find(entry => entry.id === selected && entry.page === activePage);
  if (!item) {
    const intro = document.createElement('div'); intro.className = 'inspector-empty'; intro.innerHTML = '<span>◇</span>先选择画布元素<br>或设置当前页面名称'; box.append(intro);
    const title = field(box, '当前页面名称', state.pageTitles[activePage]); title.onchange = () => { commit(); state.pageTitles[activePage] = title.value.trim().slice(0, 16) || PAGE_LABELS[activePage] || '新页面'; update(); };
    if (!isDetailPage(activePage)) { renderNavBarInspector(box); renderNavIconInspector(box, activePage); }
    showCode(null); return;
  }
  const heading = document.createElement('div'); heading.className = 'section-label'; heading.textContent = TYPE_LABELS[item.type] + ' / ' + activePage; box.append(heading);
  const actions = document.createElement('div'); actions.className = 'element-actions';
  for (const [label, handler] of [['上移', () => move(-1)], ['下移', () => move(1)], ['复制', duplicate], ['删除', () => deleteItem(item.id)]]) { const button = document.createElement('button'); button.textContent = label; if (label === '删除') button.className = 'delete'; button.onclick = handler; actions.append(button); } box.append(actions);
  const variant = field(box, '预设样式', item.variant, 'select', VARIANTS[item.type].map(option => [option.id, option.name])); variant.onchange = () => applyVariant(variant.value);
  section(box, '尺寸');
  const width = field(box, '宽度（%）', item.width ?? 100, 'number'); width.min = '10'; width.max = '100'; width.onchange = () => change('width', Math.max(10, Math.min(100, Number(width.value) || 100)));
  const height = field(box, '高度（px，0 为自动）', item.height ?? 0, 'number'); height.max = '800'; height.onchange = () => change('height', Math.max(0, Math.min(800, Number(height.value) || 0)));
  if (item.type === 'layout') {
    const name = field(box, '布局名称', item.text); name.onchange = () => change('text', name.value.slice(0, 30));
    const columns = field(box, '列数', item.columns, 'number'); columns.onchange = () => change('columns', Math.max(1, Math.min(4, Number(columns.value) || 1)));
    const gap = field(box, '间距（px）', item.gap, 'number'); gap.onchange = () => change('gap', Math.max(0, Math.min(40, Number(gap.value) || 0)));
    const padding = field(box, '内边距（px）', item.padding, 'number'); padding.onchange = () => change('padding', Math.max(0, Math.min(50, Number(padding.value) || 0)));
    colorField(box, '背景颜色', item.background, value => change('background', value));
    const radius = field(box, '圆角（px）', item.radius, 'number'); radius.onchange = () => change('radius', Math.max(0, Math.min(99, Number(radius.value) || 0)));
    const hint = document.createElement('p'); hint.className = 'inspector-hint'; hint.textContent = '选中布局后，从左侧添加组件；也可以把画布中的组件拖进布局。'; box.append(hint);
    renderMotionFields(box, item); showCode(item); return;
  }
  if (item.type === 'input') { const placeholder = field(box, '占位文字', item.text); placeholder.onchange = () => change('text', placeholder.value); const inputType = field(box, '输入类型', safeInputType(item.inputType), 'select', [['text', '普通文字'], ['search', '搜索'], ['email', '邮箱'], ['password', '密码']]); inputType.onchange = () => change('inputType', inputType.value); }
  else if (item.type === 'switch') { const label = field(box, '开关标签', item.text); label.onchange = () => change('text', label.value); const checked = field(box, '初始状态', String(Boolean(item.checked)), 'select', [['true', '开启'], ['false', '关闭']]); checked.onchange = () => change('checked', checked.value === 'true'); }
  else if (!['divider', 'image'].includes(item.type)) { const content = field(box, '内容', item.text, 'textarea'); content.onchange = () => change('text', content.value); }
  const layouts = state.items.filter(entry => entry.type === 'layout' && entry.page === activePage);
  if (layouts.length) { const place = field(box, '所在布局', item.layoutId || '', 'select', [['', '页面独立元素'], ...layouts.map(entry => [entry.id, entry.text || '布局'])]); place.onchange = () => moveIntoLayout(item.id, place.value || null); }
  if (item.type === 'card') { const detail = field(box, '卡片说明', item.detail ?? '', 'textarea'); detail.onchange = () => change('detail', detail.value); }
  if (item.type === 'image') {
    const alt = field(box, '图片说明', item.text); alt.onchange = () => change('text', alt.value);
    const images = [['', '请选择图片'], ...BUILTINS.map(asset => [asset.data, asset.name]), ...state.assets.map(asset => [asset.data, asset.name])];
    const source = field(box, '图片素材', item.src, 'select', images); source.onchange = () => change('src', source.value);
  }
  if (item.type === 'button') {
    const visualState = field(box, '按钮状态', item.visualState || 'default', 'select', [['default', '默认'], ['hover', '悬停'], ['pressed', '按下'], ['disabled', '禁用']]); visualState.onchange = () => change('visualState', visualState.value);
    section(box, '点击后的操作');
    const action = field(box, '交互方式', item.action, 'select', [['none', '无'], ['toast', '底部提示'], ['modal', '弹窗提示'], ['page', '切换页面'], ['link', '打开链接']]); action.onchange = () => change('action', action.value);
    if (['toast', 'modal'].includes(item.action)) { const prompt = field(box, '提示文字', item.prompt); prompt.onchange = () => change('prompt', prompt.value); }
    if (item.action === 'page') { const target = field(box, '目标页面', item.targetPage, 'select', state.pages.map(page => [page, state.pageTitles[page]])); target.onchange = () => change('targetPage', target.value); }
    if (item.action === 'page') { const required = field(box, '跳转前检查本页输入', String(Boolean(item.requiresInput)), 'select', [['false', '不检查'], ['true', '检查非空与格式']]); required.onchange = () => change('requiresInput', required.value === 'true'); }
    if (item.action === 'link') { const link = field(box, '链接地址', item.href); link.onchange = () => change('href', safeHref(link.value)); }
  }
  section(box, '外观样式 · CSS');
  if (item.type !== 'divider') {
    if (item.type !== 'image') {
      const size = field(box, '字号（px）', item.size, 'number'); size.onchange = () => change('size', Math.max(8, Math.min(100, Number(size.value) || 16)));
      colorField(box, '文字颜色', item.color, value => change('color', value));
      if (['button', 'card', 'input', 'switch'].includes(item.type)) colorField(box, item.type === 'switch' ? '开启颜色' : '背景颜色', item.background, value => change('background', value));
      const radius = field(box, '圆角（px）', item.radius, 'number'); radius.onchange = () => change('radius', Math.max(0, Math.min(99, Number(radius.value) || 0)));
      const align = field(box, '对齐方式', item.align, 'select', [['left', '左对齐'], ['center', '居中'], ['right', '右对齐']]); align.onchange = () => change('align', align.value);
    }
  }
  renderMotionFields(box, item); showCode(item);
}
function cssFor(item) {
  const lines = item.type === 'layout' ? ['display: grid;', `grid-template-columns: repeat(${item.columns}, minmax(0, 1fr));`, `gap: ${item.gap}px;`, `padding: ${item.padding}px;`] : [`color: ${safeColor(item.color)};`, `font-size: ${Number(item.size) || 16}px;`, `border-radius: ${Number(item.radius) || 0}px;`, `background: ${safeColor(item.background, '#FFFFFF')};`, `text-align: ${item.align || 'left'};`];
  lines.push(`opacity: ${Math.max(0, Math.min(100, Number(item.opacity ?? 100) || 0)) / 100};`);
  if (item.effect === 'soft-shadow') lines.push('box-shadow: 0 8px 20px #1F2A2426;');
  if (item.effect === 'deep-shadow') lines.push('box-shadow: 0 16px 28px #1F2A2440;');
  if (item.effect === 'glow') lines.push(`box-shadow: 0 0 20px ${safeColor(item.effectColor, '#2F6B4F')};`);
  if (item.effect === 'glass') lines.push('backdrop-filter: blur(10px);');
  if (item.effect === 'gradient') lines.push(`background-image: linear-gradient(125deg, ${safeColor(item.effectColor, '#2F6B4F')}, transparent);`);
  if (item.effect === 'outline') lines.push(`outline: 3px solid ${safeColor(item.effectColor, '#2F6B4F')};`);
  if (item.animation && item.animation !== 'none') { lines.push(`animation: bb-${item.animation} ${item.animationDuration ?? 600}ms ${safeEasing(item.animationEasing)} both;`); lines.push(`animation-delay: ${item.animationDelay ?? 0}ms;`); }
  return `.${item.type} {\n  ${lines.join('\n  ')}\n}`;
}
function jsFor(item) {
  const lines = [];
  if (item.animationTrigger === 'click' && item.animation !== 'none') lines.push(`element.addEventListener('click', () => replayAnimation('${item.animation}'));`);
  if (item.type === 'switch') lines.push("toggle.addEventListener('click', () => {\n  toggle.checked = !toggle.checked;\n});");
  if (item.type === 'input') lines.push("input.addEventListener('input', event => {\n  const value = event.target.value;\n});");
  if (item.type === 'button') {
    if (item.visualState === 'disabled') return '// 禁用状态：按钮不会执行点击操作。';
    if (item.action === 'page') lines.push(`button.addEventListener('click', () => show(${JSON.stringify(item.targetPage)}));`);
    if (item.action === 'toast') lines.push(`button.addEventListener('click', () => toast(${JSON.stringify(item.prompt)}));`);
    if (item.action === 'modal') lines.push(`button.addEventListener('click', () => {\n  message.textContent = ${JSON.stringify(item.prompt)};\n  modal.style.display = 'grid';\n});`);
    if (item.action === 'link') lines.push(`button.addEventListener('click', () => {\n  location.href = ${JSON.stringify(safeHref(item.href))};\n});`);
  }
  return lines.join('\n') || '// 这个元素暂时没有点击逻辑。';
}
function showCode(item) {
  let code;
  if (selected === '__header__') code = { css: '.phone-header-dot {\n  cursor: pointer;\n}', html: '<button aria-label="页面操作">•••</button>', js: '// 在右侧选择菜单、提示、弹窗或页面跳转。' };
  else if (!item) code = { css: '/* 选择一个组件查看它的样式 */', html: '<!-- 选择组件后查看生成的 HTML -->', js: '// 选择可交互组件后查看点击逻辑。' };
  else code = { css: cssFor(item), html: exportElement(item), js: jsFor(item) };
  const preview = $('#cssPreview'); preview.replaceChildren();
  const explainLine = line => {
    const text = line.trim();
    if (!text) return '空行把代码分成更容易阅读的小段。';
    const colorMeaning = value => { const [red, green, blue] = hexToRgb(value); return `${value.toUpperCase()} 对应 RGB(${red}, ${green}, ${blue})；“#”表示十六进制颜色，后六位依次代表红、绿、蓝。`; };
    const declaration = text.match(/^([\w-]+):\s*(.+);$/);
    if (text.startsWith('/*') || text.startsWith('//') || text.startsWith('<!--')) return `这是一行给学习者看的注释，浏览器不会把它显示在手机里。当前注释写的是“${text.replace(/^\/\*|\*\/$|^\/\/|^<!--|-->$/g, '').trim()}”，删除它也不会改变界面。`;
    if (/^<\/?[a-z]/i.test(text)) { const tag = text.match(/^<\/?([\w-]+)/i)?.[1] || '元素'; const content = text.match(/>([^<]+)</)?.[1]; return text.startsWith('</') ? `</${tag}> 用斜杠表示“结束 ${tag} 元素”。它和前面的 <${tag}> 配对，防止后面的内容被误算进当前组件。` : `这里实际创建了一个 <${tag}> 元素${content ? `，手机里显示的内容是“${content}”` : ''}。尖括号 < > 用来包住标签名，浏览器看到它就知道这是页面结构，而不是普通文字。`; }
    if (/^\.[\w-]+\s*\{/.test(text)) { const className = text.match(/^\.([\w-]+)/)?.[1]; return `“.${className}”正在选中当前画布里 class="${className}" 的组件；开头的点号表示按 class 查找。“{”之后的规则只作用于这类组件。`; }
    if (declaration) {
      const [, property, value] = declaration;
      if (property === 'color') return `当前把这个组件的文字设为 ${value}。${colorMeaning(value)} 这里用白色文字，是为了和当前深色背景形成清楚对比。`;
      if (property === 'background') return `当前组件的背景实际使用 ${value}。${colorMeaning(value)} 这个值来自右侧“背景颜色”，修改色盘后本行会同步变化。`;
      if (property === 'font-size') return `当前字号是 ${value}。px 是屏幕像素；这里的 ${parseFloat(value)} 让按钮文字保持紧凑，增大数值会更醒目，也更容易把按钮撑高。`;
      if (property === 'border-radius') return `当前圆角半径是 ${value}。这里的 ${parseFloat(value)}px 会把四个角各向内收同样距离；0px 是方角，接近按钮高度一半时会变成胶囊形。`;
      if (property === 'text-align') return `当前值 ${value} 表示内容${value === 'left' ? '靠左排列' : value === 'center' ? '水平居中' : '靠右排列'}。冒号左边是属性名，右边是这个组件正在使用的真实值，分号表示本条规则结束。`;
      if (property === 'opacity') return `当前透明度是 ${value}：1 表示完全可见，0 表示完全透明，0.5 则是半透明。这里保持 1，所以手机中的组件没有被淡化。`;
      if (property === 'box-shadow') { const color = value.match(/#[0-9a-f]{6}/i)?.[0]; return `当前阴影写成 ${value}：前两个 0 表示不向左右或上下偏移，20px 是模糊半径，所以光会均匀包围组件；${color ? colorMeaning(color) : ''}`; }
      if (property === 'animation') { const parts = value.split(/\s+/); return `当前动画名是 ${parts[0]}，持续 ${parts[1]}（${parseInt(parts[1]) / 1000} 秒），${parts[2]} 让速度先加快再减慢，both 会同时保留动画开始前和结束后的状态。每个空格把一个动画参数分开。`; }
      if (property === 'animation-delay') return `当前延迟是 ${value}。0ms 表示触发后立刻播放；ms 是毫秒，1000ms 等于 1 秒。`;
      if (['padding', 'margin', 'gap'].includes(property)) return `当前 ${property} 使用 ${value}。${property === 'padding' ? '它控制内容到边框的内部距离' : property === 'margin' ? '它控制组件与外部元素的距离' : '它控制多个子元素之间的空隙'}；这里展示的是当前组件正在采用的数值。`;
      if (property === 'display') return `当前 display 使用 ${value}，表示这个组件实际采用 ${value === 'grid' ? '网格布局' : value === 'flex' ? '弹性布局' : value}。属性和值之间必须用冒号分隔。`;
      return `当前组件把 ${property} 设为 ${value}。冒号左侧是要改变的属性，右侧是画布正在使用的值，结尾分号告诉浏览器这条设置已经写完。`;
    }
    if (/addEventListener/.test(text)) return `这里用 addEventListener 监听当前组件的用户操作。括号里的 'click' 表示只有用户点击它时才运行后面的函数；=> 是把这次操作指向后面的处理代码。`;
    if (text === '}' || text === '});') return '这一行结束当前样式块或交互逻辑。它与前面的开始大括号配对，让浏览器知道这一组规则到哪里结束。';
    return codeMode === 'js' ? `这一行是当前组件真实执行的 JavaScript：“${text}”。括号表示传入数据或条件，大括号把需要一起执行的语句包成一组。` : codeMode === 'html' ? `这一行就是当前组件对应的 HTML 结构：“${text}”。标签决定它是什么，属性记录它现在的内容、状态和用途。` : `这一行参与当前组件的实际外观：“${text}”。点击右侧相应属性后再回来看，可以观察具体字符和值如何变化。`;
  };
  code[codeMode].split('\n').forEach(line => {
    const row = document.createElement('span'); row.className = 'code-line'; row.dataset.codeText = line; row.append(document.createTextNode(line || ' '));
    if (/^[\s.]*[\w-]+\s*:/.test(line) || /addEventListener|<\/?[a-z]/i.test(line)) row.classList.add('is-key');
    if (/#[0-9a-f]{3,8}|\d+(px|ms|%)/i.test(line)) row.classList.add('is-value');
    row.onmouseenter = () => { $('#codeLearningNote').textContent = explainLine(line); };
    row.onclick = () => {
      preview.querySelectorAll('.code-line.is-focused').forEach(active => { active.classList.remove('is-focused'); active.querySelector('.code-line-comment')?.remove(); });
      row.classList.add('is-focused');
      const comment = document.createElement('span'); comment.className = 'code-line-comment'; comment.textContent = explainLine(line); row.append(comment);
      $('#codeLearningNote').textContent = `已聚焦第 ${[...preview.children].indexOf(row) + 1} 行：${explainLine(line)}`;
    };
    preview.append(row);
  });
  const selectionName = selected === '__header__' ? '页面操作按钮' : item ? TYPE_LABELS[item.type] : '选择画布元素开始理解';
  $('#codeSelectionLabel').textContent = item || selected === '__header__' ? `${selectionName} · 属性与代码已连接` : selectionName;
  $('#codeExplain').textContent = codeMode === 'html' ? 'HTML 描述页面有哪些元素。' : codeMode === 'css' ? 'CSS 控制布局、颜色和动画效果。' : 'JavaScript 负责点击、页面切换与提示。';
  $('#codeLearningNote').textContent = item ? `当前选中“${selectionName}”。点击任意一行代码，可展开这一行的详细中文解释。` : '点击手机中的任意元素，再点击代码行查看详细中文解释。';
  document.querySelectorAll('[data-code]').forEach(button => button.classList.toggle('active', button.dataset.code === codeMode));
}

function renderVariants() {
  componentCategoryOpen = true;
  $('#componentsTab').classList.add('category-open');
  document.querySelectorAll('[data-add]').forEach(button => button.classList.toggle('active', button.dataset.add === selectedCategory));
  const panel = $('#variantPanel'); panel.replaceChildren();
  const heading = document.createElement('div'); heading.className = 'variant-header';
  const back = document.createElement('button'); back.type = 'button'; back.className = 'variant-back'; back.textContent = '← 返回组件'; back.onclick = closeComponentCategory;
  const title = document.createElement('strong'); title.textContent = `${TYPE_LABELS[selectedCategory]}预设`;
  const shortcut = document.createElement('span'); shortcut.textContent = 'Esc 返回';
  heading.append(back, title, shortcut); panel.append(heading);
  const search = document.createElement('input'); search.className = 'library-search'; search.type = 'search'; search.placeholder = `搜索${TYPE_LABELS[selectedCategory]}预设`; search.setAttribute('aria-label', search.placeholder); panel.append(search);
  const list = document.createElement('div'); list.className = 'variant-options';
  for (const variant of VARIANTS[selectedCategory]) {
    const button = document.createElement('button'); button.className = 'variant-option'; button.type = 'button';
    const mini = document.createElement('span'); mini.className = 'mini';
    if (selectedCategory === 'image' && variant.props.src) { const image = document.createElement('img'); image.src = variant.props.src; image.alt = ''; mini.append(image); }
    else if (selectedCategory === 'button') { const sample = document.createElement('span'); sample.className = 'ui-button preview-button variant-button-' + variant.id; sample.textContent = variant.props.text || variant.name; sample.style.background = safeColor(variant.props.background, '#FFFFFF'); sample.style.color = safeColor(variant.props.color); sample.style.borderRadius = `${variant.props.radius ?? 0}px`; mini.append(sample); button.classList.add('button-preset'); }
    else if (selectedCategory === 'heading' || selectedCategory === 'text') { const sample = document.createElement('span'); sample.className = `preview-type variant-${selectedCategory}-${variant.id}`; sample.textContent = variant.props.text || variant.name; sample.style.color = safeColor(variant.props.color); sample.style.background = safeColor(variant.props.background, '#FFFFFF'); mini.append(sample); }
    else if (selectedCategory === 'card') { const sample = document.createElement('span'); sample.className = `preview-card variant-card-${variant.id}`; sample.style.background = safeColor(variant.props.background, '#FFFFFF'); sample.textContent = variant.props.text || variant.name; mini.append(sample); }
    else if (selectedCategory === 'layout') { const sample = document.createElement('span'); sample.className = `preview-layout variant-layout-${variant.id}`; sample.style.gridTemplateColumns = variant.id === 'split' ? '1fr 2fr' : `repeat(${variant.props.columns},1fr)`; for (let index = 0; index < Math.max(2, variant.props.columns); index++) sample.append(document.createElement('i')); mini.append(sample); }
    else if (selectedCategory === 'input') { const sample = document.createElement('span'); sample.className = `preview-input variant-input-${variant.id}`; sample.textContent = variant.props.text; sample.style.background = safeColor(variant.props.background, '#FFFFFF'); sample.style.borderRadius = `${variant.props.radius || 0}px`; mini.append(sample); }
    else if (selectedCategory === 'switch') { const sample = document.createElement('span'); sample.className = 'preview-switch'; sample.style.background = variant.props.checked ? safeColor(variant.props.background, '#2F6B4F') : '#C7C4C0'; const knob = document.createElement('i'); sample.append(knob); if (variant.props.checked) sample.classList.add('on'); mini.append(sample); }
    else if (selectedCategory === 'divider') { const sample = document.createElement('span'); sample.className = `preview-divider variant-divider-${variant.id}`; mini.append(sample); }
    else mini.textContent = variant.mini;
    const description = document.createElement('span'); const name = document.createElement('strong'); name.textContent = variant.name; const detail = document.createElement('small'); detail.textContent = variant.desc; description.append(name, detail); button.append(mini, description);
    button.onclick = () => { commit(); const parent = state.items.find(entry => entry.id === selected && entry.page === activePage); const item = makeItem(selectedCategory, variant.id); if (item.type !== 'layout') item.layoutId = parent?.type === 'layout' ? parent.id : parent?.layoutId || null; state.items.push(item); selected = item.id; update(); editorToast(`已添加${variant.name}`); };
    list.append(button);
  }
  panel.append(list); search.oninput = () => { const query = search.value.trim().toLocaleLowerCase(); for (const button of list.children) button.classList.toggle('hidden', !button.textContent.toLocaleLowerCase().includes(query)); };
}
function closeComponentCategory() {
  componentCategoryOpen = false;
  $('#componentsTab').classList.remove('category-open');
  $('#variantPanel').replaceChildren();
  document.querySelectorAll('[data-add]').forEach(button => button.classList.remove('active'));
}
function renderTemplates() {
  const list = $('#templateList'); list.replaceChildren();
  for (const template of PAGE_TEMPLATES) {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'template-option';
    const image = document.createElement('img'); image.src = BUILTINS[template.cover].data; image.alt = '';
    const text = document.createElement('span'); const title = document.createElement('strong'); title.textContent = template.name; const detail = document.createElement('small'); detail.textContent = `3 个页面 · ${template.desc}`; text.append(title, detail);
    button.append(image, text); button.onclick = () => createTemplatePage(template.id); list.append(button);
  }
}
function renderEffects() {
  const makeList = (target, presets, key) => {
    const list = $(target); list.replaceChildren();
    for (const [id, name, desc] of presets) {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'effect-option';
      const sample = document.createElement('span'); sample.className = 'effect-sample ' + (key === 'animation' ? 'anim-' + id : 'effect-' + id); sample.textContent = key === 'animation' ? '◆' : 'Aa';
      const words = document.createElement('span'); const title = document.createElement('strong'); title.textContent = name; const detail = document.createElement('small'); detail.textContent = desc; words.append(title, detail); button.append(sample, words);
      button.onclick = () => { if (!selected || selected === '__header__') { editorToast('请先选中手机画布中的元素'); return; } change(key, id); if (key === 'animation' && id !== 'none') { const node = document.querySelector(`.canvas-element[data-id="${CSS.escape(selected)}"]`)?.firstElementChild; replayNodeAnimation(node); } };
      list.append(button);
    }
  };
  makeList('#animationList', MOTIONS, 'animation'); makeList('#effectList', EFFECTS, 'effect');
}
function renderAssets() {
  const uploaded = $('#assetList'); uploaded.replaceChildren(); const builtIn = $('#builtInAssets'); builtIn.replaceChildren();
  const addAssetButton = (asset, parent) => { const button = document.createElement('button'); button.className = 'asset-item'; button.type = 'button'; const img = document.createElement('img'); img.src = asset.data; img.alt = asset.name; const label = document.createElement('span'); label.textContent = asset.name; button.append(img, label); button.onclick = () => { commit(); const current = state.items.find(entry => entry.id === selected && entry.page === activePage); const item = makeItem('image', 'upload'); item.src = asset.data; item.text = asset.name; item.layoutId = current?.type === 'layout' ? current.id : current?.layoutId || null; state.items.push(item); selected = item.id; update(); editorToast('图片已加入当前页面'); }; parent.append(button); };
  const query = $('#assetSearch').value.trim().toLocaleLowerCase();
  state.assets.filter(asset => asset.name.toLocaleLowerCase().includes(query)).forEach(asset => addAssetButton(asset, uploaded));
  BUILTINS.filter(asset => asset.name.toLocaleLowerCase().includes(query)).forEach(asset => addAssetButton(asset, builtIn));
  renderCutoutTool();
}

function download(filename, data, type) { const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([data], { type })); link.download = filename; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1200); }
function safeSrc(src) { return typeof src === 'string' && (/^data:image\/(?:png|jpeg|webp|svg\+xml)[;,]/i.test(src) || /^https:\/\//i.test(src) || /^assets\/[\w.-]+$/i.test(src)) ? src : ''; }
function imageMime(bytes) {
  if (bytes.length >= 8 && [137,80,78,71,13,10,26,10].every((value, index) => bytes[index] === value)) return 'image/png';
  if (bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'image/jpeg';
  if (bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP') return 'image/webp';
  return '';
}
async function readImageAsset(file) {
  if (!file || file.size > 2 * 1024 * 1024 || file.size < 16) throw Error('请选择不超过 2 MB 的 PNG、JPG 或 WEBP');
  const bytes = new Uint8Array(await file.arrayBuffer()); const mime = imageMime(bytes);
  if (!mime) throw Error('图片内容不是有效的 PNG、JPG 或 WEBP');
  const blob = new Blob([bytes], { type: mime });
  const data = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(Error('图片读取失败')); reader.readAsDataURL(blob); });
  await new Promise((resolve, reject) => { const image = new Image(); image.onload = () => image.naturalWidth && image.naturalHeight ? resolve() : reject(Error('图片尺寸无效')); image.onerror = () => reject(Error('图片无法解码')); image.src = data; });
  return { id: uid(), name: file.name, data };
}

function loadImageData(data) {
  return new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(Error('图片无法解码')); image.src = data; });
}
function rgbToHex(red, green, blue) { return '#' + [red, green, blue].map(value => Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0')).join(''); }
function hexToRgb(hex) { const value = safeColor(hex, '#ffffff'); return [1, 3, 5].map(index => parseInt(value.slice(index, index + 2), 16)); }
function backgroundAlpha(red, green, blue, target, tolerance, softness) {
  const distance = Math.hypot(red - target[0], green - target[1], blue - target[2]);
  if (distance <= tolerance) return 0;
  if (!softness || distance >= tolerance + softness) return 255;
  return Math.round(255 * (distance - tolerance) / softness);
}
async function sampleImageCorner(data) {
  const image = await loadImageData(data); const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d', { willReadFrequently: true }); if (!context) throw Error('浏览器无法处理这张图片');
  context.drawImage(image, 0, 0, 1, 1); const pixel = context.getImageData(0, 0, 1, 1).data; return rgbToHex(pixel[0], pixel[1], pixel[2]);
}
async function removeSolidBackground(data, color, tolerance, softness) {
  const image = await loadImageData(data); const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(image.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext('2d', { willReadFrequently: true }); if (!context) throw Error('浏览器无法处理这张图片');
  context.drawImage(image, 0, 0, canvas.width, canvas.height); const pixels = context.getImageData(0, 0, canvas.width, canvas.height); const target = hexToRgb(color);
  for (let index = 0; index < pixels.data.length; index += 4) pixels.data[index + 3] = Math.min(pixels.data[index + 3], backgroundAlpha(pixels.data[index], pixels.data[index + 1], pixels.data[index + 2], target, tolerance, softness));
  context.putImageData(pixels, 0, 0); return canvas.toDataURL('image/png');
}
function renderCutoutTool() {
  const tool = $('#cutoutTool'); if (!tool) return; const asset = state.assets[cutoutAssetIndex]; tool.classList.toggle('hidden', !asset); if (!asset) return;
  $('#cutoutPreview').src = asset.data; $('#cutoutAssetName').textContent = asset.name;
}
async function readNavIcon(file) {
  if (!file || file.size > 512 * 1024) throw Error('导航图标请小于 512 KB');
  if (!/\.svg$/i.test(file.name) && file.type !== 'image/svg+xml') return (await readImageAsset(file)).data;
  if (file.size > 128 * 1024) throw Error('SVG 图标请小于 128 KB');
  const source = await file.text();
  const parsed = new DOMParser().parseFromString(source, 'image/svg+xml');
  const root = parsed.documentElement;
  if (root.localName !== 'svg' || parsed.querySelector('parsererror')) throw Error('SVG 文件格式不正确');
  const namespace = 'http://www.w3.org/2000/svg';
  const allowedTags = new Set(['g', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse']);
  const allowedAttrs = new Set(['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'width', 'height', 'points', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'transform', 'opacity']);
  const clean = document.createElementNS(namespace, 'svg'); clean.setAttribute('xmlns', namespace);
  const viewBox = root.getAttribute('viewBox'); clean.setAttribute('viewBox', viewBox && /^[-+\d.e\s]+$/.test(viewBox) ? viewBox : '0 0 24 24');
  let count = 0;
  const copy = (from, to, depth) => { if (depth > 16 || count > 150) return; for (const child of from.children) { if (!allowedTags.has(child.localName)) continue; count++; const node = document.createElementNS(namespace, child.localName); for (const attr of child.attributes) if (allowedAttrs.has(attr.name) && !/url\s*\(|javascript:|data:|https?:/i.test(attr.value)) node.setAttribute(attr.name, attr.value.slice(0, 4000)); to.append(node); copy(child, node, depth + 1); } };
  copy(root, clean, 0);
  if (!clean.children.length) throw Error('SVG 图标没有可用的图形');
  const data = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(clean));
  await new Promise((resolve, reject) => { const image = new Image(); image.onload = () => image.naturalWidth && image.naturalHeight ? resolve() : reject(Error('SVG 图标尺寸无效')); image.onerror = () => reject(Error('SVG 图标无法显示')); image.src = data; });
  return data;
}
function safeTrigger(value) { return ['enter', 'hover', 'click'].includes(value) ? value : 'enter'; }
function presentationClasses(item) { return ` effect-${escapeHtml(item.effect || 'none')}${item.animation && item.animation !== 'none' ? ` anim-${escapeHtml(item.animation)} anim-on-${safeTrigger(item.animationTrigger)}` : ''}`; }
function presentationCss(item) { return `--effect-color:${safeColor(item.effectColor, '#2F6B4F')};opacity:${Math.max(0, Math.min(100, Number(item.opacity ?? 100) || 0)) / 100 * (item.visualState === 'disabled' ? .48 : 1)};--anim-duration:${Math.max(100, Math.min(3000, Number(item.animationDuration) || 600))}ms;--anim-delay:${Math.max(0, Math.min(2000, Number(item.animationDelay) || 0))}ms;--anim-ease:${safeEasing(item.animationEasing)};`; }
function presentationTrigger(item) { return item.animation && item.animation !== 'none' && safeTrigger(item.animationTrigger) === 'click' ? ' data-animation-trigger="click"' : ''; }
function exportElement(item) {
  const text = escapeHtml(item.text); const color = safeColor(item.color); const bg = safeColor(item.background, '#FFFFFF');
  const dimensions = `width:${Math.max(10, Math.min(100, Number(item.width) || 100))}%;${Number(item.height) > 0 ? `height:${Math.max(28, Math.min(800, Number(item.height)))}px;overflow:auto;` : ''}`;
  const base = `${dimensions}color:${color};font-size:${Math.max(8, Math.min(100, Number(item.size) || 16))}px;border-radius:${Math.max(0, Math.min(99, Number(item.radius) || 0))}px;text-align:${item.align || 'left'};background:${bg};${presentationCss(item)}`;
  const classes = presentationClasses(item); const trigger = presentationTrigger(item);
  if (item.type === 'layout') { const children = state.items.filter(child => child.page === item.page && child.layoutId === item.id).map(exportElement).join(''); const style = `--layout-columns:${Math.max(1, Math.min(4, Number(item.columns) || 1))};gap:${Math.max(0, Math.min(40, Number(item.gap) || 0))}px;padding:${Math.max(0, Math.min(50, Number(item.padding) || 0))}px;border-radius:${Math.max(0, Math.min(99, Number(item.radius) || 0))}px;background:${bg};${presentationCss(item)}`; return `<div class="item ui-layout variant-layout-${escapeHtml(item.variant)}${classes}" style="${style}"${trigger}>${children}</div>`; }
  if (item.type === 'heading') return `<h2 class="item ui-heading variant-heading-${escapeHtml(item.variant)}${classes}" style="${base}"${trigger}>${text}</h2>`;
  if (item.type === 'text') return `<p class="item ui-text variant-text-${escapeHtml(item.variant)}${classes}" style="${base}"${trigger}>${text}</p>`;
  if (item.type === 'button') return `<div class="item"><button data-action-id="${escapeHtml(item.id)}" class="ui-button variant-button-${escapeHtml(item.variant)} state-${escapeHtml(item.visualState || 'default')}${classes}" style="${base}"${trigger}${item.visualState === 'disabled' ? ' disabled' : ''}>${text}</button></div>`;
  if (item.type === 'input') return `<input class="item ui-input variant-input-${escapeHtml(item.variant)}${classes}" type="${safeInputType(item.inputType)}" placeholder="${text}" style="${base}"${trigger}>`;
  if (item.type === 'switch') return `<button class="item ui-switch variant-switch-${escapeHtml(item.variant)}${classes}" type="button" role="switch" aria-checked="${Boolean(item.checked)}" data-checked="${Boolean(item.checked)}" style="--switch-color:${bg};color:${color};font-size:${Math.max(8, Math.min(100, Number(item.size) || 16))}px;${presentationCss(item)}"${trigger}><span class="switch-label">${text}</span><span class="switch-track"><i></i></span></button>`;
  if (item.type === 'image') return safeSrc(item.src) ? `<img class="item${classes}" src="${escapeHtml(safeSrc(item.src))}" alt="${text}" style="${dimensions}object-fit:cover;${presentationCss(item)}"${trigger}>` : '';
  if (item.type === 'divider') return item.variant === 'wave' ? `<svg class="item ui-wave${classes}" style="${presentationCss(item)}"${trigger} viewBox="0 0 320 27"><path d="M0 15 Q40 1 80 15 T160 15 T240 15 T320 15" fill="none" stroke="#DFE2DB" stroke-width="3"/></svg>` : `<hr class="item ui-divider variant-divider-${escapeHtml(item.variant)}${classes}" style="${presentationCss(item)}"${trigger}>`;
  const avatar = item.variant === 'profile' ? '<span class="avatar">我</span>' : '';
  const kicker = item.variant === 'accent' ? '<span class="card-kicker">精选</span>' : '';
  const detail = escapeHtml(item.detail ?? CARD_DETAILS[item.variant] ?? '');
  return `<div class="item ui-card variant-card-${escapeHtml(item.variant)}${classes}" style="${base}"${trigger}>${avatar}${kicker}<strong class="card-title">${text}</strong><span class="card-detail">${detail}</span></div>`;
}
const PRESET_CSS = `
.ui-layout{display:grid;grid-template-columns:repeat(var(--layout-columns,2),minmax(0,1fr));align-items:start;min-height:48px}.ui-layout>.item,.ui-layout>.canvas-element{min-width:0;margin:0}.variant-layout-split{grid-template-columns:minmax(0,1fr) minmax(0,2fr)}.variant-layout-panel{border:1px solid #BFD7CA}.layout-hint{grid-column:1/-1;padding:20px 8px;text-align:center;color:#66716A;font-size:11px;border:1px dashed #C5C0B8;border-radius:6px}.inspector-hint{font-size:11px;line-height:1.6;color:#66716A}
.ui-heading,.ui-text,.ui-button,.ui-card{max-width:100%}.ui-heading,.ui-text{white-space:pre-line}.ui-heading{line-height:1.25}.ui-text{line-height:1.65}
.ui-input{display:block;width:100%;padding:11px 13px;border:1px solid #D9D5D0;outline:none;line-height:1.35}.ui-input:focus{border-color:#2F6B4F;box-shadow:0 0 0 3px #2F6B4F22}.ui-input::placeholder{color:#8B8580}.variant-input-underline{border-width:0 0 2px;padding-left:0;padding-right:0}.variant-input-filled{border-color:transparent}.variant-input-dark{border-color:#1F2A24}.variant-input-dark::placeholder{color:#DFE2DB}.ui-switch{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;padding:8px 0;border:0;background:transparent;text-align:left;cursor:pointer}.ui-switch .switch-label{font-weight:600}.ui-switch .switch-track{width:47px;height:27px;flex:none;display:flex;align-items:center;padding:3px;border-radius:99px;background:#C7C4C0;transition:background .2s}.ui-switch .switch-track i{width:21px;height:21px;border-radius:50%;background:#fff;box-shadow:0 1px 4px #0003;transition:transform .2s}.ui-switch[data-checked="true"] .switch-track{background:var(--switch-color,#2F6B4F)}.ui-switch[data-checked="true"] .switch-track i{transform:translateX(20px)}.variant-switch-compact .switch-track{width:39px;height:23px}.variant-switch-compact .switch-track i{width:17px;height:17px}.variant-switch-compact[data-checked="true"] .switch-track i{transform:translateX(16px)}
.variant-heading-display{font-weight:800;letter-spacing:-.06em}.variant-heading-serif{font-family:Georgia,serif;font-weight:700}.variant-heading-underline{text-decoration:underline;text-decoration-color:#2F6B4F;text-decoration-thickness:4px;text-underline-offset:8px}.variant-heading-overline{border-top:3px solid #2F6B4F;padding-top:12px}.variant-heading-inverse{display:block;padding:14px 17px}.variant-heading-marker{display:inline-block;padding:5px 9px}.variant-heading-eyebrow{text-transform:uppercase;letter-spacing:.14em;font-weight:800}
.variant-text-quote{border-left:3px solid #2F6B4F;padding:8px 0 8px 15px;font-family:Georgia,serif;font-style:italic}.variant-text-note{padding:11px 13px}.variant-text-label{display:inline-block;padding:4px 12px;font-weight:700}.variant-text-number{font-weight:800;letter-spacing:-.04em}.variant-text-list{white-space:pre-line;line-height:1.9}
.ui-button{display:inline-block;max-width:100%;padding:10px 18px;border:1px solid transparent;font-weight:700;line-height:1.3;cursor:pointer;transition:transform .16s,box-shadow .16s,filter .16s}.ui-button:hover,.ui-button.state-hover{box-shadow:0 6px 16px #1F2A2433;filter:brightness(1.06)}.ui-button:active,.ui-button.state-pressed{transform:translateY(2px) scale(.97);filter:brightness(.91)}.ui-button:disabled,.ui-button.state-disabled{opacity:.48;cursor:not-allowed;filter:grayscale(.45);box-shadow:none}.variant-button-outline{border-color:#2F6B4F}.variant-button-ghost{border-color:#2F6B4F}.variant-button-text-button{padding-left:0;padding-right:0}.variant-button-wide{width:100%}.variant-button-circle{width:49px;height:49px;padding:0;display:inline-grid;place-items:center}.variant-button-gradient{background-image:linear-gradient(115deg,#2F6B4F,#74A989)}.variant-button-pixel{border:3px solid #172747;box-shadow:4px 4px 0 #172747;border-radius:0!important}.variant-button-neon{border:1px solid #75F4E0;box-shadow:0 0 12px #75F4E080}.variant-button-glass{border:1px solid #FFFFFFAA;box-shadow:inset 0 1px 0 #FFFFFF,0 5px 12px #23415C22}.variant-button-shadow{box-shadow:0 5px 0 #B88927}.variant-button-underline{border:0;border-bottom:2px solid currentColor;padding-left:0;padding-right:0}.variant-button-outline-double{border:3px double #1F2A24}
.variant-button-square{min-width:112px;padding:13px 22px;letter-spacing:.04em}.variant-button-rounded{padding:12px 25px}.variant-button-pill{padding:10px 25px}.variant-button-outline{border-width:2px;background:transparent!important}.variant-button-text-button{border:0;background:transparent!important;font-weight:650}.variant-button-soft{border:1px solid #D8DEE8}.variant-button-icon-left{display:inline-flex;align-items:center;gap:8px;border:1px solid #D6B650}.variant-button-ghost{border-style:dashed;background:transparent!important}.variant-button-danger{border:2px solid #7D322B}.variant-button-compact{padding:5px 10px;font-size:12px!important;min-height:26px}.variant-button-floating{display:inline-grid;place-items:center;width:56px;height:56px;padding:0;box-shadow:0 9px 19px #2F6B4F50}.variant-button-brutalist{border:3px solid #171E30;box-shadow:5px 5px 0 #171E30;font-weight:900;letter-spacing:.05em}.variant-button-link-arrow{border:0;border-bottom:1px solid currentColor;background:transparent!important;padding:7px 0;font-weight:600}.variant-button-loading{display:inline-flex;align-items:center;gap:9px;border:1px solid #C8D1DE;cursor:wait}.variant-button-loading:before{content:'';width:12px;height:12px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:bb-spin .8s linear infinite}@keyframes bb-spin{to{transform:rotate(360deg)}}
.ui-card{padding:20px;border:1px solid #DFE2DB;line-height:1.5}.ui-card .card-title{display:block;font-size:17px;font-weight:700}.ui-card .card-detail{display:block;margin-top:7px;color:#66716A;font-size:12px}.ui-card .avatar{width:36px;height:36px;display:grid;place-items:center;margin-bottom:9px;border-radius:50%;background:#2F6B4F;color:#fff;font-size:15px;font-weight:700}.ui-card .card-kicker{display:block;margin-bottom:8px;color:#2F6B4F;font-size:11px;font-weight:700}.variant-card-accent{border-left:4px solid #2F6B4F}.variant-card-outline{border-color:#2F6B4F}.variant-card-shadow{box-shadow:0 10px 25px #1F2A241A}.variant-card-stat .card-title{font-size:22px}.variant-card-feature{border-color:#BFD7CA}.variant-card-feature:before{content:'✦';display:block;color:#2F6B4F;font-size:22px;margin-bottom:6px}.variant-card-dark .card-detail{color:#DFE2DB}.variant-card-warm{border-color:#E8D1BD}.variant-card-horizontal{display:flex;align-items:center;justify-content:space-between;gap:12px}.variant-card-horizontal .card-detail{margin:0;text-align:right}.variant-card-ticket{border-style:dashed;border-width:2px}.variant-card-minimal{padding:12px 0;border:0}.variant-card-gradient{background-image:linear-gradient(125deg,#EAF0E8,#E9E5D9)}
.ui-divider{border:0;border-top:1px solid #DFE2DB}.variant-divider-dashed{border-top-style:dashed}.variant-divider-dotted{border-top:3px dotted #66716A}.variant-divider-thick{border-top:5px solid #2F6B4F}.variant-divider-short{width:27%;margin-left:0;border-top:3px solid #2F6B4F}.variant-divider-gradient{height:3px;border:0;background:linear-gradient(90deg,#2F6B4F,#2F6B4F,transparent)}.variant-divider-double{border-top:4px double #66716A}.ui-wave{width:100%;height:27px;display:block}
.anim-fade{animation:bb-fade .5s ease both}.anim-rise{animation:bb-rise .5s ease both}.anim-pop{animation:bb-pop .4s ease both}.anim-slide-left{animation:bb-slide-left .55s ease both}.anim-slide-right{animation:bb-slide-right .55s ease both}.anim-drop{animation:bb-drop .55s ease both}.anim-zoom{animation:bb-zoom .55s ease both}.anim-blur{animation:bb-blur .6s ease both}.anim-rotate{animation:bb-rotate .55s ease both}.anim-bounce{animation:bb-bounce .7s cubic-bezier(.2,1.5,.45,1) both}
.anim-fade,.anim-rise,.anim-pop,.anim-slide-left,.anim-slide-right,.anim-drop,.anim-zoom,.anim-blur,.anim-rotate,.anim-bounce{animation-duration:var(--anim-duration,600ms);animation-delay:var(--anim-delay,0ms);animation-timing-function:var(--anim-ease,ease)}.anim-on-hover:not(:hover):not(.animation-running),.anim-on-click:not(.animation-running){animation:none}
.effect-soft-shadow{box-shadow:0 8px 20px #1F2A2426}.effect-deep-shadow{box-shadow:0 16px 28px #1F2A2440}.effect-glow{box-shadow:0 0 0 2px var(--effect-color,#2F6B4F),0 0 20px var(--effect-color,#2F6B4F)}.effect-glass{background-color:#FFFFFF99!important;backdrop-filter:blur(10px);border:1px solid #FFFFFFAA}.effect-gradient{background-image:linear-gradient(125deg,var(--effect-color,#2F6B4F),transparent)}.effect-outline{outline:3px solid var(--effect-color,#2F6B4F);outline-offset:2px}
@keyframes bb-fade{from{opacity:0}to{opacity:1}}@keyframes bb-rise{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}@keyframes bb-pop{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}@keyframes bb-slide-left{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}@keyframes bb-slide-right{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}@keyframes bb-drop{from{opacity:0;transform:translateY(-24px)}to{opacity:1;transform:translateY(0)}}@keyframes bb-zoom{from{opacity:0;transform:scale(1.14)}to{opacity:1;transform:scale(1)}}@keyframes bb-blur{from{opacity:0;filter:blur(8px)}to{opacity:1;filter:blur(0)}}@keyframes bb-rotate{from{opacity:0;transform:rotate(-6deg) scale(.95)}to{opacity:1;transform:rotate(0) scale(1)}}@keyframes bb-bounce{from{opacity:0;transform:translateY(24px) scale(.9)}to{opacity:1;transform:translateY(0) scale(1)}}
@media(prefers-reduced-motion:reduce){.ui-heading,.ui-text,.ui-button,.ui-card,.ui-divider,.ui-wave,.ui-layout{animation:none!important;transition:none!important}}
`;
function exportHtml() {
  const pages = state.pages.map(page => `<section class="app-page" data-page="${escapeHtml(page)}">${state.items.filter(item => item.page === page && !item.layoutId).map(exportElement).join('\n')}</section>`).join('\n');
  const nav = state.pages.filter(page => !isDetailPage(page)).map(page => { const setting = navIconSettings(page); return `<button data-page-target="${escapeHtml(page)}" style="--icon-size:${setting.size}px;--icon-stroke:${setting.stroke};--nav-active:${setting.activeColor};--nav-inactive:${setting.inactiveColor}"><span class="nav-icon">${navIconHtml(state.pageIcons[page])}</span><span>${escapeHtml(state.pageTitles[page])}</span></button>`; }).join('');
  const actions = Object.fromEntries(state.items.filter(item => item.type === 'button').map(item => [item.id, { action: item.action, prompt: item.prompt, targetPage: item.targetPage, href: safeHref(item.href), requiresInput: Boolean(item.requiresInput) }]));
  const actionsJson = JSON.stringify(actions).replace(/</g, '\\u003c');
  const titlesJson = JSON.stringify(state.pageTitles).replace(/</g, '\\u003c');
  const headerJson = JSON.stringify(state.headerActions).replace(/</g, '\\u003c');
  const pageIdsJson = JSON.stringify(state.pages).replace(/</g, '\\u003c');
  const pageModesJson = JSON.stringify(state.pageModes || {}).replace(/</g, '\\u003c');
  const pageParentJson = JSON.stringify(state.pageParent || {}).replace(/</g, '\\u003c');
  const navStyle = { ...DEFAULT_NAV_STYLE, ...(state.navStyle || {}) };
  const navClass = `nav-shape-${navStyle.shape} nav-state-${navStyle.activeState}`;
  const navInline = `--nav-background:${safeColor(navStyle.background, '#FFFFFF')};--nav-border:${safeColor(navStyle.borderColor, '#DFE2DB')};--nav-height:${Math.max(56, Math.min(110, Number(navStyle.height) || 72))}px;--nav-radius:${Math.max(0, Math.min(40, Number(navStyle.radius) || 0))}px`;
  const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(state.name)}</title><style>
  *{box-sizing:border-box}body{margin:0;background:#F5F3EF;color:#1F2A24;font-family:"Microsoft YaHei UI","Microsoft YaHei",system-ui,sans-serif}.app{width:min(100%,468px);height:100dvh;min-height:650px;margin:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 30px #1F2A2418}.status{height:38px;flex:none;padding:14px 20px 0;display:flex;justify-content:space-between;font-size:11px;font-weight:700}.header{height:56px;flex:none;display:flex;align-items:center;padding:0 22px;border-bottom:1px solid #DFE2DB;font-size:20px;font-weight:700}main{flex:1;overflow:auto;padding:24px 22px}nav{height:72px;flex:none;display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #DFE2DB}nav button{border:0;background:#fff;color:#66716A;font:600 11px system-ui;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px}nav button span{font-size:22px}nav button.active{color:#2F6B4F}.app-page{display:none}.app-page.active{display:block}.item{display:block;margin:0 0 17px;max-width:100%}.btn{padding:10px 18px;border:1px solid transparent;font-weight:700;cursor:pointer}.btn.outline{border-color:#2F6B4F}.btn.text-button{padding-left:0;padding-right:0}.btn:active{transform:scale(.96)}.card{padding:20px;border:1px solid #DFE2DB}.card.accent{border-left:4px solid #2F6B4F}.card.outline{border-color:#2F6B4F}.card small{display:block;margin-top:7px;color:#66716A;font-size:12px}hr{border:0;border-top:1px solid #DFE2DB}.dashed{border-top-style:dashed}.wave{height:27px;width:100%}.toast{position:fixed;left:50%;bottom:91px;transform:translateX(-50%);display:none;padding:10px 18px;background:#1F2A24;color:#fff;border-radius:9px;font-size:12px}.modal{position:fixed;inset:0;background:#1F2A2470;display:none;place-items:center;padding:20px}.modal>div{max-width:320px;width:100%;background:#fff;border-radius:15px;padding:24px;text-align:center}.modal button{background:#2F6B4F;color:#fff;border:0;border-radius:8px;padding:10px 24px}.bb-fade{animation:fade .5s ease both}.bb-rise{animation:rise .5s ease both}.bb-pop{animation:pop .4s ease both}@keyframes fade{from{opacity:0}to{opacity:1}}@keyframes rise{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}@keyframes pop{from{opacity:0;transform:scale(.9)}to{opacity:1}}
  .header{justify-content:space-between}.header button{border:0;background:transparent;color:#66716A;font-size:16px;cursor:pointer}nav{display:flex;grid-template-columns:none;overflow-x:auto;scrollbar-width:none}nav button{min-width:74px;flex:1 0 74px}.more-menu{position:fixed;right:max(12px,calc((100vw - 468px)/2 + 20px));top:88px;width:145px;background:#fff;border:1px solid #DFE2DB;border-radius:9px;box-shadow:0 10px 25px #1F2A2420;display:none}.more-menu button{display:block;width:100%;padding:10px;background:#fff;border:0;text-align:left;color:#1F2A24}
  #back[hidden],nav[hidden]{display:none}.header #back{font-size:23px;color:#1F2A24}
  nav{height:var(--nav-height,72px);padding:4px 12px 0;border-color:var(--nav-border,#DFE2DB);background:var(--nav-background,#fff);border-radius:var(--nav-radius,0);box-shadow:0 -6px 18px #1F2A2408}nav button{min-width:76px;gap:3px;padding:5px 4px 3px;border-radius:10px;color:var(--nav-inactive,#7B857E);background:transparent;font-size:10px;font-weight:550}nav button.active{color:var(--nav-active,#1F2A24);font-weight:750}nav.nav-shape-floating{margin:0 12px 10px;border:1px solid var(--nav-border);box-shadow:0 8px 24px #1F2A2420}.nav-shape-pill{margin:0 18px 12px;border:1px solid var(--nav-border);border-radius:999px}.nav-state-tint button.active{background:color-mix(in srgb,var(--nav-active) 13%,transparent)}.nav-state-underline button.active:after{content:'';width:22px;height:3px;border-radius:3px;background:currentColor}.nav-state-underline button.active .nav-icon .icon-filled{display:none}.nav-state-underline button.active .nav-icon .icon-outline{display:block}nav .nav-icon{width:26px;height:26px;display:grid;place-items:center}nav .nav-icon svg,nav .nav-icon img{width:var(--icon-size,23px);height:var(--icon-size,23px);display:block;object-fit:contain}nav .nav-icon svg{stroke:currentColor;stroke-width:var(--icon-stroke,1.9);stroke-linecap:round;stroke-linejoin:round;fill:none}nav .nav-icon .icon-filled{display:none;fill:currentColor;stroke:none}nav button.active .nav-icon svg.has-fill .icon-outline{display:none}nav button.active .nav-icon svg.has-fill .icon-filled{display:block}nav button:not(.active) .nav-icon img{opacity:.58}
  ${PRESET_CSS}</style></head><body><div class="app"><div class="status"><span>9:41</span><span>●●● ▰</span></div><div class="header"><button id="back" aria-label="返回上一页" hidden>←</button><span id="title"></span><button id="more" aria-label="页面操作">•••</button></div><main>${pages}</main><nav class="${navClass}" style="${navInline}">${nav}</nav></div><div class="more-menu" id="moreMenu"><button id="moreInfo">页面信息</button><button id="moreNext">下一页</button><button id="moreClose">关闭菜单</button></div><div class="toast" id="toast"></div><div class="modal" id="modal"><div><strong>提示</strong><p id="message"></p><button id="close">知道了</button></div></div><script>
  const titles=${titlesJson},actions=${actionsJson},headers=${headerJson},pageIds=${pageIdsJson},pageModes=${pageModesJson},pageParent=${pageParentJson};
  let current=pageIds[0],pageHistory=[];
  function hideMore(){document.getElementById('moreMenu').style.display='none'}
  function show(page,remember=false){if(!pageIds.includes(page))return;if(remember&&page!==current)pageHistory.push(current);else if(!remember)pageHistory=[];current=page;document.querySelectorAll('.app-page').forEach(e=>e.classList.toggle('active',e.dataset.page===page));document.querySelectorAll('nav button').forEach(e=>e.classList.toggle('active',e.dataset.pageTarget===page));document.getElementById('title').textContent=titles[page]||page;document.getElementById('more').textContent=(headers[page]&&headers[page].icon)||'•••';document.getElementById('back').hidden=pageModes[page]!=='detail';document.querySelector('nav').hidden=pageModes[page]==='detail';document.querySelector('main').scrollTop=0;hideMore()}
  function back(){const prior=pageHistory.pop()||pageParent[current]||pageIds.find(id=>pageModes[id]!=='detail');if(prior&&prior!==current){const remaining=pageHistory;show(prior);pageHistory=remaining}}
  function toast(message){const e=document.getElementById('toast');e.textContent=message;e.style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>e.style.display='none',2600)}
  function run(a){if(!a)return;if(a.requiresInput){const inputs=[...document.querySelector('.app-page.active').querySelectorAll('input.ui-input')],invalid=inputs.find(input=>!input.value.trim()||!input.checkValidity());if(!inputs.length||invalid){toast(!inputs.length?'请先添加输入框':'请填写有效的输入内容');invalid?.focus();return}}if(a.action==='page')show(a.targetPage,true);if(a.action==='toast')toast(a.prompt||'操作成功');if(a.action==='modal'){document.getElementById('message').textContent=a.prompt||'请确认操作';document.getElementById('modal').style.display='grid'}if(a.action==='link'&&a.href&&a.href!=='#')location.href=a.href}
  document.addEventListener('click',e=>{const animated=e.target.closest('[data-animation-trigger="click"]');if(animated){animated.classList.remove('animation-running');void animated.offsetWidth;animated.classList.add('animation-running')}const toggle=e.target.closest('[role="switch"]');if(toggle){const next=toggle.dataset.checked!=='true';toggle.dataset.checked=String(next);toggle.setAttribute('aria-checked',String(next));return}const nav=e.target.closest('[data-page-target]');if(nav){show(nav.dataset.pageTarget);return}const button=e.target.closest('[data-action-id]');if(button){run(actions[button.dataset.actionId]);return}if(!e.target.closest('#moreMenu')&&!e.target.closest('#more'))hideMore()});
  document.getElementById('more').onclick=()=>{const a=headers[current];if(!a||a.action==='menu'){const m=document.getElementById('moreMenu');m.style.display=m.style.display==='block'?'none':'block'}else run(a)};
  document.getElementById('back').onclick=back;
  document.getElementById('moreInfo').onclick=()=>{hideMore();toast((headers[current]&&headers[current].prompt)||titles[current])};
  document.getElementById('moreNext').onclick=()=>show(pageIds[(pageIds.indexOf(current)+1)%pageIds.length]);
  document.getElementById('moreClose').onclick=hideMore;
  document.getElementById('close').onclick=()=>document.getElementById('modal').style.display='none';show(pageIds[0]);
  <\/script></body></html>`;
  download('blokbird-app.html', html, 'text/html;charset=utf-8'); editorToast('可交互网页已导出');
}

document.querySelectorAll('[data-add]').forEach(button => button.onclick = () => { selectedCategory = button.dataset.add; renderVariants(); });
document.querySelectorAll('[data-lefttab]').forEach(button => button.onclick = () => { document.querySelectorAll('[data-lefttab]').forEach(tab => tab.classList.toggle('active', tab === button)); for (const tab of ['components', 'templates', 'effects', 'assets']) $('#' + tab + 'Tab').classList.toggle('hidden', tab !== button.dataset.lefttab); });
$('#undoBtn').onclick = () => { if (!history.length) return; future.push(clone(state)); state = history.pop(); selected = null; update(); };
$('#redoBtn').onclick = () => { if (!future.length) return; history.push(clone(state)); state = future.pop(); selected = null; update(); };
$('#replayBtn').onclick = () => { renderCanvas(); $('#canvasPage').querySelectorAll('.anim-on-hover,.anim-on-click').forEach(replayNodeAnimation); };
$('#previewBtn').onclick = () => { preview = !preview; selected = null; $('#phoneModal').classList.add('hidden'); render(); };
$('#guideBtn').onclick = () => $('#guideDialog').classList.remove('hidden');
$('#guideCloseBtn').onclick = () => $('#guideDialog').classList.add('hidden');
$('#guideDialog').onclick = event => { if (event.target === $('#guideDialog')) $('#guideDialog').classList.add('hidden'); };
$('#phoneMoreBtn').onclick = event => { event.stopPropagation(); if (preview) runHeaderAction(); else { selected = '__header__'; $('#phoneMoreMenu').classList.add('hidden'); render(); } };
$('#phoneBackBtn').onclick = event => { event.stopPropagation(); goBack(); };
$('#moreInfoBtn').onclick = () => { $('#phoneMoreMenu').classList.add('hidden'); phoneToast(state.headerActions[activePage].prompt || state.pageTitles[activePage]); };
$('#moreNextBtn').onclick = () => { const index = state.pages.indexOf(activePage); switchPage(state.pages[(index + 1) % state.pages.length]); };
$('#moreCloseBtn').onclick = () => $('#phoneMoreMenu').classList.add('hidden');
$('#modalCloseBtn').onclick = () => $('#phoneModal').classList.add('hidden');
$('#saveBtn').onclick = () => { const name = prompt('项目名称', state.name); if (name === null) return; commit(); state.name = name.trim().slice(0, 60) || '未命名项目'; update(); download('blokbird-project.json', JSON.stringify(state, null, 2), 'application/json'); editorToast('项目文件已保存'); };
$('#exportBtn').onclick = exportHtml;
$('#importBtn').onclick = () => $('#projectInput').click();
$('#projectInput').onchange = async event => { const file = event.target.files[0]; if (!file) return; try { const imported = JSON.parse(await file.text()); if (!validProject(imported)) throw Error(); commit(); state = normalizeProject(imported); activePage = state.pages[0]; selected = null; update(); renderAssets(); editorToast('项目导入成功'); } catch { editorToast('项目文件格式不正确'); } event.target.value = ''; };
$('#newBtn').onclick = () => { if (!confirm('新建项目会清空当前画布。建议先保存项目文件。继续吗？')) return; commit(); state = { name: '未命名项目', pages: ['home'], pageTitles: { home: '首页' }, pageIcons: { home: 'icon:home' }, pageIconSettings: { home: clone(DEFAULT_NAV_ICON_STYLE) }, navStyle: clone(DEFAULT_NAV_STYLE), headerActions: { home: { icon: '•••', action: 'menu', prompt: '这是首页', targetPage: 'home' } }, items: [], assets: [], styled: false }; activePage = 'home'; selected = null; update(); renderAssets(); };
$('#assetInput').onchange = async event => { for (const file of [...event.target.files]) { try { const asset = await readImageAsset(file); commit(); state.assets.push(asset); cutoutAssetIndex = state.assets.length - 1; update(); renderAssets(); try { $('#cutoutColor').value = await sampleImageCorner(asset.data); } catch {} editorToast(`已导入 ${asset.name}，可选择快速抠图`); } catch (error) { editorToast(error.message || '图片导入失败'); } } event.target.value = ''; };
$('#assetSearch').oninput = renderAssets;
$('#cutoutSampleBtn').onclick = async () => { const asset = state.assets[cutoutAssetIndex]; if (!asset) return; try { $('#cutoutColor').value = await sampleImageCorner(asset.data); editorToast('已读取图片左上角的背景颜色'); } catch (error) { editorToast(error.message || '颜色读取失败'); } };
$('#cutoutApplyBtn').onclick = async () => { const asset = state.assets[cutoutAssetIndex]; if (!asset) return; const button = $('#cutoutApplyBtn'); button.disabled = true; button.textContent = '处理中…'; try { const oldData = asset.data; const result = await removeSolidBackground(oldData, $('#cutoutColor').value, Number($('#cutoutTolerance').value), Number($('#cutoutSoftness').value)); commit(); asset.data = result; asset.name = asset.name.replace(/\.[^.]+$/, '') + '-透明.png'; for (const item of state.items) if (item.type === 'image' && item.src === oldData) item.src = result; update(); renderAssets(); editorToast('背景已移除，素材已替换为透明 PNG'); } catch (error) { editorToast(error.message || '背景移除失败'); } finally { button.disabled = false; button.textContent = '移除背景'; } };
$('#copyCssBtn').onclick = async () => { try { const code = [...$('#cssPreview').querySelectorAll('.code-line')].map(line => line.dataset.codeText || '').join('\n'); await navigator.clipboard.writeText(code); editorToast('代码已复制'); } catch { editorToast('请手动选择并复制代码'); } };
document.querySelectorAll('[data-code]').forEach(button => button.onclick = () => { codeMode = button.dataset.code; const item = state.items.find(entry => entry.id === selected && entry.page === activePage); showCode(item); });
document.addEventListener('click', event => { if (!$('#contextMenu').contains(event.target)) hideContextMenu(); if (!$('#phoneMoreMenu').contains(event.target) && event.target !== $('#phoneMoreBtn')) $('#phoneMoreMenu').classList.add('hidden'); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { hideContextMenu(); $('#phoneMoreMenu').classList.add('hidden'); $('#guideDialog').classList.add('hidden'); if (componentCategoryOpen) { event.preventDefault(); closeComponentCategory(); } } const editing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName); if (editing) return; if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); $('#undoBtn').click(); } if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') { event.preventDefault(); $('#redoBtn').click(); } if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c' && selected && selected !== '__header__') { event.preventDefault(); copyItem(selected); } if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v' && clipboard) { event.preventDefault(); pasteItem(); } if (event.key === 'Delete' && selected && selected !== '__header__') { event.preventDefault(); deleteItem(selected); } });
const presetStyle = document.createElement('style'); presetStyle.textContent = PRESET_CSS; document.head.append(presetStyle);
renderTemplates(); renderEffects(); renderAssets(); render();
