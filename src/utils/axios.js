import Axios from 'axios'

// Full API base (including the /api/v1 suffix), env-driven so we can switch
// between local and production without code changes.
//   - Local backend (server.js mounts routes at /api/v1):  http://localhost:8084/api/v1
//   - Production (reverse proxy adds an extra /api):        https://www.pqs.fund/api/api/v1
// Set VITE_API_URL in .env / .env.production to override; defaults to local.
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8084/api/v1'

// Kept for any consumer that referenced the old origin-only constant.
export const API_BASE = API_URL.replace(/\/api\/v1\/?$/, '')

const api = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Backend signs JWTs with a 24h expiry. When a token lapses, protected routes
// reply 401 with "Token expired." / "Invalid token." — clear stale auth and
// bounce the user to login instead of surfacing raw error JSON.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const message = error?.response?.data?.message || ''
    const isAuthFailure =
      status === 401 &&
      /token expired|invalid token|authorization token/i.test(message)

    if (isAuthFailure) {
      localStorage.removeItem('token')
      localStorage.removeItem('auth')
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login?expired=1')
      }
    }
    return Promise.reject(error)
  }
)

export default api
