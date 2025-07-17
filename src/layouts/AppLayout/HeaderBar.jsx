import React from 'react'
import { Sheet, Typography } from '@mui/joy'

const HeaderBar = () => {
  return (
    <Sheet
      variant="outlined"
      className="h-16 flex items-center justify-between px-4 border-b border-divider"
    >
      <Typography level="h6">Panel de administración</Typography>
      {/* Aquí podrías poner avatar, botón de logout, etc. */}
    </Sheet>
  )
}

export default HeaderBar
