import { axiosClient } from "../../redux/store";
import {
  createRoleUrl,
  updateRoleUrl,
  deleteRoleUrl,
  getRoleListUrl,
  getSpecificRoleUrl,
} from "Constants";

export const getRolesList = (pageNo, limit) => {
  return axiosClient.get(getRoleListUrl(pageNo, limit));
};

// export const getRolesList = async (pageNo, limit) => {

//   try {
//     const response = await axiosClient.get(getRoleListUrl(pageNo, limit));
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const createRoles = async (data) => {
  // console.log(data, "data");
  try {
    const response = await axiosClient.post(createRoleUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoles = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateRoleUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRoles = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteRoleUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificRoles = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificRoleUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
