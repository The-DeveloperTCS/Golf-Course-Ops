import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import roleActions from "redux/role/action";
import { bindActionCreators } from "redux";
import { getSpecificRole } from "redux/role/service";
import NotificationActions from "redux/notifications/actions";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const RoleForm = (props) => {
  const { roleId, updateRole } = props;
  const [updatedRole, setUpdateRole] = useState({ ...updateRole });
  const [saving, setSaving] = useState(false);
  const useRolePermission = useRolePermissions("ROLE");

  useEffect(() => {
    if (roleId) {
      getSpecificRole(roleId).then((res) => {
        setUpdateRole(res.data);
      });
    }
  }, []);

  const onSave = () => {
    setSaving(true);

    props.onSave({ ...updatedRole }).then(() => setSaving(false));
  };

  const title = () => {
    if (updatedRole.id) {
      return `Update Role #${updatedRole.id} `;
    }

    return "New Role";
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
                <div className="form-Dgroup row">
                  <label className="col-sm-4 col-form-label">Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedRole.name}
                      disabled={!useRolePermission}
                      onChange={(e) =>
                        setUpdateRole({
                          ...updatedRole,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-role row">
                  <label className="col-sm-4 col-form-label">Status</label>
                  <div className="col-sm-8">
                    <div className="pretty p-default p-curve p-toggle">
                      <input
                        type="checkbox"
                        checked={updatedRole.status}
                        disabled={!useRolePermission}
                        onChange={(e) => {
                          setUpdateRole({
                            ...updatedRole,
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

                {useRolePermission && (
                  <Button
                    type="button"
                    className="c-btn ma-5 c-success"
                    dataStyle="expand-left"
                    onClick={onSave}
                    loading={saving}
                  >
                    Save
                  </Button>
                )}
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
    ...bindActionCreators(roleActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleForm);
