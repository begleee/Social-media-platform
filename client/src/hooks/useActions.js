import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";


function useTogglePost(postId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => 
            api.post(`/like-post/${postId}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myPosts'] });
        }
    });
};

export { useTogglePost };
