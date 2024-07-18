import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import TeeSheetForm from "./TeeSheetForm";
import {
  updateTeeSheetDetails,
  getSpecificTeeSheet,
} from "redux/teeSheet/service";

const TeeSheetSingle = (props) => {
  const { teeSheetId } = props;
  const [teeSheetDetail, setTeeSheetDetails] = useState({});

  useEffect(() => {
    getTeeSheetDetails();
  }, [teeSheetId]);

  const getTeeSheetDetails = async () => {
    getSpecificTeeSheet(teeSheetId).then((res) => {
      const data = res.data.result;
      setTeeSheetDetails(data);
    });
  };

  const onTeeSheetSave = async (updatedTeeSheet) => {
    const data = { ...updatedTeeSheet };
    data.payMethod = "reversed";
    return updateTeeSheetDetails(teeSheetId, updatedTeeSheet)
      .then((res) => {
        props.successWithTimeout(`Tee Sheet updated successfully!`);
        props.history.push("/tee-sheet/list");
      })
      .catch((err) =>
        props.failure(
          `Tee Sheet #${updatedTeeSheet.id} failed to update! ${err.response.data.message}`
        )
      );
  };
  return (
    <TeeSheetForm
      updateTeeSheet={teeSheetDetail}
      teeSheetId={teeSheetId}
      onSave={onTeeSheetSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const teeSheetId = parseInt(ownProps.match.params.teeSheetId);
  return {
    teeSheetId: teeSheetId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeeSheetSingle);
