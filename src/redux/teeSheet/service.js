import { axiosClient } from "../../redux/store";
import { getTeeSheetByDateUrl } from "Constants";

export const getTeeSheetByDate = (date) => {
  return axiosClient.get(getTeeSheetByDateUrl(date));
};

// export const createRoles = (req) => {
//   return axiosClient.post(createRoleUrl, req);
// };

// export const updateRoleDetails = (roleId, req) => {
//   return axiosClient.patch(updateRoleUrl(roleId), req);
// };

// export const getSpecificRole = async (roleId) => {
//   return axiosClient.get(getSpecificRoleUrl(roleId));
// };

// export const deleteRoles = async (roleId) => {
//   return axiosClient.delete(deleteRoleUrl(roleId));
// };
