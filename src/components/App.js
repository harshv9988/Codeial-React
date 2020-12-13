import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import jwt_decode from "jwt-decode";

import { fetchPosts } from "../actions/posts";
import { Navbar, Home, Page404, Login, Register, Setting } from "./index";
import { authenticateUser } from "../actions/auth";

// const Settings = () => {
//   return <div>settings</div>;
// };

const PrivateRoute = (PrivateRouteProps) => {
  const { path, isLoggedIn, component: Component } = PrivateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
        // return <Component {...props} />;
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      console.log("answer", user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          name: user.name,
          _id: user._id,
        })
      );
    }
  }

  render() {
    console.log("PROPS", this.props);
    const { posts, auth } = this.props;
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
            <PrivateRoute
              path="/settings"
              component={Setting}
              isLoggedIn={auth.isLoggedIn}
            />
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
    auth: state.auth,
  };
}

export default connect(mapstateToProps)(App);
