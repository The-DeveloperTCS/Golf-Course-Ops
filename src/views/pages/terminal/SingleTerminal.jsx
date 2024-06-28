import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import TerminalForm from "./TerminalForm";
import {
  updateTerminalDetails,
  getSpecificTerminal,
} from "redux/terminal/service";

const TerminalSingle = (props) => {
  const { terminalId } = props;
  const [terminalDetail, setTerminalDetails] = useState({});

  useEffect(() => {
    getCityDetails();
  }, [terminalId]);

  const getCityDetails = async () => {
    getSpecificTerminal(terminalId).then((res) => {
      setTerminalDetails(res.data);
    });
  };

  const onTerminalSave = async (updatedTerminal) => {
    return updateTerminalDetails(terminalId, updatedTerminal)
      .then((res) => {
        props.successWithTimeout(`Terminal updated successfully!`);
        props.history.push("/terminal/list");
      })
      .catch((err) =>
        props.failure(
          `Terminal #${updatedTerminal.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <TerminalForm
      updateTerminal={terminalDetail}
      terminalId={terminalId}
      onSave={onTerminalSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const terminalId = parseInt(ownProps.match.params.terminalId);
  return {
    terminalId: terminalId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TerminalSingle);
