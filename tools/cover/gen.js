const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 630;

function frame(label, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0.85" y2="1">
<stop offset="0" stop-color="#0c0e13"/>
<stop offset="0.45" stop-color="#121722"/>
<stop offset="1" stop-color="#0a1219"/>
</linearGradient>
<linearGradient id="bar" x1="0" y1="1" x2="0" y2="0">
<stop offset="0" stop-color="#1c4a63"/>
<stop offset="0.55" stop-color="#38a29c"/>
<stop offset="1" stop-color="#5eead4"/>
</linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
<stop offset="0" stop-color="#5eead4" stop-opacity="0.18"/>
<stop offset="0.6" stop-color="#4aa8ff" stop-opacity="0.07"/>
<stop offset="1" stop-color="#4aa8ff" stop-opacity="0"/>
</radialGradient>
<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
<path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
</pattern>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#grid)"/>
<ellipse cx="740" cy="300" rx="430" ry="320" fill="url(#glow)"/>
${body}
<text x="72" y="562" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="13" letter-spacing="4" fill="#68758a">${label}</text>
<text x="1128" y="562" text-anchor="end" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="13" letter-spacing="6" fill="#4e5867">BOOM</text>
</svg>`;
}

/* ---------- 1. 排序算法：递增柱阵 ---------- */
function sorting() {
  const hs = [36, 58, 84, 114, 148, 186, 228, 274, 324, 378, 434, 492];
  const bw = 40;
  const gp = 26;
  const totalW = hs.length * (bw + gp) - gp;
  const x0 = 1128 - totalW;
  const baseY = 520;
  let bars = '';
  hs.forEach((h, i) => {
    const x = x0 + i * (bw + gp);
    const op = (0.38 + i * 0.052).toFixed(2);
    bars += `<rect x="${x}" y="${baseY - h}" width="${bw}" height="${h}" rx="6" fill="url(#bar)" fill-opacity="${op}"/>`;
  });
  return frame(
    'ALGORITHM',
    `<line x1="${x0 - 28}" y1="${baseY + 4}" x2="1136" y2="${baseY + 4}" stroke="#ffffff" stroke-opacity="0.10"/>
${bars}`
  );
}

/* ---------- 2. 寻路算法：网格与路径 ---------- */
function pathFinding() {
  const cols = 18;
  const rows = 9;
  const gx = 360;
  const gy = 165;
  const dx = 42;
  const dy = 33;
  let dots = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots += `<circle cx="${gx + c * dx}" cy="${gy + r * dy}" r="3" fill="#ffffff" fill-opacity="0.20"/>`;
    }
  }
  const route = [
    [0, 0], [2, 0], [2, 2], [5, 2], [5, 4], [8, 4], [8, 3],
    [11, 3], [11, 5], [13, 5], [13, 7], [17, 7]
  ];
  const pts = route.map(([c, r]) => [gx + c * dx, gy + r * dy]);
  const poly = pts.map(([x, y]) => `${x},${y}`).join(' ');
  let cells = '';
  for (const [x, y] of pts) {
    cells += `<rect x="${x - 13}" y="${y - 13}" width="26" height="26" rx="5" fill="#5eead4" fill-opacity="0.15"/>`;
  }
  const s = pts[0];
  const e = pts[pts.length - 1];
  return frame(
    'PATH FINDING',
    `${dots}
${cells}
<polyline points="${poly}" fill="none" stroke="#5eead4" stroke-opacity="0.13" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
<polyline points="${poly}" fill="none" stroke="#5eead4" stroke-opacity="0.9" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="${s[0]}" cy="${s[1]}" r="8" fill="#34d399"/>
<circle cx="${s[0]}" cy="${s[1]}" r="15" fill="none" stroke="#34d399" stroke-opacity="0.38" stroke-width="2"/>
<circle cx="${e[0]}" cy="${e[1]}" r="8" fill="#fb923c"/>
<circle cx="${e[0]}" cy="${e[1]}" r="15" fill="none" stroke="#fb923c" stroke-opacity="0.38" stroke-width="2"/>`
  );
}

/* ---------- 3. AI 名词：网络收敛为链 ---------- */
function aiNames() {
  const layers = [
    { x: 470, ys: [210, 270, 330, 390, 450] },
    { x: 590, ys: [210, 270, 330, 390, 450] },
    { x: 710, ys: [240, 330, 420] }
  ];
  let links = '';
  for (let l = 0; l < layers.length - 1; l++) {
    for (const y1 of layers[l].ys) {
      for (const y2 of layers[l + 1].ys) {
        links += `<line x1="${layers[l].x}" y1="${y1}" x2="${layers[l + 1].x}" y2="${y2}" stroke="#4aa8ff" stroke-opacity="0.14" stroke-width="1"/>`;
      }
    }
  }
  let nodes = '';
  for (const l of layers) {
    for (const y of l.ys) {
      nodes += `<circle cx="${l.x}" cy="${y}" r="5.5" fill="#4aa8ff" fill-opacity="0.88"/>`;
    }
  }
  const chain = [180, 300, 420];
  const bx = 830;
  const bw = 210;
  let boxes = '';
  chain.forEach((y) => {
    boxes += `<rect x="${bx}" y="${y}" width="${bw}" height="56" rx="11" fill="#5eead4" fill-opacity="0.07" stroke="#5eead4" stroke-opacity="0.5" stroke-width="1.4"/>`;
    boxes += `<line x1="${bx + 22}" y1="${y + 22}" x2="${bx + 148}" y2="${y + 22}" stroke="#5eead4" stroke-opacity="0.35" stroke-width="3" stroke-linecap="round"/>`;
    boxes += `<line x1="${bx + 22}" y1="${y + 36}" x2="${bx + 100}" y2="${y + 36}" stroke="#ffffff" stroke-opacity="0.16" stroke-width="3" stroke-linecap="round"/>`;
  });
  const cx = bx + bw / 2;
  boxes += `<line x1="${cx}" y1="236" x2="${cx}" y2="300" stroke="#5eead4" stroke-opacity="0.28" stroke-width="1.5"/>`;
  boxes += `<line x1="${cx}" y1="356" x2="${cx}" y2="420" stroke="#5eead4" stroke-opacity="0.28" stroke-width="1.5"/>`;
  const midY = 328;
  return frame(
    'AI CONCEPTS',
    `${links}
${nodes}
<line x1="756" y1="${midY}" x2="800" y2="${midY}" stroke="#5eead4" stroke-opacity="0.6" stroke-width="2"/>
<path d="M 800 ${midY - 7} L 814 ${midY} L 800 ${midY + 7} Z" fill="#5eead4" fill-opacity="0.75"/>
${boxes}`
  );
}

/* ---------- 4. RoughAgent：三栏桌面 ---------- */
function roughAgent() {
  const x = 420;
  const y = 95;
  const w = 640;
  const h = 440;
  let ui = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#191e28" fill-opacity="0.96" stroke="#ffffff" stroke-opacity="0.12"/>`;
  ui += `<line x1="${x}" y1="${y + 42}" x2="${x + w}" y2="${y + 42}" stroke="#ffffff" stroke-opacity="0.08"/>`;
  for (let i = 0; i < 3; i++) {
    ui += `<circle cx="${x + 24 + i * 18}" cy="${y + 21}" r="4" fill="#38424f"/>`;
  }
  // 左栏
  const split1 = x + 150;
  ui += `<line x1="${split1}" y1="${y + 42}" x2="${split1}" y2="${y + h}" stroke="#ffffff" stroke-opacity="0.07"/>`;
  for (let i = 0; i < 8; i++) {
    const isFirst = i === 0;
    ui += `<rect x="${x + 16}" y="${y + 62 + i * 25}" width="118" height="11" rx="4" fill="${isFirst ? '#5eead4' : '#ffffff'}" fill-opacity="${isFirst ? 0.38 : 0.075}"/>`;
  }
  // 右栏
  const split2 = x + 500;
  ui += `<line x1="${split2}" y1="${y + 42}" x2="${split2}" y2="${y + h}" stroke="#ffffff" stroke-opacity="0.07"/>`;
  for (let i = 0; i < 4; i++) {
    ui += `<rect x="${x + 512}" y="${y + 64 + i * 17}" width="104" height="7" rx="3.5" fill="#ffffff" fill-opacity="0.12"/>`;
  }
  ui += `<circle cx="${x + 562}" cy="${y + 258}" r="34" fill="none" stroke="#5eead4" stroke-opacity="0.45" stroke-width="4" stroke-dasharray="140 74" transform="rotate(-90 ${x + 562} ${y + 258})"/>`;
  for (let i = 0; i < 2; i++) {
    ui += `<rect x="${x + 512}" y="${y + 372 + i * 20}" width="88" height="7" rx="3.5" fill="#ffffff" fill-opacity="0.10"/>`;
  }
  // 中栏对话
  ui += `<rect x="${x + 172}" y="${y + 62}" width="230" height="48" rx="12" fill="#5eead4" fill-opacity="0.15"/>`;
  ui += `<rect x="${x + 250}" y="${y + 122}" width="162" height="42" rx="12" fill="#ffffff" fill-opacity="0.07"/>`;
  ui += `<rect x="${x + 172}" y="${y + 178}" width="196" height="44" rx="12" fill="#5eead4" fill-opacity="0.10"/>`;
  ui += `<rect x="${x + 268}" y="${y + 236}" width="144" height="38" rx="12" fill="#ffffff" fill-opacity="0.06"/>`;
  ui += `<rect x="${x + 172}" y="${y + 356}" width="306" height="36" rx="9" fill="none" stroke="#ffffff" stroke-opacity="0.11"/>`;
  return frame('DESKTOP AGENT', ui);
}

/* ---------- 5. RoughEngine：透视地面与线框体 ---------- */
function roughEngine() {
  const vx = 740;
  let floor = '';
  for (let i = 0; i < 6; i++) {
    const yy = 350 + i * 38;
    const half = 130 + i * 78;
    floor += `<line x1="${vx - half}" y1="${yy}" x2="${vx + half}" y2="${yy}" stroke="#5eead4" stroke-opacity="${(0.26 - i * 0.03).toFixed(2)}" stroke-width="1.2"/>`;
  }
  for (let i = -5; i <= 5; i++) {
    floor += `<line x1="${vx + i * 118}" y1="562" x2="${vx + i * 18}" y2="350" stroke="#5eead4" stroke-opacity="0.15" stroke-width="1"/>`;
  }
  const cube = `
<path d="M 660 206 L 740 166 L 820 206 L 740 246 Z" fill="#5eead4" fill-opacity="0.10" stroke="#5eead4" stroke-opacity="0.62" stroke-width="1.6"/>
<path d="M 660 206 L 660 308 L 740 348 L 740 246 Z" fill="#4aa8ff" fill-opacity="0.05" stroke="#5eead4" stroke-opacity="0.50" stroke-width="1.6"/>
<path d="M 820 206 L 820 308 L 740 348 L 740 246 Z" fill="#5eead4" fill-opacity="0.04" stroke="#5eead4" stroke-opacity="0.50" stroke-width="1.6"/>`;
  const verts = [[660, 206], [740, 166], [820, 206], [740, 246], [660, 308], [820, 308], [740, 348]];
  let dots = '';
  for (const [px, py] of verts) {
    dots += `<circle cx="${px}" cy="${py}" r="3.2" fill="#5eead4" fill-opacity="0.85"/>`;
  }
  const axes = `
<line x1="740" y1="348" x2="824" y2="384" stroke="#fb923c" stroke-opacity="0.55" stroke-width="1.6"/>
<line x1="740" y1="348" x2="656" y2="384" stroke="#34d399" stroke-opacity="0.55" stroke-width="1.6"/>
<line x1="740" y1="348" x2="740" y2="410" stroke="#4aa8ff" stroke-opacity="0.55" stroke-width="1.6"/>`;
  return frame('GAME ENGINE', `${floor}${cube}${dots}${axes}`);
}

/* ---------- 6. 手搓 vs 智能：抖动笔画收敛为规整方波 ---------- */
function handmadeVsAi() {
  const y0 = 315;
  const xa = 372;
  const xb = 908;
  let seed = 20261110;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  const pts = [];
  // 手搓段：振幅与毛刺逐渐收敛
  for (let x = xa; x <= 600; x += 10) {
    const t = (x - xa) / 228;
    const amp = 30 * (1 - t * 0.62);
    const y = y0 + Math.sin((x - xa) / 24) * amp + (rnd() - 0.5) * 12 * (1 - t);
    pts.push([x, y]);
  }
  // 机器段：严格等宽方波
  const step = 44;
  const hi = y0 - 28;
  const lo = y0 + 28;
  for (let x = 600, i = 0; x <= xb - step; x += step, i++) {
    const y = i % 2 === 0 ? hi : lo;
    pts.push([x, y]);
    pts.push([x + step / 2, y]);
    pts.push([x + step / 2, i % 2 === 0 ? lo : hi]);
  }
  pts.push([xb, y0 + 28]);

  const poly = pts.map(([x, y]) => `${x},${y}`).join(' ');

  // 左侧手写毛边，右侧规整短条
  let scratch = '';
  for (let i = 0; i < 4; i++) {
    const sx = 392 + i * 46;
    const tilt = (rnd() - 0.5) * 5;
    scratch += `<line x1="${sx}" y1="${400 + tilt}" x2="${sx + 30}" y2="${404 - tilt}" stroke="#fb923c" stroke-opacity="${(0.30 - i * 0.05).toFixed(2)}" stroke-width="2.4" stroke-linecap="round"/>`;
  }
  let neat = '';
  for (let i = 0; i < 4; i++) {
    neat += `<rect x="${762 + i * 38}" y="398" width="26" height="9" rx="4" fill="#5eead4" fill-opacity="${(0.34 - i * 0.05).toFixed(2)}"/>`;
  }

  const extraDefs = `<defs>
<linearGradient id="ink" x1="0" y1="0" x2="1" y2="0">
<stop offset="0" stop-color="#fb923c" stop-opacity="0.95"/>
<stop offset="0.34" stop-color="#f0b45c" stop-opacity="0.9"/>
<stop offset="0.52" stop-color="#5eead4" stop-opacity="0.92"/>
<stop offset="1" stop-color="#5eead4" stop-opacity="1"/>
</linearGradient>
</defs>`;

  return frame(
    'HANDMADE / AI',
    `${extraDefs}
<g transform="translate(96,0)">
<line x1="${xa - 34}" y1="${y0}" x2="${xb + 34}" y2="${y0}" stroke="#ffffff" stroke-opacity="0.05"/>
<polyline points="${poly}" fill="none" stroke="url(#ink)" stroke-opacity="0.14" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
<polyline points="${poly}" fill="none" stroke="url(#ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="${xa}" cy="${y0 + Math.sin(0) * 30}" r="7" fill="#fb923c"/>
<circle cx="${xa}" cy="${y0 + Math.sin(0) * 30}" r="15" fill="none" stroke="#fb923c" stroke-opacity="0.34" stroke-width="2"/>
<circle cx="${xb}" cy="${y0 + 28}" r="7" fill="#5eead4"/>
<circle cx="${xb}" cy="${y0 + 28}" r="15" fill="none" stroke="#5eead4" stroke-opacity="0.34" stroke-width="2"/>
${scratch}
${neat}
</g>`
  );
}

const jobs = [
  ['sorting', sorting()],
  ['path', pathFinding()],
  ['ai', aiNames()],
  ['agent', roughAgent()],
  ['engine', roughEngine()],
  ['handmade', handmadeVsAi()]
];

for (const [name, svg] of jobs) {
  fs.writeFileSync(path.join(OUT, name + '.svg'), svg, 'utf8');
  console.log('written', name + '.svg');
}
