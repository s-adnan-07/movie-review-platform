import { AxiosError, AxiosResponse } from 'axios'
import { ApiFail, ApiSuccess, BadRequest } from './api.types'

export type ReviewObject = {
  rating: number
  feedback: string
}

export type AddReviewSuccess = AxiosResponse<ApiSuccess>
export type AddReviewFail = AxiosError<ApiFail | BadRequest>

export type ReviewsResponse = {
  _id: string
  rating: number
  feedback: string
  userName: string
}
