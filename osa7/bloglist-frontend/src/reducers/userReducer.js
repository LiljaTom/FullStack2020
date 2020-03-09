import storage from '../utils/storage'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const loadUser = () => {
  return async dispatch => {
    const user = storage.loadUser()
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}

export default reducer