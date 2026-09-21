import { ThemeProvider } from "#components/theme-provider"
import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10 // 10 minutes
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryCient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Outlet/>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
};

export default App
