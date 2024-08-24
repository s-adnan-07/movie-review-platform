export type User = {
  name: string
  email: string
  role: string
} | null

export type Authstate = {
  user: User
  setUser: (user: User | (() => User)) => void
}
