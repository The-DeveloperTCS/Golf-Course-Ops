import { axiosClient } from "../../redux/store";
import { addTransaction } from "Constants";

export const transationOfTeeSheet = (req) => {
  return axiosClient.post(addTransaction, req);
};
