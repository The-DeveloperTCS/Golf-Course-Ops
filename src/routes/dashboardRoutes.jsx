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
  { path: "/intro", component: Intro, resource: "generate_reports" },

  {
    path: "/employee/list",
    component: EmployeesList,
    resource: "generate_reports",
  },

  {
    path: "/employee/new",
    component: NewEmployee,
    resource: "generate_reports",
  },
  {
    path: "/employee/:employeeId(\\d+)",
    component: EmployeeSingle,
    resource: "generate_reports",
  },

  {
    path: "/location/list",
    component: LocationList,
    resource: "generate_reports",
  },

  {
    path: "/location/new",
    component: NewLocation,
    resource: "generate_reports",
  },
  {
    path: "/location/:locationId(\\d+)",
    component: SingleLocation,
    resource: "generate_reports",
  },

  {
    path: "/customer/list",
    component: CustomerList,
    resource: "generate_reports",
  },

  {
    path: "/customer/new",
    component: NewCustomer,
    resource: "generate_reports",
  },
  {
    path: "/customer/:customerId(\\d+)",
    component: SingleCustomer,
    resource: "generate_reports",
  },

  {
    path: "/gift-card/list",
    component: GiftCardList,
    resource: "generate_reports",
  },

  {
    path: "/gift-card/new",
    component: NewGiftCard,
    resource: "generate_reports",
  },
  {
    path: "/gift-card/:cardId(\\d+)",
    component: SingleGiftCard,
    resource: "generate_reports",
  },

  {
    path: "/inventory/list",
    component: InventoryList,
    resource: "generate_reports",
  },

  {
    path: "/inventory/new",
    component: NewInventory,
    resource: "generate_reports",
  },
  {
    path: "/inventory/:inventoryId(\\d+)",
    component: SingleInventory,
    resource: "generate_reports",
  },

  {
    path: "/cart/list",
    component: CartList,
    resource: "generate_reports",
  },

  {
    path: "/cart/new",
    component: NewCart,
    resource: "generate_reports",
  },
  {
    path: "/cart/:cartId(\\d+)",
    component: SingleCart,
    resource: "generate_reports",
  },

  {
    path: "/suuplier/list",
    component: SupplierList,
    resource: "generate_reports",
  },

  {
    path: "/suuplier/new",
    component: NewSupplier,
    resource: "generate_reports",
  },
  {
    path: "/suuplier/:suuplierId(\\d+)",
    component: SingleSupplier,
    resource: "generate_reports",
  },

  {
    path: "/terminal/list",
    component: TerminalList,
    resource: "generate_reports",
  },

  {
    path: "/terminal/new",
    component: NewTerminal,
    resource: "generate_reports",
  },
  {
    path: "/terminal/:terminalId(\\d+)",
    component: SingleTerminal,
    resource: "generate_reports",
  },

  {
    path: "/department/list",
    component: DepartmentList,
    resource: "generate_reports",
  },

  {
    path: "/department/new",
    component: NewDepartment,
    resource: "generate_reports",
  },
  {
    path: "/department/:departmentId(\\d+)",
    component: SingleDepartment,
    resource: "generate_reports",
  },

  {
    path: "/group/list",
    component: GroupList,
    resource: "generate_reports",
  },

  {
    path: "/group/new",
    component: NewGroup,
    resource: "generate_reports",
  },
  {
    path: "/group/:groupId(\\d+)",
    component: SingleGroup,
    resource: "generate_reports",
  },

  {
    path: "/category/list",
    component: CategoryList,
    resource: "generate_reports",
  },

  {
    path: "/category/new",
    component: NewCategory,
    resource: "generate_reports",
  },
  {
    path: "/category/:categoryId(\\d+)",
    component: SingleCategory,
    resource: "generate_reports",
  },

  {
    path: "/sub-category/list",
    component: SubCategoryList,
    resource: "generate_reports",
  },

  {
    path: "/sub-category/new",
    component: NewSubCategory,
    resource: "generate_reports",
  },
  {
    path: "/sub-category/:subCategoryId(\\d+)",
    component: SingleSubCategory,
    resource: "generate_reports",
  },

  {
    path: "/role/list",
    component: RoleList,
    resource: "generate_reports",
  },

  {
    path: "/role/new",
    component: NewRole,
    resource: "generate_reports",
  },
  {
    path: "/role/:roleId(\\d+)",
    component: SingleRole,
    resource: "generate_reports",
  },

  {
    path: "/permission/list",
    component: PermissionList,
    resource: "generate_reports",
  },

  {
    path: "/permission/new",
    component: NewPermission,
    resource: "generate_reports",
  },
  {
    path: "/permission/:permissionId(\\d+)",
    component: SinglePermission,
    resource: "generate_reports",
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
