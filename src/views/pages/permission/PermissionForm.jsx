import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import permissionActions from "redux/permission/action";
import { bindActionCreators } from "redux";
import { getSpecificPermission } from "redux/permission/service";
import NotificationActions from "redux/notifications/actions";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const PermissionForm = (props) => {
  const { permissionId, updatePermission } = props;
  const [updatedPermission, setUpdatePermission] = useState({
    ...updatePermission,
  });
  const [saving, setSaving] = useState(false);
  const usePermissionPermission = useRolePermissions("PERMISSION");

  useEffect(() => {
    if (permissionId) {
      getSpecificPermission(permissionId).then((res) => {
        setUpdatePermission(res.data);
      });
    }
  }, []);

  const onSave = () => {
    setSaving(true);

    props.onSave({ ...updatedPermission }).then(() => setSaving(false));
  };

  const title = () => {
    if (updatedPermission.id) {
      return `Update Permission #${updatedPermission.id} `;
    }

    return "New Permission";
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
                      value={updatedPermission.name}
                      disabled={!usePermissionPermission}
                      onChange={(e) =>
                        setUpdatePermission({
                          ...updatedPermission,
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
                        checked={updatedPermission.status}
                        disabled={!usePermissionPermission}
                        onChange={(e) => {
                          setUpdatePermission({
                            ...updatedPermission,
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

                {usePermissionPermission && (
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
    ...bindActionCreators(permissionActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionForm);
