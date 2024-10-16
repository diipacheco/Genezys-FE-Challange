import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
})

export const apiKey = 'c986ec80-8c11-11ef-b473-1f31a1eb45d0'

export const postalCodeApi = axios.create({
  baseURL: `https://app.zipcodebase.com/api/v1/`,
})


api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )
    return config
})
