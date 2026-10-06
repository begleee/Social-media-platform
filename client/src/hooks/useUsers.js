import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

function useGetUser(userId) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => api.get(`/get-user/${userId}`).then(res => res.data)
    });
};

function useUpdateProfile(userId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ name }) => 
            api.post("/update-user", { name: name }).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', userId] });
        }
    });
};

export { useGetUser, useUpdateProfile };
