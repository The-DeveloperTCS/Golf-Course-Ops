import React from "react";
import { ROLE_LABELS } from "./dashboardData";

const WelcomeBanner = ({ user, metrics }) => {
  const name = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username
    : "Guest";
  const role = ROLE_LABELS[user?.role] || user?.jobTitle || "Team Member";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <section className="dash-welcome dash-fade-in">
      <div className="dash-welcome__content">
        <p className="dash-welcome__eyebrow">
          Waveland Golf Course · Operations
        </p>
        <h1 className="dash-welcome__title">
          {greeting}, <span>{name}</span>
        </h1>
        <p className="dash-welcome__subtitle">
          {role} dashboard — {metrics.reservationsToday} reservations today ·{" "}
          {metrics.utilization}% tee sheet utilization
        </p>
      </div>
      <div className="dash-welcome__stats">
        <div className="dash-welcome__pill">
          <i className="fas fa-golf-ball" />
          <span>{metrics.reservationsToday} bookings</span>
        </div>
        <div className="dash-welcome__pill">
          <i className="fas fa-car" />
          <span>{metrics.cartsAvailable} carts ready</span>
        </div>
        <div className="dash-welcome__pill dash-welcome__pill--live">
          <span className="dash-live-dot" />
          <span>Live</span>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
