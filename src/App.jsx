import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import axios from 'axios';
const App = () => {
  axios.defaults.baseURL = "https://watch-gi-website-backend.vercel.app"
  return (
    <RouterProvider router={router}>
    
    </RouterProvider>
  )
}

export default App