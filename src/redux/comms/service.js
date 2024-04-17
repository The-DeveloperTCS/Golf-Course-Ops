import { axiosClient } from "redux/store";
import { CommentsUrl, CommentAddUrl, POCommentsUrl } from "Constants";

export const commentsList = (type, id) => {
  return axiosClient.get(CommentsUrl(type, id));
};

export const addComment = (req) => {
  return axiosClient.post(CommentAddUrl, req);
};

export const poCommentsList = (id) => {
  return axiosClient.get(POCommentsUrl(id));
};
