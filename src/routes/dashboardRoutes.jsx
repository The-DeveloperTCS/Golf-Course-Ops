import Intro from "views/Intro";
import EmployeesList from "views/pages/employees/EmployeesList";
import NewEmployee from "views/pages/employees/NewEmployee";
import EmployeeSingle from "views/pages/employees/SingleEmployee";

import LocationList from "views/pages/location/LocationList";
import NewLocation from "views/pages/location/NewLocation";
import SingleLocation from "views/pages/location/SingleLocation";

import CustomerList from "views/pages/customer/CustomerList";
import NewCustomer from "views/pages/customer/NewCustomer";
import SingleCustomer from "views/pages/customer/SingleCustomer";

import GiftCardList from "views/pages/giftCard/GiftCardList";
import NewGiftCard from "views/pages/giftCard/NewGiftCard";
import SingleGiftCard from "views/pages/giftCard/SingleGiftCard";

import InventoryList from "views/pages/inventory/InventoryList";
import NewInventory from "views/pages/inventory/NewInventory";
import SingleInventory from "views/pages/inventory/SingleInventory";

import CartList from "views/pages/cart/CartList";
import NewCart from "views/pages/cart/NewCart";
import SingleCart from "views/pages/cart/SingleCart";

import SupplierList from "views/pages/supplier/SupplierList";
import NewSupplier from "views/pages/supplier/NewSupplier";
import SingleSupplier from "views/pages/supplier/SingleSupplier";

import TerminalList from "views/pages/terminal/TerminalList";
import NewTerminal from "views/pages/terminal/NewTerminal";
import SingleTerminal from "views/pages/terminal/SingleTerminal";

import DepartmentList from "views/pages/department/DepartmentList";
import NewDepartment from "views/pages/department/NewDepartment";
import SingleDepartment from "views/pages/department/SingleDepartment";

import GroupList from "views/pages/group/GroupList";
import NewGroup from "views/pages/group/NewGroup";
import SingleGroup from "views/pages/group/SingleGroup";

import CategoryList from "views/pages/category/CategoryList";
import NewCategory from "views/pages/category/NewCategory";
import SingleCategory from "views/pages/category/SingleCategory";

import SubCategoryList from "views/pages/subCategory/SubCategoryList";
import NewSubCategory from "views/pages/subCategory/NewSubCategory";
import SingleSubCategory from "views/pages/subCategory/SingleSubCategory";

import RoleList from "views/pages/role/RoleList";
import NewRole from "views/pages/role/NewRole";
import SingleRole from "views/pages/role/SingleRole";

import PermissionList from "views/pages/permission/PermissionList";
import NewPermission from "views/pages/permission/NewPermission";
import SinglePermission from "views/pages/permission/SinglePermission";

import AccessManagement from "views/pages/authentication/AccessManagement";
import NotFound from "views/pages/NotFound";

// import AdminTeeSheet from "views/pages/adminTeeSheet/AdminTeeSheet";
// import AdminTeeSheet2 from "views/pages/adminTeeSheet/AdminTeeSheet2";
// import AdminTeeSheetSetting from "views/pages/adminTeeSheet/AdminTeeSheetSetting";
// import AdminDashboardItems from "views/pages/tee-slot/AdminDashboardItems";
// import ClockIn from "views/pages/clockInClockOut/ClockIn";
// import HelpSupport from "views/pages/helpSupport/HelpSupport";
// import Reports from "views/pages/Reports/Reports";
// import InventoryForm from "views/pages/inventoryform/InventoryForm";
// import JesterPark from "views/pages/JesterPark/JesterPark";

const dashboardRoutes = [
  { path: "/intro", component: Intro, resource: "DASHBOARD" },

  {
    path: "/employee/list",
    component: EmployeesList,
    resource: "EMPLOYEE",
  },

  {
    path: "/employee/new",
    component: NewEmployee,
    resource: "EMPLOYEE",
  },
  {
    path: "/employee/:employeeId(\\d+)",
    component: EmployeeSingle,
    resource: "EMPLOYEE",
  },

  {
    path: "/location/list",
    component: LocationList,
    resource: "LOCATION",
  },

  {
    path: "/location/new",
    component: NewLocation,
    resource: "LOCATION",
  },
  {
    path: "/location/:locationId(\\d+)",
    component: SingleLocation,
    resource: "LOCATION",
  },

  {
    path: "/customer/list",
    component: CustomerList,
    resource: "CUSTOMER",
  },

  {
    path: "/customer/new",
    component: NewCustomer,
    resource: "CUSTOMER",
  },
  {
    path: "/customer/:customerId(\\d+)",
    component: SingleCustomer,
    resource: "CUSTOMER",
  },

  {
    path: "/gift-card/list",
    component: GiftCardList,
    resource: "GIFT_CARD",
  },

  {
    path: "/gift-card/new",
    component: NewGiftCard,
    resource: "GIFT_CARD",
  },
  {
    path: "/gift-card/:giftCardId(\\d+)",
    component: SingleGiftCard,
    resource: "GIFT_CARD",
  },

  {
    path: "/inventory/list",
    component: InventoryList,
    resource: "INVENTORY",
  },

  {
    path: "/inventory/new",
    component: NewInventory,
    resource: "INVENTORY",
  },
  {
    path: "/inventory/:inventoryId(\\d+)",
    component: SingleInventory,
    resource: "INVENTORY",
  },

  {
    path: "/cart/list",
    component: CartList,
    resource: "CART",
  },

  {
    path: "/cart/new",
    component: NewCart,
    resource: "CART",
  },
  {
    path: "/cart/:cartId(\\d+)",
    component: SingleCart,
    resource: "CART",
  },

  {
    path: "/suuplier/list",
    component: SupplierList,
    resource: "view_dashboards",
  },

  {
    path: "/suuplier/new",
    component: NewSupplier,
    resource: "view_dashboards",
  },
  {
    path: "/suuplier/:suuplierId(\\d+)",
    component: SingleSupplier,
    resource: "view_dashboards",
  },

  {
    path: "/terminal/list",
    component: TerminalList,
    resource: "view_dashboards",
  },

  {
    path: "/terminal/new",
    component: NewTerminal,
    resource: "view_dashboards",
  },
  {
    path: "/terminal/:terminalId(\\d+)",
    component: SingleTerminal,
    resource: "view_dashboards",
  },

  {
    path: "/department/list",
    component: DepartmentList,
    resource: "view_dashboards",
  },

  {
    path: "/department/new",
    component: NewDepartment,
    resource: "view_dashboards",
  },
  {
    path: "/department/:departmentId(\\d+)",
    component: SingleDepartment,
    resource: "view_dashboards",
  },

  {
    path: "/group/list",
    component: GroupList,
    resource: "view_dashboards",
  },

  {
    path: "/group/new",
    component: NewGroup,
    resource: "view_dashboards",
  },
  {
    path: "/group/:groupId(\\d+)",
    component: SingleGroup,
    resource: "view_dashboards",
  },

  {
    path: "/category/list",
    component: CategoryList,
    resource: "view_dashboards",
  },

  {
    path: "/category/new",
    component: NewCategory,
    resource: "view_dashboards",
  },
  {
    path: "/category/:categoryId(\\d+)",
    component: SingleCategory,
    resource: "view_dashboards",
  },

  {
    path: "/sub-category/list",
    component: SubCategoryList,
    resource: "view_dashboards",
  },

  {
    path: "/sub-category/new",
    component: NewSubCategory,
    resource: "view_dashboards",
  },
  {
    path: "/sub-category/:subCategoryId(\\d+)",
    component: SingleSubCategory,
    resource: "view_dashboards",
  },

  {
    path: "/role/list",
    component: RoleList,
    resource: "view_dashboards",
  },

  {
    path: "/role/new",
    component: NewRole,
    resource: "view_dashboards",
  },
  {
    path: "/role/:roleId(\\d+)",
    component: SingleRole,
    resource: "view_dashboards",
  },

  {
    path: "/permision/list",
    component: PermissionList,
    resource: "PERMISSION",
  },

  {
    path: "/permision/new",
    component: NewPermission,
    resource: "PERMISSION",
  },
  {
    path: "/permision/:permisionId(\\d+)",
    component: SinglePermission,
    resource: "PERMISSION",
  },

  // { path: "/location", component: Locations, resource: "" },

  // { path: "/adminTeeSheet", component: AdminTeeSheet, resource: "" },
  // { path: "/adminTeeSheet2", component: AdminTeeSheet2, resource: "" },
  // { path: "/clockIn", component: ClockIn, resource: "" },
  // {
  //   path: "/adminTeeSheetSetting",
  //   component: AdminTeeSheetSetting,
  //   resource: "",
  // },
  // {
  //   path: "/adminDashboardItems",
  //   component: AdminDashboardItems,
  //   resource: "",
  // },
  // { path: "/inventory", component: Inventory, resource: "" },
  // { path: "/helpSupport", component: HelpSupport, resource: "" },
  // { path: "/reports", component: Reports, resource: "" },
  // { path: "/inventoryForm", component: InventoryForm, resource: "" },
  // { path: "/jesterPark", component: JesterPark, resource: "" },

  // { path: "/cart", component: Cart, resource: "" },
  // { path: "/department", component: Department, resource: "" },
  // { path: "/giftcard", component: GiftCard, resource: "" },

  // {
  //   path: "/pending-payments",
  //   component: BulkPayment,
  //   resource: "PENDING_PAYMENTS",
  // },

  {
    path: "/access-management",
    component: AccessManagement,
    resource: "",
  },
  {
    path: "*",
    wildcard: true,
    component: NotFound,
    resource: "",
  },
];

export default dashboardRoutes;
