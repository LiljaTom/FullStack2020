import userService from '../services/users'

const reducer = (state=[], action) => {
  switch(action.type) {
  case 'NEW_USER':
    return [...state, action.data]
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

/*
export const createUser = user => {
  return async dispatch => {
    const newUser = await userService.create(user)
    dispatch({
      type: 'NEW_USER',
      data: newUser
    })
  }
}
*/

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}


export default reducer