/* ============================================================
   homepage.js  —  Canvas animation + Dock + Gallery + Notes
   Place at: themes/mytheme/static/js/homepage.js
   ============================================================ */

/* ── CANVAS: STARS + PCB CIRCUIT ANIMATION ── */
var cv = document.getElementById('cv');
var cx = cv.getContext('2d');
var W, H, mx = -999, my = -999;
var stars = [], nodes = [], traces = [], pkts = [];

function rsz() {
  W = cv.width = window.innerWidth;
  H = cv.height = window.innerHeight;
  bld();
}

function mkS() {
  stars = [];
  for (var i = 0, n = Math.floor(W * H / 5800); i < n; i++)
    stars.push({ x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.3 + .2, a: Math.random(),
      sp: .005 + Math.random() * .014, d: Math.random() < .5 ? 1 : -1,
      c: Math.random() < .12 ? '#ffd580' : Math.random() < .08 ? '#aaddff' : '#fff' });
}

function mkC() {
  nodes = []; traces = []; pkts = [];
  var sx = Math.max(75, Math.floor(W / 15)), sy = Math.max(75, Math.floor(H / 8));
  var cols = Math.ceil(W / sx) + 1, rows = Math.ceil(H / sy) + 1;
  for (var r = 0; r < rows; r++)
    for (var c = 0; c < cols; c++) {
      var jx = (Math.random() - .5) * sx * .38, jy = (Math.random() - .5) * sy * .38;
      nodes.push({ x: c * sx + jx, y: r * sy + jy, t: rT(), act: Math.random() < .7, ph: Math.random() * 6.28 });
    }
  for (var i = 0; i < nodes.length; i++) {
    var col = i % cols;
    if (col < cols - 1 && Math.random() < .63 && nodes[i].act && nodes[i + 1].act)
      traces.push({ a: nodes[i], b: nodes[i + 1], g: .1 + Math.random() * .15 });
    var dn = i + cols;
    if (dn < nodes.length && Math.random() < .63 && nodes[i].act && nodes[dn].act)
      traces.push({ a: nodes[i], b: nodes[dn], g: .1 + Math.random() * .15 });
  }
  for (var i = 0; i < 22; i++) spP();
}

function rT() { var r = Math.random(); return r < .44 ? 'pad' : r < .64 ? 'via' : r < .78 ? 'res' : r < .88 ? 'cap' : 'ic'; }
function bld() { mkS(); mkC(); }

function spP() {
  if (!traces.length) return;
  var t = traces[Math.floor(Math.random() * traces.length)];
  var s = Math.random() < .5 ? t.a : t.b;
  var p = wlk(s, 5 + Math.floor(Math.random() * 6));
  if (p.length > 1) pkts.push({ path: p, pg: 0, sp: .004 + Math.random() * .006, x: p[0].x, y: p[0].y, tr: [], br: Math.random() < .2 });
}

function wlk(st, steps) {
  var p = [st], cur = st, prv = null;
  for (var s = 0; s < steps; s++) {
    var opts = traces.filter(function(t) { return t.a === cur || t.b === cur; })
      .map(function(t) { return t.a === cur ? t.b : t.a; })
      .filter(function(n) { return n !== prv; });
    if (!opts.length) break;
    var nx = opts[Math.floor(Math.random() * opts.length)];
    p.push(nx); prv = cur; cur = nx;
  }
  return p;
}

function dS(s) { cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.28); cx.fillStyle = s.c; cx.globalAlpha = s.a * .72; cx.fill(); cx.globalAlpha = 1; }

function dT(t, ts) {
  var g = t.g + Math.sin(ts * .0009 + t.a.x * .009) * .055;
  cx.beginPath(); cx.moveTo(t.a.x, t.a.y); cx.lineTo(t.b.x, t.b.y);
  cx.strokeStyle = 'rgba(249,115,22,' + g + ')'; cx.lineWidth = .78; cx.stroke();
}

function dN(n, ts) {
  if (!n.act) return;
  var pu = Math.sin(ts * .001 + n.ph) * .5 + .5;
  var dt = Math.hypot(n.x - mx, n.y - my);
  var pr = Math.max(0, 1 - dt / 165);
  var I = .18 + pu * .18 + pr * .78;
  if (n.t === 'pad' || n.t === 'via') {
    cx.beginPath(); cx.arc(n.x, n.y, n.t === 'via' ? 3.2 : 2.4, 0, 6.28);
    cx.fillStyle = 'rgba(249,115,22,' + I + ')'; cx.fill();
    if (pr > .12 || n.t === 'via') {
      var g = cx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 15);
      g.addColorStop(0, 'rgba(249,115,22,' + (I * .32) + ')'); g.addColorStop(1, 'rgba(0,0,0,0)');
      cx.beginPath(); cx.arc(n.x, n.y, 15, 0, 6.28); cx.fillStyle = g; cx.fill();
    }
  } else if (n.t === 'res') dR(n.x, n.y, I);
  else if (n.t === 'cap') dC2(n.x, n.y, I);
  else if (n.t === 'ic') dIC(n.x, n.y, I, ts);
}

function dR(x, y, a) {
  cx.save(); cx.translate(x, y); cx.strokeStyle = 'rgba(245,166,35,' + a + ')'; cx.lineWidth = 1;
  cx.beginPath(); cx.moveTo(-10, 0);
  var p = [-8, -3, -6, 3, -4, -3, -2, 3, 0, -3, 2, 3, 4, -3, 6, 3];
  for (var i = 0; i < p.length; i += 2) cx.lineTo(p[i], p[i + 1]);
  cx.lineTo(10, 0); cx.stroke(); cx.restore();
}

function dC2(x, y, a) {
  cx.save(); cx.translate(x, y); cx.strokeStyle = 'rgba(245,166,35,' + a + ')'; cx.lineWidth = 1.2;
  [[-8, 0, -2, 0], [2, 0, 8, 0], [-2, -5, -2, 5], [2, -5, 2, 5]].forEach(function(v) {
    cx.beginPath(); cx.moveTo(v[0], v[1]); cx.lineTo(v[2], v[3]); cx.stroke();
  });
  cx.restore();
}

function dIC(x, y, a, ts) {
  cx.save(); cx.translate(x, y); var sz = 12;
  cx.strokeStyle = 'rgba(0,229,192,' + (a * .8) + ')'; cx.fillStyle = 'rgba(0,229,192,' + (a * .05) + ')'; cx.lineWidth = 1;
  cx.beginPath(); cx.roundRect(-sz, -sz * .6, sz * 2, sz * 1.2, 2); cx.fill(); cx.stroke();
  for (var p = -1; p <= 1; p++) {
    cx.beginPath(); cx.moveTo(-sz, p * 4); cx.lineTo(-sz - 5, p * 4);
    cx.strokeStyle = 'rgba(0,229,192,' + (a * .5) + ')'; cx.stroke();
    cx.beginPath(); cx.moveTo(sz, p * 4); cx.lineTo(sz + 5, p * 4); cx.stroke();
  }
  if (Math.sin(ts * .003 + x) > .65) { cx.beginPath(); cx.arc(0, 0, 2, 0, 6.28); cx.fillStyle = 'rgba(0,229,192,' + a + ')'; cx.fill(); }
  cx.restore();
}

function dP(p) {
  if (!p.tr.length) return;
  var col = p.br ? '255,255,255' : '249,115,22';
  p.tr.forEach(function(pt, i) {
    var fa = (1 - i / p.tr.length) * (p.br ? .52 : .42);
    var fr = (1 - i / p.tr.length) * (p.br ? 2.3 : 1.8);
    cx.beginPath(); cx.arc(pt.x, pt.y, fr, 0, 6.28);
    cx.fillStyle = 'rgba(' + col + ',' + fa + ')'; cx.fill();
  });
  cx.beginPath(); cx.arc(p.x, p.y, p.br ? 2.9 : 2, 0, 6.28);
  cx.fillStyle = 'rgba(' + col + ',.95)'; cx.fill();
  var g = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.br ? 14 : 10);
  g.addColorStop(0, 'rgba(' + col + ',' + (p.br ? .32 : .22) + ')'); g.addColorStop(1, 'rgba(0,0,0,0)');
  cx.beginPath(); cx.arc(p.x, p.y, p.br ? 14 : 10, 0, 6.28); cx.fillStyle = g; cx.fill();
}

function uP(p) {
  var tot = p.path.length - 1, seg = p.pg * tot, si = Math.floor(seg), t = seg - si;
  if (si < tot) {
    var a = p.path[si], b = p.path[si + 1];
    p.x = a.x + (b.x - a.x) * t; p.y = a.y + (b.y - a.y) * t;
    p.tr.unshift({ x: p.x, y: p.y }); if (p.tr.length > 17) p.tr.pop();
  }
  p.pg += p.sp; return p.pg < 1;
}

var lsp = 0;
function frame(ts) {
  cx.clearRect(0, 0, W, H);
  stars.forEach(function(s) { s.a += s.sp * s.d; if (s.a >= 1) { s.a = 1; s.d = -1; } if (s.a <= .04) { s.a = .04; s.d = 1; } dS(s); });
  traces.forEach(function(t) { dT(t, ts); });
  nodes.forEach(function(n) { dN(n, ts); });
  pkts = pkts.filter(function(p) { var alive = uP(p); dP(p); return alive; });
  if (ts - lsp > 195 && pkts.length < 32) { spP(); lsp = ts; }
  var near = null, best = 52;
  nodes.forEach(function(n) { var d = Math.hypot(n.x - mx, n.y - my); if (d < best) { best = d; near = n; } });
  if (near && Math.random() < .07) { var path = wlk(near, 4 + Math.floor(Math.random() * 4)); if (path.length > 1) pkts.push({ path: path, pg: 0, sp: .015, x: path[0].x, y: path[0].y, tr: [], br: true }); }
  requestAnimationFrame(frame);
}

window.addEventListener('resize', rsz);
window.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });
rsz();
requestAnimationFrame(frame);

/* ── DOCK REVEAL + MAGNIFICATION ── */
var dw = document.getElementById('dw');
if (dw) {
  new IntersectionObserver(function(e) {
    dw.classList.toggle('show', !e[0].isIntersecting);
  }, { threshold: .15 }).observe(document.getElementById('hero'));

  var dis = document.querySelectorAll('.di');
  document.getElementById('dock').addEventListener('mousemove', function(e) {
    var r = e.currentTarget.getBoundingClientRect(), mx2 = e.clientX - r.left;
    dis.forEach(function(it) {
      var ir = it.getBoundingClientRect(), cx2 = ir.left + ir.width / 2 - r.left;
      var d = Math.abs(mx2 - cx2), sc = d < 98 ? 1 + .58 * Math.pow(Math.cos(d / 98 * Math.PI / 2), 2) : 1;
      it.style.transform = 'scale(' + sc + ')';
    });
  });
  document.getElementById('dock').addEventListener('mouseleave', function() {
    dis.forEach(function(i) { i.style.transform = 'scale(1)'; });
  });
}

function goTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ── PROGRESS BARS ── */
new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.prog-fill').forEach(function(bar) {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: .3 }).observe(document.getElementById('learning') || document.body);

/* ── GALLERY ── */
var gcat = 'all', gq = '', lbi = 0, lbs = [].concat(PHOTOS);

function rG() {
  lbs = PHOTOS.filter(function(p) {
    return (gcat === 'all' || p.c === gcat) && (!gq || p.l.toLowerCase().indexOf(gq.toLowerCase()) >= 0);
  });
  var html = lbs.map(function(p, i) {
    return '<div class="gi" onclick="oLB(' + i + ')"><img class="gim" src="' + p.s + '" alt="' + p.l + '" loading="lazy"/><div class="gov"><span class="glb">' + p.l + '</span></div></div>';
  }).join('');
  html += '<div class="gadd" title="Add your own photos to data/gallery.yaml"><div class="gadd-pl">+</div><small>Add photo</small></div>';
  document.getElementById('gg').innerHTML = html;
}

function gF(cat, btn) {
  gcat = cat;
  document.querySelectorAll('.gt').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
  rG();
}

function gS(v) { gq = v; rG(); }

function oLB(i) {
  lbi = i;
  document.getElementById('lbi').src = lbs[i].s;
  document.getElementById('lbc').textContent = lbs[i].l;
  document.getElementById('lb').classList.add('open');
}

function cLB() { document.getElementById('lb').classList.remove('open'); }

function nLB(d) {
  lbi = (lbi + d + lbs.length) % lbs.length;
  var img = document.getElementById('lbi');
  img.style.opacity = 0;
  setTimeout(function() {
    img.src = lbs[lbi].s;
    document.getElementById('lbc').textContent = lbs[lbi].l;
    img.style.transition = 'opacity .2s';
    img.style.opacity = 1;
  }, 130);
}

/* ── NOTES ── */
var ncat = 'all';

function rN() {
  var f = NOTES.filter(function(n) { return ncat === 'all' || n.cat === ncat; });
  document.getElementById('nct').textContent = f.length + (f.length === 1 ? ' entry' : ' entries');
  document.getElementById('nll').innerHTML = f.map(function(n) {
    return '<div class="nc" onclick="oN(' + n.id + ')">' +
      '<div class="ndt">' + n.date + '</div>' +
      '<div class="nti">' + n.title + '</div>' +
      '<div class="npv">' + n.prev + '</div>' +
      '<div class="ntg">' + n.tags.map(function(t) { return '<span class="ntag">#' + t + '</span>'; }).join('') + '</div>' +
      '</div>';
  }).join('');
}

function nFl(cat, el) {
  ncat = cat;
  document.querySelectorAll('.nn').forEach(function(i) { i.classList.remove('on'); });
  el.classList.add('on');
  var t = { all: 'All Notes', thoughts: 'Thoughts', electronics: 'Electronics', astro: 'Astro Notes' };
  document.getElementById('ntt').textContent = t[cat] || cat;
  cRd();
  rN();
}

function oN(id) {
  var n = NOTES.filter(function(x) { return x.id === id; })[0];
  if (!n) return;
  /* Link to the actual Hugo post */
  window.location.href = n.url;
}

function cRd() {
  document.getElementById('nlw').style.display = '';
  document.getElementById('rd').classList.remove('open');
}

/* ── MODAL CONTROL ── */
function openM(t) {
  var id = t === 'g' ? 'gm' : 'nm', dk = t === 'g' ? 'dg' : 'dn';
  document.getElementById(id).classList.add('open');
  document.getElementById(dk).classList.add('on');
  if (t === 'g') rG(); else rN();
}

function closeM(t) {
  var id = t === 'g' ? 'gm' : 'nm', dk = t === 'g' ? 'dg' : 'dn';
  document.getElementById(id).classList.remove('open');
  document.getElementById(dk).classList.remove('on');
}

function bdC(e, t) { if (e.target.classList.contains('ov')) closeM(t); }

document.addEventListener('keydown', function(e) {
  if (document.getElementById('lb').classList.contains('open')) {
    if (e.key === 'ArrowLeft') nLB(-1);
    if (e.key === 'ArrowRight') nLB(1);
    if (e.key === 'Escape') cLB();
    return;
  }
  if (e.key === 'Escape') { closeM('g'); closeM('n'); }
});

/* ── SCROLL REVEAL ── */
new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: .08 }).observe(document.getElementById('about'));

var latestSec = document.getElementById('latest');
if (latestSec) {
  new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: .08 }).observe(latestSec);
}
