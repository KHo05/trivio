/* TRIVO app — UI primitives */
"use strict";
const ICONS = {
  dashboard: '<rect x="3" y="3" width="7.5" height="9" rx="2"/><rect x="13.5" y="3" width="7.5" height="5.5" rx="2"/><rect x="13.5" y="12" width="7.5" height="9" rx="2"/><rect x="3" y="15.5" width="7.5" height="5.5" rx="2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.4 3.4-5.5 6.5-5.5s5.7 2.1 6.5 5.5"/><path d="M16 5.2a3.5 3.5 0 0 1 0 5.6M17.8 14.9c1.9.8 3.2 2.6 3.7 5.1"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3 10.5h18"/><path d="m9 15.5 2 2 4-4"/>',
  banknote: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.8"/><path d="M6 9.5v.01M18 14.5v.01"/>',
  task: '<path d="M9 11.5 4.6 16l-2.1-2"/><path d="M9 5.5 4.6 10 2.5 8"/><path d="M13 7h8.5M13 15h8.5"/>',
  box: '<path d="m12 2.8 8.5 4.6v9.2L12 21.2l-8.5-4.6V7.4z"/><path d="m3.7 7.5 8.3 4.5 8.3-4.5M12 12v9"/>',
  truck: '<path d="M2.5 6.5h12v10h-12z"/><path d="M14.5 10h4l2.5 3.5v3h-6.5"/><circle cx="6.8" cy="17.5" r="1.9"/><circle cx="17.2" cy="17.5" r="1.9"/>',
  doc: '<path d="M6 2.5h8L19 7.5v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z"/><path d="M13.5 2.5v5.5H19M8 13h8M8 17h5"/>',
  folder: '<path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h4L12 6.5h6.5A2.5 2.5 0 0 1 21 9v8.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M19 12a7 7 0 0 0-.14-1.4l2-1.55-2-3.46-2.36.95A7 7 0 0 0 14 5.1L13.7 2.6h-3.4L10 5.1a7 7 0 0 0-2.5 1.44l-2.36-.95-2 3.46 2 1.55A7 7 0 0 0 5 12c0 .48.05.94.14 1.4l-2 1.55 2 3.46 2.36-.95A7 7 0 0 0 10 18.9l.3 2.5h3.4l.3-2.5a7 7 0 0 0 2.5-1.44l2.36.95 2-3.46-2-1.55c.09-.46.14-.92.14-1.4z"/>',
  bell: '<path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6"/><path d="M10 19a2.2 2.2 0 0 0 4 0"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-3.8-3.8"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  alert: '<path d="M12 3.5 22 20H2z"/><path d="M12 10v4.5M12 17.5v.01"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  download: '<path d="M12 3v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4 18.5h16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  phone: '<path d="M5 4h4l1.8 4.4-2.3 1.8a13 13 0 0 0 5.3 5.3l1.8-2.3L20 15v4a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3 6.2 2 2 0 0 1 5 4z"/>',
  chevR: '<path d="m9 5.5 6.5 6.5L9 18.5"/>',
  wrench: '<path d="M14.5 6.5a4.5 4.5 0 0 0-6.1 5.3L3 17.2a2 2 0 0 0 2.8 2.8l5.4-5.4a4.5 4.5 0 0 0 5.3-6.1L13.6 11l-2.6-2.6z"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  print: '<path d="M7 8V3.5h10V8"/><rect x="3.5" y="8" width="17" height="9" rx="2"/><path d="M7 14h10v6.5H7z"/>',
  arrowR: '<path d="M4 12h15M14 6.5 19.5 12 14 17.5"/>',
  logout: '<path d="M9 4H5.5A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20H9"/><path d="M15.5 8 20 12l-4.5 4M20 12H9.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  home: '<path d="m4 11 8-7 8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-6h4v6"/>',
  camera: '<path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2l1.5-2h4l1.5 2h2A2.5 2.5 0 0 1 20 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.5"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  scan: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><path d="M7 12h10"/>',
  helmet: '<path d="M5 14.5a7 7 0 0 1 4.2-6.4V11h5.6V8.1a7 7 0 0 1 4.2 6.4"/><path d="M2.8 14.5h18.4v2.1a1.3 1.3 0 0 1-1.3 1.3H4.1a1.3 1.3 0 0 1-1.3-1.3z"/><path d="M9.2 8.1V6a1.4 1.4 0 0 1 1.4-1.4h2.8A1.4 1.4 0 0 1 14.8 6v2.1"/>',
  pen: '<path d="m4 20 4.5-1 10-10a2 2 0 0 0 0-2.8l-.7-.7a2 2 0 0 0-2.8 0l-10 10z"/><path d="m13.5 6.5 4 4"/>',
  wifiOff: '<path d="M2 8.5a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0"/><path d="M12 19.5v.01"/><path d="m3 3 18 18"/>',
  wifi: '<path d="M2 8.5a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0"/><path d="M12 19.5v.01"/>',
  send: '<path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5z"/>',
};
function icon(name, size = 20, sw = 1.8) { return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`; }
function logoMark(size = 28) { return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="lg${size}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#19D3B4"/><stop offset="1" stop-color="#4D7CF7"/></linearGradient></defs><rect width="64" height="64" rx="15" fill="#16222F"/><path d="M14 42V18a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H28" fill="none" stroke="url(#lg${size})" stroke-width="3" stroke-linecap="round"/><path d="M24 25h16M32 25v16" fill="none" stroke="url(#lg${size})" stroke-width="4.4" stroke-linecap="round"/></svg>`; }
function esc(s) { return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

let toastTimer = null;
function toast(msg, kind = "ok") {
  const root = document.getElementById("toast-root"); root.querySelectorAll(".toast").forEach((e) => e.remove());
  const el = document.createElement("div"); el.className = `toast ${kind}`;
  el.innerHTML = `${icon(kind === "warn" ? "alert" : "check", 20)}<span>${esc(msg)}</span>`; root.appendChild(el);
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 320); }, 3600);
}
function openModal({ title, body, foot = "", wide = false, onOpen }) {
  const root = document.getElementById("modal-root");
  root.innerHTML = `<div class="modal-overlay"><div class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true" aria-label="${esc(title)}">
    <div class="modal-head"><h3>${title}</h3><button class="icon-btn spacer" data-close="1" aria-label="${esc(t("close"))}" style="width:38px;height:38px">${icon("x", 18)}</button></div>
    <div class="modal-body">${body}</div>${foot ? `<div class="modal-foot">${foot}</div>` : ""}</div></div>`;
  const ov = root.firstElementChild;
  let downOnBackdrop = false;
  ov.addEventListener("pointerdown", (e) => { downOnBackdrop = e.target === ov; });
  ov.addEventListener("click", (e) => { if ((e.target === ov && downOnBackdrop) || e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", escClose);
  if (onOpen) onOpen(ov);
}
function escClose(e) { if (e.key === "Escape") closeModal(); }
function closeModal() { document.getElementById("modal-root").innerHTML = ""; document.removeEventListener("keydown", escClose); }

function shade(hex, pct) { const n = parseInt(hex.slice(1), 16); const c = (v) => Math.min(255, Math.max(0, v + Math.round(2.55 * pct))); const r = c(n >> 16), g = c((n >> 8) & 255), b = c(n & 255); return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`; }
function initials(name) { return name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase(); }
function avatarHtml(emp, size = 36) { return `<span class="avatar" style="width:${size}px;height:${size}px;background:linear-gradient(160deg,${emp.color},${shade(emp.color, -18)})">${esc(initials(emp.name))}</span>`; }
function personCell(emp, sub) { return `<div class="person">${avatarHtml(emp)}<div><div class="person-name">${esc(emp.name)}</div><div class="person-sub">${esc(sub ?? tx(emp.role))}</div></div></div>`; }
function badge(text, color) { return `<span class="badge b-${color}">${esc(text)}</span>`; }
function daysBadge(iso) { const d = daysUntil(iso); if (d < 0) return `<span class="days-left bad">${t("daysOver", { n: -d })}</span>`; if (d <= 30) return `<span class="days-left warn">${t("daysLeft", { n: d })}</span>`; return `<span class="days-left ok">${t("daysLeft", { n: d })}</span>`; }
function prBadge(s) { const m = { pending: ["prPending", "amber"], approved: ["prApproved", "blue"], ordered: ["prOrdered", "teal"], delivering: ["prDelivering", "amber"], delivered: ["prDelivered", "green"] }; const [k, c] = m[s] || ["prPending", "gray"]; return badge(t(k), c); }
function calcHours(a, b) { const [h1, m1] = a.split(":").map(Number); const [h2, m2] = b.split(":").map(Number); return Math.max(0, Math.round(((h2 * 60 + m2) - (h1 * 60 + m1)) / 6) / 10 - 1); }
function downloadCsv(filename, rows) {
  const csv = "﻿" + rows.map((r) => r.map((c) => { const s = String(c ?? ""); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(",")).join("\r\n");
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); a.download = filename; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 400);
}
function stampCard(name, label) {
  const d = NOW.toLocaleDateString(LANG === "zh" ? "zh-CN" : "en-MY", { year: "numeric", month: "long", day: "numeric", weekday: "short" });
  return `<div class="stamp"><span class="stamp-verify">${icon("check", 11, 3)} ${esc(t("wkVerified"))}</span><div class="stamp-map"></div>
    <div class="stamp-time"><b id="stamp-clock">${timeNow()}</b><span>${esc(label)} · ${esc(name)}</span></div>
    <div class="stamp-meta">${esc(d)}<br>Persiaran Bayan Indah, 11900 Bayan Lepas, Pulau Pinang<br>5.3315°N, 100.3087°E</div></div>`;
}
