import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span>hoan.nguyenduy</span>
        <span className="ms-1">&copy; 2022 KMA.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
