import resToBody from "../resToBody/resToBody"
export const NOTIFICATION_DETAIL_PLACE = "NOTIFICATION_DETAIL_PLACE"
export const OPEN_NOTIFICATION = "OPEN_NOTIFICATION"
export const NOTIFICATION_LIST = "NOTIFICATION_LIST"
export const LOADER_NOTIFICATION = "LOADER_NOTIFICATION"
export const NOTIFICATIONS_BY_PREFERENCEID = "NOTIFICATIONS_BY_PREFERENCEID"

const STAYTUNELIVEURL = "https://api.staytune.co/"
// const STAYTUNELIVEURL = "https://staytune.austinconversionoptimization.com/"
const GOOGLE_API_KEY = "AIzaSyBI_ae3Hvrib8Bao3_WrhXLEHKuGj1J8pQ"

export function openNotification(value) {
  return dispatch => {
    return dispatch({
      type: OPEN_NOTIFICATION,
      payload: value,
    })
  }
}

export function getPlaceInfo(placeId) {
  return async dispatch => {
    dispatch({
      type: LOADER_NOTIFICATION,
      payload: true,
    })
    const res = await fetch(
      "https://maps.googleapis.com/maps/api/place/details/json?key=" +
        GOOGLE_API_KEY +
        "&placeid=" +
        placeId,
    )
    const body = await resToBody(res)
    return dispatch({
      type: NOTIFICATION_DETAIL_PLACE,
      payload: body,
    })
  }
}

export function notificationList(userId) {
  console.log("notificationList_userId:", userId)
  return async dispatch => {
    dispatch({
      type: LOADER_NOTIFICATION,
      payload: true,
    })
    const res = await fetch("https://api.staytune.co/notificationslist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
    // .then((response) => response.json())
    //     .then((responseJson) => {
    //         return dispatch({
    //             type: NOTIFICATION_LIST,
    //             payload: responseJson
    //         })
    //     })

    const body = await resToBody(res)
    console.log("notificationList_userId_resToBody:", body)
    return dispatch({
      type: NOTIFICATION_LIST,
      payload: body,
    })
  }
}

export function getNotificationsByTravelId(preferenceId) {
  console.log("notificationList_userId:", preferenceId)
  return async dispatch => {
    dispatch({
      type: LOADER_NOTIFICATION,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `/notificationslist/` + preferenceId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const body = await resToBody(res)
    console.log("notificationList_userId_resToBody:", body)
    return dispatch({
      type: NOTIFICATIONS_BY_PREFERENCEID,
      payload: body,
    })
  }
}

export default {
  getPlaceInfo,
  openNotification,
  notificationList,
  getNotificationsByTravelId,
  NOTIFICATION_DETAIL_PLACE,
  OPEN_NOTIFICATION,
  NOTIFICATION_LIST,
  NOTIFICATIONS_BY_PREFERENCEID,
}
