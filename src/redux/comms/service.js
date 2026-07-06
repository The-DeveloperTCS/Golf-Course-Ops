import { delay, axiosResponse } from "mock/mockHelpers";
import { createRecord, getCollection } from "mock/mockDb";

export const commentsList = async (type, id) => {
  await delay();
  const comments = getCollection("comments").filter(
    (comment) => comment.type === type && String(comment.refId) === String(id)
  );
  return axiosResponse(comments);
};

export const addComment = async (payload) => {
  await delay();
  const record = createRecord("comments", {
    ...payload,
    type: payload.type || "general",
    refId: payload.employeeId || payload.customerId || payload.id,
    createdAt: new Date().toISOString(),
    authorName: "Portal User",
  });
  return axiosResponse(record);
};
