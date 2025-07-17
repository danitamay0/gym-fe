import axios from '@/lib/axios'

export const getResumen = async (start, end) => {
  const params = {}
  if (start) params.fecha_inicio = start
  if (end) params.fecha_fin = end

  const res = await axios.get('/dashboard/resumen', { params })
  return res.data
}
