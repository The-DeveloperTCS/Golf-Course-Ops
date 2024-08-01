import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import RoleForm from "./RoleForm";
import { updateRoleDetails, getSpecificRole } from "redux/role/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const RoleSingle = (props) => {
  const {
    roleId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [roleDetail, setRoleDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getRoleDetails();
  }, [roleId]);

  const getRoleDetails = async () => {
    getSpecificRole(roleId).then((res) => {
      setRoleDetails(res.data);
      endLoader(false);
    });
  };

  const onRoleSave = async (updatedRole) => {
    return updateRoleDetails(roleId, updatedRole)
      .then((res) => {
        successWithTimeout(`Role updated successfully!`);
        props.history.push("/role/list");
      })
      .catch((err) =>
        failure(
          `Role #${updatedRole.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
    <RoleForm updateRole={roleDetail} roleId={roleId} onSave={onRoleSave} />
  );
};

const mapStateToProps = (state, ownProps) => {
  const roleId = parseInt(ownProps.match.params.roleId);
  return {
    roleId: roleId,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(RoleSingle);
