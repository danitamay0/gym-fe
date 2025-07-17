import { useEffect, useState, useCallback } from 'react'
import { getAllClients } from './clients.api'

export const useClients = (search = '') => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchClients = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getAllClients(search)
      setClients(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  return { clients, loading, error, refetch: fetchClients }
}
