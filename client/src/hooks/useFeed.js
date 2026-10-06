import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

function useFeed() {
    return useQuery({
        queryKey: ['feed'],
        queryFn: () => api.post('/feed', { skip: 0 }).then(res => res.data),
        staleTime: 0
    });
};

export { useFeed };
