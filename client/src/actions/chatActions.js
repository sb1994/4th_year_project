import axios from 'axios'

import {
  JOIN_PRIVATE_CHAT,
  GET_CHAT_POST,
  GET_CHAT_POSTS
} from './action_types'

export const updateChatId = postData => dispatch => {
  //   dispatch({
  //     type: UPDATE_CHAT_ID,
  //     payload: err.response.data
  //   })

  console.log(postData)

  // dispatch(clearInputErrors());
  // console.log(postData);

  // const { text, postImgURL } = postData;
  // // console.log(postData);
  // console.log(postData);
  // // const dispatch = dispatch;

  // axios
  //   .post("/api/posts/create", { text, postImgURL })
  //   .then(
  //     res =>
  //       dispatch({
  //         type: ADD_POST,
  //         payload: res.data
  //       })
  //     // console.log(res)
  //   )
  //   .then(() => {
  //     dispatch(setPostLoading());
  //     axios
  //       .get("/api/posts/")
  //       .then(res =>
  //         dispatch({
  //           type: GET_POSTS,
  //           payload: res.data
  //         })
  //       )
  //       .catch(err =>
  //         dispatch({
  //           type: GET_POSTS,
  //           payload: null
  //         })
  //       );
  //   })
  //   .catch(err =>
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data
  //     })
  //   );
}
// Get Posts
