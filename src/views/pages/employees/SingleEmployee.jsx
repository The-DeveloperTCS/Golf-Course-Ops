import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import EmployeeForm from "./EmployeeForm";
import Loader from "components/loader/Loader";
import {
  updateEmployeeDetails,
  getSpecificEmployee,
} from "redux/employee/service";
const { startLoader, endLoader } = loaderActions;
const { successWithTimeout, failure } = NotificationActions;

const EmployeeSingle = (props) => {
  const {
    employeeId,
    startLoader,
    endLoader,
    loader,
    successWithTimeout,
    failure,
  } = props;
  const [employeeDetail, setEmployeeDetails] = useState({});

  useEffect(() => {
    getEmployeeDetails();
  }, [employeeId]);

  const getEmployeeDetails = async () => {
    startLoader(true);
    getSpecificEmployee(employeeId).then((res) => {
      setEmployeeDetails(res.data);
      endLoader(false);
    });
  };

  const onEmployeeSave = async (updatedEmployee) => {
    return updateEmployeeDetails(employeeId, updatedEmployee)
      .then((res) => {
        successWithTimeout(
          `Employee #${updatedEmployee.id} updated successfully!`
        );
      })
      .catch((err) =>
        failure(
          `Employee #${updatedEmployee.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
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
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(EmployeeSingle);
