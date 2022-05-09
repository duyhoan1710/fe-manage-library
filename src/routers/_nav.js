import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCalculator, cilChartPie, cilNotes, cilPuzzle, cilStar } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Loại Sách',
    to: '/categories',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sách',
    to: '/books',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'HOT',
    },
  },
  {
    component: CNavItem,
    name: 'Mượn - Trả',
    to: '/borrowers',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Người Đọc',
    to: '/users',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Thống Kê',
    to: '/statistics',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
]

export default _nav
