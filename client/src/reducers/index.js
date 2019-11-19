import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";
import errorReducer from "./errorReducer";
// import profileReducer from "./profileReducer";
import userPostReducer from "./userPostReducer";

export default combineReducers({
  auth: authUserReducer,
  errors: errorReducer,
  // profile: profileReducer,
  posts: userPostReducer
});
