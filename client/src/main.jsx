import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Feed from './pages/Feed.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import CreatePostPage from './pages/CreatePostPage.jsx'
import PostDetailsPage from './pages/PostDetailsPage.jsx'

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register},
      { 
        Component: ProtectedRoute,
        children: [
          { path: "feed", Component: Feed },
          { path: "create-post", Component: CreatePostPage },
          { path: "profile", Component: Profile },
          { path: "posts/:postId", Component: PostDetailsPage }
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
