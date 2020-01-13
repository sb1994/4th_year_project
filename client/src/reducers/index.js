import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";
import errorReducer from "./errorReducer";
import userPostReducer from "./userPostReducer";
import search from "./userSearchReducer";
export default combineReducers({
  auth: authUserReducer,
  errors: errorReducer,
  search: search,
  posts: userPostReducer
});
