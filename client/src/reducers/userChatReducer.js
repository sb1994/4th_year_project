import {
  GET_CHAT_POSTS,
  JOIN_PRIVATE_CHAT,
  GET_CHAT_POST
} from '../actions/action_types'

const initialState = {
  currentChatId: '',
  post: {},
  loading: false,
  postAdded: false
}

const post = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_PRIVATE_CHAT:
      return {
        ...state,
        currentChatId: action.id
      }

    default:
      return state
  }
}
export default post
