/* ══════════════════════════════════════
   DJASE — Shared JS
══════════════════════════════════════ */

// ── TOAST ──────────────────────────────
function toast(msg, type = '') {
  const root = document.getElementById('toast-root');
  if (!root) return;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'all .3s';
    el.style.opacity = '0';
    el.style.transform = 'translateX(12px)';
    setTimeout(() => el.remove(), 300);
  }, 3200);
}

// ── MODAL ──────────────────────────────
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-bg')) {
    e.target.classList.remove('open');
  }
});

// ── DROPDOWN ───────────────────────────
function toggleDD(id) {
  const el = document.getElementById(id);
  el?.classList.toggle('open');
}
document.addEventListener('click', e => {
  document.querySelectorAll('.dd-wrap.open').forEach(dd => {
    if (!dd.contains(e.target)) dd.classList.remove('open');
  });
});

// ── TOGGLE ─────────────────────────────
function toggle(el) { el.classList.toggle('on'); }

// ── PASSWORD TOGGLE ────────────────────
function togglePw(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '👁' : '🙈';
}

// ── PASSWORD STRENGTH ──────────────────
function pwStrength(val, barId) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  const checks = [val.length >= 8, /[A-Z]/.test(val), /[0-9]/.test(val), /[^A-Za-z0-9]/.test(val)];
  const score = checks.filter(Boolean).length;
  const colors = ['#ef4444','#f97316','#eab308','#22c55e'];
  bar.innerHTML = [1,2,3,4].map(i =>
    `<div style="flex:1;height:3px;border-radius:2px;background:${i<=score?colors[score-1]:'var(--bg3)'};transition:all .3s"></div>`
  ).join('');
}

// ── CLIPBOARD ──────────────────────────
function copyText(text) {
  navigator.clipboard?.writeText(text).catch(() => {});
  toast('Скопировано в буфер', 'success');
}

// ── NAV ACTIVE ─────────────────────────
function setNavActive() {
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a, .nav-link').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href') || '';
    if (href && href.includes(page)) a.classList.add('active');
    if (!page && (href === 'index.html' || href === '/' || href === '')) a.classList.add('active');
  });
}

// ── TEXTAREA AUTO-RESIZE ───────────────
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 180) + 'px';
}

// ── DEMO USER ──────────────────────────
const DEMO_USER = {
  name: 'Alex Thompson',
  email: 'alex@example.com',
  plan: 'Free',
  initials: 'AT',
};

function getUser() {
  try {
    const s = sessionStorage.getItem('djase_user');
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

function setUser(u) {
  sessionStorage.setItem('djase_user', JSON.stringify(u));
}

function requireAuth() {
  const u = getUser();
  if (!u) { location.href = 'login.html'; return null; }
  return u;
}

function logout() {
  sessionStorage.removeItem('djase_user');
  location.href = 'index.html';
}

function applyUser(u) {
  if (!u) return;
  const initials = u.initials || u.name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
  document.querySelectorAll('[data-user-av]').forEach(el => el.textContent = initials);
  document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = u.name);
  document.querySelectorAll('[data-user-email]').forEach(el => el.textContent = u.email);
  document.querySelectorAll('[data-user-plan]').forEach(el => el.textContent = u.plan + ' Plan');
  document.querySelectorAll('[data-user-first]').forEach(el => el.textContent = u.name.split(' ')[0]);
}

// init on every page
document.addEventListener('DOMContentLoaded', () => {
  setNavActive();
  const u = getUser();
  if (u) applyUser(u);
});
