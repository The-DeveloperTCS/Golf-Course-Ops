import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GiftCardActions from "redux/giftCard/action";
import NotificationActions from "redux/notifications/actions";
import { createGiftCards } from "redux/giftCard/service";
import GiftCardForm from "./GiftCardForm";

const defaultGiftCard = {
  giftCardNumber: "",
  value: "",
  customName: "",
  expirationDate: null,
  dateIssued: null,
  departmentId: null,
  categoryId: null,
  notes: "",
  customerId: null,
  status: false,
};

const NewGiftCard = (props) => {
  const onSave = async (updatedGiftCard) => {
    return createGiftCards(updatedGiftCard)
      .then((res) => {
        props.successWithTimeout(
          `Gift Card #${res.data.post?.id} added successfully!`
        );
        props.history.push("/gift-card/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new gift card, " + err.response.data.message
        )
      );
  };

  return (
    <GiftCardForm
      updateEmployee={defaultGiftCard}
      onSave={onSave}
    ></GiftCardForm>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(GiftCardActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewGiftCard);
