import { connect } from "react-redux";
import { history } from "redux/store";
import { bindActionCreators } from "redux";
import EmployeeActions from "redux/employee/action";
import NotificationActions from "redux/notifications/actions";
import { createEmployees } from "redux/employee/service";
import EmployeeForm from "./EmployeeForm";

const defaultEmployee = {
  title: "",
  content: "",
  imageUrl: null,
  categoryId: null,
  user_id: null,
  firstName: "",
  lastName: "",
  gender: "",
  emailAddress: "",
  password: "",
  phoneNumber: "",
  cellPhoneNumber: "",
  username: "",
  dateOfBirth: null,
  address: "",
  city: "",
  state: "",
  zipCode: "",
  jobTitle: "",
  pinNumber: "",
  cardNumber: "",
  defaultTerminal: "",
  comments: "",
  role: "",
  isEmailVerified: false,
  status: false,
  profilePicture: "",
  hourlyRate: 0,
};

const NewEmployee = (props) => {
  const onSave = async (updatedEmployee) => {
    return createEmployees(updatedEmployee)
      .then((res) => {
        props.successWithTimeout(
          `Employee #${res.data.employee.id} added successfully!`
        );
        history.push(`/employee/${res.data.employee.id}`);
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
