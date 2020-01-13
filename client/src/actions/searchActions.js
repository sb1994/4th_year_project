import { GET_USERS, FILTER_USERS, USERS_LOADING } from "./action_types";

import axios from "axios";

export const getUsers = () => dispatch => {
  console.log("Hello");

  axios
    .get("/api/users/")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};
