import { useState } from 'react'
import { addProductApi } from './products.api'

export const useAddProduct = () => {
  const [loading, setLoading] = useState(false)

  const addProduct = async (data) => {
    setLoading(true)
    try {
      await addProductApi(data)
    } finally {
      setLoading(false)
    }
  }

  return { addProduct, loading }
}
