import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import inventoryActions from "redux/inventory/action";
import { bindActionCreators } from "redux";
import { getSpecificInventory } from "redux/inventory/service";
import NotificationActions from "redux/notifications/actions";
import Select from "react-select";
import { pascalCase } from "pascal-case";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import {
  getAllCategories,
  getParentSubCategories,
} from "redux/category/service";
import { allDepartments } from "redux/department/service";

const InventoryForm = (props) => {
  const { inventroyId, updateInventory } = props;
  const [updatedInventory, setUpdateInventory] = useState({
    ...updateInventory,
  });
  const [saving, setSaving] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const useInventoryPermission = useRolePermissions("INVENTORY");

  useEffect(() => {
    if (inventroyId) {
      getSpecificInventory(inventroyId).then((res) => {
        setUpdateInventory(res.data);
      });
    }
    allDepartments()
      .then((res) => {
        const data = res.data.departments;
        setDepartments(data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    getAllCategories()
      .then((res) => {
        const data = res.data.categories;
        setCategories(data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  useEffect(() => {
    setUpdateInventory(updateInventory);
  }, [updateInventory]);

  const itemTypes = [
    { value: "retail", label: "Retail" },
    { value: "food&Bev", label: "Food & Bev" },
    { value: "giftCard", label: "Gift Card" },
    { value: "passes", label: "Passes" },
    { value: "serviceFee", label: "Service Fee" },
    { value: "itemKits", label: "Item Kits" },
    { value: "punchCard", label: "Punch Card" },
  ];

  const foodTypes = [
    { value: "delivery", label: "Delivery" },
    { value: "pickup", label: "PickUp" },
  ];

  const onChangeSubCategories = (id) => {
    getParentSubCategories(id)
      .then((res) => {
        const data = res.data.subCategories;
        setSubCategories(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const onSave = () => {
    setSaving(true);

    props.onSave({ ...updatedInventory }).then(() => setSaving(false));
  };

  const title = () => {
    if (updatedInventory?.id) {
      return `Update Inventory #${updatedInventory.id}`;
    }

    return "New Inventory";
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
                      value={updatedInventory.name}
                      disabled={!useInventoryPermission}
                      onChange={(e) =>
                        setUpdateInventory({
                          ...updatedInventory,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">GL Code</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedInventory.glCode}
                      disabled={!useInventoryPermission}
                      onChange={(e) =>
                        setUpdateInventory({
                          ...updatedInventory,
                          glCode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Department </label>
                  <div className="col-sm-8">
                    <Select
                      value={departments?.find(
                        (c) => c.id === updatedInventory.departmentId
                      )}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      onChange={(e) => {
                        setUpdateInventory({
                          ...updatedInventory,
                          departmentId: e.id,
                        });
                      }}
                      options={departments}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Category</label>
                  <div className="col-sm-8">
                    <Select
                      value={categories?.find(
                        (c) => c.id === updatedInventory.categoryId
                      )}
                      onChange={(e) => {
                        setUpdateInventory({
                          ...updatedInventory,
                          categoryId: e.id,
                        });
                        onChangeSubCategories(e.id);
                      }}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      options={categories}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Sub Category
                  </label>
                  <div className="col-sm-8">
                    <Select
                      value={subCategories?.find(
                        (c) => c.id === updatedInventory.subCategoryId
                      )}
                      onChange={(e) => {
                        setUpdateInventory({
                          ...updatedInventory,
                          subCategoryId: e.id,
                        });
                      }}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      options={subCategories}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Item Type</label>
                  <div className="col-sm-8">
                    <Select
                      value={
                        updatedInventory.itemType
                          ? {
                              value: updatedInventory.itemType,
                              label: pascalCase(updatedInventory.itemType),
                            }
                          : null
                      }
                      onChange={(e) => {
                        setUpdateInventory({
                          ...updatedInventory,
                          itemType: e.value,
                        });
                      }}
                      options={itemTypes}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Food Type</label>
                  <div className="col-sm-8">
                    <Select
                      value={
                        updatedInventory.foodType
                          ? {
                              value: updatedInventory.foodType,
                              label: pascalCase(updatedInventory.foodType),
                            }
                          : null
                      }
                      onChange={(e) => {
                        setUpdateInventory({
                          ...updatedInventory,
                          foodType: e.value,
                        });
                      }}
                      options={foodTypes}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Unit Cost</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedInventory.unitCost}
                      disabled={!useInventoryPermission}
                      onChange={(e) =>
                        setUpdateInventory({
                          ...updatedInventory,
                          unitCost: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Unit Price</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedInventory.unitPrice}
                      disabled={!useInventoryPermission}
                      onChange={(e) =>
                        setUpdateInventory({
                          ...updatedInventory,
                          unitPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Quantity</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedInventory.quantity}
                      disabled={!useInventoryPermission}
                      onChange={(e) =>
                        setUpdateInventory({
                          ...updatedInventory,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Taxable Status
                  </label>
                  <div className="col-sm-8">
                    <div className="pretty p-default p-curve p-toggle">
                      <input
                        type="checkbox"
                        disabled={!useInventoryPermission}
                        checked={
                          updatedInventory.taxableStatus
                            ? "Taxable"
                            : "Non-Taxable"
                        }
                        onChange={(e) => {
                          setUpdateInventory({
                            ...updatedInventory,
                            taxableStatus: e.target.checked
                              ? "Taxable"
                              : "Non-Taxable",
                          });
                        }}
                      />
                      <div className="state p-success p-on">
                        <label>Taxable</label>
                      </div>
                      <div className="state p-danger p-off">
                        <label>Non-Taxable</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Status</label>
                  <div className="col-sm-8">
                    <div className="pretty p-default p-curve p-toggle">
                      <input
                        type="checkbox"
                        disabled={!useInventoryPermission}
                        checked={updatedInventory.status}
                        onChange={(e) => {
                          setUpdateInventory({
                            ...updatedInventory,
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

                {useInventoryPermission && (
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
    ...bindActionCreators(inventoryActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryForm);
