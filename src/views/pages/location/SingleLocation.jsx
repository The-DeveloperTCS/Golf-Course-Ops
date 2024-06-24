import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import LocationForm from "./LocationForm";
import {
  updateLocationDetails,
  getSpecificLocation,
} from "redux/location/service";

const LocationSingle = (props) => {
  const { locationId } = props;
  const [locationDetail, setLocationDetails] = useState({});

  useEffect(() => {
    getLocationDetails();
  }, [locationId]);

  const getLocationDetails = async () => {
    getSpecificLocation(locationId).then((res) => {
      setLocationDetails(res.data);
    });
  };

  const onLocationSave = async (updatedLocation) => {
    return updateLocationDetails(locationId, updatedLocation)
      .then((res) => {
        props.successWithTimeout(
          `Location #${res.data.id} updated successfully!`
        );
        props.history.push("/location/list");
      })
      .catch((err) =>
        props.failure(
          `Location #${updatedLocation.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <LocationForm
      updateEmployee={locationDetail}
      locationId={locationId}
      onSave={onLocationSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const locationId = parseInt(ownProps.match.params.locationId);
  return {
    locationId: locationId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSingle);
