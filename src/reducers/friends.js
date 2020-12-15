import { FETCH_FRIENDS_SUCCESS, ADD_FRIEND } from "../actions/actionTypes";

const defaultProfileState = [];

// profile reducer
export default function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    // return action.friends;
    case ADD_FRIEND:
      return [action.friend, ...state];
    default:
      return state;
  }
}
