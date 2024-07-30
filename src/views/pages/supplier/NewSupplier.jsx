import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SupplierActions from "redux/supplier/action";
import NotificationActions from "redux/notifications/actions";
import { createSuppliers } from "redux/supplier/service";
import SupplierForm from "./SupplierForm";

const defaultSupplier = {
  companyName: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  phoneNumber: "",
  cellPhoneNumber: "",
  faxNumber: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  accountNumber: "",
  comments: "",
  status: false,
};

const NewSupplier = (props) => {
  const onSave = async (updatedSupplier) => {
    return createSuppliers(updatedSupplier)
      .then((res) => {
        props.successWithTimeout(
          `Supplier #${res.data.supplier.id} added successfully!`
        );
        props.history.push("/supplier/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new supplier, " + err.response.data.message
        )
      );
  };

  return (
    <SupplierForm
      updateSupplier={defaultSupplier}
      onSave={onSave}
    ></SupplierForm>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(SupplierActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewSupplier);
