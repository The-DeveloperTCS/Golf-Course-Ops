import React, { useState } from "react";
import Badge from "reactstrap/lib/Badge";
import Button from "components/button/Button";
// import SweetAlert from "react-bootstrap-sweetalert";

const paymentStatuses = {
  0: { name: "Pending", displayClass: "c-secondary" },
  1: { name: "Payment Received", displayClass: "c-info" },
  2: { name: "Profit Processed", displayClass: "c-primary" },
};

const getStatus = (id) => {
  return paymentStatuses[id] ?? {};
};

export const PaymentStatusBadge = ({ id }) => {
  let badgeClasses = ["pa-10", getStatus(id).displayClass];

  return (
    <Badge className={badgeClasses.join(" ")} pill>
      {getStatus(id).name}
    </Badge>
  );
};

export const PaymentStatusButton = ({ order, name, onUpdate }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <React.Fragment>
      <Button
        onClick={() => setShowConfirm(!showConfirm)}
        className={`${
          name === "Payment Received"
            ? "c-btn ma-5 c-info"
            : "c-btn ma-5 c-primary"
        }`}
        dataStyle="expand-left"
      >
        {name}
      </Button>

      {/* <SweetAlert
        input
        custom
        showCancel
        show={showConfirm}
        confirmBtnText="Yes"
        cancelBtnText="Cancel"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        title="Enter comment"
        confirmBtnCssClass="sweet-alert-confirm-button"
        cancelBtnCssClass="sweet-alert-cancel-button"
        onConfirm={(description) => {
          setShowConfirm(!showConfirm);
          onUpdate(order, name, description);
        }}
        onCancel={() => {
          setShowConfirm(!showConfirm);
        }}
      ></SweetAlert> */}
    </React.Fragment>
  );
};
