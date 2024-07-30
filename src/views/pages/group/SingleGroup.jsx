import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import GroupForm from "./GroupForm";
import { updateGroupDetails, getSpecificGroup } from "redux/group/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const GroupSingle = (props) => {
  const {
    groupId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [groupDetail, setGroupDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getCityDetails();
  }, [groupId]);

  const getCityDetails = async () => {
    getSpecificGroup(groupId).then((res) => {
      setGroupDetails(res.data);
      endLoader(false);
    });
  };

  const onGroupSave = async (updatedGroup) => {
    return updateGroupDetails(groupId, updatedGroup)
      .then((res) => {
        successWithTimeout(`Group updated successfully!`);
        props.history.push("/group/list");
      })
      .catch((err) =>
        failure(
          `Group #${updatedGroup.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
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
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(GroupSingle);
