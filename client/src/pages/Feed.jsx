import FeedHead from '../components/feed/FeedHead';
import FeedContent from '../components/feed/FeedContent';

export default function Feed() {
  return (
    <div className="flex flex-col gap-4 items-center relative">
      <FeedHead/>
      <FeedContent/>
    </div>
  )
}
