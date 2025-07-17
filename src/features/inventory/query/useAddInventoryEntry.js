import { useState } from 'react'
import { createInventoryEntry } from './inventory.api'

export const useAddInventoryEntry = () => {
  const [loading, setLoading] = useState(false)

  const addInventoryEntry = async (entry) => {
    setLoading(true)
    try {
      await createInventoryEntry(entry)
    } finally {
      setLoading(false)
    }
  }

  return { addInventoryEntry, loading }
}
