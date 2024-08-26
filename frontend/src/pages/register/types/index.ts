import { ApiSuccess, BadRequest } from '@/types/api.types'
import { AxiosError, AxiosResponse } from 'axios'

export type RegisterState = {
  name: string
  email: string
  password: string
  confirm: string
}

export type SignUpResp = ApiSuccess<string>
export type SignUpSuccess = AxiosResponse<SignUpResp>
export type SignUpFail = AxiosError<BadRequest>
