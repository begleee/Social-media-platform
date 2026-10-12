import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import App from './App.jsx';
import FeedPage from './pages/FeedPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import PostDetailsPage from './pages/PostDetailsPage.jsx';
import EditPostPage from './pages/EditPostPage.jsx';

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { 
        Component: ProtectedRoute,
        children: [
          { path: "feed", Component: FeedPage },
          { path: "create-post", Component: CreatePostPage },
          { path: "profile", Component: ProfilePage },
          { path: ":postId", Component: PostDetailsPage },
          { path: "edit/:postId", Component: EditPostPage },
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
