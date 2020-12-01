import React, { Component } from "react";
import { connect } from "react-redux";

import { login } from "../actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleemailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    const { error, isProgress } = this.props.auth;
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            onChange={this.handleemailChange}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            onChange={this.handlePasswordChange}
            required
          />
        </div>
        <div className="field">
          {isProgress ? (
            <button onClick={this.handleFormSubmit} disabled={isProgress}>
              Logging In...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={isProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapstateToPrps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapstateToPrps)(Login);
