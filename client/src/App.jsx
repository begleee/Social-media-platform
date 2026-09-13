import { ThemeProvider } from "#components/theme-provider"
import { ModeToggle } from "#components/mode-toggle";
import { Link, Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryCient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <ModeToggle/>
          </nav>
          <main>
            <Outlet/>
          </main>
        </div>
      </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
