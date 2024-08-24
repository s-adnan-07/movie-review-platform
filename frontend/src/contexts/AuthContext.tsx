import { createContext, useContext, useEffect, useState } from 'react'
import { Authstate, User } from '@/types/auth.types'

type Props = {
  children: React.ReactNode
}

const initialState: Authstate = {
  user: null,
  setUser: () => null,
}

const AuthContext = createContext<Authstate>(initialState)

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>(() => {
    const userString = localStorage.getItem('user')
    return userString ? JSON.parse(userString) : userString
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const auth: Authstate = {
    user,
    setUser,
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const auth = useContext(AuthContext)

  if (auth === undefined) {
    throw new Error('Must be used in AuthProvider')
  }

  return auth
}
