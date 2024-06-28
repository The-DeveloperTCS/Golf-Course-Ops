import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import CartForm from "./CartForm";
import { updateCartDetails, getSpecificCart } from "redux/cart/service";

const CartSingle = (props) => {
  const { cartId } = props;
  const [cartDetail, setCartDetails] = useState({});

  useEffect(() => {
    getCartDetails();
  }, [cartId]);

  const getCartDetails = async () => {
    getSpecificCart(cartId).then((res) => {
      setCartDetails(res.data);
    });
  };

  const onCartSave = async (updatedCart) => {
    return updateCartDetails(cartId, updatedCart)
      .then((res) => {
        props.successWithTimeout(`Cart updated successfully!`);
        props.history.push("/cart/list");
      })
      .catch((err) =>
        props.failure(
          `Cart #${updatedCart.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <CartForm updateCart={cartDetail} cartId={cartId} onSave={onCartSave} />
  );
};

const mapStateToProps = (state, ownProps) => {
  const cartId = parseInt(ownProps.match.params.cartId);
  return {
    cartId: cartId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartSingle);
