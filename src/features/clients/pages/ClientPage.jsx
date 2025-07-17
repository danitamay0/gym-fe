import { useEffect, useState } from 'react'
import {
  Typography,
  Select,
  Option,
  CircularProgress,
  Input,
  Button,
} from '@mui/joy'
import { useClients } from '../query/useClients'
import ClientsTable from '../components/ClientsTable'
import RenewMembershipModal from '../components/RenewMembershipModal'
import { useNavigate } from 'react-router-dom'

const ClientsPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedClient, setSelectedClient] = useState(null)
  const [openRenewMembership, setOpenRenewMembership] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 400)

    return () => clearTimeout(timeout)
  }, [search])

  const { clients, loading, error, refetch } = useClients(debouncedSearch)

  if (loading) return <CircularProgress />
  if (error) return <div>Error al cargar clientes</div>

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <Typography level="h4" className="whitespace-nowrap">Clientes</Typography>

        <div className="flex gap-3 items-center flex-wrap">
          <Input
            size="sm"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            value={filterStatus}
            onChange={(_, val) => setFilterStatus(val)}
            size="sm"
            className="w-40"
          >
            <Option value="all">Todos</Option>
            <Option value="active">Activos</Option>
            <Option value="expired">Vencidos</Option>
          </Select>
           <Button onClick={() => navigate("new") }>+ Agregar</Button>
        </div>
      </div>

      <ClientsTable onMebership={(client)=>{ setSelectedClient(client); setOpenRenewMembership(true) }} clients={clients} filterStatus={filterStatus} />
      <RenewMembershipModal
        open={openRenewMembership}
        clientId={selectedClient?.id}
        clientName={selectedClient?.nombre}
        onClose={() => {setSelectedClient(null); setOpenRenewMembership(false)}}
        onSuccess={refetch}
      />
    </div>
  )
}

export default ClientsPage
