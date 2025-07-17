import React from 'react'
import {
  Table,
  Sheet,
  Typography,
} from '@mui/joy'

const MembershipsTable = ({ memberships }) => {
  return (
    <Sheet variant="outlined" className="mt-4 rounded-lg overflow-hidden">
      <Table
        variant="plain"
        borderAxis="xBetween"
        size="md"
        stickyHeader
        aria-label="Tabla de membresías"
      >
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Duración (días)</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((m) => (
            <tr key={m.id}>
              <td>{m.tipo}</td>
              <td>{m.duracion_dias}</td>
              <td>${m.precio_actual.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  )
}

export default MembershipsTable
