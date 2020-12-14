import React, { Component } from "react";
import { fetchUserProfile } from "../actions/profile";
import { connect } from "react-redux";

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  isuserFriend = () => {
    const { match, friends } = this.props;

    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) return true;

    return false;
  };

  render() {
    const {
      match: { params }, // const {params} = match
    } = this.props;
    const { profile } = this.props;

    const checkUserFriend = this.isuserFriend();

    if (profile.inProgress) {
      return <h1>Loading.....</h1>;
    }

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{profile.user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{profile.user.email}</div>
        </div>

        {checkUserFriend ? (
          <div className="btn-grp">
            <button className="button save-btn">Remove Friend</button>
          </div>
        ) : (
          <div className="btn-grp">
            <button className="button save-btn">Add Friend</button>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
