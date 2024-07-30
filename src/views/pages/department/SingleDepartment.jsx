import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import DepartmentForm from "./DepartmentForm";
import {
  updateDepartmentDetails,
  getSpecificDepartment,
} from "redux/department/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const DepartmentSingle = (props) => {
  const {
    departmentId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [departmentDetail, setDepartmentDetails] = useState({});

  useEffect(() => {
    startLoader(true);

    getDepartmentDetails();
  }, [departmentId]);

  const getDepartmentDetails = async () => {
    getSpecificDepartment(departmentId).then((res) => {
      setDepartmentDetails(res.data);
      endLoader(false);
    });
  };

  const onDepartmentSave = async (updatedDepartment) => {
    return updateDepartmentDetails(departmentId, updatedDepartment)
      .then((res) => {
        successWithTimeout(`Department updated successfully!`);
        props.history.push("/department/list");
      })
      .catch((err) =>
        failure(
          `Department #${updatedDepartment.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
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

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(DepartmentSingle);
