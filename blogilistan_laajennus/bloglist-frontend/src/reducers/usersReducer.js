import userService from '../services/users'

const initialState = []

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'INIT_USERS':
    return action.data

  default: return state
  }
}

export default userReducer