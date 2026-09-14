import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Feed from './pages/Feed.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "login", Component: Login },
      { 
        Component: ProtectedRoute,
        children: [
          { index: true, path: "feed", Component: Feed },
          { path: "about", Component: About },
          { path: "profile", Component: Profile}
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
