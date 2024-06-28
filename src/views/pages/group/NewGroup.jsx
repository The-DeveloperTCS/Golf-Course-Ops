import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GroupActions from "redux/group/action";
import NotificationActions from "redux/notifications/actions";
import { createGroups } from "redux/group/service";
import GroupForm from "./GroupForm";

const defaultGroup = {
  name: "",
  status: false,
};

const NewGroup = (props) => {
  const onSave = async (updatedGroup) => {
    return createGroups(updatedGroup)
      .then((res) => {
        props.successWithTimeout(`Group #${res.data.id} added successfully!`);
        props.history.push("/group/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new group, " + err.response.data.message
        )
      );
  };

  return <GroupForm updateGroup={defaultGroup} onSave={onSave}></GroupForm>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(GroupActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewGroup);
