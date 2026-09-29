/* =====================================================================
   English Fox — piezas visuales: mascota Foxy e iconos SVG
   ===================================================================== */

// Foxy, la mascota. mood: happy · cheer · think · sad · wow
function fox(mood = "happy", size = 80, cls = "") {
  const dark = "#2d2a32";
  let eyes, mouth, brows = "";
  if (mood === "cheer") {
    eyes = `<path d="M37 57 Q44 48 51 57" stroke="${dark}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            <path d="M69 57 Q76 48 83 57" stroke="${dark}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
    mouth = `<path d="M49 84 Q60 99 71 84 Z" fill="#7a2c1d"/><path d="M54 90 Q60 96 66 90 Q60 87 54 90Z" fill="#ff7a8a"/>`;
  } else if (mood === "sad") {
    eyes = `<ellipse cx="44" cy="58" rx="5.5" ry="6.5" fill="${dark}"/><ellipse cx="76" cy="58" rx="5.5" ry="6.5" fill="${dark}"/>
            <circle cx="45.5" cy="56" r="1.8" fill="#fff"/><circle cx="77.5" cy="56" r="1.8" fill="#fff"/>`;
    brows = `<path d="M36 50 Q43 49 51 44" stroke="${dark}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M84 50 Q77 49 69 44" stroke="${dark}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    mouth = `<path d="M53 89 Q60 84 67 89" stroke="${dark}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  } else if (mood === "wow") {
    eyes = `<circle cx="44" cy="57" r="8" fill="#fff"/><circle cx="76" cy="57" r="8" fill="#fff"/>
            <circle cx="44" cy="58" r="5.5" fill="${dark}"/><circle cx="76" cy="58" r="5.5" fill="${dark}"/>
            <circle cx="46" cy="55.5" r="2" fill="#fff"/><circle cx="78" cy="55.5" r="2" fill="#fff"/>`;
    mouth = `<ellipse cx="60" cy="88" rx="5" ry="6" fill="#7a2c1d"/>`;
  } else if (mood === "think") {
    eyes = `<ellipse cx="44" cy="56" rx="5.5" ry="7" fill="${dark}"/><ellipse cx="76" cy="56" rx="5.5" ry="7" fill="${dark}"/>
            <circle cx="46" cy="53" r="2" fill="#fff"/><circle cx="78" cy="53" r="2" fill="#fff"/>`;
    brows = `<path d="M37 45 Q44 41 51 45" stroke="${dark}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    mouth = `<path d="M54 87 L67 85" stroke="${dark}" stroke-width="3.5" stroke-linecap="round"/>`;
  } else {
    eyes = `<ellipse cx="44" cy="57" rx="5.5" ry="7" fill="${dark}"/><ellipse cx="76" cy="57" rx="5.5" ry="7" fill="${dark}"/>
            <circle cx="46" cy="54" r="2" fill="#fff"/><circle cx="78" cy="54" r="2" fill="#fff"/>`;
    mouth = `<path d="M51 84 Q60 92 69 84" stroke="${dark}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  }
  return `<svg class="fox ${cls}" width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
    <ellipse cx="60" cy="112" rx="30" ry="5" fill="#000" opacity=".08"/>
    <path d="M20 50 L24 8 L54 32 Z" fill="#ff8a1f"/><path d="M27 40 L29 18 L45 31 Z" fill="#ffd3b0"/>
    <path d="M100 50 L96 8 L66 32 Z" fill="#ff8a1f"/><path d="M93 40 L91 18 L75 31 Z" fill="#ffd3b0"/>
    <path d="M60 22 C30 22 15 44 17 68 C19 94 40 106 60 106 C80 106 101 94 103 68 C105 44 90 22 60 22Z" fill="#ff8a1f"/>
    <path d="M60 22 C48 22 38 26 31 33 C42 30 52 34 60 42 C68 34 78 30 89 33 C82 26 72 22 60 22Z" fill="#ff9d3f"/>
    <path d="M60 66 C47 66 32 70 26 78 C31 97 47 106 60 106 C73 106 89 97 94 78 C88 70 73 66 60 66Z" fill="#fff"/>
    <circle cx="33" cy="75" r="6" fill="#ff6b6b" opacity=".28"/><circle cx="87" cy="75" r="6" fill="#ff6b6b" opacity=".28"/>
    ${brows}${eyes}
    <ellipse cx="60" cy="75" rx="7.5" ry="5.5" fill="${dark}"/><ellipse cx="58" cy="73.5" rx="2.5" ry="1.5" fill="#fff" opacity=".6"/>
    ${mouth}
  </svg>`;
}

// Iconos (trazo, estilo redondeado)
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  book: '<path d="M2 4.5h6a4 4 0 0 1 4 4V21a3 3 0 0 0-3-3H2z"/><path d="M22 4.5h-6a4 4 0 0 0-4 4V21a3 3 0 0 1 3-3h7z"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10"/>',
  users: '<circle cx="9" cy="7.5" r="3.5"/><path d="M2.5 20.5v-1A4.5 4.5 0 0 1 7 15h4a4.5 4.5 0 0 1 4.5 4.5v1"/><path d="M16 4.3a3.5 3.5 0 0 1 0 6.4M18.5 15.3a4.5 4.5 0 0 1 3 4.2v1"/>',
  speaker: '<path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chat: '<path d="M20 15a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  bulb: '<path d="M9 18h6M10 21.5h4"/><path d="M12 2.5a6.5 6.5 0 0 0-4 11.6V16h8v-1.9a6.5 6.5 0 0 0-4-11.6z"/>',
  pencil: '<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-4-4L4 16z"/><path d="M14 6l4 4"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  back: '<path d="m15 6-6 6 6 6"/>',
  turtle: '<path d="M4 15c0-4 3.5-7 8-7s8 3 8 7z"/><path d="M20 13h1.5a1.5 1.5 0 0 1 0 3H20M6 15v2.5M17 15v2.5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17.5v.01"/>',
  bandage: '<rect x="2.5" y="8" width="19" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="M10.5 10.5h.01M13.5 13.5h.01M10.5 13.5h.01M13.5 10.5h.01"/>',
  flame: '<path d="M12 2.5c.9 3.6 5.5 5.7 5.5 11a5.5 5.5 0 0 1-11 0c0-2.3 1-3.9 2.3-5 .1 2 1 3.1 2.2 3.3-.4-3.3-.3-6.3 1-9.3z" fill="currentColor" stroke="none"/>',
  star: '<path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" fill="currentColor" stroke="none"/>',
  grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
  heart: '<path d="M12 20.5s-7.6-4.6-9.4-9.3C1.2 7.5 3.5 4 7.1 4c2 0 3.5 1.1 4.9 2.9C13.4 5.1 14.9 4 16.9 4c3.6 0 5.9 3.5 4.5 7.2-1.8 4.7-9.4 9.3-9.4 9.3z" fill="currentColor" stroke="none"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'
};
function icon(name, size = 24, sw = 2.2) {
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}
