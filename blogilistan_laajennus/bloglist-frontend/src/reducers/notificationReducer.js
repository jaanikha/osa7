const initialNotification = ''
var errorNotiTimeout
var SuccessNotiTimeout

export const successNotification = (message, timeout) => {
  return dispatch => {
    console.log('success action')
    clearTimeout(SuccessNotiTimeout)
    SuccessNotiTimeout = setTimeout(function(){ dispatch(empty()) }, timeout*1000)
    dispatch({
      type: 'SUCCESS_NOTIFICATION',
      data: message
    })
  }
}

export const errorNotification = (message, timeout) => {
  return dispatch => {
    console.log('error action')
    clearTimeout(errorNotiTimeout)
    errorNotiTimeout = setTimeout(function(){ dispatch(empty()) }, timeout*1000)
    dispatch({
      type: 'ERROR_NOTIFICATION',
      data: message
    })
  }
}

export const empty = () => {
  return {
    type: 'EMPTY'
  }
}

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'SUCCESS_NOTIFICATION': return([action.data, true])
  case 'ERROR_NOTIFICATION': return([action.data, false])
  case 'EMPTY': return('')
  default: return(state)
  }
}

export default notificationReducer