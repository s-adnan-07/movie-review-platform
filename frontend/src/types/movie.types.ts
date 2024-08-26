import { ApiFail, ApiSuccess, BadRequest } from '@/types/api.types'
import { AxiosError, AxiosResponse } from 'axios'

export type Genre = 'action' | 'comedy' | 'thriller' | 'drama' | 'horror' | ''

export type Movie = {
  _id: string
  name: string
  genre: Genre
  description: string
}

export type LandingResp = ApiSuccess<Movie[]>
export type LandingSuccess = AxiosResponse<LandingResp>
export type MovieSuccess = ApiSuccess<Movie>

export type CreateMovie = {
  name: string
  description: string
  genre: Genre
}

export type AddMovieSuccess = AxiosResponse<ApiSuccess>
export type AddMovieFail = AxiosError<ApiFail | BadRequest>
