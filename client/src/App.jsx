import { ThemeProvider } from "#components/theme-provider"
import { Link, Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ButtomTabBar from "./components/ButtomTabBar";

const queryCient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryCient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col gap-40">
          <main className="min-w-screen flex flex-col items-center justify-between">
            <Outlet/>
          </main>
        </div>
      </ThemeProvider>
      </QueryClientProvider>
    </>
  )
};

export default App
