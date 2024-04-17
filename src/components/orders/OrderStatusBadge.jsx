import React from "react";
import Badge from "reactstrap/lib/Badge";
import { toString, toDisplayClass } from "./OrderStatusMap";

const OrderStatusBadge = ({ id }) => {
  let badgeClasses = ["pa-10", toDisplayClass(id)];
  return (
    <Badge className={badgeClasses.join(" ")} pill>
      {toString(id)}
    </Badge>
  );
};

export default OrderStatusBadge;
