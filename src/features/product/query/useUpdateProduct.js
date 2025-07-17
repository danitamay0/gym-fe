import { useState } from 'react'
import { updateProductApi } from './products.api'

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false)

  const updateProduct = async (id, data) => {
    setLoading(true)
    try {
      await updateProductApi(id, data)
    } finally {
      setLoading(false)
    }
  }

  return { updateProduct, loading }
}
