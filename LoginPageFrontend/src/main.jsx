import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Login,SignUP,SimpleForm, WebinarAdmin} from './Pages'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/simple",
    element: <SimpleForm/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/SignUp",
    element: <SignUP/>,
  },
  {
    path: "/WebinarAdmin",
    element: <WebinarAdmin/>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
