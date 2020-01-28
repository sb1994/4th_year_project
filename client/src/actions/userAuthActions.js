import axios from "axios";
import setUserToken from "../utils/setUserToken";
import jwt_decode from "jwt-decode";

import * as types from "./action_types";

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => console.log("hello"))

    .catch(err =>
      dispatch({
        type: types.FAIL_AUTH,
        payload: err.response.data
      })
    );
};

export const addFriend = user_id => dispatch => {
  // console.log(user_id);
  dispatch({
    type: types.ADD_FRIEND
  });
  axios
    .post(`/api/users/friends/add/${user_id}`, user_id)
    .then(res => {
      console.log(res.data);
    })

    .catch(err =>
      dispatch({
        type: types.FAIL_ADD_FRIEND,
        payload: err.response.data
      })
    );
  return {
    type: types.ADD_FRIEND
  };
};
export const startAuth = () => {
  return {
    type: types.START_AUTH
  };
};
export const successAuth = token => {
  return {
    type: types.SUCCESS_AUTH,
    token: token
  };
};
export const successUpload = token => {
  return {
    type: types.SUCCESS_UPLOAD
    // token: token
  };
};
export const failAuth = error => {
  return {
    type: types.FAIL_AUTH,
    error: error
  };
};
// Set logged in user
export const setLoggedUser = decoded => {
  return {
    type: types.SET_LOGGED_USER,
    payload: decoded
  };
};
export const loginAuth = (email, password) => {
  return dispatch => {
    dispatch(startAuth());
    axios
      .post("api/users/login", {
        email: email,
        password: password
      })
      .then(result => {
        const token = result.data.token;
        //sets the expirey date
        const expire = new Date(new Date().getTime() + 10000 * 1000);
        //stores the the token and the expireation date in the browser
        //as a cookie
        localStorage.setItem("token", token);
        setUserToken(token);
        const decoded = jwt_decode(token);
        dispatch(setLoggedUser(decoded));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const registerAuth = (password, name, email) => {
  //alert that the register has started
  return dispatch => {
    dispatch(startAuth());
    // console.log(avatar);

    axios
      .post("api/users/register/", {
        password,
        name,
        email
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  // Remove auth header for future requests
  setUserToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setLoggedUser({}));
};
