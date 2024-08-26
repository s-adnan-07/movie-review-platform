import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { VITE_SERVER_URL } from '@/constants'
import { Movie, LandingResp } from '@/types/movie.types'

function useLanding() {
  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ['getMovies'],
    queryFn: getMovies,
    retry: false,
  })

  async function getMovies() {
    const { data } = await axios.get<LandingResp>(`${VITE_SERVER_URL}/movies`)
    return data.data
  }

  return { movies, isLoading }
}

export default useLanding
