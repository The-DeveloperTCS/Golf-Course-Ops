import React, { useState } from "react";
import { logo } from "helper/constant";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux/auth/actions";
import enhancer from "./enhancer/LoginFormEnhancer";
import Button from "components/button/Button";
import notificationActions from "redux/notifications/actions";
import { bindActionCreators } from "redux";

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    let { values, handleSubmit } = props;

    setLoading(true);
    try {
      if (values.email !== "" && values.password !== "") {
        await props.loginRequest(values.email, values.password); // Pass email and password
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

  const loginContainer = {
    backgroundColor: "white",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0,
  };

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
    <div className="container-fluid" style={loginContainer}>
      <div className="form-container">
        <div className="login-icon">
          <img src={logo} alt="icon" height="100px" />
        </div>
        <div className="login-title">Sign in to your account</div>
        <form className="pa-24" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control react-form-input"
              id="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              placeholder="Email"
            />
            <Error field="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control react-form-input"
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
            className="c-btn ma-5 form-button"
            dataStyle="expand-left"
            loading={loading}
          >
            Login
          </Button>
        </form>
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
