import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import categoryActions from "redux/category/action";
import { bindActionCreators } from "redux";
import { getSpecificCategory } from "redux/category/service";
import NotificationActions from "redux/notifications/actions";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const CategoryForm = (props) => {
  const { categoryId, updateCategory } = props;
  const [updatedCategory, setUpdateCategory] = useState({ ...updateCategory });
  const [saving, setSaving] = useState(false);
  const useCategoryPermission = useRolePermissions("CATEGORY");

  useEffect(() => {
    if (categoryId) {
      getSpecificCategory(categoryId).then((res) => {
        setUpdateCategory(res.data);
      });
    }
  }, []);

  const onSave = () => {
    setSaving(true);

    props.onSave({ ...updatedCategory }).then(() => setSaving(false));
  };

  const title = () => {
    if (updatedCategory.id) {
      return `Update Category #${updatedCategory.id} `;
    }

    return "New Category";
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
                      value={updatedCategory.name}
                      disabled={!useCategoryPermission}
                      onChange={(e) =>
                        setUpdateCategory({
                          ...updatedCategory,
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
                        disabled={!useCategoryPermission}
                        checked={updatedCategory.status}
                        onChange={(e) => {
                          setUpdateCategory({
                            ...updatedCategory,
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

                {useCategoryPermission && (
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
    ...bindActionCreators(categoryActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
