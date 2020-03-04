export const GET_LIST = "GET_LIST"

export function getList() {
  return async dispatch => {
    return dispatch({
      type: GET_LIST,
      payload: "",
    })
  }
}

export default {
  GET_LIST,
  getList,
}
