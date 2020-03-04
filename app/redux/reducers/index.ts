import { combineReducers } from "redux"
import list from "./list"
import user from "./user"
import travel from "./travel"
import places from "./places"
import budget from "./budget"

const rootReducer = combineReducers({
  list: list,
  user: user,
  travel: travel,
  places: places,
  budget: budget
})

export default rootReducer
