import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersToTable = () => {

  const users = useSelector(state => state.users)

  return (
    <tbody>
      {users.map(user =>
        <tr key={user.id}>
          <th><Link to={`/users/${user.id}`}>{user.name}</Link></th>
          <th>{user.blogs.length}</th>
        </tr>)}
    </tbody>
  )
}

const UserList = () => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Number of blogs</th>
        </tr>
      </tbody>
      <UsersToTable />
    </table>
  )
}

export default UserList