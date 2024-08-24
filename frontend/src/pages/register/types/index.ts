import { ApiSuccess, BadRequest } from '@/types/api.types'
import { User } from '@/types/auth.types'
import { AxiosError, AxiosResponse } from 'axios'

export type RegisterState = {
  name: string
  email: string
  password: string
  confirm: string
}

export type SignUpResp = ApiSuccess<string>
export type TokenResp = ApiSuccess<User & { token: string }>
export type Success = AxiosResponse<SignUpResp>
export type Fail = AxiosError<BadRequest>
export type Severity = 'error' | 'info' | 'success' | 'warning'
