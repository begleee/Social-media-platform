import { Avatar, AvatarImage } from "#components/ui/avatar";
import FollowButton from "../FollowButton";

export default function PostCardHeader({ name, avatarUrl, userId, isFollowed }) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Avatar size="lg">
                    <AvatarImage src={avatarUrl}/>
                </Avatar>
                <p>{name}</p>
            </div>
            <FollowButton userId={userId} isFollowed={isFollowed}/>
        </div>
    )
};
