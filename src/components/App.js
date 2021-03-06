import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import {
  Navbar,
  Home,
  Page404,
  Login,
  Register,
  Setting,
  UserProfile,
} from './index';
import { authenticateUser } from '../actions/auth';
// import { fetchUserFriends } from "../actions/friends";

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
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);
      console.log('answer', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          name: user.name,
          _id: user._id,
        })
      );
      // this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    isLoggedIn={auth.isLoggedIn}
                    dispatch={this.props.dispatch}
                    friends={friends}
                  />
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Register} />
            <PrivateRoute
              path="/settings"
              component={Setting}
              isLoggedIn={auth.isLoggedIn}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedIn={auth.isLoggedIn}
              friends={friends}
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
    friends: state.friends,
  };
}

export default connect(mapstateToProps)(App);
