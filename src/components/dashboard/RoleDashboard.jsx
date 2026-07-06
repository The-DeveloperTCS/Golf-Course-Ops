import React, { useEffect, useState, useMemo } from "react";
import WelcomeBanner from "./WelcomeBanner";
import KpiCard from "./KpiCard";
import { ChartGrid } from "./DashboardCharts";
import QuickActions, {
  RecentActivity,
  RecentTransactions,
  UpcomingReservations,
  NotificationsPanel,
  TopProducts,
  LowInventoryAlerts,
  WeeklyGoals,
  SystemStatus,
} from "./DashboardWidgets";
import DashboardSalesTable from "./DashboardSalesTable";
import { useAnimatedCounter } from "./hooks/useAnimatedCounter";
import {
  getDashboardMetrics,
  getKpisForRole,
  getRoleLayout,
} from "./dashboardData";
import "./dashboard.scss";

const KpiCardAnimated = ({ kpi, loading }) => {
  const animated = useAnimatedCounter(kpi.value, 900, !loading);
  return <KpiCard kpi={kpi} animatedValue={animated} loading={loading} />;
};

const RoleDashboard = ({ user, permissions }) => {
  const [loading, setLoading] = useState(true);
  const role = user?.role || "ROLE_PRO_SHOP_STAFF";
  const layout = useMemo(() => getRoleLayout(role), [role]);
  const metrics = useMemo(() => getDashboardMetrics(), []);
  const kpis = useMemo(() => getKpisForRole(role), [role]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const renderWidget = (key) => {
    switch (key) {
      case "quickActions":
        return <QuickActions key={key} permissions={permissions} />;
      case "recentActivity":
        return <RecentActivity key={key} items={metrics.recentActivity} />;
      case "recentTransactions":
        return (
          <RecentTransactions key={key} items={metrics.recentTransactions} />
        );
      case "upcomingReservations":
        return (
          <UpcomingReservations
            key={key}
            items={metrics.upcomingReservations}
          />
        );
      case "notifications":
        return <NotificationsPanel key={key} />;
      case "topProducts":
        return <TopProducts key={key} products={metrics.topProducts} />;
      case "lowInventory":
        return <LowInventoryAlerts key={key} items={metrics.lowInventory} />;
      case "weeklyGoals":
        return <WeeklyGoals key={key} metrics={metrics} />;
      case "systemStatus":
        return <SystemStatus key={key} metrics={metrics} />;
      default:
        return null;
    }
  };

  const primaryWidgets = layout.widgets.filter((w) =>
    [
      "quickActions",
      "recentActivity",
      "recentTransactions",
      "upcomingReservations",
    ].includes(w)
  );
  const secondaryWidgets = layout.widgets.filter(
    (w) => !primaryWidgets.includes(w)
  );

  return (
    <div className="dash-enterprise">
      <WelcomeBanner user={user} metrics={metrics} />

      <section className="dash-kpi-grid">
        {kpis.map((kpi) => (
          <KpiCardAnimated key={kpi.key} kpi={kpi} loading={loading} />
        ))}
      </section>

      <ChartGrid chartKeys={layout.charts} />

      <div className="dash-widgets-primary">
        {primaryWidgets.map(renderWidget)}
      </div>

      {secondaryWidgets.length > 0 && (
        <div className="dash-widgets-secondary">
          {secondaryWidgets.map(renderWidget)}
        </div>
      )}

      {layout.showSalesTable && <DashboardSalesTable sales={metrics.sales} />}
    </div>
  );
};

export default RoleDashboard;
