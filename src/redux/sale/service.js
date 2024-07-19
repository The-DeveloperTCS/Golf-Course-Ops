import { axiosClient } from "../../redux/store";
import { salesInfoGetByIdUrl } from "Constants";

export const salesInfoGetById = (saleId) => {
  return axiosClient.get(salesInfoGetByIdUrl(saleId));
};
