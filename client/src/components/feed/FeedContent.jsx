import { ScrollArea } from "#components/ui/scroll-area";
import { useFeed } from "../../hooks/useFeed";
import PostCard from "../post/PostCard";
import PostCardSkeleton from "../post/PostCardSkeleton";

export default function FeedContent() {
  const { data, isLoading, isError } = useFeed();

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 py-4 space-y-4">
        <PostCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center p-8 text-center text-destructive">
        <p>Failed loading feed. Please try again later.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full h-full max-h-[calc(100vh-4rem)] z-10 px-2 sm:px-4">
      <div className="flex flex-col items-center gap-4 sm:gap-6 py-4 max-w-2xl mx-auto">
        {data?.feed?.length === 0 && (
          <p className="text-center text-muted-foreground py-10 text-sm sm:text-base">
            Follow somebody to see posts in your feed.
          </p>
        )}

        {data?.feed?.map((post) => (
          <PostCard isFollowed={true} key={post.id} post={post} />
        ))}
      </div>
    </ScrollArea>
  );
}