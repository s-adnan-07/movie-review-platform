import { ApiSuccess } from '@/types/api.types'
import { AxiosResponse } from 'axios'

export type Movie = {
  _id: string
  name: string
  genre: string
  description: string
}

export type MoviesResp = ApiSuccess<Movie[]>
export type MovieSuccess = AxiosResponse<MoviesResp>
