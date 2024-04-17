import userActions from "./actions";

const initState = {
  usersList: [],
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case userActions.USERS_UPDATED:
      const newIds = action.users.map((o) => o.id);
      const notUpdatedUsers = state.usersList.filter(
        (o) => newIds.indexOf(o.id) === -1
      );
      return {
        ...state,
        usersList: [...notUpdatedUsers, ...action.users].sort(
          (a, b) => a.id - b.id
        ),
      };
    default:
      return state;
  }
}
