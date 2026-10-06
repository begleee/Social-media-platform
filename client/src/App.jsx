import { ThemeProvider } from "#components/theme-provider"
import { Outlet } from "react-router";
import { Spinner } from "#components/ui/spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "#components/ui/toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

const queryCient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10 // 10 minutes
    },
  },
});

function App() {
  const user = useAuthStore(state => state.user);
  const loading = useAuthStore(state => state.loading);
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
      if(!user) {
          checkAuth();
      }
  }, [user, checkAuth]);

  if(loading) {
      return <Spinner className='size-8'/>
  }

  return (
    <>
      <QueryClientProvider client={queryCient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Outlet/>
          <Toaster/>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
};

export default App
