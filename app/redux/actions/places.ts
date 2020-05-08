import resToBody from "../resToBody/resToBody"
export const LOADER_LOCATIONS = "LOADER_LOCATIONS"
export const TOURIST_LOCATIONS = "TOURIST_LOCATIONS"
export const FILTERED_LOCATIONS = "FILTERED_LOCATIONS"

export function touristLocations(region) {
  //console.log("region_123", JSON.stringify(region))
  return async dispatch => {
    dispatch({
      type: LOADER_LOCATIONS,
      payload: true,
    })
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=10000&type=tourist_attraction&key=AIzaSyBI_ae3Hvrib8Bao3_WrhXLEHKuGj1J8pQ`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    const body = await resToBody(res)
    //console.log("LOCATION_RES", JSON.stringify(body.results))
    return dispatch({
      type: TOURIST_LOCATIONS,
      payload: body.results,
    })
  }
}

export function getFilterByType(type, region) {
  console.log("type", type)
  console.log("region_123", JSON.stringify(region))
  return async dispatch => {
    dispatch({
      type: LOADER_LOCATIONS,
      payload: true,
    })
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=5000&type=${type}&key=AIzaSyBI_ae3Hvrib8Bao3_WrhXLEHKuGj1J8pQ`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    const body = await resToBody(res)
    // console.log("body", JSON.stringify(body))
    return dispatch({
      type: FILTERED_LOCATIONS,
      payload: body.results,
    })
  }
}


export default {
  touristLocations,
  getFilterByType,
  LOADER_LOCATIONS,
  TOURIST_LOCATIONS,
  FILTERED_LOCATIONS
}
