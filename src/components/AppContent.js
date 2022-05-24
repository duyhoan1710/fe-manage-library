import React, { Suspense } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import { isAuthenticated } from '../helpers/isAuthenticated'

// routes config
import routes from '../routers/routes'
import { useProfile } from 'src/hooks/useAdmin'

const AppContent = () => {
  const { data: user } = useProfile()

  console.log(user)

  return (
    <Suspense fallback={<CSpinner color="primary" />}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            name={route.name}
            element={
              !route.roles.includes(user?.role) ? (
                <Navigate to="/login" replace />
              ) : (
                <route.element />
              )
            }
          />
        ))}
        <Route path="*" element={<Navigate to="404" replace />} />
      </Routes>
    </Suspense>
  )
}

export default React.memo(AppContent)
