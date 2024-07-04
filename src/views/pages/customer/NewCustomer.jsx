import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomerActions from "redux/customer/action";
import NotificationActions from "redux/notifications/actions";
import { createCustomers } from "redux/customer/service";
import { setPermissionByRoleFunc } from "redux/permission/service";
import CustomerForm from "./CustomerForm";

const defaultCustomer = {
  title: "",
  content: "",
  imageUrl: "",
  categoryId: null,
  userId: null,
  firstName: "",
  lastName: "",
  gender: "",
  emailAddress: "",
  password: "",
  phoneNumber: "",
  cellPhoneNumber: "",
  username: "",
  dateOfBirth: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  role: "Customer",
  comments: "",
  role: "",
  isEmailVerified: false,
  status: false,
  profile_picture: "",
};

const NewCustomer = (props) => {
  const onSave = async (updatedCustomer) => {
    return createCustomers(updatedCustomer)
      .then((res) => {
        const permission = {
          permissions: [
            {
              name: "TEE_SHEET",
              access: "WRITE",
              role: "Customer",
              status: true,
            },
          ],
        };
        setPermissionByRoleFunc(permission)
          .then((res) => {
            props.successWithTimeout(
              `Customer #${res.data.customer.id} added successfully!`
            );

            props.history.push("/customer/list");
          })
          .catch((err) => {
            console.log(err, "erro");
          });
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new customer, " + err.response.data.message
        )
      );
  };

  return (
    <CustomerForm
      updateEmployee={defaultCustomer}
      onSave={onSave}
    ></CustomerForm>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(CustomerActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewCustomer);
