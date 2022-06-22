import React from 'react'

const CategoriesComponent = React.lazy(() => import('../views/categories'))
const BooksComponent = React.lazy(() => import('../views/books'))
const BorrowersComponent = React.lazy(() => import('../views/borrowers'))
const UsersComponent = React.lazy(() => import('../views/users'))
const AdminComponent = React.lazy(() => import('../views/admin'))
const StatisticsComponent = React.lazy(() => import('../views/statistics'))
const PromiseBorrowersComponent = React.lazy(() => import('../views/promise-borrowers'))
const PromiseReturnComponent = React.lazy(() => import('../views/promise-return'))
const NotiComponent = React.lazy(() => import('../views/noty'))
const Returns = React.lazy(() => import('../views/returns'))

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Loại Sách',
    element: CategoriesComponent,
    needsAuth: true,
    roles: ['Admin', 'Librarier'],
  },
  {
    path: '/categories',
    exact: true,
    name: 'Loại Sách',
    element: CategoriesComponent,
    needsAuth: true,
    roles: ['Admin', 'Librarier'],
  },
  {
    path: '/books',
    exact: true,
    name: 'Sách',
    element: BooksComponent,
    needsAuth: true,
    roles: ['Admin', 'Librarier'],
  },
  {
    path: '/borrowers',
    exact: true,
    name: 'Mượn - Trả',
    element: BorrowersComponent,
    needsAuth: true,
    roles: ['Admin', 'Librarier'],
  },
  {
    path: '/returns',
    exact: true,
    name: 'Trả Sách',
    element: Returns,
    needsAuth: true,
    roles: ['Admin', 'Librarier'],
  },
  {
    path: '/promise-borrowers',
    exact: true,
    name: 'Mượn - Trả (Dự Kiến)',
    element: PromiseBorrowersComponent,
    needsAuth: true,
    roles: ['Admin', 'Librarier'],
  },
  {
    path: '/promise-return',
    exact: true,
    name: 'Mượn - Trả (Dự Kiến)',
    element: PromiseReturnComponent,
    needsAuth: true,
    roles: ['Admin', 'Librarier'],
  },
  {
    path: '/users',
    exact: true,
    name: 'Người Dùng Hệ Thống',
    element: AdminComponent,
    needsAuth: true,
    roles: ['Admin'],
  },
  {
    path: '/readers',
    exact: true,
    name: 'Người Đọc',
    element: UsersComponent,
    needsAuth: true,
    roles: ['Admin', 'Librarier'],
  },
  {
    path: '/statistics',
    exact: true,
    name: 'Thống Kê',
    element: StatisticsComponent,
    needsAuth: true,
    roles: ['Admin'],
  },
  {
    path: '/noty',
    exact: true,
    name: 'Quản Lý Thông Báo',
    element: NotiComponent,
    needsAuth: true,
    roles: ['Admin'],
  },
]

export default routes
