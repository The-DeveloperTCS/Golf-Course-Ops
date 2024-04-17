import { axiosClient } from "redux/store";
import { ReturnsUrl, ReturnsByIdUrl } from "Constants";

export const returnsList = () => {
  return axiosClient.get(ReturnsUrl);
};

export const returnById = (id) => {
  return axiosClient.get(ReturnsByIdUrl(id));
};
