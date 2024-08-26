import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { SelectChangeEvent } from '@mui/material/Select'

import { ONE_SECOND, VITE_SERVER_URL } from '@/constants'
import { ApiSuccess } from '@/types/api.types'
import { Severity } from '@/types/alert.types'
import { useAuth } from '@/contexts/AuthContext'
import {
  CreateMovie,
  Genre,
  AddMovieFail,
  AddMovieSuccess,
} from '@/types/movie.types'

// Note: This hook can be combined with useMovies using useQueries
// Not implemented above due to time constraints

const initialState: CreateMovie = {
  name: '',
  description: '',
  genre: '',
}

function useAddMovie() {
  const [movie, setMovie] = useState(initialState)
  const [messages, setMessages] = useState<string[]>([])
  const [severity, setSeverity] = useState<Severity>('error')
  const navigate = useNavigate()
  const { user } = useAuth()

  const { refetch } = useQuery<AddMovieSuccess, AddMovieFail>({
    queryKey: ['addMovie'],
    queryFn: addMovie,
    retry: false,
    enabled: false,
  })

  function addMovie() {
    return axios.post<ApiSuccess>(`${VITE_SERVER_URL}/movies`, movie, {
      headers: { Authorization: `Bearer ${user?.token}` },
    })
  }

  function getFormData(formData: FormData): CreateMovie {
    return {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      genre: formData.get('genre') as Genre,
    }
  }

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessages([])
    const formData = new FormData(e.currentTarget)
    const newState = getFormData(formData)

    setMovie(prevState => ({ ...prevState, ...newState }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    handleChange(e)

    const { data, error } = await refetch()

    if (error?.response?.data.message) {
      const { message } = error.response.data

      return setMessages(() =>
        typeof message == 'string' ? [message] : message
      )
    }

    if (!data) return

    setSeverity('success')
    setMessages(() => ['Movie Added'])
    setTimeout(() => navigate('/', { replace: true }), ONE_SECOND)
  }

  function handleSelectChange(event: SelectChangeEvent) {
    setMessages([])
    const genreValue = event.target.value as Genre
    setMovie(prevState => ({ ...prevState, genre: genreValue }))
  }

  return {
    movie,
    messages,
    severity,
    handleChange,
    handleSubmit,
    handleSelectChange,
  }
}

export default useAddMovie
