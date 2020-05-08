import {
  LOADER_TRAVEL,
  TRAVEL_PREFERENCE_TYPES,
  SELECTED_TRAVEL_PREFERENCE,
  SET_TRAVEL_PREFERENCE,
  SET_TRAVEL_INFO,
  USER_SAVED_LOCATIONS,
  UPDATE_TRAVEL_PREFERENCE,
  GET_PREFERENCES_BY_ID,
  EDIT_TRAVEL_PREFERENCE,
  GET_GUIDE_BY_ID
} from "./../actions/travel"
import { TRAVEL_SIGN_OUT } from "./../actions/user"

export default function travel(state = {}, action) {
  switch (action.type) {
    case TRAVEL_PREFERENCE_TYPES:
      return {
        ...state,
        loader: false,
        travelPreferenceTypes: action.payload,
      }
    case SELECTED_TRAVEL_PREFERENCE:
      return {
        ...state,
        loader: false,
        selectedTravelPreferences: action.payload,
      }
    case SET_TRAVEL_PREFERENCE:
      return {
        ...state,
        loader: false,
        travelPreferenceInfo: action.payload,
      }
    case UPDATE_TRAVEL_PREFERENCE:
      return {
        ...state,
        loader: false,
        updatetravelPreferenceInfo: action.payload,
      }
    case GET_PREFERENCES_BY_ID:
      return {
        ...state,
        loader: false,
        getPreferencesById: action.payload,
      }
    case EDIT_TRAVEL_PREFERENCE:
      return {
        ...state,
        loader: false,
        editTravelPreferences: action.payload
      }
    case SET_TRAVEL_INFO:
      return {
        ...state,
        loader: false,
        travelInfo: action.payload,
      }
    case USER_SAVED_LOCATIONS:
      return {
        ...state,
        loader: false,
        savedLocations: action.payload,
      }
    case LOADER_TRAVEL:
      return {
        ...state,
        loader: action.payload,
      }
    case TRAVEL_SIGN_OUT: {
      return {
        travel: {},
      }
    }
    case GET_GUIDE_BY_ID:
      return {
        ...state,
        loader: false,
        getGuideById: action.payload,
      }
  }
  return state
}
