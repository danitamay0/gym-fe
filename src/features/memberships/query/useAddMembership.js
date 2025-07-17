import { useState } from 'react'
import { addMembershipApi } from './memberships.api'

export const useAddMembership = () => {
  const [loading, setLoading] = useState(false)

  const addMembership = async (data) => {
    try {
      setLoading(true)
      await addMembershipApi(data)
    } finally {
      setLoading(false)
    }
  }

  return { addMembership, loading }
}
