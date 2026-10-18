// =====================================================================
//  UNIDAD QUE ESTÁN DANDO AHORA EN CLASE
//  Se añade a la lista de unidades (después del repaso de 4º) y se marca
//  sola como "En clase ahora" en todos los dispositivos.
//  Para cambiar de unidad en clase: cambia CLASS_UNIT (y añade la unidad aquí
//  si es nueva).
// =====================================================================

const CLASS_UNIT = "s1";

UNITS.splice(1, 0,
  {
    id: "s1", term: 1, emoji: "🛹", color: "#ff86d0",
    title: "All about me & sports", sub: "Presentarse · hobbies · sports · go + -ing · once / twice a week",
    vocab: [
      ["hobbies", "aficiones", "🎨"], ["favourite", "favorito", "⭐"], ["subject", "asignatura", "📚"],
      ["sport", "deporte", "🏅"], ["PE", "educación física", "⚽"], ["pet", "mascota", "🐶"],
      ["happy", "contento / feliz", "😀"], ["sad", "triste", "😔"], ["angry", "enfadado", "😠"],
      ["potato", "patata", "🥔"], ["pizza", "pizza", "🍕"], ["rugby", "rugby", "🏉"],
      ["BMX", "BMX (bici)", "🚲"], ["tennis", "tenis", "🎾"], ["once a week", "una vez a la semana", "1️⃣"],
      ["twice a week", "dos veces a la semana", "2️⃣"], ["on Fridays", "los viernes", "📅"], ["player", "jugador", "🧍"],
      ["go caving", "hacer espeleología (cuevas)", "🕳️"], ["go kayaking", "hacer kayak", "🛶"],
      ["go rock climbing", "hacer escalada", "🧗"], ["go scuba diving", "hacer submarinismo", "🤿"],
      ["go snowboarding", "hacer snowboard", "🏂"], ["go surfing", "hacer surf", "🏄"]
    ],
    grammar: [
      {
        title: "Presentarte (Introduction)",
        html: `<table><tr><th>❓ Question</th><th>✅ Answer</th></tr>
<tr><td>What's your name?</td><td>My name <b>is</b> Santi.</td></tr>
<tr><td>How old are you?</td><td><b>I'm</b> ten years old.</td></tr>
<tr><td>Where do you live?</td><td>I live <b>in</b> Mairena.</td></tr>
<tr><td>How are you today?</td><td>I'm <b>happy</b>. / I'm fine, thank you.</td></tr>
<tr><td>Have you got a pet?</td><td><b>Yes, I have.</b> / <b>No, I haven't.</b></td></tr></table>
<p>💡 Ciudades y nombres van con <b>MAYÚSCULA</b>: Santi, Mairena, Seville.</p>`
      },
      {
        title: "Hobbies, favourite y like",
        html: `<ul><li>What are your hobbies? → My hobbies are <b>BMX</b> and <b>rugby</b>.</li>
<li>What's your favourite subject? → My favourite subject is <b>PE</b>.</li>
<li>What's your favourite sport? → My favourite sport is <b>rugby</b>.</li>
<li>What do you like to eat? → I like to eat <b>potatoes</b> but I don't like to eat <b>fish</b>.</li></ul>
<p>⚠️ Se escribe <b>favourite</b> (inglés británico) y <b>happy</b> con dos p.</p>`
      },
      {
        title: "Go + deporte con -ing",
        html: `<p>Con muchos deportes de aventura usamos <b>go</b> + verbo con <b>-ing</b>:</p>
<ul><li>go cav<b>ing</b> 🕳️ · go kayak<b>ing</b> 🛶 · go rock climb<b>ing</b> 🧗</li>
<li>go scuba div<b>ing</b> 🤿 · go snowboard<b>ing</b> 🏂 · go surf<b>ing</b> 🏄</li></ul>
<p>I <b>go surfing</b> in summer. · Do you <b>go kayaking</b>? → Yes, I do.</p>
<p>⚠️ Pero: I <b>play</b> rugby / tennis / football (deportes con pelota → <b>play</b>).</p>`
      },
      {
        title: "¿Cada cuánto? (How often?)",
        html: `<ul><li><b>once a week</b> = una vez a la semana</li><li><b>twice a week</b> = dos veces a la semana</li>
<li><b>three times a week</b> = tres veces a la semana</li><li><b>on Fridays</b> = los viernes</li></ul>
<p>When do you practise rugby? → I practise rugby <b>twice a week</b>, <b>on Tuesdays and Thursdays</b>.</p>`
      }
    ],
    exercises: [
      { t: "mc", q: "How old are you? — I'm ten ___ old.", o: ["years", "year", "age"], e: "I'm ten years old." },
      { t: "mc", q: "Where do you live? — I live ___ Mairena.", o: ["in", "on", "at"], e: "Ciudades → in." },
      { t: "mc", q: "Have you got a pet? — Yes, I ___.", o: ["have", "got", "am"], e: "Respuesta corta: Yes, I have. / No, I haven't." },
      { t: "mc", q: "Have you got a pet? — No, I ___.", o: ["haven't", "don't", "not"] },
      { t: "mc", q: "My favourite ___ is PE.", o: ["subject", "sport", "pet"], e: "PE es una asignatura (subject)." },
      { t: "mc", q: "How are you today? — I'm ___ 😀", o: ["happy", "hapi", "sad"], e: "happy, con dos p y -y." },
      { t: "mc", q: "I like to eat ___ 🥔", o: ["potatoes", "poteitos", "patatas"], e: "potato → potatoes." },
      { t: "mc", q: "I go ___ in the sea 🏄", o: ["surfing", "surf", "surfs"], e: "go + -ing: go surfing." },
      { t: "mc", q: "🧗 = go ___", o: ["rock climbing", "rock climb", "climbing rock"] },
      { t: "mc", q: "🤿 = go ___", o: ["scuba diving", "scuba dive", "diving scuba"] },
      { t: "mc", q: "🛶 = go ___", o: ["kayaking", "kayak", "caving"] },
      { t: "mc", q: "🕳️ = go ___", o: ["caving", "cave", "kayaking"], e: "caving = explorar cuevas." },
      { t: "mc", q: "🏂 = go ___", o: ["snowboarding", "surfing", "skiing"] },
      { t: "mc", q: "I ___ rugby twice a week.", o: ["play", "go", "do"], e: "Deportes de pelota → play." },
      { t: "mc", q: "Twice a week = ___", o: ["dos veces a la semana", "una vez a la semana", "los viernes"] },
      { t: "mc", q: "Once a week = ___", o: ["una vez a la semana", "dos veces a la semana", "todos los días"] },
      { t: "mc", q: "What's your favourite sport? — My favourite sport ___ BMX.", o: ["is", "are", "am"] },
      { t: "order", s: "My name is Santi and I am ten years old" },
      { t: "order", s: "I live in Mairena" },
      { t: "order", s: "My favourite sport is rugby" },
      { t: "order", s: "I play rugby twice a week" },
      { t: "order", s: "I go surfing in summer" },
      { t: "write", q: "Escribe en inglés: contento", a: ["happy"] },
      { t: "write", q: "Escribe en inglés: patatas", a: ["potatoes"] },
      { t: "write", q: "Escribe en inglés: favorito", a: ["favourite", "favorite"] },
      { t: "write", q: "Traduce: Tengo diez años.", a: ["I'm ten years old", "I am ten years old", "I'm ten", "I am ten"] },
      { t: "write", q: "Traduce: Vivo en Mairena.", a: ["I live in Mairena"] },
      { t: "write", q: "Traduce: Hago surf.", a: ["I go surfing"] },
      { t: "write", q: "Traduce: dos veces a la semana", a: ["twice a week"] }
    ],
    reading: {
      title: "Hello! I'm Santi",
      text: "Hello! My name is Santi. I'm ten years old and I live in Mairena, near Seville. Doing exercise is important for our body, so I'm going to tell you about the sports I like. My favourite sport is rugby. I play rugby twice a week with my team. I also like BMX. I ride my BMX on Saturdays with my friends. In summer I go surfing and I go kayaking. My favourite subject is PE.",
      questions: [
        ["Santi is eleven years old.", false],
        ["He lives in Mairena.", true],
        ["He plays rugby twice a week.", true],
        ["His favourite subject is maths.", false],
        ["In summer he goes surfing.", true]
      ]
    }
  }
);

// Marca la unidad de clase una sola vez por cambio (luego papá puede cambiarla a mano)
(function () {
  try {
    var KEY = "english-fox-v1", s = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (s.classUnitFrom !== CLASS_UNIT) { s.classUnit = CLASS_UNIT; s.classUnitFrom = CLASS_UNIT; localStorage.setItem(KEY, JSON.stringify(s)); }
  } catch (e) {}
})();
