import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CartActions from "redux/cart/action";
import NotificationActions from "redux/notifications/actions";
import { createCarts } from "redux/cart/service";
import CartForm from "./CartForm";

const defaultCart = {
  itemName: "",
  cartNo: 0,
  value: 0,
  customerName: "",
  customerId: null,
  departmentId: null,
  expirationDate: "",
  dateIssued: "",
  categoryId: "",
  notes: "",
  status: false,
};

const NewCart = (props) => {
  const onSave = async (updatedCart) => {
    return createCarts(updatedCart)
      .then((res) => {
        props.successWithTimeout(
          `Cart #${res.data.post.id} added successfully!`
        );
        props.history.push("/cart/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new cart, " + err.response.data.message
        )
      );
  };

  return <CartForm updateCart={defaultCart} onSave={onSave}></CartForm>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(CartActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewCart);
