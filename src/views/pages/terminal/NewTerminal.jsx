import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TerminalActions from "redux/terminal/action";
import NotificationActions from "redux/notifications/actions";
import { createTerminals } from "redux/terminal/service";
import TerminalForm from "./TerminalForm";

const defaultTerminal = {
  name: "",
  status: false,
};

const NewTerminal = (props) => {
  const onSave = async (updatedTerminal) => {
    return createTerminals(updatedTerminal)
      .then((res) => {
        props.successWithTimeout(
          `Terminal #${res.data.post.id} added successfully!`
        );
        props.history.push("/terminal/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new terminal, " + err.response.data.message
        )
      );
  };

  return (
    <TerminalForm
      updateTerminal={defaultTerminal}
      onSave={onSave}
    ></TerminalForm>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(TerminalActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewTerminal);
