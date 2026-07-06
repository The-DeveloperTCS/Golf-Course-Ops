export const PERMISSION_RESOURCES = [
  "DASHBOARD",
  "EMPLOYEE",
  "TEE_SHEET",
  "CUSTOMER_TEE_SHEET",
  "LOCATION",
  "CUSTOMER",
  "GIFT_CARD",
  "INVENTORY",
  "CART",
  "SUPPLIER",
  "TERMINAL",
  "SEASON",
  "DEPARTMENT",
  "GROUP",
  "CATEGORY",
  "ROLE",
  "PERMISSION",
  "CLOCKIN",
  "ACCESS_MANAGEMENT",
];

const allWrite = () =>
  PERMISSION_RESOURCES.map((name, index) => ({
    id: index + 1,
    name,
    access: "WRITE",
    description: `${name} access`,
  }));

const pick = (entries) =>
  PERMISSION_RESOURCES.map((name, index) => ({
    id: index + 1,
    name,
    access: entries[name] || "NONE",
    description: `${name} access`,
  }));

export const ROLE_PERMISSIONS = {
  ROLE_ADMINISTRATOR: allWrite(),
  ROLE_MANAGER: pick({
    DASHBOARD: "WRITE",
    EMPLOYEE: "WRITE",
    TEE_SHEET: "WRITE",
    CUSTOMER_TEE_SHEET: "WRITE",
    LOCATION: "WRITE",
    CUSTOMER: "WRITE",
    GIFT_CARD: "WRITE",
    INVENTORY: "WRITE",
    CART: "WRITE",
    SUPPLIER: "WRITE",
    TERMINAL: "WRITE",
    SEASON: "WRITE",
    DEPARTMENT: "WRITE",
    GROUP: "WRITE",
    CATEGORY: "WRITE",
    ROLE: "READ",
    PERMISSION: "READ",
    CLOCKIN: "WRITE",
    ACCESS_MANAGEMENT: "READ",
  }),
  ROLE_PRO_SHOP_STAFF: pick({
    DASHBOARD: "READ",
    CUSTOMER: "WRITE",
    GIFT_CARD: "WRITE",
    INVENTORY: "WRITE",
    CUSTOMER_TEE_SHEET: "WRITE",
    CLOCKIN: "WRITE",
    TEE_SHEET: "READ",
    LOCATION: "READ",
    CART: "READ",
    TERMINAL: "READ",
    SEASON: "READ",
  }),
  ROLE_STARTER: pick({
    DASHBOARD: "READ",
    TEE_SHEET: "WRITE",
    CUSTOMER_TEE_SHEET: "WRITE",
    CUSTOMER: "READ",
    CLOCKIN: "WRITE",
    CART: "READ",
    LOCATION: "READ",
    SEASON: "READ",
  }),
};

export const getPermissionsForRoleName = (roleName) =>
  ROLE_PERMISSIONS[roleName] || ROLE_PERMISSIONS.ROLE_STARTER;
