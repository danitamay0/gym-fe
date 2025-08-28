import { useEffect, useState,useCallback } from 'react'
import { getAllMembershipsClients } from './memberships.api'

export const useMembershipsClients = (search='') => {
  const [membershipsClients, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchMembershipClients = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllMembershipsClients(search)
      setMemberships(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchMembershipClients()
  }, [fetchMembershipClients])

  return { membershipsClients, fetchMembershipClients, loading, error }
}
