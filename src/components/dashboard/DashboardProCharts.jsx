import React, { useMemo, useRef, useEffect } from "react";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";
import { getCollection } from "mock/mockDb";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const parseMoney = (val) => {
  if (typeof val === "number") return val;
  if (!val) return 0;
  return parseFloat(String(val).replace(/[^0-9.-]/g, "")) || 0;
};

const buildMonthlyRevenue = () => {
  const sales = getCollection("sales");
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
};

const buildWeeklyTeeTimes = () => {
  const sheets = getCollection("teesheets");
  const today = new Date();
  const counts = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    counts.push(sheets.filter((s) => s.date === key).length);
  }
  if (counts.every((c) => c === 0)) {
    return [18, 24, 31, 28, 35, 42, 38];
  }
  return counts;
};

const buildCategorySplit = () => {
  const inventory = getCollection("inventory");
  const map = {};
  inventory.forEach((item) => {
    const cat = item.category || "Other";
    map[cat] = (map[cat] || 0) + 1;
  });
  const entries = Object.entries(map).slice(0, 5);
  if (!entries.length) {
    return {
      labels: ["Apparel", "Equipment", "Accessories", "Balls", "Beverages"],
      data: [28, 22, 18, 16, 16],
    };
  }
  return {
    labels: entries.map(([k]) => k),
    data: entries.map(([, v]) => v),
  };
};

const isDarkMode = () =>
  document.body.classList.contains("dark-mode") ||
  document.documentElement.getAttribute("data-theme") === "dark";

const chartTextColor = () => (isDarkMode() ? "#949ba2" : "#6a727a");
const chartGridColor = () =>
  isDarkMode() ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

const useChartTheme = () => {
  const [, setTick] = React.useState(0);
  useEffect(() => {
    const obs = new MutationObserver(() => setTick((t) => t + 1));
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);
  return { text: chartTextColor(), grid: chartGridColor() };
};

const GradientLineChart = () => {
  const canvasRef = useRef(null);
  const theme = useChartTheme();
  const revenue = useMemo(() => buildMonthlyRevenue(), []);

  const data = useMemo(
    () => ({
      labels: MONTHS,
      datasets: [
        {
          label: "Revenue",
          fill: true,
          lineTension: 0.4,
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: "#5d78ff",
          borderColor: "#5d78ff",
          backgroundColor: "rgba(93, 120, 255, 0.15)",
          data: revenue,
        },
      ],
    }),
    [revenue]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      animation: {
        duration: 1800,
        easing: "easeOutQuart",
      },
      tooltips: {
        mode: "index",
        intersect: false,
        backgroundColor: isDarkMode() ? "#222437" : "#fff",
        titleFontColor: isDarkMode() ? "#fff" : "#333",
        bodyFontColor: isDarkMode() ? "#949ba2" : "#666",
        borderColor: isDarkMode() ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        borderWidth: 1,
        callbacks: {
          label: (item) => ` $${item.yLabel.toLocaleString()}`,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: { color: theme.grid, drawBorder: false },
            ticks: { fontColor: theme.text, fontSize: 11 },
          },
        ],
        yAxes: [
          {
            gridLines: { color: theme.grid, drawBorder: false },
            ticks: {
              fontColor: theme.text,
              fontSize: 11,
              callback: (v) => `$${(v / 1000).toFixed(0)}k`,
            },
          },
        ],
      },
    }),
    [theme]
  );

  return (
    <div style={{ height: 280 }} ref={canvasRef}>
      <Line data={data} options={options} />
    </div>
  );
};

const GradientBarChart = () => {
  const theme = useChartTheme();
  const weekly = useMemo(() => buildWeeklyTeeTimes(), []);

  const data = useMemo(
    () => ({
      labels: WEEKDAYS,
      datasets: [
        {
          label: "Tee Times",
          backgroundColor: [
            "rgba(93,120,255,0.9)",
            "rgba(67,101,207,0.85)",
            "rgba(46,216,182,0.85)",
            "rgba(124,108,240,0.85)",
            "rgba(93,120,255,0.9)",
            "rgba(0,196,134,0.85)",
            "rgba(67,101,207,0.9)",
          ],
          borderRadius: 8,
          borderSkipped: false,
          data: weekly,
        },
      ],
    }),
    [weekly]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      animation: {
        duration: 1600,
        easing: "easeOutBounce",
      },
      tooltips: {
        backgroundColor: isDarkMode() ? "#222437" : "#fff",
        titleFontColor: isDarkMode() ? "#fff" : "#333",
        bodyFontColor: isDarkMode() ? "#949ba2" : "#666",
      },
      scales: {
        xAxes: [
          {
            gridLines: { display: false },
            ticks: { fontColor: theme.text },
            barPercentage: 0.65,
          },
        ],
        yAxes: [
          {
            gridLines: { color: theme.grid, drawBorder: false },
            ticks: { fontColor: theme.text, beginAtZero: true, precision: 0 },
          },
        ],
      },
    }),
    [theme]
  );

  return (
    <div style={{ height: 240 }}>
      <Bar data={data} options={options} />
    </div>
  );
};

const DonutChart = () => {
  const theme = useChartTheme();
  const split = useMemo(() => buildCategorySplit(), []);

  const data = useMemo(
    () => ({
      labels: split.labels,
      datasets: [
        {
          data: split.data,
          backgroundColor: [
            "#5d78ff",
            "#2ed8b6",
            "#7c6cf0",
            "#4365cf",
            "#00c486",
          ],
          borderWidth: 0,
          hoverOffset: 12,
        },
      ],
    }),
    [split]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 68,
      legend: {
        position: "bottom",
        labels: {
          fontColor: theme.text,
          padding: 14,
          usePointStyle: true,
        },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000,
      },
      tooltips: {
        backgroundColor: isDarkMode() ? "#222437" : "#fff",
        titleFontColor: isDarkMode() ? "#fff" : "#333",
        bodyFontColor: isDarkMode() ? "#949ba2" : "#666",
      },
    }),
    [theme]
  );

  return (
    <div style={{ height: 260 }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

const RadarPerformanceChart = () => {
  const theme = useChartTheme();

  const data = useMemo(
    () => ({
      labels: [
        "Revenue",
        "Bookings",
        "Retention",
        "Inventory",
        "Staff",
        "Satisfaction",
      ],
      datasets: [
        {
          label: "This Month",
          data: [88, 76, 82, 70, 85, 91],
          backgroundColor: "rgba(93, 120, 255, 0.25)",
          borderColor: "#5d78ff",
          borderWidth: 2,
          pointBackgroundColor: "#7c6cf0",
        },
        {
          label: "Last Month",
          data: [72, 68, 75, 65, 78, 84],
          backgroundColor: "rgba(46, 216, 182, 0.15)",
          borderColor: "#2ed8b6",
          borderWidth: 2,
          pointBackgroundColor: "#2ed8b6",
        },
      ],
    }),
    []
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "bottom",
        labels: { fontColor: theme.text, usePointStyle: true },
      },
      scale: {
        angleLines: { color: theme.grid },
        gridLines: { color: theme.grid },
        ticks: {
          beginAtZero: true,
          max: 100,
          display: false,
        },
        pointLabels: { fontColor: theme.text, fontSize: 11 },
      },
      animation: { duration: 1500 },
    }),
    [theme]
  );

  return (
    <div style={{ height: 280 }}>
      <Radar data={data} options={options} />
    </div>
  );
};

const KpiCard = ({ icon, label, value, trend, trendDir, accent }) => (
  <div className="dashboard-pro__kpi" style={{ "--kpi-accent": accent }}>
    <div className="dashboard-pro__kpi-icon">
      <i className={icon} />
    </div>
    <div className="dashboard-pro__kpi-value">{value}</div>
    <div className="dashboard-pro__kpi-label">{label}</div>
    {trend && (
      <div className={`dashboard-pro__kpi-trend ${trendDir || "up"}`}>
        <i
          className={`fas fa-arrow-${trendDir === "down" ? "down" : "up"} mr-1`}
        />
        {trend}
      </div>
    )}
  </div>
);

const DashboardProCharts = () => {
  const customers = getCollection("customers").length;
  const giftCards = getCollection("giftCards").length;
  const teeSheetsToday = getCollection("teesheets").filter(
    (s) => s.date === new Date().toISOString().slice(0, 10)
  ).length;
  const employees = getCollection("employees").length;
  const sales = getCollection("sales");
  const revenueToday = sales
    .slice(0, 5)
    .reduce((sum, s) => sum + parseMoney(s.total), 0);

  const utilization = Math.min(100, Math.round((teeSheetsToday / 50) * 100));

  return (
    <div className="dashboard-pro">
      <div className="dashboard-pro__hero">
        <KpiCard
          icon="fas fa-golf-ball"
          label="Today's Tee Times"
          value={teeSheetsToday}
          trend={`${utilization}% utilization`}
          trendDir="up"
          accent="linear-gradient(135deg, #4365cf, #5d78ff)"
        />
        <KpiCard
          icon="fas fa-users"
          label="Active Customers"
          value={customers}
          trend="8% vs last month"
          trendDir="up"
          accent="linear-gradient(135deg, #2ed8b6, #00c486)"
        />
        <KpiCard
          icon="fas fa-gift"
          label="Gift Cards Active"
          value={giftCards}
          trend="5 new this week"
          trendDir="up"
          accent="linear-gradient(135deg, #7c6cf0, #563c91)"
        />
        <KpiCard
          icon="fas fa-dollar-sign"
          label="Pro Shop Today"
          value={`$${revenueToday.toLocaleString()}`}
          trend={`${employees} staff on roster`}
          trendDir="up"
          accent="linear-gradient(135deg, #ff6b8a, #ff3279)"
        />
      </div>

      <div className="dashboard-pro__grid">
        <div className="dashboard-pro__chart-card dashboard-pro__chart-card--3d">
          <div className="dashboard-pro__chart-title">Revenue Analytics</div>
          <div className="dashboard-pro__chart-sub">
            Monthly pro shop revenue — animated area chart
          </div>
          <div className="chart-3d-inner chart-animate-in">
            <GradientLineChart />
          </div>
        </div>
        <div className="dashboard-pro__chart-card">
          <div className="dashboard-pro__chart-title">Inventory Mix</div>
          <div className="dashboard-pro__chart-sub">Category distribution</div>
          <DonutChart />
        </div>
      </div>

      <div className="dashboard-pro__grid-3">
        <div className="dashboard-pro__chart-card">
          <div className="dashboard-pro__chart-title">Weekly Tee Sheet</div>
          <div className="dashboard-pro__chart-sub">
            Bookings per day — last 7 days
          </div>
          <GradientBarChart />
        </div>
        <div className="dashboard-pro__chart-card dashboard-pro__chart-card--3d">
          <div className="dashboard-pro__chart-title">Performance Radar</div>
          <div className="dashboard-pro__chart-sub">
            Multi-metric course health score
          </div>
          <div className="chart-3d-inner">
            <RadarPerformanceChart />
          </div>
        </div>
        <div className="dashboard-pro__chart-card">
          <div className="dashboard-pro__chart-title">Fleet Status</div>
          <div className="dashboard-pro__chart-sub">Cart availability</div>
          <div style={{ padding: "20px 0" }}>
            {["Available", "In Use", "Maintenance"].map((status, i) => {
              const carts = getCollection("carts");
              const count =
                carts.filter((c) => c.status === status).length ||
                [12, 8, 3][i];
              const pct = Math.round((count / Math.max(carts.length, 1)) * 100);
              const colors = ["#2ed8b6", "#5d78ff", "#ff6b8a"];
              return (
                <div key={status} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      color: "var(--gco-text-muted)",
                      marginBottom: 6,
                    }}
                  >
                    <span>{status}</span>
                    <span>
                      {count} carts ({pct}%)
                    </span>
                  </div>
                  <div
                    style={{
                      height: 10,
                      borderRadius: 5,
                      background: "var(--gco-border)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        borderRadius: 5,
                        background: colors[i],
                        transition: "width 1.2s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProCharts;
