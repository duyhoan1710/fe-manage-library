import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCalculator, cilChartPie, cilNotes, cilPuzzle, cilStar, cilUser } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Loại Sách',
    to: '/categories',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    roles: ['Admin', 'Librarier'],
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
    roles: ['Admin', 'Librarier'],
  },
  {
    component: CNavItem,
    name: 'Mượn - Trả (Dự Kiến)',
    to: '/promise-borrowers',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    roles: ['Admin', 'Librarier'],
  },
  {
    component: CNavItem,
    name: 'Mượn - Trả',
    to: '/borrowers',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    roles: ['Admin', 'Librarier'],
  },
  {
    component: CNavItem,
    name: 'Người Đọc',
    to: '/readers',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    roles: ['Admin', 'Librarier'],
  },
  {
    component: CNavItem,
    name: 'Thống Kê',
    to: '/statistics',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    roles: ['Admin'],
  },
  {
    component: CNavItem,
    name: 'Người Dùng Hệ Thống',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    roles: ['Admin'],
  },
]

export default _nav
