import React from 'react'
import { useSelector } from 'react-redux'
import '../index.css'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  let style = notification[1] ? {
    color: 'green',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  } : {
    color: 'red',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification[0]) {
    style = { display: 'none' }
  }

  return (
    <div style={style}>
      {notification[0]}
    </div>
  )
}

export default Notification