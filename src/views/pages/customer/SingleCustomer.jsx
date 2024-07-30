import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import NotificationActions from "redux/notifications/actions";
import CustomerForm from "./CustomerForm";
import {
  updateCustomerDetails,
  getSpecificCustomer,
} from "redux/customer/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const CustomerSingle = (props) => {
  const {
    customerId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [customerDetail, setCustomerDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getCustomerDetails();
  }, [customerId]);

  const getCustomerDetails = async () => {
    getSpecificCustomer(customerId).then((res) => {
      setCustomerDetails(res.data);
      endLoader(false);
    });
  };

  const onCustomerSave = async (updatedCustomer) => {
    return updateCustomerDetails(customerId, updatedCustomer)
      .then((res) => {
        successWithTimeout(`Customer updated successfully!`);
        props.history.push("/customer/list");
      })
      .catch((err) =>
        failure(
          `Customer #${updatedCustomer.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
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
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(CustomerSingle);
