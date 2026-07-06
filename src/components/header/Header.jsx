import React from "react";
import HeaderWrapper from "./header.style";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import ProfileLockScreen from "../../assets/images/profile.jpg";
import { connect } from "react-redux";
import { compose } from "redux";
import AuthActions from "redux/auth/actions";
import { withRouter } from "react-router-dom";
import { FaRegBell, FaCaretDown, FaMoon, FaSun } from "react-icons/fa";
import { toggleDarkMode } from "util/toggleDarkMode";

const { logout } = AuthActions;

const Header = (props) => {
  const {
    drawerMiniMethod,
    pageName,
    user,
    darkModeValue,
    onToggleDarkMode,
  } = props;
  const topbarTheme = { backgroundColor: "#FFFFF" };
  const isDark = darkModeValue === "on";
  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username
    : "Admin";

  const userSignout = () => {
    props.logout();
  };

  return (
    <HeaderWrapper {...props} topbarTheme={topbarTheme}>
      <div className="headerBack">
        <div className="flex-x justify- space-between align-center">
          <div className="header-search-bar">
            <div
              className="mini-drawer-menu-icon"
              onClick={() => drawerMiniMethod()}
            >
              <i className="fas fa-bars" />
              <span className="app-name fs-16 bold-text">{""}</span>
            </div>
            <div className="pl-10">{pageName}</div>
          </div>

          <div className="pl-10 flex-x align-center cursor-pointer">
            <button
              type="button"
              className={`dark-mode-toggle ${isDark ? "is-dark" : ""}`}
              onClick={onToggleDarkMode}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
            <p style={{ padding: "0px 5px", fontWeight: "500" }}>
              {displayName}
            </p>
            <div id="profile" className="mr-10">
              <img
                className="top-header-profile-class"
                src={ProfileLockScreen}
                alt="notify"
              />
              <FaCaretDown />
            </div>
            <div>
              <FaRegBell />
            </div>
          </div>
          <UncontrolledPopover
            className="roy-menu"
            innerClassName="roy-inner-content"
            placement="bottom-end"
            target="profile"
            trigger="legacy"
          >
            <PopoverBody>
              <div
                className="roy-menu-list"
                onClick={() => props.history.push("/profile")}
              >
                My Profile
              </div>
              {/* <div className="roy-menu-list">Settings</div> */}
              <div className="roy-menu-list" onClick={userSignout}>
                Logout
              </div>
            </PopoverBody>
          </UncontrolledPopover>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default compose(
  withRouter,
  connect(
    (state) => ({
      user: state.auth.user,
      darkModeValue: state.themeSetting.darkModeValue,
    }),
    { logout, onToggleDarkMode: toggleDarkMode }
  )
)(Header);
