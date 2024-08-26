import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/contexts/AuthContext'
import { ReviewObject } from '@/pages/movie/types'
import { Severity } from '@/types/alert.types'
import { ONE_SECOND, VITE_SERVER_URL } from '@/constants'
import { AddReviewFail, AddReviewSuccess } from '@/types/review.types'
import { ApiSuccess } from '@/types/api.types'

const initialState: ReviewObject = {
  rating: 3,
  feedback: '',
}

function useAddMovieReview() {
  const { id } = useParams<{ id: string }>()

  const [review, setReview] = useState<ReviewObject>(initialState)
  const [hover, setHover] = useState(-1)

  const [messages, setMessages] = useState<string[]>([])
  const [severity, setSeverity] = useState<Severity>('error')
  const navigate = useNavigate()

  const { user } = useAuth()

  const { refetch } = useQuery<AddReviewSuccess, AddReviewFail>({
    queryKey: ['addReview'],
    queryFn: postReview,
    enabled: false,
    retry: false,
  })

  function postReview() {
    return axios.post<ApiSuccess>(
      `${VITE_SERVER_URL}/movies/${id}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${user?.token}` },
      }
    )
  }

  function getFormData(formData: FormData): ReviewObject {
    return {
      rating: Number(formData.get('rating') as string),
      feedback: formData.get('feedback') as string,
    }
  }

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessages([])
    const formData = new FormData(e.currentTarget)
    const newState = getFormData(formData)

    setReview(prevState => ({ ...prevState, ...newState }))
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
    setMessages(() => ['Review Added'])
    setTimeout(
      () => navigate(`/movies/${id}/reviews`, { replace: true }),
      ONE_SECOND
    )
  }

  function handleHover(
    e: React.SyntheticEvent<Element, Event>,
    newHover: number
  ) {
    setHover(newHover)
  }

  return {
    review,
    hover,
    messages,
    severity,
    handleChange,
    handleSubmit,
    handleHover,
  }
}

export default useAddMovieReview
