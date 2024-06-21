import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EmployeeActions from "redux/employee/action";
import NotificationActions from "redux/notifications/actions";
import { createEmployees } from "redux/employee/service";
import EmployeeForm from "./SupplierForm";

const defaultEmployee = {
  title: "",
  content: "",
  image_url: "",
  category_id: null,
  user_id: null,
  first_name: "",
  last_name: "",
  gender: "",
  email_address: "",
  password: "",
  phone_number: "",
  cell_phone_number: "",
  username: "",
  date_of_birth: "",
  address: "",
  city: "",
  state: "",
  zip_code: "",
  job_title: "",
  pin_number: "",
  card_number: "",
  default_terminal: "",
  comments: "",
  role: "",
  is_email_verified: false,
  status: "Active",
  profile_picture: "",
  hourly_rate: 0,
};

const NewEmployee = (props) => {
  const onSave = async (updatedEmployee) => {
    return createEmployees(updatedEmployee)
      .then((res) => {
        props.successWithTimeout(
          `Employee #${res.data.id} added successfully!`
        );
        props.history.push("/employee/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new employee, " + err.response.data.message
        )
      );
  };

  return (
    <EmployeeForm
      updateEmployee={defaultEmployee}
      onSave={onSave}
    ></EmployeeForm>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(EmployeeActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewEmployee);
