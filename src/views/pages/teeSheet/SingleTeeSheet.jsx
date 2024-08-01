import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loader from "components/loader/Loader";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import TeeSheetForm from "./TeeSheetForm";
import {
  updateTeeSheetDetails,
  getSpecificTeeSheet,
  deleteTeeSheet,
  addTeeSheet,
} from "redux/teeSheet/service";
const { startLoader, endLoader } = loaderActions;
const { successWithTimeout, failure } = NotificationActions;

const TeeSheetSingle = (props) => {
  const {
    teeSheetId,
    startLoader,
    endLoader,
    loader,
    successWithTimeout,
    failure,
  } = props;
  const [teeSheetDetail, setTeeSheetDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getTeeSheetDetails();
  }, [teeSheetId]);

  const getTeeSheetDetails = async () => {
    getSpecificTeeSheet(teeSheetId).then((res) => {
      const data = res.data.result;
      setTeeSheetDetails(data);
      endLoader(false);
    });
  };

  const onTeeSheetSave = async (updatedTeeSheet) => {
    startLoader(true);
    const data = { ...updatedTeeSheet };
    data.payMethod = "reversed";
    return updateTeeSheetDetails(teeSheetId, updatedTeeSheet)
      .then((res) => {
        successWithTimeout(`Tee Sheet updated successfully!`);
        endLoader(false);
        props.history.push("/tee-sheet/list");
      })
      .catch((err) => {
        failure(
          `Tee Sheet #${updatedTeeSheet.id} failed to update! ${err.response.data.message}`
        );
        endLoader(false);
      });
  };

  const handleChaneDeleteTeeSheet = (updatedTeeSheet) => {
    startLoader(true);

    deleteTeeSheet(updatedTeeSheet.id)
      .then((res) => {
        successWithTimeout(`Tee Sheet Delete Successfully!`);
        endLoader(false);
        props.history.push("/tee-sheet/list");
      })
      .catch((err) => {
        console.log(err, "err");
        endLoader(false);
      });
  };

  const handleChaneCheckInTeeSheet = (updatedTeeSheet, bookedCustomer) => {
    startLoader(true);

    var sheet = {
      ...updatedTeeSheet,
      customer_list: bookedCustomer,
    };
    if (updatedTeeSheet.id) {
      updateTeeSheetDetails(sheet.id, sheet)
        .then((res) => {
          const id = res.data.teesheet.saleId;
          successWithTimeout(`Tee Sheet updated successfully!`);
          endLoader(false);

          props.history.push(`/sale/${id}`);
        })
        .catch((err) => {
          endLoader(false);

          failure(
            `Tee Sheet #${updatedTeeSheet.id} failed to update! ${err.response.data.message}`
          );
        });
    }
    if (!updatedTeeSheet.id) {
      addTeeSheet(sheet)
        .then((res) => {
          const id = res.data.teesheet.saleId;
          successWithTimeout(`Tee Sheet Add Successfully!`);
          endLoader(false);
          props.history.push(`/sale/${id}`);
        })
        .catch((err) => {
          endLoader(false);

          console.log(err.response, "responseƒ");
          failure(`Tee Sheet failed to add! ${err.response.data.message}`);
        });
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <TeeSheetForm
      updateTeeSheet={teeSheetDetail}
      teeSheetId={teeSheetId}
      onSave={onTeeSheetSave}
      handleChaneDeleteTeeSheet={handleChaneDeleteTeeSheet}
      handleChaneCheckInTeeSheet={handleChaneCheckInTeeSheet}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const teeSheetId = parseInt(ownProps.match.params.teeSheetId);
  return {
    teeSheetId: teeSheetId,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(TeeSheetSingle);
