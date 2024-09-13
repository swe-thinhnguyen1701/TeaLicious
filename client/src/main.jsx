import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import Home from "./pages/HomePage/HomePage.jsx";
import Error from "./pages/ErrorPage/Error.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import Review from "./pages/ReviewPage/Review.jsx"
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import AuthForm from "./pages/AuthPage/AuthForm.jsx";
import ItemPage from "./pages/ItemPage/ItemPage.jsx";

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
        path: "/my-profile",
        element: <UserPage />
      },
      {
        path: "/cart",
        element: <Review />
      },
      {
        path: "/products",
        element: <ProductsPage />
      },
      {
        path: "/auth",
        element: <AuthForm />
      },
      {
        path: "/product/:id",
        element: <ItemPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
