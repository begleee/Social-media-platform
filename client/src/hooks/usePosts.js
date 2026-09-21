import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

function useCreatePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ title, details, imageUrls}) => 
            api.post("/create-post", { title, details, imageUrls }).then(res => res.data),
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

export { useCreatePost, useGetMyPosts };
