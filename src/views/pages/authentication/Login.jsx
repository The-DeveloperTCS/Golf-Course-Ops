import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux/auth/actions";
import enhancer from "./enhancer/LoginFormEnhancer";
import Button from "components/button/Button";
import notificationActions from "redux/notifications/actions";
import { bindActionCreators } from "redux";
import login from "../../../assets/images/login-main-img.png";
import loginpng from "../../../assets/images/downloadlogin.png";
import "../../style/Login.css";
const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    let { values, handleSubmit } = props;

    setLoading(true);
    try {
      if (values.username !== "" && values.password !== "") {
        await props.loginRequest(values.username, values.password); // Pass username and password
      }
    } catch (e) {
      console.log(e);
      props.dispatch(
        notificationActions.failure("Failed to login, " + e.message)
      );
    } finally {
      setLoading(false);
    }

    handleSubmit();
  };

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
  } = props;

  const Error = (props) => {
    const field = props.field;
    if ((errors[field] && touched[field]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field]}
        </span>
      );
    } else {
      return <span />;
    }
  };

  return (
    <div className="login-main-div">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-title">
          <h1>Hi, Welcome Back!</h1>
        </div>

        <div className="form-group">
          <label>User Name</label>
          <input
            type="username"
            className=""
            id="username"
            onChange={handleChange}
            value={values.username}
            onBlur={handleBlur}
            placeholder="User Name"
          />
          <Error field="username" />
        </div>
        <div className="form-group">
          <div className="lable-forget">
            <label>Password</label>
          </div>
          <input
            type="password"
            className=""
            id="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            placeholder="Password"
          />
          <Error field="password" />
        </div>
        <Button
          type="submit"
          className="login-btn"
          dataStyle="expand-left"
          loading={loading}
        >
          Sign In
        </Button>
      </form>
      <div className="login-right">
        <img src={login} alt="" />
        <div className="login-png1">
          <img src={loginpng} alt="" />
          <p>Help/Support</p>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(AuthActions, dispatch),
  };
};

export default compose(
  withRouter,
  enhancer,
  connect(null, mapDispatchToProps)
)(Login);
