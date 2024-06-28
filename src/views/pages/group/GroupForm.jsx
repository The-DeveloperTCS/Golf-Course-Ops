import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import groupActions from "redux/group/action";
import { bindActionCreators } from "redux";
import { getSpecificGroup } from "redux/group/service";
import NotificationActions from "redux/notifications/actions";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const GroupForm = (props) => {
  const { groupId, updateGroup } = props;
  const [updatedGroup, setUpdateGroup] = useState({ ...updateGroup });
  const [saving, setSaving] = useState(false);
  const useGroupPermission = useRolePermissions("GROUP");

  useEffect(() => {
    if (groupId) {
      getSpecificGroup(groupId).then((res) => {
        setUpdateGroup(res.data);
      });
    }
  }, []);

  const onSave = () => {
    setSaving(true);

    props.onSave({ ...updatedGroup }).then(() => setSaving(false));
  };

  const title = () => {
    if (updatedGroup.id) {
      return `Update Group #${updatedGroup.id} `;
    }

    return "New Group";
  };

  return (
    <div>
      <div className="row ma-0">
        <div className="col-lg-6 ptb-15">
          <div className="roe-card-style">
            <div className="roe-card-header flex center">
              <div className="flex-1 mr-15 my-title ml-1">{title()}</div>
            </div>

            <div className="roe-card-body">
              <form>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedGroup.name}
                      disabled={!useGroupPermission}
                      onChange={(e) =>
                        setUpdateGroup({
                          ...updatedGroup,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Status</label>
                  <div className="col-sm-8">
                    <div className="pretty p-default p-curve p-toggle">
                      <input
                        type="checkbox"
                        disabled={!useGroupPermission}
                        checked={updatedGroup.status}
                        onChange={(e) => {
                          setUpdateGroup({
                            ...updatedGroup,
                            status: e.target.checked,
                          });
                        }}
                      />
                      <div className="state p-success p-on">
                        <label>Active</label>
                      </div>
                      <div className="state p-danger p-off">
                        <label>In-Active</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* {useGroupPermission && ( */}
                <Button
                  type="button"
                  className="c-btn ma-5 c-success"
                  dataStyle="expand-left"
                  onClick={onSave}
                  loading={saving}
                >
                  Save
                </Button>
                {/* )} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(groupActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);
