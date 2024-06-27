export const THEME_COLORS = {
  PRIMARY: "#F8AD15",
  LIGHT_GREEN: "#0CD374",
  DARK_GREEN: "#16D72A",
  ORANGE: "#F8AD15",
  RED: "#E92A2A",
  DARK_RED: "#FF1B44",
  PURPLE: "#5110BA",
  BLACK: "#161819",
};

export const GENERAL_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DELETED: "DELETED",
};

export const ROLES = {
  ADMIN: "ADMIN",
  EMPLOYEE: "EMPLOYEE",
};

export const GENERAL_ADMIN_SIDEBAR_LIST_ITEMS = [
  {
    item: "Employees",
    url: "/dashboard/employees",
  },
  {
    item: "Locations",
    url: "/dashboard/locations",
  },
  {
    item: "Customers",
    url: "/dashboard/customer",
  },
  {
    item: "Inventory",
    url: "/dashboard/inventory",
  },
  // {
  //   item: "Reports",
  //   url: "/dashboard/reports",
  // },
  {
    item: "Tee Sheet",
    url: "/dashboard/tee-sheet",
  },
  {
    item: "Gift Cards",
    url: "/dashboard/gift-cards",
  },
  {
    item: "Cart",
    url: "/dashboard/cart",
  },
  {
    item: "Terminal",
    url: "/dashboard/terminal",
  },
  {
    item: "Group",
    url: "/dashboard/group",
  },
  {
    item: "Department",
    url: "/dashboard/department",
  },
  {
    item: "Category",
    url: "/dashboard/category",
  },
  {
    item: "Sub Category",
    url: "/dashboard/sub-category",
  },
  {
    item: "profile",
    url: "/dashboard/profile",
  },

  // {
  //   item: "adminTeeSheetSetting",
  //   url: "/dashboard/adminTeeSheet-Setting",
  // },
  // {
  //   item: "adminDashboardItems",
  //   url: "/dashboard/adminDashboard-Items",
  // },
];

export const GENERAL_EMPLOYEE_SIDEBAR_LIST_ITEMS = [
  {
    item: "Tee Sheet",
    url: "/dashboard/tee-sheet",
  },
  {
    item: "Assign Slots to Golfers/Customers",
    url: "/dashboard/assign-slots",
  },
  {
    item: "Clock In/ Clock Out",
    url: "/dashboard/activity",
  },
];

export const OTHER_ADMIN_SIDEBAR_LIST_ITEMS = [
  // {
  //   item: "Help & Support",
  //   url: "/dashboard/help&support",
  // },
  // {
  //   item: "Settings",
  //   url: "/dashboard/settings",
  // },
  {
    item: "Logout",
    url: "/",
  },
];

export const OTHER_EMPLOYEE_SIDEBAR_LIST_ITEMS = [
  // {
  //   item: "Help & Support",
  //   url: "/dashboard/help&support",
  // },
  // {
  //   item: "Settings",
  //   url: "/dashboard/settings",
  // },
  {
    item: "Logout",
    url: "/",
  },
];
