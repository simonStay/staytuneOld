import { GET_LIST } from "../actions/fetch"

export default function activities(state = [], action) {
  switch (action.type) {
    case GET_LIST:
      return []
  }
  return state
}
