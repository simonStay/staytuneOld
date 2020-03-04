import {
    GET_BUDGET_BY_TRAVEL_ID,
    BUDGET_LOADER
} from "./../actions/budget"
import { BUDGET_SIGN_OUT } from "./../actions/user"

export default function budget(state = {}, action) {
    switch (action.type) {
        case GET_BUDGET_BY_TRAVEL_ID:
            return {
                ...state,
                budgetLoader: false,
                budgetByTravelId: action.payload,
            }
        case BUDGET_LOADER:
            return {
                ...state,
                budgetLoader: action.payload,
            }
        case BUDGET_SIGN_OUT:
            return {
                loader: false,
                budget: {},
            }
    }
    return state
}
