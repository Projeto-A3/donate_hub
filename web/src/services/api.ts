import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('@donate-hub:token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
    return Promise.reject(error)
  }
)

export default api
