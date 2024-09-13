import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './components/pages/Root';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import Login from './components/signup/Login';

const router = createBrowserRouter([{
  path: '/',
  element: <Root></Root>,

  children: [
    { path: "/", element: <HomePage></HomePage> },
    { path: "/about", element: <AboutPage></AboutPage> },
    { path: "/login", element: <Login></Login> },
  ]
}])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;