import React, { useContext, useEffect, useState } from 'react'
import axiosApi from './api/axiosApi'

const AuthContext = React.createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const useProvideAuthContext = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const cachedUser = localStorage.getItem('user')
    setUser(cachedUser ? JSON.parse(cachedUser) : null)
  }, [])

  const isLoggedIn = () => {
    const cachedUser = localStorage.getItem('user')
    return !!user || !!cachedUser
  }

  const signin = (username, password) => {
    setIsLoading(true)
    return axiosApi
      .post('/auth/login', { username, password })
      .then((response) => {
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      })
      .finally(setIsLoading(false))
  }

  const signout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return {
    user,
    signin,
    signout,
    isLoading,
    isLoggedIn,
  }
}

export default AuthContext
