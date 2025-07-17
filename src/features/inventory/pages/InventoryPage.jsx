import { useEffect, useState } from 'react'
import {
  Typography,
  CircularProgress,
  Input,
  Button,
} from '@mui/joy'
import { useInventory } from '../query/useInventory'
import InventoryTable from '../components/InventoryTable'
import AddInventoryEntryModal from '../components/AddInventoryEntryModal'

const InventoryPage = () => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const { inventory, loading, error } = useInventory(debouncedSearch)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 400)
    return () => clearTimeout(timeout)
  }, [search])

  if (loading) return <CircularProgress />
  if (error) return <div className="text-red-500">Error al cargar inventario</div>

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Typography level="h4">Inventario</Typography>
        <div className="flex gap-3">
          <Input
            size="sm"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
          <Button onClick={() => setOpen(true)}>+ Ingresar inventario</Button>
        </div>

      </div>

      <InventoryTable inventory={inventory} />

      <AddInventoryEntryModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => window.location.reload()} // o refetch si tienes uno
      />
    </div>
  )
}

export default InventoryPage
