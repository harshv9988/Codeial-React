import {
  UPDATE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_COMMENT_LIKE,
} from "../actions/actionTypes";

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const newPost = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return newPost;

    case UPDATE_POST_LIKE:
      const newLike = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [action.userId, ...post.likes],
          };
        }
        return post;
      });
      return newLike;

    case UPDATE_COMMENT_LIKE:
      const newPostLike = state.map((post) => {
        const newCommentLike = post.comments.map((comment) => {
          if (comment._id === action.commentId) {
            return {
              ...comment,
              likes: [action.userId, ...comment.likes],
            };
            // return comment.likes.concat(action.userId);
          }
          return comment;
        });
        return {
          ...post,
          comments: newCommentLike,
        };
      });
      return newPostLike;
    default:
      return state;
  }
}
