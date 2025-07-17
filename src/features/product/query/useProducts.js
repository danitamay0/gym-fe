import { useState, useEffect, useCallback } from 'react'
import { getAllProducts } from './products.api'

export const useProducts = (search = '') => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllProducts(search)
      setProducts(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts}
}
