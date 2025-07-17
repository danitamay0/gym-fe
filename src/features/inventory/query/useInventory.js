import { useEffect, useState } from 'react'
import { getAllInventory } from './inventory.api'

export const useInventory = () => {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInventory()
        setInventory(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { inventory, loading, error }
}
