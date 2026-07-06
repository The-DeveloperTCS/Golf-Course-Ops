// Portfolio build: legacy axios client stub (no network calls).
const client = {
  get: () => Promise.reject(new Error("API disabled in portfolio mode")),
  post: () => Promise.reject(new Error("API disabled in portfolio mode")),
  patch: () => Promise.reject(new Error("API disabled in portfolio mode")),
  put: () => Promise.reject(new Error("API disabled in portfolio mode")),
  delete: () => Promise.reject(new Error("API disabled in portfolio mode")),
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} },
  },
};

export default client;
