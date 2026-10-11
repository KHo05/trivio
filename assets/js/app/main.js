/* TRIVO app — shell, roles, routing, subscription gating */
"use strict";
const ROLES = {
  worker: { k: "roleWorker", d: "roleWorkerDesc", ico: "helmet", tint: "tint-teal", persona: { name: "Tan Ah Long", empId: "E020", site: "S1" }, nav: [] },
  sup: { k: "roleSup", d: "roleSupDesc", ico: "users", tint: "tint-amber", persona: { name: "Ahmad bin Ismail", empId: "E010", site: "S1" }, nav: ["dashboard", "attendance", "approvals", "tasks", "inventory", "settings"] },
  hr: { k: "roleHr", d: "roleHrDesc", ico: "doc", tint: "tint-blue", persona: { name: "Lim Pei Shan", empId: "E002", site: null }, nav: ["dashboard", "attendance", "approvals", "employees", "payroll", "docs", "tasks", "settings"] },
  boss: { k: "roleBoss", d: "roleBossDesc", ico: "dashboard", tint: "tint-navy", persona: { name: "Mr. Goh", empId: "E001", site: null }, nav: ["dashboard", "attendance", "approvals", "employees", "payroll", "docs", "tasks", "inventory", "fleet", "accounting", "settings"] },
};
const NAV_GROUPS = [
  { k: "navOverview", items: ["dashboard"] },
  { k: "navDaily", items: ["attendance", "approvals", "tasks"] },
  { k: "navManage", items: ["employees", "payroll", "docs", "inventory", "fleet", "accounting"] },
  { k: "navCompany", items: ["settings"] },
];

const APP = {
  role: null, route: "dashboard", state: {}, fontSize: "normal", clockTimer: null,
  get persona() { return ROLES[this.role]?.persona || { name: "—" }; },
  todayLabel() { return NOW.toLocaleDateString(LANG === "zh" ? "zh-CN" : "en-MY", { year: "numeric", month: "long", day: "numeric", weekday: "long" }); },
  /* role allowed AND module subscribed (module routes only) */
  can(route) { if (!this.role) return false; const v = VIEWS[route]; if (!v || !ROLES[this.role].nav.includes(route)) return false; return !v.mod || isOn(v.mod); },
  /* role allowed regardless of subscription — used to show locked entries to the owner */
  allowedByRole(route) { return !!(this.role && ROLES[this.role].nav.includes(route)); },
  navBadge(route) { if (route === "approvals") return pendingApprovals().length || ""; if (route === "inventory") return (pendingPurchases().length + lowStock().length) || ""; if (route === "docs") return (expiringSoon().length + DB.esign.filter((s) => s.status === "pending").length) || ""; if (route === "fleet") return idleVehicles().length || ""; if (route === "tasks") return DB.tasks.filter((x) => x.status !== "done" && daysUntil(x.due) <= 0).length || ""; return ""; },
  login(role) { this.role = role; this.route = "dashboard"; this.state = {}; try { localStorage.setItem("trivo_role", role); } catch (e) { /* ok */ } this.render(); window.scrollTo(0, 0); },
  logout() { this.role = null; this.state = {}; try { localStorage.removeItem("trivo_role"); } catch (e) { /* ok */ } this.render(); window.scrollTo(0, 0); },
  go(route) { if (!this.allowedByRole(route)) return; this.route = route; document.body.classList.remove("nav-open"); this.render(); window.scrollTo({ top: 0 }); },
  setFontSize(s) { this.fontSize = s; document.documentElement.dataset.fontsize = s; try { localStorage.setItem("trivo_font", s); } catch (e) { /* ok */ } this.render(); },

  render() {
    if (this.clockTimer) { clearInterval(this.clockTimer); this.clockTimer = null; }
    const root = document.getElementById("app");
    if (!this.role) return renderLogin(root);
    if (this.role === "worker") return renderWorker(root);
    if (!this.allowedByRole(this.route)) this.route = "dashboard";
    const view = VIEWS[this.route]; const rc = ROLES[this.role];
    const locked = view.mod && !isOn(view.mod);
    const alertCount = buildAlerts().length;
    root.innerHTML = `<div class="frame"><div class="nav-scrim" id="nav-scrim"></div>
      <aside class="sidebar"><div class="brand">${logoMark(36)}<div><div class="brand-word">TRIVO</div><div class="brand-sub">${esc(DB.company.short)}</div></div></div>
        ${NAV_GROUPS.map((g) => { const items = g.items.filter((r) => rc.nav.includes(r) && (this.role === "boss" || this.can(r))); if (!items.length) return ""; return `<div class="nav-label">${esc(t(g.k))}</div>${items.map((r) => { const v = VIEWS[r]; const lk = v.mod && !isOn(v.mod); const b = lk ? "" : this.navBadge(r); return `<button class="nav-item ${this.route === r ? "active" : ""} ${lk ? "locked" : ""}" data-go="${r}">${icon(v.ico, 19)}<span>${esc(t(v.k))}</span>${lk ? `<span class="nav-lock">${icon("lock", 15)}</span>` : b ? `<span class="nav-badge">${b}</span>` : ""}</button>`; }).join("")}`; }).join("")}
        <div class="sidebar-foot"><div class="flex" style="gap:8px;margin-bottom:10px"><span class="avatar" style="width:32px;height:32px;background:linear-gradient(160deg,#2A3B52,#16222F);font-size:.7rem">${esc(initials(this.persona.name))}</span><div style="min-width:0"><div style="font-weight:650;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(this.persona.name)}</div><div>${esc(t(rc.k))}</div></div></div><button class="btn btn-sm btn-block" id="btn-logout">${icon("logout", 14)} ${esc(t("switchRole"))}</button></div></aside>
      <div class="main"><header class="topbar"><button class="icon-btn menu-toggle" id="btn-menu" aria-label="menu">${icon("menu", 19)}</button><div><div class="topbar-title">${esc(t(view.k))}</div><div class="topbar-date">${esc(this.todayLabel())}</div></div>
        <div class="topbar-right"><div class="seg"><button data-tl="zh" class="${LANG === "zh" ? "on" : ""}">中文</button><button data-tl="en" class="${LANG === "en" ? "on" : ""}">EN</button></div><button class="icon-btn" id="btn-font" aria-label="${esc(t("fontSize"))}"><span style="font-weight:750;font-size:.9rem">${this.fontSize === "large" ? "A−" : "A+"}</span></button><button class="icon-btn" id="btn-bell" aria-label="${esc(t("notifications"))}">${icon("bell", 19)}${alertCount ? '<span class="dot"></span>' : ""}</button></div></header>
        <main class="content" id="view-root">${locked ? vLocked(view.mod) : view.r()}</main></div></div>`;
    root.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => this.go(b.dataset.go)));
    root.querySelectorAll("[data-tl]").forEach((b) => b.addEventListener("click", () => { setLang(b.dataset.tl); this.render(); }));
    root.querySelector("#btn-logout").addEventListener("click", () => this.logout());
    root.querySelector("#btn-font").addEventListener("click", () => this.setFontSize(this.fontSize === "large" ? "normal" : "large"));
    root.querySelector("#btn-bell").addEventListener("click", () => this.openNotifications());
    root.querySelector("#btn-menu").addEventListener("click", () => document.body.classList.toggle("nav-open"));
    root.querySelector("#nav-scrim").addEventListener("click", () => document.body.classList.remove("nav-open"));
    const vr = root.querySelector("#view-root");
    if (locked) wireLocked(vr); else if (view.w) view.w(vr);
  },
  openNotifications() {
    const A = buildAlerts();
    openModal({ title: esc(t("notifications")), body: A.length ? `<div class="feed">${A.map((a) => `<div class="feed-item row-click" data-ng="${a.route}"><span class="feed-ico ${a.tint}">${icon(a.icon, 16)}</span><div style="min-width:0"><div class="feed-title">${esc(a.title)}</div><div class="feed-sub">${esc(a.sub)}</div></div><span class="feed-time">${icon("chevR", 15)}</span></div>`).join("")}</div>` : `<div class="empty">${icon("check", 32)}<span>${esc(t("noAlerts"))}</span></div>`, onOpen: (ov) => ov.querySelectorAll("[data-ng]").forEach((el) => el.addEventListener("click", () => { const r = el.dataset.ng; closeModal(); if (this.allowedByRole(r)) this.go(r); })) });
  },
};

function renderLogin(root) {
  root.innerHTML = `<div class="login view-enter"><div class="login-logo">${logoMark(44)}<span class="login-word">TRIVO</span></div><p class="muted small" style="margin-top:-4px">${esc(t("tagline"))}</p>
    <h1>${esc(t("loginTitle"))}</h1><p>${esc(t("loginSub"))}</p>
    <div class="login-company">${icon("home", 15)}<span>${esc(t("demoCompany"))}: <b>${esc(DB.company.name)}</b></span></div>
    <div class="role-grid">${Object.entries(ROLES).map(([id, r]) => `<button class="role-card ${id === "worker" ? "worker" : ""}" data-role="${id}"><span class="role-ico ${r.tint}">${icon(r.ico, 22)}</span><h3>${esc(t(r.k))}</h3><p>${esc(t(r.d))}</p><span class="go">${esc(t("enter"))} ${icon("arrowR", 15)}</span></button>`).join("")}</div>
    <div class="flex" style="margin-top:26px"><div class="seg"><button data-ll="zh" class="${LANG === "zh" ? "on" : ""}">中文</button><button data-ll="en" class="${LANG === "en" ? "on" : ""}">English</button></div></div>
    <p class="login-foot">${esc(t("demoNote"))} · <a href="index.html">trivio.com</a></p></div>`;
  root.querySelectorAll("[data-role]").forEach((b) => b.addEventListener("click", () => APP.login(b.dataset.role)));
  root.querySelectorAll("[data-ll]").forEach((b) => b.addEventListener("click", () => { setLang(b.dataset.ll); renderLogin(root); }));
}

(function boot() {
  try { if (localStorage.getItem("trivo_font") === "large") { APP.fontSize = "large"; document.documentElement.dataset.fontsize = "large"; } const r = localStorage.getItem("trivo_role"); if (r && ROLES[r]) APP.role = r; } catch (e) { /* ok */ }
  const q = new URLSearchParams(location.search).get("role"); if (q && ROLES[q]) APP.role = q;
  document.documentElement.lang = LANG === "zh" ? "zh-CN" : "en";
  APP.render();
})();
