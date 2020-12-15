import React, { Component } from "react";
import { fetchUserProfile } from "../actions/profile";
import { connect } from "react-redux";
import { APIUrls } from "../helpers/urls";
import { getJwtToken } from "../helpers/utils";
import { addFriend } from "../actions/friends";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  handleAddFriendClick = async () => {
    const { userId } = this.props.match.params;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getJwtToken()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

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
    const { success, error } = this.state;

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
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          </div>
        )}

        {success && (
          <div className="alert success-dailog">Friend added successfully</div>
        )}
        {error && <div className="alert error-dailog">{error}</div>}
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
