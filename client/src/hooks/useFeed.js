import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export function useFeed() {
    return useQuery({
        queryKey: ['feed'],
        queryFn: () => api.post('/feed', { skip: 0 }).then(res => res.data)
    });
};
