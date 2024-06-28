import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import GroupForm from "./GroupForm";
import { updateGroupDetails, getSpecificGroup } from "redux/group/service";

const GroupSingle = (props) => {
  const { groupId } = props;
  const [groupDetail, setGroupDetails] = useState({});

  useEffect(() => {
    getCityDetails();
  }, [groupId]);

  const getCityDetails = async () => {
    getSpecificGroup(groupId).then((res) => {
      setGroupDetails(res.data);
    });
  };

  const onGroupSave = async (updatedGroup) => {
    return updateGroupDetails(groupId, updatedGroup)
      .then((res) => {
        props.successWithTimeout(`Group updated successfully!`);
        props.history.push("/group/list");
      })
      .catch((err) =>
        props.failure(
          `Group #${updatedGroup.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <GroupForm
      updateGroup={groupDetail}
      groupId={groupId}
      onSave={onGroupSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const groupId = parseInt(ownProps.match.params.groupId);
  return {
    groupId: groupId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupSingle);
