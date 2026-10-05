import { ScrollArea } from "#components/ui/scroll-area";
import { useFeed } from "../../hooks/useFeed";
import PostCard from "../post/PostCard";
import PostCardSkeleton from "../post/PostCardSkeleton";

export default function FeedContent() {
    const { data, isLoading, isError } = useFeed();

    if(isLoading) return (
        <ScrollArea className="h-[50%] w-lg z-10">
            <PostCardSkeleton/>
        </ScrollArea>
    );

    if(isError) return <p>Failed loading feed.</p>;

    return (
        <ScrollArea className="h-[50%] w-lg z-10">
            {(data.feed.length <= 0) && <p className="text-center">Follow somebody to see the posts.</p>}

            {data?.feed?.map((post) => (
                <PostCard isFollowed={true} key={post.id} post={post}/>
            ))}
        </ScrollArea>
    )
};
