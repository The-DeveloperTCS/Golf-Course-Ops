import React from "react";
import { connect } from "react-redux";
import RoleDashboard from "components/dashboard/RoleDashboard";

const Intro = ({ user, permissions }) => (
  <div className="dash-page">
    <RoleDashboard user={user} permissions={permissions || []} />
  </div>
);

export default connect((state) => ({
  user: state.auth.user,
  permissions: state.auth.permissions,
}))(Intro);
