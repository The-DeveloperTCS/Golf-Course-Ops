import axios from "axios";
import { axiosClient } from "redux/store";
import { LoginUrl, PermissionsUrl, LoginOTPUrl } from "Constants";

export const SendOtp = async (phoneNumber) => {
  const res = await axios.post(LoginUrl, { mobile_number: phoneNumber });
  return res.status === 200;
};

export const login = (phoneNumber, otpCode) => {
  return axios.post(LoginOTPUrl, {
    mobile_number: phoneNumber,
    otp: otpCode,
  });
};

export const permissions = () => {
  return axiosClient.get(PermissionsUrl);
};
