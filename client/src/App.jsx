import { ThemeProvider } from "#components/theme-provider"
import { ModeToggle } from "#components/mode-toggle";
import { Link, Outlet } from "react-router";

function App() {

  return (
    <>
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
    </>
  )
}

export default App
