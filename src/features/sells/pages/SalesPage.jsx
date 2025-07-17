import { useEffect, useState } from 'react'
import {
  Typography,
  CircularProgress,
  Input,
  Button,
} from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { getAllSales } from '../query/sales.api'
import SalesTable from '../components/SalesTable'

const SalesPage = () => {
  const navigate = useNavigate()
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  useEffect(() => {
    setLoading(true)
    getAllSales(fechaInicio || null, fechaFin || null)
      .then(setSales)
      .finally(() => setLoading(false))
  }, [fechaInicio, fechaFin])

  if (loading) return <CircularProgress />

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <Typography level="h4">Ventas</Typography>
        <div className="flex gap-3 items-center flex-wrap">
          <Input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <Input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
          <Button onClick={() => navigate('new')}>+ Nueva Venta</Button>
        </div>
      </div>

      <SalesTable sales={sales} />
    </div>
  )
}

export default SalesPage
