import React from "react";
import { connect } from "react-redux";

import { fetchPosts } from "../actions/posts";
import { PostList } from "./index";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log("PROPS", this.props);
    const { posts } = this.props;
    return (
      <div>
        <PostList posts={posts} />
      </div>
    );
  }
}

function mapstateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapstateToProps)(App);
