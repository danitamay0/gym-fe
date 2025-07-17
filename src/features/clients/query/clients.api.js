import axios from '@/lib/axios'

export const getAllClients = async (search = '') => {
  const response = await axios.get('/clients', {
    params: search ? { search } : {},
  })
  return response.data.data
}
