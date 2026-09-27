import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";


export function useGetUser(userId) {
    return useQuery({
        queryKey: ['user', `${userId}`],
        queryFn: () => api.get(`/get-user/${userId}`).then(res => res.data)
    })
};
