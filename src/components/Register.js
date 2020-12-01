import React, { Component } from "react";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      confirmpassword: "",
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

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      confirmpassword: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>

        <div className="field">
          <input
            type="text"
            placeholder="Name"
            onChange={this.handlePasswordChange}
            required
          />
        </div>
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
            onChange={this.handleNameChange}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleNameChange}
            required
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit}>Register</button>
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
