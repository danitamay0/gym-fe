import { Table, Sheet, Typography } from '@mui/joy'

const formatCOP = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(valor)

const SalesTable = ({ sales }) => {
  return (
    <Sheet variant="outlined" className="rounded-lg overflow-hidden">
      <Table borderAxis="xBetween" size="md" stickyHeader>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Detalle</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((venta) => {
            const detalles = venta.detalles
              .map((d) => `${d.nombre} x ${d.cantidad}`)
              .join(', ')

            return (
              <tr key={venta.id}>
                <td>{new Date(venta.fecha).toLocaleString('es-CO')}</td>
                <td>{detalles}</td>
                <td>{formatCOP(venta.total)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Sheet>
  )
}

export default SalesTable
