
export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const emptyUser = () => {
  return dispatch => {
    dispatch({
      type: 'EMPTY_USER',
    })
  }
}

export const defaultUser = () => {
  return dispatch => {
    dispatch({
      type: 'DEFAULT',
    })
  }
}

const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'SET_USER':
    return action.data

  case 'EMPTY_USER':
    return null

  case 'DEFAULT':
    return state

  default: return state
  }
}

export default userReducer