import Intro from "views/Intro";
import BulkPayment from "views/pages/payment/BulkPayment";
import NotFound from "views/pages/NotFound";
import AccessManagement from "views/pages/authentication/AccessManagement";
import Employee from "views/pages/employees/Employees";
import Locations from "views/pages/location/Locations";
import AdminTeeSheet from "views/pages/adminTeeSheet/AdminTeeSheet";
import AdminTeeSheet2 from "views/pages/adminTeeSheet/AdminTeeSheet2";
import AdminTeeSheetSetting from "views/pages/adminTeeSheet/AdminTeeSheetSetting";
import AdminDashboardItems from "views/pages/tee-slot/AdminDashboardItems";
import Inventory from "views/pages/inventory/inventory";
import ClockIn from "views/pages/clockInClockOut/ClockIn";
import HelpSupport from "views/pages/helpSupport/HelpSupport";
import Reports from "views/pages/Reports/Reports";
import InventoryForm from "views/pages/inventoryform/InventoryForm";
import JesterPark from "views/pages/JesterPark/JesterPark";

import Cart from "views/pages/cart/Cart";

const dashboardRoutes = [
  // { path: "/intro", component: Intro, resource: "" },
  { path: "/employee", component: Employee, resource: "" },
  { path: "/location", component: Locations, resource: "" },
  { path: "/adminTeeSheet", component: AdminTeeSheet, resource: "" },
  { path: "/adminTeeSheet2", component: AdminTeeSheet2, resource: "" },
  { path: "/clockIn", component: ClockIn, resource: "" },
  {
    path: "/adminTeeSheetSetting",
    component: AdminTeeSheetSetting,
    resource: "",
  },
  {
    path: "/adminDashboardItems",
    component: AdminDashboardItems,
    resource: "",
  },
  { path: "/inventory", component: Inventory, resource: "" },
  { path: "/helpSupport", component: HelpSupport, resource: "" },
  { path: "/reports", component: Reports, resource: "" },
  { path: "/inventoryForm", component: InventoryForm, resource: "" },
  { path: "/jesterPark", component: JesterPark, resource: "" },

  { path: "/cart", component: Cart, resource: "" },

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
