import { useState } from 'react'
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Button,
  Input,
  Select,
  Option,
  FormLabel,
  FormHelperText,
} from '@mui/joy'
import { useMemberships } from '@features/memberships/query/useMemberships'
import { useRenewMembership } from '@features/clients/query/useRenewMembership'

const RenewMembershipModal = ({ open, onClose, clientId, clientName, onSuccess }) => {
  const { memberships } = useMemberships()
  const { renewMembership, loading: renewing } = useRenewMembership()
  const [form, setForm] = useState({
    membresia_id: '',
    fecha_inicio: '',
    fecha_fin: '',
    precio_pagado: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.membresia_id) newErrors.membresia_id = 'Requerido'
    if (!form.fecha_inicio) newErrors.fecha_inicio = 'Requerido'
    if (!form.fecha_fin) newErrors.fecha_fin = 'Requerido'
    if (!form.precio_pagado) newErrors.precio_pagado = 'Requerido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    try {
      await renewMembership({
        cliente_id: clientId,
        ...form,
      })
      onSuccess?.()
      onClose()
    } catch (err) {
      console.error(err)
      alert('Error renovando membresía')
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <h3 className='text-xl'>Renovar Membresía</h3>
        <h3 className='text-gray-700 capitalize'>{clientName}</h3>

        <div className="space-y-2 mt-4">
          <div>
            <FormLabel>Membresía</FormLabel>
            <Select
              name="membresia_id"
              value={form.membresia_id}
              onChange={(_, val) => {
                const precio = memberships.find((m) => m.id === val)?.precio_actual || ''
                setForm((prev) => ({ ...prev, membresia_id: val, precio_pagado: precio }))
              }}
              error={!!errors.membresia_id}
            >
              {memberships.map((m) => (
                <Option key={m.id} value={m.id}>
                  {m.tipo} – ${m.precio_actual}
                </Option>
              ))}
            </Select>
            {errors.membresia_id && <FormHelperText color="danger">{errors.membresia_id}</FormHelperText>}
          </div>

          <div>
            <FormLabel>Fecha inicio</FormLabel>
            <Input
              name="fecha_inicio"
              type="date"
              onChange={handleChange}
              error={!!errors.fecha_inicio}
            />
            {errors.fecha_inicio && <FormHelperText color="danger">{errors.fecha_inicio}</FormHelperText>}
          </div>

          <div>
            <FormLabel>Fecha fin</FormLabel>
            <Input
              name="fecha_fin"
              type="date"
              onChange={handleChange}
              error={!!errors.fecha_fin}
            />
            {errors.fecha_fin && <FormHelperText color="danger">{errors.fecha_fin}</FormHelperText>}
          </div>

          <div>
            <FormLabel>Precio pagado</FormLabel>
            <Input
              name="precio_pagado"
              type="number"
              value={form.precio_pagado}
              onChange={handleChange}
              error={!!errors.precio_pagado}
            />
            {errors.precio_pagado && <FormHelperText color="danger">{errors.precio_pagado}</FormHelperText>}
          </div>

          <Button onClick={handleSubmit} loading={renewing}>
            Renovar
          </Button>
        </div>
      </ModalDialog>
    </Modal>
  )
}

export default RenewMembershipModal