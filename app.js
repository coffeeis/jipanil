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
const LION_MANE = [[52,34],[46.1,48.1],[32,54],[17.9,48.1],[12,34],[17.9,19.9],[32,14],[46.1,19.9]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="10"/>`).join('');
Object.assign(ART, {
  pig: { name: '돼지', price: 30, c: '#ffd6df', cD: '#ec8aa3', svg:
    `<path d="M10 12l13 7-10 9zM54 12l-13 7 10 9z" fill="#f59ab0"/><circle cx="32" cy="36" r="24" fill="#ffb8c8"/>${EYE(23, 31)}${EYE(41, 31)}<ellipse cx="32" cy="43" rx="10" ry="7" fill="#f590a8"/><ellipse cx="28.5" cy="43" rx="2" ry="3" fill="#b85a73"/><ellipse cx="35.5" cy="43" rx="2" ry="3" fill="#b85a73"/>${BLUSH(42)}` },
  sheep: { name: '양', price: 30, c: '#efece6', cD: '#9a948a', svg:
    `<g fill="#fffdf8" stroke="#e2ddd2" stroke-width="1.5"><circle cx="18" cy="20" r="9"/><circle cx="32" cy="15" r="10"/><circle cx="46" cy="20" r="9"/><circle cx="12" cy="34" r="8"/><circle cx="52" cy="34" r="8"/><circle cx="18" cy="48" r="8"/><circle cx="46" cy="48" r="8"/><circle cx="32" cy="52" r="8"/></g><ellipse cx="11" cy="31" rx="6" ry="3.5" fill="#d9c3ad"/><ellipse cx="53" cy="31" rx="6" ry="3.5" fill="#d9c3ad"/><ellipse cx="32" cy="36" rx="14" ry="15" fill="#f3e1cf"/>${EYE(26, 34)}${EYE(38, 34)}<path d="M29 42q3 2.5 6 0" stroke="#3b2f35" stroke-width="2" fill="none" stroke-linecap="round"/>${BLUSH(41)}` },
  panda: { name: '판다', price: 50, c: '#e8e4e6', cD: '#4a4446', svg:
    `<circle cx="14" cy="14" r="8" fill="#2f2a2c"/><circle cx="50" cy="14" r="8" fill="#2f2a2c"/><circle cx="32" cy="35" r="25" fill="#fff" stroke="#e6e0e2" stroke-width="1.5"/><ellipse cx="22" cy="33" rx="6" ry="8" transform="rotate(-25 22 33)" fill="#2f2a2c"/><ellipse cx="42" cy="33" rx="6" ry="8" transform="rotate(25 42 33)" fill="#2f2a2c"/><circle cx="23" cy="32" r="2.2" fill="#fff"/><circle cx="41" cy="32" r="2.2" fill="#fff"/><ellipse cx="32" cy="42" rx="3.5" ry="2.5" fill="#2f2a2c"/>${BLUSH(45)}` },
  turtle: { name: '거북이', price: 50, c: '#d4efcf', cD: '#4f9c58', svg:
    `<ellipse cx="32" cy="52" rx="27" ry="11" fill="#8b6a3e"/><path d="M12 50q20-10 40 0" stroke="#c9a46a" stroke-width="3" fill="none"/><circle cx="32" cy="31" r="20" fill="#8fd18a"/>${EYE(25, 29)}${EYE(39, 29)}<path d="M26 37q6 5 12 0" stroke="#3b2f35" stroke-width="2.4" fill="none" stroke-linecap="round"/>${BLUSH(36)}` },
  owl: { name: '부엉이', price: 60, c: '#ead7bf', cD: '#a87447', svg:
    `<path d="M10 9l12 11H9zM54 9L42 20h13z" fill="#8a5f3c"/><circle cx="32" cy="36" r="24" fill="#a87447"/><ellipse cx="32" cy="47" rx="14" ry="11" fill="#e9cfa8"/><circle cx="22" cy="30" r="9" fill="#fff"/><circle cx="42" cy="30" r="9" fill="#fff"/><circle cx="22" cy="31" r="4.5" fill="#3b2f35"/><circle cx="42" cy="31" r="4.5" fill="#3b2f35"/><circle cx="23.5" cy="29.5" r="1.4" fill="#fff"/><circle cx="43.5" cy="29.5" r="1.4" fill="#fff"/><path d="M28 38h8l-4 6z" fill="#f4a13a"/>` },
  koala: { name: '코알라', price: 60, c: '#dfe3e7', cD: '#7d858d', svg:
    `<circle cx="12" cy="22" r="11" fill="#9ea4ab"/><circle cx="52" cy="22" r="11" fill="#9ea4ab"/><circle cx="12" cy="22" r="6" fill="#f2c9d2"/><circle cx="52" cy="22" r="6" fill="#f2c9d2"/><circle cx="32" cy="36" r="22" fill="#b3b9bf"/>${EYE(23, 32)}${EYE(41, 32)}<ellipse cx="32" cy="41" rx="5" ry="7" fill="#3b3438"/>${BLUSH(45)}` },
  octopus: { name: '문어', price: 80, c: '#ecd9f7', cD: '#a565c9', svg:
    `<g stroke="#c58ae0" stroke-width="6" stroke-linecap="round" fill="none"><path d="M16 42q-6 8 0 15"/><path d="M26 46q-3 8 2 13"/><path d="M38 46q3 8-2 13"/><path d="M48 42q6 8 0 15"/></g><ellipse cx="32" cy="29" rx="21" ry="21" fill="#d39ef0"/>${EYE(25, 29)}${EYE(39, 29)}<path d="M29 37q3 3 6 0" stroke="#3b2f35" stroke-width="2.2" fill="none" stroke-linecap="round"/>${BLUSH(35)}` },
  lion: { name: '사자', price: 100, c: '#fde3bf', cD: '#d9822b', svg:
    `<g fill="#d9822b">${LION_MANE}</g><circle cx="32" cy="34" r="19" fill="#d9822b"/><circle cx="32" cy="35" r="16" fill="#f7c46c"/>${EYE(26, 32)}${EYE(38, 32)}<path d="M29 38h6l-3 3.5z" fill="#7a4a2a"/><path d="M28 43q4 3 8 0" stroke="#7a4a2a" stroke-width="2" fill="none" stroke-linecap="round"/>${BLUSH(40)}` },
  unicorn: { name: '유니콘', price: 150, c: '#fbe3ef', cD: '#e783a8', svg:
    `<ellipse cx="14" cy="34" rx="8" ry="16" fill="#f59ab3"/><ellipse cx="19" cy="22" rx="7" ry="9" fill="#9fd3f5"/><path d="M18 12l8 9-10 3zM46 12l-8 9 10 3z" fill="#fff" stroke="#efdfe6" stroke-width="1.5"/><path d="M32 2l5 17h-10z" fill="#f6c945"/><circle cx="32" cy="38" r="21" fill="#fff" stroke="#efdfe6" stroke-width="1.5"/><path d="M23 36q3-3 6 0M35 36q3-3 6 0" stroke="#3b2f35" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M28 45q4 3 8 0" stroke="#3b2f35" stroke-width="2" fill="none" stroke-linecap="round"/>${BLUSH(43)}` }
});
const SHOP = ['pig', 'sheep', 'panda', 'turtle', 'owl', 'koala', 'octopus', 'lion', 'unicorn'];

const face = a => `<svg viewBox="0 0 64 64" aria-hidden="true">${(ART[a] || ART.chick).svg}</svg>`;
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
function normalize(d) { d.done = d.done || {}; d.redeemed = d.redeemed || []; d.members = d.members || []; d.chores = d.chores || []; d.rewards = d.rewards || []; d.deals = d.deals || {}; d.games = d.games || {}; d.adopt = d.adopt || {}; return d; }
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
const bal = id => earned(id) - spent(id) - adoptSpent(id) + gameNet(id);
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
    return `<section class="who${m && m.id === me ? ' mine' : ''}" style="--c:${A.c};--cD:${A.cD}"><header><span class="av">${m ? face(m.a) : '<svg viewBox="0 0 64 64"><text x="32" y="44" text-anchor="middle" font-size="34" font-family="Jua" fill="#8a7a80">?</text></svg>'}</span><h3>${title}${m && m.id === me ? ' <em>나</em>' : ''}</h3><span class="tally">${list.filter(c => rec(sel, c.id)).length} / ${list.length}</span></header><div class="list">${list.length ? list.map(c => item(c, m)).join('') : '<p class="none">오늘은 쉬는 날이에요</p>'}</div></section>`; };
  const ms = [...S.members].sort((a, b) => (b.id === me) - (a.id === me));
  const anyone = cs.filter(c => !who(c, sel));
  const all = cs.length && !left;
  return `<div class="wk"><button data-wk="-7" aria-label="지난주">‹</button><div class="strip">${strip}</div><button data-wk="7" aria-label="다음 주">›</button></div>
  <div class="meter"><div class="big"><b>${done.length}</b><span> / ${cs.length}</span></div><div><p>${sel === today ? '오늘 우리 가족' : label(sel)}</p><div class="bar">${segs}</div><p class="sub">${!cs.length ? '할 일이 없는 날이에요.' : left ? `${left}개 남았어요. 같이 끝내 봐요!` : '모두 끝! 오늘도 팀워크 최고예요.'}</p></div></div>
  ${all ? `<div class="party">${S.members.map(m => face(m.a)).join('')}</div>` : ''}
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
  return `<h2 style="margin-top:8px">이번 주 누가 얼마나 했나</h2><div class="rows">${rows.map(r => `<div class="lb">${face(r.m.a)}<span>${esc(r.m.name)}</span><div class="track"><span style="width:${r.w / max * 100}%;background:${art(r.m).cD}"></span></div><span class="n">${r.w}점</span></div>`).join('')}</div>
  <h2>쓸 수 있는 점수</h2><div class="bal">${S.members.map(m => `<div style="--c:${art(m).c}">${face(m.a)}<small>${esc(m.name)}</small><b>${bal(m.id)}점</b></div>`).join('')}</div>
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
    <div class="pbal">${face(mm.a)}<div><small>${esc(mm.name)}의 점수</small><b>${b}점</b></div><span class="left">오늘 ${left}판 남음</span></div>
    <div class="field"><span>게임</span><div class="tg"><button data-game="coin" aria-pressed="${game === 'coin'}">동전 던지기 · 맞히면 2배</button><button data-game="dice" aria-pressed="${game === 'dice'}">주사위 · 맞히면 6배</button></div></div>
    <div class="field"><span>${game === 'coin' ? '어느 쪽이 나올까요?' : '어떤 숫자가 나올까요?'}</span><div class="tg">${game === 'coin' ? [['h', '앞'], ['t', '뒤']].map(([v, t]) => `<button data-cpick="${v}" aria-pressed="${coinPick === v}">${t}</button>`).join('') : [1, 2, 3, 4, 5, 6].map(n => `<button data-dpick="${n}" aria-pressed="${dicePick === n}">${n}</button>`).join('')}</div></div>
    <div class="field"><label for="ba">걸 점수</label><div class="tg">${[5, 10, 20, 50].map(v => `<button data-bet="${v}" aria-pressed="${bet === v}"${v > b ? ' disabled' : ''}>${v}점</button>`).join('')}<button data-bet="${Math.floor(b / 2)}"${b < 2 ? ' disabled' : ''}>절반</button></div><input type="number" id="ba" min="1" max="${b}" inputmode="numeric" value="${bet}"></div>
    <button class="btn" style="width:100%" data-play${!left || bet < 1 ? ' disabled' : ''}>${!left ? '오늘은 여기까지! 내일 또 해요' : game === 'coin' ? '동전 던지기' : '주사위 굴리기'}</button>
    ${res}
  </div>`;
  const own = Object.values(S.adopt);
  const pets = SHOP.map(k => { const A = ART[k], mine = mm && owns(me, k), owners = own.filter(x => x.a === k).map(x => nm(x.m));
    return `<div class="pet" style="--c:${A.c}">${face(k)}<b>${A.name}</b><small>${A.price}점${owners.length ? ' · ' + owners.join(', ') : ''}</small>${mine ? `<button class="mini ghost" data-useava="${k}"${mm.a === k ? ' disabled' : ''}>${mm.a === k ? '대표 캐릭터' : '대표로 하기'}</button>` : `<button class="mini" data-adopt="${k}"${!mm || b < A.price ? ' disabled' : ''}>입양하기</button>`}</div>`; }).join('');
  return `<h2 style="margin-top:8px">행운 게임</h2>${gameBox}
  <p class="hint">점수로만 하는 놀이예요. 잃은 점수는 돌아오지 않고, 하루 ${DAILY}판까지 할 수 있어요.</p>
  ${log ? `<ul class="log">${log}</ul>` : ''}
  <h2>동물 입양</h2><p class="hint">모은 점수로 새 친구를 데려오면 내 캐릭터로 쓸 수 있어요.</p>
  <div class="pets">${pets}</div>`;
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
  return `<h2 style="margin-top:8px">가족과 캐릭터</h2>${S.members.map(m => `<div class="mrow"><input type="text" data-name="${m.id}" value="${esc(m.name)}" maxlength="10" aria-label="${esc(m.name)} 이름"><div class="pick">${[...AKEYS, ...SHOP.filter(k => owns(m.id, k))].map(k => `<button data-ava="${m.id}:${k}" aria-pressed="${m.a === k}" aria-label="${ART[k].name}">${face(k)}</button>`).join('')}</div></div>`).join('')}
  <h2>집안일</h2>${S.chores.map(c => editing === c.id ? choreForm() : `<div class="crow"><span class="cn">${esc(c.name)}<small>${sum(c)}</small></span><span class="dots">${c.who.map(mem).filter(Boolean).map(m => face(m.a)).join('')}</span><button class="btn ghost" data-edit="${c.id}">편집</button></div>`).join('')}
  ${editing === 'new' ? choreForm() : '<p><button class="btn" data-add>+ 집안일 추가</button></p>'}
  <h2>보상</h2><div class="rows">${S.rewards.map(r => `<div class="rw"><span class="cn">${esc(r.name)}<small>${r.cost}점</small></span><button class="btn warn" data-rdel="${r.id}">삭제</button></div>`).join('')}</div>
  <div class="radd"><input type="text" id="rn" placeholder="새 보상 (예: 치킨 메뉴 정하기)" aria-label="보상 이름"><input type="number" id="rc" min="1" value="30" inputmode="numeric" aria-label="필요한 점수"><button class="btn" data-radd>추가</button></div>
  ${R && code ? `<h2>가족 코드</h2><p class="hint">가족에게 이 코드를 보내 주세요. 앱을 열고 ‘가족 코드로 참여’에 넣으면 같은 판을 써요.</p><p><span class="code">${code.slice(0, 4)}-${code.slice(4)}</span></p><div class="acts"><button class="btn ghost" data-copy>코드 복사</button><button class="btn warn" data-leave>다른 코드로 바꾸기</button></div>` : ''}`;
}

/* ---------- 그리기 ---------- */
function render() {
  if (!S) return;
  const f = document.activeElement;
  if (f && f.matches && f.matches('#view input')) { pending = true; return; } // 입력 중엔 화면을 바꾸지 않아요
  pending = false;
  const now = keyOf(new Date()); if (now !== today) { if (sel === today) sel = now; today = now; }
  $('#date').textContent = label(today);
  $('#peek').innerHTML = S.members.slice(0, 5).map(m => face(m.a)).join('');
  document.querySelectorAll('nav button').forEach(b => b.setAttribute('aria-current', b.dataset.t === tab ? 'page' : 'false'));
  $('#me').innerHTML = S.members.map(m => `<button class="chip" data-me="${m.id}" style="--c:${art(m).c}" aria-pressed="${m.id === me}">${face(m.a)}${esc(m.name)}</button>`).join('');
  $('#view').innerHTML = tab === 'score' ? vScore() : tab === 'manage' ? vManage() : tab === 'play' ? vPlay() : vTodo();
}
document.addEventListener('focusout', () => setTimeout(() => { if (pending) render(); }, 0));
function route() { const h = location.hash.slice(1); tab = ['todo', 'score', 'play', 'manage'].includes(h) ? h : 'todo'; render(); scrollTo(0, 0); }

/* ---------- 누르기 ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || !S) return; const d = b.dataset;
  if (d.t) { if (location.hash.slice(1) !== d.t) location.hash = d.t; else route(); return; }
  if (d.me) { me = me === d.me ? null : d.me; ls.set('hh-me', me); render(); return; }
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
    const k = d.adopt, A = ART[k]; if (!me || bal(me) < A.price || owns(me, k)) return;
    if (!b.dataset.arm) { b.dataset.arm = 1; b.textContent = `${A.price}점 쓸까요?`; return; }
    const x = { id: 'a' + Date.now(), m: me, a: k, cost: A.price, t: Date.now() };
    change(() => { S.adopt[x.id] = x; }, R => [new R.FieldPath('adopt', x.id), x]);
    toast(`${A.name}를 입양했어요!`); return;
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
  if (d.unpaid) { const id = d.unpaid; change(() => { S.deals[id].st = 'done'; }, R => [new R.FieldPath('deals', id, 'st'), 'done']); return; }
  if (d.redeem) { const r = S.rewards.find(x => x.id === d.redeem); if (!me || bal(me) < r.cost) return;
    const x = { id: 'x' + Date.now(), m: me, r: r.name, c: r.cost, d: today };
    change(() => S.redeemed.push(x), R => [{ redeemed: R.arrayUnion(x) }]); toast(`‘${r.name}’ 획득!`); return; }
  if (d.undor) { const x = S.redeemed.find(r => r.id === d.undor); if (!x) return;
    change(() => { S.redeemed = S.redeemed.filter(r => r !== x); }, R => [{ redeemed: R.arrayRemove(x) }]); toast('취소하고 점수를 돌려줬어요'); return; }
  if (d.ava) { const [id, a] = d.ava.split(':'); change(() => { mem(id).a = a; }, () => [{ members: S.members }]); return; }
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
document.addEventListener('change', e => { const id = e.target.dataset && e.target.dataset.name; if (!id) return; const v = e.target.value.trim().slice(0, 10);
  if (!v) { e.target.value = mem(id).name; return; } e.target.blur(); change(() => { mem(id).name = v; }, () => [{ members: S.members }]); });
window.addEventListener('hashchange', route);
document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });

/* ---------- 시작 ---------- */
function startApp(note) { $('#setup').hidden = true; $('#app').hidden = false; $('#sync').textContent = note; if (!mem(me)) me = null; route(); }

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
    S = normalize(snap.data()); ls.set('hh-cache', JSON.stringify(S));
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
