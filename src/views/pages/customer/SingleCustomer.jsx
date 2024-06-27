import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import CustomerForm from "./CustomerForm";
import {
  updateCustomerDetails,
  getSpecificCustomer,
} from "redux/customer/service";

const CustomerSingle = (props) => {
  const { customerId } = props;
  const [customerDetail, setCustomerDetails] = useState({});

  useEffect(() => {
    getCustomerDetails();
  }, [customerId]);

  const getCustomerDetails = async () => {
    getSpecificCustomer(customerId).then((res) => {
      setCustomerDetails(res.data);
    });
  };

  const onCustomerSave = async (updatedCustomer) => {
    return updateCustomerDetails(customerId, updatedCustomer)
      .then((res) => {
        props.successWithTimeout(`Customer updated successfully!`);
        props.history.push("/customer/list");
      })
      .catch((err) =>
        props.failure(
          `Customer #${updatedCustomer.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <CustomerForm
      updateEmployee={customerDetail}
      customerId={customerId}
      onSave={onCustomerSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const customerId = parseInt(ownProps.match.params.customerId);
  return {
    customerId: customerId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSingle);
