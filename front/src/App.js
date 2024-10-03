import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './components/pages/Root';
import HomePage from './components/pages/HomePage'
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import Login from './components/signup/Login';
import Product from './pages/Admin/Product';
import Products2 from './pages/Admin/Products2';

import Dashboard from './pages/Admin/Dashboard';

const router = createBrowserRouter([{
  path: '/',
  element: <Root></Root>,

  children: [
    { path: "/", element: <HomePage></HomePage> },
    { path: "/about", element: <AboutPage></AboutPage> },
    { path: "/login", element: <Login></Login> },
    { path: "/product", element: <Product></Product> },
    { path: "/contact", element: <ContactPage></ContactPage> },


    { path: "/adminDashboard", element: <Dashboard></Dashboard> },
  ]
}])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;