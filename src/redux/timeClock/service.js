import { axiosClient } from "../../redux/store";
import { addAttendanceUrl } from "Constants";

export const addAttendance = (req) => {
  return axiosClient.post(addAttendanceUrl, req);
};

// export const getTeeSheetByDate = (date) => {
//   return axiosClient.get(getTeeSheetByDateUrl(date));
// };

// export const updateTeeSheetDetails = (teeSheetId, req) => {
//   return axiosClient.patch(updateTeeSheetUrl(teeSheetId), req);
// };

// export const getSpecificTeeSheet = async (teeSheetId) => {
//   return axiosClient.get(getSpecificTeeSheetUrl(teeSheetId));
// };

// export const deleteTeeSheet = async (teeSheetId) => {
//   return axiosClient.delete(deleteTeeSheetUrl(teeSheetId));
// };
