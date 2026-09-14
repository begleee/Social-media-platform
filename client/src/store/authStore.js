import { create } from "zustand";
import { api } from "../services/api";

export const useAuthStore = create((set) => ({
    user: null,
    loading: true,

    checkAuth: async () => {
        try {
            const response = await api.get("/me");
            set({ user: response.data.user, loading: false});
        } catch (error) {
            set({ user: null, loading: false});
        }
    },

    login: async() => {
        try {
            const response = await api.post("/login", { email, password });
            set({ user: response.data.user, loading: false});
            return { success: true };
        } catch (error) {
            set({ user: null, loading: false });
            return ({ success: false, error: error.response?.data?.message || "Login failed "});
        }
    },

    logout: async() => {
        try {
            const response = await api.post("/logout");
        } catch (error) {
            return ({ success: false, error: error, message: "Logout failed" });
        } finally {
            set({ user: null });
        }
    }
}));
