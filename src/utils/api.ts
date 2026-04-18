import axios from 'axios'

const baseURL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? '/api' : 'https://regnify-backend.onrender.com/api')

const apiToken = import.meta.env.VITE_API_TOKEN

export const api = axios.create({
  baseURL,
  timeout: 30000,
})

api.interceptors.request.use((config) => {
  const requestPath = config.url ?? ''
  const isPublicAuthRoute =
    requestPath.includes('/auth/login') ||
    requestPath.includes('/auth/refresh') ||
    requestPath.includes('/auth/reset-password')

  if (isPublicAuthRoute && config.headers) {
    delete config.headers.Authorization
  }

  const token = apiToken || localStorage.getItem('auth_token')

  if (token && !isPublicAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
