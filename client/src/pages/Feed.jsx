import FeedContent from '../components/feed/FeedContent';
import Suggestions from '../components/feed/Suggestions';

export default function Feed() {
  return (
    <div className="flex flex-col gap-10 items-center relative">
      <Suggestions/>
      <FeedContent/>
    </div>
  )
};
