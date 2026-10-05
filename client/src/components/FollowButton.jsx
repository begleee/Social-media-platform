import { useState } from "react";
import { useToggleFollow } from "../hooks/useActions";
import { Button } from "./ui/button";
import { toast } from "./ui/toast";
import { useAuthStore } from "../store/authStore";

export default function FollowButton({ userId, isFollowed }) {
    const [ isFollowedState, setIsFollowedState ] = useState(!!isFollowed);
    const { mutate: toggleFollowMutate, isPending } = useToggleFollow(userId);
    const activeUserId = useAuthStore(state => state.user.id);

    if(activeUserId === userId) return;

    function handleFollowToggle() {
        setIsFollowedState(prev => !prev);
        toast.add({ description: `User ${isFollowedState ? "unfollowed" : "followed"}.` });
        
        toggleFollowMutate(userId, {
            onError: (err) => {
                setIsFollowedState((prev) => !prev);
                toast.add({ description: err.message });
            }
        });
    };
    
    return (
        <Button 
            disabled={isPending} 
            onClick={handleFollowToggle} 
            variant={isFollowedState ? "outline" : "default"}
        >
            {isFollowedState ? "Unfollow" : "Follow"}
        </Button>
    );
};
