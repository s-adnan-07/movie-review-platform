import { AxiosError, AxiosResponse } from 'axios'
import { ApiFail, ApiSuccess } from '@/types/api.types'
import { User } from '@/types/auth.types'

export type LoginState = {
  email: string
  password: string
}

export type TokenResp = ApiSuccess<User & { token: string }>
export type LoginSuccess = AxiosResponse<TokenResp>
export type LoginFail = AxiosError<ApiFail>
