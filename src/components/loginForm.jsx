import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().alphanum().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);
      const { state } = this.props.location;
      console.log(state);
      window.location = state ? state.from.pathname : "/";

      toast.success("Login Success  ");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;

        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1>LoginForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("LogIn")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
