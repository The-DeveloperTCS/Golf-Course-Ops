import React from "react";
import HeaderWrapper from "./header.style";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { ProfileLockScreen } from "helper/constant";
import { connect } from "react-redux";
import { compose } from "redux";
import AuthActions from "redux/auth/actions";
import { withRouter } from "react-router-dom";

const { logout } = AuthActions;

const Header = (props) => {
  const { drawerMiniMethod, mini } = props;

  const userSignout = () => {
    props.logout();
  };

  return (
    <HeaderWrapper {...props}>
      <div className="headerBack">
        <div className="flex-x align-center">
          <div className="drawer-handle-arrow  flex-1">
            {mini ? (
              <button
                className="top-header-icon"
                onClick={() => drawerMiniMethod()}
              >
                <i className="fas fa-bars"></i>
              </button>
            ) : (
              <button
                className="top-header-icon"
                onClick={() => drawerMiniMethod()}
              >
                <i className="fas fa-bars"></i>
              </button>
            )}
          </div>
          <div
            className="mini-drawer-menu-icon"
            onClick={() => drawerMiniMethod()}
          >
            <i className="fas fa-bars" />{" "}
            <span className="app-name fs-16 bold-text">{"Roe"}</span>
          </div>
          <div className="pl-10">
            <button className="top-header-icon">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="pl-10">
            <div id="profile">
              <img
                className="top-header-profile-class"
                src={ProfileLockScreen}
                alt="notify"
              />
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
                <div className="roy-menu-list">Settings</div>
                <div className="roy-menu-list" onClick={userSignout}>
                  Logout
                </div>
              </PopoverBody>
            </UncontrolledPopover>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default compose(withRouter, connect(null, { logout }))(Header);
