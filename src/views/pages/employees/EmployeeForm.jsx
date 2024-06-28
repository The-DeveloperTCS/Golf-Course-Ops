import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import employeeActions from "redux/employee/action";
import { bindActionCreators } from "redux";
import { getSpecificEmployee } from "redux/employee/service";
import { getRolesList } from "redux/role/service";
import { getTerminalsList } from "redux/terminal/service";
import NotificationActions from "redux/notifications/actions";
import Select from "react-select";
import { pascalCase } from "pascal-case";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import cities from "../../data/cities.json";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import moment from "moment";

const EmployeeForm = (props) => {
  const { employeeId, updateEmployee } = props;
  const [updatedEmployee, setUpdateEmployee] = useState({ ...updateEmployee });
  const [stateCities, setStateCities] = useState([]);
  const [terminals, setTerminals] = useState([]);
  const [roles, setRoles] = useState([]);
  const [saving, setSaving] = useState(false);
  const useEmployeePermission = useRolePermissions("EMPLOYEE");

  useEffect(() => {
    if (employeeId) {
      getSpecificEmployee(employeeId).then((res) => {
        setUpdateEmployee(res.data);
      });
    }
    getRolesList("", "")
      .then((res) => {
        const roleData = res.data.roles.map((data) => {
          return {
            label: data.name,
            value: data.name,
          };
        });
        setRoles(roleData);
      })
      .catch((err) => {
        console.log(err, "err in employee role screen");
      });

    getTerminalsList("", "")
      .then((res) => {
        const terminalData = res.data.terminals.map((data) => {
          return {
            label: data.name,
            value: data.name,
          };
        });
        setTerminals(terminalData);
      })
      .catch((err) => {
        console.log(err, "err in employee terminal screen");
      });
  }, []);

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

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

    props.onSave({ ...updatedEmployee }).then(() => setSaving(false));
  };
  const title = () => {
    if (updatedEmployee.id) {
      return `Update Employee #${updatedEmployee.id} - ${updatedEmployee.firstName} ${updateEmployee.lastName}`;
    }

    return "New Employee";
  };

  // const showError = (message) => {
  //     props.dispatch(NotificationActions.failure(message));
  //     setSaving(false);
  // };
  console.log(updatedEmployee, "updatedEmployee");
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
                    First Name121
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedEmployee.firstName}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
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
                      value={updatedEmployee.lastName}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Gender</label>
                  <div className="col-sm-8">
                    <Select
                      value={
                        updatedEmployee.gender
                          ? {
                              value: updatedEmployee.gender,
                              label: pascalCase(updatedEmployee.gender),
                            }
                          : null
                      }
                      onChange={(e) => {
                        setUpdateEmployee({
                          ...updatedEmployee,
                          gender: e.value,
                        });
                      }}
                      options={genderOptions}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Date Of Birth
                  </label>
                  <div className="col-sm-8">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        disabled={!useEmployeePermission}
                        style={{ width: "50%" }}
                        // label="Received Date"
                        // inputFormat="dd/MM/yyyy"
                        value={new Date(updatedEmployee?.dateOfBirth)}
                        onChange={(newValue) =>
                          setUpdateEmployee({
                            ...updatedEmployee,
                            dateOfBirth: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
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
                      value={updatedEmployee.emailAddress}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
                          emailAddress: e.target.value,
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
                      value={updatedEmployee.phoneNumber}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
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
                      value={updatedEmployee.cellPhoneNumber}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
                          cellPhoneNumber: e.target.value,
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
                      value={updatedEmployee.address}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
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
                        updatedEmployee.state
                          ? {
                              value: updatedEmployee.state,
                              label: pascalCase(updatedEmployee.state),
                            }
                          : null
                      }
                      onChange={(e) => {
                        getCities(e.value);
                        setUpdateEmployee({
                          ...updatedEmployee,
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
                        updatedEmployee.city
                          ? {
                              value: updatedEmployee.city,
                              label: pascalCase(updatedEmployee.city),
                            }
                          : null
                      }
                      onChange={(e) => {
                        getCities(e.value);
                        setUpdateEmployee({
                          ...updatedEmployee,
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
                      value={updatedEmployee.zipCode}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
                          zipCode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Job Title</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedEmployee.jobTitle}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
                          jobTitle: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Terminal</label>
                  <div className="col-sm-8">
                    <Select
                      value={terminals?.find(
                        (c) => c.value === updatedEmployee.defaultTerminal
                      )}
                      disabled={!useEmployeePermission}
                      onChange={(e) => {
                        setUpdateEmployee({
                          ...updatedEmployee,
                          defaultTerminal: e.value,
                        });
                      }}
                      options={terminals}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Card Number</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedEmployee.cardNumber}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
                          cardNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Pin Number</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedEmployee.pinNumber}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
                          pinNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Hourly Rate</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control react-form-input"
                      value={updatedEmployee.hourlyRate}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
                          hourlyRate: e.target.value,
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
                      value={updatedEmployee.comments}
                      disabled={!useEmployeePermission}
                      onChange={(e) =>
                        setUpdateEmployee({
                          ...updatedEmployee,
                          comments: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {!updatedEmployee.id && (
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Role</label>
                    <div className="col-sm-8">
                      <Select
                        value={
                          updatedEmployee.role
                            ? {
                                value: updatedEmployee.role,
                                label: pascalCase(updatedEmployee.role),
                              }
                            : null
                        }
                        disabled={!useEmployeePermission}
                        onChange={(e) => {
                          setUpdateEmployee({
                            ...updatedEmployee,
                            role: e.value,
                          });
                        }}
                        options={roles}
                      />
                    </div>
                  </div>
                )}

                {!updatedEmployee.id && (
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">User Name</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control react-form-input"
                        value={updatedEmployee.username}
                        disabled={!useEmployeePermission}
                        onChange={(e) =>
                          setUpdateEmployee({
                            ...updatedEmployee,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                {!updatedEmployee.id && (
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Password</label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control react-form-input"
                        value={updatedEmployee.password}
                        disabled={!useEmployeePermission}
                        onChange={(e) =>
                          setUpdateEmployee({
                            ...updatedEmployee,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                {!updatedEmployee.id && (
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      Confirm Password
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control react-form-input"
                        value={updatedEmployee.confirmPassword}
                        disabled={!useEmployeePermission}
                        onChange={(e) =>
                          setUpdateEmployee({
                            ...updatedEmployee,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Status</label>
                  <div className="col-sm-8">
                    <div className="pretty p-default p-curve p-toggle">
                      <input
                        type="checkbox"
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

                {useEmployeePermission && (
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
    ...bindActionCreators(employeeActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
