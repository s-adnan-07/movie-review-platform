import axios from 'axios'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { VITE_SERVER_URL } from '@/constants'
import { Severity } from '@/types/alert.types'
import { SignUpSuccess, SignUpFail, RegisterState, SignUpResp } from '../types'

const initialState: RegisterState = {
  name: '',
  email: '',
  password: '',
  confirm: '',
}

const ONE_SECOND = 1000

function useRegister() {
  const [userData, setUserData] = useState(() => initialState)
  const [messages, setMessages] = useState<string[]>([])
  const [severity, setSeverity] = useState<Severity>('error')
  const navigate = useNavigate()

  const { refetch, isLoading } = useQuery<SignUpSuccess, SignUpFail>({
    queryKey: ['register'],
    queryFn: sendCredentials,
    enabled: false,
    retry: false,
  })

  function sendCredentials() {
    return axios.post<SignUpResp>(`${VITE_SERVER_URL}/auth/register`, userData)
  }

  function getFormData(formData: FormData): RegisterState {
    return {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirm: formData.get('confirm') as string,
    }
  }

  // Note: This is needed because the state value shows the previous update
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

    // TODO: Disable register button until api responds
    if (data) {
      setSeverity('success')
      setMessages([data.data.data])
      setTimeout(() => navigate('/login', { replace: true }), ONE_SECOND)
    }

    if (error) {
      setMessages(() => error.response?.data.message.map(m => m) ?? [])
    }
  }

  return {
    messages,
    severity,
    isLoading,
    handleSubmit,
    handleChange,
  }
}

export default useRegister
