import axios from '@/lib/axios'


export const getAllSales = async (fechaInicio, fechaFin) => {
  const params = {}
  if (fechaInicio) params.fecha_inicio = fechaInicio
  if (fechaFin) params.fecha_fin = fechaFin

  const { data } = await axios.get('/sales', { params })
  return data
}
