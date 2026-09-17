import { create } from "zustand";
import { devtools } from "zustand/middleware"
import { api } from "../services/api";

export const useAuthStore = create(
    devtools((set) => ({
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

        register: async (name, email, password) => {
            set({ loading: true });
            try {
                const response = await api.post("/register", { name, email, password });
                set({ loading: false });
                return { success: true };
            } catch (error) {
                set({ loading: false });
                return ({ success: false, error: error.response?.data?.message || "Registration failed" });
            }
        },

        login: async (email, password) => {
            set({ loading: true });
            try {
                const response = await api.post("/login", { email, password });
                set({ user: response.data.user, loading: false});
                return { success: true };
            } catch (error) {
                set({ user: null, loading: false });
                return ({ success: false, error: error.response?.data?.message || "Login failed "});
            }
        },

        logout: async () => {
            try {
                const response = await api.post("/logout");
            } catch (error) {
                return ({ success: false, error: error, message: "Logout failed" });
            } finally {
                set({ user: null });
            }
        }
    }))
);
