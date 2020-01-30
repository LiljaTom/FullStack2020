import React from 'react'

const Notification = ({message, color}) => {

    const notificationStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        bordeStyle: 'solid',
        bordeRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    

    if(message === null) {
        return null
    }

    return(
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification