import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import cartActions from "redux/cart/action";
import { bindActionCreators } from "redux";
import { getSpecificCart } from "redux/cart/service";
import NotificationActions from "redux/notifications/actions";
import Select from "react-select";
import { pascalCase } from "pascal-case";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const CartForm = (props) => {
  const { cartId, updateCart } = props;
  const [updatedCart, setUpdateCart] = useState({ ...updateCart });
  const [saving, setSaving] = useState(false);
  const useCartPermission = useRolePermissions("CART");

  useEffect(() => {
    if (cartId) {
      getSpecificCart(cartId).then((res) => {
        setUpdateCart(res.data);
      });
    }
  }, []);

  const onSave = () => {
    setSaving(true);

    props.onSave({ ...updatedCart }).then(() => setSaving(false));
  };

  const title = () => {
    if (updatedCart.id) {
      return `Update Cart #${updatedCart.id} - ${updatedCart.firstName} ${updateCart.lastName}`;
    }

    return "New Cart";
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
                  <label className="col-sm-4 col-form-label">Item Name</label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedCart.itemName}
                      disabled={!useCartPermission}
                      onChange={(e) =>
                        setUpdateCart({
                          ...updatedCart,
                          itemName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Cart No</label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedCart.cartNo}
                      disabled={!useCartPermission}
                      onChange={(e) =>
                        setUpdateCart({
                          ...updatedCart,
                          cartNo: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Value</label>
                  <div className="col-sm-12">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedCart.value}
                      disabled={!useCartPermission}
                      onChange={(e) =>
                        setUpdateCart({
                          ...updatedCart,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Customer Name
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedCart.customerName}
                      disabled={!useCartPermission}
                      onChange={(e) =>
                        setUpdateCart({
                          ...updatedCart,
                          customerName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Issue Date</label>
                  <div className="col-sm-12">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        disabled={!useCartPermission}
                        style={{ width: "50%" }}
                        inputFormat="dd/MM/yyyy"
                        value={new Date(updatedCart.dateIssued)}
                        onChange={(newValue) =>
                          setUpdateCart({
                            ...updatedCart,
                            dateIssued: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Expiry Date</label>
                  <div className="col-sm-12">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        disabled={!useCartPermission}
                        style={{ width: "50%" }}
                        inputFormat="dd/MM/yyyy"
                        value={new Date(updatedCart.expirationDate)}
                        onChange={(newValue) =>
                          setUpdateCart({
                            ...updatedCart,
                            expirationDate: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                {/* <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Department</label>
                  <div className="col-sm-8">
                    <Select
                      value={terminals?.find(
                        (c) => c.value === updatedCart.terminal_id
                      )}
                      onChange={(e) => {
                        setUpdateCart({
                          ...updatedCart,
                          terminal_id: e.value,
                        });
                      }}
                      options={terminals}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Category</label>
                  <div className="col-sm-8">
                    <Select
                      value={terminals?.find(
                        (c) => c.value === updatedCart.terminal_id
                      )}
                      onChange={(e) => {
                        setUpdateCart({
                          ...updatedCart,
                          terminal_id: e.value,
                        });
                      }}
                      options={terminals}
                    />
                  </div>
                </div> */}

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Notes</label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedCart.notes}
                      disabled={!useCartPermission}
                      onChange={(e) =>
                        setUpdateCart({
                          ...updatedCart,
                          notes: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Status</label>
                  <div className="col-sm-12">
                    <div className="pretty p-default p-curve p-toggle">
                      <input
                        type="checkbox"
                        checked={updatedCart.status}
                        disabled={!useCartPermission}
                        onChange={(e) => {
                          setUpdateCart({
                            ...updatedCart,
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

                {useCartPermission && (
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
    ...bindActionCreators(cartActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartForm);
