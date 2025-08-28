import {
  Table,
  Sheet,
  Select,
  Option,
  IconButton,
} from '@mui/joy'
import { useState, useMemo } from 'react'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Swal from 'sweetalert2'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const PAGE_SIZE_OPTIONS = [10, 20, 30]

const HistoryMembershipsTable = ({ memberships = [], onDelete }) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const paginatedMemberships = useMemo(() => {
    const start = page * pageSize
    const end = start + pageSize
    return memberships.slice(start, end)
  }, [memberships, page, pageSize])

  const pageCount = Math.ceil(memberships.length / pageSize)
  console.log(memberships);

  const deleteOp = (uuid) => {
    console.log(uuid);
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Vas a eliminar un pago',
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'No cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        onDelete(uuid)
      }
    })

  }

  return (
    <Sheet variant="outlined" className="rounded-lg overflow-hidden">
      <Table borderAxis="xBetween" size="md" stickyHeader>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Tipo de Membresia</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Monto pagado</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMemberships.map((item) => (
            <tr key={item.id} className={`${item.membresia_cliente.deleted ? "bg-red-200" : ""}`}>
              <td>{item.cliente.nombre}</td>
              <td>{item.membresia.tipo}</td>
              <td>{item.membresia_cliente.fecha_inicio}</td>
              <td>{item.membresia_cliente.fecha_fin}</td>
              <td>{item.membresia_cliente.precio_pagado}</td>
              <td>
                {
                  !item.membresia_cliente.deleted ? <IconButton
                    onClick={() => deleteOp(item.membresia_cliente.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                    : ""
                }

              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <IconButton
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <ChevronLeft />
          </IconButton>
          <span>
            Página {page + 1} de {pageCount}
          </span>
          <IconButton
            disabled={page + 1 >= pageCount}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <ChevronRight />
          </IconButton>
        </div>

        <div className="flex items-center gap-2">
          <span>Filas por página</span>
          <Select value={pageSize} onChange={(_, val) => {
            setPageSize(val)
            setPage(0)
          }}>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </Sheet>
  )
}

export default HistoryMembershipsTable
