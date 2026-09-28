import { Avatar, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";

export default function UnifiedPostHeader({ name, avatarUrl }) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Avatar size="lg">
                    <AvatarImage src={avatarUrl}/>
                </Avatar>
                <p>{name}</p>
            </div>
            <Button variant="outline">Follow</Button>
        </div>
    )
};
