import resToBody from "../resToBody/resToBody"
export const SIGN_UP = "SIGN_UP"
export const SIGN_OUT = "SIGN_OUT"
export const LOGIN = "LOGIN"
export const LOADER = "LOADER"
export const FORGOT_PASSWORD = "FORGOT_PASSWORD"
export const GET_USER_DETAILS = "GET_USER_DETAILS"
export const CREATE_USER_PROFILE = "CREATE_USER_PROFILE"
export const GET_AVATAR_IMAGES = "GET_AVATAR_IMAGES"
export const TRAVEL_SIGN_OUT = "TRAVEL_SIGN_OUT"
export const BUDGET_SIGN_OUT = "BUDGET_SIGN_OUT"
export const PLACES_SIGN_OUT = "PLACES_SIGN_OUT"
export const SEND_USER_LOCATION = "SEND_USER_LOCATION"
export const SAVE_LOCATION_LOGS = "SAVE_LOCATION_LOGS"
export const USER_CURRENT_LOCATION = "USER_CURRENT_LOCATION"
export const NOTIFICATION_SIGN_OUT = "NOTIFICATION_SIGN_OUT"

const STAYTUNELIVEURL = "https://api.staytune.co/"

export function signUp(firstname, lastname, email, password, zip, deviceId) {
  return async dispatch => {
    dispatch({
      type: LOADER,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        zip: zip,
        deviceId: deviceId,
      }),
    })
    const body = await resToBody(res)
    // console.log("signUp_123:", body)
    return dispatch({
      type: SIGN_UP,
      payload: body,
    })
  }
}

export function getNotification(preferenceId) {
  const res = fetch(STAYTUNELIVEURL + `travel-preferencesNotifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: preferenceId,
    }),
  })
  //const body = resToBody(res)
  //console.log("body_123", JSON.stringify(body))
  return res
}

export function Login(email, password, deviceId) {
  return async dispatch => {
    dispatch({
      type: LOADER,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        deviceId: deviceId,
      }),
    })
    const body = await resToBody(res)
    // console.log("Login_123:", body)
    return dispatch({
      type: LOGIN,
      payload: body,
    })
  }
}

export function Signout() {
  return async dispatch => {
    dispatch({
      type: TRAVEL_SIGN_OUT,
      payload: {},
    })
    dispatch({
      type: BUDGET_SIGN_OUT,
      payload: {},
    })
    dispatch({
      type: NOTIFICATION_SIGN_OUT,
      payload: {},
    })
    dispatch({
      type: PLACES_SIGN_OUT,
      payload: {},
    })
    return dispatch({
      type: SIGN_OUT,
      payload: {},
    })
  }
}
export function ChangePassword(user) {
  return async dispatch => {
    dispatch({
      type: LOADER,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `users/` + user.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: user.password,
      }),
    })
    const body = await resToBody(res)
    console.log("createUserProfile_actions:", body)
    return dispatch({
      type: CREATE_USER_PROFILE,
      payload: body,
    })
  }
}
export function verifyUser(user) {
  console.log("user_12345", JSON.stringify(user))
  return async dispatch => {
    dispatch({
      type: LOADER,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `users/` + user.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verified: user.verified,
      }),
    })
    const body = await resToBody(res)
    console.log("createUserProfile_actions:", JSON.stringify(body))
    return dispatch({
      type: CREATE_USER_PROFILE,
      payload: body,
    })
  }
}

export function ForgotPassword(email) {
  return async dispatch => {
    dispatch({
      type: LOADER,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `user/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
    const body = await resToBody(res)
    // console.log("body_123:", body)
    return dispatch({
      type: FORGOT_PASSWORD,
      payload: body,
    })
  }
}

export function getUserDetails(userId, token) {
  return async dispatch => {
    // dispatch({
    //   type: LOADER,
    //   payload: true,
    // })
    const res = await fetch(STAYTUNELIVEURL + `users/` + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const body = await resToBody(res)
    console.log("getUserDetails_123:", body)
    return dispatch({
      type: GET_USER_DETAILS,
      payload: body,
    })
  }
}

export function createUserProfile(userInfoObj) {
  return async dispatch => {
    dispatch({
      type: LOADER,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `users/` + userInfoObj.userId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfoObj),
    })
    const body = await resToBody(res)
    console.log("createUserProfile_actions:", body)
    return dispatch({
      type: CREATE_USER_PROFILE,
      payload: body,
    })
  }
}

export function getAvatarImages() {
  return async dispatch => {
    dispatch({
      type: LOADER,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `/travel-guides`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const body = await resToBody(res)
    // console.log("getAvatarImages_123:", body)
    return dispatch({
      type: GET_AVATAR_IMAGES,
      payload: body,
    })
  }
}

export function sendUserLocation(locationInfo) {
  return async dispatch => {
    console.log("sendUserLocation_action:", locationInfo)
    const res = await fetch(STAYTUNELIVEURL + `users/userDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: locationInfo.userId,
        userName: locationInfo.userName,
        lat: locationInfo.lat,
        long: locationInfo.long,
        id: locationInfo.id,
      }),
    })
    const body = await resToBody(res)
    console.log("sendUserLocation_123:", body)
    return dispatch({
      type: SEND_USER_LOCATION,
      payload: body,
    })
  }
}

export function saveLocationLogs(saveLogs) {
  return async dispatch => {
    dispatch({
      type: SAVE_LOCATION_LOGS,
      payload: saveLogs,
    })
  }
}

export function saveUserLocation(userLocation) {
  return async dispatch => {
    dispatch({
      type: USER_CURRENT_LOCATION,
      payload: userLocation,
    })
  }
}

export function updateUserLocation(user) {
  console.log("updateUserLocation_123:", JSON.stringify(user))
  return async dispatch => {
    // dispatch({
    //   type: LOADER,
    //   payload: true,
    // })
    const res = await fetch(STAYTUNELIVEURL + `users/` + user.userId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: user.lat,
        long: user.long,
        date: user.date,
      }),
    })
    const body = await resToBody(res)
    console.log("createUserProfile_actions:", JSON.stringify(body))
    return dispatch({
      type: CREATE_USER_PROFILE,
      payload: body,
    })
  }
}

export function selectedTourGuide(user) {
  return async dispatch => {
    dispatch({
      type: LOADER,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `users/` + user.userId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        travelGuideId: user.travelGuideId,
      }),
    })
    const body = await resToBody(res)
    console.log("selectedTourGuide_actions:", JSON.stringify(body))
    return dispatch({
      type: CREATE_USER_PROFILE,
      payload: body,
    })
  }
}

export default {
  signUp,
  Login,
  getUserDetails,
  createUserProfile,
  getAvatarImages,
  ForgotPassword,
  sendUserLocation,
  saveLocationLogs,
  saveUserLocation,
  Signout,
  updateUserLocation,
  selectedTourGuide,
  SIGN_UP,
  SIGN_OUT,
  TRAVEL_SIGN_OUT,
  PLACES_SIGN_OUT,
  BUDGET_SIGN_OUT,
  NOTIFICATION_SIGN_OUT,
  LOGIN,
  GET_USER_DETAILS,
  CREATE_USER_PROFILE,
  GET_AVATAR_IMAGES,
  FORGOT_PASSWORD,
  LOADER,
  SEND_USER_LOCATION,
  SAVE_LOCATION_LOGS,
  USER_CURRENT_LOCATION,
}
