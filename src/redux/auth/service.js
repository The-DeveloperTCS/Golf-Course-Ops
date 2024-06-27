import axios from "axios";
import { axiosClient } from "redux/store";
import { LoginUrl, PermissionsUrl } from "Constants";

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      "https://whale-app-i9cnx.ondigitalocean.app/user/login",
      { username: username, password },
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
