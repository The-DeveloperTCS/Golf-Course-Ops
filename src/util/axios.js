import axios from "axios";
// import { toast } from "react-toastify";

const client = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  baseURL: "https://nfc-golf-course.uploaddemo.site/api",
});

client.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => Promise.reject("Interceptior logging the error : " + err)
);

client.interceptors.response.use(null, (err) => {
  const expectedErr =
    err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expectedErr) {
    console.error("Something went wrong!");

    // toast.error("Something went wrong!");
    console.log(err);
  } else {
    return Promise.reject(err.response);
  }
});

export { client };
