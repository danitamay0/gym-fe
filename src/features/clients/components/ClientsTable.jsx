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
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Modal from '@mui/material/Modal';
import FingerprintEnrollment from '../../../shared/components/FingerprintEnrollment'

const PAGE_SIZE_OPTIONS = [5, 10, 20]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
};

const ClientsTable = ({ clients, filterStatus = 'all', onMebership, onRefresh }) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [open, setOpen] = useState(false);
  const [clienteId, setClienteId] = useState(null);

  const filteredClients = useMemo(() => {
    if (filterStatus === 'active') {
      return clients.filter((c) => c.last_membership?.active_membership === true)
    }
    if (filterStatus === 'expired') {
      return clients.filter((c) => c.last_membership?.active_membership === false)
    }
    return clients
  }, [clients, filterStatus])

  const paginatedClients = useMemo(() => {
    const start = page * pageSize
    const end = start + pageSize
    return filteredClients.slice(start, end)
  }, [filteredClients, page, pageSize])

  const pageCount = Math.ceil(filteredClients.length / pageSize)

  return (
    <Sheet variant="outlined" className="rounded-lg overflow-hidden">
      <Table borderAxis="xBetween" size="md" stickyHeader>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Fecha Nacimiento</th>
            <th>Membresía</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Estado</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.map((c) => {
            const m = c.last_membership
            return (
              <tr key={c.id} className={!m ? 'bg-gray-100' : ''}>
                <td>{c.nombre}</td>
                <td>{c.telefono}</td>
                <td>{c.fecha_nacimiento}</td>
                <td>{m?.membresia?.tipo || 'N/A'}</td>
                <td>{m?.fecha_inicio || '—'}</td>
                <td>{m?.fecha_fin || '—'}</td>
                <td>
                  {m?.active_membership ? (
                    <CheckCircleIcon className="text-green-500" />
                  ) : (
                    <CancelIcon className="text-red-500" />
                  )}

                </td>
                <td>
                  <CurrencyExchangeIcon onClick={() => onMebership(c)} className='cursor-pointer text-green-950' />
                  {
                    !m.fingerprint ? <FingerprintIcon onClick={() => { setClienteId(c.id); setOpen(true); }} className="ml-4 text-red-500" /> : <></>
                  }
                </td>
              </tr>
            )
          })}
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
      <Modal
        open={open}
        style={{ width: '50%', left: '25%' , top: '10%'}}
        onClose={() => setOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className='bg-white p-4 rounded'>
          <FingerprintEnrollment userId={clienteId} onSuccess={() => { setOpen(false); onRefresh(); }} />
        </div>

      </Modal>
    </Sheet>
  )
}
/*      {clienteId && <FingerprintEnrollment userId={clienteId} onSuccess={() => navigate('/clients')} />} */
export default ClientsTable
