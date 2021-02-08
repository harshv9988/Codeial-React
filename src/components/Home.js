import React, { Component } from 'react';
import { PostList, FriendsList, Chat } from './index';
import { fetchUserFriends } from '../actions/friends';

export default class Home extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, isLoggedIn, friends } = this.props;
    return (
      <div className="home">
        <PostList posts={posts} isLoggedIn={isLoggedIn} />
        {isLoggedIn && <FriendsList friends={friends} />}
        {/* {isLoggedIn && <Chat />} */}
      </div>
    );
  }
}
