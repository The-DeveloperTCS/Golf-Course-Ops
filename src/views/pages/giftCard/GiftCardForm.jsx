import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import giftCardActions from "redux/giftCard/action";
import { bindActionCreators } from "redux";
import { getSpecificGiftCard } from "redux/giftCard/service";
import NotificationActions from "redux/notifications/actions";
import Select from "react-select";
import { pascalCase } from "pascal-case";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { getAllCategories } from "redux/category/service";
import { allDepartments } from "redux/department/service";
import { getCustomers } from "redux/customer/service";

const GiftCardForm = (props) => {
  const { giftCardId, updateGiftCard } = props;
  const [updatedGiftCard, setUpdateGiftCard] = useState({ ...updateGiftCard });
  const [saving, setSaving] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customersList, setCustomersList] = useState([]);

  const useGiftCardPermission = useRolePermissions("GIFT_CARD");

  useEffect(() => {
    if (giftCardId) {
      getSpecificGiftCard(giftCardId).then((res) => {
        setUpdateGiftCard(res.data);
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
    getCustomers()
      .then((res) => {
        const data = res.data.customers;
        setCustomersList(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  const onSave = () => {
    setSaving(true);

    props.onSave({ ...updatedGiftCard }).then(() => setSaving(false));
  };
  const title = () => {
    if (updatedGiftCard.id) {
      return `Update Gift Card #${updatedGiftCard.id}`;
    }

    return "New Gift Card";
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
                  <label className="col-sm-4 col-form-label">
                    Gift Card Number
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedGiftCard.giftCardNumber}
                      disabled={!useGiftCardPermission}
                      onChange={(e) =>
                        setUpdateGiftCard({
                          ...updatedGiftCard,
                          giftCardNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Value</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedGiftCard.value}
                      disabled={!useGiftCardPermission}
                      onChange={(e) =>
                        setUpdateGiftCard({
                          ...updatedGiftCard,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Customer</label>
                  <div className="col-sm-8">
                    <Select
                      value={customersList?.find(
                        (c) => c.id === updatedGiftCard.customerId
                      )}
                      onChange={(e) => {
                        setUpdateGiftCard({
                          ...updatedGiftCard,
                          customerId: e.id,
                        });
                      }}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      options={customersList}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Custom Name</label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className="form-control react-form-input"
                      value={updatedGiftCard.customName}
                      disabled={!useGiftCardPermission}
                      onChange={(e) =>
                        setUpdateGiftCard({
                          ...updatedGiftCard,
                          customName: e.target.value,
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
                        (c) => c.id === updatedGiftCard.departmentId
                      )}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      onChange={(e) => {
                        setUpdateGiftCard({
                          ...updatedGiftCard,
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
                        (c) => c.id === updatedGiftCard.categoryId
                      )}
                      onChange={(e) => {
                        setUpdateGiftCard({
                          ...updatedGiftCard,
                          categoryId: e.id,
                        });
                      }}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      options={categories}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Date Issued</label>
                  <div className="col-sm-8">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        disabled={!useGiftCardPermission}
                        style={{ width: "50%" }}
                        inputFormat="dd/MM/yyyy"
                        value={new Date(updatedGiftCard.dateIssued)}
                        onChange={(newValue) =>
                          setUpdateGiftCard({
                            ...updatedGiftCard,
                            dateIssued: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Expiration Date
                  </label>
                  <div className="col-sm-8">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        disabled={!useGiftCardPermission}
                        style={{ width: "50%" }}
                        inputFormat="dd/MM/yyyy"
                        value={new Date(updatedGiftCard.expirationDate)}
                        onChange={(newValue) =>
                          setUpdateGiftCard({
                            ...updatedGiftCard,
                            expirationDate: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">notes</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedGiftCard.comments}
                      disabled={!useGiftCardPermission}
                      onChange={(e) =>
                        setUpdateGiftCard({
                          ...updatedGiftCard,
                          comments: e.target.value,
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
                        checked={updatedGiftCard.status}
                        disabled={!useGiftCardPermission}
                        onChange={(e) => {
                          setUpdateGiftCard({
                            ...updatedGiftCard,
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

                {useGiftCardPermission && (
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
    ...bindActionCreators(giftCardActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftCardForm);
