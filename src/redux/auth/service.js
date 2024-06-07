import axios from "axios";
import { axiosClient } from "redux/store";
import { LoginUrl, PermissionsUrl } from "Constants";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/user/login",
      { email_address: email, password },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Modify this line to include the bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const permissions = () => {
  return axiosClient.get(PermissionsUrl);
};
