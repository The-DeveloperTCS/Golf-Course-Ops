import { axiosClient } from "redux/store";
import { UploadFileUrl, UploadImageDigitalOcean } from "Constants";

export const fetchDigitalOceanUrl = () => {
  return axiosClient.get(UploadFileUrl);
};

export const fetchDigitalOceanUrlForImage = () => {
  return axiosClient.get(UploadImageDigitalOcean);
};

export const uploadFileDigitalOcean = (url, file) => {
  return axiosClient.put(url, file);
};
