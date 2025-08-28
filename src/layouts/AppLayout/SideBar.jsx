import React from 'react'
import { Sheet, List, ListItemButton, ListItemDecorator, Typography } from '@mui/joy'
import Divider from '@mui/joy/Divider'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

import { NavLink } from 'react-router-dom'
import GroupIcon from '@mui/icons-material/Groups'

const SideBar = () => {
  return (
    <Sheet
      variant="outlined"
      className="w-60 border-r border-divider p-4"
    >
      <Typography level="h4" className="pb-4 text-gray-600">Evolution Gym</Typography>
      <List size="sm">

        <ListItemButton component={NavLink} to="/clients">
          <ListItemDecorator>
            <GroupIcon />
          </ListItemDecorator>
          Clientes
        </ListItemButton>
      

        <ListItemButton component={NavLink} to="/sells">
          <ListItemDecorator>
            <MonetizationOnIcon />
          </ListItemDecorator>
          Ventas
        </ListItemButton>
        <ListItemButton component={NavLink} to="/inventory">
          <ListItemDecorator>
            <InventoryIcon />
          </ListItemDecorator>
          Inventario
        </ListItemButton>
        <ListItemButton component={NavLink} to="/memberships-pays">
          <ListItemDecorator>
            <GroupIcon />
          </ListItemDecorator>
          Historial pagos de membresia
        </ListItemButton>
        <ListItemButton component={NavLink} to="/resumen">
          <ListItemDecorator>
            <InsertChartIcon />
          </ListItemDecorator>
          Resumen de cuentas
        </ListItemButton>
        <span className='mt-4'></span>
        <Divider />
        <Typography level="h5" className=" pt-7 mt-8 pb-4">Configuración</Typography>
        <ListItemButton component={NavLink} to="/memberships">
          <ListItemDecorator>
            <WorkspacePremiumIcon />
          </ListItemDecorator>
          Tipos de Membresías
        </ListItemButton>
        <ListItemButton component={NavLink} to="/products">

          <ListItemDecorator>
            <LocalCafeIcon />
          </ListItemDecorator>
          Productos
        </ListItemButton>
      </List>
    </Sheet>
  )
}

export default SideBar
