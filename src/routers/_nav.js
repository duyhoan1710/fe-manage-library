import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilNotes,
  cilPuzzle,
  cilStar,
  cilUser,
} from '@coreui/icons'
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
    roles: ['Admin', 'Librarier'],
  },
  {
    component: CNavItem,
    name: 'Mượn (Dự Kiến)',
    to: '/promise-borrowers',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    roles: ['Admin', 'Librarier'],
  },
  {
    component: CNavItem,
    name: 'Trả (Dự Kiến)',
    to: '/promise-return',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    roles: ['Admin', 'Librarier'],
  },
  {
    component: CNavItem,
    name: 'Mượn Sách',
    to: '/borrowers',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    roles: ['Admin', 'Librarier'],
  },
  {
    component: CNavItem,
    name: 'Trả Sách',
    to: '/returns',
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
  {
    component: CNavItem,
    name: 'Quản Lý Thông Báo',
    to: '/noty',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    roles: ['Admin'],
  },
]

export default _nav
