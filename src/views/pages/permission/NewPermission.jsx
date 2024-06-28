import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PermissionActions from "redux/permission/action";
import NotificationActions from "redux/notifications/actions";
import { createPermissions } from "redux/permission/service";
import PermissionForm from "./PermissionForm";

const defaultPermission = {
  name: "",
  status: false,
};

const NewPermission = (props) => {
  const onSave = async (updatedPermission) => {
    return createPermissions(updatedPermission)
      .then((res) => {
        props.successWithTimeout(
          `Permission #${res.data.post.id} added successfully!`
        );
        props.history.push("/permission/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new permission, " + err.response.data.message
        )
      );
  };

  return (
    <PermissionForm
      updatePermission={defaultPermission}
      onSave={onSave}
    ></PermissionForm>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(PermissionActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewPermission);
