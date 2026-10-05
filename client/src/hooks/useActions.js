import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";


function useToggleLike(postId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => 
            api.post(`/like-post/${postId}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myPosts', postId] });
            queryClient.invalidateQueries({ queryKey: ['myPosts'] });
        }
    });
};

function useToggleFollow(userId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () =>
            api.post(`follow-user/${userId}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed']});
            queryClient.invalidateQueries({ queryKey: ['suggestions']})
        }
    });
};

export { useToggleLike, useToggleFollow };
