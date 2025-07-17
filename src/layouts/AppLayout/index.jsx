import React from 'react'
import { CssBaseline, Sheet } from '@mui/joy'
import SideBar from './SideBar'
import HeaderBar from './HeaderBar'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      <CssBaseline />
      <SideBar />
      <div className="flex flex-col flex-1">
        <HeaderBar />
        <Sheet
          component="main"
          variant="outlined"
          className="flex-1 p-4 bg-background"
        >
          <Outlet />
        </Sheet>
      </div>
    </div>
  )
}

export default AppLayout
