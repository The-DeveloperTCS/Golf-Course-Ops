import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import groupActions from "redux/group/action";
import { bindActionCreators } from "redux";
import {
  getSpecificSubCategory,
  getAllCategories,
} from "redux/category/service";
import NotificationActions from "redux/notifications/actions";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import Select from "react-select";

const SubCategoryForm = (props) => {
  const { subCategoryId, updateSubCategory } = props;
  const [updatedSubCategory, setUpdateSubCategory] = useState({
    ...updateSubCategory,
  });
  const [categories, setCategories] = useState([]);

  const [saving, setSaving] = useState(false);
  const useSubCategoryPermission = useRolePermissions("CATEGORY");

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        const data = res.data.categories;
        setCategories(data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    if (subCategoryId) {
      getSpecificSubCategory(subCategoryId).then((res) => {
        setUpdateSubCategory(res.data);
      });
    }
  }, []);

  const onSave = () => {
    setSaving(true);
    props.onSave({ ...updatedSubCategory }).then(() => setSaving(false));
  };

  const title = () => {
    if (updatedSubCategory.id) {
      return `Update Sub Category #${updatedSubCategory.id} `;
    }

    return "New Sub Category";
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
                      value={updatedSubCategory.name}
                      disabled={!useSubCategoryPermission}
                      onChange={(e) =>
                        setUpdateSubCategory({
                          ...updatedSubCategory,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Parent Category
                  </label>
                  <div className="col-sm-8">
                    <Select
                      value={categories?.find(
                        (c) => c.id === updatedSubCategory.parentId
                      )}
                      onChange={(e) => {
                        setUpdateSubCategory({
                          ...updatedSubCategory,
                          parentId: e.id,
                        });
                      }}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      options={categories}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Status</label>
                  <div className="col-sm-8">
                    <div className="pretty p-default p-curve p-toggle">
                      <input
                        type="checkbox"
                        checked={updatedSubCategory.status}
                        onChange={(e) => {
                          setUpdateSubCategory({
                            ...updatedSubCategory,
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

                {/* {useSubCategoryPermission && ( */}
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

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryForm);
