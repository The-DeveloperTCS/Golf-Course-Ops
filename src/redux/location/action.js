import {
  createLocations as createLocationService,
  updateLocations as updateLocationService,
  deleteLocations as deleteLocationService,
  getLocationsList as getLocationsListService,
  getSpecificLocations as getSpecificLocationService,
} from "./service";

export const locationActions = {
  CREATE_LOCATION_REQUEST: "location/create-location-request",
  CREATE_LOCATION_SUCCESS: "location/create-location-success",
  CREATE_LOCATION_FAILURE: "location/create-location-failure",
  UPDATE_LOCATION_REQUEST: "location/update-location-request",
  UPDATE_LOCATION_SUCCESS: "location/update-location-success",
  UPDATE_LOCATION_FAILURE: "location/update-location-failure",
  DELETE_LOCATION_REQUEST: "location/delete-location-request",
  DELETE_LOCATION_SUCCESS: "location/delete-location-success",
  DELETE_LOCATION_FAILURE: "location/delete-location-failure",
  GET_LOCATIONS_LIST_REQUEST: "location/get-locations-list-request",
  GET_LOCATIONS_LIST_SUCCESS: "location/get-locations-list-success",
  GET_LOCATIONS_LIST_FAILURE: "location/get-locations-list-failure",
  GET_SPECIFIC_LOCATION_REQUEST: "location/get-specific-location-request",
  GET_SPECIFIC_LOCATION_SUCCESS: "location/get-specific-location-success",
  GET_SPECIFIC_LOCATION_FAILURE: "location/get-specific-location-failure",
};

export const createLocationRequest = () => ({
  type: locationActions.CREATE_LOCATION_REQUEST,
});

export const createLocationSuccess = (data) => ({
  type: locationActions.CREATE_LOCATION_SUCCESS,
  payload: data,
});

export const createLocationFailure = (error) => ({
  type: locationActions.CREATE_LOCATION_FAILURE,
  error: error,
});

export const createLocation = (data) => {
  return async (dispatch) => {
    dispatch(createLocationRequest());
    try {
      const response = await createLocationService(data);
      dispatch(createLocationSuccess(response));
    } catch (error) {
      dispatch(createLocationFailure(error));
    }
  };
};

export const updateLocationRequest = () => ({
  type: locationActions.UPDATE_LOCATION_REQUEST,
});

export const updateLocationSuccess = (data) => ({
  type: locationActions.UPDATE_LOCATION_SUCCESS,
  payload: data,
});

export const updateLocationFailure = (error) => ({
  type: locationActions.UPDATE_LOCATION_FAILURE,
  error: error,
});

export const updateLocation = (id, data) => {
  return async (dispatch) => {
    dispatch(updateLocationRequest());
    try {
      const response = await updateLocationService(id, data);
      dispatch(updateLocationSuccess(response));
    } catch (error) {
      dispatch(updateLocationFailure(error));
    }
  };
};

export const deleteLocationRequest = () => ({
  type: locationActions.DELETE_LOCATION_REQUEST,
});

export const deleteLocationSuccess = (data) => ({
  type: locationActions.DELETE_LOCATION_SUCCESS,
  payload: data,
});

export const deleteLocationFailure = (error) => ({
  type: locationActions.DELETE_LOCATION_FAILURE,
  error: error,
});

export const deleteLocation = (id) => {
  return async (dispatch) => {
    dispatch(deleteLocationRequest());
    try {
      const response = await deleteLocationService(id);
      dispatch(deleteLocationSuccess(response));
    } catch (error) {
      dispatch(deleteLocationFailure(error));
    }
  };
};

// Get locations list request action creators
export const getLocationsListRequest = () => ({
  type: locationActions.GET_LOCATIONS_LIST_REQUEST,
});

export const getLocationsListSuccess = (data) => ({
  type: locationActions.GET_LOCATIONS_LIST_SUCCESS,
  payload: data,
});

export const getLocationsListFailure = (error) => ({
  type: locationActions.GET_LOCATIONS_LIST_FAILURE,
  error: error,
});

export const getLocationsList = (params) => {
  return async (dispatch) => {
    dispatch(getLocationsListRequest());
    try {
      const response = await getLocationsListService(params);
      dispatch(getLocationsListSuccess(response));
    } catch (error) {
      dispatch(getLocationsListFailure(error));
    }
  };
};

export const getSpecificLocationRequest = () => ({
  type: locationActions.GET_SPECIFIC_LOCATION_REQUEST,
});

export const getSpecificLocationSuccess = (data) => ({
  type: locationActions.GET_SPECIFIC_LOCATION_SUCCESS,
  payload: data,
});

export const getSpecificLocationFailure = (error) => ({
  type: locationActions.GET_SPECIFIC_LOCATION_FAILURE,
  error: error,
});

export const getSpecificLocation = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificLocationRequest());
    try {
      const response = await getSpecificLocationService(id);
      dispatch(getSpecificLocationSuccess(response));
    } catch (error) {
      dispatch(getSpecificLocationFailure(error));
    }
  };
};
