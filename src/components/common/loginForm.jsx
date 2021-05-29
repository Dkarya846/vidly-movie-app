import React from "react";
import Joi from "joi-browser";
import Form from "./form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().min(3).max(8).label("Username"),
    password: Joi.string()
      .alphanum()
      .required()
      .min(8)
      .max(16)
      .label("Password"),
  };

  doSubmit = () => {
    console.log("Submitted");
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
