import React, { useEffect, useState } from 'react'
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
import { useUpdateProduct } from '../query/useUpdateProduct'

const EditProductModal = ({ open, onClose, product, onSuccess }) => {
  const [form, setForm] = useState({
    nombre: '',
    precio_venta: '',
  })

  const { updateProduct, loading } = useUpdateProduct()

  useEffect(() => {
    if (product) {
      setForm({
        nombre: product.nombre || '',
        precio_venta: product.precio_venta || '',
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateProduct(product.id, form)
    onClose()
    if (onSuccess) onSuccess()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h5">Editar producto</Typography>

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
            Guardar cambios
          </Button>
        </form>
      </ModalDialog>
    </Modal>
  )
}

export default EditProductModal
