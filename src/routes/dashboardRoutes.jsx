import Intro from "views/Intro";
import BulkPayment from "views/pages/payment/BulkPayment";
import NotFound from "views/pages/NotFound";
import AccessManagement from "views/pages/authentication/AccessManagement";

const dashboardRoutes = [
  { path: "/intro", component: Intro, resource: "" },
  {
    path: "/pending-payments",
    component: BulkPayment,
    resource: "PENDING_PAYMENTS",
  },
  {
    path: "/access-management",
    component: AccessManagement,
    resource: "ACCESS_MANAGEMENT",
  },
  {
    path: "*",
    wildcard: true,
    component: NotFound,
    resource: "",
  },
];

export default dashboardRoutes;
