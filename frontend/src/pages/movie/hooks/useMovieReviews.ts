import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { ApiSuccess } from '@/types/api.types'
import { ReviewsResponse } from '@/types/review.types'
import { VITE_SERVER_URL } from '@/constants'

function useMovieReviews() {
  const { id } = useParams<{ id: string }>()

  const { data: reviews, isLoading } = useQuery<ReviewsResponse[]>({
    queryKey: ['getMovieReviews'],
    queryFn: getMovieReviews,
    retry: false,
  })

  async function getMovieReviews() {
    const { data } = await axios.get<ApiSuccess<ReviewsResponse[]>>(
      `${VITE_SERVER_URL}/movies/${id}/reviews`
    )
    return data.data
  }

  return { reviews, id, isLoading }
}

export default useMovieReviews
