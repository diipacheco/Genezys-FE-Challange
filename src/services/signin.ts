import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string 
}

interface SignInResponse {
  id: string
  email: string,
  password: string,
  fullName: string,
  accessToken: string
  address: {
    street: string,
    neighborhood: string,
    number: string,
    city: string,
    state: string,
    postalCode: string
  },
}

export async function signIn({ email, password }: SignInBody) {
   const response = await api.post<SignInResponse>('/login', { email, password })
   return response.data
}