const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.content
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}


export const setNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    content
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}


export default notificationReducer