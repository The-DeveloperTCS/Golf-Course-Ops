export const BaseUrl = "https://whale-app-i9cnx.ondigitalocean.app/";

export const LoginUrl = BaseUrl + "user/login";
export const PermissionsUrl = BaseUrl + "permission/byRole";
export const LoginOTPUrl = BaseUrl + "loginVerify";

//Employee Endpoints
export const getEmployeesListUrl = (limit, pageNo) =>
  BaseUrl + `employee/getAll/?page=${pageNo}&limit=${limit}`;
export const createEmployeeUrl = BaseUrl + "employee/add";
export const updateEmployeeUrl = (id) => BaseUrl + `employee/update/${id}`;
export const getSpecificEmployeeUrl = (id) =>
  BaseUrl + `employee/specificId/${id}`;
export const deleteEmployeeUrl = (id) => BaseUrl + `employee/delete/${id}`;

//Location Endpoints
export const createLocationUrl = BaseUrl + "location/add";
export const updateLocationUrl = (id) => BaseUrl + `location/update/${id}`;
export const deleteLocationUrl = (id) => BaseUrl + `location/delete/${id}`;
export const getLocationsListUrl = (limit, pageNo) =>
  BaseUrl + `location/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificLocationUrl = (id) =>
  BaseUrl + `location/specificId/${id}`;

//Gift Cards Endpoints
export const createCustomerUrl = BaseUrl + "customer/add";
export const updateCustomerUrl = (id) => BaseUrl + `customer/update/${id}`;
export const deleteCustomerUrl = (id) => BaseUrl + `customer/delete/${id}`;
export const getCustomersListUrl = (limit, pageNo) =>
  BaseUrl + `customer/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificCustomerUrl = (id) =>
  BaseUrl + `customer/specificId/${id}`;

//Gift Cards Endpoints
export const createGiftCardUrl = BaseUrl + "gift-card/add";
export const updateGiftCardUrl = (id) => BaseUrl + `gift-card/update/${id}`;
export const deleteGiftCardUrl = (id) => BaseUrl + `gift-card/delete/${id}`;
export const getGiftCardsListUrl = (limit, pageNo) =>
  BaseUrl + `gift-card/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificGiftCardUrl = (id) =>
  BaseUrl + `gift-card/specificId/${id}`;

//Inventory Endpoints
export const createInventoryUrl = BaseUrl + "inventory/add";
export const updateInventoryUrl = (id) => BaseUrl + `inventory/update/${id}`;
export const deleteInventoryUrl = (id) => BaseUrl + `inventory/delete/${id}`;
export const getInventorysListUrl = (limit, pageNo) =>
  BaseUrl + `inventory/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificInventoryUrl = (id) =>
  BaseUrl + `inventory/specificId/${id}`;

//Carts Endpoints
export const createCartUrl = BaseUrl + "cart/add";
export const updateCartUrl = (id) => BaseUrl + `cart/update/${id}`;
export const deleteCartUrl = (id) => BaseUrl + `cart/delete/${id}`;
export const getCartsListUrl = (limit, pageNo) =>
  BaseUrl + `cart/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificCartUrl = (id) => BaseUrl + `cart/specificId/${id}`;

//Supplier Endpoints
export const createSupplierUrl = BaseUrl + "supplier/add";
export const updateSupplierUrl = (id) => BaseUrl + `supplier/update/${id}`;
export const deleteSupplierUrl = (id) => BaseUrl + `supplier/delete/${id}`;
export const getSuppliersListUrl = (limit, pageNo) =>
  BaseUrl + `supplier/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificSupplierUrl = (id) =>
  BaseUrl + `supplier/specificId/${id}`;

//Terminal Endpoints
export const createTerminalUrl = BaseUrl + "terminal/add";
export const updateTerminalUrl = (id) => BaseUrl + `terminal/update/${id}`;
export const deleteTerminalUrl = (id) => BaseUrl + `terminal/delete/${id}`;
export const getTerminalListUrl = (pageNo, limit) =>
  BaseUrl + `terminal/getAll?page=${pageNo}&limit=${limit}`;
export const getSpecificTerminalUrl = (id) =>
  BaseUrl + `terminal/specificId/${id}`;

//Departments Endpoints
export const createDepartmentUrl = BaseUrl + "department/add";
export const updateDepartmentUrl = (id) => BaseUrl + `department/update/${id}`;
export const deleteDepartmentUrl = (id) => BaseUrl + `department/delete/${id}`;
export const getDepartmentsListUrl = (limit, pageNo) =>
  BaseUrl + `department/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificDepartmentUrl = (id) =>
  BaseUrl + `department/specificId/${id}`;

//Groups Endpoints
export const createGroupUrl = BaseUrl + "group/add";
export const updateGroupUrl = (id) => BaseUrl + `group/update/${id}`;
export const deleteGroupUrl = (id) => BaseUrl + `group/delete/${id}`;
export const getGroupsListUrl = (limit, pageNo) =>
  BaseUrl + `group/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificGroupUrl = (id) => BaseUrl + `group/specificId/${id}`;

//Category Endpoints
export const createCategoryUrl = BaseUrl + "category/add";
export const updateCategoryUrl = (id) => BaseUrl + `category/update/${id}`;
export const deleteCategoryUrl = (id) => BaseUrl + `category/delete/${id}`;
export const getCategorysListUrl = (limit, pageNo) =>
  BaseUrl + `category/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificCategoryUrl = (id) =>
  BaseUrl + `category/specificId/${id}`;

//Sub Category Endpoints
export const createSubCategoryUrl = BaseUrl + "sub-category/add";
export const updateSubCategoryUrl = (id) =>
  BaseUrl + `sub-category/update/${id}`;
export const deleteSubCategoryUrl = (id) =>
  BaseUrl + `sub-category/delete/${id}`;
export const getSubCategorysListUrl = (limit, pageNo) =>
  BaseUrl + `sub-category/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificSubCategoryUrl = (id) =>
  BaseUrl + `sub-category/specificId/${id}`;

//Role Endpoints
export const createRoleUrl = BaseUrl + "role/add";
export const updateRoleUrl = (id) => BaseUrl + `role/update/${id}`;
export const deleteRoleUrl = (id) => BaseUrl + `role/delete/${id}`;
export const getRoleListUrl = (limit, pageNo) =>
  BaseUrl + `role/getAll?page=${pageNo}&limit=${limit}`;
export const getSpecificRoleUrl = (id) => BaseUrl + `role/specificId/${id}`;

//Permissions Endpoints
export const createPermissionUrl = BaseUrl + "permission/addSingle";
export const updatePermissionUrl = (id) => BaseUrl + `permission/update/${id}`;
export const deletePermissionUrl = (id) => BaseUrl + `permission/delete/${id}`;
export const getPermissionsListUrl = (limit, pageNo) =>
  BaseUrl + `permission/getAll/?page=${pageNo}&limit=${limit}`;
export const getSpecificPermissionUrl = (id) =>
  BaseUrl + `permission/specificId/${id}`;
export const getRolePermissionUrl = (id) =>
  BaseUrl + `permission-by-role/byRoleName/${id}`;
export const RolePermissionsUpdateUrl = (id) =>
  BaseUrl + `permission-by-role/update/${id}`;

export const setPermissionByRole =
  BaseUrl + "permission-by-role/addWithMultipleObject";

//Role Endpoints
export const getTeeSheetByDateUrl = (date) =>
  BaseUrl + `teesheet/getAllByDate?date=${date}&page=&limit=`;
// export const createRoleUrl = BaseUrl + "role/add";
// export const updateRoleUrl = (id) => BaseUrl + `role/update/${id}`;
// export const deleteRoleUrl = (id) => BaseUrl + `role/delete/${id}`;
// export const getSpecificRoleUrl = (id) => BaseUrl + `role/specificId/${id}`;

export const RefreshTokenUrl = BaseUrl + "refresh-token";

export const ImageUploadUrl = BaseUrl + "upload-image";

export const isTest = () =>
  BaseUrl.indexOf("https://test-api.zarya.app/") === 0;

// Access Management
export const RolePermissionsUrl = (role) =>
  BaseUrl + `authz/${role}/permission`;
