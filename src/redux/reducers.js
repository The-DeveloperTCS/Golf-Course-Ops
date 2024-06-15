import loader from "./loader/reducer";
import themeChanger from "./themeChanger/reducer";
import LanguageSwitcher from "./languageSwitcher/reducer";
import themeSetting from "./themeSettings/reducer";
import scrumboard from "./scrumboard/reducer";
import { combineReducers } from "redux";
import employee from "./employee/reducer";
import { routerReducer } from "react-router-redux";
import authActions from "./auth/actions";
import auth from "./auth/reducer";
import notifications from "./notifications/reducer";

const createReducer = () => rootReducer;

const appReducer = combineReducers({
  loader,
  employee,
  LanguageSwitcher,
  themeSetting,
  scrumboard,
  router: routerReducer,
  auth,
  notifications,
  themeChanger,
});

const rootReducer = (state, action) => {
  if (action.type === authActions.LOGOUT) {
    localStorage.removeItem("persist:persistedStore");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default createReducer;
