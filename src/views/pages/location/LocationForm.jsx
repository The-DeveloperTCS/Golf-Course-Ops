import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import locationActions from "redux/location/action";
import { bindActionCreators } from "redux";
import { getSpecificLocation } from "redux/location/service";
import NotificationActions from "redux/notifications/actions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

const LocationForm = (props) => {
  const { locationId, updateLocation } = props;
  const [updatedLocation, setUpdateLocation] = useState({ ...updateLocation });
  const [saving, setSaving] = useState(false);
  const useLocationPermission = useRolePermissions("LOCATION");

  useEffect(() => {
    if (locationId) {
      getSpecificLocation(locationId).then((res) => {
        setUpdateLocation(res.data);
      });
    }
  }, []);

  const onSave = () => {
    setSaving(true);
    props.onSave({ ...updatedLocation }).then(() => setSaving(false));
  };

  const title = () => {
    if (updatedLocation.id) {
      return `Update Location #${updatedLocation.id} - ${updatedLocation.name}`;
    }

    return "New Location";
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
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedLocation.name}
                      disabled={!useLocationPermission}
                      onChange={(e) =>
                        setUpdateLocation({
                          ...updatedLocation,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Destination</label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedLocation.destination}
                      disabled={!useLocationPermission}
                      onChange={(e) =>
                        setUpdateLocation({
                          ...updatedLocation,
                          destination: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Time</label>
                  <div className="col-sm-12">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Controlled picker"
                        value={moment(updatedLocation.time).format("LLL")}
                        onChange={(newValue) => {
                          setUpdateLocation({
                            ...updatedLocation,
                            time: newValue,
                          });
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Weather</label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedLocation.weather}
                      disabled={!useLocationPermission}
                      onChange={(e) =>
                        setUpdateLocation({
                          ...updatedLocation,
                          weather: e.target.value,
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
                        checked={updatedLocation.status}
                        onChange={(e) => {
                          setUpdateLocation({
                            ...updatedLocation,
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

                {useLocationPermission && (
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
    ...bindActionCreators(locationActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);
