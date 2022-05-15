import React from 'react'

const CategoriesComponent = React.lazy(() => import('../views/categories'))
const BooksComponent = React.lazy(() => import('../views/books'))
const BorrowersComponent = React.lazy(() => import('../views/borrowers'))
const UsersComponent = React.lazy(() => import('../views/users'))
const StatisticsComponent = React.lazy(() => import('../views/statistics'))

const routes = [
  { path: '/', exact: true, name: 'Thống Kê', element: StatisticsComponent, needsAuth: true },
  {
    path: '/categories',
    exact: true,
    name: 'Loại Sách',
    element: CategoriesComponent,
    needsAuth: true,
  },
  { path: '/books', exact: true, name: 'Sách', element: BooksComponent, needsAuth: true },
  {
    path: '/borrowers',
    exact: true,
    name: 'Mượn - Trả',
    element: BorrowersComponent,
    needsAuth: true,
  },
  { path: '/users', exact: true, name: 'Người Đọc', element: UsersComponent, needsAuth: true },
  {
    path: '/statistics',
    exact: true,
    name: 'Thống Kê',
    element: StatisticsComponent,
    needsAuth: true,
  },
]

export default routes
