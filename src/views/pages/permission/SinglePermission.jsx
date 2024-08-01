import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import PermissionForm from "./PermissionForm";
import {
  updatePermissionDetails,
  getSpecificPermission,
} from "redux/permission/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const PermissionSingle = (props) => {
  const {
    permissionId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [permissionDetail, setPermissionDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getPermissionDetails();
  }, [permissionId]);

  const getPermissionDetails = async () => {
    getSpecificPermission(permissionId).then((res) => {
      setPermissionDetails(res.data);
      endLoader(false);
    });
  };

  const onPermissionSave = async (updatedPermission) => {
    return updatePermissionDetails(permissionId, updatedPermission)
      .then((res) => {
        successWithTimeout(`Permission updated successfully!`);
        props.history.push("/permission/list");
      })
      .catch((err) =>
        failure(
          `Permission #${updatedPermission.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
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
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(PermissionSingle);
