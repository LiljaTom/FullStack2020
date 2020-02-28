const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

var timer
export const setNotification = (notification, time) => {
    clearTimeout(timer)
    return async dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', notification })

        timer = setTimeout(() => {
            dispatch({ type: 'SET_NOTIFICATION', notification: '' })
        }, time*1000)
    }

}


export default notificationReducer