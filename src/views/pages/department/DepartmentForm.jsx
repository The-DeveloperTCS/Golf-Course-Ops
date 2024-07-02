import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import departmentActions from "redux/department/action";
import { bindActionCreators } from "redux";
import { getSpecificDepartment } from "redux/department/service";
import NotificationActions from "redux/notifications/actions";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const EmployeeForm = (props) => {
  const { departmentId, updateDepartment } = props;
  const [updatedEmployee, setUpdateEmployee] = useState({
    ...updateDepartment,
  });
  const [saving, setSaving] = useState(false);
  const useDepartmentPermission = useRolePermissions("DEPARTMENT");

  useEffect(() => {
    if (departmentId) {
      getSpecificDepartment(departmentId).then((res) => {
        setUpdateEmployee(res.data);
      });
    }
  }, []);

  const onSave = () => {
    setSaving(true);

    props.onSave({ ...updatedEmployee }).then(() => setSaving(false));
  };

  const title = () => {
    if (updatedEmployee.id) {
      return `Update Employee #${updatedEmployee.id}`;
    }

    return "New Employee";
  };

  // const showError = (message) => {
  //     props.dispatch(NotificationActions.failure(message));
  //     setSaving(false);
  // };

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
                      value={updatedEmployee.name}
                      disabled={!useDepartmentPermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
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
                        disabled={!useDepartmentPermission}
                        checked={updatedEmployee.status}
                        onChange={(e) => {
                          setUpdateEmployee({
                            ...updatedEmployee,
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

                {useDepartmentPermission && (
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
    ...bindActionCreators(departmentActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
