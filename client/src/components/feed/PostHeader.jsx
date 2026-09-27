import { Avatar, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";
import { Skeleton } from "#components/ui/skeleton";
import { useGetUser } from "../../hooks/useUsers"

export default function PostHeader({ userId }) {
    const { data, isLoading, isError } = useGetUser(userId);

    if(isLoading) {
        return (
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Avatar>
                        <Skeleton/>
                    </Avatar>
                    <Skeleton/>
                </div>
                <Button variant="outline">Follow</Button>
            </div>
        )
    };

    if(isError) {
        return (
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Avatar>
                        <Skeleton/>
                    </Avatar>
                    <Skeleton/>
                </div>
                <Button variant="outline">Follow</Button>
            </div>
        )
    }

    const { user } = data;
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Avatar>
                    <AvatarImage src={user.avatarUrl}/>
                </Avatar>
                <p>{user.name}</p>
            </div>
            <Button variant="outline">Follow</Button>
        </div>
    )
};
