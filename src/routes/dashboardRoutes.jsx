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

import TeeSheet from "views/pages/teeSheet/TeeSheet";
import NewTeeSheet from "views/pages/teeSheet/NewTeeSheet";
import SingleTeeSheet from "views/pages/teeSheet/SingleTeeSheet";

import AccessManagement from "views/pages/authentication/AccessManagement";
import NotFound from "views/pages/NotFound";
import Profile from "views/pages/Profile";

import CustomerTeeSheet from "views/pages/teeSheet/CustomerTeeSheet";
import SaleScreen from "views/pages/tee-slot/SaleScreen";
import ClockIn from "views/pages/clockInClockOut/ClockIn";
import HelpSupport from "views/pages/helpSupport/HelpSupport";
import Reports from "views/pages/Reports/Reports";
import InventoryForm from "views/pages/inventoryform/InventoryForm";
import JesterPark from "views/pages/JesterPark/JesterPark";

// import ClockIn from "views/pages/clockInClockOut/ClockIn";
// import HelpSupport from "views/pages/helpSupport/HelpSupport";
// import Reports from "views/pages/Reports/Reports";
// import InventoryForm from "views/pages/inventoryform/InventoryForm";
// import JesterPark from "views/pages/JesterPark/JesterPark";

const dashboardRoutes = [
  { path: "/intro", component: Intro, resource: "" },
  {
    path: "/employee/list",
    component: EmployeesList,
    resource: "EMPLOYEE",
  },
  {
    path: "/Profile",
    component: Profile,
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
    path: "/supplier/list",
    component: SupplierList,
    resource: "SUPPLIER",
  },
  {
    path: "/supplier/new",
    component: NewSupplier,
    resource: "SUPPLIER",
  },
  {
    path: "/supplier/:supplierId(\\d+)",
    component: SingleSupplier,
    resource: "SUPPLIER",
  },
  {
    path: "/terminal/list",
    component: TerminalList,
    resource: "TERMINAL",
  },
  {
    path: "/terminal/new",
    component: NewTerminal,
    resource: "TERMINAL",
  },
  {
    path: "/terminal/:terminalId(\\d+)",
    component: SingleTerminal,
    resource: "TERMINAL",
  },
  {
    path: "/department/list",
    component: DepartmentList,
    resource: "DEPARTMENT",
  },
  {
    path: "/department/new",
    component: NewDepartment,
    resource: "DEPARTMENT",
  },
  {
    path: "/department/:departmentId(\\d+)",
    component: SingleDepartment,
    resource: "DEPARTMENT",
  },
  {
    path: "/group/list",
    component: GroupList,
    resource: "GROUP",
  },
  {
    path: "/group/new",
    component: NewGroup,
    resource: "GROUP",
  },
  {
    path: "/group/:groupId(\\d+)",
    component: SingleGroup,
    resource: "GROUP",
  },
  {
    path: "/category/list",
    component: CategoryList,
    resource: "CATEGORY",
  },

  {
    path: "/category/new",
    component: NewCategory,
    resource: "CATEGORY",
  },
  {
    path: "/category/:categoryId(\\d+)",
    component: SingleCategory,
    resource: "CATEGORY",
  },

  {
    path: "/sub-category/list",
    component: SubCategoryList,
    resource: "CATEGORY",
  },

  {
    path: "/sub-category/new",
    component: NewSubCategory,
    resource: "CATEGORY",
  },
  {
    path: "/sub-category/:subCategoryId(\\d+)",
    component: SingleSubCategory,
    resource: "CATEGORY",
  },

  {
    path: "/role/list",
    component: RoleList,
    resource: "ROLE",
  },

  {
    path: "/role/new",
    component: NewRole,
    resource: "ROLE",
  },
  {
    path: "/role/:roleId(\\d+)",
    component: SingleRole,
    resource: "ROLE",
  },

  {
    path: "/permission/list",
    component: PermissionList,
    resource: "PERMISSION",
  },

  {
    path: "/permission/new",
    component: NewPermission,
    resource: "PERMISSION",
  },
  {
    path: "/permission/:permissionId(\\d+)",
    component: SinglePermission,
    resource: "PERMISSION",
  },
  {
    path: "/tee-sheet/list",
    component: TeeSheet,
    resource: "TEE_SHEET",
  },
  {
    path: "/tee-sheet-new",
    component: NewTeeSheet,
    resource: "TEE_SHEET",
  },
  {
    path: "/tee-sheet/:teeSheetId(\\d+)",
    component: SingleTeeSheet,
    resource: "TEE_SHEET",
  },
  {
    path: "/clockIn",
    component: ClockIn,
    resource: "CLOCKIN",
  },
  {
    path: "/customer-tee-sheet",
    component: CustomerTeeSheet,
    resource: "CUSTOMER_TEE_SHEET",
  },

  {
    path: "/sale/:saleId(\\d+)",
    component: SaleScreen,
    resource: "",
  },

  { path: "/reports", component: Reports, resource: "" },
  { path: "/helpSupport", component: HelpSupport, resource: "" },
  { path: "/inventoryForm", component: InventoryForm, resource: "" },
  { path: "/jesterPark", component: JesterPark, resource: "" },
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
