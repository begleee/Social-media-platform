import { Button } from "#components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { useToggleLike } from "../../hooks/useActions";
import { useState } from "react";
import { toast } from "#components/ui/toast";

export default function PostCardActions({ postId, likesCount, commentsCount, isLiked }) {
    const { mutate: toggleLikeMutate, isPending } = useToggleLike(postId);
    const [ isLikedState, setIsLikedState ] = useState(isLiked);

    const currentLikesCount = likesCount + (isLikedState ? 1 : 0) - (isLiked ? 1 : 0);

    function handleLikeToggle() {
        setIsLikedState(prev => !prev);
        toast.add({ description: `Post ${isLikedState ? "unliked" : "liked"}.` });
        
        toggleLikeMutate(postId, {
            onError: (err) => {
                toast.add({ description: err.message });
            }
        });
    }

    return (
        <div className="flex gap-2">
            <Button disabled={isPending} variant={isLikedState ? "destructive" : "outline"} onClick={handleLikeToggle}>
                <Heart />
                {currentLikesCount}
            </Button>
            <Button variant="outline">
                <MessageCircle/>
                {commentsCount}
            </Button>
        </div>
    )
};
