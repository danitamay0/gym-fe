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
import { useAddMembership } from '../query/useAddMembership'

const AddMembershipModal = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    tipo: '',
    duracion_dias: '',
    precio_actual: '',
  })

  const { addMembership, loading } = useAddMembership()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addMembership(form)
    onClose()
    if (onSuccess) onSuccess()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h5">Agregar membresía</Typography>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <FormControl>
            <FormLabel>Tipo</FormLabel>
            <Input
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Duración (días)</FormLabel>
            <Input
              type="number"
              name="duracion_dias"
              value={form.duracion_dias}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Precio</FormLabel>
            <Input
              type="number"
              name="precio_actual"
              value={form.precio_actual}
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

export default AddMembershipModal
