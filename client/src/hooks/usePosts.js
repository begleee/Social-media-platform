import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

function useCreatePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData) => 
            api.post("/create-post", formData, { 
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myPosts'] });
        }
    });
};

function useGetMyPosts() {
    return useQuery({
        queryKey: ['myPosts'],
        queryFn: () => api.get("/get-my-posts").then(res => res.data)
    });
};

function useGetPost(postId, options = {}) {
    return useQuery({
        queryKey: ['myPosts', postId],
        queryFn: () => api.get(`/get-post/${postId}`).then(res => res.data),
        enabled: !!postId,
        ...options
    });
};

function useDeletePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId) => api.delete(`/delete-post/${postId}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myPosts'] });
        }
    });
};

export { useCreatePost, useGetMyPosts, useGetPost, useDeletePost };
