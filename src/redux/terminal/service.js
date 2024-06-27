import { axiosClient } from "../../redux/store";
import { getTerminalListUrl } from "Constants";

export const getTerminalsList = (pageNo, limit) => {
  return axiosClient.get(getTerminalListUrl(pageNo, limit));
};

// export const createTerminal = async (data) => {
//   try {
//     const response = await axios.post(`${BaseUrl}/terminal/add`, data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateTerminal = async (id, data) => {
//   try {
//     const response = await axios.put(`${BaseUrl}/terminal/update/${id}`, data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteTerminal = async (id) => {
//   try {
//     const response = await axios.delete(`${BaseUrl}/terminal/delete/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getSpecificTerminal = async (id) => {
//   try {
//     const response = await axios.get(`${BaseUrl}/terminal/specificId/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
