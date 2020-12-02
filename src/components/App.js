import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { fetchPosts } from "../actions/posts";
import { Navbar, Home, Page404, Login, Register } from "./index";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      console.log("answer", user);
    }
  }

  render() {
    console.log("PROPS", this.props);
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Register} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

function mapstateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapstateToProps)(App);
