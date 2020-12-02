import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from "../actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      confirm_password: "",
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleConfirmPasswordChange = (e) => {
    this.setState({
      confirm_password: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirm_password } = this.state;
    if (name && email && password && confirm_password) {
      this.props.dispatch(signup(name, email, password, confirm_password));
    }
  };

  render() {
    const { error, isProgress } = this.props.auth;
    return (
      <form className="login-form">
        <span className="login-signup-header">Register</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            onChange={this.handleNameChange}
            required
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            onChange={this.handleEmailChange}
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
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleConfirmPasswordChange}
            required
          />
        </div>
        <div className="field">
          {isProgress ? (
            <button onClick={this.handleFormSubmit} disabled={isProgress}>
              Creating Your Space...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={isProgress}>
              Sign Up
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
