import auth from "./auth/reducer";
import users from "./users/reducer";
import notifications from "./notifications/reducer";
import payment from "./payment/reducer";
import loader from "./loader/reducer";
import themeChanger from "./themeChanger/reducer";
import LanguageSwitcher from "./languageSwitcher/reducer";
import themeSetting from "./themeSettings/reducer";
import scrumboard from "./scrumboard/reducer";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authActions from "./auth/actions";
const createReducer = () => rootReducer;

const appReducer = combineReducers({
  auth,
  users,
  loader,
  notifications,
  payment,
  themeChanger,
  LanguageSwitcher,
  themeSetting,
  scrumboard,
  router: routerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === authActions.LOGOUT) {
    localStorage.removeItem("persist:persistedStore");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default createReducer;