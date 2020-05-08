import { combineReducers } from "redux"
import list from "./list"
import user from "./user"
import travel from "./travel"
import places from "./places"
import budget from "./budget"
import notifications from "./notifications"

const rootReducer = combineReducers({
  list: list,
  user: user,
  travel: travel,
  places: places,
  budget: budget,
  notifications: notifications
})

export default rootReducer
