import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/contexts/AuthContext'
import { ApiSuccess } from '@/types/api.types'
import { ReviewsResponse } from '@/types/review.types'
import { VITE_SERVER_URL } from '@/constants'

function useReviews() {
  const { user } = useAuth()

  const { data: reviews, isLoading } = useQuery<ReviewsResponse[]>({
    queryKey: ['getUserReviews'],
    queryFn: getUserReviews,
    retry: false,
  })

  async function getUserReviews() {
    const { data } = await axios.get<ApiSuccess<ReviewsResponse[]>>(
      `${VITE_SERVER_URL}/reviews`,
      { headers: { Authorization: `Bearer ${user?.token}` } }
    )
    return data.data
  }

  return { reviews, isLoading }
}

export default useReviews
