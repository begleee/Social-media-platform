import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "#components/ui/separator";
import { Button } from "#components/ui/button";
import { useAuthStore } from "../store/authStore";
import EditProfileDialog from "./EditProfileDialog";

export default function Head() {
    const user = useAuthStore(state => state.user);
    return (
        <>
            <div className="flex flex-col gap-4 w-fit">
                <div className="flex items-center gap-4 w-fit">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatarUrl}/>
                    </Avatar>
                    <div>
                        <p className="font-bold">{user.name}</p>
                        <div className="flex gap-2">
                            <p className="font-light text-sm">{user.postsCount} posts</p>
                            <p className="font-light text-sm">{user.followersCount} followers</p>
                            <p className="font-light text-sm">{user.followingsCount} followings</p>
                        </div>
                    </div>
                </div>
                <EditProfileDialog>
                    <Button variant="outline">Edit Profile</Button>
                </EditProfileDialog>
            </div>
            <Separator className="backdrop-blur-2xl"/>
        </>
    )
};
