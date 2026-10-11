/* TRIVO app — worker mode (mobile-first, big buttons, offline-first) */
"use strict";
const WK = {
  offline: false,
  empId: "E020",
  get emp() { return empById(this.empId); },
  get sup() { return DB.employees.find((e) => e.site === this.emp.site && tx(e.role).match(/主管|Supervisor/)); },
};

function renderWorker(root) {
  const e = WK.emp; const a = DB.attendanceToday[e.id] || { state: "none" }; const site = siteById(e.site);
  const myTasks = DB.tasks.filter((x) => x.emp === e.id && x.status !== "done"); const mySign = DB.esign.filter((s) => s.emp === e.id && s.status === "pending");
  const recent = [...DB.queue].reverse().slice(0, 4);
  const hour = new Date().getHours();
  let clockTile;
  if (a.state === "out") clockTile = `<button class="wk-tile main done" style="color:var(--ink)" disabled><span class="wk-ico tint-green">${icon("check", 22)}</span><b>${esc(t("wkDone"))}</b><span class="sub">${a.in} – ${a.out}</span></button>`;
  else if (a.state === "in") clockTile = `<button class="wk-tile main out" data-wk="clockout"><span class="tstamp">${esc(t("wkClockedAt", { t: a.in }))}</span><span class="wk-ico">${icon("clock", 22)}</span><b>${esc(t("wkClockOut"))}</b><span class="sub">${esc(t("wkClockSub"))}</span></button>`;
  else if (a.state === "leave") clockTile = `<button class="wk-tile main done" style="color:var(--ink)" disabled><span class="wk-ico tint-blue">${icon("calendar", 22)}</span><b>${esc(t("leave"))}</b></button>`;
  else clockTile = `<button class="wk-tile main" data-wk="clockin"><span class="wk-ico">${icon("camera", 22)}</span><b>${esc(t("wkClockIn"))}</b><span class="sub">${esc(t("wkClockSub"))}</span></button>`;

  root.innerHTML = `<div class="wk view-enter">
    <div class="wk-head">${avatarHtml(e, 46)}<div><div class="wk-hi">${esc(t(hour < 12 ? "wkHello" : "wkHello", { name: e.name.split(" ").slice(-2).join(" ") }))}</div><div class="wk-sub">${esc(t("wkSite", { site: tx(site.name) }))}</div></div><span class="spacer"></span><button class="btn btn-sm" id="wk-lang" aria-label="language">${esc(t("wkLang"))}</button></div>
    <label class="wk-net ${WK.offline ? "off" : ""}">${icon(WK.offline ? "wifiOff" : "wifi", 17)}<span>${esc(WK.offline ? t("wkOfflineState") : t("wkOnline"))}</span><span class="spacer"></span><span class="small" style="font-weight:500;opacity:.75">${esc(t("wkSimulate"))}</span><span class="switch"><input type="checkbox" id="wk-off" ${WK.offline ? "checked" : ""}><span class="track"></span><span class="thumb"></span></span></label>
    <div class="wk-tiles">
      ${isOn("att") ? clockTile : ""}
      ${isOn("hr") ? `<button class="wk-tile" data-wk="leave"><span class="wk-ico tint-blue">${icon("calendar", 20)}</span><b>${esc(t("wkLeave"))}</b><span class="sub">${esc(t("wkLeaveSub"))}</span></button><button class="wk-tile" data-wk="claim"><span class="wk-ico tint-green">${icon("banknote", 20)}</span><b>${esc(t("wkClaim"))}</b><span class="sub">${esc(t("wkClaimSub"))}</span></button>` : ""}
      ${isOn("task") ? `<button class="wk-tile" data-wk="tasks">${myTasks.length ? `<span class="tbadge">${myTasks.length}</span>` : ""}<span class="wk-ico tint-amber">${icon("task", 20)}</span><b>${esc(t("wkTasks"))}</b><span class="sub">${esc(t("wkTasksSub", { n: myTasks.length }))}</span></button>` : ""}
      ${isOn("hr") ? `<button class="wk-tile" data-wk="payslip"><span class="wk-ico tint-navy">${icon("doc", 20)}</span><b>${esc(t("wkPayslip"))}</b><span class="sub">${esc(t("wkPayslipSub"))}</span></button>${mySign.length ? `<button class="wk-tile" data-wk="sign"><span class="tbadge">${mySign.length}</span><span class="wk-ico tint-teal">${icon("pen", 20)}</span><b>${esc(t("wkSign"))}</b><span class="sub">${esc(t("wkSignSub", { n: mySign.length }))}</span></button>` : ""}` : ""}
    </div>
    ${recent.length ? `<div class="wk-section">${esc(t("wkRecent"))}</div><div class="card card-pad" style="padding:4px 16px"><div class="wk-list">${recent.map((q) => `<div class="wk-item"><span class="stat-ico ${q.icon === "clock" ? "tint-green" : q.icon === "calendar" ? "tint-blue" : "tint-amber"}">${icon(q.icon, 16)}</span><div><b>${esc(tx(q.label))}</b><small>${esc(q.time)}</small></div><span class="spacer"></span><span class="queue-badge ${q.synced ? "sync" : "wait"}">${icon(q.synced ? "check" : "wifiOff", 11, 2.6)} ${esc(q.synced ? t("wkSynced") : t("wkQueued"))}</span></div>`).join("")}</div></div>` : ""}
    <div class="wk-section">${esc(t("announcements"))}</div><div class="card card-pad" style="padding:4px 16px"><div class="wk-list">${DB.announcements.map((x) => `<div class="wk-item"><span class="stat-ico tint-navy">${icon("bell", 15)}</span><div><b style="font-weight:500;font-size:.9rem">${esc(tx(x.text))}</b><small>${esc(fmtDate(x.d))}</small></div></div>`).join("")}</div></div>
    <div class="wk-foot"><button class="btn btn-sm btn-ghost" id="wk-big">${esc(t("wkBig"))} A+</button><button class="btn btn-sm btn-ghost" id="wk-switch">${icon("logout", 14)} ${esc(t("wkSwitch"))}</button></div>
  </div>`;

  const tiles = [...root.querySelectorAll(".wk-tiles .wk-tile:not(.main)")]; if (tiles.length % 2 === 1) tiles[tiles.length - 1].classList.add("wide");
  root.querySelector("#wk-off").addEventListener("change", (ev) => { WK.offline = ev.target.checked; if (!WK.offline) { const n = DB.queue.filter((q) => !q.synced).length; DB.queue.forEach((q) => { q.synced = true; }); if (n) toast(t("wkSyncToast", { n })); } APP.render(); });
  root.querySelector("#wk-lang").addEventListener("click", () => { setLang(LANG === "zh" ? "en" : "zh"); APP.render(); });
  root.querySelector("#wk-big").addEventListener("click", () => APP.setFontSize(APP.fontSize === "large" ? "normal" : "large"));
  root.querySelector("#wk-switch").addEventListener("click", () => APP.logout());
  root.querySelectorAll("[data-wk]").forEach((b) => b.addEventListener("click", () => WK_ACTIONS[b.dataset.wk]()));
}

/* label is a builder so the queue re-renders in whichever language is active */
function queueAdd(icon_, build) { const cur = LANG; const label = {}; for (const l of ["zh", "en"]) { LANG = l; label[l] = build(); } LANG = cur; DB.queue.push({ icon: icon_, label, time: timeNow(), synced: !WK.offline }); if (WK.offline) toast(t("wkOfflineToast"), "warn"); }

const WK_ACTIONS = {
  clockin() { openStamp("in"); },
  clockout() { openStamp("out"); },
  leave() {
    const e = WK.emp; let when = dOff(0), type = "wkSick";
    openModal({ title: esc(t("wkLeave")), body: `<div class="field"><label>${esc(t("wkLeaveWhen"))}</label><div class="big-choice three"><button class="on" data-when="${dOff(0)}">${esc(t("wkTodayBtn"))}</button><button data-when="${dOff(1)}">${esc(t("wkTomorrow"))}</button><button data-when="pick">${esc(t("wkPickDate"))}</button></div><input class="input" type="date" id="lv-date" style="display:none;margin-top:8px" value="${dOff(2)}"></div><div class="field"><label>${esc(t("wkLeaveType"))}</label><div class="big-choice three"><button class="on" data-type="wkSick">${esc(t("wkSick"))}</button><button data-type="wkAnnual">${esc(t("wkAnnual"))}</button><button data-type="wkEmergency">${esc(t("wkEmergency"))}</button></div></div><div class="field"><label>${esc(t("wkReason"))}</label><input class="input" id="lv-reason" placeholder="…"></div><p class="small muted">${esc(t("wkBalance", { a: (e.leave || { annual: 8, sick: 12 }).annual, m: (e.leave || { annual: 8, sick: 12 }).sick }))}</p>`,
      foot: `<button class="btn" data-close="1">${esc(t("cancel"))}</button><button class="btn btn-primary btn-lg" id="lv-ok">${esc(t("submit"))}</button>`,
      onOpen(ov) {
        const sel = (attr, cb) => ov.querySelectorAll(`[${attr}]`).forEach((b) => b.addEventListener("click", () => { ov.querySelectorAll(`[${attr}]`).forEach((x) => x.classList.toggle("on", x === b)); cb(b.getAttribute(attr)); }));
        sel("data-when", (v) => { ov.querySelector("#lv-date").style.display = v === "pick" ? "block" : "none"; when = v === "pick" ? ov.querySelector("#lv-date").value : v; });
        ov.querySelector("#lv-date").addEventListener("change", (ev) => { when = ev.target.value; });
        sel("data-type", (v) => { type = v; });
        ov.querySelector("#lv-ok").addEventListener("click", () => { const reason = ov.querySelector("#lv-reason").value.trim(); DB.approvals.unshift({ id: "A" + (200 + DB.approvals.length), kind: "leave", emp: e.id, from: when, days: 1, reason: reason || { zh: I18N.zh[type], en: I18N.en[type] }, status: "pending", queued: true }); queueAdd("calendar", () => `${t("wkLeave")} · ${t(type)} · ${fmtDate(when)}`); closeModal(); if (!WK.offline) toast(t("wkLeaveSent", { sup: WK.sup ? WK.sup.name.split(" ")[0] : "—" })); APP.render(); });
      } });
  },
  claim() {
    const e = WK.emp; let kind = "wkPetrol", shot = false;
    openModal({ title: esc(t("wkClaim")), body: `<div class="field"><label>${esc(t("wkClaimWhat"))}</label><div class="big-choice">${["wkPetrol", "wkMeal", "wkHardware", "wkMedical"].map((k, i) => `<button class="${i === 0 ? "on" : ""}" data-kind="${k}">${esc(t(k))}</button>`).join("")}</div></div><div class="field"><label>${esc(t("wkAmount"))}</label><input class="input amount-input" type="number" inputmode="decimal" id="cl-amt" value="45" min="1"></div><button class="btn btn-block btn-lg" id="cl-shot">${icon("camera", 20)} <span>${esc(t("wkReceipt"))}</span></button>`,
      foot: `<button class="btn" data-close="1">${esc(t("cancel"))}</button><button class="btn btn-primary btn-lg" id="cl-ok">${esc(t("submit"))}</button>`,
      onOpen(ov) {
        ov.querySelectorAll("[data-kind]").forEach((b) => b.addEventListener("click", () => { ov.querySelectorAll("[data-kind]").forEach((x) => x.classList.toggle("on", x === b)); kind = b.dataset.kind; }));
        ov.querySelector("#cl-shot").addEventListener("click", (ev) => { shot = true; const b = ev.currentTarget; b.classList.add("btn-success"); b.innerHTML = `${icon("check", 20)} <span>${esc(t("wkReceiptTaken"))}</span>`; });
        ov.querySelector("#cl-ok").addEventListener("click", () => { const amt = Math.max(1, parseFloat(ov.querySelector("#cl-amt").value) || 1); DB.approvals.unshift({ id: "A" + (200 + DB.approvals.length), kind: "claim", emp: e.id, from: dOff(0), amount: amt, reason: { zh: I18N.zh[kind] + (shot ? "（有收据）" : ""), en: I18N.en[kind] + (shot ? " (receipt attached)" : "") }, status: "pending", queued: true }); queueAdd("banknote", () => `${t("wkClaim")} · ${t(kind)} · ${fmtMoney(amt)}`); closeModal(); if (!WK.offline) toast(t("wkClaimSent", { a: fmtNum(amt) })); APP.render(); });
      } });
  },
  tasks() {
    const e = WK.emp; const mine = DB.tasks.filter((x) => x.emp === e.id && x.status !== "done");
    openModal({ title: esc(t("wkTasks")), body: mine.length ? `<div class="wk-list">${mine.map((x) => `<div class="wk-item" style="align-items:flex-start"><span class="stat-ico ${x.pri === "high" ? "tint-red" : "tint-amber"}">${icon("task", 16)}</span><div style="flex:1"><b>${esc(tx(x.title))}</b><small>${esc(tx(siteById(x.site).name))} · ${esc(t("due"))} ${esc(fmtDate(x.due))}</small><div style="margin-top:8px">${x.submitted ? badge(t("esignPending"), "amber") : `<button class="btn btn-sm btn-primary" data-tsub="${x.id}">${icon("camera", 14)} ${esc(t("taskSubmit"))}</button>`}</div></div></div>`).join("")}</div>` : `<div class="empty">${icon("check", 32)}<span>${esc(t("wkNoTasks"))}</span></div>`, foot: `<button class="btn" data-close="1">${esc(t("close"))}</button>`, onOpen(ov) { ov.querySelectorAll("[data-tsub]").forEach((b) => b.addEventListener("click", () => { const x = DB.tasks.find((y) => y.id === b.dataset.tsub); x.submitted = true; x.status = "doing"; queueAdd("task", () => `${t("taskSubmit")} · ${tx(x.title)}`); closeModal(); if (!WK.offline) toast(t("taskSubmitToast", { t: tx(x.title) })); APP.render(); })); } });
  },
  payslip() { openPayslip(WK.empId); },
  sign() {
    const s = DB.esign.find((x) => x.emp === WK.empId && x.status === "pending"); if (!s) return;
    openModal({ title: esc(t("signDoc")), body: `<div class="doc" style="border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:14px;background:var(--surface-2)"><div class="doc-head" style="margin-bottom:10px"><strong>${esc(DB.company.name)}</strong><span class="small muted">${esc(fmtDate(s.sent))}</span></div><h4 style="margin-bottom:8px">${esc(tx(s.doc))}</h4><p class="small" style="color:var(--ink-2)">${LANG === "zh" ? `致 ${WK.emp.name}：鉴于您过去一年的表现，公司决定自下月起将您的日薪调整为 RM ${WK.emp.wage + 10}。请签名确认。` : `To ${WK.emp.name}: in recognition of your performance over the past year, your daily rate will be adjusted to RM ${WK.emp.wage + 10} from next month. Please sign to acknowledge.`}</p></div><label class="small muted" style="display:block;margin-bottom:6px">${esc(t("signHere"))}</label><canvas class="sig-pad" id="sig"></canvas><div class="flex" style="margin-top:8px"><button class="btn btn-sm btn-ghost" id="sig-clear">${esc(t("clearSig"))}</button></div>`,
      foot: `<button class="btn" data-close="1">${esc(t("cancel"))}</button><button class="btn btn-primary btn-lg" id="sig-ok" disabled>${icon("pen", 16)} ${esc(t("signConfirm"))}</button>`,
      onOpen(ov) {
        const c = ov.querySelector("#sig"); const ctx = c.getContext("2d"); const fit = () => { const r = c.getBoundingClientRect(); c.width = r.width * devicePixelRatio; c.height = r.height * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio); ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#16222F"; }; fit();
        let drawing = false, drew = false; const pos = (ev) => { const r = c.getBoundingClientRect(); const p = ev.touches ? ev.touches[0] : ev; return [p.clientX - r.left, p.clientY - r.top]; };
        const start = (ev) => { drawing = true; const [x, y] = pos(ev); ctx.beginPath(); ctx.moveTo(x, y); ev.preventDefault(); };
        const move = (ev) => { if (!drawing) return; const [x, y] = pos(ev); ctx.lineTo(x, y); ctx.stroke(); drew = true; ov.querySelector("#sig-ok").disabled = false; ev.preventDefault(); };
        const end = () => { drawing = false; };
        c.addEventListener("pointerdown", start); c.addEventListener("pointermove", move); window.addEventListener("pointerup", end);
        ov.querySelector("#sig-clear").addEventListener("click", () => { ctx.clearRect(0, 0, c.width, c.height); drew = false; ov.querySelector("#sig-ok").disabled = true; });
        ov.querySelector("#sig-ok").addEventListener("click", () => { if (!drew) return; s.status = "signed"; s.signedAt = dOff(0); closeModal(); toast(t("signedToast", { doc: tx(s.doc) })); APP.render(); });
      } });
  },
};

function openStamp(dir) {
  const e = WK.emp;
  openModal({ title: esc(dir === "in" ? t("wkClockIn") : t("wkClockOut")), body: `${stampCard(e.name, dir === "in" ? t("wkClockIn") : t("wkClockOut"))}<div class="flex" style="margin-top:12px;justify-content:center"><button class="btn btn-sm btn-ghost">${icon("camera", 15)} ${esc(t("wkRetake"))}</button></div>`,
    foot: `<button class="btn" data-close="1">${esc(t("cancel"))}</button><button class="btn btn-accent btn-lg" id="st-ok">${icon("check", 18)} ${esc(dir === "in" ? t("wkConfirmIn") : t("wkConfirmOut"))}</button>`,
    onOpen(ov) {
      const tick = setInterval(() => { const k = document.getElementById("stamp-clock"); if (k) k.textContent = timeNow(); else clearInterval(tick); }, 1000);
      ov.querySelector("#st-ok").addEventListener("click", () => { const now = timeNow(); if (dir === "in") { DB.attendanceToday[e.id] = { state: "in", in: now }; queueAdd("clock", () => `${t("wkClockIn")} · ${now}`); closeModal(); if (!WK.offline) toast(t("wkInToast", { t: now })); } else { const a = DB.attendanceToday[e.id]; a.state = "out"; a.out = now; queueAdd("clock", () => `${t("wkClockOut")} · ${now}`); closeModal(); if (!WK.offline) toast(t("wkOutToast", { t: now, h: calcHours(a.in, a.out) })); } APP.render(); });
    } });
}
