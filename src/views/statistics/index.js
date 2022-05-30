import React, { useState } from 'react'

import {
  CAlert,
  CCol,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useAnalyticsBook } from 'src/hooks/useBorrower'
import Skeleton from 'react-loading-skeleton'

const Statistics = () => {
  const { data: analystBook, isLoading } = useAnalyticsBook()

  const navigate = useNavigate()

  return (
    <div className="pb-5">
      <CRow>
        <CCol md={3}>
          <CAlert color="success">Số Sách Còn Lại: {analystBook?.totalAvailableBooks}</CAlert>
        </CCol>

        <CCol md={3}>
          <CAlert color="info">Số Sách Đang Mượn: {analystBook?.totalHiring}</CAlert>
        </CCol>

        <CCol md={3}>
          <CAlert color="danger">Số Sách Quá Hạn: {analystBook?.totalExpired}</CAlert>
        </CCol>
      </CRow>

      <div className="mt-5">
        <CTable bordered hover align="middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Thứ Tự</CTableHeaderCell>
              <CTableHeaderCell>Ảnh</CTableHeaderCell>
              <CTableHeaderCell>Tên Sách</CTableHeaderCell>
              <CTableHeaderCell>Loại Sách</CTableHeaderCell>
              <CTableHeaderCell>Kì Học</CTableHeaderCell>
              <CTableHeaderCell>Số Lượng Còn Lại</CTableHeaderCell>
              <CTableHeaderCell>Số Lượng Đang Mượn</CTableHeaderCell>
              <CTableHeaderCell>Số Lượng Đã Trả</CTableHeaderCell>
              <CTableHeaderCell>Số Lượng Quá Hạn</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {analystBook?.datas?.data?.map((book, index) => (
              <CTableRow
                key={book.id}
                onClick={() => navigate(`/borrowers?bookName=${book.title}`)}
              >
                <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                <CTableDataCell>
                  <CImage rounded width={70} height={50} src={book.thumbnail} />
                </CTableDataCell>
                <CTableDataCell className="text-primary text-underline cursor-pointer">
                  {book.title}
                </CTableDataCell>
                <CTableDataCell>{book.categoryCode}</CTableDataCell>
                <CTableDataCell>Kì {book.term}</CTableDataCell>
                <CTableDataCell>{book.quantity}</CTableDataCell>
                <CTableDataCell>{book.totalHiring}</CTableDataCell>
                <CTableDataCell>{book.totalReturned}</CTableDataCell>
                <CTableDataCell>{book.totalExpired}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {isLoading && <Skeleton count={5} />}
      </div>
    </div>
  )
}

export default Statistics
