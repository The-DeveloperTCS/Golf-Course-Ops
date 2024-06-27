import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import GiftCardForm from "./GiftCardForm";
import {
  updateGiftCardDetails,
  getSpecificGiftCard,
} from "redux/giftCard/service";

const GiftCardSingle = (props) => {
  const { giftCardId } = props;
  const [giftCardDetail, setGiftCardDetails] = useState({});

  useEffect(() => {
    getGiftCardDetails();
  }, [giftCardId]);

  const getGiftCardDetails = async () => {
    getSpecificGiftCard(giftCardId).then((res) => {
      setGiftCardDetails(res.data);
    });
  };

  const onGiftCardSave = async (updatedGiftCard) => {
    return updateGiftCardDetails(giftCardId, updatedGiftCard)
      .then((res) => {
        props.successWithTimeout(`Gift Card updated successfully!`);
        props.history.push("/gift-card/list");
      })
      .catch((err) =>
        props.failure(
          `Gift Card #${updatedGiftCard.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <GiftCardForm
      updateEmployee={giftCardDetail}
      giftCardId={giftCardId}
      onSave={onGiftCardSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const giftCardId = parseInt(ownProps.match.params.giftCardId);
  return {
    giftCardId: giftCardId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftCardSingle);
