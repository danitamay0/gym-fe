import AuthLayout from '@/layouts/AuthLayout'
import LoginPage from '@/features/auth/pages/LoginPage'

const publicRoutes = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <LoginPage />,
      },
    ],
  },
]

export default publicRoutes
