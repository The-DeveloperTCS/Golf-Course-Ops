import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import EmployeeForm from "./InventoryForm";
import {
  updateEmployeeDetails,
  getSpecificEmployee,
} from "redux/employee/service";

const EmployeeSingle = (props) => {
  const { employeeId } = props;
  const [employeeDetail, setEmployeeDetails] = useState({});

  useEffect(() => {
    getCityDetails();
  }, [employeeId]);

  const getCityDetails = async () => {
    getSpecificEmployee(employeeId).then((res) => {
      setEmployeeDetails(res.data);
    });
  };

  const onEmployeeSave = async (updatedSupplier) => {
    return updateEmployeeDetails(employeeId, updatedSupplier)
      .then((res) => {
        props.successWithTimeout(
          `Employee #${res.data.id} updated successfully!`
        );
        props.history.push("/employee/list");
      })
      .catch((err) =>
        props.failure(
          `Employee #${updatedSupplier.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <EmployeeForm
      updateEmployee={employeeDetail}
      employeeId={employeeId}
      onSave={onEmployeeSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const employeeId = parseInt(ownProps.match.params.employeeId);
  return {
    employeeId: employeeId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSingle);
