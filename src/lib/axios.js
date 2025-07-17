import axios from 'axios'

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API}${import.meta.env.VITE_API_V}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
