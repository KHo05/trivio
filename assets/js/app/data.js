/* TRIVO app — demo data (fictional construction company, Penang) */
"use strict";
const NOW = new Date();
function dOff(n) { const d = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + n); const p = (x) => String(x).padStart(2, "0"); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; }
function fmtDate(iso) { if (!iso) return "—"; const [y, m, d] = iso.split("-").map(Number); return LANG === "zh" ? `${y}年${m}月${d}日` : `${d}/${m}/${y}`; }
function fmtMoney(n) { return "RM " + n.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtNum(n) { return n.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function daysUntil(iso) { const [y, m, d] = iso.split("-").map(Number); const base = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()); return Math.round((new Date(y, m - 1, d) - base) / 86400000); }
function timeNow() { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }

/* sellable modules — the subscription is what gates the UI */
const MODULES = [
  { id: "att", price: 59, ico: "clock", name: { zh: "考勤打卡", en: "Attendance" }, sub: { zh: "拍照定位打卡 · 点名 · 工时", en: "Photo + GPS clock-in · roll-call · hours" },
    feats: { zh: ["时间地点水印照片", "没网先存、有网补传", "主管点名确认", "迟到缺勤一眼看出"], en: ["Time & location stamped photos", "Offline-first, auto re-upload", "Supervisor roll-call", "Lates and absences at a glance"] } },
  { id: "hr", price: 59, ico: "users", name: { zh: "人事与工资", en: "HR & Payroll" }, sub: { zh: "请假报销审批 · 工资单 · 电子签", en: "Leave & claims · payslips · e-sign" },
    feats: { zh: ["请假 · 加班 · 报销流程", "EPF · SOCSO · EIS 自动扣", "工资单与 EA 表格", "证件到期提醒与电子签"], en: ["Leave · OT · claims workflow", "EPF · SOCSO · EIS auto-deducted", "Payslips & EA forms", "Document expiry & e-sign"] } },
  { id: "task", price: 59, ico: "task", name: { zh: "任务与工单", en: "Tasks & Jobs" }, sub: { zh: "派工 · 拍照交差 · 一键工单", en: "Assign · photo submit · one-tap tickets" },
    feats: { zh: ["指派与截止日期", "拍照 + 备注交差", "一键工单到部门", "WhatsApp 一句话变任务"], en: ["Assignments & deadlines", "Photo + note submission", "One-tap department tickets", "WhatsApp line → task"] } },
  { id: "inv", price: 59, ico: "box", name: { zh: "库存与采购", en: "Inventory & Purchasing" }, sub: { zh: "扫码出入库 · 低库存提醒 · 采购单", en: "Scan in/out · low-stock alerts · PO" },
    feats: { zh: ["手机扫码 / 拍照记录", "最低库存自动提醒", "申请 → 批准 → 收货", "供应商准时率"], en: ["Phone barcode / photo logging", "Low-stock auto alerts", "Request → approve → receive", "Supplier on-time rate"] } },
  { id: "fleet", price: 59, ico: "truck", name: { zh: "车队与机械", en: "Fleet & Machinery" }, sub: { zh: "GPS 定位 · 怠速提醒 · 保养路税", en: "GPS · idle alerts · service & road tax" },
    feats: { zh: ["对接现有 GPS 设备", "怠速超时自动提醒", "保养 · 路税 · 保险日历", "GPS → 里程 → 油费 → 项目成本"], en: ["Works with existing GPS units", "Idle-too-long auto alerts", "Service · road tax · insurance calendar", "GPS → km → fuel → project cost"] } },
  { id: "acc", price: 59, ico: "doc", name: { zh: "账务", en: "Accounting" }, sub: { zh: "报价 · 发票 · LHDN e-Invoice", en: "Quotes · invoices · LHDN e-Invoice" },
    feats: { zh: ["报价单一键转发票", "MyInvois 电子发票", "SST 自动计算", "自动对上采购记录"], en: ["Quote → invoice in one tap", "MyInvois e-Invoice", "SST computed for you", "Matched to purchase records"] } },
];
function modById(id) { return MODULES.find((m) => m.id === id); }

const DB = {
  company: { name: "Seng Huat Construction Sdn Bhd", short: "Seng Huat", addr: "12-2, Jalan Mahsuri, 11950 Bayan Lepas, Pulau Pinang" },
  subs: { att: true, hr: true, task: true, inv: true, fleet: false, acc: false },
  prefs: { waAlerts: true, dashOnly: false },

  sites: [
    { id: "S1", name: { zh: "Taman Emas 排屋项目", en: "Taman Emas Terrace Housing" }, area: "Bayan Lepas" },
    { id: "S2", name: { zh: "Jalan Perak 排水工程", en: "Jalan Perak Drainage Works" }, area: "Jelutong" },
  ],
  employees: [
    { id: "E001", name: "Goh Teck Seng", role: { zh: "老板", en: "Owner" }, site: null, type: "local", wageType: "monthly", wage: 9000, phone: "012-220 1188", joined: "2009-05-01", color: "#223247", docs: [] },
    { id: "E002", name: "Lim Pei Shan", role: { zh: "人事 / 会计", en: "HR / Accounts" }, site: null, type: "local", wageType: "monthly", wage: 4600, phone: "016-558 2210", joined: "2019-02-11", color: "#6E4F9A", docs: [] },
    { id: "E010", name: "Ahmad bin Ismail", role: { zh: "工地主管", en: "Site Supervisor" }, site: "S1", type: "local", wageType: "monthly", wage: 4200, phone: "013-770 1256", joined: "2017-06-01", color: "#2E8A63", docs: [{ kind: "cidb", exp: dOff(41) }] },
    { id: "E011", name: "Ong Chee Keong", role: { zh: "工地主管", en: "Site Supervisor" }, site: "S2", type: "local", wageType: "monthly", wage: 4200, phone: "019-448 2210", joined: "2015-02-01", color: "#C7811C", docs: [{ kind: "cidb", exp: dOff(300) }] },
    { id: "E020", name: "Tan Ah Long", role: { zh: "泥水师傅", en: "Mason" }, site: "S1", type: "local", wageType: "daily", wage: 180, phone: "011-2635 7789", joined: "2022-04-11", color: "#35577D", docs: [{ kind: "cidb", exp: dOff(-9) }], leave: { annual: 8, sick: 12 } },
    { id: "E021", name: "Roslan bin Hashim", role: { zh: "挖掘机操作员", en: "Excavator Operator" }, site: "S2", type: "local", wageType: "daily", wage: 220, phone: "013-208 5566", joined: "2016-08-01", color: "#7A6A2F", docs: [{ kind: "cidb", exp: dOff(88) }] },
    { id: "E030", name: "Rahman Uddin", role: { zh: "普通工人", en: "General Worker" }, site: "S1", type: "foreign", nat: { zh: "孟加拉", en: "Bangladesh" }, wageType: "daily", wage: 85, phone: "011-1682 3345", joined: "2023-05-02", color: "#3E6FA3", docs: [{ kind: "passport", exp: dOff(22) }, { kind: "permit", exp: dOff(96) }] },
    { id: "E031", name: "Md Karim Hossain", role: { zh: "普通工人", en: "General Worker" }, site: "S2", type: "foreign", nat: { zh: "孟加拉", en: "Bangladesh" }, wageType: "daily", wage: 85, phone: "011-3355 9082", joined: "2022-11-14", color: "#2E8A63", docs: [{ kind: "passport", exp: dOff(388) }, { kind: "permit", exp: dOff(-4) }] },
    { id: "E032", name: "Aung Ko Min", role: { zh: "钢筋工人", en: "Bar Bender" }, site: "S2", type: "foreign", nat: { zh: "缅甸", en: "Myanmar" }, wageType: "daily", wage: 95, phone: "011-2740 6618", joined: "2021-03-08", color: "#6E4F9A", docs: [{ kind: "passport", exp: dOff(160) }, { kind: "permit", exp: dOff(160) }] },
    { id: "E033", name: "Slamet Riyadi", role: { zh: "木工", en: "Carpenter" }, site: "S1", type: "foreign", nat: { zh: "印尼", en: "Indonesia" }, wageType: "daily", wage: 100, phone: "011-5901 2247", joined: "2020-01-20", color: "#C7811C", docs: [{ kind: "passport", exp: dOff(452) }, { kind: "permit", exp: dOff(17) }] },
    { id: "E034", name: "Sojib Ahmed", role: { zh: "普通工人", en: "General Worker" }, site: "S1", type: "foreign", nat: { zh: "孟加拉", en: "Bangladesh" }, wageType: "daily", wage: 85, phone: "011-6118 0954", joined: "2024-02-05", color: "#C0493A", docs: [{ kind: "passport", exp: dOff(720) }, { kind: "permit", exp: dOff(255) }] },
  ],
  attendanceToday: {
    E010: { state: "in", in: "07:01" }, E011: { state: "in", in: "06:58" },
    E020: { state: "none" }, E021: { state: "in", in: "07:00" },
    E030: { state: "in", in: "07:03" }, E031: { state: "leave" }, E032: { state: "in", in: "07:04" },
    E033: { state: "in", in: "07:09" }, E034: { state: "none" },
  },
  monthAtt: { E010: { days: 16, ot: 6 }, E011: { days: 16, ot: 4 }, E020: { days: 15, ot: 10 }, E021: { days: 16, ot: 12 }, E030: { days: 16, ot: 14 }, E031: { days: 13, ot: 6 }, E032: { days: 15, ot: 9 }, E033: { days: 16, ot: 11 }, E034: { days: 12, ot: 4 } },
  siteConfirmed: {},
  approvals: [
    { id: "A101", kind: "leave", emp: "E031", from: dOff(0), days: 2, reason: { zh: "家人生病，需回乡探望", en: "Family member ill — going back home" }, status: "pending" },
    { id: "A102", kind: "ot", emp: "E021", from: dOff(-1), hours: 3, reason: { zh: "赶排水管铺设进度", en: "Rushing drainage pipe laying" }, status: "pending" },
    { id: "A103", kind: "claim", emp: "E010", from: dOff(-2), amount: 156.8, reason: { zh: "工地急用五金（有收据）", en: "Urgent site hardware (receipt attached)" }, status: "pending" },
    { id: "A105", kind: "ot", emp: "E032", from: dOff(-3), hours: 2, reason: { zh: "混凝土浇灌加班", en: "Concrete pour overtime" }, status: "approved" },
    { id: "A106", kind: "claim", emp: "E011", from: dOff(-6), amount: 88, reason: { zh: "柴油报销", en: "Diesel claim" }, status: "approved" },
  ],
  tasks: [
    { id: "T1", title: { zh: "Taman Emas 第 12 户砌砖", en: "Brickwork, Taman Emas unit 12" }, emp: "E020", site: "S1", due: dOff(0), pri: "high", status: "doing" },
    { id: "T2", title: { zh: "检查吊车钢缆", en: "Inspect crane cable" }, emp: "E020", site: "S1", due: dOff(0), pri: "normal", status: "todo" },
    { id: "T3", title: { zh: "Jalan Perak 排水管 900mm 铺设", en: "Lay 900mm drainage pipe, Jalan Perak" }, emp: "E021", site: "S2", due: dOff(1), pri: "high", status: "doing" },
    { id: "T4", title: { zh: "清理工地出入口", en: "Clear site entrance" }, emp: "E034", site: "S1", due: dOff(-1), pri: "normal", status: "done" },
    { id: "T5", title: { zh: "模板拆除 — 3 楼", en: "Strip formwork — level 3" }, emp: "E033", site: "S1", due: dOff(2), pri: "normal", status: "todo" },
  ],
  materials: [
    { id: "M1", name: { zh: "水泥 (50kg)", en: "Cement (50kg)" }, unit: { zh: "包", en: "bags" }, stock: 42, min: 100, price: 19.5, code: "8881 0042" },
    { id: "M2", name: { zh: "河沙", en: "River sand" }, unit: { zh: "吨", en: "t" }, stock: 18, min: 10, price: 65, code: "8881 0107" },
    { id: "M3", name: { zh: "钢筋 Y12", en: "Steel bar Y12" }, unit: { zh: "条", en: "pcs" }, stock: 260, min: 150, price: 34, code: "8881 0212" },
    { id: "M4", name: { zh: "红砖", en: "Clay bricks" }, unit: { zh: "块", en: "pcs" }, stock: 3200, min: 5000, price: 0.42, code: "8881 0330" },
    { id: "M5", name: { zh: "RC 排水管 900mm", en: "RC drainage pipe 900mm" }, unit: { zh: "支", en: "pcs" }, stock: 14, min: 8, price: 310, code: "8881 0418" },
    { id: "M6", name: { zh: "模板夹板", en: "Formwork plywood" }, unit: { zh: "张", en: "sheets" }, stock: 75, min: 60, price: 48, code: "8881 0505" },
  ],
  suppliers: [
    { id: "SP1", name: "Chuan Seng Hardware Sdn Bhd", contact: "Mr. Teoh · 012-433 8821", terms: { zh: "30 天", en: "30 days" }, onTime: 96 },
    { id: "SP2", name: "Penang Mix Concrete Sdn Bhd", contact: "Ms. Yeoh · 016-208 1145", terms: { zh: "货到付款", en: "COD" }, onTime: 88 },
    { id: "SP3", name: "Weld & Steel Trading", contact: "Mr. Gan · 019-556 7702", terms: { zh: "60 天", en: "60 days" }, onTime: 92 },
  ],
  purchases: [
    { id: "PR-2608", material: "M1", qty: 200, site: "S1", by: "E010", status: "pending", supplier: "SP1", amount: 3900 },
    { id: "PR-2607", material: "M4", qty: 8000, site: "S1", by: "E010", status: "pending", supplier: "SP1", amount: 3360 },
    { id: "PR-2606", material: "M5", qty: 12, site: "S2", by: "E011", status: "approved", supplier: "SP1", amount: 3720 },
    { id: "PR-2605", material: "M3", qty: 300, site: "S2", by: "E011", status: "ordered", po: "PO-1174", supplier: "SP3", amount: 10200 },
    { id: "PR-2604", material: "M2", qty: 15, site: "S2", by: "E011", status: "delivering", po: "PO-1173", supplier: "SP2", amount: 975 },
    { id: "PR-2603", material: "M6", qty: 40, site: "S1", by: "E010", status: "delivered", po: "PO-1172", supplier: "SP1", amount: 1920 },
  ],
  vehicles: [
    { plate: "PMA 3268", kind: { zh: "罗里 (10 吨)", en: "Lorry (10t)" }, status: "driving", speed: 44, mileage: 145159, todayKm: 62.4, driver: "Roslan", x: 37, y: 47, loc: { zh: "Jalan Perak 路上", en: "On Jalan Perak" } },
    { plate: "PLW 8023", kind: { zh: "泥头车", en: "Tipper truck" }, status: "idle", idleMin: 26, speed: 0, mileage: 98421, todayKm: 38.6, driver: "Hafiz", x: 32, y: 59, loc: { zh: "Bayan Lepas 工业区", en: "Bayan Lepas industrial area" } },
    { plate: "PKT 1180", kind: { zh: "罗里 (5 吨)", en: "Lorry (5t)" }, status: "parked", speed: 0, mileage: 76310, todayKm: 21.3, driver: "Ah Seng", x: 42, y: 62, loc: { zh: "公司仓库", en: "Company yard" } },
    { plate: "PGV 5512", kind: { zh: "小货车", en: "Van" }, status: "driving", speed: 31, mileage: 39204, todayKm: 30.5, driver: "Kumar", x: 62, y: 40, loc: { zh: "Bukit Mertajam 方向", en: "Towards Bukit Mertajam" } },
    { plate: "PNB 7704", kind: { zh: "吊车", en: "Mobile crane" }, status: "parked", speed: 0, mileage: 55102, todayKm: 0, driver: "—", x: 36, y: 52, loc: { zh: "Taman Emas 工地", en: "Taman Emas site" } },
    { plate: "PJQ 9931", kind: { zh: "罗里 (3 吨)", en: "Lorry (3t)" }, status: "offline", speed: 0, mileage: 61220, todayKm: 0, driver: "—", x: 66, y: 24, loc: { zh: "最后位置：Padang Serai", en: "Last seen: Padang Serai" } },
  ],
  vehicleAdmin: [
    { plate: "PMA 3268", roadTax: dOff(22), insurance: dOff(22), nextService: dOff(35) },
    { plate: "PLW 8023", roadTax: dOff(140), insurance: dOff(140), nextService: dOff(6) },
    { plate: "PKT 1180", roadTax: dOff(-8), insurance: dOff(80), nextService: dOff(48) },
    { plate: "PGV 5512", roadTax: dOff(64), insurance: dOff(64), nextService: dOff(90) },
  ],
  machines: [
    { id: "MC1", name: { zh: "挖掘机 PC200", en: "Excavator PC200" }, hours: 6120, nextServiceH: 6250, lastService: dOff(-34), insurance: dOff(112) },
    { id: "MC2", name: { zh: "小型挖掘机 (Backhoe)", en: "Backhoe JCB 3CX" }, hours: 4310, nextServiceH: 4300, lastService: dOff(-96), roadTax: dOff(41), insurance: dOff(41) },
    { id: "MC3", name: { zh: "压路机", en: "Road roller" }, hours: 2980, nextServiceH: 3200, lastService: dOff(-20), roadTax: dOff(-3), insurance: dOff(203) },
  ],
  companyDocs: [
    { id: "CD1", doc: { zh: "CIDB 承包商执照 (G4)", en: "CIDB contractor licence (G4)" }, owner: { zh: "公司", en: "Company" }, exp: dOff(52) },
    { id: "CD2", doc: { zh: "工地一切险 — Taman Emas", en: "Contractor All-Risk — Taman Emas" }, owner: { zh: "S1 项目", en: "Site S1" }, exp: dOff(146) },
  ],
  esign: [
    { id: "ES1", doc: { zh: "2026 加薪信", en: "2026 Increment Letter" }, emp: "E020", status: "pending", sent: dOff(-2) },
    { id: "ES2", doc: { zh: "工地安全守则确认", en: "Site Safety Rules Acknowledgement" }, emp: "E030", status: "pending", sent: dOff(-1) },
    { id: "ES3", doc: { zh: "工地安全守则确认", en: "Site Safety Rules Acknowledgement" }, emp: "E033", status: "signed", sent: dOff(-1), signedAt: dOff(0) },
    { id: "ES4", doc: { zh: "雇佣合同续约", en: "Employment Contract Renewal" }, emp: "E032", status: "signed", sent: dOff(-6), signedAt: dOff(-5) },
  ],
  docLib: [{ cat: { zh: "员工文件", en: "Employee files" }, n: 38, ico: "users", tint: "tint-navy" }, { cat: { zh: "项目文件", en: "Project files" }, n: 112, ico: "folder", tint: "tint-green" }, { cat: { zh: "供应商文件", en: "Supplier files" }, n: 29, ico: "box", tint: "tint-amber" }, { cat: { zh: "车辆机械文件", en: "Vehicle & machinery files" }, n: 41, ico: "truck", tint: "tint-blue" }],
  invoices: [
    { id: "INV-0931", kind: "invoice", customer: "Bayan Development Sdn Bhd", amount: 48200, status: "unpaid", due: dOff(12), einv: true },
    { id: "INV-0930", kind: "invoice", customer: "Majlis Bandaraya Pulau Pinang", amount: 126500, status: "overdue", due: dOff(-9), einv: true },
    { id: "INV-0929", kind: "invoice", customer: "Lim Family (Bungalow Reno)", amount: 18400, status: "paid", due: dOff(-20), einv: true },
    { id: "QT-0412", kind: "quote", customer: "Harmony Residence JMB", amount: 36900, status: "draft", due: dOff(14), einv: false },
    { id: "QT-0411", kind: "quote", customer: "Ever Green Factory Sdn Bhd", amount: 92000, status: "draft", due: dOff(21), einv: false },
  ],
  announcements: [
    { d: dOff(0), text: { zh: "本周五 (Deepavali 前夕) 下午 3 点收工，工资照算。", en: "This Friday (Deepavali eve) work ends 3pm, full pay." } },
    { d: dOff(-2), text: { zh: "Taman Emas 工地新安全帽已到，向 Ahmad 领取。", en: "New safety helmets for Taman Emas site — collect from Ahmad." } },
  ],
  queue: [], // worker offline queue
};

/* lookups */
const empById = (id) => DB.employees.find((e) => e.id === id);
const siteById = (id) => DB.sites.find((s) => s.id === id);
const matById = (id) => DB.materials.find((m) => m.id === id);
const supById = (id) => DB.suppliers.find((s) => s.id === id);
const siteWorkers = (id) => DB.employees.filter((e) => e.site === id);
const isOn = (mod) => !!DB.subs[mod];

/* derived */
function attendanceStats() { const w = DB.employees.filter((e) => e.site); let present = 0, notIn = 0; for (const x of w) { const a = DB.attendanceToday[x.id]; if (a && (a.state === "in" || a.state === "out")) present++; else if (!a || a.state === "none") notIn++; } return { present, total: w.length, notIn }; }
const pendingApprovals = () => DB.approvals.filter((a) => a.status === "pending");
const pendingPurchases = () => DB.purchases.filter((p) => p.status === "pending");
const lowStock = () => DB.materials.filter((m) => m.stock < m.min);
const idleVehicles = () => DB.vehicles.filter((v) => v.status === "idle" && v.idleMin >= 20);
const activeVehicles = () => DB.vehicles.filter((v) => v.status !== "offline");
const openTasks = () => DB.tasks.filter((x) => x.status !== "done");

function allExpiryItems() {
  const items = []; const kn = (k) => ({ passport: t("passport"), permit: t("permit"), cidb: t("cidb") }[k] || k);
  for (const e of DB.employees) for (const d of e.docs) items.push({ doc: kn(d.kind), owner: e.name, exp: d.exp });
  if (isOn("fleet")) {
    for (const v of DB.vehicleAdmin) { items.push({ doc: t("roadTax"), owner: v.plate, exp: v.roadTax }); items.push({ doc: t("insurance"), owner: v.plate, exp: v.insurance }); }
    for (const m of DB.machines) { if (m.roadTax) items.push({ doc: t("roadTax"), owner: tx(m.name), exp: m.roadTax }); if (m.insurance) items.push({ doc: t("insurance"), owner: tx(m.name), exp: m.insurance }); }
  }
  for (const c of DB.companyDocs) items.push({ doc: tx(c.doc), owner: tx(c.owner), exp: c.exp });
  return items.sort((a, b) => daysUntil(a.exp) - daysUntil(b.exp));
}
const expiringSoon = () => allExpiryItems().filter((i) => daysUntil(i.exp) <= 30);
const expiredItems = () => allExpiryItems().filter((i) => daysUntil(i.exp) < 0);

function payrollFor(emp) {
  const att = DB.monthAtt[emp.id] || { days: 22, ot: 0 };
  let basic, otPay, allowance = 0;
  if (emp.wageType === "daily") { basic = emp.wage * att.days; otPay = Math.round((emp.wage / 8) * 1.5 * att.ot * 100) / 100; }
  else { basic = emp.wage; otPay = Math.round((emp.wage / 26 / 8) * 1.5 * att.ot * 100) / 100; allowance = emp.site ? 200 : 0; }
  const gross = basic + otPay + allowance;
  let epf = 0, socso = 0, eis = 0;
  if (emp.type === "local") { epf = Math.round(gross * 0.11 * 100) / 100; socso = Math.round(Math.min(gross, 6000) * 0.005 * 100) / 100; eis = Math.round(Math.min(gross, 6000) * 0.002 * 100) / 100; }
  return { att, basic, otPay, allowance, gross, epf, socso, eis, net: Math.round((gross - epf - socso - eis) * 100) / 100 };
}
const payrollTotal = () => DB.employees.reduce((s, e) => s + payrollFor(e).net, 0);
const monthlyBill = () => MODULES.reduce((s, m) => s + (DB.subs[m.id] ? m.price : 0), 0);

function buildAlerts() {
  const A = [];
  if (isOn("fleet")) for (const v of idleVehicles()) A.push({ icon: "truck", tint: "tint-amber", route: "fleet", title: LANG === "zh" ? `${v.plate} 怠速超时（${v.idleMin} 分钟）` : `${v.plate} idling too long (${v.idleMin} min)`, sub: tx(v.loc) });
  if (isOn("att")) { const s = attendanceStats(); if (s.notIn) A.push({ icon: "clock", tint: "tint-amber", route: "attendance", title: t("statAttFoot", { n: s.notIn }), sub: DB.employees.filter((e) => e.site && (!DB.attendanceToday[e.id] || DB.attendanceToday[e.id].state === "none")).map((e) => e.name).join(", ") }); }
  if (isOn("inv")) for (const m of lowStock()) A.push({ icon: "box", tint: "tint-amber", route: "inventory", title: t("lowAlert", { name: tx(m.name) }), sub: `${m.stock} / ${t("minStock")} ${m.min} ${tx(m.unit)}` });
  for (const i of expiringSoon().slice(0, 3)) { const d = daysUntil(i.exp); A.push({ icon: "doc", tint: d < 0 ? "tint-red" : "tint-blue", route: isOn("hr") ? "docs" : "dashboard", title: `${i.doc} — ${i.owner}`, sub: d < 0 ? t("daysOver", { n: -d }) : t("daysLeft", { n: d }) }); }
  if (isOn("hr") && pendingApprovals().length) A.push({ icon: "check", tint: "tint-navy", route: "approvals", title: LANG === "zh" ? `${pendingApprovals().length} 项请假 / 加班 / 报销待审批` : `${pendingApprovals().length} leave / OT / claim requests pending`, sub: LANG === "zh" ? "点击处理" : "Click to review" });
  if (isOn("task")) { const d = DB.tasks.filter((x) => x.status !== "done" && daysUntil(x.due) < 0); if (d.length) A.push({ icon: "task", tint: "tint-red", route: "tasks", title: LANG === "zh" ? `${d.length} 项任务已逾期` : `${d.length} task(s) overdue`, sub: d.map((x) => tx(x.title)).join(" · ") }); }
  if (isOn("acc")) { const o = DB.invoices.filter((i) => i.status === "overdue"); if (o.length) A.push({ icon: "doc", tint: "tint-red", route: "accounting", title: LANG === "zh" ? `${o.length} 张发票逾期未收` : `${o.length} invoice(s) overdue`, sub: o.map((i) => `${i.id} · ${fmtMoney(i.amount)}`).join(" · ") }); }
  if (isOn("fleet")) for (const m of DB.machines.filter((x) => x.hours >= x.nextServiceH)) A.push({ icon: "wrench", tint: "tint-red", route: "fleet", title: (LANG === "zh" ? "保养到期 — " : "Service due — ") + tx(m.name), sub: `${m.hours}h ≥ ${m.nextServiceH}h` });
  return A;
}
