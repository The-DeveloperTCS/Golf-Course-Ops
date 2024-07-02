import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import PermissionForm from "./PermissionForm";
import {
  updatePermissionDetails,
  getSpecificPermission,
} from "redux/permission/service";

const PermissionSingle = (props) => {
  const { permissionId } = props;
  const [permissionDetail, setPermissionDetails] = useState({});

  useEffect(() => {
    getCityDetails();
  }, [permissionId]);

  const getCityDetails = async () => {
    getSpecificPermission(permissionId).then((res) => {
      setPermissionDetails(res.data);
    });
  };

  const onPermissionSave = async (updatedSupplier) => {
    return updatePermissionDetails(permissionId, updatedSupplier)
      .then((res) => {
        props.successWithTimeout(`Permission updated successfully!`);
        props.history.push("/permission/list");
      })
      .catch((err) =>
        props.failure(
          `Permission #${updatedSupplier.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <PermissionForm
      updatePermission={permissionDetail}
      permissionId={permissionId}
      onSave={onPermissionSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const permissionId = parseInt(ownProps.match.params.permissionId);
  return {
    permissionId: permissionId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionSingle);
