import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

// routes config
import routes from '../routers/routes'
import { useProfile } from 'src/hooks/useAdmin'

const AppContent = () => {
  const { data: user } = useProfile()
  const navigator = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (user) {
      routes.forEach((route) => {
        if (route.path === location.pathname && !route.roles.includes(user?.role)) {
          navigator('/login')
        }
      })
    }
  }, [user])

  return (
    <Suspense fallback={<CSpinner color="primary" />}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            name={route.name}
            element={<route.element />}
          />
        ))}
        <Route path="*" element={<Navigate to="404" replace />} />
      </Routes>
    </Suspense>
  )
}

export default React.memo(AppContent)
