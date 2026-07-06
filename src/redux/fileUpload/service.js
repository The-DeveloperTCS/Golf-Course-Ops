import { delay, axiosResponse } from "mock/mockHelpers";
import { getMockDatabase, persistMockDatabase } from "mock/mockDb";

const createUploadUrl = () => {
  const id = `upload-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
  return `mock://local-upload/${id}`;
};

export const fetchDigitalOceanUrl = async () => {
  await delay(150);
  const url = `mock-upload://${createUploadUrl()}`;
  const db = getMockDatabase();
  db.uploadedFiles[url] = null;
  persistMockDatabase();
  return axiosResponse({ url });
};

export const fetchDigitalOceanUrlForImage = async () => {
  await delay(150);
  const url = `mock-upload://${createUploadUrl()}`;
  const db = getMockDatabase();
  db.uploadedFiles[url] = null;
  persistMockDatabase();
  return axiosResponse({ url });
};

export const uploadFileDigitalOcean = async (url, file) => {
  await delay(200);
  const db = getMockDatabase();
  db.uploadedFiles[url] = file?.name || "uploaded-file";
  persistMockDatabase();
  return axiosResponse({ success: true });
};
