import { useAuthStore } from '../store/authStore'
import { Avatar, AvatarImage } from '#components/ui/avatar';
import UserPosts from '../components/profile/UserPosts';

export default function Profile() {
  const user = useAuthStore(state => state.user);
  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user.avatarUrl}/>
      </Avatar>
      <h1 className="mt-5">Posts</h1>
      <UserPosts/>
    </div>
  )
}
