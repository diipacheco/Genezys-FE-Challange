import { api } from '@/lib/axios'

export interface SignUpBody {
  fullName: string
  email: string
  password: string
  address: {
    street: string
    neighborhood: string
    number: string
    city: string
    state: string
    postalCode: string
  }
}

export async function signUp({ fullName, email, password , address }: SignUpBody) {
   await api.post('/register', { fullName, email, password, address })
}