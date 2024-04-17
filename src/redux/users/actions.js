import notificationActions from "redux/notifications/actions";
import { merchantsList, merchantGet } from "./service";

const userActions = {
  FETCH_USERS: "users/fetch",
  USERS_UPDATED: "users/updated",

  fetchUsers: () => {
    return (dispatch) => {
      merchantsList()
        .then((res) => {
          dispatch(userActions.usersUpdated(res.data));
        })
        .catch((err) => {
          dispatch({
            type: notificationActions.FAILURE,
            message: err.message,
          });
        });
    };
  },

  fetchMerchant: (id) => {
    return (dispatch) => {
      merchantGet(id)
        .then((res) => {
          dispatch(userActions.usersUpdated([res.data]));
        })
        .catch((err) => {
          dispatch({
            type: notificationActions.FAILURE,
            message: err.message,
          });
        });
    };
  },

  usersUpdated: (data) => {
    return {
      type: userActions.USERS_UPDATED,
      users: data,
    };
  },
};

export default userActions;
