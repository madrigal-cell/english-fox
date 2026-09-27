/* =====================================================================
   English Fox — app de inglés para 5º de Primaria
   Todo funciona en el navegador. El progreso se guarda en este
   dispositivo (localStorage) y se puede pasar a otro con un código.
   ===================================================================== */

const STORE_KEY = "english-fox-v1";
const STEPS = [
  { k: "v1", lbl: "Palabras 1", icon: "chat" },
  { k: "v2", lbl: "Palabras 2", icon: "mic" },
  { k: "g1", lbl: "Gramática", icon: "bulb" },
  { k: "g2", lbl: "Frases", icon: "pencil" },
  { k: "r",  lbl: "Lectura", icon: "book" },
  { k: "x",  lbl: "Examen", icon: "trophy" }
];
const ZIGZAG = [0, 52, 78, 52, 0, -52];
const TERMS = { 1: "1er trimestre", 2: "2º trimestre", 3: "3er trimestre" };
const PRAISE = ["¡Genial!", "¡Muy bien!", "¡Perfecto!", "¡Crack!", "¡Eso es!", "¡Fantástico!", "¡Bravo!", "¡Así se hace!"];
const FOX_TIPS = [
  "15 minutos al día valen más que 2 horas el domingo.",
  "Si fallas, no pasa nada: la pregunta vuelve al final para que la aprendas.",
  "Antes de un examen, repasa la chuleta de la unidad.",
  "Escucha cada palabra y repítela en voz alta. ¡Así se aprende!",
  "Los verbos irregulares se aprenden repitiendo: went, ate, saw...",
  "En inglés los días y los meses van siempre con MAYÚSCULA.",
  "Haz el examen de la unidad: si sacas más de un 5, ¡lo tienes!"
];
const BADGES = [
  { id: "first", b: "🐣", t: "Primera lección" },
  { id: "streak3", b: "🔥", t: "Racha de 3 días" },
  { id: "streak7", b: "🚀", t: "Racha de 7 días" },
  { id: "streak30", b: "👑", t: "Racha de 30 días" },
  { id: "pass", b: "✅", t: "Primer aprobado" },
  { id: "ten", b: "💯", t: "Un 10 en examen" },
  { id: "xp500", b: "⭐", t: "500 XP" },
  { id: "xp2000", b: "🌟", t: "2000 XP" },
  { id: "fix20", b: "🩹", t: "20 errores corregidos" }
];
const NOSCORE = ["intro", "theory", "readtext"];

// ------------------------------------------------------------------ estado
const defaultState = () => ({
  name: "Santi", xp: 0, classUnit: "u1", goalMin: 15, rate: 0.85, sound: true,
  days: {},      // "2026-09-27": segundos estudiados
  met: {},       // "2026-09-27": true si cumplió la meta
  lessons: {},   // "u1-v1": {stars, n}
  exams: {},     // "u1": [{t, score}]
  errors: {},    // "v|u1|3": nº de fallos pendientes
  fixed: 0, badges: {}, lastType: ""
});
let S = load();
function load() {
  try { return Object.assign(defaultState(), JSON.parse(localStorage.getItem(STORE_KEY)) || {}); }
  catch (e) { return defaultState(); }
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) {} }

// ------------------------------------------------------------------ utilidades
const $ = (s) => document.querySelector(s);
const app = () => $("#app");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const unitById = (id) => UNITS.find((u) => u.id === id);
const unitIndex = (id) => UNITS.findIndex((u) => u.id === id);
function dayKey(d = new Date()) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
const todaySecs = () => S.days[dayKey()] || 0;
function streak() {
  let d = new Date(), n = 0;
  if (!S.met[dayKey(d)]) d = addDays(d, -1);
  while (S.met[dayKey(d)]) { n++; d = addDays(d, -1); }
  return n;
}
function fmtGrade(x) { return (Math.round(x * 10) / 10).toString().replace(".", ","); }
function bestExam(uid) { const e = S.exams[uid] || []; return e.length ? Math.max(...e.map((x) => x.score)) : null; }
function stepDone(uid, k) {
  if (k === "x") { const b = bestExam(uid); return b !== null && b >= 5; }
  return !!S.lessons[uid + "-" + k];
}
// Texto en inglés escapado para meterlo en un onclick="say('...')"
const jsq = (s) => esc(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'");

// Normaliza respuestas: minúsculas, sin signos, contracciones expandidas
function norm(s) {
  s = " " + String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,!?¿¡;:"()]/g, " ") + " ";
  const rep = [[/\bcan't\b/g, "can not"], [/\bcannot\b/g, "can not"], [/\bwon't\b/g, "will not"],
    [/n't\b/g, " not"], [/'m\b/g, " am"], [/'re\b/g, " are"], [/'ve\b/g, " have"], [/'d\b/g, " would"],
    [/'s got\b/g, " has got"], [/(\w)'s\b/g, "$1 is"]];
  rep.forEach(([a, b]) => { s = s.replace(a, b); });
  return s.replace(/\s+/g, " ").trim();
}
function lev(a, b) {
  const m = []; for (let i = 0; i <= a.length; i++) { m[i] = [i]; }
  for (let j = 1; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return m[a.length][b.length];
}

// ------------------------------------------------------------------ avisos y confeti
function toast(html, ms = 4500) {
  document.querySelectorAll(".toast").forEach((t) => t.remove());
  const t = document.createElement("div"); t.className = "toast"; t.innerHTML = html;
  t.onclick = () => t.remove(); document.body.appendChild(t);
  setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 350); }, ms);
}
function confetti(n = 40) {
  const cols = ["#58cc02", "#1cb0f6", "#ffc800", "#ff4b4b", "#a560f0", "#ff9600"];
  for (let i = 0; i < n; i++) {
    const c = document.createElement("div"); c.className = "confetti";
    c.style.background = pick(cols); c.style.left = Math.random() * 100 + "vw";
    c.style.animationDuration = 1.6 + Math.random() * 1.8 + "s"; c.style.animationDelay = Math.random() * 0.4 + "s";
    c.style.width = 6 + Math.random() * 7 + "px";
    document.body.appendChild(c); setTimeout(() => c.remove(), 4200);
  }
}

// ------------------------------------------------------------------ voz
// iPad/iPhone y algunos Chrome fallan si se llama a cancel() y speak() seguidos,
// o si la primera vez no viene de un toque. Por eso: se "desbloquea" la voz en el
// primer toque, solo se cancela si ya está hablando, y se reintenta si no arranca.
const SYN = window.speechSynthesis;
let voice = null, speechReady = false, lastUtter = null, speakWatch = null;
const GOOD_VOICES = /(Daniel|Kate|Serena|Arthur|Martha|Oliver|Stephanie|Google UK English|Microsoft (Libby|Sonia|Ryan|George|Hazel|Susan))/i;
function pickVoice() {
  if (!SYN) return;
  const vs = SYN.getVoices(); if (!vs.length) return;
  const gb = vs.filter((v) => /^en[-_]GB/i.test(v.lang)), en = vs.filter((v) => /^en/i.test(v.lang));
  voice = gb.find((v) => GOOD_VOICES.test(v.name) && v.localService) || gb.find((v) => GOOD_VOICES.test(v.name))
    || gb.find((v) => v.localService) || gb[0]
    || en.find((v) => /(Samantha|Alex|Google US English|Microsoft (Aria|Jenny|Guy))/i.test(v.name)) || en[0] || null;
}
if (SYN) { pickVoice(); SYN.onvoiceschanged = pickVoice; }
function unlockAudio() {
  try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === "suspended") actx.resume(); } catch (e) {}
  if (!SYN || speechReady) return;
  speechReady = true;
  try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; SYN.speak(u); } catch (e) {}
}
document.addEventListener("pointerdown", unlockAudio, { capture: true });
document.addEventListener("keydown", unlockAudio, { capture: true });

function say(text, slow, fromTap) {
  if (!SYN || !window.SpeechSynthesisUtterance) { if (fromTap) voiceHelp(true); return; }
  if (!voice) pickVoice();
  const clean = String(text).replace(/___/g, "blank");
  const run = (retry) => {
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = voice ? voice.lang : "en-GB"; if (voice) u.voice = voice;
    u.rate = slow ? 0.6 : S.rate; u.pitch = 1;
    let started = false;
    u.onstart = () => { started = true; setTalking(true); };
    u.onend = u.onerror = () => setTalking(false);
    lastUtter = u; // evita que el navegador lo borre de memoria a medias
    try { SYN.resume(); SYN.speak(u); } catch (e) {}
    clearTimeout(speakWatch);
    speakWatch = setTimeout(() => {
      if (started || SYN.speaking) return;
      if (!retry) { try { SYN.cancel(); } catch (e) {} setTimeout(() => run(true), 120); }
      else if (fromTap) voiceHelp(false);
    }, 1200);
  };
  if (SYN.speaking || SYN.pending) { try { SYN.cancel(); } catch (e) {} setTimeout(() => run(false), 120); }
  else run(false);
}
function setTalking(on) { document.querySelectorAll(".speak").forEach((b) => b.classList.toggle("talking", on)); }
function voiceHelp(unsupported) {
  toast(`${icon("alert", 22)}<div>${unsupported ? "Este navegador no tiene voz. Abre la app en <b>Safari</b> (iPad/iPhone) o <b>Chrome</b>." :
    "No se oye nada. Sube el volumen, quita el <b>modo silencio</b> y, si abriste el enlace desde WhatsApp, ábrelo en <b>Safari</b> o <b>Chrome</b>."}</div>`, 7000);
}
let actx = null;
function beep(kind) {
  if (!S.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === "suspended") actx.resume();
    const notes = { ok: [[660, 0], [880, .09]], bad: [[220, 0], [180, .12]], win: [[523, 0], [659, .12], [784, .24], [1046, .36]], tap: [[500, 0]] }[kind];
    notes.forEach(([f, t]) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = kind === "bad" ? "square" : "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, actx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(kind === "tap" ? 0.04 : kind === "bad" ? 0.08 : 0.16, actx.currentTime + t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + t + (kind === "tap" ? 0.06 : 0.22));
      o.connect(g).connect(actx.destination); o.start(actx.currentTime + t); o.stop(actx.currentTime + t + 0.3);
    });
  } catch (e) {}
}
const speakBtn = (expr, cls = "", size = 28) => `<button class="speak ${cls}" onclick="say(${expr},false,true)" aria-label="Escuchar">${icon("speaker", size)}</button>`;
const slowBtn = (expr) => `<div class="slow"><button class="link" onclick="say(${expr},true,true)">🐢 Más despacio</button></div>`;

// ------------------------------------------------------------------ tiempo de estudio
let studying = false, lastAct = Date.now(), goalJustMet = false;
["pointerdown", "keydown"].forEach((ev) => document.addEventListener(ev, () => { lastAct = Date.now(); }, true));
setInterval(() => {
  if (!studying || document.hidden || Date.now() - lastAct > 60000) return;
  const k = dayKey(); S.days[k] = (S.days[k] || 0) + 1;
  if (!S.met[k] && S.days[k] >= S.goalMin * 60) { S.met[k] = true; goalJustMet = true; checkBadges(); }
  if (S.days[k] % 5 === 0) save();
}, 1000);

// ------------------------------------------------------------------ logros
let newBadges = [];
function checkBadges() {
  const give = (id) => { if (!S.badges[id]) { S.badges[id] = dayKey(); newBadges.push(id); } };
  const st = streak();
  if (Object.keys(S.lessons).length) give("first");
  if (st >= 3) give("streak3"); if (st >= 7) give("streak7"); if (st >= 30) give("streak30");
  const all = Object.values(S.exams).flat();
  if (all.some((e) => e.score >= 5)) give("pass");
  if (all.some((e) => e.score >= 10)) give("ten");
  if (S.xp >= 500) give("xp500"); if (S.xp >= 2000) give("xp2000");
  if (S.fixed >= 20) give("fix20");
}

// ------------------------------------------------------------------ generador de preguntas
function vocabQ(u, i, forceType) {
  const w = u.vocab[i], [en] = w;
  const single = /^[a-z]+$/.test(en) && en.length <= 10;
  let types = ["pick", "listen", "type", "pickEs"];
  if (single) types.push("spell");
  const type = forceType || pick(types);
  const others = shuffle(u.vocab.filter((x) => x[0] !== en && x[1] !== w[1])).slice(0, 3);
  return { type, u: u.id, key: "v|" + u.id + "|" + i, w, others };
}
function exQ(u, i) {
  const e = u.exercises[i];
  return Object.assign({ type: e.t, u: u.id, key: "e|" + u.id + "|" + i }, e);
}
function tfQ(u, i) {
  const [s, a] = u.reading.questions[i];
  return { type: "tf", u: u.id, key: "r|" + u.id + "|" + i, s, a, text: u.reading.text, title: u.reading.title };
}
function qFromKey(key, forceVocabType) {
  const [kind, uid, idx] = key.split("|"); const u = unitById(uid); if (!u) return null;
  const i = +idx;
  if (kind === "v") return u.vocab[i] ? vocabQ(u, i, forceVocabType) : null;
  if (kind === "e") return u.exercises[i] ? exQ(u, i) : null;
  if (kind === "r") return u.reading.questions[i] ? tfQ(u, i) : null;
  return null;
}

function buildLesson(uid, k) {
  const u = unitById(uid), first = !S.lessons[uid + "-" + k];
  const idxs = (f) => u.exercises.map((e, i) => (f(e) ? i : -1)).filter((i) => i >= 0);
  let qs = [];
  if (k === "v1" || k === "v2") {
    const half = Math.ceil(u.vocab.length / 2);
    const range = k === "v1" ? [...Array(half).keys()] : [...Array(u.vocab.length - half).keys()].map((i) => i + half);
    for (let c = 0; c < range.length; c += 4) {
      const chunk = range.slice(c, c + 4);
      if (first) chunk.forEach((i) => qs.push({ type: "intro", w: u.vocab[i] }));
      shuffle(chunk).forEach((i) => qs.push(vocabQ(u, i)));
      if (chunk.length >= 3) qs.push({ type: "match", u: uid, pairs: chunk.map((i) => u.vocab[i]) });
    }
  } else if (k === "g1") {
    qs.push({ type: "theory", u: uid });
    shuffle(idxs((e) => e.t === "mc")).slice(0, 10).forEach((i) => qs.push(exQ(u, i)));
  } else if (k === "g2") {
    const a = idxs((e) => e.t !== "mc"), b = shuffle(idxs((e) => e.t === "mc")).slice(0, 4);
    shuffle(a.concat(b)).forEach((i) => qs.push(exQ(u, i)));
  } else if (k === "r") {
    qs.push({ type: "readtext", u: uid, text: u.reading.text, title: u.reading.title });
    u.reading.questions.forEach((_, i) => qs.push(tfQ(u, i)));
  } else if (k === "x") {
    const vi = shuffle([...u.vocab.keys()]).slice(0, 6);
    vi.forEach((i, n) => qs.push(vocabQ(u, i, n < 3 ? "type" : "pick")));
    shuffle(idxs((e) => e.t === "mc")).slice(0, 6).forEach((i) => qs.push(exQ(u, i)));
    shuffle(idxs((e) => e.t === "order")).slice(0, 2).forEach((i) => qs.push(exQ(u, i)));
    shuffle(idxs((e) => e.t === "write")).slice(0, 2).forEach((i) => qs.push(exQ(u, i)));
    shuffle([0, 1, 2, 3, 4]).slice(0, 2).forEach((i) => qs.push(tfQ(u, i)));
  }
  return qs;
}
function buildReview() {
  const keys = shuffle(Object.keys(S.errors)).slice(0, 12);
  return keys.map((k) => qFromKey(k, pick(["type", "pick", "listen"]))).filter(Boolean);
}
function errorCount() { return Object.keys(S.errors).length; }

function recommend() {
  const cu = Math.max(0, unitIndex(S.classUnit));
  if (errorCount() >= 8 && S.lastType !== "review") return { review: true };
  const firstOpen = (u) => STEPS.find((s) => !stepDone(u.id, s.k));
  let s = firstOpen(UNITS[cu]); if (s) return { u: UNITS[cu].id, k: s.k };
  for (let i = 0; i < cu; i++) { s = firstOpen(UNITS[i]); if (s) return { u: UNITS[i].id, k: s.k }; }
  if (errorCount() > 0 && S.lastType !== "review") return { review: true };
  // Todo hecho: la siguiente unidad, o repasar el paso con menos estrellas
  const u = UNITS[Math.min(cu + 1, UNITS.length - 1)];
  s = firstOpen(u); if (s) return { u: u.id, k: s.k };
  const weakest = STEPS.filter((x) => x.k !== "x").sort((a, b) => ((S.lessons[UNITS[cu].id + "-" + a.k] || {}).stars || 0) - ((S.lessons[UNITS[cu].id + "-" + b.k] || {}).stars || 0))[0];
  return { u: UNITS[cu].id, k: weakest.k };
}

// ------------------------------------------------------------------ pantallas principales
let tab = "home";
function go(t) { tab = t; studying = false; render(); window.scrollTo(0, 0); }
function render() {
  if (tab === "home") return renderHome();
  if (tab === "notes") return renderNotes();
  if (tab === "grades") return renderGrades();
  if (tab === "parents") return renderParents();
}
function topbar() {
  const st = streak();
  return `<div class="topbar"><div class="brand">${fox("happy", 34)}English Fox</div>
    <div class="pill fire ${S.met[dayKey()] ? "" : "off"}" title="Días seguidos">${icon("flame", 20)}${st}</div>
    <div class="pill xp" title="Puntos">${icon("star", 20)}${S.xp}</div></div>`;
}
function nav() {
  const b = (t, i, l) => `<button class="${tab === t ? "on" : ""}" onclick="go('${t}')">${icon(i, 25)}${l}</button>`;
  return `<nav class="nav"><div class="nav-inner">${b("home", "home", "Aprender")}${b("notes", "book", "Chuletas")}${b("grades", "trophy", "Notas")}${b("parents", "users", "Padres")}</div></nav>`;
}

function renderHome() {
  const r = recommend(), secs = todaySecs(), goal = S.goalMin * 60;
  const mins = Math.floor(secs / 60), left = Math.max(0, Math.ceil((goal - secs) / 60)), pct = Math.min(100, (secs / goal) * 100);
  const cu = S.classUnit;
  const msg = left <= 0 ? `¡Meta de hoy conseguida, ${esc(S.name)}! 🎉 Si quieres, sigue un poco más.`
    : secs < 30 ? `¡Hola, ${esc(S.name)}! Hoy toca inglés: ${S.goalMin} minutos y listo.`
    : `¡Vas genial! Te quedan ${left} min para la meta de hoy.`;
  let nextLbl, nextSub, nextColor, nextIcon;
  if (r.review) { nextLbl = "Repasa tus errores"; nextSub = "Repaso"; nextColor = "var(--red)"; nextIcon = "bandage"; }
  else { const u = unitById(r.u), s = STEPS.find((x) => x.k === r.k); nextLbl = s.lbl + " · " + u.title; nextSub = u.emoji + " Siguiente"; nextColor = u.color; nextIcon = s.icon; }

  let h = topbar() + `<div class="content">
    <div class="hero">
      <div class="hero-top">${fox(left <= 0 ? "cheer" : "happy", 76)}<div class="bubble">${msg}</div></div>
      <div class="goal"><div class="goal-row"><span>META DE HOY</span><b>${mins} / ${S.goalMin} min</b></div>
        <div class="track"><div class="${pct >= 100 ? "full" : ""}" style="width:${pct}%"></div></div></div>
      <div class="next-up"><div class="dot" style="background:${nextColor}">${icon(nextIcon, 20)}</div><div><small>${esc(nextSub)}</small>${esc(nextLbl)}</div></div>
      <button class="btn" onclick="startRec()">${secs < 30 ? "¡Empezar!" : "Continuar"}</button>
    </div>`;
  const ec = errorCount();
  if (ec && !r.review) h += `<button class="review-card" onclick="startReview()"><div class="ico">${icon("bandage", 24)}</div><div><b>Repasa tus errores</b><span class="muted">${ec} cosa${ec > 1 ? "s" : ""} por reforzar</span></div>${icon("chevron", 22).replace('class="ic"', 'class="ic chev"')}</button>`;
  let lastTerm = 0;
  UNITS.forEach((u, ui) => {
    if (u.term !== lastTerm) { h += `<div class="term">${TERMS[u.term]}</div>`; lastTerm = u.term; }
    const next = STEPS.find((s) => !stepDone(u.id, s.k));
    const isNow = !r.review && r.u === u.id;
    h += `<div class="unit-banner" style="background:${u.color}"><div class="em">${u.emoji}</div>
      <div class="t"><small>${ui === 0 ? "Antes de empezar" : "Unidad " + ui}</small><h3>${esc(u.title)}</h3><div class="sub">${esc(u.sub)}</div>
      ${u.id === cu ? `<span class="chip-now">📍 En clase ahora</span>` : ""}</div>
      <button class="notes-btn" onclick="renderNotes('${u.id}')" aria-label="Chuleta">${icon("book", 22)}</button></div>
      <div class="path" style="--c:${u.color}">`;
    STEPS.forEach((s, si) => {
      const L = S.lessons[u.id + "-" + s.k], done = stepDone(u.id, s.k), be = bestExam(u.id);
      const current = isNow && r.k === s.k;
      const state = done ? "done" : current || (next && next.k === s.k) ? "" : "todo";
      const stars = s.k !== "x" && L ? `<div class="stars">${[1, 2, 3].map((n) => icon("star", 16).replace('class="ic"', `class="ic ${n > L.stars ? "off" : ""}"`)).join("")}</div>` : "";
      const grade = s.k === "x" && be !== null ? `<span class="grade ${be < 5 ? "fail" : ""}">${fmtGrade(be)}</span>` : "";
      h += `<div class="node ${state} ${s.k === "x" ? "exam" : ""}" style="transform:translateX(${ZIGZAG[si]}px)" onclick="startLesson('${u.id}','${s.k}')">
        ${current ? `<div class="start-tip">${secs < 30 ? "¡Empieza!" : "¡Sigue!"}</div><div class="ring-now"></div>` : ""}
        <div class="disc">${icon(done && s.k !== "x" ? "check" : s.icon, s.k === "x" ? 38 : 32, done ? 3 : 2.4)}</div>${grade}
        <div class="lbl">${s.lbl}</div>${stars}</div>`;
    });
    h += `</div>`;
  });
  h += `<div class="tip-card">${fox("think", 48)}<div>${pick(FOX_TIPS)}</div></div></div>` + nav();
  app().innerHTML = h;
}

function pageTitle(ic, color, title, sub) {
  return `<div class="page-title"><div class="ico" style="background:${color}">${icon(ic, 26)}</div><div><h2>${title}</h2><p>${sub}</p></div></div>`;
}
function grammarCards(u) {
  return u.grammar.map((g) => `<div class="theory"><h3>${icon("bulb", 20)}${esc(g.title)}</h3>${g.html}</div>`).join("");
}

function renderNotes(uid) {
  tab = "notes";
  let h = topbar() + `<div class="content">`;
  if (!uid) {
    h += pageTitle("book", "var(--purple)", "Chuletas", "Todo lo que entra en el examen, unidad por unidad.");
    UNITS.forEach((u, ui) => { h += `<button class="list-btn" onclick="renderNotes('${u.id}')"><span class="em" style="background:${u.color}22">${u.emoji}</span><span>${esc(u.title)}<small>${ui === 0 ? "Repaso" : "Unidad " + ui} · ${esc(u.sub)}</small></span><span class="r">${icon("chevron", 22)}</span></button>`; });
  } else {
    const u = unitById(uid);
    h += `<button class="link" onclick="renderNotes()">${icon("back", 18)} Todas las chuletas</button>
      <div class="unit-banner" style="background:${u.color};margin:10px 0 16px"><div class="em">${u.emoji}</div><div class="t"><small>Chuleta</small><h3>${esc(u.title)}</h3><div class="sub">${esc(u.sub)}</div></div></div>`;
    h += grammarCards(u);
    h += `<div class="card"><h3>${icon("chat", 20)}Vocabulario</h3>`;
    u.vocab.forEach((w, i) => {
      h += `<div class="vocab-row"><div class="e">${w[2]}</div><div class="w"><b>${esc(w[0])}</b><span class="muted">${esc(w[1])}${w[3] ? " · de " + esc(w[3]) : ""}</span></div>
        ${speakBtn(`unitById('${uid}').vocab[${i}][0]`, "mini", 18)}</div>`;
    });
    h += `</div><button class="btn" onclick="startLesson('${uid}','x')">${icon("trophy", 22)} Hacer examen de prueba</button>`;
  }
  h += `</div>` + nav();
  app().innerHTML = h; window.scrollTo(0, 0);
}

function renderGrades() {
  let h = topbar() + `<div class="content">` + pageTitle("trophy", "var(--yellow-d)", "Mis notas", "Examen de prueba de cada unidad. ¡A partir de 5, aprobado!");
  UNITS.forEach((u, ui) => {
    const ex = S.exams[u.id] || [], be = bestExam(u.id);
    h += `<button class="list-btn" onclick="startLesson('${u.id}','x')"><span class="em" style="background:${u.color}22">${u.emoji}</span><span>${esc(u.title)}
      <small>${ex.length ? ex.length + " intento" + (ex.length > 1 ? "s" : "") + " · último " + fmtGrade(ex[ex.length - 1].score) : "Sin hacer todavía"}</small></span>
      <span class="r" style="color:${be === null ? "var(--faint)" : be >= 5 ? "var(--green)" : "var(--red)"}">${be === null ? "—" : fmtGrade(be)}</span></button>`;
  });
  h += `<h3 style="margin:26px 0 12px">🎖️ Logros</h3><div class="badges">`;
  BADGES.forEach((b) => { h += `<div class="badge ${S.badges[b.id] ? "" : "locked"}"><div class="b">${b.b}</div><small>${b.t}</small></div>`; });
  h += `</div></div>` + nav();
  app().innerHTML = h;
}

function renderParents() {
  let h = topbar() + `<div class="content">` + pageTitle("users", "var(--blue)", "Zona de padres", "Progreso, ajustes y pasar el progreso a otro dispositivo.");
  const days = [...Array(14).keys()].reverse().map((i) => addDays(new Date(), -i));
  const max = Math.max(S.goalMin * 60, ...days.map((d) => S.days[dayKey(d)] || 0));
  const total = days.reduce((a, d) => a + (S.days[dayKey(d)] || 0), 0), tk = dayKey();
  h += `<div class="card"><h3>${icon("chart", 20)}Últimos 14 días</h3><span class="muted">${Math.round(total / 60)} min en total · ${days.filter((d) => S.met[dayKey(d)]).length} días con la meta cumplida</span>
    <div class="days">${days.map((d) => { const k = dayKey(d), s = S.days[k] || 0; return `<div class="${S.met[k] ? "goal" : ""} ${k === tk ? "today" : ""}" style="height:${(s / max) * 100}%" title="${Math.round(s / 60)} min"></div>`; }).join("")}</div>
    <div class="days-lbl">${days.map((d) => `<span>${"DLMXJVS"[d.getDay()]}</span>`).join("")}</div></div>`;
  h += `<div class="card"><h3>${icon("settings", 20)}Ajustes</h3>
    <label class="lbl">Nombre</label><input class="field" value="${esc(S.name)}" onchange="S.name=this.value;save()">
    <label class="lbl">Unidad que están dando AHORA en clase</label>
    <select onchange="S.classUnit=this.value;save()">${UNITS.map((u) => `<option value="${u.id}" ${u.id === S.classUnit ? "selected" : ""}>${u.emoji} ${esc(u.title)}</option>`).join("")}</select>
    <label class="lbl">Meta diaria</label>
    <select onchange="S.goalMin=+this.value;save()">${[10, 15, 20, 30].map((m) => `<option value="${m}" ${m === S.goalMin ? "selected" : ""}>${m} minutos</option>`).join("")}</select>
    <label class="lbl">Velocidad de la voz</label>
    <select onchange="S.rate=+this.value;save();say('Hello! How are you today?',false,true)">${[[0.7, "Lenta"], [0.85, "Normal"], [1, "Rápida"]].map(([v, l]) => `<option value="${v}" ${v === S.rate ? "selected" : ""}>${l}</option>`).join("")}</select>
    <label class="switch">Sonidos de acierto y fallo <input type="checkbox" ${S.sound ? "checked" : ""} onchange="S.sound=this.checked;save()"></label>
    <button class="btn blue small" style="margin-top:10px" onclick="testVoice()">${icon("speaker", 20)} Probar el sonido</button>
    <p class="muted" style="font-size:13px;margin:10px 0 0">Voz: ${voice ? esc(voice.name) + " (" + esc(voice.lang) + ")" : SYN ? "cargando…" : "este navegador no tiene voz"}</p></div>`;
  h += `<div class="card"><h3>${icon("target", 20)}Progreso por unidad</h3>`;
  UNITS.forEach((u) => {
    const d = STEPS.filter((s) => stepDone(u.id, s.k)).length, be = bestExam(u.id);
    h += `<div class="vocab-row"><div class="e">${u.emoji}</div><div class="w"><b>${esc(u.title)}</b><span class="muted">${d} de 6 pasos</span></div>
      <span class="tag-grade ${be === null ? "" : be >= 5 ? "pass" : "fail"}">${be === null ? "sin examen" : "Nota " + fmtGrade(be)}</span></div>`;
  });
  h += `</div>`;
  const errs = Object.entries(S.errors).sort((a, b) => b[1] - a[1]).slice(0, 10);
  h += `<div class="card"><h3>${icon("bandage", 20)}Lo que más le cuesta</h3>`;
  if (!errs.length) h += `<p class="muted">Nada pendiente. ¡Bien!</p>`;
  errs.forEach(([k, n]) => { h += `<div class="mistake">${describeKey(k)} <span class="muted">(${n}×)</span></div>`; });
  h += `</div>`;
  h += `<div class="card"><h3>${icon("refresh", 20)}Pasar el progreso a otro dispositivo</h3>
    <p class="muted" style="font-size:15px">El progreso se guarda en cada tablet u ordenador. Para llevarlo a casa de la abuela: pulsa <b>Copiar código</b>, envíalo por WhatsApp, y en el otro dispositivo pégalo abajo y pulsa <b>Juntar progreso</b>. Se suma lo de los dos sitios.</p>
    <button class="btn blue small" onclick="exportCode()">${icon("copy", 20)} Copiar código de progreso</button>
    <textarea class="field" id="imp" placeholder="Pega aquí el código del otro dispositivo" style="margin-top:14px"></textarea>
    <button class="btn small" onclick="importCode()">${icon("download", 20)} Juntar progreso</button></div>
    <button class="btn danger small" onclick="resetAll()">Borrar todo el progreso</button>
    <p class="muted" style="text-align:center;font-size:13px;margin-top:22px">English Fox 🦊 · Inglés 5º de Primaria</p></div>` + nav();
  app().innerHTML = h;
}
function testVoice() { pickVoice(); say("Hello " + (S.name || "") + "! Let's learn English.", false, true); setTimeout(() => { if (tab === "parents") renderParents(); }, 1500); }
function describeKey(k) {
  const [kind, uid, i] = k.split("|"), u = unitById(uid); if (!u) return k;
  if (kind === "v" && u.vocab[i]) return `${u.vocab[i][2]} <b>${esc(u.vocab[i][0])}</b> = ${esc(u.vocab[i][1])}`;
  if (kind === "e" && u.exercises[i]) { const e = u.exercises[i]; return esc(e.q || e.s) + (e.t === "mc" ? ` → <b>${esc(e.o[0])}</b>` : e.t === "write" ? ` → <b>${esc(e.a[0])}</b>` : ""); }
  if (kind === "r" && u.reading.questions[i]) return "Lectura: " + esc(u.reading.questions[i][0]);
  return k;
}

// ------------------------------------------------------------------ sincronizar
function encode(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))); }
function decode(s) { return JSON.parse(decodeURIComponent(escape(atob(s.trim())))); }
function exportCode() {
  const code = "FOX1:" + encode(S);
  const fallback = () => { $("#imp").value = code; $("#imp").select(); toast(`${icon("copy", 22)}<div>Selecciona y copia el código del cuadro.</div>`); };
  if (navigator.clipboard) navigator.clipboard.writeText(code).then(() => toast(`${icon("check", 22)}<div>Código copiado. Pégalo en WhatsApp y ábrelo en el otro dispositivo.</div>`), fallback);
  else fallback();
}
function importCode() {
  let o; try { o = decode($("#imp").value.replace(/^FOX1:/, "")); } catch (e) { return toast(`${icon("alert", 22)}<div>Ese código no es válido 🤔</div>`); }
  const m = (a, b, f) => { const r = Object.assign({}, a); Object.keys(b || {}).forEach((k) => { r[k] = k in r ? f(r[k], b[k]) : b[k]; }); return r; };
  S.xp = Math.max(S.xp, o.xp || 0);
  S.days = m(S.days, o.days, Math.max);
  S.met = m(S.met, o.met, () => true);
  S.lessons = m(S.lessons, o.lessons, (a, b) => ({ stars: Math.max(a.stars, b.stars), n: Math.max(a.n || 1, b.n || 1) }));
  S.exams = m(S.exams, o.exams, (a, b) => { const seen = new Set(a.map((x) => x.t)); return a.concat(b.filter((x) => !seen.has(x.t))).sort((x, y) => x.t - y.t); });
  S.errors = m(S.errors, o.errors, Math.max);
  S.badges = m(S.badges, o.badges, (a) => a);
  S.fixed = Math.max(S.fixed, o.fixed || 0);
  save(); render(); toast(`${icon("check", 22)}<div>¡Progreso juntado!</div>`);
}
function resetAll() {
  if (confirm("¿Seguro que quieres borrar TODO el progreso de este dispositivo?") && confirm("De verdad, ¿borrar todo?")) { S = defaultState(); save(); render(); }
}

// ------------------------------------------------------------------ motor de lecciones
let L = null; // lección en curso
function startRec() { const r = recommend(); r.review ? startReview() : startLesson(r.u, r.k); }
function startReview() {
  const qs = buildReview();
  if (!qs.length) return startRec();
  openLesson({ qs, review: true });
}
function startLesson(uid, k) { openLesson({ qs: buildLesson(uid, k), uid, k, exam: k === "x" }); }
function openLesson(o) {
  L = Object.assign({ i: 0, wrong: 0, right: 0, combo: 0, requeued: new Set(), log: [], start: Date.now() }, o);
  studying = true; lastAct = Date.now(); goalJustMet = false;
  showQ();
}
function quitLesson() {
  if (L.i > 0 && !confirm("¿Salir de la lección? Perderás lo que llevas de esta lección.")) return;
  if (SYN) SYN.cancel(); L = null; save(); go("home");
}

let cur = null; // pregunta actual
function showQ() {
  if (L.i >= L.qs.length) return finishLesson();
  const q = L.qs[L.i];
  const scoredAll = L.qs.filter((x) => !NOSCORE.includes(x.type)).length;
  const scoredDone = L.qs.slice(0, L.i).filter((x) => !NOSCORE.includes(x.type)).length;
  const pct = scoredAll ? Math.min(100, (scoredDone / scoredAll) * 100) : 0;
  cur = { q, ready: false, value: null };
  app().innerHTML = `<div class="lesson">
    <div class="lesson-top"><button class="x" onclick="quitLesson()" aria-label="Salir">${icon("x", 28, 2.6)}</button><div class="bar"><div style="width:${pct}%"></div></div>
    <div class="combo">${L.exam ? "📝" : L.combo >= 3 ? icon("flame", 22) + L.combo : ""}</div></div>
    <div class="q-area">${RENDER[q.type](q)}</div>
    <div class="foot" id="foot">${footBtn(q)}</div></div>`;
  window.scrollTo(0, 0);
  if (AFTER[q.type]) AFTER[q.type](q);
}
function footBtn(q) {
  if (NOSCORE.includes(q.type)) return `<button class="btn" id="go" onclick="next()">Continuar</button>`;
  if (q.type === "match") return `<button class="btn" id="go" disabled onclick="next()">Continuar</button>`;
  return `<button class="btn" id="go" disabled onclick="check()">Comprobar</button>`;
}
function setReady(v) { cur.ready = v; const b = $("#go"); if (b) b.disabled = !v; }
function head(tag, text, mood = "happy", q) {
  const ch = q && !L.exam && q.u ? `<button class="link chuleta-btn" onclick="showChuleta('${q.u}')">${icon("bulb", 18)}Chuleta</button>` : "";
  return `<div class="q-head">${fox(mood, 54)}<div class="bubble"><span class="tag">${tag}</span>${text}</div>${ch}</div>`;
}
function showChuleta(uid) {
  const u = unitById(uid), d = document.createElement("div");
  d.className = "sheet-bg";
  d.innerHTML = `<div class="sheet"><div class="grab"></div>${grammarCards(u)}<button class="btn blue">Entendido</button></div>`;
  d.onclick = (e) => { if (e.target === d || e.target.closest(".btn")) d.remove(); };
  document.body.appendChild(d);
}

// ---- Render de cada tipo de pregunta
const optBtns = (arr) => `<div class="options">${arr.map((o, i) => `<button class="opt" data-v="${esc(o)}" onclick="selOpt(this)"><span class="k">${i + 1}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
function selOpt(el) {
  if (cur.locked) return; beep("tap");
  document.querySelectorAll(".opt").forEach((b) => b.classList.remove("sel"));
  el.classList.add("sel"); cur.value = el.dataset.v; setReady(true);
}
const noteLine = (w) => (w[3] ? `<div class="note">pasado de <b>${esc(w[3])}</b></div>` : "");
const RENDER = {
  intro: (q) => `${head("Palabra nueva", "¡Escucha y repite en voz alta!", "wow")}
    <div class="flash"><div class="flash-card"><div class="emoji">${q.w[2]}</div><div class="en">${esc(q.w[0])}</div><div class="es">${esc(q.w[1])}</div>${q.w[3] ? `<div class="muted" style="margin-top:4px">pasado de <b>${esc(q.w[3])}</b></div>` : ""}
    ${speakBtn(`'${jsq(q.w[0])}'`, "huge", 54)}${slowBtn(`'${jsq(q.w[0])}'`)}</div></div>`,
  theory: (q) => `${head("Gramática", "Lee esto con calma. ¡Es lo que entra en el examen!", "think")}` + grammarCards(unitById(q.u)),
  readtext: (q) => `${head("Lectura", "Lee el texto (y escúchalo). Luego vienen preguntas de verdadero o falso.", "think")}
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">${speakBtn("cur.q.text")}<h3 style="margin:0">${esc(q.title)}</h3></div>
    <div class="reading-text">${esc(q.text)}</div>`,
  pick: (q) => { cur.opts = shuffle([q.w[0], ...q.others.map((o) => o[0])]);
    return head("Vocabulario", "¿Cómo se dice en inglés?") + `<div class="prompt"><div class="emoji">${q.w[2]}</div><div><div class="word">${esc(q.w[1])}</div>${noteLine(q.w)}</div></div>` + optBtns(cur.opts); },
  pickEs: (q) => { cur.opts = shuffle([q.w[1], ...q.others.map((o) => o[1])]);
    return head("Vocabulario", "¿Qué significa esta palabra?") + `<div class="prompt">${speakBtn("cur.q.w[0]")}<div class="word">${esc(q.w[0])}</div></div>` + optBtns(cur.opts); },
  listen: (q) => { cur.opts = shuffle([q.w, ...q.others]).map((o) => o[2] + " " + o[1]);
    return head("Escucha", "Toca el altavoz. ¿Qué palabra has oído?", "wow") + speakBtn("cur.q.w[0]", "huge", 54) + slowBtn("cur.q.w[0]") + optBtns(cur.opts); },
  type: (q) => head("Escribe", "Escríbelo en inglés.") + `<div class="prompt"><div class="emoji">${q.w[2]}</div><div><div class="word">${esc(q.w[1])}</div>${noteLine(q.w)}</div></div>
    <textarea class="type-in" id="ti" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Escribe aquí…" oninput="cur.value=this.value;setReady(this.value.trim().length>0)"></textarea>`,
  spell: (q) => { cur.letters = shuffle(q.w[0].split("")); cur.built = [];
    return head("Deletrea", "Toca las letras en orden.") + `<div class="prompt"><div class="emoji">${q.w[2]}</div><div><div class="word">${esc(q.w[1])}</div></div><span style="margin-left:auto">${speakBtn("cur.q.w[0]", "mini", 18)}</span></div>
      <div class="answer-line" id="al"></div><div class="bank">${cur.letters.map((l, i) => `<button class="tile letter" id="t${i}" onclick="tapTile(${i})">${esc(l)}</button>`).join("")}</div>`; },
  match: (q) => { cur.left = shuffle(q.pairs); cur.right = shuffle(q.pairs); cur.sel = null; cur.done = 0; cur.miss = 0;
    return head("Parejas", "Toca una palabra y luego su significado.") + `<div class="match">
      ${cur.left.map((p, i) => `<button class="opt" id="ml${i}" onclick="tapMatch('l',${i})">${esc(p[0])}</button><button class="opt" id="mr${i}" onclick="tapMatch('r',${i})">${cur.right[i][2]} ${esc(cur.right[i][1])}</button>`).join("")}</div>`; },
  mc: (q) => { cur.opts = shuffle(q.o);
    return head("Gramática", "Elige la respuesta correcta.", "think", q) + `<div class="q-title">${esc(q.q).replace("___", '<span class="gap">&nbsp;</span>')}</div>` + optBtns(cur.opts); },
  order: (q) => { const words = q.s.split(" "); if (words[0] !== "I") words[0] = words[0].toLowerCase();
    cur.letters = shuffle(words); cur.built = [];
    return head("Frases", "Toca las palabras en el orden correcto.", "think", q) + `<div class="answer-line" id="al"></div><div class="bank">${cur.letters.map((l, i) => `<button class="tile" id="t${i}" onclick="tapTile(${i})">${esc(l)}</button>`).join("")}</div>`; },
  write: (q) => head("Escribe", "Escribe la frase en inglés.", "think", q) + `<div class="q-title">${esc(q.q)}</div>
    <textarea class="type-in" id="ti" autocapitalize="sentences" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Escribe en inglés…" oninput="cur.value=this.value;setReady(this.value.trim().length>0)"></textarea>`,
  tf: (q) => { cur.opts = ["True", "False"];
    return head("Lectura", "¿Verdadero o falso? Mira el texto si lo necesitas.", "think") + `<details open style="margin-bottom:14px"><summary class="link">${icon("book", 18)}${esc(q.title)}</summary><div class="reading-text" style="margin-top:8px">${esc(q.text)}</div></details>
      <div class="q-title">${esc(q.s)}</div><div class="tf">
      <button class="opt" data-v="True" onclick="selOpt(this)">✅ True</button><button class="opt" data-v="False" onclick="selOpt(this)">❌ False</button></div>`; }
};
const AFTER = {
  intro: (q) => setTimeout(() => say(q.w[0]), 250),
  pickEs: (q) => setTimeout(() => say(q.w[0]), 250),
  listen: (q) => setTimeout(() => say(q.w[0]), 300),
  type: () => setTimeout(() => $("#ti") && $("#ti").focus(), 100),
  write: () => setTimeout(() => $("#ti") && $("#ti").focus(), 100)
};
function tapTile(i) {
  if (cur.locked) return;
  const t = $("#t" + i); if (t.classList.contains("used")) return;
  beep("tap"); t.classList.add("used"); cur.built.push(i);
  drawBuilt();
}
function drawBuilt() {
  const spell = cur.q.type === "spell";
  $("#al").innerHTML = cur.built.map((i, n) => `<button class="tile ${spell ? "letter" : ""} pop" onclick="untap(${n})">${esc(cur.letters[i])}</button>`).join("");
  cur.value = cur.built.map((i) => cur.letters[i]).join(spell ? "" : " ");
  setReady(spell ? cur.built.length === cur.letters.length : cur.built.length > 0);
}
function untap(n) { if (cur.locked) return; const i = cur.built.splice(n, 1)[0]; $("#t" + i).classList.remove("used"); drawBuilt(); }
function tapMatch(side, i) {
  const el = $("#m" + side + i); if (el.classList.contains("gone")) return;
  beep("tap");
  if (!cur.sel || cur.sel.side === side) {
    document.querySelectorAll(".match .opt").forEach((b) => { if (b.id.startsWith("m" + side)) b.classList.remove("sel"); });
    el.classList.add("sel"); cur.sel = { side, i };
    if (side === "l") say(cur.left[i][0]);
    return;
  }
  const li = side === "l" ? i : cur.sel.i, ri = side === "r" ? i : cur.sel.i;
  const a = $("#ml" + li), b = $("#mr" + ri);
  if (cur.left[li][0] === cur.right[ri][0]) {
    beep("ok"); [a, b].forEach((x) => { x.classList.remove("sel"); x.classList.add("right"); setTimeout(() => x.classList.add("gone"), 250); });
    cur.done++;
    if (cur.done === cur.left.length) {
      const ok = cur.miss <= 1; ok ? L.right++ : L.wrong++;
      showFeedback(true, pick(PRAISE), cur.miss ? "Fallos: " + cur.miss : "¡Sin fallos!");
    }
  } else {
    beep("bad"); cur.miss++;
    [a, b].forEach((x) => { x.classList.add("wrong", "shake"); setTimeout(() => x.classList.remove("wrong", "shake", "sel"), 450); });
  }
  cur.sel = null;
}

// ---- Comprobar
function evaluate() {
  const q = cur.q, v = cur.value || "";
  switch (q.type) {
    case "pick": return { ok: v === q.w[0], sol: q.w[0], say: q.w[0] };
    case "pickEs": return { ok: v === q.w[1], sol: q.w[1], say: q.w[0] };
    case "listen": return { ok: v === q.w[2] + " " + q.w[1], sol: q.w[0] + " = " + q.w[1], say: q.w[0] };
    case "spell": return { ok: v.toLowerCase() === q.w[0].toLowerCase(), sol: q.w[0], say: q.w[0] };
    case "type": {
      const a = norm(v), b = norm(q.w[0]);
      if (a === b) return { ok: true, sol: q.w[0], say: q.w[0] };
      if (!L.exam && b.length >= 6 && lev(a, b) === 1) return { ok: true, almost: true, sol: q.w[0], say: q.w[0] };
      return { ok: false, sol: q.w[0], say: q.w[0] };
    }
    case "mc": { const ok = v === q.o[0]; return { ok, sol: q.o[0], exp: q.e, say: q.q.includes("___") && !/[áéíóúñ¿]/i.test(q.q) ? q.q.replace("___", q.o[0]).replace(/\(.*?\)/g, "") : null }; }
    case "order": return { ok: norm(v) === norm(q.s), sol: q.s + (/^(Is|Are|Do|Does|Did|Can|Has|Have|Where|What|How|When|Were|Was)\b/.test(q.s) ? "?" : "."), say: q.s };
    case "write": { const a = norm(v); return { ok: q.a.some((x) => norm(x) === a), sol: q.a[0], say: q.a[0] }; }
    case "tf": return { ok: (v === "True") === q.a, sol: q.a ? "True (verdadero)" : "False (falso)" };
  }
}
function showFeedback(ok, title, text) {
  const f = $("#foot");
  f.className = "foot " + (ok ? "ok" : "bad");
  f.innerHTML = `<div class="fb"><div class="badge-ic">${icon(ok ? "check" : "x", 28, 3.2)}</div><div><div class="fb-title">${title}</div><div class="fb-text">${text}</div></div></div>
    <button class="btn" id="go" onclick="next()">${ok ? "Continuar" : "Entendido"}</button>`;
}
function check() {
  if (!cur.ready || cur.locked) return;
  cur.locked = true;
  const q = cur.q, r = evaluate();
  L.log.push({ q, r, given: cur.value });
  if (r.ok) { L.right++; L.combo++; if (q.key && S.errors[q.key]) { S.errors[q.key]--; if (S.errors[q.key] <= 0) { delete S.errors[q.key]; S.fixed++; } } }
  else { L.wrong++; L.combo = 0; if (q.key) S.errors[q.key] = Math.min(5, (S.errors[q.key] || 0) + 1); }
  if (L.exam) { save(); next(); return; }
  document.querySelectorAll(".opt").forEach((b) => {
    const correct = q.type === "tf" ? (b.dataset.v === "True") === q.a
      : q.type === "listen" ? b.dataset.v === q.w[2] + " " + q.w[1]
      : q.type === "pickEs" ? b.dataset.v === q.w[1]
      : q.type === "pick" ? b.dataset.v === q.w[0] : b.dataset.v === (q.o || [])[0];
    if (correct) b.classList.add("right"); else if (b.classList.contains("sel")) b.classList.add("wrong");
  });
  const exp = r.exp ? `<span class="exp">💡 ${esc(r.exp)}</span>` : "";
  if (r.ok) {
    beep("ok"); if (r.say) say(r.say);
    const combo = L.combo >= 3 && L.combo % 3 === 0 ? ` 🔥 ${L.combo} seguidas` : "";
    showFeedback(true, (r.almost ? "¡Casi perfecto!" : pick(PRAISE)) + combo, r.almost ? "Ojo con cómo se escribe: <b>" + esc(r.sol) + "</b>" : exp);
  } else {
    beep("bad");
    if (!L.requeued.has(L.i) && q.type !== "tf") { L.requeued.add(L.qs.length); L.qs.push(Object.assign({}, q)); }
    showFeedback(false, "Respuesta correcta:", esc(r.sol) + exp);
    document.querySelector(".q-area").classList.add("shake");
    if (r.say) setTimeout(() => say(r.say), 400);
  }
  save();
}
function next() { if (SYN && SYN.speaking) SYN.cancel(); L.i++; showQ(); }

// Teclado (ordenador): Enter = comprobar / continuar · 1-4 = opción
document.addEventListener("keydown", (e) => {
  if (!L || !cur) return;
  if (e.key === "Enter") { e.preventDefault(); const b = $("#go"); if (b && !b.disabled) b.click(); return; }
  if (/^[1-4]$/.test(e.key) && document.activeElement.tagName !== "TEXTAREA") { const o = document.querySelectorAll(".options .opt, .tf .opt")[+e.key - 1]; if (o) o.click(); }
});

// ------------------------------------------------------------------ final de lección
function statBox(color, label, value, ic) { return `<div class="stat" style="--sc:${color}"><small>${label}</small><b>${ic ? icon(ic, 20) : ""}${value}</b></div>`; }
function finishLesson() {
  studying = false;
  const secs = Math.round((Date.now() - L.start) / 1000);
  let h = "";
  if (L.exam) {
    const right = L.log.filter((x) => x.r.ok).length, total = L.log.length || 1;
    const score = Math.round((right / total) * 100) / 10; // nota sobre 10 con un decimal
    (S.exams[L.uid] = S.exams[L.uid] || []).push({ t: Date.now(), score });
    const gained = 20 + Math.round(score * 3); S.xp += gained;
    const pass = score >= 5;
    const mistakes = L.log.filter((x) => !x.r.ok);
    h = `<div class="result">${fox(pass ? "cheer" : "sad", 130)}
      <h1 style="color:${pass ? "var(--green-d)" : "var(--red-d)"}">${score >= 9 ? "¡Sobresaliente!" : score >= 7 ? "¡Notable!" : score >= 6 ? "¡Bien!" : pass ? "¡Aprobado!" : "¡Casi! Hay que repasar"}</h1>
      <div class="grade-big ${pass ? "pass" : "fail"}">${fmtGrade(score)}</div><p class="muted">${right} de ${total} bien · +${gained} XP</p>
      ${mistakes.length ? `<div class="mistakes"><h3>Repasa esto:</h3>${mistakes.map((m) => `<div class="mistake">${esc(m.q.q || m.q.s || (m.q.w && m.q.w[1]) || "")}<br>Tú: <s>${esc(m.given || "—")}</s> · <span class="sol">${esc(m.r.sol)}</span></div>`).join("")}</div>` : ""}
      ${!pass ? `<button class="btn blue" onclick="L=null;renderNotes('${L.uid}')">${icon("book", 20)} Ver la chuleta</button>` : ""}
      <button class="btn" onclick="afterLesson()">Continuar</button></div>`;
    if (pass) { beep("win"); confetti(score >= 9 ? 80 : 40); }
  } else {
    const stars = L.wrong <= 1 ? 3 : L.wrong <= 3 ? 2 : 1;
    const gained = 10 + L.right + (stars === 3 ? 5 : 0);
    S.xp += gained;
    if (L.review) S.lastType = "review";
    else {
      S.lastType = "lesson";
      const key = L.uid + "-" + L.k, prev = S.lessons[key];
      S.lessons[key] = { stars: Math.max(stars, prev ? prev.stars : 0), n: (prev ? prev.n : 0) + 1 };
    }
    beep("win"); confetti(stars === 3 ? 60 : 25);
    const acc = Math.round((L.right / Math.max(1, L.right + L.wrong)) * 100);
    h = `<div class="result">${fox("cheer", 130)}<h1>${L.review ? "¡Repaso completado!" : "¡Lección completada!"}</h1>
      <div class="stars-big">${[1, 2, 3].map((n) => icon("star", 50).replace('class="ic"', `class="ic ${n > stars ? "off" : ""}"`)).join("")}</div>
      <div class="stats">${statBox("var(--yellow)", "XP", "+" + gained, "star")}${statBox("var(--green)", "Aciertos", acc + "%", "target")}${statBox("var(--blue)", "Tiempo", Math.floor(secs / 60) + ":" + String(secs % 60).padStart(2, "0"), "clock")}</div>
      <button class="btn" onclick="afterLesson()">Continuar</button></div>`;
  }
  checkBadges(); save();
  app().innerHTML = `<div class="lesson">${h}</div>`;
  cur = null;
}
function afterLesson() {
  L = null;
  if (goalJustMet) { goalJustMet = false; return celebrateGoal(); }
  if (newBadges.length) return showBadges();
  const left = S.goalMin * 60 - todaySecs();
  if (left > 0) return keepGoing(Math.ceil(left / 60));
  go("home");
}
function keepGoing(min) {
  const r = recommend();
  const lbl = r.review ? "Repaso de tus errores" : STEPS.find((x) => x.k === r.k).lbl + " · " + unitById(r.u).title;
  app().innerHTML = `<div class="lesson"><div class="result">${fox("wow", 120)}<h1 style="color:var(--orange)">¡Te quedan ${min} min!</h1>
    <p>Un empujón más y consigues la meta de hoy.</p><p class="muted">Siguiente: <b>${esc(lbl)}</b></p><div style="height:22px"></div>
    <button class="btn" onclick="startRec()">¡Vamos!</button><button class="btn ghost" onclick="go('home')">Ahora no</button></div></div>`;
}
function celebrateGoal() {
  beep("win"); confetti(100);
  const st = streak();
  app().innerHTML = `<div class="lesson"><div class="result">${fox("cheer", 130)}<h1 style="color:var(--orange)">¡Meta de hoy conseguida!</h1>
    <div class="grade-big" style="color:var(--orange);display:flex;align-items:center;justify-content:center;gap:6px">${icon("flame", 70)}${st}</div><p><b>día${st > 1 ? "s" : ""} seguido${st > 1 ? "s" : ""}</b></p>
    <p class="muted">${S.goalMin} minutos de inglés hoy. ¡Así se aprueba! Vuelve mañana para no perder la racha.</p><div style="height:22px"></div>
    <button class="btn" onclick="newBadges.length ? showBadges() : go('home')">¡Genial!</button></div></div>`;
}
function showBadges() {
  const id = newBadges.shift(), b = BADGES.find((x) => x.id === id);
  beep("win"); confetti(35);
  app().innerHTML = `<div class="lesson"><div class="result"><div class="pop" style="font-size:110px;line-height:1.1">${b.b}</div><h1>¡Nuevo logro!</h1><p style="font:600 24px var(--display)">${b.t}</p><div style="height:22px"></div>
    <button class="btn" onclick="newBadges.length ? showBadges() : go('home')">Continuar</button></div></div>`;
}

// ------------------------------------------------------------------ inicio
document.addEventListener("visibilitychange", () => { if (document.hidden) save(); });
window.addEventListener("pagehide", save);
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
render();
