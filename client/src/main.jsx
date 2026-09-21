import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Feed from './pages/Feed.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import CreatePostPage from './pages/CreatePostPage.jsx'

const router = createBrowserRouter([
    { path: "login", Component: Login },
    { path: "register", Component: Register},
    {
      path: "/",
      Component: App,
      children: [
        { 
          Component: ProtectedRoute,
          children: [
            { index: true, path: "feed", Component: Feed },
            { path: "create-post", Component: CreatePostPage },
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
