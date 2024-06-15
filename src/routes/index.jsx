import Layout from "layouts/DashboardLayout.jsx";
import { Login, Error400, Error500 } from "./../views/pages/index";

const indexRoutes = [
  { path: "/login", component: Login },

  { path: "/error400", component: Error400 },
  { path: "/error500", component: Error500 },
  { path: "/", component: Layout },
];

export default indexRoutes;
