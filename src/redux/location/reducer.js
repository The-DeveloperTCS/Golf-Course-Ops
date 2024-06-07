// location/reducer.js
import { locationActions } from "./actions";

const initialState = {
  locations: [],
  specificLocation: null,
  loading: false,
  error: null,
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case locationActions.CREATE_LOCATION_REQUEST:
    case locationActions.UPDATE_LOCATION_REQUEST:
    case locationActions.DELETE_LOCATION_REQUEST:
    case locationActions.GET_LOCATIONS_LIST_REQUEST:
    case locationActions.GET_SPECIFIC_LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case locationActions.CREATE_LOCATION_SUCCESS:
      return {
        ...state,
        locations: [...state.locations, action.payload],
        loading: false,
        error: null,
      };

    case locationActions.UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        locations: state.locations.map((loc) =>
          loc.id === action.payload.id ? action.payload : loc
        ),
        loading: false,
        error: null,
      };

    case locationActions.DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        locations: state.locations.filter(
          (loc) => loc.id !== action.payload.id
        ),
        loading: false,
        error: null,
      };

    case locationActions.GET_LOCATIONS_LIST_SUCCESS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
        error: null,
      };

    case locationActions.GET_SPECIFIC_LOCATION_SUCCESS:
      return {
        ...state,
        specificLocation: action.payload,
        loading: false,
        error: null,
      };

    case locationActions.CREATE_LOCATION_FAILURE:
    case locationActions.UPDATE_LOCATION_FAILURE:
    case locationActions.DELETE_LOCATION_FAILURE:
    case locationActions.GET_LOCATIONS_LIST_FAILURE:
    case locationActions.GET_SPECIFIC_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
