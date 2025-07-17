import { Typography, CircularProgress, Button } from '@mui/joy'
import { useMemberships } from '../query/useMemberships'
import MembershipsTable from '../components/MembershipsTable'
import AddMembershipModal from '../components/AddMembership'
import { useState } from 'react'

const MembershipsPage = () => {
  const { memberships, refetch, loading, error } = useMemberships()
  const [open, setOpen] = useState(false)
  if (loading) return <CircularProgress />
  if (error) return <div>Error cargando membresías</div>

  const handleAddSuccess = () => {
    console.log("Membresía agregada exitosamente");
    
    setOpen(false)
    refetch()
  }
  return (
    <div className="p-6">
      <section className='flex justify-between'>
        <Typography level="h4" gutterBottom>Membresías</Typography>
        <Button onClick={() => setOpen(true)}>+ Agregar</Button>
      </section>
      <MembershipsTable memberships={memberships} />
      <AddMembershipModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  )
}

export default MembershipsPage
