import { Avatar, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "../store/authStore";
import { Separator } from "./ui/separator";

export default function Head() {
    const user = useAuthStore(state => state.user);
    return (
        <>
            <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatarUrl}/>
                </Avatar>
                <p>{user.name}</p>
            </div>
            <Separator/>
        </>
    )
};
