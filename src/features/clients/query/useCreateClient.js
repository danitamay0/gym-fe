import { useState } from 'react'
import { createClient } from './createClient.api'

export const useCreateClient = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const data = await createClient(payload)
      return data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createClient: submit, loading, error }
}
