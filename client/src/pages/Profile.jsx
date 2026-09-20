import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Avatar, AvatarImage } from '#components/ui/avatar';

export default function Profile() {
  const user = useAuthStore(state => state.user);
  return (
    <div>
      <Avatar className="w-24 h-24">
        <AvatarImage src={user.avatarUrl}/>
      </Avatar>
    </div>
  )
}
