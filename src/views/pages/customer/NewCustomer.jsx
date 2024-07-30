import { connect } from "react-redux";
import { history } from "redux/store";
import { bindActionCreators } from "redux";
import CustomerActions from "redux/customer/action";
import NotificationActions from "redux/notifications/actions";
import { createCustomers } from "redux/customer/service";
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
  accountNumber: "",
  dateJoined: "",
  jobTitle: "",
};

const NewCustomer = (props) => {
  const onSave = async (updatedCustomer) => {
    return createCustomers(updatedCustomer)
      .then((res) => {
        props.successWithTimeout(
          `Customer #${res.data.customer.id} added successfully!`
        );
        history.push("/customer/list");
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
