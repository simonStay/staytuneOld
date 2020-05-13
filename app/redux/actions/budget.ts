import resToBody from "../resToBody/resToBody"
export const GET_BUDGET_BY_TRAVEL_ID = "GET_BUDGET_BY_TRAVEL_ID"
export const BUDGET_LOADER = "BUDGET_LOADER"
export const SET_BUDGET_LOGS = "SET_BUDGET_LOGS"

// const STAYTUNELIVEURL = "https://staytune.austinconversionoptimization.com"
const STAYTUNELIVEURL = "https://api.staytune.co"

export function getBudgetByTravelId(id) {
  return async dispatch => {
    dispatch({
      type: BUDGET_LOADER,
      payload: true,
    })
    const res = await fetch(STAYTUNELIVEURL + `/budget-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
    const body = await resToBody(res)
    // console.log("body_123:", body)
    return dispatch({
      type: GET_BUDGET_BY_TRAVEL_ID,
      payload: body,
    })
  }
}

export function EditBudgetInfo(budget) {
  console.log("EditBudgetInfo_API:", budget)
  return async dispatch => {
    const res = await fetch(STAYTUNELIVEURL + `/budget-infos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: budget.day,
        mealsExpenditure: budget.mealsExpenditure,
        entExpenditure: budget.entExpenditure,
        userId: budget.userId,
        travelId: budget.travelId,
      }),
    })
    const body = await resToBody(res)
    await getBudgetByTravelId(budget.travelId)
    console.log("body_123_budget:", body)
    // return dispatch({
    //     type: GET_BUDGET_BY_TRAVEL_ID,
    //     payload: body,
    // })
  }
}

export function setBudgetLogEvents(logsArray) {
  return async dispatch => {
    return dispatch({
      type: SET_BUDGET_LOGS,
      payload: logsArray,
    })
  }
}

export default {
  getBudgetByTravelId,
  setBudgetLogEvents,
  BUDGET_LOADER,
  GET_BUDGET_BY_TRAVEL_ID,
  SET_BUDGET_LOGS,
}
