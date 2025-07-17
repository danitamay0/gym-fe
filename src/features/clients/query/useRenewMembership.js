import { useState } from 'react'
import { renewMembership } from './renewMembership.api'

export const useRenewMembership = () => {
  const [loading, setLoading] = useState(false)

  const submit = async (payload) => {
    setLoading(true)
    try {
      return await renewMembership(payload)
    } finally {
      setLoading(false)
    }
  }

  return { renewMembership: submit, loading }
}
