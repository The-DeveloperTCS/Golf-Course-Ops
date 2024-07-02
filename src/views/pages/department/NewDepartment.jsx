import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DepartmentActions from "redux/department/action";
import NotificationActions from "redux/notifications/actions";
import { createDepartments } from "redux/department/service";
import DepartmentForm from "./DepartmentForm";

const defaultDepartment = {
  name: "",
  status: false,
};

const NewDepartment = (props) => {
  const onSave = async (updatedDepartment) => {
    return createDepartments(updatedDepartment)
      .then((res) => {
        props.successWithTimeout(
          `Department #${res.data.post.id} added successfully!`
        );
        props.history.push("/department/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new department, " + err.response.data.message
        )
      );
  };

  return (
    <DepartmentForm
      updateDepartment={defaultDepartment}
      onSave={onSave}
    ></DepartmentForm>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(DepartmentActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewDepartment);
