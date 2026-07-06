import themeChangerActions from "redux/themeChanger/actions";
import themeSettingActions from "redux/themeSettings/actions";
import {
  LIGHT_THEME_PRESET,
  DARK_THEME_PRESET,
  applyBodyDarkClass,
} from "util/darkModeThemes";

const DARK_MODE_KEY = "gco_dark_mode";

export const toggleDarkMode = () => (dispatch, getState) => {
  const isDark = getState().themeSetting.darkModeValue === "on";
  const preset = isDark ? LIGHT_THEME_PRESET : DARK_THEME_PRESET;
  const nextValue = isDark ? "off" : "on";

  Object.entries(preset).forEach(([attribute, themeName]) => {
    dispatch(themeChangerActions.changeTheme(attribute, themeName));
  });

  dispatch(themeSettingActions.setDarkMode(nextValue));
  localStorage.setItem(DARK_MODE_KEY, nextValue);
  applyBodyDarkClass(!isDark);
};

export const initDarkModeFromStore = () => (dispatch, getState) => {
  const stored = localStorage.getItem(DARK_MODE_KEY);
  const isDark =
    stored === "on" || getState().themeSetting.darkModeValue === "on";

  if (isDark) {
    dispatch(themeSettingActions.setDarkMode("on"));
    Object.entries(DARK_THEME_PRESET).forEach(([attribute, themeName]) => {
      dispatch(themeChangerActions.changeTheme(attribute, themeName));
    });
  }
  applyBodyDarkClass(isDark);
};
