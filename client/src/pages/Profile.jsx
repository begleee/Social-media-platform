import UserPosts from '../components/profile/UserPosts';
import Head from '../components/Head';

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 px-5 h-full">
      <Head/>
      <UserPosts/>
    </div>
  )
};
