import resToBody from "../resToBody/resToBody"
export const LOADER_TRAVEL = "LOADER_TRAVEL"
export const TRAVEL_PREFERENCE_TYPES = "TRAVEL_PREFERENCE_TYPES"
export const SELECTED_TRAVEL_PREFERENCE = "SELECTED_TRAVEL_PREFERENCE"
export const SET_TRAVEL_PREFERENCE = "SET_TRAVEL_PREFERENCE"
export const USER_TRAVEL_PREFERENCE = "USER_TRAVEL_PREFERENCE"
export const USER_SAVED_LOCATIONS = "USER_SAVED_LOCATIONS"
export const SET_TRAVEL_INFO = "SET_TRAVEL_INFO"
export const UPDATE_TRAVEL_PREFERENCE = "UPDATE_TRAVEL_PREFERENCE"
export const GET_PREFERENCES_BY_ID = "GET_PREFERENCES_BY_ID"
export const EDIT_TRAVEL_PREFERENCE = "EDIT_TRAVEL_PREFERENCE"
export const GET_GUIDE_BY_ID = "GET_GUIDE_BY_ID"

const STAYTUNELIVEURL = "https://api.staytune.co"

export function travelPreferenceTypes() {
  return async dispatch => {
    dispatch({
      type: LOADER_TRAVEL,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `/travel-preference-types`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const body = await resToBody(res)
    // console.log("travelCategories:", body)
    return dispatch({
      type: TRAVEL_PREFERENCE_TYPES,
      payload: body,
    })
  }
}

export function selectedTravelPreferences(preferences) {
  return async dispatch => {
    return dispatch({
      type: SELECTED_TRAVEL_PREFERENCE,
      payload: preferences,
    })
  }
}

export function setBudgeInfo(setTravelBudget) {
  return async dispatch => {
    dispatch({
      type: SET_TRAVEL_INFO,
      payload: setTravelBudget,
    })
  }
}

export function setTravelPreferences(setTravelBudget) {
  console.log("setTravelBudget.selectedCategories_123:" + JSON.stringify(setTravelBudget))
  return async dispatch => {
    dispatch({
      type: LOADER_TRAVEL,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `/travel-preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedTravelPreferences: setTravelBudget.selectedTravelPreferences,
        personsCount: setTravelBudget.personsCount,
        daysCount: setTravelBudget.daysCount,
        totalBudget: setTravelBudget.totalBudget,
        city: setTravelBudget.city,
        locationImage: setTravelBudget.locationImage,
        travelDate: setTravelBudget.travelDate,
        userId: setTravelBudget.userId,
      }),
    })
    const body = await resToBody(res)
    // console.log("body_123:", body)
    return dispatch({
      type: SET_TRAVEL_PREFERENCE,
      payload: body,
    })
  }
}

export function editPreferences(setTravelBudget) {
  console.log("editPreferences_123:" + JSON.stringify(setTravelBudget))
  return async dispatch => {
    dispatch({
      type: LOADER_TRAVEL,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `/travel-preferences/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedTravelPreferences: setTravelBudget.selectedTravelPreferences,
        personsCount: setTravelBudget.personsCount,
        daysCount: setTravelBudget.daysCount,
        totalBudget: setTravelBudget.totalBudget,
        city: setTravelBudget.city,
        locationImage: setTravelBudget.locationImage,
        travelDate: setTravelBudget.travelDate,
        id: setTravelBudget.preferenceId,
      }),
    })
    const body = await resToBody(res)
    console.log("body_123:", body)
    return dispatch({
      type: EDIT_TRAVEL_PREFERENCE,
      payload: body,
    })
  }
}

export function updateTravelPreferences(setTravelBudget) {
  console.log("setTravelBudget.selectedCategories_123:" + JSON.stringify(setTravelBudget))
  return async dispatch => {
    dispatch({
      type: LOADER_TRAVEL,
      payload: true,
    })
    const res = await fetch(
      STAYTUNELIVEURL + `/travel-preferences/` + setTravelBudget.preferenceId,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedCategories: setTravelBudget.selectedCategories,
        }),
      },
    )
    const body = await resToBody(res)
    console.log("body_123:", body)
    return dispatch({
      type: UPDATE_TRAVEL_PREFERENCE,
      payload: body,
    })
  }
}

export function getPreferencesById(preferenceId) {
  return async dispatch => {
    dispatch({
      type: LOADER_TRAVEL,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `/travel-preferences/` + preferenceId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const body = await resToBody(res)
    // console.log("body_123:", body)
    return dispatch({
      type: GET_PREFERENCES_BY_ID,
      payload: body,
    })
  }
}

export function userSavedLocations(userId) {
  return async dispatch => {
    dispatch({
      type: LOADER_TRAVEL,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `/travel-preferences/userId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
    const body = await resToBody(res)
    console.log("createUserProfile_actions:", body)
    return dispatch({
      type: USER_SAVED_LOCATIONS,
      payload: body,
    })
  }
}

export function getTourGuideById(guideId) {
  return async dispatch => {
    const res = await fetch(STAYTUNELIVEURL + `/travel-guides/` + guideId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const body = await resToBody(res)
    // console.log("body_123:", body)
    return dispatch({
      type: GET_GUIDE_BY_ID,
      payload: body,
    })
  }
}

export default {
  travelPreferenceTypes,
  selectedTravelPreferences,
  setTravelPreferences,
  userSavedLocations,
  setBudgeInfo,
  updateTravelPreferences,
  getPreferencesById,
  editPreferences,
  getTourGuideById,
  SELECTED_TRAVEL_PREFERENCE,
  TRAVEL_PREFERENCE_TYPES,
  SET_TRAVEL_PREFERENCE,
  LOADER_TRAVEL,
  USER_TRAVEL_PREFERENCE,
  USER_SAVED_LOCATIONS,
  SET_TRAVEL_INFO,
  UPDATE_TRAVEL_PREFERENCE,
  GET_PREFERENCES_BY_ID,
  GET_GUIDE_BY_ID,
  EDIT_TRAVEL_PREFERENCE,
}
