import {
    Card,
    Typography,
    Table,
    Sheet,
    Input,
    Button,
} from '@mui/joy'
import { useEffect, useState } from 'react'
import { getResumen } from '../query/dashboard.api'

const formatCOP = (valor) =>
    new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(valor)

const DashboardResumenPage = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [resumen, setResumen] = useState(null)

    const fetchResumen = async () => {
        const data = await getResumen(startDate, endDate)
        setResumen(data)
    }

    useEffect(() => {
        fetchResumen()
    }, [])

    const handleFilter = () => {
        fetchResumen()
    }

    if (!resumen) return null

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
                <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Button onClick={handleFilter}>Filtrar</Button>
            </div>

            <Card>
                <Typography level="h5" className="mb-4">Resumen de Ventas por Producto</Typography>
                <Sheet variant="outlined" className="rounded-lg overflow-hidden">
                    <Table borderAxis="xBetween" size="md" stickyHeader>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad Total</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumen?.ventas.resumen?.map((v) => (
                                <tr key={v.producto}>
                                    <td>{v.producto}</td>
                                    <td>{v.cantidad_total}</td>
                                    <td>{formatCOP(v.subtotal || 0)}</td>
                                </tr>
                            ))}
                            <tr className="font-semibold">
                                <td colSpan={2}>Total ventas</td>
                                <td>{formatCOP(resumen.ventas.total || 0)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Sheet>
            </Card>

            <Card>
                <Typography level="h5" className="mb-4">Resumen de Membresías</Typography>
                <Sheet variant="outlined" className="rounded-lg overflow-hidden">
                    <Table borderAxis="xBetween" size="md" stickyHeader>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumen?.membresias.resumen?.map((m) => (
                                <tr key={m.tipo}>
                                    <td>{m.tipo} X {m.cantidad}</td>
                                    <td>{formatCOP(m.subtotal || 0)}</td>
                                </tr>
                            ))}
                            <tr className="font-semibold">
                                <td>Total membresías</td>
                                <td>{formatCOP(resumen.membresias.total || 0)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Sheet>
            </Card>

            <div className="text-end mt-6">
                <Typography level="h4">
                    Total Global: {formatCOP(resumen.total_global || 0)}
                </Typography>
            </div>
        </div>
    )
}

export default DashboardResumenPage
