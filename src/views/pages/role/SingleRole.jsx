import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import RoleForm from "./RoleForm";
import { updateRoleDetails, getSpecificRole } from "redux/role/service";

const RoleSingle = (props) => {
  const { roleId } = props;
  const [roleDetail, setRoleDetails] = useState({});

  useEffect(() => {
    getCityDetails();
  }, [roleId]);

  const getCityDetails = async () => {
    getSpecificRole(roleId).then((res) => {
      setRoleDetails(res.data);
    });
  };

  const onRoleSave = async (updatedSupplier) => {
    return updateRoleDetails(roleId, updatedSupplier)
      .then((res) => {
        props.successWithTimeout(`Role updated successfully!`);
        props.history.push("/role/list");
      })
      .catch((err) =>
        props.failure(
          `Role #${updatedSupplier.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <RoleForm updateRole={roleDetail} roleId={roleId} onSave={onRoleSave} />
  );
};

const mapStateToProps = (state, ownProps) => {
  const roleId = parseInt(ownProps.match.params.roleId);
  return {
    roleId: roleId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleSingle);
