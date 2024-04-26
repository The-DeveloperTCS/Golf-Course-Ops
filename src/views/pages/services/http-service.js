import { client } from "../../../util/axios";

const HttpService = {
  loginUser(data) {
    return client.post(`/login`, data.body);
  },
  forgotPassword(data) {
    return client.post(`/auth/forgot-password`, data.body);
  },
  resetPassword(data) {
    return client.post(
      `/auth/reset-password?email=${data.query.email}&code=${data.query.code}`,
      data.body
    );
  },
  createEmployee(data) {
    return client.post(`/users`, data.body);
  },
  getEmployeesList(data) {
    const { page, size } = data.query;

    return client.get(`/users?page=${page}&size=${size}`);
  },
  updateEmployee(data) {
    return client.patch(`/users/${data.params}`, data.body);
  },
  deleteEmployee(data) {
    return client.delete(`/users/${data.params}`);
  },
  getLocationsList(data) {
    const { page, limit } = data.query;

    return client.get(`/locations?page=${page}&size=${limit}`);
  },
  createLocation(data) {
    return client.post(`/locations`, data.body);
  },
  updateLocation(data) {
    return client.patch(`/locations/${data.params}`, data.body);
  },
  deleteLocation(data) {
    return client.delete(`/locations/${data.params}`);
  },
  getGiftCardsList(data) {
    const { page, limit } = data.query;

    return client.get(`/giftcard?page=${page}&size=${limit}`);
  },
  createGiftCard(data) {
    return client.post(`/giftcard`, data.body);
  },
  updateGiftCard(data) {
    return client.patch(`/giftcard/${data.params}`, data.body);
  },
  deleteGiftCard(data) {
    return client.delete(`/giftcard/${data.params}`);
  },
  getCartsList(data) {
    const { page, limit } = data.query;

    return client.get(`/carts?page=${page}&size=${limit}`);
  },
  createCart(data) {
    const obj = { ...data.body, user_id: 3 };
    return client.post(`/carts`, obj);
  },
  updateCart(data) {
    return client.patch(`/carts/${data.params}`, data.body);
  },
  deleteCart(data) {
    return client.delete(`/carts/${data.params}`);
  },
  getInventoriesList(data) {
    const { page, limit } = data.query;

    return client.get(`/inventory?page=${page}&size=${limit}`);
  },
  createInventory(data) {
    const obj = { ...data.body, user_id: 3 };
    return client.post(`/inventory`, obj);
  },
  updateInventory(data) {
    return client.patch(`/inventory/${data.params}`, data.body);
  },
  deleteInventory(data) {
    return client.delete(`/inventory/${data.params}`);
  },
  getAllSubCategoriesList(data) {
    const { category_id } = data.query;
    return client.get(`/subCategories?searchByCategoryId=${category_id}`);
  },
  getAllCategoriesList(data) {
    const { name } = data.query;
    return client.get(`/category/searchCategory?name=${name}`);
  },
  getSubCategoriesList(data) {
    const { page, limit } = data.query;

    return client.get(`/subCategories?page=${page}&size=${limit}`);
  },
  createSubCategory(data) {
    const obj = { ...data.body, user_id: 3 };
    return client.post(`/subCategories`, obj);
  },
  updateSubCategory(data) {
    return client.patch(`/subCategories/${data.params}`, data.body);
  },
  deleteSubCategory(data) {
    return client.delete(`/subCategories/${data.params}`);
  },
  getCategoriesList(data) {
    const { page, limit } = data.query;

    return client.get(`/categories?page=${page}&size=${limit}`);
  },
  createCategory(data) {
    const obj = { ...data.body, user_id: 3 };
    return client.post(`/categories`, obj);
  },
  updateCategory(data) {
    return client.patch(`/categories/${data.params}`, data.body);
  },
  deleteCategory(data) {
    return client.delete(`/categories/${data.params}`);
  },
  getCustomersList(data) {
    const { page, limit } = data.query;

    return client.get(`/customers?page=${page}&size=${limit}`);
  },
  createCustomer(data) {
    const obj = { ...data.body };
    return client.post(`/customers`, obj);
  },
  updateCustomer(data) {
    return client.patch(`/customers/${data.params}`, data.body);
  },
  deleteCustomer(data) {
    return client.delete(`/customers/${data.params}`);
  },
  getAllDepartmentsList(data) {
    const { name } = data.query;

    return client.get(`/department/searchDepartment?name=${name}`);
  },
  getDepartmentsList(data) {
    const { page, limit } = data.query;

    return client.get(`/departments?page=${page}&size=${limit}`);
  },
  createDepartment(data) {
    const obj = { ...data.body, user_id: 3 };
    return client.post(`/departments`, obj);
  },
  updateDepartment(data) {
    return client.patch(`/departments/${data.params}`, data.body);
  },
  deleteDepartment(data) {
    return client.delete(`/departments/${data.params}`);
  },
  getGroupsList(data) {
    const { page, limit } = data.query;

    return client.get(`/groups?page=${page}&size=${limit}`);
  },
  createGroup(data) {
    const obj = { ...data.body, user_id: 3 };
    return client.post(`/groups`, obj);
  },
  updateGroup(data) {
    return client.patch(`/groups/${data.params}`, data.body);
  },
  deleteGroup(data) {
    return client.delete(`/groups/${data.params}`);
  },
  getTerminalsList(data) {
    const { page, limit } = data.query;

    return client.get(`/terminals?page=${page}&size=${limit}`);
  },
  getAllTerminalsList(data) {
    const { name } = data.query;
    return client.get(`/terminal/searchTerminal?name=${name}`);
  },
  createTerminal(data) {
    const obj = { ...data.body, user_id: 3 };
    return client.post(`/terminals`, obj);
  },
  updateTerminal(data) {
    return client.patch(`/terminals/${data.params}`, data.body);
  },
  deleteTerminal(data) {
    return client.delete(`/terminals/${data.params}`);
  },
};

export default HttpService;
