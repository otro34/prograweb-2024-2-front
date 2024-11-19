
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import EstudiantePage from './routes/EstudiantePage.jsx'
import MatriculaPage from './routes/MatriculaPage.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
     path: "/",
     element: <App />
  },
  {
    path: "/estudiantes",
    element: <EstudiantePage />
  },
  {
    path: "/matricula",
    element: <MatriculaPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
