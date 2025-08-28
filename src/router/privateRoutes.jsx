import AppLayout from '@/layouts/AppLayout'
import MembershipsPage from '@/features/memberships/pages/MembershipsPage'
import ClientsPage from '../features/clients/pages/ClientPage'
import NewClientPage from '../features/clients/pages/NewClientPage'
import ProductsPage from '../features/product/pages/ProductsPage'
import InventoryPage from '../features/inventory/pages/InventoryPage'
import NewSellPage from '../features/sells/pages/newSellPage'
import SalesPage from '../features/sells/pages/SalesPage'
import HistoryMembershipPage from '../features/memberships/pages/HistoryMembershipPage'
import DashboardResumenPage from '../features/sells/pages/DashboardResumenPage'

const privateRoutes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <MembershipsPage />,
      },
      {
        path: 'memberships',
        element: <MembershipsPage />,
      },
      {
        path: 'memberships-pays',
        element: <HistoryMembershipPage />,
      },
      {
        path: 'clients',
        element: <ClientsPage />,
      },
      {
        path: 'clients/new',
        element: <NewClientPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'inventory',
        element: <InventoryPage />,
      },
      {
        path: 'sells',
        element: <SalesPage />,
      },
      {
        path: 'sells/new',
        element: <NewSellPage />,
      },
      {
        path: 'resumen',
        element: <DashboardResumenPage />,
      },
    ],
  },
]

export default privateRoutes
