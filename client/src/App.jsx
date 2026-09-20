import { ThemeProvider } from "#components/theme-provider"
import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "#components/ui/sidebar";
import { AppSidebar } from "./components/AppSideBar";

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
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen min-w-screen">
            <AppSidebar/>
            <main className="min-w-full flex justify-center">
              <div className="mt-10">
                <Outlet/>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </ThemeProvider>
      </QueryClientProvider>
    </>
  )
};

export default App
