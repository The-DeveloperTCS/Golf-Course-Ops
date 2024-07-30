import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import LocationForm from "./LocationForm";
import {
  updateLocationDetails,
  getSpecificLocation,
} from "redux/location/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const LocationSingle = (props) => {
  const {
    locationId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [locationDetail, setLocationDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getLocationDetails();
  }, [locationId]);

  const getLocationDetails = async () => {
    getSpecificLocation(locationId).then((res) => {
      setLocationDetails(res.data);
      endLoader(false);
    });
  };

  const onLocationSave = async (updatedLocation) => {
    return updateLocationDetails(locationId, updatedLocation)
      .then((res) => {
        successWithTimeout(`Location updated successfully!`);
        props.history.push("/location/list");
      })
      .catch((err) => {
        failure(
          `Location #${updatedLocation.id} failed to update! ${err.response.data.message}`
        );
      });
  };

  return loader ? (
    <Loader />
  ) : (
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
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(LocationSingle);
