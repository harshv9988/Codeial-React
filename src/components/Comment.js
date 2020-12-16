import React from "react";
import { connect } from "react-redux";
import { addLike } from "../actions/posts";

function Comment(props) {
  const handleCommentLike = () => {
    const { comment, user } = props;
    props.dispatch(addLike(comment._id, "Comment", user._id));
  };
  const { user, comment } = props;
  const isCommentLikedByUser = comment.likes.includes(user._id);

  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>
        <span onClick={handleCommentLike} className="post-comment-time">
          {isCommentLikedByUser ? (
            <img
              src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
              alt="like post"
            />
          ) : (
            <img
              src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
              alt="likes-icon"
            />
          )}
        </span>
        <span className="post-comment-likes">{comment.likes.length} likes</span>
      </div>

      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Comment);
