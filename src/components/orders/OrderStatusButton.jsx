import React, { useState } from "react";
import Button from "components/button/Button";
import SweetAlert from "react-bootstrap-sweetalert";

import { toString, toDisplayClass, toActionString } from "./OrderStatusMap";

const OrderStatusButton = ({
  id,
  loading,
  onClick,
  className,
  allowEdit = true,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!allowEdit) {
    return null;
  }

  let buttonClasses =
    className && className.length > 0
      ? className.split(" ")
      : ["c-btn ma-5", toDisplayClass(id)];

  return (
    <React.Fragment>
      <Button
        loading={loading}
        onClick={() => setShowConfirm(!showConfirm)}
        className={buttonClasses.join(" ")}
        dataStyle="expand-left"
      >
        {toActionString(id)}
      </Button>

      <SweetAlert
        custom
        showCancel
        show={showConfirm}
        confirmBtnText="Yes"
        cancelBtnText="No"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        confirmBtnCssClass="sweet-alert-confirm-button"
        cancelBtnCssClass="sweet-alert-cancle-button"
        onConfirm={() => {
          setShowConfirm(!showConfirm);
          onClick(id);
        }}
        onCancel={() => {
          setShowConfirm(!showConfirm);
        }}
      >
        You want to mark order as <b>{toString(id)}</b>
      </SweetAlert>
    </React.Fragment>
  );
};

export default OrderStatusButton;
