import React from 'react'
import UserElement from './UserElement'

const AdminPanelUsers = ({users, meId}) => {
  return (
    <div>
        {users.map((user) => {
          return <UserElement key={user.id} user={user} meId={meId}/>
        })}
    </div>
  )
}

export default AdminPanelUsers