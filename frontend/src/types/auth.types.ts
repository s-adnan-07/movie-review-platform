export type User = {
  _id: string
  name: string
  email: string
  role: string
  token: string
} | null

export type Authstate = {
  user: User
  setUser: (user: User | (() => User)) => void
}
