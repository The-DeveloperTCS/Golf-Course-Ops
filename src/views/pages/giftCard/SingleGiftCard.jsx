import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import GiftCardForm from "./GiftCardForm";
import {
  updateGiftCardDetails,
  getSpecificGiftCard,
} from "redux/giftCard/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const GiftCardSingle = (props) => {
  const {
    giftCardId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [giftCardDetail, setGiftCardDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getGiftCardDetails();
  }, [giftCardId]);

  const getGiftCardDetails = async () => {
    getSpecificGiftCard(giftCardId).then((res) => {
      setGiftCardDetails(res.data);
      endLoader(false);
    });
  };

  const onGiftCardSave = async (updatedGiftCard) => {
    return updateGiftCardDetails(giftCardId, updatedGiftCard)
      .then((res) => {
        successWithTimeout(`Gift Card updated successfully!`);
        props.history.push("/gift-card/list");
      })
      .catch((err) =>
        failure(
          `Gift Card #${updatedGiftCard.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
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
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(GiftCardSingle);
