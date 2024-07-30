import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import SupplierForm from "./SupplierForm";
import {
  updateSupplierDetails,
  getSpecificSupplier,
} from "redux/supplier/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const SupplierSingle = (props) => {
  const {
    supplierId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [supplierDetail, setSupplierDetails] = useState({});

  useEffect(() => {
    startLoader(true);

    getSupplierDetails();
  }, [supplierId]);

  const getSupplierDetails = async () => {
    getSpecificSupplier(supplierId).then((res) => {
      setSupplierDetails(res.data);
      endLoader(false);
    });
  };

  const onSupplierSave = async (updatedSupplier) => {
    return updateSupplierDetails(supplierId, updatedSupplier)
      .then((res) => {
        successWithTimeout(`Supplier updated successfully!`);
        props.history.push("/supplier/list");
      })
      .catch((err) =>
        failure(
          `Supplier #${updatedSupplier.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
    <SupplierForm
      updateSupplier={supplierDetail}
      supplierId={supplierId}
      onSave={onSupplierSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const supplierId = parseInt(ownProps.match.params.supplierId);
  return {
    supplierId: supplierId,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(SupplierSingle);
