import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import React from "react";
import AdvancePaymentRequestForm from "./AdvancePaymentRequestForm";

const AdvancePaymentRequest = () => {
  return <AdvancePaymentRequestForm></AdvancePaymentRequestForm>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(AdvancePaymentRequest);
