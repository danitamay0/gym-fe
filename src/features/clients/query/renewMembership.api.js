import axios from '@/lib/axios'

export const renewMembership = async (payload) => {
  const { data } = await axios.post('/membership-clients', payload)
  return data
}
