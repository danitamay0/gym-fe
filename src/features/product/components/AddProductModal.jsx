import React, { useState } from 'react'
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@mui/joy'
import { useAddProduct } from '../query/useAddProduct'

const AddProductModal = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    nombre: '',
    precio_venta: '',
  })

  const { addProduct, loading } = useAddProduct()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addProduct(form)
    if (onSuccess) onSuccess()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h5">Agregar producto</Typography>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Precio de venta</FormLabel>
            <Input
              type="number"
              step="0.01"
              name="precio_venta"
              value={form.precio_venta}
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

export default AddProductModal
