import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Li } from './StyledComponents'


const UserInfo = () => {
  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id.toString() === match.params.id.toString())
    : null

  return (
    !user ? null :
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map(blog => <Li key={blog.id}>{blog.title}</Li>)}
        </ul>
      </div>
  )
}

export default UserInfo