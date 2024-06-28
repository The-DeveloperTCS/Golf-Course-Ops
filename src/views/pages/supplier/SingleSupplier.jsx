import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import SupplierForm from "./SupplierForm";
import {
  updateSupplierDetails,
  getSpecificSupplier,
} from "redux/supplier/service";

const SupplierSingle = (props) => {
  const { supplierId } = props;
  const [supplierDetail, setSupplierDetails] = useState({});

  useEffect(() => {
    getSupplierDetails();
  }, [supplierId]);

  const getSupplierDetails = async () => {
    getSpecificSupplier(supplierId).then((res) => {
      setSupplierDetails(res.data);
    });
  };

  const onSupplierSave = async (updatedSupplier) => {
    return updateSupplierDetails(supplierId, updatedSupplier)
      .then((res) => {
        props.successWithTimeout(`Supplier updated successfully!`);
        props.history.push("/supplier/list");
      })
      .catch((err) =>
        props.failure(
          `Supplier #${updatedSupplier.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierSingle);
