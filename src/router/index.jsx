import { BrowserRouter, useRoutes } from 'react-router-dom'
import publicRoutes from './publicRoutes'
import privateRoutes from './privateRoutes'

const AppRoutes = () => {
  const isAuthenticated = true // Reemplaza con tu lógica de autenticación
  const routes = isAuthenticated ? privateRoutes : publicRoutes
  return useRoutes(routes)
}

const Router = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)

export default Router
