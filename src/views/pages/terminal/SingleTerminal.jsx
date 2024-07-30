import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import TerminalForm from "./TerminalForm";
import {
  updateTerminalDetails,
  getSpecificTerminal,
} from "redux/terminal/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const TerminalSingle = (props) => {
  const {
    terminalId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [terminalDetail, setTerminalDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getCityDetails();
  }, [terminalId]);

  const getCityDetails = async () => {
    getSpecificTerminal(terminalId).then((res) => {
      setTerminalDetails(res.data);
      endLoader(false);
    });
  };

  const onTerminalSave = async (updatedTerminal) => {
    return updateTerminalDetails(terminalId, updatedTerminal)
      .then((res) => {
        successWithTimeout(`Terminal updated successfully!`);
        props.history.push("/terminal/list");
      })
      .catch((err) =>
        failure(
          `Terminal #${updatedTerminal.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
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
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(TerminalSingle);
