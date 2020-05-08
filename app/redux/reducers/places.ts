import { LOADER_LOCATIONS, TOURIST_LOCATIONS, FILTERED_LOCATIONS } from "./../actions/places"

import { PLACES_SIGN_OUT } from "./../actions/user"

export default function places(state = { touristLocations: [], loader: false, filteredLocations: [] }, action) {
  // console.log("locations_123", JSON.stringify(state.touristLocations))
  switch (action.type) {
    case TOURIST_LOCATIONS:
      return {
        ...state,
        loader: false,
        touristLocations: action.payload,
      }
    case LOADER_LOCATIONS:
      return {
        ...state,
        loader: action.payload,
      }
    case FILTERED_LOCATIONS:
      return {
        ...state,
        touristLocations: state.touristLocations.concat(action.payload),
        filteredLocations: action.payload
      }
    case PLACES_SIGN_OUT:
      return {
        loader: false,
        places: {},
      }
  }
  return state
}
