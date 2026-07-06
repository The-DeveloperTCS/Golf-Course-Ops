export const isMockUploadUrl = (url) =>
  typeof url === "string" &&
  (url.startsWith("mock://") || url.startsWith("mock-upload://"));

export const completeMockUpload = async (file) => {
  const objectUrl = URL.createObjectURL(file);
  return {
    url: objectUrl,
    thumbnailUrl: objectUrl,
  };
};

export const uploadToSignedUrl = async (url, file, headers = {}) => {
  if (isMockUploadUrl(url)) {
    return completeMockUpload(file);
  }
  const response = await fetch(url, { method: "PUT", body: file, headers });
  if (!response.ok) {
    throw new Error("Upload failed");
  }
  return { url: url.split("?")[0] };
};
