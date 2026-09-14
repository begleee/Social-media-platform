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
        <div className="min-w-screen flex flex-col justify-between">
          <main className="min-w-screen h-[50vh] flex flex-col items-center">
            <Outlet/>
          </main>
          <nav className="min-w-screen flex flex-col items-center">
            <ButtomTabBar/>
          </nav>
        </div>
      </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
