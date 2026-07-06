export const delay = (ms = 280) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const axiosResponse = (data) => Promise.resolve({ data });

export const axiosError = (message = "Request failed") => {
  const error = new Error(message);
  error.response = { data: { message } };
  return Promise.reject(error);
};

export const parsePage = (limit, pageNo) => ({
  limit: parseInt(limit, 10) || 25,
  page: parseInt(pageNo, 10) || 1,
});
