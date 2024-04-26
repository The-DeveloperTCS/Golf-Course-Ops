import React from "react";
import { logo } from "helper/constant";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux/auth/actions";
import { SendOtp } from "redux/auth/service";
import enhancer from "./enhancer/LoginFormEnhancer";
import { useState } from "react";
import Button from "components/button/Button";
import notificationActions from "redux/notifications/actions";
import { bindActionCreators } from "redux";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    let { values, handleSubmit } = props;

    if (values.phoneNumber !== "" && values.otpCode !== "") {
      props.loginRequest(values);
    }
    handleSubmit();
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const result = await SendOtp(values.phoneNumber);

      if (result) {
        setShowOtpField(true);
      }
    } catch (e) {
      console.log(e);
      props.dispatch(
        notificationActions.failure("Failed to login, " + e.message)
      );
    } finally {
      setLoading(false);
    }
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
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <span />;
    }
  };

  const otpField = () => {
    return (
      <div className="form-group">
        <label>OTP Code</label>
        <input
          type="password"
          className="form-control react-form-input"
          id="otpCode"
          value={values.otpCode}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="OTP Code"
        />
        <Error field="otpCode" />
      </div>
    );
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
            <label>Phone Number</label>
            <input
              readOnly={showOtpField}
              type="tel"
              className="form-control react-form-input"
              id="phoneNumber"
              onChange={handleChange}
              value={values.phoneNumber}
              onBlur={handleBlur}
              placeholder="03xxxxxxxxx"
            />
            <Error field="phoneNumber" />
          </div>
          {showOtpField ? otpField() : null}

          {!showOtpField ? (
            <Button
              type="button"
              className="c-btn ma-5 form-button"
              dataStyle="expand-left"
              onClick={handleNext}
              loading={loading}
            >
              Next
            </Button>
          ) : (
            <button type="submit" className="btn form-button">
              Login
            </button>
          )}
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
