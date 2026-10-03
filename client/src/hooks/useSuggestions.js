import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

function useGetSuggestions() {
    return useQuery({
        queryKey: ['suggestions'],
        queryFn: () => api.get("/suggestions").then(res => res.data)
    });
};

export { useGetSuggestions };
