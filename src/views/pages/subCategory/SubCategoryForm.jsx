import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSpecificSubCategory } from "redux/category/service";
import { getCategoriesList } from "redux/category/service";
import NotificationActions from "redux/notifications/actions";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import Select from "react-select";

const SubCategoryForm = (props) => {
  const { subCategoryId, updateSubCategory } = props;
  const [updatedSubCategory, setUpdatedSubCategory] = useState({
    ...updateSubCategory,
  });
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const useCategoryPermission = useRolePermissions("CATEGORY");

  useEffect(() => {
    getCategoriesList(100, 1).then((res) => {
      setCategories(res.categories || []);
    });
    if (subCategoryId) {
      getSpecificSubCategory(subCategoryId).then((res) => {
        setUpdatedSubCategory(res.data);
      });
    }
  }, [subCategoryId]);

  const onSave = () => {
    setSaving(true);
    props.onSave({ ...updatedSubCategory }).then(() => setSaving(false));
  };

  const title = () =>
    updatedSubCategory.id
      ? `Update Sub Category #${updatedSubCategory.id}`
      : "New Sub Category";

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

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
                  <label className="col-sm-4 col-form-label">
                    Parent Category
                  </label>
                  <div className="col-sm-8">
                    <Select
                      options={categoryOptions}
                      value={categoryOptions.find(
                        (option) =>
                          option.value === updatedSubCategory.categoryId
                      )}
                      isDisabled={!useCategoryPermission}
                      onChange={(option) =>
                        setUpdatedSubCategory({
                          ...updatedSubCategory,
                          categoryId: option.value,
                          fName: option.label,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedSubCategory.name || ""}
                      disabled={!useCategoryPermission}
                      onChange={(e) =>
                        setUpdatedSubCategory({
                          ...updatedSubCategory,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Status</label>
                  <div className="col-sm-8">
                    <select
                      className="form-control react-form-input"
                      value={updatedSubCategory.status || "Active"}
                      disabled={!useCategoryPermission}
                      onChange={(e) =>
                        setUpdatedSubCategory({
                          ...updatedSubCategory,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <Button
                  type="button"
                  className="c-btn ma-5 c-success"
                  dataStyle="expand-left"
                  onClick={onSave}
                  loading={saving}
                >
                  Save
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, (dispatch) => ({
  dispatch,
  ...bindActionCreators(NotificationActions, dispatch),
}))(SubCategoryForm);
