import axios from 'axios'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Fail, RegisterState, Severity, SignUpResp, Success } from '../types'
import { VITE_SERVER_URL } from '@/constants'
import { useNavigate } from 'react-router-dom'

const initialState: RegisterState = {
  name: '',
  email: '',
  password: '',
  confirm: '',
}

function useRegister() {
  const [userData, setUserData] = useState(() => initialState)
  const [messages, setMessages] = useState<string[]>([])
  const [severity, setSeverity] = useState<Severity>('error')
  const navigate = useNavigate()

  const { refetch } = useQuery<Success, Fail>({
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
      setTimeout(() => navigate('/login', { replace: true }), 3000)
    }

    if (error) {
      console.dir(error.response?.data)
      setMessages(() => error.response?.data.message.map(m => m) ?? [])
    }
  }

  return { messages, severity, handleSubmit, handleChange }
}

export default useRegister
