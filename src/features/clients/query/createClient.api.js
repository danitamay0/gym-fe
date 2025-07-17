import axios from '@/lib/axios' // o donde tengas centralizada la instancia

export const createClient = async (payload) => {
  try {
    const { data } = await axios.post('/clients', payload)
    return data
  } catch (error) {
    const message =
      error.response?.data?.message || 'Error creando cliente'
    throw new Error(message)
  }
}
