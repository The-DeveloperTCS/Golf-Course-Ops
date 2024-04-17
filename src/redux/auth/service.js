import axios from "axios";
import { axiosClient } from "redux/store";
import { LoginUrl, PermissionsUrl } from "Constants";

export const SendOtp = async (phoneNumber) => {
  const res = await axios.post(LoginUrl, { phoneNumber: phoneNumber });
  return res.status === 204;
};

export const login = (phoneNumber, otpCode) => {
  return axios.post(LoginUrl, { phoneNumber: phoneNumber, otpCode: otpCode });
};

export const permissions = () => {
  return axiosClient.get(PermissionsUrl);
};
