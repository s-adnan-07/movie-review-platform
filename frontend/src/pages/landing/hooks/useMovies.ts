import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { VITE_SERVER_URL } from '@/constants'
import { Movie, MoviesResp } from '../types'

function useMovies() {
  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ['getMovies'],
    queryFn: getMovies,
    retry: false,
  })

  async function getMovies() {
    const { data } = await axios.get<MoviesResp>(`${VITE_SERVER_URL}/movies`)
    return data.data
  }

  return { movies, isLoading }
}

export default useMovies
