/* ============================================================
   TRIVO landing v2 — deck engine, i18n, modules, pick & pay, FAQ
   ============================================================ */
"use strict";

/* ---------------- i18n ---------------- */
const L = {
  zh: {
    nav_modules: "产品模块", nav_gating: "按需订阅", nav_workers: "给一线员工", nav_pricing: "价格", nav_faq: "常见问题", nav_demo: "体验演示", cue: "滚动",
    hero_eyebrow: "为马来西亚中小企业打造", hero_h1: "一个团队，<br><span class=\"grad-text\">一个系统。</span>",
    hero_sub: "考勤、人事工资、任务、库存采购、车队机械 — 全部放进同一个 Trivo。需要哪个模块，就开哪个，一个价钱一目了然。",
    hero_cta1: "打开互动演示", hero_cta2: "看看怎么按需订阅", hero_p1: "不用装 App，手机打开就能用", hero_p2: "中文 · English · BM", hero_p3: "工地没网也能打卡",
    ph_hi: "早上好，阿龙", ph_sub: "Bayan Lepas 二期工地", ph_clock: "打卡上班", ph_clock_sub: "拍照 + 定位，一按完成", ph_leave: "请假", ph_leave_sub: "两步提交", ph_claim: "报销", ph_claim_sub: "拍收据就好", ph_today: "今天",
    fc1: "阿末 已打卡 · 07:02", fc2: "水泥库存低 — 建议补货", fc3: "工资单已生成 · 11 人",
    st1: "个系统，替代一堆 Excel 和群组", st2: "个模块，按需订阅", st3: "步内完成打卡、请假、报销", st4: "核心平台，免费开始",
    mod_eyebrow: "产品模块", mod_h2: "生意的每一块，都有自己的位子", mod_sub: "每个模块独立订阅、独立好用，合在一起就是一个完整的系统。数据只输入一次，考勤自动算进工资，采购自动变成账目。",
    gate_eyebrow: "按需订阅", gate_sub_m: "没订阅的模块不会出现在你员工的系统里 — 不收费，也不碍眼。试试开关，下面的预览就是你公司会看到的样子。", swipe_hint: "左右滑动查看全部模块", mnav_wa: "WhatsApp 我们", mcta_demo: "打开互动演示", gate_h2: "只付你用的，界面也只显示你开的", gate_sub: "没订阅的模块不会出现在你员工的系统里 — 不收费，也不碍眼。试试下面的开关，右边就是你公司会看到的样子。",
    gate_pick: "选你需要的模块", gate_pick_sub: "随时可以加，随时可以停。", gate_company: "你的公司", gate_core: "核心平台（免费）",
    gate_mods: "{n} 个模块 × RM 59", gate_cap: "4 个起封顶 · Trivo One", gate_per: "/ 月 · 整个团队", gate_note: "示例价格 · 适用 50 人以下团队", gate_none: "还没开任何模块 — 左边选一个试试",
    gp_att: "今日出勤", gp_hr: "待审批", gp_task: "进行中任务", gp_inv: "低库存材料", gp_fleet: "车辆运作中", gp_acc: "本月未收款", gp_dash: "工作台",
    al_att: "2 人未打卡 — Tan, Sojib", al_fleet: "PLW 8023 怠速 26 分钟", al_inv: "水泥低于最低库存", al_hr: "3 项请假 / 报销待批", al_acc: "INV-0930 逾期 9 天", al_task: "1 项任务今天到期",
    wk_eyebrow: "给一线员工的设计", wk_h2: "工地的大哥也能一秒上手", wk_sub: "系统做得再强，员工不用就是零。Trivo 的员工端只有几个大按钮：上班、请假、报销。字大、按钮大、没有废话。",
    wk1_t: "没网络？照样打卡", wk1_p: "工地信号差是常态。打卡先存在手机里，一有网络自动补传，一条记录都不会丢。", wk2_t: "不需要 NFC，不需要新设备", wk2_p: "拍一张带时间、日期、地点水印的照片就是出勤证明。任何一台普通手机都做得到。", wk3_t: "主管一眼看完全场", wk3_p: "谁到了、谁请假、谁申请加班 — 主管手机上一排看完，一键批准，不用再追着问。",
    stamp_verified: "已验证出勤", stamp_in: "上班打卡 · Ah Long", stamp_date: "2026年10月12日 · 星期一",
    step_eyebrow: "开始使用", step_h2: "当天就能用起来", step_sub: "不用换掉现有的 SQL 或 Excel — 先跟它们并行，觉得顺了再慢慢交过来。",
    s1_t: "选模块", s1_p: "从一个模块开始也行。很多客户先开考勤，第二个月才加工资和库存。", s2_t: "导入员工名单", s2_p: "把现有的 Excel 名单发给我们，当天帮你设置好。每个员工收到一条 WhatsApp 链接就能登录。", s3_t: "开工", s3_p: "第一个月免费试用，我们陪你跑完第一轮工资。不满意，数据导出还给你，不绑约。",
    pr_eyebrow: "价格", pr_h2: "简单到可以心算", pr_sub: "按模块、按月收费，整个团队一个价，不按人头。开到第四个模块起自动封顶 RM 199。先免费试用一个月。",
    p1_name: "核心平台", p1_for: "工作台 + 员工名单 + 公告，先用起来", p1_f1: "公司工作台与提醒", p1_f2: "员工资料与证件到期提醒", p1_f3: "中文 / English / BM",
    p2_name: "单个模块", p2_for: "1 到 3 个模块，需要哪个开哪个", p2_mo: "/ 模块 / 月", p2_f1: "六个模块任选", p2_f2: "不按人头收费", p2_f3: "WhatsApp 支持，讲人话",
    p3_pop: "最划算", p3_for: "4 个模块起自动封顶 — 全部六个也是这个价", p3_f1: "六个模块全开 + 优先支持", p3_f2: "帮你导入现有 Excel / SQL 数据", p3_f3: "陪跑第一轮工资与 e-Invoice", p3_cta: "免费试用一个月",
    p_mo: "/ 月", p_mo2: "/ 月", p_try: "先试演示", p_talk: "聊一聊", pr_foot: "示例价格，正式价格以报价单为准 · 适合 50 人以下团队，更大团队请联系我们",
    faq_h2: "老板们最常问的", fin_h2: "把生意放进一个系统", fin_sub: "十五分钟，我们用你公司的例子走一遍 Trivo。不满意就当交个朋友。", fin_wa: "WhatsApp 我们", fin_demo: "先自己玩玩演示",
    foot_tag: "One team, one system. 由真正经营建筑与贸易生意的团队，在槟城打造。", foot_product: "产品", foot_contact: "联系", foot_demo_note: "演示网站 · 内容与价格仅供展示",
  },
  en: {
    nav_modules: "Modules", nav_gating: "Pick & pay", nav_workers: "For crews", nav_pricing: "Pricing", nav_faq: "FAQ", nav_demo: "Open demo", cue: "Scroll",
    hero_eyebrow: "Built for Malaysian SMEs", hero_h1: "One team,<br><span class=\"grad-text\">one system.</span>",
    hero_sub: "Attendance, HR & payroll, tasks, inventory & purchasing, fleet & machinery — all in one Trivo. Switch on only the modules you need, at one price you can explain in a sentence.",
    hero_cta1: "Open the live demo", hero_cta2: "See pick-and-pay", hero_p1: "No app install — runs in the browser", hero_p2: "中文 · English · BM", hero_p3: "Clocks in even with no site signal",
    ph_hi: "Morning, Ah Long", ph_sub: "Bayan Lepas Phase 2 site", ph_clock: "Clock in", ph_clock_sub: "Photo + GPS, one tap", ph_leave: "Leave", ph_leave_sub: "Two taps", ph_claim: "Claim", ph_claim_sub: "Snap the receipt", ph_today: "Today",
    fc1: "Ahmad clocked in · 07:02", fc2: "Cement stock low — restock", fc3: "Payslips generated · 11 staff",
    st1: "system instead of scattered Excel & chats", st2: "modules, subscribe to what you need", st3: "taps to clock in, apply leave, claim", st4: "core platform, start free",
    mod_eyebrow: "Modules", mod_h2: "Every part of the business has its place", mod_sub: "Each module works on its own and they click together into one system. Enter data once: attendance flows into payroll, purchases flow into the books.",
    gate_eyebrow: "Pick & pay", gate_sub_m: "Modules you haven't subscribed to never appear in your team's app. No charge, no clutter. Flip a switch — the preview below is what your company sees.", swipe_hint: "Swipe to see all modules", mnav_wa: "WhatsApp us", mcta_demo: "Open the interactive demo", gate_h2: "Pay only for what you use — and see only what you pay for", gate_sub: "Modules you haven't subscribed to never appear in your team's app. No charge, no clutter. Try the switches — the right side is exactly what your company would see.",
    gate_pick: "Choose your modules", gate_pick_sub: "Add or stop any month.", gate_company: "Your company", gate_core: "Core platform (free)",
    gate_mods: "{n} modules × RM 59", gate_cap: "Capped from 4 · Trivo One", gate_per: "/ month · whole team", gate_note: "Sample pricing · teams up to 50 people", gate_none: "No modules on yet — flip a switch on the left",
    gp_att: "Attendance today", gp_hr: "Awaiting approval", gp_task: "Open tasks", gp_inv: "Low-stock items", gp_fleet: "Vehicles active", gp_acc: "Unpaid invoices", gp_dash: "Dashboard",
    al_att: "2 not clocked in — Tan, Sojib", al_fleet: "PLW 8023 idling 26 min", al_inv: "Cement below minimum stock", al_hr: "3 leave / claims to approve", al_acc: "INV-0930 overdue 9 days", al_task: "1 task due today",
    wk_eyebrow: "Designed for the crew", wk_h2: "Easy enough for the uncles on site", wk_sub: "The strongest system is worth nothing if the crew won't use it. The Trivo worker view is a few big buttons: clock in, leave, claim. Big text, big targets, nothing extra.",
    wk1_t: "No signal? Still clocks in", wk1_p: "Site coverage is patchy — that's normal. Records save on the phone first and upload themselves when signal returns. Nothing gets lost.", wk2_t: "No NFC, no new hardware", wk2_p: "A photo stamped with time, date and location is the attendance proof. Any ordinary phone can do it.", wk3_t: "Supervisors see the whole site at a glance", wk3_p: "Who's in, who's on leave, who applied for OT — one list on the supervisor's phone, approved in one tap.",
    stamp_verified: "Verified attendance", stamp_in: "Clock-in · Ah Long", stamp_date: "Mon, 12 Oct 2026",
    step_eyebrow: "Getting started", step_h2: "Running on day one", step_sub: "No need to rip out SQL or Excel — run Trivo alongside them and hand things over when you're ready.",
    s1_t: "Pick modules", s1_p: "Starting with one is fine. Many companies start with attendance and add payroll and inventory a month later.", s2_t: "Import your staff list", s2_p: "Send us your existing Excel list and we set it up the same day. Every employee gets a WhatsApp link to log in.", s3_t: "Start work", s3_p: "First month free. We run the first payroll cycle with you. Not happy? Your data is exported back to you — no lock-in.",
    pr_eyebrow: "Pricing", pr_h2: "Simple enough to do in your head", pr_sub: "Per module, per month, one price for the whole team — never per head. From the fourth module on, the bill is capped at RM 199. First month free.",
    p1_name: "Core platform", p1_for: "Dashboard + staff records + announcements", p1_f1: "Company dashboard & alerts", p1_f2: "Staff records with document expiry reminders", p1_f3: "中文 / English / BM",
    p2_name: "Single modules", p2_for: "1 to 3 modules — switch on what you need", p2_mo: "/ module / mo", p2_f1: "Any of the six modules", p2_f2: "Never per-head pricing", p2_f3: "WhatsApp support, plain words",
    p3_pop: "Best value", p3_for: "Capped automatically from 4 modules — all six for the same price", p3_f1: "All six modules + priority support", p3_f2: "We import your Excel / SQL data", p3_f3: "First payroll & e-Invoice run, together", p3_cta: "Start free month",
    p_mo: "/ mo", p_mo2: "/ mo", p_try: "Try the demo", p_talk: "Talk to us", pr_foot: "Sample pricing — final pricing by quotation · Teams up to 50; larger teams, talk to us",
    faq_h2: "What owners ask us", fin_h2: "Put the business in one system", fin_sub: "Fifteen minutes. We'll walk through Trivo using your own company's example. Worst case, we made a friend.", fin_wa: "WhatsApp us", fin_demo: "Play with the demo first",
    foot_tag: "One team, one system. Built in Penang by people who run construction and trading businesses themselves.", foot_product: "Product", foot_contact: "Contact", foot_demo_note: "Demo website · content and prices for illustration",
  },
};
const PAGE_LABELS = { hero: { zh: "首页", en: "Home" }, modules: { zh: "产品模块", en: "Modules" }, gating: { zh: "按需订阅", en: "Pick & pay" }, workers: { zh: "给一线员工", en: "For crews" }, pricing: { zh: "价格", en: "Pricing" }, faq: { zh: "常见问题", en: "FAQ" }, contact: { zh: "联系", en: "Contact" } };

/* custom line glyphs — drawn, not icon-library */
const GLYPH = {
  att: '<circle cx="26" cy="26" r="19"/><path d="M26 7v4M26 41v4M7 26h4M41 26h4M12.6 12.6l2.8 2.8M36.6 36.6l2.8 2.8M39.4 12.6l-2.8 2.8M15.4 36.6l-2.8 2.8" stroke-width="1.3"/><path d="M26 15v11l7 5" stroke-width="2"/><circle cx="26" cy="26" r="1.8" fill="currentColor" stroke="none"/><circle cx="43" cy="9" r="6" fill="#0D1522"/><path d="m40.5 9 1.8 1.8 3.2-3.4" stroke-width="1.6"/>',
  hr: '<rect x="5" y="11" width="30" height="22" rx="4"/><circle cx="14" cy="20" r="3.4"/><path d="M8.5 29c.6-2.8 2.9-4.5 5.5-4.5s4.9 1.7 5.5 4.5"/><path d="M23 18h8M23 23h8M23 28h5"/><rect x="17" y="21" width="30" height="22" rx="4" fill="#0D1522"/><path d="M22 30h20M22 35h20M22 40h11" stroke-width="1.3"/><circle cx="42" cy="26" r="2.4" fill="currentColor" stroke="none"/>',
  task: '<path d="M8 12h4l2 2 4-4" stroke-width="1.8"/><path d="M8 25h4l2 2 4-4" stroke-width="1.8"/><rect x="8" y="34" width="8" height="8" rx="2"/><path d="M24 12h20M24 25h20M24 38h14" stroke-width="1.6"/><path d="M40 33l5 5-5 5" stroke-width="1.6"/>',
  inv: '<path d="M26 5 42 14v18L26 41 10 32V14z"/><path d="M10 14l16 9 16-9M26 23v18"/><path d="M18 9.5l16 9" stroke-width="1.2" stroke-dasharray="2 3"/><rect x="3" y="36" width="22" height="10" rx="2" fill="#0D1522"/><path d="M6 39v4M9 39v4M12 39v4M15 39v4M18 39v4M22 39v4" stroke-width="1.2"/>',
  fleet: '<path d="M4 31V14a3 3 0 0 1 3-3h21v20"/><path d="M28 17h9l7 7v7H28z"/><circle cx="12" cy="33" r="4.5" fill="#0D1522"/><circle cx="37" cy="33" r="4.5" fill="#0D1522"/><path d="M2 20h8M0 25h6" stroke-width="1.4"/><circle cx="43" cy="8" r="5.5" fill="#0D1522"/><path d="M43 5.5V8l1.6 1.4" stroke-width="1.5"/>',
  acc: '<path d="M11 6h20l9 9v27a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z"/><path d="M31 6v9h9"/><path d="M14 22h16M14 28h16M14 34h9" stroke-width="1.4"/><circle cx="37" cy="35" r="8" fill="#0D1522"/><path d="M34.5 35h5M37 31.5v7M34.5 37.5h5" stroke-width="1.4"/>',
};
const MODULES = [
  { id: "att", price: 59, zh: { name: "考勤打卡", desc: "拍照 + 定位打卡，主管点名，自动算工时。", f: ["时间地点水印照片", "没网先存、有网补传", "迟到缺勤一眼看出"] }, en: { name: "Attendance", desc: "Photo + GPS clock-in, roll call, hours counted automatically.", f: ["Time & location stamped photos", "Offline-first, auto re-upload", "Lates and absences at a glance"] } },
  { id: "hr", price: 59, zh: { name: "人事与工资", desc: "请假报销审批，EPF/SOCSO 自动扣，工资单一键发。", f: ["请假 · 加班 · 报销流程", "EPF · SOCSO · EIS · PCB", "工资单与 EA 表格"] }, en: { name: "HR & Payroll", desc: "Leave and claim approvals, EPF/SOCSO auto-deducted, payslips in one click.", f: ["Leave · OT · claims workflow", "EPF · SOCSO · EIS · PCB", "Payslips & EA forms"] } },
  { id: "task", price: 59, zh: { name: "任务与工单", desc: "派工、跟进、拍照交差，一条 WhatsApp 变成一张工单。", f: ["指派与截止日期", "拍照 + 备注交差", "部门工单一键转发"] }, en: { name: "Tasks & Jobs", desc: "Assign, follow up, submit with a photo. One WhatsApp message becomes a job ticket.", f: ["Assignments & deadlines", "Photo + note submission", "One-tap department tickets"] } },
  { id: "inv", price: 59, zh: { name: "库存与采购", desc: "手机扫码出入库，低库存提醒，申请到收货一条线。", f: ["扫码 / 拍照记录", "最低库存自动提醒", "采购申请 → 批准 → 收货"] }, en: { name: "Inventory & Purchasing", desc: "Scan in and out with a phone, low-stock alerts, request-to-receipt in one line.", f: ["Barcode / photo logging", "Low-stock auto alerts", "Request → approve → receive"] } },
  { id: "fleet", price: 59, zh: { name: "车队与机械", desc: "GPS 实时定位、怠速提醒、保养路税保险到期提醒。", f: ["对接现有 GPS 设备", "怠速超时自动提醒", "路税 · 保险 · 保养日历"] }, en: { name: "Fleet & Machinery", desc: "Live GPS, idle alerts, service and road tax reminders.", f: ["Works with existing GPS units", "Idle-too-long auto alerts", "Road tax · insurance · service calendar"] } },
  { id: "acc", price: 59, zh: { name: "账务", desc: "报价、发票、LHDN e-Invoice，和采购记录自动对上。", f: ["报价单 → 发票一键转", "MyInvois 电子发票", "SST 自动计算"] }, en: { name: "Accounting", desc: "Quotes, invoices and LHDN e-Invoice, matched to purchasing automatically.", f: ["Quote → invoice in one tap", "MyInvois e-Invoice", "SST computed for you"] } },
];
const CAP = 199;
const FAQS = [
  { zh: ["我的员工年纪大、不太会用手机，怎么办？", "员工端只有几个大按钮，中文、English、BM 都有，字体可以调大。实在不行，主管也可以替整队人点名 — 系统两条路都留着。"], en: ["My workers are older and not good with phones.", "The worker view is a few big buttons, in 中文, English and BM, with adjustable large text. And if that still fails, the supervisor can roll-call the whole crew instead — both paths are built in."] },
  { zh: ["工地网络很差，记录会不会丢？", "不会。打卡和提交先存在手机里，有网络时自动补传。你会看到每条记录是「已同步」还是「等待上传」，清清楚楚。"], en: ["Site internet is terrible. Will records get lost?", "No. Clock-ins and submissions save to the phone first and upload automatically when signal returns. Every record shows clearly whether it's synced or waiting."] },
  { zh: ["我已经在用 SQL / Excel，要全部换掉吗？", "不用。先把一个模块（比如考勤）和现有系统并行跑。数据可以随时导出 Excel，要交给会计师也方便。觉得顺了，再一块一块搬过来。"], en: ["I already use SQL / Excel. Do I have to replace everything?", "No. Run one module (say, attendance) alongside what you have. Everything exports to Excel for your accountant. Move the rest over piece by piece, only when you're comfortable."] },
  { zh: ["数据放在哪里？安全吗？", "数据加密存放在云端服务器，每天自动备份，员工只看得到自己权限内的东西。你随时可以要求导出或删除全部数据 — 数据是你的，不是我们的。"], en: ["Where does my data live? Is it safe?", "Encrypted on cloud servers with daily automatic backups, and staff only see what their role allows. You can request a full export or deletion any time — the data is yours, not ours."] },
  { zh: ["客户和供应商也要下载 App 吗？", "不用。他们只会收到一条链接 — 点开就能签收、确认报价、填反馈。该下载 App 的麻烦，我们留给自己解决。"], en: ["Do my customers and suppliers need the app too?", "No. They just receive a link — tap to sign a delivery, confirm a quote or leave feedback. No downloads for anyone outside your team."] },
];

/* ---------------- state ---------------- */
let LANG = "zh";
try { const s = localStorage.getItem("trivo_lang"); if (s === "en" || s === "zh") LANG = s; } catch (e) { /* ok */ }
const t = (k) => (L[LANG] && L[LANG][k]) ?? L.zh[k] ?? k;
const gateState = { att: true, hr: true, task: false, inv: true, fleet: false, acc: false };
const MINI_ICON = { dash: '<rect x="3" y="3" width="7.5" height="9" rx="2"/><rect x="13.5" y="3" width="7.5" height="5.5" rx="2"/><rect x="13.5" y="12" width="7.5" height="9" rx="2"/><rect x="3" y="15.5" width="7.5" height="5.5" rx="2"/>', att: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>', hr: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.4 3.4-5.5 6.5-5.5s5.7 2.1 6.5 5.5"/><path d="M16 5.2a3.5 3.5 0 0 1 0 5.6"/>', task: '<path d="M9 11.5 4.6 16l-2.1-2M9 5.5 4.6 10 2.5 8M13 7h8.5M13 15h8.5"/>', inv: '<path d="m12 2.8 8.5 4.6v9.2L12 21.2l-8.5-4.6V7.4z"/><path d="m3.7 7.5 8.3 4.5 8.3-4.5M12 12v9"/>', fleet: '<path d="M2.5 6.5h12v10h-12z"/><path d="M14.5 10h4l2.5 3.5v3h-6.5"/><circle cx="6.8" cy="17.5" r="1.9"/><circle cx="17.2" cy="17.5" r="1.9"/>', acc: '<path d="M6 2.5h8L19 7.5v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z"/><path d="M13.5 2.5v5.5H19M8 13h8M8 17h5"/>' };
const mini = (n) => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${MINI_ICON[n]}</svg>`;

/* ---------------- render ---------------- */
function applyLang() {
  document.documentElement.lang = LANG === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i]").forEach((el) => { el.textContent = t(el.dataset.i); });
  document.querySelectorAll("[data-i-html]").forEach((el) => { el.innerHTML = t(el.dataset.iHtml); });
  document.getElementById("lang-zh").classList.toggle("on", LANG === "zh");
  document.getElementById("lang-en").classList.toggle("on", LANG === "en");
  renderModules(); renderGate(); renderFaq(); DECK.renderDots(); DECK.flowReveals(); if (DECK.syncModDots) DECK.syncModDots();
}
function setLang(l) { LANG = l; try { localStorage.setItem("trivo_lang", l); } catch (e) { /* ok */ } applyLang(); }

function renderModules() {
  document.getElementById("mod-grid").innerHTML = MODULES.map((m, i) => { const d = m[LANG] || m.zh; return `
    <article class="mod-card rv rv-d${Math.min(4, (i % 3) + 1)}">
      <div class="mod-top"><span class="mod-glyph"><svg viewBox="0 0 52 52" fill="none" stroke="url(#tg)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${GLYPH[m.id]}</svg></span><span class="mod-num">0${i + 1}</span><span class="mod-tag">RM ${m.price}${LANG === "zh" ? "/月" : "/mo"}</span></div>
      <h3>${d.name}</h3><p>${d.desc}</p>
      <ul class="mod-feats">${d.f.map((f) => `<li>${f}</li>`).join("")}</ul>
    </article>`; }).join("");
}

function renderGate() {
  const tg = document.getElementById("gate-toggles");
  tg.innerHTML = `<div class="gt-row locked-core on"><label class="tswitch"><input type="checkbox" checked disabled><span class="tr"></span><span class="th"></span></label><span class="gt-name">${t("gate_core")}</span><span class="gt-price">RM 0</span></div>` +
    MODULES.map((m) => { const d = m[LANG] || m.zh; const on = gateState[m.id]; return `<div class="gt-row ${on ? "on" : ""}"><label class="tswitch"><input type="checkbox" data-gate="${m.id}" ${on ? "checked" : ""} aria-label="${d.name}"><span class="tr"></span><span class="th"></span></label><span class="gt-name">${d.name}</span><span class="gt-price">RM ${m.price}</span></div>`; }).join("");
  tg.querySelectorAll("[data-gate]").forEach((input) => input.addEventListener("change", () => { gateState[input.dataset.gate] = input.checked; input.closest(".gt-row").classList.toggle("on", input.checked); updateGate(); }));
  updateGate();
}
function updateGate() {
  const on = MODULES.filter((m) => gateState[m.id]); const n = on.length; const sum = n * 59; const capped = sum > CAP; const total = capped ? CAP : sum;
  document.getElementById("gate-math").innerHTML = `
    <div class="gate-math-line"><span>${t("gate_mods").replace("{n}", n)}</span><span>RM ${sum}</span></div>
    ${capped ? `<div class="gate-math-line cap"><span>${t("gate_cap")}</span><span><s>RM ${sum}</s>RM ${CAP}</span></div>` : ""}
    <div class="gate-total"><span class="num grad-text">RM ${total}</span><span class="per">${t("gate_per")}</span></div>
    <div class="gate-note">${t("gate_note")}</div>`;
  const nav = [{ id: "dash", name: t("gp_dash"), always: true }, ...MODULES.map((m) => ({ id: m.id, name: (m[LANG] || m.zh).name }))];
  document.getElementById("gp-nav").innerHTML = nav.map((x, i) => `<div class="gp-nav-item ${i === 0 ? "active" : ""} ${!x.always && !gateState[x.id] ? "hidden-mod" : ""}">${mini(x.id)}<span>${x.name}</span></div>`).join("");
  const cards = [["att", "9/11"], ["hr", "4"], ["task", "7"], ["inv", "2"], ["fleet", "10/12"], ["acc", "RM 8.2k"]];
  document.getElementById("gp-cards").innerHTML = (n ? cards.map(([id, v]) => `<div class="gp-card ${!gateState[id] ? "hidden-mod" : ""}">${t("gp_" + id)}<b>${v}</b></div>`).join("") : `<div class="gp-empty" style="grid-column:1/-1">${t("gate_none")}</div>`);
  const alerts = [["att", "#E8B04B"], ["fleet", "#E8B04B"], ["inv", "#E8B04B"], ["hr", "#4D7CF7"], ["acc", "#D95B4A"], ["task", "#4D7CF7"]];
  const al = document.getElementById("gp-alerts"); al.innerHTML = alerts.map(([id, c]) => `<div class="gp-alert ${!gateState[id] ? "hidden-mod" : ""}"><i style="background:${c}"></i>${t("al_" + id)}</div>`).join(""); al.style.display = n ? "" : "none";
}

function renderFaq() {
  const list = document.getElementById("faq-list");
  list.innerHTML = FAQS.map((f, i) => { const [q, a] = f[LANG] || f.zh; return `<div class="faq-item" data-faq="${i}"><button class="faq-q" aria-expanded="false"><span>${q}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button><div class="faq-a"><p>${a}</p></div></div>`; }).join("");
  list.querySelectorAll(".faq-item").forEach((item) => { const btn = item.querySelector(".faq-q"), body = item.querySelector(".faq-a"); btn.addEventListener("click", () => { const open = item.classList.toggle("open"); btn.setAttribute("aria-expanded", open); body.style.maxHeight = open ? body.scrollHeight + "px" : "0px"; }); });
}

/* ============================================================
   DECK ENGINE — compositor-only paging
   ============================================================ */
const DECK = {
  pages: [], track: null, i: 0, busy: false, flow: false, lastWheel: 0, gestureOpen: false, touchY: null, touchT: 0,
  init() {
    this.track = document.getElementById("track"); this.pages = Array.from(this.track.querySelectorAll(".page"));
    this.setVh(); this.decideMode(); this.renderDots();
    window.addEventListener("resize", () => { this.setVh(); this.decideMode(); this.apply(true); });
    window.addEventListener("orientationchange", () => setTimeout(() => { this.setVh(); this.decideMode(); this.apply(true); }, 60));
    window.addEventListener("wheel", (e) => this.onWheel(e), { passive: false, capture: true });
    window.addEventListener("keydown", (e) => this.onKey(e));
    window.addEventListener("touchstart", (e) => { if (this.flow) return; this.touchY = e.touches[0].clientY; this.touchT = Date.now(); }, { passive: true });
    window.addEventListener("touchend", (e) => { if (this.flow || this.touchY == null) return; const dy = this.touchY - e.changedTouches[0].clientY; this.touchY = null; if (Math.abs(dy) > 50 && Date.now() - this.touchT < 900) this.go(this.i + (dy > 0 ? 1 : -1)); }, { passive: true });
    document.querySelectorAll("[data-goto]").forEach((a) => a.addEventListener("click", (e) => { const idx = this.pages.findIndex((p) => p.dataset.page === a.dataset.goto); if (idx < 0) return; e.preventDefault(); document.getElementById("mnav").classList.remove("open"); if (this.flow) this.pages[idx].scrollIntoView({ behavior: "smooth" }); else this.go(idx); }));
    const h = location.hash.replace("#", ""); const start = this.pages.findIndex((p) => p.dataset.page === h); this.i = start > 0 ? start : 0;
    this.apply(true); this.flowReveals();
    this.track.addEventListener("transitionend", (e) => { if (e.target === this.track) this.landed(); });
    this.initTilt();
  },
  setVh() { document.documentElement.style.setProperty("--vh", (window.innerHeight * 0.01) + "px"); },
  decideMode() {
    const wantFlow = window.innerWidth < 981 || window.innerHeight < 620 || matchMedia("(pointer: coarse)").matches && window.innerWidth < 1100;
    if (wantFlow === this.flow) return;
    this.flow = wantFlow; document.documentElement.classList.toggle("flow", wantFlow);
    if (wantFlow) { this.pages.forEach((p) => p.classList.add("active")); this.flowReveals(); window.scrollTo(0, 0); }
    else { window.scrollTo(0, 0); this.apply(true); }
  },
  apply(instant) {
    if (this.flow) return;
    if (instant) this.track.classList.add("no-anim");
    this.track.style.transform = `translate3d(0, ${-this.i * window.innerHeight}px, 0)`;
    this.pages.forEach((p, k) => { if (p.classList.contains("active") && k !== this.i) { p.classList.add("was"); } p.classList.toggle("active", k === this.i); const bg = p.querySelector(".page-bg"); if (bg) bg.style.transform = `translate3d(0, ${(k - this.i) * -14}vh, 0)`; });
    document.getElementById("progress").firstElementChild.style.transform = `scaleX(${(this.i + 1) / this.pages.length})`;
    document.getElementById("nav").classList.toggle("scrolled", this.i > 0);
    document.querySelectorAll("#dots [data-dot]").forEach((b, k) => b.classList.toggle("on", k === this.i));
    document.querySelectorAll(".nav-links a").forEach((a) => a.classList.toggle("on", a.dataset.goto === this.pages[this.i].dataset.page));
    history.replaceState(null, "", "#" + this.pages[this.i].dataset.page);
    if (instant) { void this.track.offsetHeight; this.track.classList.remove("no-anim"); }
  },
  go(n) {
    n = Math.max(0, Math.min(this.pages.length - 1, n));
    if (n === this.i || this.busy || this.flow) return;
    this.busy = true; this.goAt = performance.now(); this.i = n; this.apply(false);
    clearTimeout(this.safety); this.safety = setTimeout(() => this.landed(), 1150); // safety net if transitionend is swallowed
  },
  landed() {
    if (!this.busy) return;
    this.busy = false; clearTimeout(this.safety); this.pages.forEach((p) => p.classList.remove("was"));
    const q = this.queued; this.queued = 0; if (q) this.go(this.i + q);
  },
  onWheel(e) {
    if (this.flow) return;
    e.preventDefault();
    const now = performance.now(); const d = e.deltaY, a = Math.abs(d);
    const gap = now - this.lastWheel; this.lastWheel = now;
    const lastA = this.lastAbs || 0, lastDir = this.lastDir || 0; this.lastAbs = a; if (a >= 1) this.lastDir = d > 0 ? 1 : -1;
    /* A notched mouse wheel reports whole-line / 100px steps with no inertia: every notch is a deliberate gesture. */
    const notched = e.deltaMode !== 0 || (a >= 100 && Number.isInteger(d));
    /* Trackpads: a gesture is new after a pause, when the finger reverses, or when the delta rises sharply
       (a fresh swipe starting while the previous swipe's inertia is still trickling in). */
    if (notched || gap > 260 || (a >= 1 && lastDir && (d > 0 ? 1 : -1) !== lastDir) || (a >= 14 && a > lastA * 2.2)) this.gestureOpen = true;
    if (!this.gestureOpen) return;
    if (a < 6) return;                                 // ignore inertia dust
    if (this.busy) { if (a >= 20 && now - this.goAt > 450) { this.queued = d > 0 ? 1 : -1; this.gestureOpen = false; } return; } // fast scrollers: remember the next page, play it when this slide lands
    this.gestureOpen = false;                          // one page per gesture
    this.go(this.i + (d > 0 ? 1 : -1));
  },
  onKey(e) {
    if (this.flow || e.target.matches("input, textarea, select")) return;
    const map = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };
    if (e.key in map) { e.preventDefault(); this.go(this.i + map[e.key]); }
    else if (e.key === "Home") { e.preventDefault(); this.go(0); }
    else if (e.key === "End") { e.preventDefault(); this.go(this.pages.length - 1); }
  },
  renderDots() {
    const nav = document.getElementById("dots");
    nav.innerHTML = this.pages.map((p, k) => `<button data-dot="${k}" class="${k === this.i ? "on" : ""}" aria-label="${PAGE_LABELS[p.dataset.page][LANG]}"><span>${PAGE_LABELS[p.dataset.page][LANG]}</span></button>`).join("");
    nav.querySelectorAll("[data-dot]").forEach((b) => b.addEventListener("click", () => this.go(+b.dataset.dot)));
  },
  /* flow mode: reveal on scroll. Safe to call repeatedly — re-rendered content (modules, gate, FAQ, language switch) gets observed too. */
  flowReveals() {
    if (!this.flow) return;
    if (!("IntersectionObserver" in window)) { document.querySelectorAll(".rv").forEach((el) => el.classList.add("in")); return; }
    if (!this.io) this.io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); this.io.unobserve(x.target); } }), { threshold: .08, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".rv:not(.in)").forEach((el) => this.io.observe(el));
  },
  /* subtle 3D: the hero phone, preview and stamp card lean toward the cursor */
  initTilt() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return;
    const rigs = [["hero", "stage", -9, 5], ["gating", "gate-preview", -6, 2], ["workers", "stamp-card", 8, 3]];
    rigs.forEach(([pageId, elId, ry, rx]) => {
      const page = document.getElementById(pageId), el = document.getElementById(elId); if (!page || !el) return;
      let raf = null;
      page.addEventListener("pointermove", (e) => { if (this.flow) return; const r = page.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { el.style.transform = `rotateY(${ry + x * 10}deg) rotateX(${rx - y * 8}deg)`; }); });
      page.addEventListener("pointerleave", () => { if (raf) cancelAnimationFrame(raf); el.style.transform = ""; });
    });
    // re-render modules re-creates nothing here; glyphs are static
  },
};

/* ---------------- nav / drawer ---------------- */
function initMobile() {
  /* module carousel indicator */
  const grid = document.getElementById("mod-grid"), dots = document.getElementById("mod-dots");
  const sync = () => { const cards = grid.children; if (!cards.length) return; if (dots.children.length !== cards.length) dots.innerHTML = [...cards].map(() => "<i></i>").join(""); const mid = grid.scrollLeft + grid.clientWidth / 2; let best = 0, bd = 1e9; [...cards].forEach((c, i) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } }); [...dots.children].forEach((d, i) => d.classList.toggle("on", i === best)); };
  grid.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true }); window.addEventListener("resize", sync); DECK.syncModDots = sync; sync();
  /* sticky CTA bar: shows once the hero's own buttons have scrolled away */
  const bar = document.getElementById("mcta"), heroCtas = document.querySelector(".hero .hero-ctas"), finalCtas = document.querySelector(".final .hero-ctas");
  if ("IntersectionObserver" in window && heroCtas && finalCtas) { let heroGone = false, finalSeen = false; const upd = () => bar.classList.toggle("show", heroGone && !finalSeen);
    new IntersectionObserver((es) => es.forEach((x) => { heroGone = !x.isIntersecting && x.boundingClientRect.top < 0; upd(); }), { threshold: 0 }).observe(heroCtas);
    new IntersectionObserver((es) => es.forEach((x) => { finalSeen = x.isIntersecting; upd(); }), { threshold: 0, rootMargin: "0px 0px 20% 0px" }).observe(finalCtas); }
}
function initNav() {
  const mnav = document.getElementById("mnav");
  document.getElementById("burger").addEventListener("click", () => mnav.classList.add("open"));
  document.getElementById("mnav-close").addEventListener("click", () => mnav.classList.remove("open"));
  mnav.addEventListener("click", (e) => { if (e.target === mnav) mnav.classList.remove("open"); });
}

/* ---------------- boot ---------------- */
document.getElementById("lang-zh").addEventListener("click", () => setLang("zh"));
document.getElementById("lang-en").addEventListener("click", () => setLang("en"));
initNav();
DECK.init();
applyLang();
initMobile();
