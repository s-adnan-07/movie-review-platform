import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Movie, MovieSuccess } from '@/types/movie.types'
import { VITE_SERVER_URL } from '@/constants'

function useMovie() {
  const { id } = useParams<{ id: string }>()

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: ['getMovie'],
    queryFn: getMovie,
    retry: false,
  })

  async function getMovie() {
    const { data } = await axios.get<MovieSuccess>(
      `${VITE_SERVER_URL}/movies/${id}`
    )
    return data.data
  }

  return { movie, id, isLoading }
}

export default useMovie
