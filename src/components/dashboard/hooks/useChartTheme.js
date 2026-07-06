import { useEffect, useState } from "react";

const isDarkMode = () =>
  document.body.classList.contains("dark-mode") ||
  document.documentElement.getAttribute("data-theme") === "dark";

export const useChartTheme = () => {
  const [, setTick] = useState(0);

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

  const dark = isDarkMode();
  return {
    text: dark ? "#949ba2" : "#64748b",
    grid: dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
    tooltipBg: dark ? "#222437" : "#ffffff",
    tooltipTitle: dark ? "#f1f5f9" : "#0f172a",
    tooltipBody: dark ? "#94a3b8" : "#64748b",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
  };
};

export const chartTooltip = (theme) => ({
  mode: "index",
  intersect: false,
  backgroundColor: theme.tooltipBg,
  titleFontColor: theme.tooltipTitle,
  bodyFontColor: theme.tooltipBody,
  borderColor: theme.border,
  borderWidth: 1,
});
