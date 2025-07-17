import axios from '@/lib/axios'

export const getAllInventory = async () => {
  const response = await axios.get('/inventories')
  return response.data.data
}

export const createInventoryEntry = (data) => {
  return axios.post('/inventory-entries', data)
}
