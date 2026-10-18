/* ============================================================
   MONTHSARY — script.js  (home page + wheel.html + letter.html)
   ============================================================ */

/* ============================================================
   WHEEL PAGE (wheel.html)
   Change what's on the wheel by editing PRIZES below.
   (3–8 prizes look best. Each one gets an equal slice.)
   ============================================================ */
(function initWheelPage() {
  if (!document.getElementById('wheel')) return;

const PRIZES = [
  { label: 'Movie night, my pick', note: 'Blankets, snacks, and a film just for us.',   emoji: '🎬', c1: '#ff9db3', c2: '#ff6a89' },
  { label: 'Dinner anywhere',      note: 'Name the place. We are going.',               emoji: '🍽️', c1: '#ffbb5e', c2: '#e98a2d' },
  { label: 'Breakfast in bed',     note: 'Stay under the covers. Breakfast comes to you.', emoji: '🥞', c1: '#fbdc7f', c2: '#dfb24b' },
  { label: 'A long walk',          note: 'Just us, no phones, no rush.',                emoji: '🌿', c1: '#63d3a8', c2: '#3fae88' },
  { label: 'One free kiss',        note: 'Redeemable anytime. Starting now.',           emoji: '💋', c1: '#79bfff', c2: '#3f9af0' },
  { label: 'I do the dishes',      note: 'Tonight, the sink is all mine.',              emoji: '🧽', c1: '#bfa3ff', c2: '#9a78ee' },
];

const TAU = Math.PI * 2;
const mod = (a, m) => ((a % m) + m) % m;
const $   = id => document.getElementById(id);

const canvas = $('wheel');
const ctx    = canvas.getContext('2d');
const btn    = $('spin-btn');
const dialog = $('result');
const pin    = $('wheel-pin');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let rotation = 0;      // current wheel rotation, in degrees (clockwise)
let spinning = false;

/* ------------------------------------------------------------
   Drawing
   ------------------------------------------------------------ */
function disc(r, fill) {
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, TAU);
  ctx.fillStyle = fill;
  ctx.fill();
}

// Fit a label to the available length; fall back to two lines if one line gets too small
function layoutLabel(text, maxLen, maxFont, minFont) {
  const fit = lines => {
    ctx.font = `700 ${maxFont}px "DM Sans", sans-serif`;
    const widest = Math.max(...lines.map(l => ctx.measureText(l).width));
    return Math.min(maxFont, maxFont * maxLen / widest);
  };

  let lines = [text];
  let size  = fit(lines);

  if (size < maxFont * 0.8 && text.includes(' ')) {
    const words = text.split(' ');
    let best = null;
    for (let i = 1; i < words.length; i++) {
      const candidate = [words.slice(0, i).join(' '), words.slice(i).join(' ')];
      const s = fit(candidate);
      if (!best || s > best.size) best = { lines: candidate, size: s };
    }
    if (best && best.size > size * 1.1) {
      lines = best.lines;
      size  = Math.min(best.size, maxFont * 0.92);
    }
  }
  return { lines, size: Math.max(size, minFont) };
}

function draw() {
  const cssSize = canvas.clientWidth;
  if (!cssSize) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const px  = Math.round(cssSize * dpr);
  if (canvas.width !== px) { canvas.width = px; canvas.height = px; }

  const R     = px / 2;
  const n     = PRIZES.length;
  const step  = TAU / n;
  const rSeg  = R * 0.86;

  ctx.clearRect(0, 0, px, px);
  ctx.save();
  ctx.translate(R, R);

  // Crimson rim
  const rim = ctx.createLinearGradient(-R, -R, R, R);
  rim.addColorStop(0, '#b8294f');
  rim.addColorStop(1, '#870d30');
  disc(R, rim);

  // Pale inner ring
  const ring = ctx.createLinearGradient(-R, -R, R, R);
  ring.addColorStop(0, '#f7e8ec');
  ring.addColorStop(1, '#ebd0d8');
  disc(R * 0.915, ring);

  // Slices (slice 0 starts at 12 o'clock and runs clockwise)
  for (let i = 0; i < n; i++) {
    const start = -Math.PI / 2 + i * step;
    const end   = start + step;
    const mid   = start + step / 2;

    const g = ctx.createLinearGradient(
      Math.cos(mid) * rSeg * 0.1, Math.sin(mid) * rSeg * 0.1,
      Math.cos(mid) * rSeg,       Math.sin(mid) * rSeg
    );
    g.addColorStop(0, PRIZES[i].c1);
    g.addColorStop(1, PRIZES[i].c2);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, rSeg, start, end);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();
    ctx.lineWidth = Math.max(2, R * 0.012);
    ctx.strokeStyle = '#fff';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  // Labels run along the radius and flip on the left half so they stay readable
  const textEnd   = rSeg - R * 0.05;
  const textStart = R * 0.22;
  const maxLen    = textEnd - textStart;
  const maxFont   = R * 0.092;
  const minFont   = R * 0.055;

  for (let i = 0; i < n; i++) {
    const mid = -Math.PI / 2 + i * step + step / 2;
    const flip = Math.cos(mid) < -0.001;
    const { lines, size } = layoutLabel(PRIZES[i].label, maxLen, maxFont, minFont);

    ctx.save();
    ctx.rotate(mid + (flip ? Math.PI : 0));
    ctx.font = `700 ${size}px "DM Sans", sans-serif`;
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(60,0,20,0.28)';
    ctx.shadowBlur = size * 0.25;
    ctx.shadowOffsetY = size * 0.06;
    ctx.textBaseline = 'middle';
    ctx.textAlign = flip ? 'left' : 'right';
    const x = flip ? -textEnd : textEnd;
    const lineH = size * 1.15;
    lines.forEach((line, k) => {
      const y = (k - (lines.length - 1) / 2) * lineH;
      ctx.fillText(line, x, y);
    });
    ctx.restore();
  }

  // Rim studs
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let k = 0; k < n * 2; k++) {
    const a = -Math.PI / 2 + k * (step / 2);
    ctx.beginPath();
    ctx.arc(Math.cos(a) * R * 0.957, Math.sin(a) * R * 0.957, R * 0.013, 0, TAU);
    ctx.fill();
  }

  ctx.restore();
}

/* ------------------------------------------------------------
   Spinning
   ------------------------------------------------------------ */
// Which slice is under the pointer (12 o'clock) at a given rotation?
function sliceAt(rot) {
  const step = 360 / PRIZES.length;
  return Math.floor(mod(-rot, 360) / step);
}

function tickPin() {
  pin.classList.remove('tick');
  void pin.offsetWidth; // restart the animation
  pin.classList.add('tick');
}

function spin() {
  if (spinning) return;
  spinning = true;
  btn.disabled = true;

  const n      = PRIZES.length;
  const step   = 360 / n;
  const winner = Math.floor(Math.random() * n);
  const jitter = (Math.random() - 0.5) * step * 0.6; // land somewhere inside the slice, not dead centre

  const wanted = mod(-((winner + 0.5) * step) - jitter, 360);
  const delta  = mod(wanted - mod(rotation, 360), 360);
  const turns  = reduceMotion ? 1 : 5 + Math.floor(Math.random() * 3);
  const total  = delta + turns * 360;
  const start  = rotation;
  const dur    = reduceMotion ? 1400 : 5600;

  let t0 = null;
  let lastSlice = sliceAt(rotation);

  function frame(ts) {
    if (t0 === null) t0 = ts;
    const t = Math.min((ts - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 4); // fast start, long slow finish

    rotation = start + total * eased;
    canvas.style.transform = `rotate(${rotation}deg)`;

    const s = sliceAt(rotation);
    if (s !== lastSlice) { lastSlice = s; if (!reduceMotion) tickPin(); }

    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      spinning = false;
      btn.disabled = false;
      btn.textContent = 'Spin again';
      showResult(sliceAt(rotation));
    }
  }
  requestAnimationFrame(frame);
}

/* ------------------------------------------------------------
   Result
   ------------------------------------------------------------ */
function showResult(index) {
  const prize = PRIZES[index];
  $('result-title').textContent = prize.label;
  $('result-note').textContent  = prize.note;

  const badge = $('result-badge');
  badge.textContent = prize.emoji;
  badge.style.background = `linear-gradient(135deg, ${prize.c1}, ${prize.c2})`;

  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');

  burst();
}

function burst() {
  if (reduceMotion) return;
  const layer  = $('burst');
  const glyphs = ['♥', '♡', '✦'];

  for (let i = 0; i < 22; i++) {
    const el = document.createElement('span');
    el.className = 'burst-heart';
    el.textContent = glyphs[i % glyphs.length];
    el.style.color = i % 2 ? 'var(--pink-soft)' : 'var(--lavender)';
    el.style.fontSize = (12 + Math.random() * 16) + 'px';
    layer.appendChild(el);

    const angle = Math.random() * TAU;
    const dist  = 90 + Math.random() * 130;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;

    el.animate([
      { transform: 'translate(-50%, -50%) scale(0.4)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`, opacity: 0 }
    ], {
      duration: 1100 + Math.random() * 700,
      easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)',
      fill: 'forwards'
    }).onfinish = () => el.remove();
  }
}

/* ------------------------------------------------------------
   Wiring
   ------------------------------------------------------------ */
btn.addEventListener('click', spin);

$('spin-again').addEventListener('click', () => {
  dialog.close();
  setTimeout(spin, 250);
});

// Click on the dimmed backdrop closes the dialog
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

$('wheel-count').textContent = `${PRIZES.length} things could happen next`;
canvas.setAttribute('aria-label', `Prize wheel with ${PRIZES.length} prizes: ${PRIZES.map(p => p.label).join(', ')}`);

let resizeFrame = null;
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(draw);
});

draw();
if (document.fonts && document.fonts.load) {
  document.fonts.load('700 20px "DM Sans"').then(draw).catch(() => {});
}

})();

/* ============================================================
   LETTER WRITER PAGE (letter.html)
   Autosaves to this browser, previews with the same typewriter
   effect as "A Letter Just for You", copies, downloads, prints.
   ============================================================ */
(function initLetterWriter() {
  if (!document.getElementById('composer')) return;

  const KEY = 'monthsary.loveLetter.v1';
  const DEFAULT_CLOSING = '— Forever yours 🤍';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = id => document.getElementById(id);
  const els = { to: $('to'), body: $('body'), closing: $('closing'), from: $('from') };
  const countEl    = $('count');
  const statusEl   = $('status');
  const composer   = $('composer');
  const reader     = $('reader');
  const readText   = $('read-text');
  const previewBtn = $('btn-preview');
  const clearBtn   = $('btn-clear');

  let previewing  = false;
  let baseStatus  = '';
  let saveTimer   = null;
  let statusTimer = null;
  let clearTimer  = null;
  let typeTimer   = null;

  /* ── Status line ── */
  function setStatus(msg) {
    statusEl.textContent = msg;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { statusEl.textContent = baseStatus; }, 3000);
  }

  /* ── Storage ── */
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      els.to.value      = d.to   || '';
      els.body.value    = d.body || '';
      els.from.value    = d.from || '';
      els.closing.value = typeof d.closing === 'string' ? d.closing : DEFAULT_CLOSING;
      baseStatus = 'Saved on this device';
      statusEl.textContent = baseStatus;
    } catch (e) { /* storage unavailable: the editor still works */ }
  }

  function queueSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify({
          to: els.to.value, body: els.body.value,
          closing: els.closing.value, from: els.from.value
        }));
        baseStatus = 'Saved on this device';
      } catch (e) {
        baseStatus = 'Couldn’t save in this browser. Copy or download to keep your letter.';
      }
      statusEl.textContent = baseStatus;
    }, 400);
  }

  /* ── Editor helpers ── */
  function grow() {
    const b = els.body;
    b.style.height = 'auto';
    b.style.height = b.scrollHeight + 'px';
  }

  function updateCount() {
    const words = els.body.value.trim().split(/\s+/).filter(Boolean).length;
    countEl.textContent = `${words} ${words === 1 ? 'word' : 'words'}`;
  }

  function onInput() {
    grow();
    updateCount();
    queueSave();
  }

  function signText() {
    return [els.closing.value.trim(), els.from.value.trim()].filter(Boolean).join('\n');
  }

  function plainText() {
    const parts = [];
    const to = els.to.value.trim();
    const body = els.body.value.trim();
    const sign = signText();
    if (to)   parts.push(to);
    if (body) parts.push(body);
    if (sign) parts.push(sign);
    return parts.join('\n\n');
  }

  /* ── Preview (same look + typewriter as the home page letter) ── */
  function buildReader() {
    const to = $('read-to');
    to.textContent = els.to.value.trim();
    to.hidden = !to.textContent;

    const sign = $('read-sign');
    sign.textContent = signText();
    sign.hidden = !sign.textContent;
  }

  function showAllText() {
    clearTimeout(typeTimer);
    readText.textContent = els.body.value.trim();
    readText.classList.add('done');
  }

  function typeOut() {
    const text = els.body.value.trim();
    clearTimeout(typeTimer);
    readText.classList.remove('done');
    readText.textContent = '';
    if (reduceMotion) { showAllText(); return; }

    const perTick = Math.max(1, Math.ceil(text.length / 900)); // long letters never take forever
    let i = 0;
    (function tick() {
      i = Math.min(text.length, i + perTick);
      readText.textContent = text.slice(0, i);
      if (i < text.length) typeTimer = setTimeout(tick, 18);
      else readText.classList.add('done');
    })();
  }

  function showPreview() {
    if (!els.body.value.trim()) {
      setStatus('Write a few lines first, then preview.');
      els.body.focus();
      return;
    }
    buildReader();
    composer.hidden = true;
    reader.hidden = false;
    previewBtn.textContent = 'Keep editing';
    previewing = true;
    typeOut();
    reader.focus({ preventScroll: true });
    reader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setStatus('Tap the letter to show it all at once.');
  }

  function hidePreview() {
    clearTimeout(typeTimer);
    reader.hidden = true;
    composer.hidden = false;
    previewBtn.textContent = 'Preview letter';
    previewing = false;
    grow();
    els.body.focus();
  }

  /* ── Actions ── */
  async function copyText() {
    const text = plainText();
    if (!text) { setStatus('Nothing to copy yet.'); return; }
    try {
      await navigator.clipboard.writeText(text);
      setStatus('Copied to clipboard.');
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { /* ignore */ }
      ta.remove();
      setStatus(ok ? 'Copied to clipboard.' : 'Couldn’t copy. Select the text and copy it by hand.');
    }
  }

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function downloadText() {
    const text = plainText();
    if (!text) { setStatus('Nothing to download yet.'); return; }
    triggerDownload(new Blob([text + '\n'], { type: 'text/plain;charset=utf-8' }), 'love-letter.txt');
    setStatus('Downloaded love-letter.txt');
  }

  /* ── Download as an image that looks like the website letter card ── */
  function roundRectPath(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y,     x + w, y + h, r);
    c.arcTo(x + w, y + h, x,     y + h, r);
    c.arcTo(x,     y + h, x,     y,     r);
    c.arcTo(x,     y,     x + w, y,     r);
    c.closePath();
  }

  function wrapLines(c, text, maxW) {
    const out = [];
    text.split('\n').forEach(par => {
      if (!par.trim()) { out.push(''); return; }
      let line = '';
      par.split(/\s+/).forEach(word => {
        const test = line ? line + ' ' + word : word;
        if (line && c.measureText(test).width > maxW) { out.push(line); line = word; }
        else line = test;
      });
      out.push(line);
    });
    return out;
  }

  async function downloadImage() {
    const to   = els.to.value.trim();
    const body = els.body.value.trim();
    const sign = signText();
    if (!body) { setStatus('Write a few lines first, then download.'); return; }
    setStatus('Preparing your image…');

    const F_SCRIPT = '"Dancing Script", cursive';
    const F_BODY   = '"Cormorant Garamond", Georgia, serif';
    if (document.fonts && document.fonts.load) {
      try {
        await Promise.all([
          document.fonts.load('600 54px "Dancing Script"'),
          document.fonts.load('italic 400 34px "Cormorant Garamond"')
        ]);
      } catch (e) { /* fall back to system fonts */ }
    }

    // Layout (1080px-wide image, 2x resolution)
    const W = 1080, cardX = 90, cardW = 900, padX = 84, cardY = 100;
    const innerW = cardW - padX * 2;
    const BODY_LH = 68, SIGN_LH = 56;

    const m = document.createElement('canvas').getContext('2d');
    m.font = `italic 400 34px ${F_BODY}`;
    const bodyLines = wrapLines(m, body, innerW);
    const signLines = sign ? sign.split('\n') : [];

    let cursor = cardY + 84;                      // top padding
    const decoY = cursor;           cursor += 40 + 36;
    const toY   = cursor;           if (to) cursor += 54 + 40;
    const bodyY = cursor;           cursor += bodyLines.length * BODY_LH;
    const signY = cursor + 56;      if (signLines.length) cursor += 56 + signLines.length * SIGN_LH;
    const beatY = cursor + 56;      cursor += 56 + 64;
    const cardH = cursor + 84 - cardY;
    const H = cardY + cardH + 100;

    const scale = Math.min(2, 16000 / H);
    const c = document.createElement('canvas');
    c.width  = Math.round(W * scale);
    c.height = Math.round(H * scale);
    const g = c.getContext('2d');
    g.scale(scale, scale);

    // Background: navy + the same pink / lavender glows as the site
    g.fillStyle = '#0d0f1a';
    g.fillRect(0, 0, W, H);
    [[0.5, 0.08, 0.9, '244,167,185', 0.14], [0.9, 0.85, 0.7, '201,184,232', 0.12]].forEach(([fx, fy, fr, col, a]) => {
      const rg = g.createRadialGradient(W * fx, H * fy, 0, W * fx, H * fy, W * fr);
      rg.addColorStop(0, `rgba(${col},${a})`);
      rg.addColorStop(1, `rgba(${col},0)`);
      g.fillStyle = rg;
      g.fillRect(0, 0, W, H);
    });
    const dots = ['244,167,185', '201,184,232', '255,255,255'];
    for (let i = 0; i < 70; i++) {
      g.fillStyle = `rgba(${dots[i % 3]},${(Math.random() * 0.5 + 0.1).toFixed(2)})`;
      g.beginPath();
      g.arc(Math.random() * W, Math.random() * H, Math.random() * 2 + 0.6, 0, Math.PI * 2);
      g.fill();
    }

    // Card: gradient border + dark glass inside
    g.save();
    g.shadowColor = 'rgba(244,167,185,0.2)';
    g.shadowBlur = 70;
    roundRectPath(g, cardX, cardY, cardW, cardH, 40);
    const border = g.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    border.addColorStop(0, '#6b4a62');
    border.addColorStop(1, '#5d5478');
    g.fillStyle = border;
    g.fill();
    g.restore();
    roundRectPath(g, cardX + 3, cardY + 3, cardW - 6, cardH - 6, 37);
    g.fillStyle = '#0e1020';
    g.fill();

    // Text
    const cx = W / 2;
    g.textAlign = 'center';
    g.textBaseline = 'middle';

    g.font = `400 40px ${F_BODY}`;
    g.fillStyle = 'rgba(244,167,185,0.6)';
    g.fillText('✦', cx, decoY + 20);

    if (to) {
      g.font = `600 54px ${F_SCRIPT}`;
      g.fillStyle = '#f4a7b9';
      g.fillText(to, cx, toY + 27, innerW);
    }

    g.font = `italic 400 34px ${F_BODY}`;
    g.fillStyle = 'rgba(255,255,255,0.6)';
    bodyLines.forEach((line, i) => g.fillText(line, cx, bodyY + i * BODY_LH + BODY_LH / 2));

    g.font = `400 42px ${F_SCRIPT}`;
    g.fillStyle = 'rgba(255,255,255,0.6)';
    signLines.forEach((line, i) => g.fillText(line, cx, signY + i * SIGN_LH + SIGN_LH / 2, innerW));

    // Heartbeat line (same shape as the site)
    const k = 1.6, bx = cx - 50 * k, by = beatY;
    const pts = [[0,20],[15,20],[20,5],[25,35],[32,5],[38,35],[43,20],[50,20],[55,5],[60,35],[65,20],[100,20]];
    g.beginPath();
    pts.forEach(([x, y], i) => (i ? g.lineTo(bx + x * k, by + y * k) : g.moveTo(bx + x * k, by + y * k)));
    g.strokeStyle = '#f4a7b9';
    g.lineWidth = 3;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.stroke();

    const blob = await new Promise(res => c.toBlob(res, 'image/png'));
    if (!blob) { setStatus('Couldn’t create the image in this browser. Try Print or Download as text.'); return; }
    triggerDownload(blob, 'love-letter.png');
    setStatus('Downloaded love-letter.png');
  }

  /* ── Download menu ── */
  const dlBtn  = $('btn-download');
  const dlMenu = $('download-menu');
  function openMenu(open) {
    dlMenu.hidden = !open;
    dlBtn.setAttribute('aria-expanded', String(open));
  }

  function printLetter() {
    if (!els.body.value.trim()) { setStatus('Write a few lines first, then print.'); return; }
    buildReader();
    showAllText();
    window.print();
  }

  function disarmClear() {
    clearTimeout(clearTimer);
    clearBtn.classList.remove('armed');
    clearBtn.textContent = 'Clear';
  }

  function clearAll() {
    if (!clearBtn.classList.contains('armed')) {
      clearBtn.classList.add('armed');
      clearBtn.textContent = 'Tap again to clear';
      clearTimer = setTimeout(disarmClear, 3500);
      return;
    }
    disarmClear();
    els.to.value = '';
    els.body.value = '';
    els.from.value = '';
    els.closing.value = DEFAULT_CLOSING;
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    baseStatus = '';
    if (previewing) hidePreview();
    grow();
    updateCount();
    setStatus('Letter cleared.');
  }

  /* ── Starters: insert at the cursor ── */
  document.querySelectorAll('.starter').forEach(chip => {
    chip.addEventListener('click', () => {
      const ta  = els.body;
      const pos = ta.selectionStart ?? ta.value.length;
      const end = ta.selectionEnd ?? pos;
      const before = ta.value.slice(0, pos);
      const after  = ta.value.slice(end);
      let sep = '';
      if (before.trim()) sep = before.endsWith('\n\n') ? '' : before.endsWith('\n') ? '\n' : '\n\n';
      const inserted = before + sep + chip.dataset.text + ' ';
      ta.value = inserted + after;
      ta.focus();
      ta.setSelectionRange(inserted.length, inserted.length);
      onInput();
    });
  });

  /* ── Wiring ── */
  els.body.addEventListener('input', onInput);
  [els.to, els.closing, els.from].forEach(el => el.addEventListener('input', queueSave));

  readText.addEventListener('click', showAllText);
  previewBtn.addEventListener('click', () => (previewing ? hidePreview() : showPreview()));
  $('btn-copy').addEventListener('click', copyText);
  dlBtn.addEventListener('click', e => { e.stopPropagation(); openMenu(dlMenu.hidden); });
  $('dl-image').addEventListener('click', () => { openMenu(false); downloadImage(); });
  $('dl-text').addEventListener('click',  () => { openMenu(false); downloadText(); });
  document.addEventListener('click', e => { if (!dlMenu.hidden && !dlMenu.contains(e.target)) openMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !dlMenu.hidden) { openMenu(false); dlBtn.focus(); } });
  $('btn-print').addEventListener('click', printLetter);
  clearBtn.addEventListener('click', clearAll);
  window.addEventListener('resize', grow);

  load();
  grow();
  updateCount();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(grow);
})();

/* ============================================================
   Everything below runs on the HOME PAGE only (index.html).
   The particle background is shared with the wheel and letter pages.
   ============================================================ */
/* ============================================================
   PARTICLE CANVAS
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');

  let W, H, particles = [];

  const COLORS = ['rgba(244,167,185,', 'rgba(201,184,232,', 'rgba(255,255,255,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 2 + 0.5,
      dx:    (Math.random() - 0.5) * 0.3,
      dy:   -(Math.random() * 0.4 + 0.1),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.1
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 90 }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.y < -10)   p.y = H + 10;
      if (p.x < -10)   p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

if (document.getElementById('hero')) {

/* ============================================================
   DATA
   ============================================================ */

const CAROUSEL_ITEMS = [
  {
    img: 'img/aqua-planet.JPG',
    gradient: 'linear-gradient(135deg, #f4a7b9 0%, #c9b8e8 100%)',
    emoji: '🌊',
    title: 'Our First Swimming',
    date: 'December 27',
    memo: 'Kabado niyan siya sa mga rides, pero nakapag-picture kasama ang baby niya.'
  },
  {
    img: 'img/azure.JPG',
    gradient: 'linear-gradient(135deg, #fce4ec 0%, #f06292 100%)',
    emoji: '🛏️',
    title: 'Our First Staycation',
    date: 'January 7',
    memo: 'Kahit super mahal ang nagastos natin babii, super saya and sulit ang araw natin na to!!'
  },
  {
    img: 'img/first-valentine.JPG',
    gradient: 'linear-gradient(135deg, #c9b8e8 0%, #7c4dff 60%, #2a1a2e 100%)',
    emoji: '✨',
    title: 'Our First Valentine Celebration',
    date: 'February 14',
    memo: 'Kahit na stressing ang grab during valentine, we celebrated our valentines with a smile and enjoyment.'
  },
  {
    img: 'img/baguio-mirror.JPG',
    gradient: 'linear-gradient(135deg, #f5efe6 0%, #f4a7b9 100%)',
    emoji: '🗺️',
    title: 'Our First Baguio Trip',
    date: 'February 28',
    memo: 'Our very first mirror shot in baguio, ito ang first photobooth picture na maayos natin.'
  },
  {
    img: 'img/coffee-date.JPG',
    gradient: 'linear-gradient(135deg, #ffd1dc 0%, #c9b8e8 100%)',
    emoji: '☕',
    title: 'Coffee Date in Baguio',
    date: 'February 28',
    memo: 'Coffee Date sa ibang lugar was a memorable experience babii, ulitin natin to ulit sa susunodd!!'
  },
  {
    img: 'img/family.JPEG',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    emoji: '🌊',
    title: 'Our Second Swimming Together',
    date: 'April 4',
    memo: 'Super saya kong comfortable kang nakikipag-bond dito babii.'
  },
  {
    img: 'img/graduation.jpg',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    emoji: '🌊',
    title: 'Your baby did it!',
    date: 'April 29',
    memo: 'The day you have a Professional IT, ikaw na next year niyan my future Nursing.'
  },
  {
    img: 'img/noook.jpg',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    emoji: '🛏️',
    title: 'First ever sleep together natin!',
    date: 'May 14',
    memo: 'The day na super sarap ng ulam natin and full of laughter and enjoyment ang ginagawa natin, it felt like we\'re newly wed babii.'
  },
   {
    img: 'img/inasal.jpeg',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #c9b8e8 100%)',
    emoji: '🍗',
    title: 'A simple date with a simple meal',
    date: 'June 11',
    memo: 'Kahit na simple date with a simple meal lang siya together, masarap ang meal natin dahil kasama ko ang baby koo (alam kong matatawa ka dito babii).'
  },
   {
    img: 'img/aaaa.jpg',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #c9b8e8 100%)',
    emoji: '🏊🏼‍♂️',
    title: 'Swimming date ulit together',
    date: 'July 8',
    memo: 'Kahit super busog sa unli, worth it naman dahil sa time natin together, babii! After kumain, swimming date ulit tayo, then dumiretso pa sa Lara kahit pagod na pagod na tayo.'
  },
  {
    img: 'img/blakes.jpg',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #c9b8e8 100%)',
    emoji: '🥩',
    title: 'A simple date with a simple meal',
    date: 'July 23',
    memo: 'Our first fancy restaurant, and my first treat for you using my own hard-earned money. Sobrang saya ko na na-experience natin ito together.'
  },
  {
    img: 'img/Bday.jpg',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #c9b8e8 100%)',
    emoji: '🥩',
    title: '10 monthsary date',
    date: 'August 23',
    memo: 'Ito ang time na nakisuyo kang magpabili ng "30" na balloon, ang kaso nabili ko 30 pieces na balloon'
  },
  {
    img: 'img/nigiri.jpg',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #c9b8e8 100%)',
    emoji: '🍙',
    title: 'Simple date together',
    date: 'September 2',
    memo: 'Nigiri and Kamir date natin babii, super sarap ng dalawa, gusto ko ulitin ulit ACCCKKKK'
  },
  {
    img: 'img/gupit.jpg',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #c9b8e8 100%)',
    emoji: '💇🏻‍♀️',
    title: 'Bagong gupit ang baby ko oh',
    date: 'September 10',
    memo: 'Bagong gupit ng baby ko oh, super cute and super na s-stunned ako dahil sa ganda mo paratii.'
  },
];

const FLIPCARD_ITEMS = [
  {
    img: 'img/photobooth-baguio.JPG',
    gradient: 'linear-gradient(135deg, #f4a7b9, #c9b8e8)',
    emoji: '💌',
    frontLabel: 'Very First Photobooth that we\'ve take in Baguio',
    backIcon: '🌟',
    backTitle: 'My Answered Prayer',
    backText: 'I didn\'t know it then, but meeting you was the best thing that ever happened to me. Everything after felt like a gift.'
  },
  {
    img: 'img/valentine-flowers.JPG',
    gradient: 'linear-gradient(135deg, #c9b8e8, #7c4dff)',
    emoji: '🍽️',
    frontLabel: 'Favorite Date',
    backIcon: '🥂',
    backTitle: 'A Picture that worth to remember',
    backText: 'Our very first valentine celebration as a couple, kahit na buking mga surprises and gifts ko, it\'s still worth it to celebrate our day. '
  },
  {
    img: 'img/valentine-photobooth.JPG',
    gradient: 'linear-gradient(135deg, #fce4ec, #f4a7b9)',
    emoji: '😂',
    frontLabel: 'I know ayaw mo ang picture na ito babii, pero ilalagay ko siya hehe',
    backIcon: '😅',
    backTitle: 'Still Makes Me Smile',
    backText: 'I know na ayaw mo ang picture na ito since sinasabi mong "ang panget ko diyan" pero hindi babii, you\'re beautiful kahit anong angle sa picture yan PS. sana hindi ka magalit hehehe.'
  },
  {
    img: 'img/grad-pic.JPEG',
    gradient: 'linear-gradient(135deg, #f5efe6, #c9b8e8)',
    emoji: '💛',
    frontLabel: 'I did it babii!! Ikaw na ang next niyan po',
    backIcon: '🙏',
    backTitle: 'Thank You For Everything',
    backText: 'Thank you for making ordinary days feel magical. Every laugh, every support, every conversation — with you, everything becomes something I\'ll treasure.'
  },
  {
    img: 'img/atokk.JPG',
    gradient: 'linear-gradient(135deg, #e8f5e9, #a8edea)',
    emoji: '🔭',
    frontLabel: 'Future Dreams',
    backIcon: '👣',
    backTitle: 'Everything Ahead of Us',
    backText: 'There are so many places I want to go, so many memories I want to make — and I want every single one of them to be with you.'
  },

];

const TIMELINE_ITEMS = [
  {
    date: 'Day One',
    title: 'First Conversation',
    desc: 'A simple "hello by" that opened a door to us.'
  },
  {
    date: 'Week Two',
    title: 'First Date',
    desc: 'Butterflies, warm coffee, and the feeling that time was moving both too fast, hindi natin alam kung saan tayo after natin gumala for costumes and after natin mag centro kaya we decided to watch nalang sa cine.'
  },
  {
    date: 'Week Two',
    title: 'First Photobooth Together',
    desc: 'Captured wonderful smile of yours, completely candid — my favorite photo of all time.'
  },
  {
    date: 'One Month Later',
    title: 'Spending time everyday was a butterflies in my stomach',
    desc: 'One month of learning you, laughing with you, and knowing about YOU was a wonderful experience.'
  },
  {
    date: 'June 12, 2025',
    title: 'First meeting sa family mo',
    desc: 'Kahit na day before akong pumunta ng bahay, kahit na kabado ako nung kapunta ko, kahit na nakikisabay ako sa biruan nina tito and nina ate during that day. It is a special day for us dahil dito natin malalaman if approve ako kari tito and kari ate.'
  },
  {
    date:  'October 23, 2025',
    title: 'The day na sinagot mo ako (hindi ko makakalimutan to babii hehe)',
    desc:  'The day na nakuha ko ang sagot mong "yes" babiii, super saya ko and alam kong namumula ako during that day and kahit na natae ako non. I would say na super saya ko sa time na yon dahil ikaw ang answered prayer koo, super saya ko mag mula ngayon dahil it feels like everything feels perfect in our relationship babii.'
  },
];

const LETTER_TEXT = `No matter how busy life gets, I'll always be grateful that I met someone who brings peace, happiness, and comfort into my life. You make the ordinary feel extraordinary just by being in it. Every small moment — a look, coffee date, bahay date, a laughter, a situation or a problem, a gift every moment is worth to hold forever. Tulad ng sinabi ko sayo babii, every situation we may encounter, aayusin natin yan together, magkalayo man tayo or nasa iisang bahay tayo babii you're other half is always here to support, to help and to lift you up everyday babii. Dahil you deserve to experience this treatment babii, what I've said earlier the word "perfect" I really mean it babii, ang perfect ng relationship natin wherein pinagtutulungan natin ang ano mang bagay, support each others back and the care, love, laughter is super perfect babii. Kaya thank you for choosing me, every single day na hanggang ngayon super thankful akong nakuha ko ang sagot mong "yes" nung October 23 hehehe. Here's to all the beautiful moments still ahead of us. I hope nagustuhan mo babii, more picture kukuhanin natin babii to make it as our memories! Ipapakita natin ang website na ito sa anak natin babiii para makita niya ang milestone natin every month, every journey natin every month, and every moment natin every month.

Hi babiii, Happy happy happy 1st anniversary to us!! I know marami na tayong nagawa sa milestone natin wherein maraming laughters, maraming iyakan, maraming open forum ang nagawa and maraming excitement + enjoyment ang ginagawa natin sa loob ng isang taon. And I wanted to say po is Thank you, I'm grateful enough for us babii and alam ko na minsan makulit ako and hindi nakikinig kaya sorry pooo, I'm doing my best to be better everyday po kaya wag ka po sana magsawa sa akin hehe. Kaya even though na may ups-downs tayong dalawa you're still the one I want to rant po, to lean on your shoulder and to rant everytime there's a problem po. Hindi man ako nagiging honest sa part ko being your boyfriend whenever we had a problem po, kaya I'm so sorry about it babiii. This website is for us babii, tulad ng sinabi ko noon na gagawa akong website sa atin na nagawa natin within the month, I know some of our memories lang ang linagay ko dito babii, but despite that po alam naman natin ang nangyari sa loob ng month na yon kahit na hindi ko nailagay lahat. Isang taon na po mag mula nung sinagot and nakuha ko ang "yes" mo babii, and I'm very happy na umabot tayo dito, more years to come and more milestone to encounter babii.`;
/* ============================================================
   FLOATING HEARTS (HERO)
   ============================================================ */
(function initHearts() {
  const container = document.getElementById('hearts-container');
  const SYMBOLS   = ['♥', '♡', '✦', '✿'];

  function spawnHeart() {
    const el = document.createElement('span');
    el.classList.add('heart');
    el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const left     = Math.random() * 100;
    const size     = Math.random() * 16 + 10;
    const duration = Math.random() * 10 + 8;
    const delay    = Math.random() * 6;
    const color    = Math.random() > 0.5 ? '#f4a7b9' : '#c9b8e8';

    el.style.cssText = `
      left: ${left}%;
      bottom: -20px;
      font-size: ${size}px;
      color: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(el);
    setTimeout(() => el.remove(), (duration + delay) * 1000);
  }

  // Initial burst
  for (let i = 0; i < 12; i++) spawnHeart();
  setInterval(spawnHeart, 1200);
})();

/* ============================================================
   CAROUSEL
   ============================================================ */
(function initCarousel() {
  const track    = document.getElementById('carousel-track');
  const dotsWrap = document.getElementById('carousel-dots');
  const btnPrev  = document.getElementById('carousel-prev');
  const btnNext  = document.getElementById('carousel-next');
  const container = track.parentElement;

  let current   = 0;
  let autoTimer = null;

  const isMobile = () => window.innerWidth <= 768;

  // Build cards
  CAROUSEL_ITEMS.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'carousel-card' + (i === 0 ? ' active' : '');
    card.innerHTML = `
      <div class="carousel-card__img-wrap">
        <img
          src="${item.img}"
          alt="${item.title}"
          loading="lazy"
          onerror="this.style.display='none';this.parentElement.style.background='${item.gradient}'"
        />
      </div>
      <div class="carousel-card__caption">
        <p class="carousel-card__date">${item.date}</p>
        <p class="carousel-card__title">${item.title}</p>
        <p class="carousel-card__memo">${item.memo}</p>
      </div>
    `;
    track.appendChild(card);

    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      if (isMobile()) scrollToCard(i);
      else goTo(i);
    });
    dotsWrap.appendChild(dot);
  });

  const cards = track.querySelectorAll('.carousel-card');
  const dots  = dotsWrap.querySelectorAll('.carousel-dot');

  /* ---- Desktop: JS transform ---- */
  function getCardWidth() {
    return cards[0].offsetWidth + 24;
  }

  function goTo(index) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
    const offset = current * getCardWidth() - (container.offsetWidth / 2 - getCardWidth() / 2);
    track.style.transform = `translateX(-${Math.max(0, offset)}px)`;
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  btnNext.addEventListener('click', () => { clearInterval(autoTimer); next(); resetAuto(); });
  btnPrev.addEventListener('click', () => { clearInterval(autoTimer); prev(); resetAuto(); });

  function resetAuto() {
    autoTimer = setInterval(() => { if (!isMobile()) next(); }, 4000);
  }

  /* ---- Mobile: native scroll snap ---- */
  function scrollToCard(index) {
    const card = cards[index];
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' });
  }

  // Update dots on mobile scroll
  container.addEventListener('scroll', () => {
    if (!isMobile()) return;
    const scrollLeft = container.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - 20 - scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    if (closest !== current) {
      dots[current].classList.remove('active');
      cards[current].classList.remove('active');
      current = closest;
      dots[current].classList.add('active');
      cards[current].classList.add('active');
    }
  }, { passive: true });

  resetAuto();
})();

/* ============================================================
   FLIP CARDS
   ============================================================ */
(function initFlipCards() {
  const grid = document.getElementById('flipcard-grid');

  FLIPCARD_ITEMS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `
      <div class="flip-card__inner">
        <div class="flip-card__front">
          <img
            class="flip-card__front-img"
            src="${item.img}"
            alt="${item.frontLabel}"
            loading="lazy"
            onerror="this.style.display='none';this.parentElement.style.background='${item.gradient}'"
          />
          <div class="flip-card__front-overlay">
            <span class="flip-card__front-label">${item.frontLabel}</span>
          </div>
        </div>
        <div class="flip-card__back">
          <div class="flip-card__back-icon">${item.backIcon}</div>
          <p class="flip-card__back-title">${item.backTitle}</p>
          <p class="flip-card__back-text">${item.backText}</p>
        </div>
      </div>
    `;

    // Mobile: click to flip
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    grid.appendChild(card);
  });
})();

/* ============================================================
   TIMELINE
   ============================================================ */
(function initTimeline() {
  const list = document.getElementById('timeline-list');

  TIMELINE_ITEMS.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-item reveal';
    el.innerHTML = `
      <div class="timeline-item__content">
        <p class="timeline-item__date">${item.date}</p>
        <h3 class="timeline-item__title">${item.title}</h3>
        <p class="timeline-item__desc">${item.desc}</p>
      </div>
      <div class="timeline-item__dot"></div>
      <div style="flex:1"></div>
    `;
    list.appendChild(el);
  });
})();

/* ============================================================
   TYPEWRITER — LOVE LETTER
   ============================================================ */
(function initTypewriter() {
  const el      = document.getElementById('letter-text');
  let charIndex = 0;
  let started   = false;

  function type() {
    if (charIndex < LETTER_TEXT.length) {
      el.textContent += LETTER_TEXT[charIndex++];
      setTimeout(type, 28);
    } else {
      el.classList.add('done');
    }
  }

  // Start when letter section enters viewport
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      setTimeout(type, 600);
    }
  }, { threshold: 0.3 });

  const section = document.getElementById('letter');
  if (section) observer.observe(section);
})();

/* ============================================================
   MUSIC PLAYER
   ============================================================ */
(function initMusicPlayer() {
  const toggle  = document.getElementById('music-toggle');
  const icon    = document.getElementById('music-icon');
  const vinyl   = document.getElementById('vinyl');
  const audio   = document.getElementById('bg-music');

  let playing = false;

  toggle.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      vinyl.classList.remove('spinning');
      icon.textContent = '▶';
    } else {
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          vinyl.classList.add('spinning');
          icon.textContent = '⏸';
        }).catch(() => {
          // No audio src — gracefully do nothing
        });
      }
      vinyl.classList.add('spinning');
      icon.textContent = '⏸';
    }
    playing = !playing;
  });
})();

/* ============================================================
   ENDING — STARS
   ============================================================ */
(function initStars() {
  const container = document.getElementById('ending-stars');
  const COUNT     = 80;

  for (let i = 0; i < COUNT; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size   = Math.random() * 3 + 1;
    const left   = Math.random() * 100;
    const top    = Math.random() * 100;
    const dur    = Math.random() * 3 + 2;
    const delay  = Math.random() * 4;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      top: ${top}%;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(star);
  }

  // CTA interaction — fade out, then continue to the spin-the-wheel page
  const endingCta = document.getElementById('ending-cta');
  endingCta.addEventListener('click', e => {
    e.preventDefault();
    const target = endingCta.getAttribute('href') || 'wheel.html';
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.href = target; }, 450);
  });

  // Coming back with the browser's Back button: un-fade the page
  window.addEventListener('pageshow', () => {
    document.body.style.opacity = '1';
  });
})();

/* ============================================================
   INTERSECTION OBSERVER — SCROLL REVEAL
   ============================================================ */
(function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  // Observe all .reveal elements (added dynamically, use MutationObserver to catch them)
  function observeAll() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  observeAll();

  // Also observe section headers
  document.querySelectorAll('.section__header, .flip-card, .carousel-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();

/* ============================================================
   PARALLAX HERO (subtle)
   ============================================================ */
(function initParallax() {
  const hero = document.getElementById('hero');
  const overlay = hero.querySelector('.hero__bg-overlay');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      overlay.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
})();
/* ============================================================
   COUNTDOWN TIMER
   ============================================================ */
(function initCountdown() {
  // ── Set your anniversary / start date here ──
  const START = new Date('2025-10-23T00:00:00');

  const elYears   = document.getElementById('ct-years');
  const elMonths  = document.getElementById('ct-months');
  const elDays    = document.getElementById('ct-days');
  const elHours   = document.getElementById('ct-hours');
  const elMins    = document.getElementById('ct-minutes');
  const elSecs    = document.getElementById('ct-seconds');
  const elTotal   = document.getElementById('ct-total-days');
  const elMile    = document.getElementById('ct-next-milestone');

  if (!elYears) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick(el, val) {
    const str = pad(val);
    if (el.textContent !== str) {
      el.textContent = str;
      el.classList.remove('tick');
      // Force reflow then re-add for animation
      void el.offsetWidth;
      el.classList.add('tick');
      setTimeout(() => el.classList.remove('tick'), 260);
    }
  }

  function getNextMilestone(totalDays) {
    // Milestones: every 100 days, every anniversary year
    const milestones = [];
    for (let i = 100; i <= totalDays + 400; i += 100) milestones.push(i);
    for (let y = 1; y <= 10; y++) milestones.push(y * 365);
    milestones.sort((a, b) => a - b);
    const next = milestones.find(m => m > totalDays);
    if (!next) return null;
    return { days: next - totalDays, label: next % 365 === 0 ? `${next / 365} year${next / 365 > 1 ? 's' : ''} together` : `${next} days together` };
  }

  function update() {
    const now   = new Date();
    const diff  = now - START;      // ms

    if (diff < 0) {
      // Relationship hasn't started yet according to dates — show zeroes
      [elYears, elMonths, elDays, elHours, elMins, elSecs].forEach(el => el.textContent = '00');
      elTotal.textContent = '0 days together';
      elMile.textContent  = 'The story begins soon ✨';
      return;
    }

    // Total days (floor)
    const totalDays = Math.floor(diff / 86400000);

    // Years / remaining months / remaining days
    const s   = START;
    const n   = now;
    let years = n.getFullYear() - s.getFullYear();
    let months = n.getMonth() - s.getMonth();
    let days  = n.getDate() - s.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prev = new Date(n.getFullYear(), n.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) { years--; months += 12; }

    // Hours / minutes / seconds from the ms remainder
    const msInDay = diff % 86400000;
    const hours   = Math.floor(msInDay / 3600000);
    const minutes = Math.floor((msInDay % 3600000) / 60000);
    const seconds = Math.floor((msInDay % 60000) / 1000);

    tick(elYears,  years);
    tick(elMonths, months);
    tick(elDays,   days);
    tick(elHours,  hours);
    tick(elMins,   minutes);
    tick(elSecs,   seconds);

    // Pills
    elTotal.textContent = `${totalDays.toLocaleString()} days together`;

    const mile = getNextMilestone(totalDays);
    if (mile) {
      elMile.textContent = `${mile.days} day${mile.days !== 1 ? 's' : ''} to ${mile.label}`;
    }
  }

  update();
  setInterval(update, 1000);
})();

/* ============================================================
   SCRATCH CARD
   ============================================================ */
(function initScratchCard() {
  const wrap    = document.querySelector('.scratch-card-wrap');
  const canvas  = document.getElementById('scratch-canvas');
  const ctx     = canvas.getContext('2d');
  const hint    = document.getElementById('scratch-hint');
  const doneBanner = document.getElementById('scratch-done');
  const resetBtn   = document.getElementById('scratch-reset');
  const reveal  = document.getElementById('scratch-reveal');
  const overlay = reveal.querySelector('.scratch-reveal__overlay');

  // Texture colors to mimic the deep-rose fabric look from the screenshot
  const COVER_COLOR = '#9b1a3c'; // deep rose/crimson — matches screenshot

  let isDrawing   = false;
  let hasStarted  = false;
  let isComplete  = false;
  let checkTimer  = null;

  /* ── Setup ── */
  function setupCanvas() {
    const rect = wrap.getBoundingClientRect();
    canvas.width  = rect.width  || 340;
    canvas.height = rect.height || 480;

    // Fill with cover color
    ctx.fillStyle = COVER_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle noise/texture overlay
    addTextureNoise();

    // Reset state
    isComplete = false;
    hasStarted = false;
    hint.classList.remove('hidden');
    doneBanner.classList.remove('visible');
    overlay.classList.remove('visible');
  }

  // Draw subtle dot-noise texture like the fabric in the screenshot
  function addTextureNoise() {
    ctx.save();
    for (let i = 0; i < canvas.width * canvas.height * 0.004; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.2;
      const alpha = Math.random() * 0.18;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }
    ctx.restore();
  }

  /* ── Drawing ── */
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY
    };
  }

  function scratch(e) {
    if (!isDrawing) return;
    e.preventDefault();

    if (!hasStarted) {
      hasStarted = true;
      hint.classList.add('hidden');
    }

    const pos = getPos(e);

    // Use destination-out to erase the cover, revealing image beneath
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();

    // Slightly larger brush on touch
    const radius = e.touches ? 38 : 30;

    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Add soft feathered edge
    const grad = ctx.createRadialGradient(pos.x, pos.y, radius * 0.4, pos.x, pos.y, radius);
    grad.addColorStop(0,   'rgba(0,0,0,1)');
    grad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';

    // Throttle coverage check
    clearTimeout(checkTimer);
    checkTimer = setTimeout(checkCoverage, 120);
  }

  /* ── Coverage Check ── */
  function checkCoverage() {
    if (isComplete) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let cleared = 0;
    // Sample every 4th pixel for perf
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] < 128) cleared++;
    }
    const total = (data.length / 16);
    const pct   = cleared / total;

    if (pct > 0.55) { // 55% cleared → fully reveal
      completeReveal();
    }
  }

  function completeReveal() {
    isComplete = true;
    // Fade out remaining cover
    let alpha = 1;
    const fade = setInterval(() => {
      alpha -= 0.06;
      if (alpha <= 0) {
        alpha = 0;
        clearInterval(fade);
        canvas.style.display = 'none';
        doneBanner.classList.add('visible');
        overlay.classList.add('visible');
      }
      ctx.globalAlpha = alpha;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = COVER_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      addTextureNoise();
      ctx.globalAlpha = 1;
    }, 30);
  }

  /* ── Event Listeners ── */
  canvas.addEventListener('mousedown',  e => { isDrawing = true; scratch(e); });
  canvas.addEventListener('mousemove',  e => { if (isDrawing) scratch(e); });
  canvas.addEventListener('mouseup',    () => { isDrawing = false; });
  canvas.addEventListener('mouseleave', () => { isDrawing = false; });

  canvas.addEventListener('touchstart', e => { isDrawing = true; scratch(e); }, { passive: false });
  canvas.addEventListener('touchmove',  e => { if (isDrawing) scratch(e); },   { passive: false });
  canvas.addEventListener('touchend',   () => { isDrawing = false; });

  /* ── Reset ── */
  resetBtn.addEventListener('click', () => {
    canvas.style.display = 'block';
    setupCanvas();
  });

  /* ── Init on load ── */
  // Wait for wrap to have dimensions
  if (wrap.getBoundingClientRect().width > 0) {
    setupCanvas();
  } else {
    window.addEventListener('load', setupCanvas);
  }
})();

} // end home-page-only code