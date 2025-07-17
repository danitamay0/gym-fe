import axios from '@/lib/axios'

export const getAllProducts = async (search = '') => {
  const response = await axios.get('/products', {
    params: search ? { search } : {},
  })
  return response.data.data
}

export const addProductApi = (data) => {
  return axios.post('/products', data)
}

export const updateProductApi = (id, data) => {
  return axios.put(`/products/${id}`, data)
}
