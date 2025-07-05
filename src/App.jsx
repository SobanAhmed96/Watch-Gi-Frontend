import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import axios from 'axios';
import Whatsapp from './components/Whatsapp';
const App = () => {
  axios.defaults.baseURL = "https://watch-gi-website-backend.vercel.app"
  return (
    <RouterProvider router={router}>
    <Whatsapp />
    </RouterProvider>
  )
}

export default App