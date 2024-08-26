import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function useLogout() {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  function handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()

    localStorage.removeItem('user')
    setUser(() => null)
    navigate('/', { replace: true })
  }

  return { handleLogout }
}

export default useLogout
