import { firebaseConfig } from './config.js';

const $ = s => document.querySelector(s);
const FB = 'https://www.gstatic.com/firebasejs/10.12.2/';

/* ---------- 캐릭터 (직접 그린 동물 친구들) ---------- */
const EYE = (x, y) => `<circle cx="${x}" cy="${y}" r="3" fill="#3b2f35"/><circle cx="${x + 1}" cy="${y - 1}" r="1" fill="#fff"/>`;
const BLUSH = (y = 40) => `<ellipse cx="17" cy="${y}" rx="4.5" ry="3" fill="#ff9fb5" opacity=".75"/><ellipse cx="47" cy="${y}" rx="4.5" ry="3" fill="#ff9fb5" opacity=".75"/>`;
const ART = {
  chick: { name: '병아리', c: '#ffe58a', cD: '#e8b923', svg:
    `<path d="M28 12c-2-5 1-8 4-7-1 3 1 4 3 2 1 3-1 6-4 6z" fill="#f7c948"/><circle cx="32" cy="36" r="24" fill="#ffd84a"/><ellipse cx="32" cy="44" rx="15" ry="11" fill="#ffe582"/>${EYE(23, 33)}${EYE(41, 33)}<path d="M27 39l5-3 5 3-5 4z" fill="#ff9a3c"/>${BLUSH(41)}` },
  penguin: { name: '펭귄', c: '#bfe0ff', cD: '#5a9be0', svg:
    `<circle cx="32" cy="34" r="25" fill="#4f6b8f"/><path d="M32 26c-4-6-17-4-16 8 1 10 8 17 16 17s15-7 16-17c1-12-12-14-16-8z" fill="#fff"/>${EYE(24, 34)}${EYE(40, 34)}<path d="M28 40h8l-4 5z" fill="#ffaa33"/>${BLUSH(42)}` },
  fox: { name: '여우', c: '#ffd2b3', cD: '#ec8a4d', svg:
    `<path d="M10 10l14 10-12 8zM54 10L40 20l12 8z" fill="#f2884b"/><path d="M14 14l7 6-6 4zM50 14l-7 6 6 4z" fill="#fff1e6"/><ellipse cx="32" cy="36" rx="24" ry="21" fill="#f2884b"/><path d="M8 36c6 2 14 6 24 18 10-12 18-16 24-18-2 12-12 21-24 21S10 48 8 36z" fill="#fff4ea"/><path d="M20 33q3-3 6 0M38 33q3-3 6 0" stroke="#3b2f35" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="32" cy="43" rx="3.2" ry="2.4" fill="#3b2f35"/>${BLUSH(40)}` },
  hedgehog: { name: '고슴도치', c: '#ead7c8', cD: '#a97e5f', svg:
    `<path d="M32 4l5 7 7-5 1 8 8-2-2 8 8 1-5 7 6 5-7 4 3 8H6l3-8-7-4 6-5-5-7 8-1-2-8 8 2 1-8 7 5z" fill="#8a6247"/><ellipse cx="32" cy="40" rx="19" ry="17" fill="#f6e3cf"/>${EYE(25, 37)}${EYE(39, 37)}<circle cx="32" cy="44" r="3" fill="#3b2f35"/>${BLUSH(45)}` },
  frog: { name: '개구리', c: '#c8edc9', cD: '#5fb36a', svg:
    `<circle cx="19" cy="20" r="9" fill="#7fcf86"/><circle cx="45" cy="20" r="9" fill="#7fcf86"/><ellipse cx="32" cy="38" rx="26" ry="20" fill="#7fcf86"/><circle cx="19" cy="20" r="5.5" fill="#fff"/><circle cx="45" cy="20" r="5.5" fill="#fff"/><circle cx="19" cy="21" r="3" fill="#3b2f35"/><circle cx="45" cy="21" r="3" fill="#3b2f35"/><path d="M20 42q12 9 24 0" stroke="#3b2f35" stroke-width="2.6" fill="none" stroke-linecap="round"/>${BLUSH(40)}` }
};
const AKEYS = Object.keys(ART);
/* 점수로 입양하는 동물 친구들 (직접 그린 캐릭터) */
const LION_MANE = [0, 45, 90, 135, 180, 225, 270, 315].map(d => { const r = d * Math.PI / 180; return `<circle cx="${(32 + 20 * Math.cos(r)).toFixed(1)}" cy="${(35 + 20 * Math.sin(r)).toFixed(1)}" r="10"/>`; }).join('');
/* 기본 다섯 친구와 같은 그림체: 동그란 얼굴, 반짝이는 점 눈, 분홍 볼 */
Object.assign(ART, {
  pig: { name: '돼지', price: 30, c: '#ffdbe4', cD: '#ef8fa8', svg:
    `<path d="M12 18q2-11 12-8l-5 10zM52 18q-2-11-12-8l5 10z" fill="#ff9fba"/><circle cx="32" cy="36" r="24" fill="#ffb8cb"/>${EYE(23, 32)}${EYE(41, 32)}<ellipse cx="32" cy="42" rx="8" ry="5.5" fill="#ff98b4"/><circle cx="29" cy="42" r="1.6" fill="#c95f7c"/><circle cx="35" cy="42" r="1.6" fill="#c95f7c"/>${BLUSH(41)}` },
  sheep: { name: '양', price: 30, c: '#f3eee6', cD: '#b3a79a', svg:
    `<ellipse cx="9" cy="33" rx="7" ry="4" fill="#e3cbb2"/><ellipse cx="55" cy="33" rx="7" ry="4" fill="#e3cbb2"/><circle cx="32" cy="37" r="23" fill="#fff4e6"/><g fill="#ffffff"><circle cx="22" cy="16" r="8"/><circle cx="32" cy="12" r="9"/><circle cx="42" cy="16" r="8"/></g>${EYE(24, 36)}${EYE(40, 36)}<path d="M28.5 43q1.75 2 3.5 0q1.75 2 3.5 0" stroke="#3b2f35" stroke-width="2" fill="none" stroke-linecap="round"/>${BLUSH(43)}` },
  panda: { name: '판다', price: 50, c: '#ecebef', cD: '#5b5560', svg:
    `<circle cx="13" cy="16" r="8" fill="#3d3640"/><circle cx="51" cy="16" r="8" fill="#3d3640"/><circle cx="32" cy="36" r="24" fill="#ffffff"/><ellipse cx="23" cy="34" rx="6" ry="7" fill="#3d3640"/><ellipse cx="41" cy="34" rx="6" ry="7" fill="#3d3640"/><circle cx="23" cy="34" r="2.6" fill="#fff"/><circle cx="41" cy="34" r="2.6" fill="#fff"/><ellipse cx="32" cy="42" rx="3.2" ry="2.3" fill="#3d3640"/>${BLUSH(44)}` },
  turtle: { name: '거북이', price: 50, c: '#d7f0d2', cD: '#5aa864', svg:
    `<path d="M8 56a24 14 0 0 1 48 0z" fill="#b58a52"/><path d="M20 56l4-8h8l4 8M36 56l4-8h4" stroke="#d9b37a" stroke-width="2.5" fill="none"/><circle cx="32" cy="32" r="22" fill="#9ad89a"/>${EYE(24, 31)}${EYE(40, 31)}<path d="M28 39q4 3.5 8 0" stroke="#3b2f35" stroke-width="2.2" fill="none" stroke-linecap="round"/>${BLUSH(38)}` },
  owl: { name: '부엉이', price: 60, c: '#f0dfc8', cD: '#b07d4f', svg:
    `<path d="M12 18l4-12 9 9zM52 18l-4-12-9 9z" fill="#a8774b"/><circle cx="32" cy="36" r="24" fill="#c08f60"/><circle cx="23" cy="33" r="8.5" fill="#fff4e3"/><circle cx="41" cy="33" r="8.5" fill="#fff4e3"/>${EYE(23, 33)}${EYE(41, 33)}<path d="M29.5 39.5h5l-2.5 4z" fill="#f4a13a"/><ellipse cx="32" cy="52" rx="10" ry="5" fill="#e6c79f"/>${BLUSH(44)}` },
  koala: { name: '코알라', price: 60, c: '#e3e6ea', cD: '#848d96', svg:
    `<circle cx="12" cy="22" r="11" fill="#aab1b9"/><circle cx="52" cy="22" r="11" fill="#aab1b9"/><circle cx="12" cy="22" r="6" fill="#f6cbd5"/><circle cx="52" cy="22" r="6" fill="#f6cbd5"/><circle cx="32" cy="36" r="23" fill="#c1c7cd"/>${EYE(23, 33)}${EYE(41, 33)}<ellipse cx="32" cy="41" rx="4.5" ry="5.5" fill="#4a4248"/>${BLUSH(43)}` },
  octopus: { name: '문어', price: 80, c: '#efdcf8', cD: '#a96ccc', svg:
    `<g fill="#d39ef0"><ellipse cx="15" cy="53" rx="5" ry="7"/><ellipse cx="26" cy="56" rx="5" ry="7"/><ellipse cx="38" cy="56" rx="5" ry="7"/><ellipse cx="49" cy="53" rx="5" ry="7"/></g><circle cx="32" cy="32" r="23" fill="#ddb0f5"/>${EYE(24, 32)}${EYE(40, 32)}<ellipse cx="32" cy="40" rx="2.6" ry="2.2" fill="#a96ccc"/>${BLUSH(39)}` },
  lion: { name: '사자', price: 100, c: '#ffe6c2', cD: '#e08a32', svg:
    `<g fill="#f0a24c">${LION_MANE}</g><circle cx="32" cy="35" r="21" fill="#f0a24c"/><circle cx="32" cy="36" r="17" fill="#ffd683"/>${EYE(25, 33)}${EYE(39, 33)}<path d="M30 39.5h4q0 2.5-2 2.5t-2-2.5z" fill="#8a5530"/>${BLUSH(41)}` },
  unicorn: { name: '유니콘', price: 150, c: '#fde6f0', cD: '#e787ad', svg:
    `<path d="M14 22l2-11 8 7zM50 22l-2-11-8 7z" fill="#fff"/><path d="M32 2l4.5 15h-9z" fill="#ffd45e"/><circle cx="32" cy="37" r="23" fill="#ffffff"/><path d="M13 31q2-15 17-17q-4 7-2 14q-8-3-15 3z" fill="#ffb3cb"/><path d="M30 14q10-1 16 6q-7 0-11 4q-1-5-5-10z" fill="#a9d8f7"/><path d="M21 37q3-3 6 0M37 37q3-3 6 0" stroke="#3b2f35" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M29 44q3 2.5 6 0" stroke="#3b2f35" stroke-width="2" fill="none" stroke-linecap="round"/>${BLUSH(43)}` }
});
const SHOP = ['pig', 'sheep', 'panda', 'turtle', 'owl', 'koala', 'octopus', 'lion', 'unicorn'];

const accSvg = (mid, a) => { const w = typeof S !== 'undefined' && S && S.wear && S.wear[mid] && S.wear[mid][a]; if (!w) return ''; return ['neck', 'face', 'head'].map(s => w[s] && ACC[w[s]] ? ACC[w[s]].svg : '').join(''); };
const face = (a, mid) => `<svg viewBox="0 0 64 64" aria-hidden="true">${(ART[a] || ART.chick).svg}${typeof mid === 'string' ? accSvg(mid, a) : ''}</svg>`;
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="#f06f93" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

/* ---------- 처음 들어 있는 예시 ---------- */
const A5 = ['mom', 'dad', 'k1', 'k2', 'k3'], K3 = ['k1', 'k2', 'k3'], EV = [0, 1, 2, 3, 4, 5, 6];
const SEED = {
  members: [
    { id: 'mom', name: '엄마', a: 'chick' }, { id: 'dad', name: '아빠', a: 'penguin' },
    { id: 'k1', name: '첫째', a: 'fox' }, { id: 'k2', name: '둘째', a: 'hedgehog' }, { id: 'k3', name: '셋째', a: 'frog' }],
  chores: [
    { id: 'c1', name: '저녁 설거지', pts: 3, days: EV, mode: 'day', who: A5 },
    { id: 'c2', name: '저녁 준비', pts: 4, days: EV, mode: 'day', who: ['mom', 'k1', 'dad', 'k2', 'k3'], off: 2 },
    { id: 'c3', name: '빨래 돌리고 널기', pts: 3, days: [0, 2, 4], mode: 'week', who: K3 },
    { id: 'c4', name: '빨래 개서 정리', pts: 2, days: [1, 3, 5], mode: 'week', who: ['k2', 'k3', 'k1'] },
    { id: 'c5', name: '분리수거', pts: 2, days: [1, 4], mode: 'week', who: ['dad', 'k1', 'k2', 'k3'] },
    { id: 'c6', name: '화장실 청소', pts: 5, days: [5], mode: 'week', who: ['k3', 'k1', 'k2', 'dad'] },
    { id: 'c7', name: '거실·주방 청소기', pts: 3, days: [2, 5], mode: 'week', who: A5, off: 1 },
    { id: 'c8', name: '주말 장보기', pts: 4, days: [6], mode: 'week', who: A5, off: 3 },
    { id: 'c9', name: '음식물 쓰레기 버리기', pts: 2, days: [1, 3, 5], mode: 'fixed', who: [] }],
  rewards: [
    { id: 'r1', name: '가족이 커피 한 잔 사 주기', cost: 20 }, { id: 'r2', name: '설거지 한 번 대신 맡기기', cost: 25 },
    { id: 'r3', name: '주말 외식 메뉴 정하기', cost: 30 }, { id: 'r4', name: '집안일 하루 통째로 쉬기', cost: 50 }],
  done: {}, redeemed: []
};

/* ---------- 날짜 도우미 ---------- */
const DN = ['월', '화', '수', '목', '금', '토', '일'];
const pad = n => String(n).padStart(2, '0');
const keyOf = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const parse = k => { const [a, b, c] = k.split('-').map(Number); return new Date(a, b - 1, c); };
const dayNum = k => { const [a, b, c] = k.split('-').map(Number); return Math.floor(Date.UTC(a, b - 1, c) / 864e5); };
const wd = k => (parse(k).getDay() + 6) % 7;
const weekNum = k => Math.floor((dayNum(k) + 3) / 7);
const addDays = (k, n) => { const d = parse(k); d.setDate(d.getDate() + n); return keyOf(d); };
const label = k => { const d = parse(k); return (d.getMonth() + 1) + '월 ' + d.getDate() + '일 ' + DN[wd(k)] + '요일'; };
let today = keyOf(new Date());

/* ---------- 상태 ---------- */
const ls = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} } };
const clone = o => JSON.parse(JSON.stringify(o));
let S = null, R = null; // R: 서버 연결 (없으면 이 폰에만 저장)
let sel = today, tab = 'todo', editing = null, draft = null, me = ls.get('hh-me'), toastT, pending = false;
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const mem = id => S.members.find(m => m.id === id);
const art = m => ART[m && m.a] || ART.chick;
function normalize(d) { d.done = d.done || {}; d.redeemed = d.redeemed || []; d.members = d.members || []; d.chores = d.chores || []; d.rewards = d.rewards || []; d.deals = d.deals || {}; d.games = d.games || {}; d.adopt = d.adopt || {}; d.buys = d.buys || {}; d.homes = d.homes || {}; d.wear = d.wear || {}; return d; }
/* 원래 순번대로 맡은 사람 */
function baseWho(ch, k) { const ids = ch.who.filter(mem); if (!ids.length) return null; if (ch.mode === 'fixed') return ids[0];
  const i = (ch.mode === 'day' ? dayNum(k) : weekNum(k)) + (ch.off || 0); return ids[((i % ids.length) + ids.length) % ids.length]; }
/* 용돈 부탁: 누가 맡았으면 그 사람이 담당 */
const dealFor = (k, cid) => Object.values(S.deals || {}).find(x => x.k === k && x.cid === cid && x.st !== 'cancel');
function who(ch, k) { const d = dealFor(k, ch.id); if (d && d.to && mem(d.to)) return d.to; return baseWho(ch, k); }
const won = n => Number(n).toLocaleString('ko-KR') + '원';
const nm = id => esc((mem(id) || { name: '?' }).name);
const md = k => (parse(k).getMonth() + 1) + '/' + parse(k).getDate();
let offerKey = null, offerAmt = 3000;
const choresOn = k => S.chores.filter(c => c.days.includes(wd(k)));
const rec = (k, id) => (S.done[k] || {})[id];
const weekKeys = k => { const m = addDays(k, -wd(k)); return EV.map(i => addDays(m, i)); };
function earned(id, keys) { let t = 0; for (const k of keys || Object.keys(S.done)) for (const r of Object.values(S.done[k] || {})) if (r && r.m === id) t += r.p; return t; }
const spent = id => S.redeemed.filter(r => r.m === id).reduce((a, r) => a + r.c, 0);
const gameNet = id => Object.values(S.games || {}).filter(g => g.m === id).reduce((s, g) => s + g.net, 0);
const adoptSpent = id => Object.values(S.adopt || {}).filter(x => x.m === id).reduce((s, x) => s + x.cost, 0);
const owns = (id, k) => AKEYS.includes(k) || Object.values(S.adopt || {}).some(x => x.m === id && x.a === k);
const buySpent = id => Object.values(S.buys || {}).filter(x => x.m === id).reduce((s, x) => s + x.cost, 0);
const bal = id => earned(id) - spent(id) - adoptSpent(id) - buySpent(id) + gameNet(id);
function toast(t) { const e = $('#toast'); e.textContent = t; e.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove('show'), 2200); }

/* 변경: 화면에 바로 반영하고, 서버가 있으면 그 부분만 서버에 보내요(동시에 눌러도 서로 덮어쓰지 않게) */
async function change(localFn, remoteArgs) {
  localFn(); ls.set('hh-cache', JSON.stringify(S)); render();
  if (!R) return;
  try { await R.updateDoc(R.ref, ...remoteArgs(R)); }
  catch (e) { console.error(e); toast('저장이 안 됐어요. 인터넷 연결을 확인해 주세요'); }
}

/* ---------- 화면: 할 일 ---------- */
function vTodo() {
  const cs = choresOn(sel), done = cs.filter(c => rec(sel, c.id)), left = cs.length - done.length;
  const strip = weekKeys(sel).map(k => { const l = choresOn(k), n = l.filter(c => rec(k, c.id)).length;
    return `<button class="day" data-day="${k}" aria-pressed="${k === sel}"${k === today ? ' data-today' : ''} aria-label="${label(k)}"><small>${k === today ? '오늘' : DN[wd(k)]}</small><b>${parse(k).getDate()}</b><i style="--p:${l.length ? n / l.length * 100 : 0}%"></i></button>`; }).join('');
  const segs = done.map(c => `<span style="background:${art(mem(rec(sel, c.id).m)).cD};width:${100 / cs.length}%"></span>`).join('');
  const offerForm = () => `<div class="deal form2"><span>얼마를 주고 부탁할까요?</span><div class="tg">${[1000, 2000, 3000, 5000, 10000].map(v => `<button data-amt="${v}" aria-pressed="${+offerAmt === v}">${won(v)}</button>`).join('')}</div><div class="radd"><input type="number" id="oa" min="100" step="100" inputmode="numeric" value="${offerAmt}" aria-label="용돈 금액(원)"><button class="btn" data-post>올리기</button><button class="btn ghost" data-ocancel>취소</button></div></div>`;
  const item = (c, m) => { const r = rec(sel, c.id), by = r && mem(r.m), a = who(c, sel), o = baseWho(c, sel), d = dealFor(sel, c.id), A = art(by || m);
    let sub = '', extra = '';
    if (r && by && r.m !== a) sub = `${esc(by.name)} 완료${a ? ' · 도와줬어요' : ''}`;
    else if (d && d.to) sub = `${nm(d.from)} 대신 · 용돈 ${won(d.amt)}${d.st === 'paid' ? ' 정산 끝' : ''}`;
    if (d && d.st === 'open') extra = `<div class="deal"><span>용돈 <b>${won(d.amt)}</b> 걸고 대신 해 줄 사람 구해요</span>${me && me !== d.from ? `<button class="mini" data-take="${d.id}">내가 할게요</button>` : ''}${me === d.from ? `<button class="mini ghost" data-xcancel="${d.id}">부탁 취소</button>` : ''}</div>`;
    else if (d && d.st === 'taken' && !r && me === d.to) extra = `<div class="deal"><span>끝내면 ${nm(d.from)}에게 ${won(d.amt)} 받아요</span><button class="mini ghost" data-xdrop="${d.id}">못 하겠어요</button></div>`;
    else if (!r && !d && o && me === o) { const key = sel + '|' + c.id; extra = offerKey === key ? offerForm() : `<div class="deal plain"><button class="mini ghost" data-offer="${key}">용돈 걸고 부탁하기</button></div>`; }
    return `<div class="citem"><button class="chore" data-do="${c.id}" aria-pressed="${!!r}" style="--c:${A.c};--cD:${m ? A.cD : '#c9b6bc'}"><span class="box">${r ? CHECK : ''}</span><span class="cn"><span class="nm">${esc(c.name)}</span>${sub ? `<small>${sub}</small>` : ''}</span><span class="pt">${c.pts}점</span></button>${extra}</div>`; };
  const open = Object.values(S.deals).filter(d => d.st === 'open' && d.k >= today).sort((x, y) => x.k < y.k ? -1 : 1);
  const market = open.length ? `<section class="market"><h3>용돈 걸린 일 ${open.length}개</h3>${open.map(d => `<div class="mrow2"><span><b>${won(d.amt)}</b> · ${esc(d.name)}<small>${md(d.k)} ${DN[wd(d.k)]} · ${nm(d.from)}의 일</small></span>${me && me !== d.from ? `<button class="mini" data-take="${d.id}">내가 할게요</button>` : me === d.from ? `<button class="mini ghost" data-xcancel="${d.id}">부탁 취소</button>` : ''}</div>`).join('')}</section>` : '';
  const group = (m, list, title) => { const A = m ? art(m) : { c: '#f3e3e3', cD: '#c9b6bc' };
    return `<section class="who${m && m.id === me ? ' mine' : ''}" style="--c:${A.c};--cD:${A.cD}"><header><span class="av">${m ? face(m.a, m.id) : '<svg viewBox="0 0 64 64"><text x="32" y="44" text-anchor="middle" font-size="34" font-family="Jua" fill="#8a7a80">?</text></svg>'}</span><h3>${title}${m && m.id === me ? ' <em>나</em>' : ''}</h3><span class="tally">${list.filter(c => rec(sel, c.id)).length} / ${list.length}</span></header><div class="list">${list.length ? list.map(c => item(c, m)).join('') : '<p class="none">오늘은 쉬는 날이에요</p>'}</div></section>`; };
  const ms = [...S.members].sort((a, b) => (b.id === me) - (a.id === me));
  const anyone = cs.filter(c => !who(c, sel));
  const all = cs.length && !left;
  return `<div class="wk"><button data-wk="-7" aria-label="지난주">‹</button><div class="strip">${strip}</div><button data-wk="7" aria-label="다음 주">›</button></div>
  <div class="meter"><div class="big"><b>${done.length}</b><span> / ${cs.length}</span></div><div><p>${sel === today ? '오늘 우리 가족' : label(sel)}</p><div class="bar">${segs}</div><p class="sub">${!cs.length ? '할 일이 없는 날이에요.' : left ? `${left}개 남았어요. 같이 끝내 봐요!` : '모두 끝! 오늘도 팀워크 최고예요.'}</p></div></div>
  ${all ? `<div class="party">${S.members.map(m => face(m.a, m.id)).join('')}</div>` : ''}
  ${me ? '' : '<p class="hint">위에서 ‘나는 누구?’를 고르면 내 할 일이 맨 위로 오고, 다른 가족 일을 대신 하면 내 점수가 돼요.</p>'}
  ${market}
  <div class="grid">${anyone.length ? group(null, anyone, '먼저 하는 사람') : ''}${ms.map(m => group(m, cs.filter(c => who(c, sel) === m.id), esc(m.name))).join('')}</div>`;
}

/* ---------- 화면: 점수·보상 ---------- */
function vScore() {
  const wk = weekKeys(today), rows = S.members.map(m => ({ m, w: earned(m.id, wk) })).sort((a, b) => b.w - a.w), max = Math.max(1, ...rows.map(r => r.w));
  const mm = mem(me), mb = mm ? bal(me) : 0;
  const log = S.redeemed.slice(-8).reverse().map(r => { const m = mem(r.m);
    return `<li><span><b>${esc(m ? m.name : '?')}</b> · ${esc(r.r)} (${r.c}점)</span><time>${parse(r.d).getMonth() + 1}/${parse(r.d).getDate()}</time><button class="link" data-undor="${r.id}">취소</button></li>`; }).join('');
  return `<h2 style="margin-top:8px">이번 주 누가 얼마나 했나</h2><div class="rows">${rows.map(r => `<div class="lb">${face(r.m.a, r.m.id)}<span>${esc(r.m.name)}</span><div class="track"><span style="width:${r.w / max * 100}%;background:${art(r.m).cD}"></span></div><span class="n">${r.w}점</span></div>`).join('')}</div>
  <h2>쓸 수 있는 점수</h2><div class="bal">${S.members.map(m => `<div style="--c:${art(m).c}">${face(m.a, m.id)}<small>${esc(m.name)}</small><b>${bal(m.id)}점</b></div>`).join('')}</div>
  <h2>보상 바꾸기</h2><p class="hint">${mm ? `${esc(mm.name)}의 점수 ${mb}점으로 바꿀 수 있어요.` : '위에서 ‘나는 누구?’를 먼저 골라 주세요.'}</p>
  <div class="rows">${S.rewards.map(r => `<div class="rw"><span class="cn">${esc(r.name)}<small>${r.cost}점</small></span><button class="btn" data-redeem="${r.id}"${!mm || mb < r.cost ? ' disabled' : ''}>바꾸기</button></div>`).join('') || '<p class="none">‘관리’에서 보상을 추가해 주세요.</p>'}</div>
  ${log ? `<h2>최근 바꾼 보상</h2><ul class="log">${log}</ul>` : ''}
  ${vMoney()}`;
}
function vMoney() {
  const all = Object.values(S.deals), owed = all.filter(d => d.st === 'done').sort((x, y) => x.k < y.k ? -1 : 1);
  const paid = all.filter(d => d.st === 'paid').sort((x, y) => (y.pt || 0) - (x.pt || 0)).slice(0, 6);
  const give = me ? owed.filter(d => d.from === me).reduce((s, d) => s + d.amt, 0) : 0, get = me ? owed.filter(d => d.to === me).reduce((s, d) => s + d.amt, 0) : 0;
  const row = d => `<div class="rw"><span class="cn">${nm(d.from)} → ${nm(d.to)} <b>${won(d.amt)}</b><small>${md(d.k)} ${esc(d.name)}</small></span>${me === d.from || me === d.to ? `<button class="btn" data-paid="${d.id}">줬어요</button>` : ''}</div>`;
  return `<h2>용돈 정산</h2>
  ${me && (give || get) ? `<div class="bal money"><div style="--c:#ffd9e2"><small>내가 줄 용돈</small><b>${won(give)}</b></div><div style="--c:#c8edc9"><small>내가 받을 용돈</small><b>${won(get)}</b></div></div>` : ''}
  ${owed.length ? `<div class="rows" style="margin-top:10px">${owed.map(row).join('')}</div><p class="hint">용돈을 주고받았으면 두 사람 중 한 명이 ‘줬어요’를 눌러 주세요.</p>` : `<p class="hint">${all.length ? '아직 안 준 용돈이 없어요.' : '‘할 일’에서 내 일에 ‘용돈 걸고 부탁하기’를 누르면 다른 가족이 대신 해 줄 수 있어요. 끝나면 여기서 정산해요.'}</p>`}
  ${paid.length ? `<ul class="log">${paid.map(d => `<li><span>${nm(d.from)} → ${nm(d.to)} ${won(d.amt)} · ${esc(d.name)}</span><time>${md(d.k)}</time><button class="link" data-unpaid="${d.id}">되돌리기</button></li>`).join('')}</ul>` : ''}`;
}


/* ---------- 화면: 놀이 (점수 게임 · 동물 입양) ---------- */
const DAILY = 5;
let game = 'coin', betAmt = 10, coinPick = 'h', dicePick = 6, last = null;
const rnd = () => crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
const PIPS = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
const dieFace = n => `<div class="die">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<i${PIPS[n].includes(i) ? ' class="on"' : ''}></i>`).join('')}</div>`;
function vPlay() {
  const mm = mem(me), b = mm ? bal(me) : 0;
  const plays = mm ? Object.values(S.games).filter(g => g.m === me && g.d === today).length : 0, left = Math.max(0, DAILY - plays);
  const bet = Math.max(0, Math.min(Math.round(+betAmt || 0), b));
  const log = Object.values(S.games).sort((x, y) => y.t - x.t).slice(0, 6).map(g => `<li><span><b>${nm(g.m)}</b> · ${g.g === 'coin' ? '동전' : '주사위'} ${g.bet}점</span><time class="${g.net > 0 ? 'up' : 'down'}">${g.net > 0 ? '+' : ''}${g.net}점</time></li>`).join('');
  const res = last ? `<div class="result ${last.net > 0 ? 'win' : 'lose'}">${last.g === 'coin' ? `<div class="coin">${last.face === 'h' ? '앞' : '뒤'}</div>` : dieFace(last.face)}<p>${last.net > 0 ? `맞혔어요! +${last.net}점` : `아쉬워요. ${last.net}점`}</p></div>` : '';
  const gameBox = !mm ? '<p class="hint">위에서 ‘나는 누구?’를 먼저 골라 주세요.</p>' : `
  <div class="playcard">
    <div class="pbal">${face(mm.a, mm.id)}<div><small>${esc(mm.name)}의 점수</small><b>${b}점</b></div><span class="left">오늘 ${left}판 남음</span></div>
    <div class="field"><span>게임</span><div class="tg"><button data-game="coin" aria-pressed="${game === 'coin'}">동전 던지기 · 맞히면 2배</button><button data-game="dice" aria-pressed="${game === 'dice'}">주사위 · 맞히면 6배</button></div></div>
    <div class="field"><span>${game === 'coin' ? '어느 쪽이 나올까요?' : '어떤 숫자가 나올까요?'}</span><div class="tg">${game === 'coin' ? [['h', '앞'], ['t', '뒤']].map(([v, t]) => `<button data-cpick="${v}" aria-pressed="${coinPick === v}">${t}</button>`).join('') : [1, 2, 3, 4, 5, 6].map(n => `<button data-dpick="${n}" aria-pressed="${dicePick === n}">${n}</button>`).join('')}</div></div>
    <div class="field"><label for="ba">걸 점수</label><div class="tg">${[5, 10, 20, 50].map(v => `<button data-bet="${v}" aria-pressed="${bet === v}"${v > b ? ' disabled' : ''}>${v}점</button>`).join('')}<button data-bet="${Math.floor(b / 2)}"${b < 2 ? ' disabled' : ''}>절반</button></div><input type="number" id="ba" min="1" max="${b}" inputmode="numeric" value="${bet}"></div>
    <button class="btn" style="width:100%" data-play${!left || bet < 1 ? ' disabled' : ''}>${!left ? '오늘은 여기까지! 내일 또 해요' : game === 'coin' ? '동전 던지기' : '주사위 굴리기'}</button>
    ${res}
  </div>`;
  const own = Object.values(S.adopt);
  const pets = SHOP.map(k => { const A = ART[k], mine = mm && owns(me, k), owner = own.find(x => x.a === k), owners = owner ? [nm(owner.m) + '네 친구'] : [];
    return `<div class="pet" style="--c:${A.c}">${face(k)}<b>${A.name}</b><small>${A.price}점${owners.length ? ' · ' + owners.join(', ') : ''}</small>${mine ? `<button class="mini ghost" data-useava="${k}"${mm.a === k ? ' disabled' : ''}>${mm.a === k ? '대표 캐릭터' : '대표로 하기'}</button>` : (owner ? `<button class="mini ghost" disabled>입양 완료</button>` : `<button class="mini" data-adopt="${k}"${!mm || b < A.price ? ' disabled' : ''}>입양하기</button>`)}</div>`; }).join('');
  return `<h2 style="margin-top:8px">행운 게임</h2>${gameBox}
  <p class="hint">점수로만 하는 놀이예요. 잃은 점수는 돌아오지 않고, 하루 ${DAILY}판까지 할 수 있어요.</p>
  ${log ? `<ul class="log">${log}</ul>` : ''}
  <h2>동물 입양</h2><p class="hint">동물마다 한 마리뿐이라 먼저 입양한 사람의 친구가 돼요. 데려온 친구는 내 캐릭터로 쓰고 우리집에서 함께 살아요.</p>
  <div class="pets">${pets}</div>`;
}


/* ---------- 우리집: 동물 친구들이 사는 집 꾸미기 ---------- */
const HOUSES = {
  room: { name: '작은 방', price: 0, cap: 4 }, cottage: { name: '나무 오두막', price: 40, cap: 6 },
  mushroom: { name: '버섯집', price: 80, cap: 8 }, twostory: { name: '2층집', price: 130, cap: 10 }, castle: { name: '작은 성', price: 250, cap: 14 }
};
const svgUrl = s => `url('data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'>${s}</svg>`).replace(/'/g, '%27')}')`;
const WALLS = {
  plain: { name: '크림', price: 0, bg: '#fdf6ef' }, mint: { name: '민트', price: 10, bg: '#dff3ea' },
  stripe: { name: '분홍 줄무늬', price: 15, bg: 'repeating-linear-gradient(90deg,#fde4ea 0 16px,#fff6f8 16px 32px)' },
  dots: { name: '물방울', price: 15, bg: 'radial-gradient(#f9c0cf 3px,transparent 3.5px) 0 0/22px 22px,#fff8fa' },
  check: { name: '하늘 체크', price: 20, bg: 'repeating-conic-gradient(#e3f1ff 0 25%,#fff 0 50%) 0 0/28px 28px' },
  heart: { name: '하트', price: 25, bg: `${svgUrl("<path d='M14 21s-7-4.5-7-9a3.8 3.8 0 0 1 7-2 3.8 3.8 0 0 1 7 2c0 4.5-7 9-7 9z' fill='#f7a8bd'/>")} 0 0/28px 28px,#fff3f6` },
  star: { name: '별밤', price: 25, bg: `${svgUrl("<path d='M14 5l2.6 5.6 6 .7-4.5 4.1 1.2 6L14 18.4 8.7 21.4l1.2-6-4.5-4.1 6-.7z' fill='#ffe08a'/>")} 0 0/30px 30px,#3d4a7a` }
};
const FLOORS = {
  wood: { name: '나무 바닥', price: 0, bg: 'repeating-linear-gradient(90deg,#dcab7a 0 38px,#cf9c6a 38px 40px)' },
  carpet: { name: '분홍 카펫', price: 15, bg: '#f3d0da' }, tile: { name: '흰 타일', price: 15, bg: 'repeating-conic-gradient(#ececec 0 25%,#fff 0 50%) 0 0/30px 30px' },
  grass: { name: '잔디', price: 20, bg: 'linear-gradient(#bfe6b5,#a3d89a)' }
};
const FURN = {
  bed: { name: '침대', price: 30, w: 30, svg: `<rect x="6" y="30" width="52" height="18" rx="4" fill="#f4b6c8"/><rect x="6" y="20" width="14" height="28" rx="4" fill="#c98f6b"/><rect x="21" y="25" width="16" height="9" rx="4" fill="#fff"/><rect x="8" y="48" width="4" height="9" fill="#a06f4f"/><rect x="52" y="48" width="4" height="9" fill="#a06f4f"/>` },
  sofa: { name: '소파', price: 25, w: 28, svg: `<rect x="6" y="22" width="52" height="22" rx="8" fill="#7cc0e8"/><rect x="2" y="30" width="12" height="20" rx="6" fill="#5aa9d8"/><rect x="50" y="30" width="12" height="20" rx="6" fill="#5aa9d8"/><rect x="12" y="38" width="40" height="12" rx="4" fill="#8fd0f2"/><rect x="10" y="50" width="4" height="7" fill="#3b6e8f"/><rect x="50" y="50" width="4" height="7" fill="#3b6e8f"/>` },
  table: { name: '식탁', price: 20, w: 24, svg: `<rect x="6" y="26" width="52" height="7" rx="3" fill="#c98f6b"/><rect x="10" y="33" width="5" height="24" fill="#a06f4f"/><rect x="49" y="33" width="5" height="24" fill="#a06f4f"/><circle cx="24" cy="21" r="5" fill="#fff"/><rect x="36" y="15" width="8" height="11" rx="2" fill="#f06f93"/>` },
  tv: { name: '텔레비전', price: 35, w: 24, svg: `<rect x="6" y="10" width="52" height="34" rx="4" fill="#3b2f35"/><rect x="10" y="14" width="44" height="26" rx="2" fill="#7cc0e8"/><rect x="28" y="44" width="8" height="6" fill="#5b4a52"/><rect x="18" y="50" width="28" height="5" rx="2" fill="#5b4a52"/>` },
  shelf: { name: '책장', price: 25, w: 18, svg: `<rect x="12" y="4" width="40" height="56" rx="3" fill="#a87447"/><rect x="16" y="8" width="32" height="14" fill="#7a5233"/><rect x="16" y="26" width="32" height="14" fill="#7a5233"/><rect x="16" y="44" width="32" height="12" fill="#7a5233"/><rect x="18" y="10" width="5" height="12" fill="#f06f93"/><rect x="24" y="12" width="5" height="10" fill="#7cc0e8"/><rect x="30" y="10" width="5" height="12" fill="#ffd84a"/><rect x="20" y="28" width="5" height="12" fill="#6cc08b"/><rect x="26" y="30" width="5" height="10" fill="#c58ae0"/>` },
  tank: { name: '어항', price: 30, w: 20, svg: `<rect x="8" y="14" width="48" height="34" rx="4" fill="#bfe6ff" stroke="#8fc9ec" stroke-width="2"/><ellipse cx="30" cy="30" rx="7" ry="4.5" fill="#ff9a3c"/><path d="M37 30l6-4v8z" fill="#ff9a3c"/><path d="M16 46c2-6 0-10 2-14M46 46c-2-5 0-9-1-12" stroke="#6cc08b" stroke-width="3" fill="none"/><rect x="8" y="48" width="48" height="9" fill="#a87447"/>` },
  plant: { name: '화분', price: 10, w: 13, svg: `<path d="M32 36c-14-4-16-18-12-22 6 4 10 12 12 22zM32 36c14-4 16-18 12-22-6 4-10 12-12 22zM32 34c-2-12 0-22 0-26 4 6 4 16 0 26z" fill="#6cc08b"/><path d="M20 36h24l-4 22H24z" fill="#e08a5a"/>` },
  lamp: { name: '스탠드', price: 15, w: 12, svg: `<path d="M22 8h20l6 18H16z" fill="#ffd84a"/><rect x="30" y="26" width="4" height="26" fill="#8a7a80"/><ellipse cx="32" cy="56" rx="12" ry="4" fill="#8a7a80"/>` },
  cushion: { name: '쿠션', price: 8, w: 12, svg: `<rect x="12" y="26" width="40" height="28" rx="11" fill="#ffd84a"/><circle cx="32" cy="40" r="3" fill="#e8b923"/>` },
  ball: { name: '공', price: 8, w: 9, svg: `<circle cx="32" cy="42" r="16" fill="#f06f93"/><path d="M16 42h32M32 26c-6 6-6 26 0 32" stroke="#fff" stroke-width="3" fill="none"/>` },
  rug: { name: '러그', price: 15, w: 34, flat: true, svg: `<ellipse cx="32" cy="32" rx="30" ry="12" fill="#f59ab3"/><ellipse cx="32" cy="32" rx="22" ry="8" fill="#ffd9e2"/>` },
  frame: { name: '그림 액자', price: 10, w: 14, wall: true, svg: `<rect x="8" y="10" width="48" height="40" rx="2" fill="#c98f6b"/><rect x="14" y="16" width="36" height="28" fill="#c8edc9"/><path d="M14 44l12-14 8 8 6-6 10 12z" fill="#6cc08b"/><circle cx="42" cy="24" r="4" fill="#ffd84a"/>` },
  clock: { name: '벽시계', price: 12, w: 11, wall: true, svg: `<circle cx="32" cy="32" r="22" fill="#fff" stroke="#f06f93" stroke-width="5"/><path d="M32 32V18M32 32l9 6" stroke="#3b2f35" stroke-width="3" stroke-linecap="round"/>` },
  window: { name: '창문', price: 20, w: 18, wall: true, svg: `<rect x="8" y="6" width="48" height="46" rx="4" fill="#fff"/><rect x="12" y="10" width="40" height="38" fill="#bfe6ff"/><path d="M32 10v38M12 29h40" stroke="#fff" stroke-width="3"/><circle cx="21" cy="19" r="4" fill="#fff"/>` }
};

Object.assign(FURN, {
  chair: { name: '의자', price: 12, w: 14, svg: `<rect x="18" y="6" width="28" height="26" rx="4" fill="#c98f6b"/><rect x="14" y="32" width="36" height="7" rx="3" fill="#a06f4f"/><rect x="16" y="39" width="4" height="18" fill="#a06f4f"/><rect x="44" y="39" width="4" height="18" fill="#a06f4f"/>` },
  desk: { name: '책상', price: 22, w: 24, svg: `<rect x="4" y="22" width="56" height="6" rx="2" fill="#e0b48a"/><rect x="6" y="28" width="20" height="28" fill="#d6a679"/><rect x="9" y="33" width="14" height="8" rx="2" fill="#c89466"/><rect x="54" y="28" width="4" height="28" fill="#c89466"/><rect x="34" y="10" width="16" height="12" rx="2" fill="#7cc0e8"/><rect x="40" y="22" width="4" height="0.1" fill="#7cc0e8"/>` },
  cactus: { name: '선인장', price: 8, w: 11, svg: `<path d="M27 12a5 5 0 0 1 10 0v24h-10z" fill="#6cc08b"/><path d="M27 26h-6a4 4 0 0 1-4-4v-6a3 3 0 0 1 6 0v4h4zM37 30h5v-6a3 3 0 0 1 6 0v6a4 4 0 0 1-4 4h-7z" fill="#6cc08b"/><path d="M20 36h24l-3 20H23z" fill="#e08a5a"/><circle cx="32" cy="9" r="2.5" fill="#ff8fb1"/>` },
  cake: { name: '케이크', price: 10, w: 12, svg: `<ellipse cx="32" cy="54" rx="22" ry="3" fill="#e9dde1"/><rect x="14" y="30" width="36" height="22" rx="4" fill="#ffe1ea"/><path d="M14 38q4 4 9 0t9 0 9 0 9 0" stroke="#ff9fba" stroke-width="3" fill="none"/><rect x="30" y="18" width="4" height="12" fill="#7cc0e8"/><path d="M32 11q3 4 0 7q-3-3 0-7z" fill="#ffb13a"/>` },
  toybox: { name: '장난감 상자', price: 15, w: 18, svg: `<circle cx="20" cy="17" r="6" fill="#f06f93"/><rect x="34" y="10" width="10" height="10" rx="2" fill="#7cc0e8"/><rect x="8" y="26" width="48" height="30" rx="4" fill="#ffd84a"/><rect x="6" y="20" width="52" height="8" rx="3" fill="#f2b93b"/><path d="M8 40h48" stroke="#f2b93b" stroke-width="3"/>` },
  wardrobe: { name: '옷장', price: 30, w: 20, svg: `<rect x="10" y="4" width="44" height="54" rx="4" fill="#c98f6b"/><path d="M32 6v50" stroke="#a06f4f" stroke-width="2"/><circle cx="29" cy="32" r="1.8" fill="#ffd84a"/><circle cx="35" cy="32" r="1.8" fill="#ffd84a"/><rect x="12" y="58" width="4" height="4" fill="#a06f4f"/><rect x="48" y="58" width="4" height="4" fill="#a06f4f"/>` },
  fridge: { name: '냉장고', price: 35, w: 16, svg: `<rect x="16" y="2" width="32" height="58" rx="5" fill="#dff3ea"/><path d="M16 22h32" stroke="#b6dccb" stroke-width="2"/><rect x="40" y="8" width="3" height="9" rx="1.5" fill="#9cc8b5"/><rect x="40" y="27" width="3" height="12" rx="1.5" fill="#9cc8b5"/><circle cx="26" cy="12" r="3" fill="#f06f93"/><rect x="22" y="30" width="8" height="6" rx="1" fill="#ffd84a"/>` },
  bathtub: { name: '욕조', price: 40, w: 30, svg: `<g fill="#bfe6ff"><circle cx="18" cy="28" r="6"/><circle cx="28" cy="25" r="7"/><circle cx="40" cy="27" r="6"/><circle cx="49" cy="29" r="5"/></g><path d="M4 30h56v6q0 16-16 16H20Q4 52 4 36z" fill="#fff" stroke="#d5e7f3" stroke-width="2"/><rect x="10" y="52" width="4" height="6" fill="#c9d6df"/><rect x="50" y="52" width="4" height="6" fill="#c9d6df"/>` },
  piano: { name: '피아노', price: 45, w: 28, svg: `<rect x="6" y="8" width="52" height="34" rx="4" fill="#3b2f35"/><rect x="6" y="34" width="52" height="10" fill="#fff"/><g fill="#3b2f35"><rect x="12" y="34" width="3" height="6"/><rect x="20" y="34" width="3" height="6"/><rect x="31" y="34" width="3" height="6"/><rect x="39" y="34" width="3" height="6"/><rect x="47" y="34" width="3" height="6"/></g><rect x="10" y="44" width="4" height="13" fill="#3b2f35"/><rect x="50" y="44" width="4" height="13" fill="#3b2f35"/>` },
  fireplace: { name: '벽난로', price: 50, w: 28, svg: `<rect x="6" y="14" width="52" height="44" rx="3" fill="#d98a6a"/><rect x="2" y="10" width="60" height="7" rx="2" fill="#a86a50"/><rect x="16" y="28" width="32" height="30" rx="14" fill="#3b2f35"/><path d="M32 36q8 8 4 16h-8q-4-8 4-16z" fill="#ffb13a"/><path d="M32 43q4 4 2 9h-4q-2-5 2-9z" fill="#ffe08a"/>` },
  tree: { name: '반짝 트리', price: 30, w: 20, svg: `<path d="M32 4l14 20h-6l10 14h-7l9 12H12l9-12h-7l10-14h-6z" fill="#4fae6b"/><rect x="28" y="50" width="8" height="8" fill="#a06f4f"/><path d="M32 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z" fill="#ffd45e"/><circle cx="26" cy="28" r="2.5" fill="#f06f93"/><circle cx="38" cy="38" r="2.5" fill="#7cc0e8"/><circle cx="24" cy="44" r="2.5" fill="#ffd84a"/>` },
  curtain: { name: '커튼', price: 18, w: 22, wall: true, svg: `<rect x="4" y="4" width="56" height="5" rx="2" fill="#a06f4f"/><path d="M6 8h20q-4 22 2 46H6z" fill="#f59ab3"/><path d="M58 8H38q4 22-2 46h22z" fill="#f59ab3"/>` },
  wallshelf: { name: '벽선반', price: 12, w: 18, wall: true, svg: `<path d="M14 40V28h8v12z" fill="#7cc0e8"/><circle cx="34" cy="33" r="6" fill="#6cc08b"/><rect x="30" y="37" width="8" height="3" fill="#e08a5a"/><rect x="44" y="26" width="8" height="14" rx="2" fill="#ffd84a"/><rect x="6" y="40" width="52" height="5" rx="2" fill="#c98f6b"/><path d="M12 45l4 6M52 45l-4 6" stroke="#a06f4f" stroke-width="3"/>` },
  garland: { name: '가랜드', price: 10, w: 24, wall: true, svg: `<path d="M4 10q28 16 56 0" stroke="#c9b6bc" stroke-width="2" fill="none"/><path d="M10 13l4 12 4-11z" fill="#f06f93"/><path d="M22 16l4 12 4-11z" fill="#ffd84a"/><path d="M34 17l4 12 4-11z" fill="#7cc0e8"/><path d="M46 14l4 12 4-11z" fill="#6cc08b"/>` }
});
/* 동물 장신구: 머리 · 얼굴 · 목 한 개씩 */
const ACC = {
  bow: { name: '리본', price: 10, slot: 'head', svg: `<g transform="translate(47 13)"><path d="M0 0l-9-6v12zM0 0l9-6v12z" fill="#ff7aa2"/><circle r="3" fill="#ff5c8d"/></g>` },
  flower: { name: '꽃핀', price: 10, slot: 'head', svg: `<g transform="translate(17 13)" fill="#ffd84a"><circle cx="0" cy="-4" r="3.4"/><circle cx="3.8" cy="-1.2" r="3.4"/><circle cx="2.4" cy="3.2" r="3.4"/><circle cx="-2.4" cy="3.2" r="3.4"/><circle cx="-3.8" cy="-1.2" r="3.4"/><circle r="2.6" fill="#ff8fb1"/></g>` },
  heartpin: { name: '하트 핀', price: 8, slot: 'head', svg: `<path d="M47 16s-6-3.6-6-7.6a3.3 3.3 0 0 1 6-1.8a3.3 3.3 0 0 1 6 1.8c0 4-6 7.6-6 7.6z" fill="#ff5c8d"/>` },
  partyhat: { name: '고깔모자', price: 15, slot: 'head', svg: `<path d="M32 2l10 18H22z" fill="#7cc0e8"/><path d="M27.5 10h9M25 15h14" stroke="#fff" stroke-width="2.5"/><circle cx="32" cy="3" r="3" fill="#ffd84a"/>` },
  strawhat: { name: '밀짚모자', price: 20, slot: 'head', svg: `<ellipse cx="32" cy="16" rx="25" ry="5.5" fill="#f2cf7a"/><path d="M19 16q1-13 13-13t13 13z" fill="#f7dc94"/><path d="M19.6 12.5h24.8" stroke="#f06f93" stroke-width="3"/>` },
  beanie: { name: '털모자', price: 20, slot: 'head', svg: `<path d="M12 22q0-18 20-18t20 18z" fill="#8fd0f2"/><rect x="11" y="18" width="42" height="7" rx="3.5" fill="#5aa9d8"/><circle cx="32" cy="4.5" r="4" fill="#fff"/>` },
  headphones: { name: '헤드폰', price: 30, slot: 'head', svg: `<path d="M10 34q0-25 22-25t22 25" stroke="#5b4a52" stroke-width="4" fill="none"/><rect x="5" y="28" width="9" height="15" rx="4.5" fill="#f06f93"/><rect x="50" y="28" width="9" height="15" rx="4.5" fill="#f06f93"/>` },
  crown: { name: '왕관', price: 40, slot: 'head', svg: `<path d="M18 17l2.5-12 6.5 7 5-9 5 9 6.5-7 2.5 12z" fill="#ffd45e" stroke="#e8b923" stroke-width="1.5" stroke-linejoin="round"/><circle cx="32" cy="12.5" r="2.2" fill="#f06f93"/>` },
  glasses: { name: '동그란 안경', price: 15, slot: 'face', svg: `<g fill="rgba(255,255,255,.18)" stroke="#3b2f35" stroke-width="2.2"><circle cx="23" cy="33" r="7"/><circle cx="41" cy="33" r="7"/></g><path d="M30 33h4" stroke="#3b2f35" stroke-width="2.2"/>` },
  shades: { name: '선글라스', price: 25, slot: 'face', svg: `<rect x="14" y="28" width="16" height="10" rx="5" fill="#3b2f35"/><rect x="34" y="28" width="16" height="10" rx="5" fill="#3b2f35"/><path d="M30 31h4" stroke="#3b2f35" stroke-width="2.5"/><path d="M17.5 31.5l4.5-1.5M37.5 31.5l4.5-1.5" stroke="#fff" stroke-width="1.6" opacity=".6" stroke-linecap="round"/>` },
  bowtie: { name: '나비넥타이', price: 12, slot: 'neck', svg: `<g transform="translate(32 59)"><path d="M0 0l-9-5v10zM0 0l9-5v10z" fill="#f06f93"/><circle r="2.6" fill="#d94f78"/></g>` },
  scarf: { name: '목도리', price: 18, slot: 'neck', svg: `<path d="M12 53q20 10 40 0v6q-20 9-40 0z" fill="#e8453c"/><rect x="40" y="55" width="7" height="9" rx="2" fill="#c93a32"/>` },
  pearls: { name: '진주 목걸이', price: 20, slot: 'neck', svg: `<g fill="#fffaf0" stroke="#e7dccb" stroke-width=".8">${[[16, 55], [21, 58], [26.5, 60], [32, 61], [37.5, 60], [43, 58], [48, 55]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6"/>`).join('')}</g>` }
};
const SLOT = { head: '머리', face: '얼굴', neck: '목' };
let dressPet = null;
const icon = s => `<svg viewBox="0 0 64 64" aria-hidden="true">${s}</svg>`;
let viewHome = null, homeEdit = false, selItem = null, shopTab = 'furn', drag = null;
const homeOf = id => Object.assign({ house: 'room', wall: 'plain', floor: 'wood', place: {} }, (S.homes || {})[id] || {});
const myBuys = (id, kind) => Object.values(S.buys).filter(x => x.m === id && x.kind === kind);
const hasBuy = (id, kind, k) => myBuys(id, kind).some(x => x.k === k);
const petsOf = m => [...new Set([m.a, ...Object.values(S.adopt).filter(x => x.m === m.id).map(x => x.a)])].filter(k => ART[k]);
function roomHtml(m) {
  const h = homeOf(m.id), edit = homeEdit && m.id === me;
  const furn = myBuys(m.id, 'item').filter(x => h.place[x.id] && FURN[x.k]);
  const pets = petsOf(m);
  const els = [
    ...furn.map(x => ({ id: x.id, k: x.k, f: FURN[x.k], p: h.place[x.id] })),
    ...pets.map((k, i) => ({ id: 'pet_' + k, pet: k, p: h.place['pet_' + k] || { x: 20 + (i * 17) % 64, y: 92 } }))
  ].sort((p, q) => (p.f && p.f.flat ? -1 : 0) - (q.f && q.f.flat ? -1 : 0) || p.p.y - q.p.y);
  return `<div class="house" data-h="${h.house}"><div class="roof"></div><div class="room${edit ? ' edit' : ''}" id="room">
    <div class="wallp" style="background:${WALLS[h.wall].bg}"></div><div class="floorp" style="background:${FLOORS[h.floor].bg}"></div>
    ${els.map(e => `<div class="it${e.f && e.f.flat ? ' flat' : ''}${selItem === e.id && edit ? ' sel' : ''}" data-it="${e.id}" style="left:${e.p.x}%;top:${e.p.y}%;width:${e.pet ? 16 : e.f.w}%">${e.pet ? face(e.pet, m.id) : icon(e.f.svg)}</div>`).join('')}
  </div></div>`;
}
function vHome() {
  const mm = mem(me);
  if (!viewHome || !mem(viewHome)) viewHome = me || S.members[0].id;
  const m = mem(viewHome), own = m.id === me, h = homeOf(m.id), cap = HOUSES[h.house].cap;
  const placed = myBuys(m.id, 'item').filter(x => h.place[x.id]).length;
  const tray = own ? myBuys(me, 'item').filter(x => !h.place[x.id] && FURN[x.k]) : [];
  const switcher = `<div class="tg homes">${S.members.map(x => `<button data-vh="${x.id}" aria-pressed="${x.id === m.id}" style="--c:${art(x).c};--cD:${art(x).cD}">${face(x.a, x.id)}${esc(x.name)}네</button>`).join('')}</div>`;
  const ctrl = own ? `<div class="acts homeacts"><button class="btn${homeEdit ? '' : ' ghost'}" data-hedit>${homeEdit ? '꾸미기 끝' : '꾸미기'}</button>${homeEdit && selItem ? `<button class="btn warn" data-unplace>${selItem.startsWith('pet_') ? '원래 자리로' : '넣어 두기'}</button>` : ''}<span class="capn">가구 ${placed} / ${cap}</span></div>
    ${homeEdit ? `<p class="hint">가구와 동물을 끌어서 옮겨요. 눌러서 고른 다음 ‘넣어 두기’를 누르면 창고로 들어가요.</p>
    <div class="tray">${tray.length ? tray.map(x => `<button data-place="${x.id}" title="${FURN[x.k].name}">${icon(FURN[x.k].svg)}<small>${FURN[x.k].name}</small></button>`).join('') : '<p class="none">창고가 비었어요. 아래 가게에서 가구를 사 보세요.</p>'}</div>` : ''}` : `<p class="hint">${esc(m.name)}네 집은 구경만 할 수 있어요. 꾸미기는 ${esc(m.name)}만 할 수 있어요.</p>`;
  let shop = '';
  if (own) {
    const b = bal(me), btn = (kind, k, price, ownd, using, label) => ownd
      ? `<button class="mini ghost" data-use="${kind}:${k}"${using ? ' disabled' : ''}>${using ? '사용 중' : label}</button>`
      : `<button class="mini" data-buy="${kind}:${k}"${b < price ? ' disabled' : ''}>${price ? price + '점' : '무료'}</button>`;
    const tabs = [['furn', '가구'], ['acc', '장신구'], ['wall', '벽지'], ['floor', '바닥'], ['house', '집']];
    let cards = '';
    if (shopTab === 'furn') cards = Object.entries(FURN).map(([k, f]) => { const n = myBuys(me, 'item').filter(x => x.k === k).length;
      return `<div class="good">${icon(f.svg)}<b>${f.name}</b><small>${f.wall ? '벽에 거는 가구' : '바닥 가구'}${n ? ` · ${n}개 있음` : ''}</small><button class="mini" data-buy="item:${k}"${b < f.price ? ' disabled' : ''}>${f.price}점</button></div>`; }).join('');
    if (shopTab === 'acc') cards = Object.entries(ACC).map(([k, x]) => { const ownd = hasBuy(me, 'acc', k);
      return `<div class="good">${icon((ART[mm.a] || ART.chick).svg + x.svg)}<b>${x.name}</b><small>${SLOT[x.slot]} 장신구</small>${ownd ? '<button class="mini ghost" disabled>가지고 있어요</button>' : `<button class="mini" data-buy="acc:${k}"${b < x.price ? ' disabled' : ''}>${x.price}점</button>`}</div>`; }).join('');
    if (shopTab === 'wall') cards = Object.entries(WALLS).map(([k, w]) => `<div class="good"><span class="sw" style="background:${w.bg}"></span><b>${w.name}</b><small>벽지</small>${btn('wall', k, w.price, !w.price || hasBuy(me, 'wall', k), h.wall === k, '바르기')}</div>`).join('');
    if (shopTab === 'floor') cards = Object.entries(FLOORS).map(([k, f]) => `<div class="good"><span class="sw" style="background:${f.bg}"></span><b>${f.name}</b><small>바닥</small>${btn('floor', k, f.price, !f.price || hasBuy(me, 'floor', k), h.floor === k, '깔기')}</div>`).join('');
    if (shopTab === 'house') cards = Object.entries(HOUSES).map(([k, x]) => `<div class="good"><span class="hsw" data-h="${k}"><i></i></span><b>${x.name}</b><small>가구 ${x.cap}개까지</small>${btn('house', k, x.price, !x.price || hasBuy(me, 'house', k), h.house === k, '이사하기')}</div>`).join('');
    const pets = petsOf(mm); if (!dressPet || !pets.includes(dressPet)) dressPet = mm.a;
    const w = ((S.wear[me] || {})[dressPet]) || {}, mine = myBuys(me, 'acc').map(x => x.k).filter(k => ACC[k]);
    const dress = `<h2>동물 꾸미기</h2><div class="dress"><div class="dview">${face(dressPet, me)}</div><div class="dside">
      <div class="tg">${pets.map(k => `<button class="petpick" data-dress="${k}" aria-pressed="${dressPet === k}" aria-label="${ART[k].name}">${face(k, me)}</button>`).join('')}</div>
      ${mine.length ? Object.keys(SLOT).map(s => { const list = mine.filter(k => ACC[k].slot === s); return list.length ? `<div class="field"><span>${SLOT[s]}</span><div class="tg">${list.map(k => `<button data-wear="${s}:${k}" aria-pressed="${w[s] === k}">${ACC[k].name}</button>`).join('')}</div></div>` : ''; }).join('') : '<p class="hint">아래 가게의 ‘장신구’에서 모자나 리본을 사면 여기서 씌울 수 있어요.</p>'}
      <p class="hint">머리, 얼굴, 목에 하나씩 쓸 수 있어요. 한 번 더 누르면 벗어요.</p></div></div>`;
    shop = dress + `<h2>가게</h2><p class="hint">${esc(mm.name)}의 점수 ${b}점</p><div class="tg shoptabs">${tabs.map(([v, t]) => `<button data-stab="${v}" aria-pressed="${shopTab === v}">${t}</button>`).join('')}</div><div class="goods">${cards}</div>`;
  }
  return `<h2 style="margin-top:8px">${esc(m.name)}네 집 · ${HOUSES[h.house].name}</h2>${switcher}${roomHtml(m)}${ctrl}${!me ? '<p class="hint">위에서 ‘나는 누구?’를 고르면 내 집을 꾸밀 수 있어요.</p>' : ''}${shop}`;
}

/* ---------- 화면: 관리 ---------- */
function choreForm() {
  const d = draft;
  return `<div class="form"><div class="field"><label for="dn">집안일 이름</label><input type="text" id="dn" value="${esc(d.name)}" placeholder="예: 이불 빨래"></div>
  <div class="field"><label for="dp">점수</label><input type="number" id="dp" min="0" max="99" inputmode="numeric" value="${d.pts}"></div>
  <div class="field"><span>하는 요일</span><div class="tg">${DN.map((n, i) => `<button data-dday="${i}" aria-pressed="${d.days.includes(i)}">${n}</button>`).join('')}<button data-dall aria-pressed="${d.days.length === 7}">매일</button></div></div>
  <div class="field"><span>맡는 방식</span><div class="tg">${[['fixed', '한 사람이 계속'], ['day', '날마다 돌아가며'], ['week', '주마다 돌아가며']].map(([v, t]) => `<button data-dmode="${v}" aria-pressed="${d.mode === v}">${t}</button>`).join('')}</div></div>
  <div class="field"><span>${d.mode === 'fixed' ? '누가 할까요? (비워 두면 먼저 하는 사람)' : '순번에 들어갈 사람 (누른 순서대로)'}</span><div class="tg">${S.members.map(m => { const i = d.who.indexOf(m.id), A = art(m);
    return `<button data-dwho="${m.id}" aria-pressed="${i >= 0}" style="--c:${A.c};--cD:${A.cD}">${d.mode !== 'fixed' && i >= 0 ? (i + 1) + '. ' : ''}${esc(m.name)}</button>`; }).join('')}</div></div>
  <div class="acts"><button class="btn" data-dsave>저장</button><button class="btn ghost" data-dcancel>취소</button>${editing !== 'new' ? '<button class="btn warn" data-ddel>삭제</button>' : ''}</div></div>`;
}
function vManage() {
  const sum = c => { const days = c.days.length === 7 ? '매일' : [...c.days].sort().map(i => DN[i]).join('·'); const ms = c.who.map(mem).filter(Boolean);
    return days + ' · ' + (c.mode === 'fixed' ? (ms[0] ? esc(ms[0].name) : '먼저 하는 사람') : (c.mode === 'day' ? '날마다' : '주마다') + ' 순번') + ' · ' + c.pts + '점'; };
  const code = ls.get('hh-family');
  return `<h2 style="margin-top:8px">가족과 캐릭터</h2><p class="hint">이름과 캐릭터는 자기 것만 바꿀 수 있어요.</p>${S.members.map(m => m.id === me ? `<div class="mrow"><input type="text" data-name="${m.id}" value="${esc(m.name)}" maxlength="10" aria-label="내 이름"><div class="pick">${[...AKEYS, ...SHOP.filter(k => owns(m.id, k))].map(k => `<button data-ava="${m.id}:${k}" aria-pressed="${m.a === k}" aria-label="${ART[k].name}">${face(k)}</button>`).join('')}</div><button class="btn ghost" data-repin>비밀번호 바꾸기</button></div>` : `<div class="mrow other"><span class="av" style="--c:${art(m).c}">${face(m.a, m.id)}</span><b>${esc(m.name)}</b></div>`).join('')}
  <h2>집안일</h2>${S.chores.map(c => editing === c.id ? choreForm() : `<div class="crow"><span class="cn">${esc(c.name)}<small>${sum(c)}</small></span><span class="dots">${c.who.map(mem).filter(Boolean).map(m => face(m.a, m.id)).join('')}</span><button class="btn ghost" data-edit="${c.id}">편집</button></div>`).join('')}
  ${editing === 'new' ? choreForm() : '<p><button class="btn" data-add>+ 집안일 추가</button></p>'}
  <h2>보상</h2><div class="rows">${S.rewards.map(r => `<div class="rw"><span class="cn">${esc(r.name)}<small>${r.cost}점</small></span><button class="btn warn" data-rdel="${r.id}">삭제</button></div>`).join('')}</div>
  <div class="radd"><input type="text" id="rn" placeholder="새 보상 (예: 치킨 메뉴 정하기)" aria-label="보상 이름"><input type="number" id="rc" min="1" value="30" inputmode="numeric" aria-label="필요한 점수"><button class="btn" data-radd>추가</button></div>
  ${R && code ? `<h2>가족 코드</h2><p class="hint">가족에게 이 코드를 보내 주세요. 앱을 열고 ‘가족 코드로 참여’에 넣으면 같은 판을 써요.</p><p><span class="code">${code.slice(0, 4)}-${code.slice(4)}</span></p><div class="acts"><button class="btn ghost" data-copy>코드 복사</button><button class="btn warn" data-leave>다른 코드로 바꾸기</button></div>` : ''}`;
}

/* ---------- 그리기 ---------- */
function render() {
  if (!S) return;
  const f = document.activeElement;
  if ((f && f.matches && f.matches('#view input')) || drag) { pending = true; return; } // 입력 중엔 화면을 바꾸지 않아요
  pending = false;
  const now = keyOf(new Date()); if (now !== today) { if (sel === today) sel = now; today = now; }
  $('#date').textContent = label(today);
  $('#peek').innerHTML = S.members.slice(0, 5).map(m => face(m.a, m.id)).join('');
  document.querySelectorAll('nav button').forEach(b => b.setAttribute('aria-current', b.dataset.t === tab ? 'page' : 'false'));
  $('#me').innerHTML = S.members.map(m => `<button class="chip" data-me="${m.id}" style="--c:${art(m).c}" aria-pressed="${m.id === me}">${face(m.a, m.id)}${esc(m.name)}</button>`).join('');
  $('#view').innerHTML = tab === 'score' ? vScore() : tab === 'manage' ? vManage() : tab === 'play' ? vPlay() : tab === 'home' ? vHome() : vTodo();
}
document.addEventListener('focusout', () => setTimeout(() => { if (pending) render(); }, 0));
function route() { const h = location.hash.slice(1); tab = ['todo', 'score', 'play', 'home', 'manage'].includes(h) ? h : 'todo'; render(); scrollTo(0, 0); }


/* ---------- 나는 누구? : 4자리 비밀번호로 본인 확인 ---------- */
async function pinHash(id, pin) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode((ls.get('hh-family') || 'local') + ':' + id + ':' + pin));
  return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, '0')).join('');
}
const okList = () => { try { return JSON.parse(ls.get('hh-ok') || '[]'); } catch (e) { return []; } };
const setOk = id => { const l = okList(); if (!l.includes(id)) l.push(id); ls.set('hh-ok', JSON.stringify(l)); };
let pinFor = null, pinMode = 'enter';
function openPin(id, mode) {
  const m = mem(id); pinFor = id; pinMode = mode || (m.pin ? 'enter' : 'set');
  $('#pinFace').innerHTML = face(m.a, m.id);
  $('#pinTitle').textContent = pinMode === 'set' ? `${m.name}의 비밀번호 정하기` : `${m.name} 맞나요?`;
  $('#pinSub').textContent = pinMode === 'set' ? '숫자 4자리를 정해 주세요. 이 번호를 아는 사람만 이 이름으로 체크하고 꾸밀 수 있어요.' : '비밀번호 4자리를 넣어 주세요.';
  $('#pinMsg').textContent = ''; $('#pinIn').value = ''; $('#pin').hidden = false; setTimeout(() => $('#pinIn').focus(), 50);
}
async function submitPin() {
  const v = $('#pinIn').value.trim(), m = mem(pinFor);
  if (!/^\d{4}$/.test(v)) { $('#pinMsg').textContent = '숫자 4자리를 넣어 주세요.'; return; }
  const h = await pinHash(pinFor, v);
  if (pinMode === 'enter' && h !== m.pin) { $('#pinMsg').textContent = '번호가 달라요. 다시 넣어 주세요.'; $('#pinIn').value = ''; return; }
  $('#pin').hidden = true; $('#pinIn').blur(); setOk(pinFor); me = pinFor; ls.set('hh-me', me);
  if (pinMode === 'set') { change(() => { m.pin = h; }, () => [{ members: S.members }]); toast('비밀번호를 정했어요'); }
  else { render(); toast(`${m.name}로 들어왔어요`); }
}
$('#pinOk').addEventListener('click', submitPin);
$('#pinNo').addEventListener('click', () => { $('#pin').hidden = true; });
$('#pinIn').addEventListener('keydown', e => { if (e.key === 'Enter') submitPin(); });

/* ---------- 누르기 ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || !S) return; const d = b.dataset;
  if (d.t) { if (location.hash.slice(1) !== d.t) location.hash = d.t; else route(); return; }
  if (d.me) { if (me === d.me) { me = null; ls.set('hh-me', null); render(); return; }
    if (okList().includes(d.me) && mem(d.me).pin) { me = d.me; ls.set('hh-me', me); render(); return; }
    openPin(d.me); return; }
  if ('repin' in d) { if (me) openPin(me, 'set'); return; }
  if (d.day) { sel = d.day; render(); return; }
  if (d.wk) { sel = addDays(sel, +d.wk); render(); return; }
  if (d.do) {
    const c = S.chores.find(x => x.id === d.do), k = sel, dl = dealFor(k, c.id);
    if (rec(k, c.id)) {
      if (dl && dl.st === 'paid') { toast('이미 용돈을 정산한 일이라 되돌릴 수 없어요'); return; }
      const back = dl && dl.st === 'done';
      change(() => { delete S.done[k][c.id]; if (back) dl.st = 'taken'; },
        R => [new R.FieldPath('done', k, c.id), R.deleteField(), ...(back ? [new R.FieldPath('deals', dl.id, 'st'), 'taken'] : [])]);
      return;
    }
    const m = me || who(c, k); if (!m) { toast('먼저 ‘나는 누구?’를 골라 주세요'); return; }
    const r = { m, p: c.pts };
    // 용돈이 걸린 일: 부탁한 사람이 직접 하면 부탁 취소, 다른 사람이 하면 그 사람이 용돈을 받아요
    const ds = dl ? (m === dl.from ? 'cancel' : 'done') : null, dt = dl && ds === 'done' ? m : null;
    change(() => { (S.done[k] = S.done[k] || {})[c.id] = r; if (dl) { dl.st = ds; if (dt) dl.to = dt; } },
      R => [new R.FieldPath('done', k, c.id), r, ...(dl ? [new R.FieldPath('deals', dl.id, 'st'), ds] : []), ...(dt ? [new R.FieldPath('deals', dl.id, 'to'), dt] : [])]);
    toast(ds === 'done' ? `+${c.pts}점 · 용돈 ${won(dl.amt)} 받아요` : `${mem(m).name} +${c.pts}점!`); return;
  }



  if (d.dress) { dressPet = d.dress; render(); return; }
  if (d.wear) {
    const [slot, k] = d.wear.split(':'), p = dressPet; if (!me || !p || !hasBuy(me, 'acc', k)) return;
    const cur = ((S.wear[me] || {})[p] || {})[slot], v = cur === k ? null : k;
    change(() => { S.wear[me] = S.wear[me] || {}; S.wear[me][p] = S.wear[me][p] || {}; if (v) S.wear[me][p][slot] = v; else delete S.wear[me][p][slot]; },
      R => [new R.FieldPath('wear', me, p, slot), v ? v : R.deleteField()]); return;
  }
  if (d.vh) { viewHome = d.vh; homeEdit = false; selItem = null; render(); return; }
  if ('hedit' in d) { if (viewHome !== me) return; homeEdit = !homeEdit; selItem = null; render(); return; }
  if (d.stab) { shopTab = d.stab; render(); return; }
  if (d.buy) {
    const [kind, k] = d.buy.split(':'), cat = { item: FURN, acc: ACC, wall: WALLS, floor: FLOORS, house: HOUSES }[kind][k];
    if (!me || bal(me) < cat.price) return;
    if (!b.dataset.arm) { b.dataset.arm = 1; b.textContent = '살까요?'; return; }
    const x = { id: 'b' + Date.now(), m: me, kind, k, cost: cat.price, t: Date.now() };
    const apply = ['wall', 'floor', 'house'].includes(kind) ? kind : null; if (kind === 'acc' && hasBuy(me, 'acc', k)) return;
    change(() => { S.buys[x.id] = x; if (apply) { S.homes[me] = homeOf(me); S.homes[me][apply] = k; } },
      R => [new R.FieldPath('buys', x.id), x, ...(apply ? [new R.FieldPath('homes', me, apply), k] : [])]);
    toast(kind === 'item' ? `${cat.name}를 샀어요. ‘꾸미기’에서 놓아 보세요` : kind === 'acc' ? `${cat.name}를 샀어요. ‘동물 꾸미기’에서 씌워 보세요` : `${cat.name}로 바꿨어요`); return;
  }
  if (d.use) { const [kind, k] = d.use.split(':'); if (!me) return;
    change(() => { S.homes[me] = homeOf(me); S.homes[me][kind] = k; }, R => [new R.FieldPath('homes', me, kind), k]); return; }
  if (d.place) { const id = d.place, x = S.buys[id]; if (!x || x.m !== me) return; const h = homeOf(me);
    const n = myBuys(me, 'item').filter(y => h.place[y.id]).length; if (n >= HOUSES[h.house].cap) { toast('집이 꽉 찼어요. 더 큰 집으로 이사해 보세요'); return; }
    const p = { x: 50, y: FURN[x.k].wall ? 38 : 80 };
    change(() => { S.homes[me] = h; h.place[id] = p; }, R => [new R.FieldPath('homes', me, 'place', id), p]); selItem = id; return; }
  if ('unplace' in d) { const id = selItem; if (!id) return; selItem = null;
    change(() => { const h = homeOf(me); delete h.place[id]; S.homes[me] = h; }, R => [new R.FieldPath('homes', me, 'place', id), R.deleteField()]); return; }
  if (d.game) { game = d.game; last = null; render(); return; }
  if (d.cpick) { coinPick = d.cpick; render(); return; }
  if (d.dpick) { dicePick = +d.dpick; render(); return; }
  if (d.bet) { betAmt = +d.bet; render(); return; }
  if ('play' in d) {
    if (!me) return; const b = bal(me), bet = Math.round(+betAmt || 0);
    const plays = Object.values(S.games).filter(g => g.m === me && g.d === today).length;
    if (plays >= DAILY) { toast('오늘은 다 했어요. 내일 또 해요'); return; }
    if (!(bet >= 1) || bet > b) { toast(`1점에서 ${b}점 사이로 걸어 주세요`); return; }
    const r = rnd(); let faceV, win;
    if (game === 'coin') { faceV = r < 0.5 ? 'h' : 't'; win = faceV === coinPick; }
    else { faceV = 1 + Math.floor(r * 6); win = faceV === dicePick; }
    const net = win ? (game === 'coin' ? bet : bet * 5) : -bet;
    const x = { id: 'g' + Date.now(), m: me, g: game, bet, net, face: faceV, d: today, t: Date.now() };
    last = x; $('#ba') && $('#ba').blur();
    change(() => { S.games[x.id] = x; }, R => [new R.FieldPath('games', x.id), x]);
    return;
  }
  if (d.adopt) {
    const k = d.adopt, A = ART[k]; if (!me || bal(me) < A.price || Object.values(S.adopt).some(x => x.a === k)) return;
    if (!b.dataset.arm) { b.dataset.arm = 1; b.textContent = `${A.price}점 쓸까요?`; return; }
    adoptAnimal(k); return;
  }
  if (d.useava) { const k = d.useava; if (!me || !owns(me, k)) return; change(() => { mem(me).a = k; }, () => [{ members: S.members }]); toast('대표 캐릭터를 바꿨어요'); return; }
  if (d.offer) { offerKey = d.offer; offerAmt = 3000; render(); return; }
  if (d.amt) { offerAmt = +d.amt; render(); return; }
  if ('ocancel' in d) { offerKey = null; render(); return; }
  if ('post' in d) {
    const amt = Math.round(+$('#oa').value), [k, cid] = offerKey.split('|'), c = S.chores.find(x => x.id === cid);
    if (!(amt >= 100)) { toast('금액을 100원 이상으로 적어 주세요'); return; }
    if (!c || !me) return;
    const x = { id: 'd' + Date.now(), k, cid, name: c.name, from: me, to: null, amt, st: 'open', t: Date.now() };
    offerKey = null; $('#oa').blur();
    change(() => { S.deals[x.id] = x; }, R => [new R.FieldPath('deals', x.id), x]);
    toast(`용돈 ${won(amt)}을 걸었어요`); return;
  }
  if (d.take) { takeDeal(d.take); return; }
  if (d.xcancel) { const id = d.xcancel; change(() => { S.deals[id].st = 'cancel'; }, R => [new R.FieldPath('deals', id, 'st'), 'cancel']); toast('부탁을 취소했어요'); return; }
  if (d.xdrop) { const id = d.xdrop; change(() => { S.deals[id].st = 'open'; S.deals[id].to = null; }, R => [new R.FieldPath('deals', id, 'st'), 'open', new R.FieldPath('deals', id, 'to'), null]); toast('다시 다른 가족을 기다려요'); return; }
  if (d.paid) { const id = d.paid, t = Date.now(); change(() => { S.deals[id].st = 'paid'; S.deals[id].pt = t; }, R => [new R.FieldPath('deals', id, 'st'), 'paid', new R.FieldPath('deals', id, 'pt'), t]); toast('정산했어요'); return; }
  if (d.unpaid) { const id = d.unpaid; if (me !== S.deals[id].from && me !== S.deals[id].to) { toast('주고받은 두 사람만 되돌릴 수 있어요'); return; } change(() => { S.deals[id].st = 'done'; }, R => [new R.FieldPath('deals', id, 'st'), 'done']); return; }
  if (d.redeem) { const r = S.rewards.find(x => x.id === d.redeem); if (!me || bal(me) < r.cost) return;
    const x = { id: 'x' + Date.now(), m: me, r: r.name, c: r.cost, d: today };
    change(() => S.redeemed.push(x), R => [{ redeemed: R.arrayUnion(x) }]); toast(`‘${r.name}’ 획득!`); return; }
  if (d.undor) { const x = S.redeemed.find(r => r.id === d.undor); if (!x) return; if (x.m !== me) { toast('바꾼 사람만 취소할 수 있어요'); return; }
    change(() => { S.redeemed = S.redeemed.filter(r => r !== x); }, R => [{ redeemed: R.arrayRemove(x) }]); toast('취소하고 점수를 돌려줬어요'); return; }
  if (d.ava) { const [id, a] = d.ava.split(':'); if (id !== me) { toast('자기 캐릭터만 바꿀 수 있어요'); return; } change(() => { mem(id).a = a; }, () => [{ members: S.members }]); return; }
  if (d.edit) { editing = d.edit; draft = clone(S.chores.find(c => c.id === d.edit)); render(); return; }
  if ('add' in d) { editing = 'new'; draft = { id: 'c' + Date.now(), name: '', pts: 2, days: [...EV], mode: 'fixed', who: [] }; render(); return; }
  if (d.dday) { const i = +d.dday; draft.days = draft.days.includes(i) ? draft.days.filter(x => x !== i) : [...draft.days, i]; render(); return; }
  if ('dall' in d) { draft.days = draft.days.length === 7 ? [] : [...EV]; render(); return; }
  if (d.dmode) { draft.mode = d.dmode; if (d.dmode === 'fixed') draft.who = draft.who.slice(0, 1); render(); return; }
  if (d.dwho) { const id = d.dwho, has = draft.who.includes(id); draft.who = has ? draft.who.filter(x => x !== id) : draft.mode === 'fixed' ? [id] : [...draft.who, id]; render(); return; }
  if ('dcancel' in d) { editing = null; draft = null; render(); return; }
  if ('dsave' in d) {
    draft.name = draft.name.trim(); if (!draft.name) { toast('집안일 이름을 적어 주세요'); return; }
    if (!draft.days.length) { toast('요일을 하나 이상 골라 주세요'); return; }
    draft.pts = Math.max(0, Math.min(99, Math.round(+draft.pts || 0)));
    const dr = draft; editing = null; draft = null;
    change(() => { const i = S.chores.findIndex(c => c.id === dr.id); if (i >= 0) S.chores[i] = dr; else S.chores.push(dr); }, () => [{ chores: S.chores }]);
    toast('저장했어요'); return;
  }
  if ('ddel' in d) { if (!b.dataset.arm) { b.dataset.arm = 1; b.textContent = '한 번 더 누르면 삭제'; return; }
    const id = draft.id; editing = null; draft = null; change(() => { S.chores = S.chores.filter(c => c.id !== id); }, () => [{ chores: S.chores }]); toast('삭제했어요'); return; }
  if (d.rdel) { if (!b.dataset.arm) { b.dataset.arm = 1; b.textContent = '정말 삭제'; return; }
    change(() => { S.rewards = S.rewards.filter(r => r.id !== d.rdel); }, () => [{ rewards: S.rewards }]); return; }
  if ('radd' in d) { const n = $('#rn').value.trim(), c = Math.round(+$('#rc').value); if (!n || !(c > 0)) { toast('보상 이름과 점수를 적어 주세요'); return; }
    $('#rn').blur(); change(() => S.rewards.push({ id: 'r' + Date.now(), name: n, cost: c }), () => [{ rewards: S.rewards }]); toast('보상을 추가했어요'); return; }
  if ('copy' in d) { const c = ls.get('hh-family'); navigator.clipboard.writeText(`우리집 집안일 가족 코드: ${c.slice(0, 4)}-${c.slice(4)}\n${location.href.split('#')[0]}`).then(() => toast('복사했어요'), () => toast('복사가 안 돼요. 코드를 직접 적어 주세요')); return; }
  if ('leave' in d) { if (!b.dataset.arm) { b.dataset.arm = 1; b.textContent = '한 번 더 누르면 나가기'; return; }
    ls.set('hh-family', null); ls.set('hh-cache', null); location.hash = ''; location.reload(); return; }
});

/* 입양: 동물마다 한 마리, 동시에 눌러도 먼저 누른 사람만 */
async function adoptAnimal(k) {
  const A = ART[k], x = { id: 'a' + Date.now(), m: me, a: k, cost: A.price, t: Date.now() };
  if (R) {
    try {
      await R.runTransaction(R.db, async tx => {
        const s = await tx.get(R.ref), cur = (s.data() || {}).adopt || {};
        if (Object.values(cur).some(y => y.a === k)) throw new Error('taken');
        tx.update(R.ref, new R.FieldPath('adopt', x.id), x);
      });
    } catch (e) { toast(e.message === 'taken' ? '앗, 다른 가족이 먼저 입양했어요' : '입양하지 못했어요. 인터넷 연결을 확인해 주세요'); return; }
  }
  S.adopt[x.id] = x; ls.set('hh-cache', JSON.stringify(S)); render(); toast(`${A.name}를 입양했어요!`);
}
/* 맡기: 두 사람이 동시에 눌러도 한 사람만 맡도록 서버에서 확인해요 */
async function takeDeal(id) {
  const x = S.deals[id]; if (!x || x.st !== 'open') return;
  if (!me) { toast('먼저 ‘나는 누구?’를 골라 주세요'); return; }
  if (R) {
    try {
      await R.runTransaction(R.db, async tx => {
        const s = await tx.get(R.ref), cur = ((s.data() || {}).deals || {})[id];
        if (!cur || cur.st !== 'open') throw new Error('taken');
        tx.update(R.ref, new R.FieldPath('deals', id, 'to'), me, new R.FieldPath('deals', id, 'st'), 'taken');
      });
    } catch (e) { toast(e.message === 'taken' ? '이미 다른 가족이 맡았어요' : '맡지 못했어요. 인터넷 연결을 확인해 주세요'); return; }
  }
  x.to = me; x.st = 'taken'; ls.set('hh-cache', JSON.stringify(S)); render();
  toast(`맡았어요! 끝내면 용돈 ${won(x.amt)}`);
}
document.addEventListener('input', e => { if (e.target.id === 'oa') offerAmt = e.target.value; if (e.target.id === 'ba') betAmt = e.target.value; if (!draft) return; if (e.target.id === 'dn') draft.name = e.target.value; if (e.target.id === 'dp') draft.pts = e.target.value; });
document.addEventListener('change', e => { const id = e.target.dataset && e.target.dataset.name; if (!id) return; if (id !== me) { e.target.value = mem(id).name; return; } const v = e.target.value.trim().slice(0, 10);
  if (!v) { e.target.value = mem(id).name; return; } e.target.blur(); change(() => { mem(id).name = v; }, () => [{ members: S.members }]); });

/* 가구 끌어서 옮기기 (내 집, 꾸미기 중일 때만) */
document.addEventListener('pointerdown', e => {
  const el = e.target.closest('.room.edit .it'); if (!el) return;
  const room = $('#room').getBoundingClientRect();
  drag = { el, id: el.dataset.it, room, sx: e.clientX, sy: e.clientY, moved: false };
  el.setPointerCapture(e.pointerId); e.preventDefault();
});
document.addEventListener('pointermove', e => {
  if (!drag) return;
  if (Math.abs(e.clientX - drag.sx) + Math.abs(e.clientY - drag.sy) > 6) drag.moved = true;
  if (!drag.moved) return;
  const x = Math.max(4, Math.min(96, (e.clientX - drag.room.left) / drag.room.width * 100));
  const y = Math.max(12, Math.min(99, (e.clientY - drag.room.top) / drag.room.height * 100));
  drag.el.style.left = x + '%'; drag.el.style.top = y + '%'; drag.x = x; drag.y = y;
});
document.addEventListener('pointerup', () => {
  if (!drag) return; const g = drag; drag = null;
  if (!g.moved) { selItem = selItem === g.id ? null : g.id; render(); return; }
  const p = { x: Math.round(g.x * 10) / 10, y: Math.round(g.y * 10) / 10 }; selItem = g.id;
  change(() => { const h = homeOf(me); h.place[g.id] = p; S.homes[me] = h; }, R => [new R.FieldPath('homes', me, 'place', g.id), p]);
});
window.addEventListener('hashchange', route);
document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });

/* ---------- 시작 ---------- */
function startApp(note) { $('#setup').hidden = true; $('#app').hidden = false; $('#sync').textContent = note; if (!mem(me) || !okList().includes(me) || !mem(me).pin) me = null; route(); }

async function connect(code) {
  const [{ initializeApp }, { getAuth, signInAnonymously }, F] = await Promise.all([
    import(FB + 'firebase-app.js'), import(FB + 'firebase-auth.js'), import(FB + 'firebase-firestore.js')]);
  const app = initializeApp(firebaseConfig);
  await signInAnonymously(getAuth(app));
  let db; try { db = F.initializeFirestore(app, { localCache: F.persistentLocalCache() }); } catch (e) { db = F.getFirestore(app); }
  return { ...F, db, ref: F.doc(db, 'families', code) };
}
function listen() {
  R.onSnapshot(R.ref, snap => {
    if (!snap.exists()) return;
    S = normalize(snap.data()); ls.set('hh-cache', JSON.stringify(S)); $('#sync').textContent = '가족 모두와 실시간으로 함께 저장돼요';
    if ($('#app').hidden) startApp('가족 모두와 실시간으로 함께 저장돼요'); else render();
  }, err => { console.error(err); toast('가족 판을 불러오지 못했어요'); });
}
const ABC = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const newCode = () => Array.from(crypto.getRandomValues(new Uint8Array(8)), n => ABC[n % ABC.length]).join('');
const cleanCode = t => t.toUpperCase().replace(/[^A-Z0-9]/g, '');

async function boot() {
  if (!firebaseConfig) { // 서버 없이 이 폰에만
    try { S = normalize(JSON.parse(ls.get('hh-cache')) || clone(SEED)); } catch (e) { S = clone(SEED); }
    startApp('서버 연결 전이라 이 폰에만 저장돼요 (설치안내.md 참고)'); return;
  }
  const code = ls.get('hh-family');
  if (code) {
    try { const c = JSON.parse(ls.get('hh-cache')); if (c) { S = normalize(c); startApp('연결 중…'); } } catch (e) {}
    try { R = await connect(code); listen(); }
    catch (e) { console.error(e); if (S) $('#sync').textContent = '오프라인이에요. 연결되면 자동으로 맞춰져요'; else showSetup('연결하지 못했어요. 인터넷을 확인하고 다시 열어 주세요.'); }
    return;
  }
  showSetup('');
}
function showSetup(msg) {
  $('#setupParty').innerHTML = AKEYS.map(face).join('');
  $('#setupMsg').textContent = msg; $('#setup').hidden = false; $('#app').hidden = true;
}
$('#create').addEventListener('click', async () => {
  $('#setupMsg').textContent = '가족 판을 만드는 중…';
  try {
    const code = newCode(); R = await connect(code);
    await R.setDoc(R.ref, clone(SEED)); ls.set('hh-family', code); listen();
    location.hash = 'manage'; setTimeout(() => toast('가족 코드를 가족에게 보내 주세요'), 600);
  } catch (e) { console.error(e); $('#setupMsg').textContent = '만들지 못했어요. config.js 설정과 인터넷을 확인해 주세요.'; }
});
$('#join').addEventListener('submit', async e => {
  e.preventDefault();
  const code = cleanCode($('#joinCode').value); if (code.length !== 8) { $('#setupMsg').textContent = '코드 8자리를 확인해 주세요.'; return; }
  $('#setupMsg').textContent = '찾는 중…';
  try {
    R = await connect(code); const snap = await R.getDoc(R.ref);
    if (!snap.exists()) { $('#setupMsg').textContent = '그 코드의 가족을 찾지 못했어요.'; R = null; return; }
    ls.set('hh-family', code); listen();
  } catch (err) { console.error(err); $('#setupMsg').textContent = '연결하지 못했어요. 인터넷을 확인해 주세요.'; }
});

if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
boot();
