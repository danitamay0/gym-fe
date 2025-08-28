import { useEffect, useState } from 'react'
import {
    Typography,
    CircularProgress,
    Input,
    Button,
} from '@mui/joy'
import { useMembershipsClients } from '../query/useMembershipClients'
import HistoryMembershipsTable from '../components/HistoryMembershipTable'
import { deleteMembershipApi } from '../query/memberships.api'

const HistoryMembershipPage = () => {
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const { membershipsClients, fetchMembershipClients, loading, error } = useMembershipsClients(debouncedSearch)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search)
        }, 400)
        return () => clearTimeout(timeout)
    }, [search])

    const deleteHistory = async (uuid) => {
        console.log({ uuid });
        await deleteMembershipApi(uuid)
        if (search) {
            setSearch('')
        } else {
            fetchMembershipClients()
        }
    }

    if (loading) return <CircularProgress />
    if (error) return <div className="text-red-500">Error al cargar historial</div>

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <Typography level="h4">Historial de membresias registradas</Typography>
                <div className="flex gap-3">
                    <Input
                        size="sm"
                        placeholder="Buscar por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-80"
                    />
                </div>

            </div>

            <HistoryMembershipsTable memberships={membershipsClients} onDelete={deleteHistory} />

        </div>
    )
}

export default HistoryMembershipPage
