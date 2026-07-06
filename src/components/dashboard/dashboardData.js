import { getCollection } from "mock/mockDb";
import { canAccessResource } from "util/permissionAccess";

export const ROLE_LABELS = {
  ROLE_ADMINISTRATOR: "Administrator",
  ROLE_MANAGER: "General Manager",
  ROLE_PRO_SHOP_STAFF: "Pro Shop Staff",
  ROLE_STARTER: "Starter",
};

export const parseMoney = (val) => {
  if (typeof val === "number") return val;
  if (!val) return 0;
  return parseFloat(String(val).replace(/[^0-9.-]/g, "")) || 0;
};

const todayKey = () => new Date().toISOString().slice(0, 10);

export const getDashboardMetrics = () => {
  const sales = getCollection("sales");
  const customers = getCollection("customers");
  const giftCards = getCollection("giftCards");
  const teesheets = getCollection("teesheets");
  const inventory = getCollection("inventories");
  const employees = getCollection("employees");
  const carts = getCollection("carts");
  const terminals = getCollection("terminals");
  const today = todayKey();

  const totalRevenue = sales.reduce((sum, s) => sum + parseMoney(s.total), 0);
  const todaySales = sales.slice(0, 6);
  const todayRevenue = todaySales.reduce(
    (sum, s) => sum + parseMoney(s.total),
    0
  );
  const monthlySales = sales.length;
  const reservationsToday = teesheets.filter((t) => t.date === today).length;
  const activeGiftCards = giftCards.filter((g) => g.status === "Active").length;
  const lowInventory = inventory.filter(
    (i) => i.quantity < 25 && i.status !== "Inactive"
  );
  const staffOnDuty = employees.filter((e) => e.status).length;
  const cartsAvailable = carts.filter((c) => c.status === "Available").length;
  const terminalsOnline = terminals.filter((t) => t.status === "Online").length;

  const monthlyRevenue = (() => {
    const buckets = new Array(12).fill(0);
    sales.forEach((sale, i) => {
      buckets[i % 12] += parseMoney(sale.total);
    });
    if (buckets.every((v) => v === 0)) {
      return [
        4200,
        5100,
        4800,
        6200,
        7100,
        8400,
        9200,
        8800,
        7600,
        6900,
        8100,
        9400,
      ];
    }
    return buckets.map((v) => Math.round(v));
  })();

  const weeklyReservations = (() => {
    const counts = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      counts.push(teesheets.filter((s) => s.date === key).length);
    }
    return counts.every((c) => c === 0) ? [18, 24, 31, 28, 35, 42, 38] : counts;
  })();

  const customerGrowth = (() => {
    const base = customers.length;
    return [
      0.72,
      0.78,
      0.82,
      0.85,
      0.88,
      0.91,
      0.94,
      0.96,
      0.98,
      1,
      1.02,
      1.05,
    ].map((m) => Math.round(base * m * 0.85));
  })();

  const categorySplit = (() => {
    const map = {};
    inventory.forEach((item) => {
      const cat = item.subCategory || item.itemType || "Other";
      map[cat] = (map[cat] || 0) + 1;
    });
    const entries = Object.entries(map).slice(0, 5);
    if (!entries.length) {
      return {
        labels: ["Apparel", "Equipment", "Accessories", "Balls", "Beverages"],
        data: [28, 22, 18, 16, 16],
      };
    }
    return { labels: entries.map(([k]) => k), data: entries.map(([, v]) => v) };
  })();

  const topProducts = [...inventory]
    .sort((a, b) => b.price * b.quantity - a.price * a.quantity)
    .slice(0, 5)
    .map((item) => ({
      name: item.itemName,
      sku: item.sku,
      revenue: item.price * Math.min(item.quantity, 40),
      qty: item.quantity,
    }));

  const upcomingReservations = teesheets
    .filter((t) => t.date >= today)
    .slice(0, 6)
    .map((t) => ({
      id: t.id,
      customer: t.customer_name,
      time: t.start_time?.slice(0, 5) || "—",
      date: t.date,
      holes: t.holes,
      status: t.status || "booked",
    }));

  const recentTransactions = sales.slice(0, 6).map((s) => ({
    id: s.saleID,
    customer: s.soldto,
    total: s.total,
    items: s.items,
    type: s.paymenttype,
  }));

  const recentActivity = [
    ...sales.slice(0, 3).map((s, i) => ({
      id: `sale-${i}`,
      icon: "fa-receipt",
      text: `Sale ${s.saleID} completed`,
      meta: s.soldto,
      time: "Recently",
    })),
    ...giftCards.slice(0, 2).map((g, i) => ({
      id: `gc-${i}`,
      icon: "fa-gift",
      text: `Gift card ${g.giftCardNumber} issued`,
      meta: g.customerName,
      time: "Today",
    })),
    {
      id: "tee-1",
      icon: "fa-golf-ball",
      text: `${reservationsToday} tee times booked today`,
      meta: "Tee Sheet",
      time: "Live",
    },
  ].slice(0, 6);

  return {
    totalRevenue,
    todayRevenue,
    activeCustomers: customers.length,
    reservationsToday,
    giftCardsSold: activeGiftCards,
    monthlySales,
    inventoryAlerts: lowInventory.length,
    attendance: staffOnDuty,
    monthlyRevenue,
    weeklyReservations,
    customerGrowth,
    categorySplit,
    topProducts,
    upcomingReservations,
    recentTransactions,
    recentActivity,
    lowInventory,
    cartsAvailable,
    cartsTotal: carts.length,
    terminalsOnline,
    terminalsTotal: terminals.length,
    sales,
    utilization: Math.min(100, Math.round((reservationsToday / 50) * 100)),
  };
};

const KPI_DEFS = {
  totalRevenue: (m) => ({
    key: "totalRevenue",
    label: "Total Revenue",
    value: m.totalRevenue,
    format: "currency",
    trend: "+12.4%",
    trendDir: "up",
    icon: "fa-chart-line",
    accent: "violet",
    spark: m.monthlyRevenue.slice(-7),
  }),
  todayRevenue: (m) => ({
    key: "todayRevenue",
    label: "Today's Revenue",
    value: m.todayRevenue,
    format: "currency",
    trend: "+5.2%",
    trendDir: "up",
    icon: "fa-dollar-sign",
    accent: "emerald",
    spark: m.weeklyReservations,
  }),
  activeCustomers: (m) => ({
    key: "activeCustomers",
    label: "Active Customers",
    value: m.activeCustomers,
    format: "number",
    trend: "+8.1%",
    trendDir: "up",
    icon: "fa-users",
    accent: "blue",
    spark: m.customerGrowth.slice(-7),
  }),
  reservationsToday: (m) => ({
    key: "reservationsToday",
    label: "Reservations Today",
    value: m.reservationsToday,
    format: "number",
    trend: `${m.utilization}% fill`,
    trendDir: "up",
    icon: "fa-golf-ball",
    accent: "cyan",
    spark: m.weeklyReservations,
  }),
  giftCards: (m) => ({
    key: "giftCards",
    label: "Gift Cards Active",
    value: m.giftCardsSold,
    format: "number",
    trend: "+5 new",
    trendDir: "up",
    icon: "fa-gift",
    accent: "pink",
    spark: [12, 14, 13, 16, 18, 20, m.giftCardsSold],
  }),
  monthlySales: (m) => ({
    key: "monthlySales",
    label: "Monthly Sales",
    value: m.monthlySales,
    format: "number",
    trend: "+3.8%",
    trendDir: "up",
    icon: "fa-shopping-bag",
    accent: "amber",
    spark: m.monthlyRevenue.slice(-7),
  }),
  inventoryAlerts: (m) => ({
    key: "inventoryAlerts",
    label: "Inventory Alerts",
    value: m.inventoryAlerts,
    format: "number",
    trend: m.inventoryAlerts ? "Needs attention" : "All good",
    trendDir: m.inventoryAlerts ? "down" : "up",
    icon: "fa-exclamation-triangle",
    accent: "rose",
    spark: [8, 6, 9, 7, 5, 4, m.inventoryAlerts],
  }),
  attendance: (m) => ({
    key: "attendance",
    label: "Staff On Duty",
    value: m.attendance,
    format: "number",
    trend: "4 checked in",
    trendDir: "up",
    icon: "fa-user-check",
    accent: "indigo",
    spark: [20, 22, 21, 24, 23, 25, m.attendance],
  }),
  cartFleet: (m) => ({
    key: "cartFleet",
    label: "Carts Available",
    value: m.cartsAvailable,
    format: "number",
    trend: `of ${m.cartsTotal}`,
    trendDir: "up",
    icon: "fa-car",
    accent: "teal",
    spark: [18, 19, 17, 20, 19, 21, m.cartsAvailable],
  }),
};

const ROLE_LAYOUT = {
  ROLE_ADMINISTRATOR: {
    kpis: [
      "totalRevenue",
      "todayRevenue",
      "activeCustomers",
      "reservationsToday",
      "giftCards",
      "monthlySales",
      "inventoryAlerts",
      "attendance",
    ],
    charts: [
      "revenue",
      "reservations",
      "inventory",
      "customers",
      "sales",
      "radar",
    ],
    widgets: [
      "quickActions",
      "recentActivity",
      "recentTransactions",
      "upcomingReservations",
      "notifications",
      "topProducts",
      "lowInventory",
      "weeklyGoals",
      "systemStatus",
    ],
    showSalesTable: true,
  },
  ROLE_MANAGER: {
    kpis: [
      "totalRevenue",
      "todayRevenue",
      "reservationsToday",
      "attendance",
      "inventoryAlerts",
      "monthlySales",
    ],
    charts: ["revenue", "reservations", "sales", "radar"],
    widgets: [
      "quickActions",
      "recentActivity",
      "upcomingReservations",
      "topProducts",
      "lowInventory",
      "weeklyGoals",
      "systemStatus",
    ],
    showSalesTable: true,
  },
  ROLE_PRO_SHOP_STAFF: {
    kpis: [
      "todayRevenue",
      "monthlySales",
      "giftCards",
      "activeCustomers",
      "inventoryAlerts",
    ],
    charts: ["sales", "inventory", "customers"],
    widgets: [
      "quickActions",
      "recentTransactions",
      "topProducts",
      "lowInventory",
      "notifications",
    ],
    showSalesTable: true,
  },
  ROLE_STARTER: {
    kpis: ["reservationsToday", "cartFleet", "attendance", "activeCustomers"],
    charts: ["reservations", "radar"],
    widgets: [
      "quickActions",
      "upcomingReservations",
      "recentActivity",
      "systemStatus",
      "weeklyGoals",
    ],
    showSalesTable: false,
  },
};

export const getRoleLayout = (role) =>
  ROLE_LAYOUT[role] || ROLE_LAYOUT.ROLE_PRO_SHOP_STAFF;

export const getKpisForRole = (role) => {
  const metrics = getDashboardMetrics();
  const layout = getRoleLayout(role);
  return layout.kpis.map((key) => KPI_DEFS[key](metrics));
};

export const QUICK_ACTION_DEFS = [
  {
    label: "Tee Sheet",
    icon: "fa-sitemap",
    path: "/tee-sheet/list",
    resource: "TEE_SHEET",
  },
  {
    label: "Customers",
    icon: "fa-user",
    path: "/customer/list",
    resource: "CUSTOMER",
  },
  {
    label: "Gift Cards",
    icon: "fa-gift",
    path: "/gift-card/list",
    resource: "GIFT_CARD",
  },
  {
    label: "Inventory",
    icon: "fa-shopping-basket",
    path: "/inventory/list",
    resource: "INVENTORY",
  },
  {
    label: "Employees",
    icon: "fa-users",
    path: "/employee/list",
    resource: "EMPLOYEE",
  },
  {
    label: "Clock In",
    icon: "fa-clock",
    path: "/clockIn",
    resource: "CLOCKIN",
  },
  { label: "Carts", icon: "fa-car", path: "/cart/list", resource: "CART" },
  {
    label: "POS Sale",
    icon: "fa-cash-register",
    path: "/tee-slot",
    resource: "CUSTOMER_TEE_SHEET",
  },
];

export const getQuickActionsForUser = (permissions) =>
  QUICK_ACTION_DEFS.filter((action) =>
    canAccessResource(permissions, action.resource)
  ).slice(0, 6);
