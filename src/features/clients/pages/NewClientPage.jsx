import { useState } from 'react'
import {
  Input,
  Select,
  Option,
  Typography,
  Button,
  CircularProgress,
  FormLabel,
  FormHelperText,
} from '@mui/joy'
import { useMemberships } from '@features/memberships/query/useMemberships'
import { useCreateClient } from '@features/clients/query/useCreateClient'
import { useNavigate } from 'react-router-dom'
import FingerprintEnrollment from '../../../shared/components/FingerprintEnrollment'

const NewClientPage = () => {
  const navigate = useNavigate()
  const { memberships, loading: loadingMemberships, error } = useMemberships()
  const { createClient, loading: creating } = useCreateClient()
  const [clienteId, setClienteId] = useState(null)

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    fecha_nacimiento: '',
    membership: {
      membresia_id: '',
      fecha_inicio: '',
      fecha_fin: '',
      precio_pagado: '',
    },
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('membership.')) {
      const key = name.split('.')[1]
      setForm((prev) => ({
        ...prev,
        membership: {
          ...prev.membership,
          [key]: value,
        },
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!form.nombre) newErrors.nombre = 'Requerido'
    if (!form.correo) newErrors.correo = 'Requerido'
    if (!form.telefono) newErrors.telefono = 'Requerido'
    if (!form.fecha_nacimiento) newErrors.fecha_nacimiento = 'Requerido'
    if (!form.membership.membresia_id) newErrors.membresia_id = 'Requerido'
    if (!form.membership.fecha_inicio) newErrors.fecha_inicio = 'Requerido'
    if (!form.membership.fecha_fin) newErrors.fecha_fin = 'Requerido'
    if (!form.membership.precio_pagado) newErrors.precio_pagado = 'Requerido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    try {
      const res = await createClient(form)
      setClienteId(res.id) // ← Guarda el ID
      //navigate('/clients')
    } catch (err) {
      console.error(err)
      alert('Ocurrió un error al crear el cliente')
    }
  }

  if (loadingMemberships) return <CircularProgress />
  if (error) return <div>Error cargando membresías</div>

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <Typography level="h4">Nuevo Cliente con Membresía</Typography>
      {clienteId && <FingerprintEnrollment userId={clienteId} onSuccess={() => navigate('/clients')} />}
      {
        !clienteId && <>

          <div>
            <FormLabel>Nombre</FormLabel>
            <Input name="nombre" onChange={handleChange} error={!!errors.nombre} />
            {errors.nombre && <FormHelperText color="danger">{errors.nombre}</FormHelperText>}
          </div>

          <div>
            <FormLabel>Correo</FormLabel>
            <Input name="correo" onChange={handleChange} error={!!errors.correo} />
            {errors.correo && <FormHelperText color="danger">{errors.correo}</FormHelperText>}
          </div>

          <div>
            <FormLabel>Teléfono</FormLabel>
            <Input name="telefono" onChange={handleChange} error={!!errors.telefono} />
            {errors.telefono && <FormHelperText color="danger">{errors.telefono}</FormHelperText>}
          </div>

          <div>
            <FormLabel>Fecha de nacimiento</FormLabel>
            <Input
              name="fecha_nacimiento"
              type="date"
              onChange={handleChange}
              error={!!errors.fecha_nacimiento}
            />
            {errors.fecha_nacimiento && <FormHelperText color="danger">{errors.fecha_nacimiento}</FormHelperText>}
          </div>

          <div>
            <FormLabel>Membresía</FormLabel>
            <Select
              name="membership.membresia_id"
              value={form.membership.membresia_id}
              onChange={(_, val) => {
                const precioActual = memberships.find((m) => m.id === val)?.precio_actual || '';
                setForm((prev) => ({
                  ...prev,
                  membership: { ...prev.membership, membresia_id: val, precio_pagado: precioActual },

                }))
              }
              }
              placeholder="Selecciona membresía"
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
            <FormLabel>Fecha de inicio</FormLabel>
            <Input
              name="membership.fecha_inicio"
              type="date"
              onChange={handleChange}
              error={!!errors.fecha_inicio}
            />
            {errors.fecha_inicio && <FormHelperText color="danger">{errors.fecha_inicio}</FormHelperText>}
          </div>

          <div>
            <FormLabel>Fecha de fin</FormLabel>
            <Input
              name="membership.fecha_fin"
              type="date"
              onChange={handleChange}
              error={!!errors.fecha_fin}
            />
            {errors.fecha_fin && <FormHelperText color="danger">{errors.fecha_fin}</FormHelperText>}
          </div>

          <div>
            <FormLabel>Precio pagado</FormLabel>
            <Input
              name="membership.precio_pagado"
              type="number"
              onChange={handleChange}
              value={form.membership.precio_pagado}
              error={!!errors.precio_pagado}
            />
            {errors.precio_pagado && <FormHelperText color="danger">{errors.precio_pagado}</FormHelperText>}
          </div>

          <Button onClick={handleSubmit} loading={creating}>
            Guardar
          </Button>
        </>
      }
    </div>
  )
}

export default NewClientPage
