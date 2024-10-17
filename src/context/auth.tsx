
import React, { createContext, useState, useContext, useEffect, ReactElement } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

import { api } from '@/lib/axios';
import { signIn, SignInBody } from '@/services/signin';
import { sign } from 'crypto';


type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  address: {
    street: string
    neighborhood: string
    number: string
    city: string
    state: string
    postalCode: string
  }
}

interface AuthContextInterface {
  user: User;
  login: ({ email, password }: SignInBody) => void;
  logout: () => void;
  isAuthenticated: boolean
  loading: boolean
}


const AuthContext = createContext({} as AuthContextInterface);

interface AuthProviderInterface {
  children: ReactElement
}

export function AuthProvider({ children }: AuthProviderInterface) {

  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)
  const { push } = useRouter()

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token')
      if (token) {
        push('/')
      } else {
        push('/signin')
      }
      setLoading(false)
    }
    loadUserFromCookies()
  }, [])

  async function login({ email, password }: SignInBody) {
    const user = await signIn({ email, password })
    if (user.accessToken) {
      Cookies.set('token', user.accessToken, { expires: 60 })
      Cookies.set('userId', user.id, { expires: 60 })
      api.defaults.headers.Authorization = `Bearer ${user.accessToken}`
      setUser(user)
      push('/')
    }
  }

  function logout() {
    Cookies.remove('token')
    setUser({} as User)
    delete api.defaults.headers.Authorization
    window.location.pathname = '/signin'
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}

interface ProtectRouteProps {
  children: ReactElement
}

export function ProtectRoute({ children }: ProtectRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  if (loading || (!isAuthenticated && window.location.pathname !== '/signin')) {
    return <h1>Carregando</h1>;
  }
  return children;
};

