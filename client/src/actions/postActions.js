import axios from "axios";

import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  POST_LOADING,
  DELETE_POST,
  CLEAR_INPUT_ERRORS,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
  GET_COMMENT
} from "./action_types";

// Add Post
export const addPost = postData => dispatch => {
  // dispatch(clearInputErrors());
  console.log(postData);

  const { text, postImgURL, feedId } = postData;
  // console.log(postData);
  console.log(postData);
  // const dispatch = dispatch;

  axios
    .post("/api/posts/create", { text, postImgURL, feedId })
    .then(
      res =>
        dispatch({
          type: ADD_POST,
          payload: res.data
        })
      // console.log(res)
    )
    .then(() => {
      dispatch(setPostLoading());

      axios
        .get(`/api/posts/feed/${feedId}`)
        .then(res =>
          dispatch({
            type: GET_POSTS,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch({
            type: GET_POSTS,
            payload: null
          })
        );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get Posts
export const getPosts = feedId => dispatch => {
  // dispatch(setPostLoading());
  console.log(feedId);

  axios
    .get(`/api/posts/feed/${feedId}`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};
// Delete Post
export const deletePost = (id, post_id) => dispatch => {
  console.log(id, post_id)
  axios
    .delete(`/api/posts/${id}/${post_id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

};
// Clear post input errors
export const clearInputErrors = () => {
  return {
    type: CLEAR_INPUT_ERRORS
  };
};
// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

//post comment functions
export const addComment = commentData => dispatch => {
  axios
    .post(`/api/posts/${commentData.post}/comment/create`, commentData)
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const deleteComment = (id, post_id) => dispatch => {
  // console.log(id, post_id);



  axios
    .post(`/api/posts/${post_id}/comment/${id}/`)
    .then(res => {
      console.log(res.data);
      // dispatch({
      //   type: DELETE_COMMENT,
      //   payload: res.data
      // });
    })
    .catch(err => {
      console.log(err);
    });
};
