import loader from "./loader/reducer";
import themeChanger from "./themeChanger/reducer";
import LanguageSwitcher from "./languageSwitcher/reducer";
import themeSetting from "./themeSettings/reducer";
import scrumboard from "./scrumboard/reducer";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authActions from "./auth/actions";
import auth from "./auth/reducer";
import notifications from "./notifications/reducer";
import employee from "./employee/reducer";
import location from "./location/reducer";
import customer from "./customer/reducer";
import giftCard from "./giftCard/reducer";
import inventory from "./inventory/reducer";
import cart from "./cart/reducer";
import supplier from "./supplier/reducer";
import terminal from "./terminal/reducer";
import department from "./department/reducer";
import group from "./group/reducer";
import categories from "./category/reducer";
import role from "./role/reducer";
import permission from "./permission/reducer";
import seasons from "./season/reducer";

const createReducer = () => rootReducer;

const appReducer = combineReducers({
  loader,
  employee,
  location,
  customer,
  giftCard,
  inventory,
  cart,
  supplier,
  terminal,
  seasons,
  department,
  group,
  categories,
  role,
  permission,
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
