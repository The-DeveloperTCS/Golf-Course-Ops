import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import DepartmentForm from "./DepartmentForm";
import {
  updateDepartmentDetails,
  getSpecificDepartment,
} from "redux/department/service";

const DepartmentSingle = (props) => {
  const { departmentId } = props;
  const [departmentDetail, setDepartmentDetails] = useState({});

  useEffect(() => {
    getDepartmentDetails();
  }, [departmentId]);

  const getDepartmentDetails = async () => {
    getSpecificDepartment(departmentId).then((res) => {
      setDepartmentDetails(res.data);
    });
  };

  const onDepartmentSave = async (updatedDepartment) => {
    return updateDepartmentDetails(departmentId, updatedDepartment)
      .then((res) => {
        props.successWithTimeout(`Department updated successfully!`);
        props.history.push("/department/list");
      })
      .catch((err) =>
        props.failure(
          `Department #${updatedDepartment.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <DepartmentForm
      updateDepartment={departmentDetail}
      departmentId={departmentId}
      onSave={onDepartmentSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const departmentId = parseInt(ownProps.match.params.departmentId);
  return {
    departmentId: departmentId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentSingle);
