import React from 'react'
import { useUsers } from '../hooks/useUsers'

export default function Home() {
  const { data, isLoading, isError } = useUsers();

  if(isLoading) return <p>Loading users...</p>;
  if(isError) return <p>Failed loading users.</p>;

  console.log(data.users);

  return (
    <div>
      <ul>
        {data.users.map(user => (
          <li key={user.id}>
            Name: {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
