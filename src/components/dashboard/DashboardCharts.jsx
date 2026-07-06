import React, { useMemo } from "react";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";
import { useChartTheme, chartTooltip } from "./hooks/useChartTheme";
import { getDashboardMetrics } from "./dashboardData";

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

const ChartShell = ({ title, subtitle, children, className = "" }) => (
  <div className={`dash-chart-card dash-fade-in ${className}`}>
    <div className="dash-chart-card__head">
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
    </div>
    <div className="dash-chart-card__body">{children}</div>
  </div>
);

export const RevenueAreaChart = () => {
  const theme = useChartTheme();
  const { monthlyRevenue } = getDashboardMetrics();
  const data = useMemo(
    () => ({
      labels: MONTHS,
      datasets: [
        {
          label: "Revenue",
          data: monthlyRevenue,
          borderColor: "#6366f1",
          backgroundColor: "rgba(99,102,241,0.12)",
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 5,
          fill: true,
          lineTension: 0.35,
        },
      ],
    }),
    [monthlyRevenue]
  );
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      tooltips: {
        ...chartTooltip(theme),
        callbacks: { label: (i) => ` $${i.yLabel.toLocaleString()}` },
      },
      scales: {
        xAxes: [
          {
            gridLines: { display: false },
            ticks: { fontColor: theme.text, fontSize: 11 },
          },
        ],
        yAxes: [
          {
            gridLines: { color: theme.grid, drawBorder: false },
            ticks: {
              fontColor: theme.text,
              callback: (v) => `$${(v / 1000).toFixed(0)}k`,
            },
          },
        ],
      },
      animation: { duration: 1400, easing: "easeOutQuart" },
    }),
    [theme]
  );
  return (
    <ChartShell
      title="Revenue Analytics"
      subtitle="Monthly pro shop & course revenue"
    >
      <div style={{ height: 260 }}>
        <Line data={data} options={options} />
      </div>
    </ChartShell>
  );
};

export const ReservationsBarChart = () => {
  const theme = useChartTheme();
  const { weeklyReservations } = getDashboardMetrics();
  const data = useMemo(
    () => ({
      labels: WEEKDAYS,
      datasets: [
        {
          label: "Bookings",
          data: weeklyReservations,
          backgroundColor: [
            "rgba(99,102,241,0.85)",
            "rgba(14,165,233,0.85)",
            "rgba(16,185,129,0.85)",
            "rgba(139,92,246,0.85)",
            "rgba(99,102,241,0.85)",
            "rgba(20,184,166,0.85)",
            "rgba(59,130,246,0.85)",
          ],
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    }),
    [weeklyReservations]
  );
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      tooltips: chartTooltip(theme),
      scales: {
        xAxes: [
          {
            gridLines: { display: false },
            ticks: { fontColor: theme.text },
            barPercentage: 0.6,
          },
        ],
        yAxes: [
          {
            gridLines: { color: theme.grid, drawBorder: false },
            ticks: { fontColor: theme.text, beginAtZero: true },
          },
        ],
      },
      animation: { duration: 1200 },
    }),
    [theme]
  );
  return (
    <ChartShell
      title="Reservation Analytics"
      subtitle="Tee times booked — last 7 days"
    >
      <div style={{ height: 240 }}>
        <Bar data={data} options={options} />
      </div>
    </ChartShell>
  );
};

export const InventoryDonutChart = () => {
  const theme = useChartTheme();
  const { categorySplit } = getDashboardMetrics();
  const data = useMemo(
    () => ({
      labels: categorySplit.labels,
      datasets: [
        {
          data: categorySplit.data,
          backgroundColor: [
            "#6366f1",
            "#14b8a6",
            "#8b5cf6",
            "#3b82f6",
            "#10b981",
          ],
          borderWidth: 0,
        },
      ],
    }),
    [categorySplit]
  );
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 68,
      legend: {
        position: "bottom",
        labels: { fontColor: theme.text, usePointStyle: true, padding: 12 },
      },
      tooltips: chartTooltip(theme),
      animation: { animateRotate: true, duration: 1400 },
    }),
    [theme]
  );
  return (
    <ChartShell
      title="Inventory Overview"
      subtitle="Stock distribution by category"
    >
      <div style={{ height: 260 }}>
        <Doughnut data={data} options={options} />
      </div>
    </ChartShell>
  );
};

export const CustomerLineChart = () => {
  const theme = useChartTheme();
  const { customerGrowth } = getDashboardMetrics();
  const data = useMemo(
    () => ({
      labels: MONTHS,
      datasets: [
        {
          label: "Customers",
          data: customerGrowth,
          borderColor: "#14b8a6",
          backgroundColor: "rgba(20,184,166,0.1)",
          borderWidth: 2,
          fill: true,
          lineTension: 0.4,
          pointRadius: 3,
        },
      ],
    }),
    [customerGrowth]
  );
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      tooltips: chartTooltip(theme),
      scales: {
        xAxes: [
          {
            gridLines: { display: false },
            ticks: { fontColor: theme.text, fontSize: 10 },
          },
        ],
        yAxes: [
          {
            gridLines: { color: theme.grid, drawBorder: false },
            ticks: { fontColor: theme.text },
          },
        ],
      },
    }),
    [theme]
  );
  return (
    <ChartShell title="Customer Growth" subtitle="Registered golfers over time">
      <div style={{ height: 220 }}>
        <Line data={data} options={options} />
      </div>
    </ChartShell>
  );
};

export const SalesBarChart = () => {
  const theme = useChartTheme();
  const { monthlyRevenue } = getDashboardMetrics();
  const data = useMemo(
    () => ({
      labels: MONTHS.slice(0, 6),
      datasets: [
        {
          label: "Sales",
          data: monthlyRevenue.slice(0, 6),
          backgroundColor: "rgba(139,92,246,0.8)",
          borderRadius: 6,
        },
      ],
    }),
    [monthlyRevenue]
  );
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      tooltips: chartTooltip(theme),
      scales: {
        xAxes: [
          { gridLines: { display: false }, ticks: { fontColor: theme.text } },
        ],
        yAxes: [
          {
            gridLines: { color: theme.grid, drawBorder: false },
            ticks: { fontColor: theme.text },
          },
        ],
      },
    }),
    [theme]
  );
  return (
    <ChartShell title="Sales Analytics" subtitle="Half-year sales performance">
      <div style={{ height: 220 }}>
        <Bar data={data} options={options} />
      </div>
    </ChartShell>
  );
};

export const PerformanceRadarChart = () => {
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
          backgroundColor: "rgba(99,102,241,0.2)",
          borderColor: "#6366f1",
          borderWidth: 2,
        },
        {
          label: "Last Month",
          data: [72, 68, 75, 65, 78, 84],
          backgroundColor: "rgba(20,184,166,0.12)",
          borderColor: "#14b8a6",
          borderWidth: 2,
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
        ticks: { display: false, beginAtZero: true, max: 100 },
        pointLabels: { fontColor: theme.text, fontSize: 11 },
      },
      animation: { duration: 1300 },
    }),
    [theme]
  );
  return (
    <ChartShell
      title="Daily Performance"
      subtitle="Multi-metric course health score"
    >
      <div style={{ height: 260 }}>
        <Radar data={data} options={options} />
      </div>
    </ChartShell>
  );
};

const CHART_MAP = {
  revenue: RevenueAreaChart,
  reservations: ReservationsBarChart,
  inventory: InventoryDonutChart,
  customers: CustomerLineChart,
  sales: SalesBarChart,
  radar: PerformanceRadarChart,
};

export const ChartGrid = ({ chartKeys }) => (
  <div className="dash-chart-grid">
    {chartKeys.map((key) => {
      const Chart = CHART_MAP[key];
      return Chart ? <Chart key={key} /> : null;
    })}
  </div>
);
