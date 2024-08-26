import axios from 'axios'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { VITE_SERVER_URL } from '@/constants'
import { useAuth } from '@/contexts/AuthContext'
import { Severity } from '@/types/alert.types'
import { LoginFail, LoginState, LoginSuccess, TokenResp } from '../types'

const initialState: LoginState = {
  email: '',
  password: '',
}

const ONE_SECOND = 1000

function useLogin() {
  const [userData, setUserData] = useState(() => initialState)
  const [messages, setMessages] = useState<string[]>([])
  const [severity, setSeverity] = useState<Severity>('error')
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const { refetch } = useQuery<LoginSuccess, LoginFail>({
    queryKey: ['register'],
    queryFn: sendCredentials,
    enabled: false,
    retry: false,
  })

  function sendCredentials() {
    return axios.post<TokenResp>(`${VITE_SERVER_URL}/auth/login`, userData)
  }

  function getFormData(formData: FormData): LoginState {
    return {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  }

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessages([])
    const formData = new FormData(e.currentTarget)
    const newState = getFormData(formData)

    setUserData(prevState => ({ ...prevState, ...newState }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    handleChange(e)

    const { data, error } = await refetch()

    // Note: For some reason the custom message sent from backend doesn't show up here
    if (error) {
      return setMessages(() => ['Invalid username or password'])
    }

    if (!data) return

    const user = data.data.data
    setUser(() => user)

    setSeverity('success')
    setMessages(['Login Successful'])
    setTimeout(() => navigate('/', { replace: true }), ONE_SECOND)
  }

  return { messages, severity, handleSubmit, handleChange }
}

export default useLogin
