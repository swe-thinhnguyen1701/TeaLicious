import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import Home from "./pages/HomePage/HomePage.jsx";
import Error from "./pages/ErrorPage/Error.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: Error,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/user",
        element: <UserPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
