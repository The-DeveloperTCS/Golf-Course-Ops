import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EmployeeActions from "redux/employee/action";
import NotificationActions from "redux/notifications/actions";
import { createEmployees } from "redux/employee/service";
import { setPermissionByRoleFunc } from "redux/permission/service";

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
        if (updatedEmployee.role === "Manager") {
          const permission = {
            permissions: [
              {
                name: "DASHBOARD",
                access: "WRITE",
                role: "Manager",
                status: true,
              },
              {
                name: "LOCATION",
                access: "WRITE",
                role: "Manager",
                status: true,
              },
              {
                name: "CUSTOMER",
                access: "WRITE",
                role: "Manager",
                status: true,
              },
              {
                name: "GIFT_CARD",
                access: "WRITE",
                role: "Manager",
                status: true,
              },
              {
                name: "INVENTORY",
                access: "WRITE",
                role: "Manager",
                status: true,
              },
              {
                name: "TERMINAL",
                access: "WRITE",
                role: "Manager",
                status: true,
              },
              {
                name: "TEE_SHEET",
                access: "WRITE",
                role: "Manager",
                status: true,
              },
            ],
          };
          setPermissionByRoleFunc(permission)
            .then((res) => {
              props.successWithTimeout(
                `Employee #${res.data.employee.id} added successfully!`
              );
              props.history.push("/employee/list");
            })
            .catch((err) => {
              console.log(err, "erro");
            });
        } else if (updatedEmployee.role === "Employee") {
          const permission = {
            permissions: [
              {
                name: "DASHBOARD",
                access: "WRITE",
                role: "Employee",
                status: true,
              },
              {
                name: "CLOCKIN",
                access: "WRITE",
                role: "Employee",
                status: true,
              },
              {
                name: "TEE_SHEET",
                access: "WRITE",
                role: "Employee",
                status: true,
              },
            ],
          };
          setPermissionByRoleFunc(permission)
            .then((res) => {
              props.successWithTimeout(
                `Employee #${res.data.employee.id} added successfully!`
              );
              props.history.push("/employee/list");
            })
            .catch((err) => {
              console.log(err, "erro");
            });
        }
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
