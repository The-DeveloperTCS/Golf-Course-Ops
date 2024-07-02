import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RoleActions from "redux/role/action";
import NotificationActions from "redux/notifications/actions";
import { createRoles } from "redux/role/service";
import RoleForm from "./RoleForm";

const defaultRole = {
  name: "",
  status: false,
};

const NewRole = (props) => {
  const onSave = async (updatedRole) => {
    return createRoles(updatedRole)
      .then((res) => {
        props.successWithTimeout(
          `Role #${res.data.post.id} added successfully!`
        );
        props.history.push("/role/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new role, " + err.response.data.message
        )
      );
  };

  return <RoleForm updateRole={defaultRole} onSave={onSave}></RoleForm>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(RoleActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewRole);
