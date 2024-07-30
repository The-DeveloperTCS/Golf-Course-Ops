import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import supplierActions from "redux/supplier/action";
import { bindActionCreators } from "redux";
import { getSpecificSupplier } from "redux/supplier/service";
import NotificationActions from "redux/notifications/actions";
import Select from "react-select";
import { pascalCase } from "pascal-case";
import cities from "../../data/cities.json";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const SupplierForm = (props) => {
  const { supplierId, updateSupplier } = props;
  const [updatedSupplier, setUpdateSupplier] = useState({ ...updateSupplier });
  const [stateCities, setStateCities] = useState([]);
  const [saving, setSaving] = useState(false);
  const useSupplierPermission = useRolePermissions("SUPPLIER");

  useEffect(() => {
    if (supplierId) {
      getSpecificSupplier(supplierId).then((res) => {
        setUpdateSupplier(res.data);
      });
    }
  }, []);

  const usStates = [
    {
      label: "Alabama",
      value: "AL",
    },
    {
      label: "Alaska",
      value: "AK",
    },
    {
      label: "American Samoa",
      value: "AS",
    },
    {
      label: "Arizona",
      value: "AZ",
    },
    {
      label: "Arkansas",
      value: "AR",
    },
    {
      label: "California",
      value: "CA",
    },
    {
      label: "Colorado",
      value: "CO",
    },
    {
      label: "Connecticut",
      value: "CT",
    },
    {
      label: "Delaware",
      value: "DE",
    },
    {
      label: "District Of Columbia",
      value: "DC",
    },
    {
      label: "Federated States Of Micronesia",
      value: "FM",
    },
    {
      label: "Florida",
      value: "FL",
    },
    {
      label: "Georgia",
      value: "GA",
    },
    {
      label: "Guam",
      value: "GU",
    },
    {
      label: "Hawaii",
      value: "HI",
    },
    {
      label: "Idaho",
      value: "ID",
    },
    {
      label: "Illinois",
      value: "IL",
    },
    {
      label: "Indiana",
      value: "IN",
    },
    {
      label: "Iowa",
      value: "IA",
    },
    {
      label: "Kansas",
      value: "KS",
    },
    {
      label: "Kentucky",
      value: "KY",
    },
    {
      label: "Louisiana",
      value: "LA",
    },
    {
      label: "Maine",
      value: "ME",
    },
    {
      label: "Marshall Islands",
      value: "MH",
    },
    {
      label: "Maryland",
      value: "MD",
    },
    {
      label: "Massachusetts",
      value: "MA",
    },
    {
      label: "Michigan",
      value: "MI",
    },
    {
      label: "Minnesota",
      value: "MN",
    },
    {
      label: "Mississippi",
      value: "MS",
    },
    {
      label: "Missouri",
      value: "MO",
    },
    {
      label: "Montana",
      value: "MT",
    },
    {
      label: "Nebraska",
      value: "NE",
    },
    {
      label: "Nevada",
      value: "NV",
    },
    {
      label: "New Hampshire",
      value: "NH",
    },
    {
      label: "New Jersey",
      value: "NJ",
    },
    {
      label: "New Mexico",
      value: "NM",
    },
    {
      label: "New York",
      value: "NY",
    },
    {
      label: "North Carolina",
      value: "NC",
    },
    {
      label: "North Dakota",
      value: "ND",
    },
    {
      label: "Northern Mariana Islands",
      value: "MP",
    },
    {
      label: "Ohio",
      value: "OH",
    },
    {
      label: "Oklahoma",
      value: "OK",
    },
    {
      label: "Oregon",
      value: "OR",
    },
    {
      label: "Palau",
      value: "PW",
    },
    {
      label: "Pennsylvania",
      value: "PA",
    },
    {
      label: "Puerto Rico",
      value: "PR",
    },
    {
      label: "Rhode Island",
      value: "RI",
    },
    {
      label: "South Carolina",
      value: "SC",
    },
    {
      label: "South Dakota",
      value: "SD",
    },
    {
      label: "Tennessee",
      value: "TN",
    },
    {
      label: "Texas",
      value: "TX",
    },
    {
      label: "Utah",
      value: "UT",
    },
    {
      label: "Vermont",
      value: "VT",
    },
    {
      label: "Virgin Islands",
      value: "VI",
    },
    {
      label: "Virginia",
      value: "VA",
    },
    {
      label: "Washington",
      value: "WA",
    },
    {
      label: "West Virginia",
      value: "WV",
    },
    {
      label: "Wisconsin",
      value: "WI",
    },
    {
      label: "Wyoming",
      value: "WY",
    },
  ];

  const getCities = (state_id) => {
    const stateCity = cities.filter((data) => data.value === state_id);
    setStateCities(stateCity);
  };

  const onSave = () => {
    setSaving(true);

    props.onSave({ ...updatedSupplier }).then(() => setSaving(false));
  };

  const title = () => {
    if (updatedSupplier.id) {
      return `Update Supplier #${updatedSupplier.id}`;
    }

    return "New Supplier";
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
                  <label className="col-sm-4 col-form-label">First Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedSupplier.firstName}
                      disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Last Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedSupplier.companyName}
                      disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Email Address
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className="form-control react-form-input"
                      value={updatedSupplier.emailAddress}
                      disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          emailAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Company Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedSupplier.lastName}
                      disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Phone Number
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedSupplier.phoneNumber}
                      disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Cell Number</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedSupplier.cellPhoneNumber}
                      disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          cellPhoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Fax Number</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedSupplier.faxNumber}
                      disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          faxNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Current Address
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedSupplier.address}
                      //   disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">State</label>
                  <div className="col-sm-8">
                    <Select
                      value={
                        updatedSupplier.state
                          ? {
                              value: updatedSupplier.state,
                              label: pascalCase(updatedSupplier.state),
                            }
                          : null
                      }
                      onChange={(e) => {
                        getCities(e.value);
                        setUpdateSupplier({
                          ...updatedSupplier,
                          state: e.label,
                        });
                      }}
                      options={usStates}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">City</label>
                  <div className="col-sm-8">
                    <Select
                      value={
                        updatedSupplier.city
                          ? {
                              value: updatedSupplier.city,
                              label: pascalCase(updatedSupplier.city),
                            }
                          : null
                      }
                      onChange={(e) => {
                        getCities(e.value);
                        setUpdateSupplier({
                          ...updatedSupplier,
                          city: e.label,
                        });
                      }}
                      options={stateCities}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Zip/Postal Code
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedSupplier.zipCode}
                      disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          zipCode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Account Number
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedSupplier.accountNumber}
                      disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          accountNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Comment</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedSupplier.comments}
                      disabled={!useSupplierPermission}
                      onChange={(e) =>
                        setUpdateSupplier({
                          ...updatedSupplier,
                          comments: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Register</label>
                  <div className="col-sm-8">
                    <div className="pretty p-default p-curve p-toggle">
                      <input
                        type="checkbox"
                        checked={updatedSupplier.status}
                        disabled={!useSupplierPermission}
                        onChange={(e) => {
                          setUpdateSupplier({
                            ...updatedSupplier,
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

                {useSupplierPermission && (
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
    ...bindActionCreators(supplierActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierForm);
