import { createContext } from 'react'

export const authContext = {
  user: {
    username: '',
    token: ''
  },
  setUser(user) {
    authContext.user = user
  }
}
export const AuthContext = createContext(authContext)
export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer