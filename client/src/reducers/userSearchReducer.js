import { FILTER_USERS, GET_USERS } from "../actions/action_types";

const initialState = {
  users: [],
  user: {},
  loading: false
};
const search = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_USERS:
      return {
        ...state,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
        loading: false
      };
    default:
      return state;
  }
};
export default search;
