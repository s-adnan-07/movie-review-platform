import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function AdminRoutes() {
  const { user } = useAuth()
  return user?.role == 'admin' ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoutes
