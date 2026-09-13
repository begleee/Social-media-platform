import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => api.get('/getusers').then(res => res.data)
    });
};
