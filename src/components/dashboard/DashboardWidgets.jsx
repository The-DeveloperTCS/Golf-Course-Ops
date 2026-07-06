import React from "react";
import { Link } from "react-router-dom";
import { getQuickActionsForUser } from "./dashboardData";

const QuickActions = ({ permissions }) => {
  const actions = getQuickActionsForUser(permissions);
  if (!actions.length) return null;

  return (
    <div className="dash-widget dash-fade-in">
      <div className="dash-widget__head">
        <h3>Quick Actions</h3>
        <p>Frequently used tools for your role</p>
      </div>
      <div className="dash-quick-actions">
        {actions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className="dash-quick-action"
          >
            <span className="dash-quick-action__icon">
              <i className={`fas ${action.icon}`} />
            </span>
            <span>{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const WidgetShell = ({ title, subtitle, children, action }) => (
  <div className="dash-widget dash-fade-in">
    <div className="dash-widget__head">
      <div>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
    <div className="dash-widget__body">{children}</div>
  </div>
);

export const RecentActivity = ({ items }) => (
  <WidgetShell title="Recent Activity" subtitle="Latest course operations">
    <ul className="dash-activity-list">
      {items.map((item) => (
        <li key={item.id} className="dash-activity-item">
          <span className="dash-activity-item__icon">
            <i className={`fas ${item.icon}`} />
          </span>
          <div>
            <p>{item.text}</p>
            <span>
              {item.meta} · {item.time}
            </span>
          </div>
        </li>
      ))}
    </ul>
  </WidgetShell>
);

export const RecentTransactions = ({ items }) => (
  <WidgetShell title="Recent Transactions" subtitle="Latest pro shop sales">
    <ul className="dash-tx-list">
      {items.map((tx) => (
        <li key={tx.id} className="dash-tx-item">
          <div className="dash-tx-item__main">
            <strong className="dash-tx-item__customer">{tx.customer}</strong>
            <span className="dash-tx-item__meta">
              #{tx.id} · {tx.items} items
            </span>
          </div>
          <div className="dash-tx-item__right">
            <span className="dash-tx-item__amount">{tx.total}</span>
            <span className={`dash-badge dash-badge--${tx.type}`}>
              {tx.type}
            </span>
          </div>
        </li>
      ))}
    </ul>
  </WidgetShell>
);

export const UpcomingReservations = ({ items }) => (
  <WidgetShell
    title="Upcoming Reservations"
    subtitle="Next tee times on the sheet"
  >
    <ul className="dash-res-list">
      {items.map((r) => (
        <li key={r.id} className="dash-res-item">
          <div className="dash-res-item__time">
            <strong>{r.time}</strong>
            <span>{r.date}</span>
          </div>
          <div>
            <p>{r.customer}</p>
            <span>{r.holes} holes</span>
          </div>
          <span className="dash-badge dash-badge--booked">{r.status}</span>
        </li>
      ))}
    </ul>
  </WidgetShell>
);

export const NotificationsPanel = () => {
  const notes = [
    {
      id: 1,
      type: "info",
      text: "Twilight rates active this weekend",
      time: "2h ago",
    },
    {
      id: 2,
      type: "warn",
      text: "3 inventory items below reorder level",
      time: "4h ago",
    },
    { id: 3, type: "success", text: "Terminal 2 back online", time: "6h ago" },
    {
      id: 4,
      type: "info",
      text: "League Group 4 check-in at 2:00 PM",
      time: "Today",
    },
  ];
  return (
    <WidgetShell title="Notifications" subtitle="Course alerts & updates">
      <ul className="dash-notify-list">
        {notes.map((n) => (
          <li
            key={n.id}
            className={`dash-notify-item dash-notify-item--${n.type}`}
          >
            <span className="dash-notify-dot" />
            <div>
              <p>{n.text}</p>
              <span>{n.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </WidgetShell>
  );
};

export const TopProducts = ({ products }) => (
  <WidgetShell title="Top Selling Products" subtitle="Highest value inventory">
    <ul className="dash-products-list">
      {products.map((p, i) => (
        <li key={p.sku} className="dash-product-item">
          <span className="dash-product-rank">{i + 1}</span>
          <div>
            <p>{p.name}</p>
            <span>
              {p.sku} · Qty {p.qty}
            </span>
          </div>
          <strong>${p.revenue.toLocaleString()}</strong>
        </li>
      ))}
    </ul>
  </WidgetShell>
);

export const LowInventoryAlerts = ({ items }) => (
  <WidgetShell title="Low Inventory Alerts" subtitle="Items needing restock">
    {items.length === 0 ? (
      <p className="dash-empty">All inventory levels are healthy.</p>
    ) : (
      <ul className="dash-alert-list">
        {items.slice(0, 5).map((item) => (
          <li key={item.id} className="dash-alert-item">
            <div>
              <p>{item.itemName}</p>
              <span>{item.sku}</span>
            </div>
            <span className="dash-badge dash-badge--warn">
              {item.quantity} left
            </span>
          </li>
        ))}
      </ul>
    )}
  </WidgetShell>
);

export const WeeklyGoals = ({ metrics }) => {
  const goals = [
    { label: "Revenue target", pct: 78, color: "#6366f1" },
    {
      label: "Tee sheet fill rate",
      pct: metrics.utilization,
      color: "#14b8a6",
    },
    { label: "Customer retention", pct: 86, color: "#8b5cf6" },
  ];
  return (
    <WidgetShell title="Weekly Goals" subtitle="Progress toward targets">
      <div className="dash-goals">
        {goals.map((g) => (
          <div key={g.label} className="dash-goal">
            <div className="dash-goal__head">
              <span>{g.label}</span>
              <strong>{g.pct}%</strong>
            </div>
            <div className="dash-goal__track">
              <div
                className="dash-goal__fill"
                style={{ width: `${g.pct}%`, background: g.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
};

export const SystemStatus = ({ metrics }) => {
  const items = [
    {
      label: "Terminals online",
      value: `${metrics.terminalsOnline}/${metrics.terminalsTotal}`,
      ok: true,
    },
    {
      label: "Cart fleet",
      value: `${metrics.cartsAvailable} available`,
      ok: metrics.cartsAvailable > 10,
    },
    { label: "Staff on duty", value: `${metrics.attendance} active`, ok: true },
    {
      label: "Inventory alerts",
      value: metrics.inventoryAlerts,
      ok: metrics.inventoryAlerts < 5,
    },
  ];
  return (
    <WidgetShell title="System Status" subtitle="Live operational health">
      <ul className="dash-status-list">
        {items.map((item) => (
          <li key={item.label} className="dash-status-item">
            <span className={`dash-status-dot ${item.ok ? "ok" : "warn"}`} />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </li>
        ))}
      </ul>
    </WidgetShell>
  );
};

export default QuickActions;
