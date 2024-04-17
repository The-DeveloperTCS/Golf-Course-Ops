import { axiosClient } from "redux/store";
import { updateFraudRules, getFraudRules } from "Constants";

export const updateFraudRule = (id, payload) => {
  return axiosClient.put(updateFraudRules(id), payload);
};

export const getFraudRule = () => {
  return axiosClient.get(getFraudRules);
};
