import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

function useGetSuggestions() {
    return useQuery({
        queryKey: ['myPosts'],
        queryFn: () => api.get("/suggestions").then(res => res.data)
    });
};

export { useGetSuggestions };
