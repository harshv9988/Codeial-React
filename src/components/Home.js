import React, { Component } from "react";
import { PostList } from "./index";

export default class Home extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="home">
        <PostList posts={posts} />
      </div>
    );
  }
}
