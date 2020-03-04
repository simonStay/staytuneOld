import resToBody from "../resToBody/resToBody"
export const GET_BUDGET_BY_TRAVEL_ID = "GET_BUDGET_BY_TRAVEL_ID"
export const BUDGET_LOADER = "BUDGET_LOADER"

const STAYTUNELIVEURL = "https://staytune.austinconversionoptimization.com"

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
                id: id
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
    return async dispatch => {
        const res = await fetch(STAYTUNELIVEURL + `/budget-infos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(budget),
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


export default {
    getBudgetByTravelId,
    BUDGET_LOADER,
    GET_BUDGET_BY_TRAVEL_ID
}
