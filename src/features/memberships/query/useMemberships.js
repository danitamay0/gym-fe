import { useEffect, useState, useCallback } from 'react'
import { getAllMemberships } from './memberships.api'

export const useMemberships = () => {
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMemberships = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getAllMemberships()
      setMemberships(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMemberships()
  }, [fetchMemberships])

  return { memberships, loading, error, refetch: fetchMemberships }
}
