import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Button,
} from '@mui/joy'
import { useState, useEffect } from 'react'
import { useAddInventoryEntry } from '../query/useAddInventoryEntry'
import { getAllProducts } from '@/features/product/query/products.api'

const AddInventoryEntryModal = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    producto_id: '',
    cantidad: '',
    precio_unitario: '',
  })
  const [products, setProducts] = useState([])

  const { addInventoryEntry, loading } = useAddInventoryEntry()

  useEffect(() => {
    if (open) {
      getAllProducts().then(setProducts)
    }
  }, [open])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addInventoryEntry({
      ...form,
      cantidad: Number(form.cantidad),
      precio_unitario: Number(form.precio_unitario),
    })
    onClose()
    if (onSuccess) onSuccess()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h5">Agregar entrada de inventario</Typography>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <FormControl required>
            <FormLabel>Producto</FormLabel>
            <Select
              name="producto_id"
              value={form.producto_id}
              onChange={(_, val) => setForm((f) => ({ ...f, producto_id: val }))}
              required
            >
              {products.map((p) => (
                <Option key={p.id} value={p.id}>
                  {p.nombre}
                </Option>
              ))}
            </Select>
          </FormControl>

          <FormControl required>
            <FormLabel>Cantidad</FormLabel>
            <Input
              type="number"
              name="cantidad"
              value={form.cantidad}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl required>
            <FormLabel>Precio de compra</FormLabel>
            <Input
              type="number"
              name="precio_unitario"
              value={form.precio_unitario}
              onChange={handleChange}
              required
            />
          </FormControl>

          <Button type="submit" loading={loading}>
            Guardar
          </Button>
        </form>
      </ModalDialog>
    </Modal>
  )
}

export default AddInventoryEntryModal
