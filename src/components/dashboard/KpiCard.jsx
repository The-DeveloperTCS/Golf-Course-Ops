import React from "react";
import { Line } from "react-chartjs-2";

const MiniSparkline = ({ data, color = "#6366f1" }) => {
  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        data,
        borderColor: color,
        backgroundColor: `${color}22`,
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        lineTension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    tooltips: { enabled: false },
    scales: {
      xAxes: [{ display: false }],
      yAxes: [{ display: false }],
    },
    animation: { duration: 1200 },
  };

  return (
    <div className="dash-kpi__spark">
      <Line data={chartData} options={options} />
    </div>
  );
};

const formatValue = (value, format) => {
  if (format === "currency") {
    return `$${Number(value).toLocaleString()}`;
  }
  return Number(value).toLocaleString();
};

const KpiCard = ({ kpi, animatedValue, loading }) => {
  if (loading) {
    return (
      <div className={`dash-kpi dash-kpi--${kpi.accent} dash-kpi--skeleton`}>
        <div className="dash-skeleton dash-skeleton--icon" />
        <div className="dash-skeleton dash-skeleton--line lg" />
        <div className="dash-skeleton dash-skeleton--line sm" />
      </div>
    );
  }

  const display = formatValue(animatedValue ?? kpi.value, kpi.format);

  return (
    <article className={`dash-kpi dash-kpi--${kpi.accent} dash-fade-in`}>
      <div className="dash-kpi__top">
        <div className="dash-kpi__icon">
          <i className={`fas ${kpi.icon}`} />
        </div>
        <span className={`dash-kpi__trend dash-kpi__trend--${kpi.trendDir}`}>
          <i
            className={`fas fa-arrow-${
              kpi.trendDir === "down" ? "down" : "up"
            }`}
          />
          {kpi.trend}
        </span>
      </div>
      <div className="dash-kpi__value">{display}</div>
      <div className="dash-kpi__label">{kpi.label}</div>
      {kpi.spark && <MiniSparkline data={kpi.spark} />}
    </article>
  );
};

export default KpiCard;
