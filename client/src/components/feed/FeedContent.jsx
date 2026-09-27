import { ScrollArea } from "#components/ui/scroll-area";
import { useFeed } from "../../hooks/useFeed";

import { CardSkeleton } from "../skeleton/CardSkeleton";
import PostCard from "./PostCard";
import PostHeader from "./PostHeader";

export default function FeedContent() {
    const { data, isLoading, isError } = useFeed();

    if(isLoading) return (
        <ScrollArea className="h-[50%] w-lg mt-20 z-10">
            <CardSkeleton/>
        </ScrollArea>
    );

    if(isError) return <p>Failed loading feed.</p>;

    return (
        <ScrollArea className="h-[50%] w-lg mt-20 z-10">
            {(data.feed.length <= 0) && <p className="text-center">Follow somebody to see the posts.</p>}

            {data?.feed?.map((post) => (
                <div key={post.id} className="flex flex-col gap-2">
                    <PostHeader userId={post.userId}/>
                    <PostCard post={post}/>
                </div>
            ))}
        </ScrollArea>
    )
};
