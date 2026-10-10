import { Button } from "#components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "#components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useDeletePost } from "../../hooks/usePosts";
import { useAuthStore } from "../../store/authStore";
import { toast } from "#components/ui/toast";
import { useNavigate } from "react-router";

export default function PostCardMoreActionMenu({ postId, userId }) {
    const navigate = useNavigate();
    const {mutate: deletePostMutate } = useDeletePost();
    const activeUserId = useAuthStore(state => state.user.id);
    
    if(activeUserId !== userId) return;

    function handleDelete() {
        deletePostMutate(postId, {
            onSuccess: () => {
                navigate(-1);
                toast.add({ description: "Post deleted successfully." });
            },
            onError: (err) => {
                toast.add({ description: `Failed to delete post. ${err.message}` });
            }
        })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">
                <Ellipsis/>
            </Button>}/>
            <DropdownMenuContent>
                <DropdownMenuItem variant="destructive" onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}