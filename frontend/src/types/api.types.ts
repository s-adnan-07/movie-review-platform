export type ApiSuccess<T = any> = {
  statusCode: number
  message: string
  data: T
}

export type ApiFail = {
  statusCode: number
  message?: string
  error: string
}

// For validation errors
export type BadRequest = {
  message: string[]
  error: string
  statusCode: number
}
