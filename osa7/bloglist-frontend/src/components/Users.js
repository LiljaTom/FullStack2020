import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({ user }) => {
  if(!user) {
    return null
  }

  return(
    <tr>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>

      <Table stripped>
        <thead>
          <tr>
            <th>Name</th>
            <th>blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <User key={user.id} user={user} />
          )}
        </tbody>
      </Table>
    </div>
  )

}

export default Users