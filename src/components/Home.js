import React, { Component } from "react";
import { PostList, FriendsList } from "./index";

export default class Home extends Component {
  render() {
    const { posts, isLoggedIn, friends } = this.props;
    return (
      <div className="home">
        <PostList posts={posts} />
        {isLoggedIn && <FriendsList friends={friends} />}
      </div>
    );
  }
}
