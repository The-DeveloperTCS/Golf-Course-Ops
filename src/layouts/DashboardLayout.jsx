import React, { useState, useRef, useMemo, useEffect } from "react";
import { bindActionCreators } from "redux";
import Sidebar from "components/sidebar/Sidebar";
import HorizontalSidebar from "components/horizontalsidebar/HorizontalSidebar";
import ThemeSetting from "components/themesetting/ThemeSetting";
import dashboardRoutes from "routes/dashboardRoutes";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import themeActions from "redux/themeChanger/actions.js";
import settingactions from "redux/themeSettings/actions";
import AppLocale from "languageProvider";
import CustomToast from "components/notifications/CustomToast";
import SweetAlert from "react-bootstrap-sweetalert";

import { isTest } from "Constants";

import {
  drawerWidth,
  miniDrawerWidth,
  themeSettingDrawerWidth,
} from "helper/constant";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { ProtectedRoute } from "./../routes/ProtectedRoute";
import GlobalWrapper from "./global.style";
import LayoutSettings from "components/layoutsetting/LayoutSettings";

import notificationActions from "redux/notifications/actions";
import authActions from "redux/auth/actions";
import SideRibbon from "components/ribbons/SideRibbon";

const { changeTheme } = themeActions;
const { sidebarMini } = settingactions;

const DashboardLayout = (props) => {
  const [mini, setMini] = useState(
    props.themeSetting.sidebarMiniValue
      ? props.themeSetting.sidebarMiniValue === "on"
      : false
  );

  const [themeDrawer, setThemeDrawer] = useState(true);
  const [layoutSettingDrawer, setLayoutSettingDrawer] = useState(true);
  const [statedrawerWidth] = useState(drawerWidth);
  const [stateminiDrawerWidth, setStateminiDrawerWidth] = useState(
    miniDrawerWidth
  );
  const mainPanel = useRef(null);
  const scrollbars = useRef(null);
  const { fetchPermissions } = props;

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  useMemo(() => {
    if (scrollbars && scrollbars.current) {
      scrollbars.current.scrollToTop(0);
    }
  }, []);

  console.log(props, "props");

  const allowedPermissions = useMemo(() => {
    return props.authData.permissions.map((p) => p.name);
  }, [props.authData.permissions]);

  useMemo(() => {
    setMini(props.themeSetting.sidebarMiniValue === "on");
  }, [props.themeSetting.sidebarMiniValue]);

  let mainPanelWidth;

  const { layoutTheme, locale, themeSetting } = props;
  const currentAppLocale = AppLocale[locale];

  if (themeSetting.layout === "vertical") {
    mainPanelWidth = {
      width: mini
        ? `calc(100% - ${miniDrawerWidth})`
        : `calc(100% - ${drawerWidth})`,
      backgroundColor: layoutTheme.backgroundColor,
    };
  } else if (themeSetting.layout === "horizontal") {
    mainPanelWidth = {
      width: "100%",
      backgroundColor: layoutTheme.backgroundColor,
    };
  }

  const drawerMiniMethod = () => {
    if (mini) {
      setMini(false);
      props.sidebarMini("off");
    } else {
      setMini(true);
      props.sidebarMini("on");
    }
  };

  const themeSettingDrawer = () => {
    if (themeDrawer) {
      setThemeDrawer(false);
    } else {
      setThemeDrawer(true);
    }
  };

  const toggleLayoutSettingDrawer = () => {
    setLayoutSettingDrawer(!layoutSettingDrawer);
  };

  const mouseEnter = () => {
    if (mini) {
      setStateminiDrawerWidth(drawerWidth);
    }
  };

  const mouseLeave = () => {
    if (mini) {
      setStateminiDrawerWidth(miniDrawerWidth);
    }
  };

  const closeDrawer = () => {
    setMini(true);
  };
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <GlobalWrapper {...props}>
        {themeSetting.layout === "vertical" && (
          <Sidebar
            mini={mini}
            drawerWidth={statedrawerWidth}
            miniDrawerWidth={stateminiDrawerWidth}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            closeDrawer={() => closeDrawer}
            {...props}
          />
        )}
        {themeSetting.layout === "horizontal" && (
          <div className="hor_mobile_sidebar">
            <Sidebar
              mini={mini}
              drawerWidth={statedrawerWidth}
              miniDrawerWidth={stateminiDrawerWidth}
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
              closeDrawer={() => closeDrawer}
              {...props}
            />
          </div>
        )}

        <ThemeSetting
          mini={themeDrawer}
          drawerWidth={themeSettingDrawerWidth}
          miniDrawerWidth={stateminiDrawerWidth}
          closeSettingDrawer={themeSettingDrawer}
          {...props}
        />

        <LayoutSettings
          mini={layoutSettingDrawer}
          drawerWidth={themeSettingDrawerWidth}
          miniDrawerWidth={stateminiDrawerWidth}
          closeSettingDrawer={toggleLayoutSettingDrawer}
          {...props}
        />

        <div
          id="main-panel"
          className="main-panel flex-y"
          ref={mainPanel}
          style={mainPanelWidth}
        >
          <div>
            {themeSetting.layout === "horizontal" && (
              <HorizontalSidebar
                {...props}
                drawerMiniMethod={drawerMiniMethod}
                layoutSettingDrawerToggle={toggleLayoutSettingDrawer}
              />
            )}
            {themeSetting.layout === "vertical" &&
              props.themeSetting.toolbarDisplayValue === "show" && (
                <Header
                  drawerMiniMethod={drawerMiniMethod}
                  mini={mini}
                  drawerWidth={statedrawerWidth}
                  miniDrawerWidth={stateminiDrawerWidth}
                  layoutSettingDrawerToggle={toggleLayoutSettingDrawer}
                  {...props}
                />
              )}
          </div>

          {/* Notifications */}
          <CustomToast
            heading={"Yay!"}
            width={400}
            show={!!props.notifications.success}
            transition
            position="top-right"
            className="c-success"
            message={props.notifications.success}
            onCloseCLick={() => props.clearNotifications()}
          />
          <CustomToast
            heading={"Ouch!"}
            width={400}
            show={!!props.notifications.failure}
            transition
            position="top-right"
            className="c-danger"
            message={props.notifications.failure}
            onCloseCLick={() => props.clearNotifications()}
          />

          <CustomToast
            heading={"Warning!"}
            width={400}
            show={!!props.notifications.warning}
            transition
            position="top-right"
            className="c-warning"
            message={props.notifications.warning}
            onCloseCLick={() => props.clearNotifications()}
          />
          {/* Route Layout Start*/}

          {/* Error Dialog */}
          {props.notifications.error && (
            <SweetAlert
              title={props.notifications.error.title}
              onConfirm={() => props.clearError()}
              show={!!props.notifications.error.title}
            >
              {props.notifications.error.message}
            </SweetAlert>
          )}

          <div
            className="route-height flex-1 overflow-auto"
            style={{ backgroundColor: "#EEF0F6" }}
            // style={
            //   themeSetting.toolbarDisplayValue === "show"
            //     ? {
            //         background: layoutTheme.backgroundColor,
            //       }
            //     : {
            //         background: layoutTheme.backgroundColor,
            //       }
            // }
          >
            <Switch>
              <ProtectedRoute {...props}>
                <Switch>
                  {dashboardRoutes
                    .filter((l) => {
                      return (
                        allowedPermissions.includes(l.resource) ||
                        l.resource === ""
                      );
                    })
                    .map((prop, key) => {
                      return (
                        <Route
                          exact={!prop.wildcard}
                          path={prop.path}
                          component={prop.component}
                          key={key}
                        />
                      );
                    })}
                </Switch>
              </ProtectedRoute>
            </Switch>
          </div>
          {/* Route Layout Finish*/}
          <div>
            {themeSetting.footerDisplayValue === "show" && (
              <Footer
                {...props}
                mini={mini}
                drawerWidth={statedrawerWidth}
                miniDrawerWidth={stateminiDrawerWidth}
              />
            )}
          </div>
        </div>

        {isTest() && <SideRibbon text="testing" />}
      </GlobalWrapper>
    </IntlProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.themeChanger,
    LanguageSwitcher: state.LanguageSwitcher,
    locale: state.LanguageSwitcher.language.locale,
    authData: {
      token: state.auth.accessToken,
      isLogin: state.auth.isLogin,
      permissions: state.auth.permissions,
    },
    themeSetting: {
      toolbarAlignValue: state.themeSetting.toolbarAlignValue,
      footerAlignValue: state.themeSetting.footerAlignValue,
      sidebarDisplayValue: state.themeSetting.sidebarDisplayValue,
      toolbarDisplayValue: state.themeSetting.toolbarDisplayValue,
      footerDisplayValue: state.themeSetting.footerDisplayValue,
      sidebarTransParentValue: state.themeSetting.sidebarTransParentValue,
      transparentImage: state.themeSetting.transparentImage,
      activeLinkStyle: state.themeSetting.activeLinkStyle,
      sidebarMiniValue: state.themeSetting.sidebarMiniValue,
      layout: state.themeSetting.layout,
      sidebarTransParentActiveBack:
        state.themeSetting.sidebarTransParentActiveBack,
      sidebarTransParentActiveColor:
        state.themeSetting.sidebarTransParentActiveColor,
    },
    notifications: {
      success: state.notifications.success,
      failure: state.notifications.failure,
      warning: state.notifications.warning,
      error: state.notifications.error,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    changeTheme,
    sidebarMini,
    ...bindActionCreators(notificationActions, dispatch),
    ...bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
