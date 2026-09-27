// =====================================================================
//  CONTENIDO DEL CURSO — Inglés 5º de Primaria (LOMLOE, nivel A1+/A2)
//  Para adaptarlo al libro de clase: cambia vocabulario, gramática y
//  ejercicios de cada unidad. La app se genera sola a partir de aquí.
//
//  vocab:     [inglés, español, emoji, nota opcional]
//  exercises: {t:"mc", q, o:[CORRECTA, mal, mal], e:"explicación"}
//             {t:"order", s:"Frase completa para ordenar"}
//             {t:"write", q:"Enunciado", a:["respuesta", "otra válida"]}
//  reading:   {title, text, questions:[[afirmación, true/false]]}
// =====================================================================

const UNITS = [
  // ------------------------------------------------------------------
  {
    id: "u0", term: 1, emoji: "🔁", color: "#1cb0f6",
    title: "Repaso de 4º", sub: "Días, meses, números, like y can",
    vocab: [
      ["Monday", "lunes", "📅"], ["Tuesday", "martes", "📅"], ["Wednesday", "miércoles", "📅"],
      ["Thursday", "jueves", "📅"], ["Friday", "viernes", "📅"], ["Saturday", "sábado", "🎉"],
      ["Sunday", "domingo", "🎉"], ["January", "enero", "❄️"], ["February", "febrero", "❄️"],
      ["March", "marzo", "🌱"], ["April", "abril", "🌷"], ["May", "mayo", "🌸"],
      ["June", "junio", "☀️"], ["July", "julio", "🏖️"], ["August", "agosto", "🏖️"],
      ["September", "septiembre", "🎒"], ["October", "octubre", "🎃"], ["November", "noviembre", "🍂"],
      ["December", "diciembre", "🎄"], ["thirteen", "trece", "13"], ["thirty", "treinta", "30"],
      ["fifteen", "quince", "15"], ["fifty", "cincuenta", "50"], ["forty", "cuarenta", "40"],
      ["one hundred", "cien", "100"]
    ],
    grammar: [
      {
        title: "Like / don't like",
        html: `<p>Para decir lo que te gusta: <b>I like</b> + cosa o verbo con <b>-ing</b>.</p>
<ul><li>I <b>like</b> pizza. — Me gusta la pizza.</li>
<li>I <b>don't like</b> spiders. — No me gustan las arañas.</li>
<li>I like <b>swimming</b>. — Me gusta nadar.</li>
<li>She <b>likes</b> music. (con he/she/it añade <b>-s</b>)</li></ul>
<p>Pregunta: <b>Do you like</b> cats? → <i>Yes, I do.</i> / <i>No, I don't.</i></p>`
      },
      {
        title: "Can / can't",
        html: `<p><b>can</b> = poder / saber hacer algo. ¡Nunca lleva -s y el verbo va sin "to"!</p>
<ul><li>I <b>can</b> swim. — Sé nadar.</li>
<li>He <b>can't</b> ride a bike. — Él no sabe montar en bici.</li>
<li><b>Can</b> you dance? → <i>Yes, I can.</i> / <i>No, I can't.</i></li></ul>`
      },
      {
        title: "In / on con fechas",
        html: `<ul><li><b>on</b> + día: <b>on</b> Monday, <b>on</b> Saturdays</li>
<li><b>in</b> + mes: <b>in</b> May, <b>in</b> December</li>
<li>Días y meses se escriben siempre con <b>MAYÚSCULA</b>: Monday, July.</li></ul>`
      }
    ],
    exercises: [
      { t: "mc", q: "I ___ like spiders.", o: ["don't", "doesn't", "not"], e: "Con I usamos don't." },
      { t: "mc", q: "Do you like pizza? — Yes, I ___.", o: ["do", "like", "am"], e: "Respuesta corta: Yes, I do." },
      { t: "mc", q: "She ___ chocolate.", o: ["likes", "like", "liking"], e: "Con she, el verbo lleva -s: likes." },
      { t: "mc", q: "My birthday is ___ May.", o: ["in", "on", "at"], e: "Meses → in." },
      { t: "mc", q: "I play tennis ___ Tuesdays.", o: ["on", "in", "at"], e: "Días → on." },
      { t: "mc", q: "15 = ?", o: ["fifteen", "fifty", "fiveteen"] },
      { t: "mc", q: "40 = ?", o: ["forty", "fourty", "fourteen"], e: "¡Ojo! forty va sin u." },
      { t: "mc", q: "I can ___ a bike.", o: ["ride", "riding", "rides"], e: "Después de can, el verbo va tal cual." },
      { t: "mc", q: "Can you swim? — No, I ___.", o: ["can't", "don't", "am not"] },
      { t: "mc", q: "The day after Friday is ___.", o: ["Saturday", "Thursday", "Sunday"] },
      { t: "mc", q: "The month after March is ___.", o: ["April", "May", "February"] },
      { t: "mc", q: "I like ___ football.", o: ["playing", "play", "plays"], e: "like + verbo con -ing." },
      { t: "order", s: "I like playing football on Saturdays" },
      { t: "order", s: "Can your sister speak English" },
      { t: "order", s: "My birthday is in October" },
      { t: "write", q: "Escribe en letras: 30", a: ["thirty"] },
      { t: "write", q: "Traduce: No me gustan los tomates.", a: ["I don't like tomatoes"] },
      { t: "write", q: "Traduce: Yo sé nadar.", a: ["I can swim"] }
    ],
    reading: {
      title: "Mia's week",
      text: "Hi! I'm Mia. I'm ten. On Mondays and Wednesdays I go to swimming lessons. I can swim very fast! On Fridays I play the piano. I like music but I don't like singing. My birthday is in July, so I have a party at the beach. I can't wait!",
      questions: [
        ["Mia goes swimming on Mondays.", true],
        ["She can swim very fast.", true],
        ["She plays the piano on Tuesdays.", false],
        ["Mia likes singing.", false],
        ["Her birthday is in July.", true]
      ]
    }
  },
  // ------------------------------------------------------------------
  {
    id: "u1", term: 1, emoji: "👪", color: "#58cc02",
    title: "Me and my family", sub: "Familia, cole · to be · have got",
    vocab: [
      ["grandfather", "abuelo", "👴"], ["grandmother", "abuela", "👵"], ["uncle", "tío", "👨"],
      ["aunt", "tía", "👩"], ["cousin", "primo / prima", "🧒"], ["brother", "hermano", "👦"],
      ["sister", "hermana", "👧"], ["parents", "padres", "👪"], ["maths", "matemáticas", "🔢"],
      ["science", "ciencias", "🔬"], ["art", "plástica", "🎨"], ["music", "música", "🎵"],
      ["PE", "educación física", "⚽"], ["history", "historia", "🏺"], ["geography", "geografía", "🌍"],
      ["timetable", "horario", "🗓️"], ["classroom", "aula", "🏫"], ["playground", "patio", "🛝"],
      ["rubber", "goma de borrar", "🧽"], ["pencil case", "estuche", "✏️"], ["ruler", "regla", "📏"],
      ["homework", "deberes", "📚"]
    ],
    grammar: [
      {
        title: "Verb to be (ser / estar)",
        html: `<table><tr><th>✅ Afirmativa</th><th>❌ Negativa</th><th>❓ Pregunta</th></tr>
<tr><td>I <b>am</b> (I'm)</td><td>I'm not</td><td>Am I...?</td></tr>
<tr><td>You <b>are</b> (you're)</td><td>You aren't</td><td>Are you...?</td></tr>
<tr><td>He / She / It <b>is</b></td><td>He isn't</td><td>Is he...?</td></tr>
<tr><td>We / You / They <b>are</b></td><td>They aren't</td><td>Are they...?</td></tr></table>
<p>Respuestas cortas: <i>Yes, I am.</i> / <i>No, she isn't.</i></p>`
      },
      {
        title: "Have got (tener)",
        html: `<ul><li>I / You / We / They <b>have got</b> (I've got) a dog.</li>
<li>He / She / It <b>has got</b> (she's got) a dog.</li>
<li>Negativa: I <b>haven't got</b> · He <b>hasn't got</b></li>
<li>Pregunta: <b>Have</b> you <b>got</b> a ruler? → <i>Yes, I have.</i><br><b>Has</b> she <b>got</b> a cat? → <i>No, she hasn't.</i></li></ul>`
      },
      {
        title: "Posesivos (mi, tu, su...)",
        html: `<table><tr><td>I → <b>my</b></td><td>mi</td></tr><tr><td>you → <b>your</b></td><td>tu</td></tr>
<tr><td>he → <b>his</b></td><td>su (de él)</td></tr><tr><td>she → <b>her</b></td><td>su (de ella)</td></tr>
<tr><td>it → <b>its</b></td><td>su (de una cosa/animal)</td></tr><tr><td>we → <b>our</b></td><td>nuestro</td></tr>
<tr><td>they → <b>their</b></td><td>su (de ellos)</td></tr></table>
<p>💡 Truco: <b>his</b> es de un chico, <b>her</b> es de una chica.</p>`
      }
    ],
    exercises: [
      { t: "mc", q: "My sister ___ ten years old.", o: ["is", "are", "am"], e: "My sister = she → is." },
      { t: "mc", q: "We ___ in 5th grade.", o: ["are", "is", "am"] },
      { t: "mc", q: "I ___ got a new rubber.", o: ["have", "has", "am"], e: "Con I → have got." },
      { t: "mc", q: "He ___ got a cat.", o: ["has", "have", "is"], e: "Con he/she/it → has got." },
      { t: "mc", q: "She ___ got a brother. (negativa)", o: ["hasn't", "haven't", "isn't"] },
      { t: "mc", q: "___ you got a ruler? — Yes, I have.", o: ["Have", "Has", "Are"] },
      { t: "mc", q: "This is Tom. ___ mum is a teacher.", o: ["His", "Her", "Their"], e: "Tom es chico → his." },
      { t: "mc", q: "This is Anna. ___ favourite subject is art.", o: ["Her", "His", "Our"], e: "Anna es chica → her." },
      { t: "mc", q: "They are my cousins. ___ house is big.", o: ["Their", "They", "There"], e: "Their = su (de ellos)." },
      { t: "mc", q: "Are you from Spain? — Yes, I ___.", o: ["am", "are", "is"] },
      { t: "mc", q: "My parents ___ at home.", o: ["aren't", "isn't", "hasn't"], e: "My parents = they → aren't." },
      { t: "mc", q: "Has your uncle got a car? — No, he ___.", o: ["hasn't", "haven't", "isn't"] },
      { t: "order", s: "My favourite subject is science" },
      { t: "order", s: "Has your brother got a bike" },
      { t: "order", s: "We are not in the playground" },
      { t: "write", q: "Traduce: Ella tiene dos primos.", a: ["She has got two cousins", "She has two cousins"] },
      { t: "write", q: "Pon en negativa: I am tired.", a: ["I am not tired"] },
      { t: "write", q: "Traduce: ¿Tienes deberes?", a: ["Have you got homework", "Have you got any homework", "Do you have homework", "Do you have any homework"] }
    ],
    reading: {
      title: "Hello, I'm Lucas!",
      text: "Hi! My name is Lucas. I am ten years old and I am from Seville. I have got one sister, Marta. She is seven. My favourite subject is PE because I love football. I haven't got a dog, but I have got two cats. Their names are Tom and Luna.",
      questions: [
        ["Lucas is eleven years old.", false],
        ["Lucas has got a sister.", true],
        ["Marta is seven.", true],
        ["His favourite subject is art.", false],
        ["Lucas has got a dog.", false]
      ]
    }
  },
  // ------------------------------------------------------------------
  {
    id: "u2", term: 1, emoji: "⏰", color: "#ff9600",
    title: "Daily routines", sub: "Rutinas, la hora · present simple",
    vocab: [
      ["get up", "levantarse", "⏰"], ["have a shower", "ducharse", "🚿"], ["get dressed", "vestirse", "👕"],
      ["have breakfast", "desayunar", "🥣"], ["brush my teeth", "lavarme los dientes", "🪥"],
      ["go to school", "ir al colegio", "🏫"], ["have lunch", "comer (almorzar)", "🍽️"],
      ["do homework", "hacer los deberes", "📝"], ["have dinner", "cenar", "🍝"], ["go to bed", "irse a la cama", "🛏️"],
      ["always", "siempre", "💯"], ["usually", "normalmente", "👍"], ["often", "a menudo", "🔁"],
      ["sometimes", "a veces", "🤷"], ["never", "nunca", "🚫"], ["morning", "mañana", "🌅"],
      ["afternoon", "tarde", "☀️"], ["evening", "tarde-noche", "🌆"], ["o'clock", "en punto", "🕐"],
      ["half past", "y media", "🕧"], ["quarter past", "y cuarto", "🕒"], ["quarter to", "menos cuarto", "🕘"]
    ],
    grammar: [
      {
        title: "Present simple (lo que haces normalmente)",
        html: `<p>I / You / We / They <b>play</b> · He / She / It <b>plays</b> ← ¡añade <b>-s</b>!</p>
<ul><li>Termina en -sh, -ch, -o, -x → <b>-es</b>: watch<b>es</b>, go<b>es</b>, do<b>es</b></li>
<li>Consonante + y → <b>-ies</b>: study → stud<b>ies</b></li></ul>
<p>❌ Negativa: I <b>don't</b> play · She <b>doesn't</b> play (¡sin -s!)</p>
<p>❓ Pregunta: <b>Do</b> you play...? · <b>Does</b> he play...? → <i>Yes, he does.</i> / <i>No, he doesn't.</i></p>`
      },
      {
        title: "Adverbios de frecuencia",
        html: `<p>always (100%) › usually › often › sometimes › never (0%)</p>
<ul><li>Van <b>ANTES</b> del verbo: I <b>always</b> get up at 8.</li>
<li>Pero <b>DESPUÉS</b> de to be: She <b>is never</b> late.</li></ul>`
      },
      {
        title: "La hora",
        html: `<ul><li>7:00 → It's seven <b>o'clock</b>.</li><li>7:15 → It's <b>quarter past</b> seven.</li>
<li>7:30 → It's <b>half past</b> seven.</li><li>7:45 → It's <b>quarter to</b> eight. (¡menos cuarto de la SIGUIENTE!)</li>
<li>a las 8 → <b>at</b> eight o'clock</li></ul>`
      }
    ],
    exercises: [
      { t: "mc", q: "My dad ___ at 7 o'clock.", o: ["gets up", "get up", "getting up"], e: "My dad = he → verbo con -s." },
      { t: "mc", q: "She ___ TV after school.", o: ["watches", "watchs", "watch"], e: "watch termina en -ch → watches." },
      { t: "mc", q: "We ___ lunch at school.", o: ["have", "has", "haves"] },
      { t: "mc", q: "Tom ___ like fish.", o: ["doesn't", "don't", "isn't"], e: "Con he/she/it → doesn't." },
      { t: "mc", q: "___ your sister go to bed early?", o: ["Does", "Do", "Is"], e: "your sister = she → Does." },
      { t: "mc", q: "Do you play tennis? — No, I ___.", o: ["don't", "doesn't", "not"] },
      { t: "mc", q: "He ___ his homework in the afternoon.", o: ["does", "do", "dos"] },
      { t: "mc", q: "My mum ___ English. (study)", o: ["studies", "studys", "study"], e: "Consonante + y → -ies." },
      { t: "mc", q: "¿Cuál está bien?", o: ["I always have breakfast.", "I have always breakfast.", "Always I have breakfast."], e: "El adverbio va antes del verbo." },
      { t: "mc", q: "¿Cuál está bien?", o: ["She is never late.", "She never is late.", "Never she is late."], e: "Con to be, el adverbio va después." },
      { t: "mc", q: "7:30 → It's ___ seven.", o: ["half past", "quarter past", "quarter to"] },
      { t: "mc", q: "8:45 → It's ___ nine.", o: ["quarter to", "quarter past", "half past"] },
      { t: "order", s: "I usually brush my teeth after dinner" },
      { t: "order", s: "Does he go to school by bus" },
      { t: "order", s: "She never has a shower in the morning" },
      { t: "write", q: "Cambia a 3ª persona: I go to school. → He ...", a: ["He goes to school"] },
      { t: "write", q: "Pon en negativa: She plays football.", a: ["She doesn't play football"] },
      { t: "write", q: "Traduce: Yo siempre me levanto a las ocho.", a: ["I always get up at eight", "I always get up at 8", "I always get up at eight o'clock", "I always get up at 8 o'clock"] }
    ],
    reading: {
      title: "Emma's day",
      text: "Emma is eleven. On school days she gets up at half past seven. She has a shower and gets dressed. She always has cereal for breakfast. She goes to school by bike. She has lunch at school at two o'clock. In the afternoon she does her homework and sometimes she plays tennis. She has dinner at nine and she goes to bed at half past nine. She never watches TV at night.",
      questions: [
        ["Emma gets up at seven o'clock.", false],
        ["She goes to school by bike.", true],
        ["She has lunch at home.", false],
        ["She sometimes plays tennis.", true],
        ["She watches TV at night.", false]
      ]
    }
  },
  // ------------------------------------------------------------------
  {
    id: "u3", term: 1, emoji: "🍎", color: "#ff4b4b",
    title: "Food, glorious food", sub: "Comida · some / any · how much / many",
    vocab: [
      ["apple", "manzana", "🍎"], ["banana", "plátano", "🍌"], ["orange", "naranja", "🍊"],
      ["strawberry", "fresa", "🍓"], ["grapes", "uvas", "🍇"], ["carrot", "zanahoria", "🥕"],
      ["potato", "patata", "🥔"], ["tomato", "tomate", "🍅"], ["onion", "cebolla", "🧅"],
      ["bread", "pan", "🍞"], ["cheese", "queso", "🧀"], ["meat", "carne", "🥩"],
      ["fish", "pescado", "🐟"], ["chicken", "pollo", "🍗"], ["egg", "huevo", "🥚"],
      ["rice", "arroz", "🍚"], ["milk", "leche", "🥛"], ["water", "agua", "💧"],
      ["juice", "zumo", "🧃"], ["sugar", "azúcar", "🍬"], ["salt", "sal", "🧂"],
      ["healthy", "sano", "🥗"], ["unhealthy", "poco saludable", "🍟"]
    ],
    grammar: [
      {
        title: "Contables e incontables",
        html: `<ul><li><b>Contables</b> (se pueden contar): an apple, two apples, an egg, three carrots.</li>
<li><b>Incontables</b> (no se cuentan, sin plural ni a/an): milk, water, bread, rice, cheese, sugar, meat.</li></ul>
<p>Plurales: tomato → tomato<b>es</b>, potato → potato<b>es</b>, strawberry → strawberr<b>ies</b></p>
<p><b>a</b> + consonante (a banana) · <b>an</b> + vocal (an apple, an orange, an egg)</p>`
      },
      {
        title: "Some / any",
        html: `<ul><li>✅ Afirmativa → <b>some</b>: There are <b>some</b> eggs.</li>
<li>❌ Negativa → <b>any</b>: There isn't <b>any</b> milk.</li>
<li>❓ Pregunta → <b>any</b>: Are there <b>any</b> apples?</li>
<li>Para pedir u ofrecer → <b>some</b>: Can I have <b>some</b> water, please?</li></ul>`
      },
      {
        title: "How much / how many · I'd like",
        html: `<ul><li><b>How many</b> + contable plural: How many apples?</li>
<li><b>How much</b> + incontable: How much milk?</li>
<li><b>I'd like</b> (= I would like) = me gustaría / quisiera: I'd like a sandwich, please.</li>
<li><b>Would you like</b> some juice? → <i>Yes, please.</i> / <i>No, thank you.</i></li></ul>`
      }
    ],
    exercises: [
      { t: "mc", q: "There are ___ apples in the fridge.", o: ["some", "any", "a"], e: "Afirmativa → some." },
      { t: "mc", q: "There isn't ___ milk.", o: ["any", "some", "a"], e: "Negativa → any." },
      { t: "mc", q: "Are there ___ eggs?", o: ["any", "some", "an"], e: "Pregunta → any." },
      { t: "mc", q: "I've got ___ orange.", o: ["an", "a", "some"], e: "orange empieza por vocal → an." },
      { t: "mc", q: "___ bread do you want?", o: ["How much", "How many", "How"], e: "bread es incontable → How much." },
      { t: "mc", q: "___ bananas are there?", o: ["How many", "How much", "How"], e: "bananas se cuentan → How many." },
      { t: "mc", q: "¿Cuál es INCONTABLE?", o: ["rice", "egg", "carrot"] },
      { t: "mc", q: "¿Cuál es CONTABLE?", o: ["strawberry", "water", "sugar"] },
      { t: "mc", q: "___ you like some juice? — Yes, please.", o: ["Would", "Do", "Are"] },
      { t: "mc", q: "We haven't got ___ potatoes.", o: ["any", "some", "a"] },
      { t: "mc", q: "Can I have ___ water, please?", o: ["some", "any", "a"], e: "Al pedir algo → some." },
      { t: "mc", q: "one tomato → two ___", o: ["tomatoes", "tomatos", "tomatees"] },
      { t: "order", s: "There is some cheese on the table" },
      { t: "order", s: "How many tomatoes do you need" },
      { t: "order", s: "I would like some chicken and rice" },
      { t: "write", q: "Traduce: No hay azúcar.", a: ["There isn't any sugar", "There is no sugar"] },
      { t: "write", q: "Traduce: ¿Hay huevos?", a: ["Are there any eggs"] },
      { t: "write", q: "Plural: one strawberry → two ...", a: ["strawberries", "two strawberries"] }
    ],
    reading: {
      title: "Going shopping",
      text: "Mum: Sam, can you go to the shop? We haven't got any bread.\nSam: OK. What else do we need?\nMum: We need some eggs and some milk. There are some apples, but there aren't any bananas.\nSam: How many bananas do you want?\nMum: Six, please. And a big bottle of water.\nSam: Can I buy some sweets?\nMum: No! Sweets are unhealthy!",
      questions: [
        ["They have got bread at home.", false],
        ["Mum needs some eggs.", true],
        ["There are some apples at home.", true],
        ["Sam must buy four bananas.", false],
        ["Mum says sweets are healthy.", false]
      ]
    }
  },
  // ------------------------------------------------------------------
  {
    id: "u4", term: 2, emoji: "🏙️", color: "#ce82ff",
    title: "My town", sub: "Lugares · there is / are · preposiciones",
    vocab: [
      ["library", "biblioteca", "📚"], ["hospital", "hospital", "🏥"], ["bank", "banco", "🏦"],
      ["post office", "correos", "📮"], ["supermarket", "supermercado", "🛒"], ["bakery", "panadería", "🥐"],
      ["museum", "museo", "🏛️"], ["cinema", "cine", "🎬"], ["park", "parque", "🌳"],
      ["sports centre", "polideportivo", "🏟️"], ["train station", "estación de tren", "🚉"],
      ["chemist's", "farmacia", "💊"], ["street", "calle", "🛣️"], ["bridge", "puente", "🌉"],
      ["next to", "al lado de", "↔️"], ["opposite", "enfrente de", "🔄"], ["between", "entre", "⏸️"],
      ["behind", "detrás de", "🔙"], ["in front of", "delante de", "🔜"], ["near", "cerca de", "📍"],
      ["turn left", "gira a la izquierda", "⬅️"], ["turn right", "gira a la derecha", "➡️"],
      ["go straight on", "sigue recto", "⬆️"]
    ],
    grammar: [
      {
        title: "There is / There are (hay)",
        html: `<table><tr><th></th><th>1 cosa</th><th>Varias cosas</th></tr>
<tr><td>✅</td><td>There <b>is</b> a park.</td><td>There <b>are</b> two parks.</td></tr>
<tr><td>❌</td><td>There <b>isn't</b> a cinema.</td><td>There <b>aren't</b> any shops.</td></tr>
<tr><td>❓</td><td><b>Is there</b> a bank?</td><td><b>Are there</b> any museums?</td></tr></table>
<p>Respuestas: <i>Yes, there is.</i> / <i>No, there aren't.</i></p>`
      },
      {
        title: "Preposiciones de lugar",
        html: `<ul><li><b>next to</b> = al lado de → The bank is next to the café.</li>
<li><b>opposite</b> = enfrente de (¡sin "to"!)</li><li><b>between</b> ... <b>and</b> ... = entre</li>
<li><b>behind</b> = detrás de · <b>in front of</b> = delante de · <b>near</b> = cerca de</li></ul>`
      },
      {
        title: "Dar direcciones",
        html: `<ul><li><b>Go straight on.</b> — Sigue recto.</li><li><b>Turn left / right.</b> — Gira a la izquierda / derecha.</li>
<li><b>It's on the left / right.</b> — Está a la izquierda / derecha.</li>
<li>Para preguntar: <b>Where is the library, please?</b></li></ul>`
      }
    ],
    exercises: [
      { t: "mc", q: "___ a big park in my town.", o: ["There is", "There are", "It is"], e: "Un parque (singular) → There is." },
      { t: "mc", q: "___ two cinemas near my house.", o: ["There are", "There is", "They are"], e: "Dos (plural) → There are." },
      { t: "mc", q: "___ there a library? — Yes, there is.", o: ["Is", "Are", "Has"] },
      { t: "mc", q: "Are there any museums? — No, there ___.", o: ["aren't", "isn't", "don't"] },
      { t: "mc", q: "The bank is ___ the café and the bakery.", o: ["between", "next", "opposite to"] },
      { t: "mc", q: "The bakery is next ___ the bank.", o: ["to", "of", "at"] },
      { t: "mc", q: "The school is in front ___ the park.", o: ["of", "to", "at"] },
      { t: "mc", q: "\"Enfrente de\" es...", o: ["opposite", "behind", "near"] },
      { t: "mc", q: "\"Detrás de\" es...", o: ["behind", "between", "in front of"] },
      { t: "mc", q: "Where can you buy medicine?", o: ["at the chemist's", "at the library", "at the bakery"] },
      { t: "mc", q: "Where can you see a film?", o: ["at the cinema", "at the museum", "at the bank"] },
      { t: "mc", q: "Where can you catch a train?", o: ["at the train station", "at the post office", "at the sports centre"] },
      { t: "order", s: "The hospital is opposite the supermarket" },
      { t: "order", s: "Is there a post office near here" },
      { t: "order", s: "Go straight on and turn left" },
      { t: "write", q: "Traduce: Hay una biblioteca al lado del parque.", a: ["There is a library next to the park"] },
      { t: "write", q: "Traduce: No hay cine en mi pueblo.", a: ["There isn't a cinema in my town", "There is no cinema in my town", "There isn't a cinema in my village", "There is no cinema in my village"] },
      { t: "write", q: "Traduce: Gira a la derecha.", a: ["Turn right"] }
    ],
    reading: {
      title: "Welcome to Greenfield",
      text: "I live in a small town called Greenfield. There is a big park in the centre of the town. Opposite the park there is a library. I go there on Saturdays. There are two supermarkets but there isn't a cinema. The sports centre is next to my school, between the school and the train station. My favourite place is the bakery because the cakes are delicious!",
      questions: [
        ["There is a cinema in Greenfield.", false],
        ["The library is opposite the park.", true],
        ["There are two supermarkets.", true],
        ["The sports centre is next to the hospital.", false],
        ["The writer's favourite place is the bakery.", true]
      ]
    }
  },
  // ------------------------------------------------------------------
  {
    id: "u5", term: 2, emoji: "👕", color: "#2b70c9",
    title: "What are you wearing?", sub: "Ropa · present continuous",
    vocab: [
      ["T-shirt", "camiseta", "👕"], ["jumper", "jersey", "🧶"], ["jacket", "chaqueta", "🧥"],
      ["dress", "vestido", "👗"], ["skirt", "falda", "🩱"], ["trousers", "pantalones", "👖"],
      ["shorts", "pantalones cortos", "🩳"], ["trainers", "zapatillas de deporte", "👟"],
      ["shoes", "zapatos", "👞"], ["boots", "botas", "🥾"], ["socks", "calcetines", "🧦"],
      ["hat", "sombrero", "🎩"], ["cap", "gorra", "🧢"], ["scarf", "bufanda", "🧣"],
      ["gloves", "guantes", "🧤"], ["wearing", "llevando puesto", "🪞"], ["reading", "leyendo", "📖"],
      ["swimming", "nadando", "🏊"], ["running", "corriendo", "🏃"], ["dancing", "bailando", "💃"],
      ["sleeping", "durmiendo", "😴"], ["writing", "escribiendo", "✍️"]
    ],
    grammar: [
      {
        title: "Present continuous (lo que pasa AHORA)",
        html: `<p><b>am / is / are</b> + verbo<b>-ing</b></p>
<ul><li>I <b>am reading</b>. — Estoy leyendo.</li><li>She <b>is dancing</b>. — Ella está bailando.</li>
<li>They <b>are running</b>. — Están corriendo.</li></ul>
<p>❌ She <b>isn't</b> sleeping. · ❓ <b>Are</b> you listening? → <i>Yes, I am.</i></p>
<p>Palabras pista: <b>now, right now, at the moment, Look!</b></p>`
      },
      {
        title: "Ortografía del -ing",
        html: `<ul><li>Normal: read → read<b>ing</b>, play → play<b>ing</b></li>
<li>Termina en -e → quita la e: danc<s>e</s> → danc<b>ing</b>, writ<s>e</s> → writ<b>ing</b></li>
<li>Vocal + consonante corta → dobla: swim → swi<b>mm</b>ing, run → ru<b>nn</b>ing, sit → si<b>tt</b>ing</li></ul>`
      },
      {
        title: "¿Simple o continuo?",
        html: `<ul><li><b>Present simple</b> = siempre / normalmente: I <b>wear</b> a uniform every day.</li>
<li><b>Present continuous</b> = ahora mismo: Today I <b>am wearing</b> jeans.</li></ul>`
      }
    ],
    exercises: [
      { t: "mc", q: "Look! The baby ___.", o: ["is sleeping", "sleeps", "sleeping"], e: "Look! = ahora → present continuous." },
      { t: "mc", q: "They ___ football right now.", o: ["are playing", "is playing", "play"] },
      { t: "mc", q: "I ___ a blue jumper today.", o: ["am wearing", "is wearing", "wearing"] },
      { t: "mc", q: "She ___ reading, she's writing.", o: ["isn't", "aren't", "don't"] },
      { t: "mc", q: "___ you listening to me?", o: ["Are", "Do", "Is"] },
      { t: "mc", q: "Is he swimming? — Yes, he ___.", o: ["is", "does", "swims"] },
      { t: "mc", q: "swim + ing =", o: ["swimming", "swiming", "swimeing"], e: "Se dobla la m." },
      { t: "mc", q: "dance + ing =", o: ["dancing", "danceing", "dancinng"], e: "Se quita la e." },
      { t: "mc", q: "run + ing =", o: ["running", "runing", "runeing"] },
      { t: "mc", q: "I usually ___ jeans, but today I'm wearing a dress.", o: ["wear", "am wearing", "wears"], e: "usually = normalmente → present simple." },
      { t: "mc", q: "Every day my dad ___ to work.", o: ["drives", "is driving", "driving"], e: "Every day → present simple." },
      { t: "mc", q: "At the moment we ___ English.", o: ["are studying", "study", "studies"], e: "At the moment → present continuous." },
      { t: "order", s: "My brother is wearing a red cap" },
      { t: "order", s: "What are you doing now" },
      { t: "order", s: "We are not watching TV at the moment" },
      { t: "write", q: "Traduce: Ella está bailando.", a: ["She is dancing"] },
      { t: "write", q: "Pon en negativa: They are running.", a: ["They aren't running"] },
      { t: "write", q: "Haz la pregunta: He is reading. → ¿...?", a: ["Is he reading"] }
    ],
    reading: {
      title: "A day in the park",
      text: "It's Saturday afternoon and the Brown family are in the park. Dad is reading a book under a tree. He is wearing shorts and a cap because it's hot. Mum and Lily are running. Lily is wearing pink trainers. Baby Max isn't playing, he is sleeping. And where is Jack? He is in the lake! He is swimming with the ducks!",
      questions: [
        ["The family are at the beach.", false],
        ["Dad is reading a book.", true],
        ["Lily is wearing pink trainers.", true],
        ["Baby Max is playing.", false],
        ["Jack is swimming.", true]
      ]
    }
  },
  // ------------------------------------------------------------------
  {
    id: "u6", term: 2, emoji: "🦁", color: "#ffc800",
    title: "Amazing animals", sub: "Animales · comparativos y superlativos",
    vocab: [
      ["elephant", "elefante", "🐘"], ["giraffe", "jirafa", "🦒"], ["lion", "león", "🦁"],
      ["tiger", "tigre", "🐯"], ["monkey", "mono", "🐒"], ["crocodile", "cocodrilo", "🐊"],
      ["snake", "serpiente", "🐍"], ["bear", "oso", "🐻"], ["dolphin", "delfín", "🐬"],
      ["whale", "ballena", "🐋"], ["shark", "tiburón", "🦈"], ["eagle", "águila", "🦅"],
      ["penguin", "pingüino", "🐧"], ["parrot", "loro", "🦜"], ["big", "grande", "🐘"],
      ["small", "pequeño", "🐭"], ["tall", "alto", "🦒"], ["fast", "rápido", "⚡"],
      ["slow", "lento", "🐢"], ["heavy", "pesado", "🏋️"], ["dangerous", "peligroso", "⚠️"],
      ["beautiful", "bonito", "🦋"], ["strong", "fuerte", "💪"]
    ],
    grammar: [
      {
        title: "Comparativos (más ... que)",
        html: `<ul><li>Adjetivo corto + <b>-er than</b>: tall → tall<b>er than</b>, fast → fast<b>er than</b></li>
<li>Termina en -e: large → large<b>r</b></li>
<li>Vocal + consonante: big → bi<b>gger</b>, hot → ho<b>tter</b></li>
<li>Termina en -y: heavy → heav<b>ier</b>, funny → funn<b>ier</b></li>
<li>Adjetivo largo: <b>more</b> dangerous <b>than</b>, <b>more</b> beautiful <b>than</b></li></ul>
<p>An elephant is <b>bigger than</b> a mouse.</p>`
      },
      {
        title: "Superlativos (el más ...)",
        html: `<ul><li><b>the</b> + adjetivo<b>-est</b>: the tall<b>est</b>, the bi<b>ggest</b>, the heav<b>iest</b></li>
<li>Adjetivo largo: <b>the most</b> dangerous</li></ul>
<table><tr><th>Irregulares</th><th>Comparativo</th><th>Superlativo</th></tr>
<tr><td>good</td><td>better</td><td>the best</td></tr><tr><td>bad</td><td>worse</td><td>the worst</td></tr></table>`
      },
      {
        title: "Can para animales",
        html: `<ul><li>Dolphins <b>can</b> swim. · Penguins <b>can't</b> fly.</li><li><b>Can</b> a parrot talk? → <i>Yes, it can.</i></li></ul>`
      }
    ],
    exercises: [
      { t: "mc", q: "An elephant is ___ than a mouse.", o: ["bigger", "biggest", "more big"], e: "big → bigger (dobla la g)." },
      { t: "mc", q: "A giraffe is the ___ animal.", o: ["tallest", "taller", "most tall"], e: "the + -est." },
      { t: "mc", q: "A snake is ___ dangerous than a rabbit.", o: ["more", "most", "the"], e: "Adjetivo largo → more ... than." },
      { t: "mc", q: "The cheetah is the ___ animal on land.", o: ["fastest", "faster", "most fast"] },
      { t: "mc", q: "A whale is ___ than a dolphin.", o: ["heavier", "heavyer", "more heavy"], e: "-y → -ier." },
      { t: "mc", q: "good → better → ___", o: ["the best", "the goodest", "the better"] },
      { t: "mc", q: "bad → ___ → the worst", o: ["worse", "badder", "more bad"] },
      { t: "mc", q: "Penguins ___ fly, but they can swim.", o: ["can't", "can", "don't"] },
      { t: "mc", q: "___ a parrot talk? — Yes, it can.", o: ["Can", "Does", "Is"] },
      { t: "mc", q: "A tortoise is ___ than a horse.", o: ["slower", "slowest", "more slow"] },
      { t: "mc", q: "The blue whale is the ___ animal in the world.", o: ["biggest", "bigger", "most big"] },
      { t: "mc", q: "A lion is ___ than a cat.", o: ["stronger", "strongest", "more strong"] },
      { t: "order", s: "A tiger is stronger than a monkey" },
      { t: "order", s: "Can dolphins jump out of the water" },
      { t: "order", s: "The shark is the most dangerous fish" },
      { t: "write", q: "Compara con \"fast\": a lion / a tortoise", a: ["A lion is faster than a tortoise"] },
      { t: "write", q: "Traduce: Los monos pueden trepar árboles.", a: ["Monkeys can climb trees"] },
      { t: "write", q: "Superlativo de \"big\":", a: ["the biggest", "biggest"] }
    ],
    reading: {
      title: "The blue whale",
      text: "Blue whales are the biggest animals in the world. They are bigger than dinosaurs! A blue whale is heavier than 30 elephants. They live in the ocean and they can swim very far. Whales are not fish, they are mammals. They can't breathe under water, so they come up to breathe. Their babies drink milk. Sadly, blue whales are in danger.",
      questions: [
        ["Blue whales are bigger than dinosaurs.", true],
        ["A blue whale is lighter than an elephant.", false],
        ["Whales are fish.", false],
        ["Whales can breathe under water.", false],
        ["Baby whales drink milk.", true]
      ]
    }
  },
  // ------------------------------------------------------------------
  {
    id: "u7", term: 3, emoji: "🏰", color: "#a56644",
    title: "Long ago", sub: "El pasado · was / were",
    vocab: [
      ["yesterday", "ayer", "⏪"], ["last night", "anoche", "🌙"], ["last week", "la semana pasada", "📆"],
      ["last summer", "el verano pasado", "☀️"], ["ago", "hace (tiempo)", "⏳"], ["castle", "castillo", "🏰"],
      ["king", "rey", "🤴"], ["queen", "reina", "👸"], ["knight", "caballero", "🛡️"],
      ["dinosaur", "dinosaurio", "🦖"], ["village", "aldea / pueblo", "🏘️"], ["candle", "vela", "🕯️"],
      ["happy", "feliz", "😀"], ["sad", "triste", "😢"], ["tired", "cansado", "😫"],
      ["scared", "asustado", "😱"], ["bored", "aburrido", "🥱"], ["excited", "emocionado", "🤩"],
      ["angry", "enfadado", "😠"], ["born", "nacido", "👶"], ["famous", "famoso", "⭐"]
    ],
    grammar: [
      {
        title: "Was / were (era, estaba, fue)",
        html: `<table><tr><th></th><th>✅</th><th>❌</th><th>❓</th></tr>
<tr><td>I / He / She / It</td><td><b>was</b></td><td>wasn't</td><td>Was he...?</td></tr>
<tr><td>You / We / They</td><td><b>were</b></td><td>weren't</td><td>Were you...?</td></tr></table>
<p>Respuestas: <i>Yes, I was.</i> / <i>No, they weren't.</i></p>
<p>💡 is/am → <b>was</b> · are → <b>were</b></p>`
      },
      {
        title: "There was / There were (había)",
        html: `<ul><li><b>There was</b> a castle. (1 cosa)</li><li><b>There were</b> lots of dinosaurs. (varias)</li></ul>`
      },
      {
        title: "Expresiones de pasado",
        html: `<ul><li><b>yesterday</b> (ayer), <b>last</b> night / week / summer (pasado)</li>
<li>two days <b>ago</b> = hace dos días (¡ago va al FINAL!)</li>
<li>I <b>was born in</b> 2015. — Nací en 2015.</li></ul>`
      }
    ],
    exercises: [
      { t: "mc", q: "I ___ at home yesterday.", o: ["was", "were", "am"] },
      { t: "mc", q: "They ___ at the cinema last night.", o: ["were", "was", "are"] },
      { t: "mc", q: "She ___ tired, she was happy.", o: ["wasn't", "weren't", "isn't"] },
      { t: "mc", q: "___ you at school yesterday?", o: ["Were", "Was", "Are"] },
      { t: "mc", q: "Was the film good? — Yes, it ___.", o: ["was", "were", "did"] },
      { t: "mc", q: "There ___ a big castle here 500 years ago.", o: ["was", "were", "is"] },
      { t: "mc", q: "There ___ lots of dinosaurs millions of years ago.", o: ["were", "was", "are"] },
      { t: "mc", q: "I was born ___ 2015.", o: ["in", "on", "at"] },
      { t: "mc", q: "Today I am happy. Yesterday I ___ sad.", o: ["was", "were", "am"] },
      { t: "mc", q: "We ___ scared of the storm last night.", o: ["were", "was", "are"] },
      { t: "mc", q: "\"Hace dos días\" es...", o: ["two days ago", "ago two days", "two days last"], e: "ago va al final." },
      { t: "mc", q: "\"El verano pasado\" es...", o: ["last summer", "summer last", "ago summer"] },
      { t: "order", s: "Where were you last Saturday" },
      { t: "order", s: "The king was very rich and famous" },
      { t: "order", s: "There were no cars two hundred years ago" },
      { t: "write", q: "Pon en pasado: I am bored.", a: ["I was bored"] },
      { t: "write", q: "Pon en pasado: They are excited.", a: ["They were excited"] },
      { t: "write", q: "Traduce: ¿Estabas asustado?", a: ["Were you scared"] }
    ],
    reading: {
      title: "The castle baby",
      text: "Five hundred years ago there was a small village next to a big castle. In the castle there was a king and a queen. The king was rich but he wasn't happy. There weren't any children in the castle and the king and queen were sad. One day there was a baby at the castle door! Everyone was very excited. The baby was a girl and her name was Rose.",
      questions: [
        ["The village was next to a castle.", true],
        ["The king was poor.", false],
        ["The king was happy.", false],
        ["There was a baby at the door.", true],
        ["The baby was a boy.", false]
      ]
    }
  },
  // ------------------------------------------------------------------
  {
    id: "u8", term: 3, emoji: "📸", color: "#00cd9c",
    title: "What did you do?", sub: "Past simple · verbos irregulares",
    vocab: [
      ["played", "jugué / jugó", "⚽", "play"], ["watched", "vi / vio (la tele)", "📺", "watch"],
      ["visited", "visité / visitó", "🏛️", "visit"], ["walked", "caminé / caminó", "🚶", "walk"],
      ["studied", "estudié / estudió", "📖", "study"], ["went", "fui / fue", "🚀", "go"],
      ["had", "tuve / tuvo", "🎁", "have"], ["ate", "comí / comió", "🍕", "eat"],
      ["saw", "vi / vio", "👀", "see"], ["bought", "compré / compró", "🛍️", "buy"],
      ["made", "hice / hizo (fabricar)", "🎂", "make"], ["came", "vine / vino", "🏃", "come"],
      ["got", "conseguí / consiguió", "🏆", "get"], ["swam", "nadé / nadó", "🏊", "swim"],
      ["wrote", "escribí / escribió", "✍️", "write"], ["drank", "bebí / bebió", "🥤", "drink"],
      ["took", "cogí / tomé", "📷", "take"], ["did", "hice / hizo", "✅", "do"],
      ["ran", "corrí / corrió", "🏃", "run"], ["slept", "dormí / durmió", "😴", "sleep"]
    ],
    grammar: [
      {
        title: "Past simple: verbos regulares",
        html: `<p>Añade <b>-ed</b>: play → play<b>ed</b>, watch → watch<b>ed</b>. ¡Es igual para todas las personas!</p>
<ul><li>Termina en -e → solo <b>-d</b>: dance → danc<b>ed</b></li>
<li>Consonante + y → <b>-ied</b>: study → stud<b>ied</b></li>
<li>Vocal + consonante corta → dobla: stop → sto<b>pped</b></li></ul>`
      },
      {
        title: "Verbos irregulares (¡a memorizar!)",
        html: `<table><tr><th>Presente</th><th>Pasado</th><th></th></tr>
<tr><td>go</td><td><b>went</b></td><td>ir</td></tr><tr><td>have</td><td><b>had</b></td><td>tener</td></tr>
<tr><td>eat</td><td><b>ate</b></td><td>comer</td></tr><tr><td>see</td><td><b>saw</b></td><td>ver</td></tr>
<tr><td>buy</td><td><b>bought</b></td><td>comprar</td></tr><tr><td>make</td><td><b>made</b></td><td>hacer</td></tr>
<tr><td>do</td><td><b>did</b></td><td>hacer</td></tr><tr><td>come</td><td><b>came</b></td><td>venir</td></tr>
<tr><td>take</td><td><b>took</b></td><td>coger</td></tr><tr><td>swim</td><td><b>swam</b></td><td>nadar</td></tr>
<tr><td>write</td><td><b>wrote</b></td><td>escribir</td></tr><tr><td>drink</td><td><b>drank</b></td><td>beber</td></tr></table>`
      },
      {
        title: "Negativa y pregunta: DID",
        html: `<ul><li>❌ I <b>didn't</b> + verbo normal: I didn't <b>go</b> (¡NO "didn't went"!)</li>
<li>❓ <b>Did</b> you + verbo normal...? Did you <b>see</b> it? → <i>Yes, I did.</i> / <i>No, I didn't.</i></li>
<li>What <b>did</b> you <b>do</b> yesterday?</li></ul>`
      }
    ],
    exercises: [
      { t: "mc", q: "Yesterday I ___ football.", o: ["played", "play", "plaied"] },
      { t: "mc", q: "We ___ to the beach last summer.", o: ["went", "goed", "go"], e: "go → went (irregular)." },
      { t: "mc", q: "She ___ a pizza last night.", o: ["ate", "eated", "eat"] },
      { t: "mc", q: "I didn't ___ my homework.", o: ["do", "did", "done"], e: "Después de didn't, el verbo va normal." },
      { t: "mc", q: "___ you see the film? — Yes, I did.", o: ["Did", "Do", "Were"] },
      { t: "mc", q: "Did they win? — No, they ___.", o: ["didn't", "don't", "weren't"] },
      { t: "mc", q: "study → ___", o: ["studied", "studyed", "studed"] },
      { t: "mc", q: "He ___ a new bike last week.", o: ["bought", "buyed", "buy"] },
      { t: "mc", q: "What ___ you do last weekend?", o: ["did", "do", "were"] },
      { t: "mc", q: "My mum ___ a cake for my birthday.", o: ["made", "maked", "make"] },
      { t: "mc", q: "We ___ lots of photos.", o: ["took", "taked", "take"] },
      { t: "mc", q: "Last night I ___ TV.", o: ["watched", "watch", "watcht"] },
      { t: "order", s: "We visited our grandparents last Sunday" },
      { t: "order", s: "Did you have a good time" },
      { t: "order", s: "I did not eat vegetables yesterday" },
      { t: "write", q: "Pon en pasado: I go to the park.", a: ["I went to the park"] },
      { t: "write", q: "Pon en negativa: She saw a lion.", a: ["She didn't see a lion"] },
      { t: "write", q: "Traduce: ¿Qué hiciste ayer?", a: ["What did you do yesterday"] }
    ],
    reading: {
      title: "A weekend in London",
      text: "Last weekend Pablo went to London with his family. On Saturday they visited the Tower of London and they saw the Crown Jewels. They had lunch in a small café and Pablo ate fish and chips. In the afternoon they walked in Hyde Park. On Sunday it rained, so they went to the Natural History Museum. Pablo loved the dinosaurs! He bought a T-rex toy for his little sister.",
      questions: [
        ["Pablo went to London alone.", false],
        ["They saw the Crown Jewels.", true],
        ["Pablo ate pizza.", false],
        ["It rained on Sunday.", true],
        ["He bought a toy for his brother.", false]
      ]
    }
  },
  // ------------------------------------------------------------------
  {
    id: "u9", term: 3, emoji: "✈️", color: "#1cb0f6",
    title: "Holiday plans", sub: "Tiempo, viajes · be going to",
    vocab: [
      ["sunny", "soleado", "☀️"], ["rainy", "lluvioso", "🌧️"], ["cloudy", "nublado", "☁️"],
      ["windy", "ventoso", "🌬️"], ["snowy", "nevado", "❄️"], ["hot", "caluroso", "🥵"],
      ["cold", "frío", "🥶"], ["plane", "avión", "✈️"], ["train", "tren", "🚆"],
      ["boat", "barco", "⛵"], ["car", "coche", "🚗"], ["bus", "autobús", "🚌"],
      ["suitcase", "maleta", "🧳"], ["passport", "pasaporte", "🛂"], ["beach", "playa", "🏖️"],
      ["mountains", "montañas", "⛰️"], ["tent", "tienda de campaña", "⛺"], ["sunglasses", "gafas de sol", "🕶️"],
      ["sun cream", "crema solar", "🧴"], ["map", "mapa", "🗺️"], ["camera", "cámara", "📷"],
      ["next week", "la semana que viene", "⏩"]
    ],
    grammar: [
      {
        title: "Be going to (planes de futuro)",
        html: `<p><b>am / is / are + going to</b> + verbo</p>
<ul><li>I<b>'m going to</b> visit my grandma. — Voy a visitar a mi abuela.</li>
<li>She <b>isn't going to</b> swim. — Ella no va a nadar.</li>
<li><b>Are</b> you <b>going to</b> take a camera? → <i>Yes, I am.</i> / <i>No, I'm not.</i></li></ul>
<p>Palabras pista: <b>tomorrow, next week, next summer, this weekend</b></p>`
      },
      {
        title: "El tiempo (weather)",
        html: `<p><b>What's the weather like?</b> — ¿Qué tiempo hace?</p>
<ul><li><b>It's</b> sunny / rainy / cloudy / windy / snowy.</li><li><b>It's</b> hot / cold.</li></ul>
<p>💡 sun → sunn<b>y</b>, rain → rain<b>y</b>, cloud → cloud<b>y</b></p>`
      },
      {
        title: "Medios de transporte",
        html: `<ul><li><b>by</b> plane / train / car / bus / boat</li><li>¡Ojo! A pie = <b>on foot</b></li></ul>`
      }
    ],
    exercises: [
      { t: "mc", q: "I ___ going to visit my grandma tomorrow.", o: ["am", "is", "are"] },
      { t: "mc", q: "They are going ___ travel by plane.", o: ["to", "for", "at"] },
      { t: "mc", q: "She ___ going to swim, the water is cold.", o: ["isn't", "aren't", "doesn't"] },
      { t: "mc", q: "___ you going to take a camera?", o: ["Are", "Do", "Is"] },
      { t: "mc", q: "Is he going to fly? — No, he ___.", o: ["isn't", "doesn't", "not"] },
      { t: "mc", q: "Next summer we ___ go to the mountains.", o: ["are going to", "going to", "are go to"] },
      { t: "mc", q: "What's the weather like? — ___", o: ["It's rainy.", "It rainy.", "Is rainy."] },
      { t: "mc", q: "We go to school ___ bus.", o: ["by", "in", "with"] },
      { t: "mc", q: "I walk to school. I go ___ foot.", o: ["on", "by", "in"] },
      { t: "mc", q: "It's sunny. Don't forget your ___!", o: ["sunglasses", "gloves", "scarf"] },
      { t: "mc", q: "It's snowy and ___.", o: ["cold", "hot", "sunny"] },
      { t: "mc", q: "\"La semana que viene\" es...", o: ["next week", "last week", "week next"] },
      { t: "order", s: "We are going to sleep in a tent" },
      { t: "order", s: "What are you going to do next summer" },
      { t: "order", s: "It is very windy today" },
      { t: "write", q: "Traduce: Voy a viajar en tren.", a: ["I am going to travel by train"] },
      { t: "write", q: "Pon en negativa: He is going to play.", a: ["He isn't going to play"] },
      { t: "write", q: "Traduce: Hace sol y calor.", a: ["It is sunny and hot", "It is hot and sunny"] }
    ],
    reading: {
      title: "Daniel's summer",
      text: "Hi, I'm Daniel. Next summer my family and I are going to go to Scotland. We are going to travel by plane and then by car. We are going to stay in a tent near a lake. The weather in Scotland is often rainy and windy, so I'm going to take my boots and a raincoat. We are going to visit a castle and look for the Loch Ness Monster!",
      questions: [
        ["Daniel is going to go to Ireland.", false],
        ["They are going to travel by plane.", true],
        ["They are going to stay in a hotel.", false],
        ["The weather in Scotland is often rainy.", true],
        ["They are going to visit a castle.", true]
      ]
    }
  }
];
