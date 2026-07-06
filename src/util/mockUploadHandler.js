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
