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
import { useAnalyticsBook, useMostBookInMonth } from 'src/hooks/useBorrower'
import Skeleton from 'react-loading-skeleton'
import { CChart } from '@coreui/react-chartjs'
import DatePicker from 'react-datepicker'

const Statistics = () => {
  const [year, setYear] = useState(new Date())
  const { data: analystBook, isLoading } = useAnalyticsBook()
  const { data: bookInMonth } = useMostBookInMonth({ year: new Date(year).getFullYear() })

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

        <CCol md={3}>
          <CAlert color="warning">Số Sách Hỏng: {analystBook?.totalWrongBooks}</CAlert>
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
              <CTableHeaderCell>Số Lượng Hỏng</CTableHeaderCell>
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
                <CTableDataCell>{book.totalWrongBooks}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {isLoading && <Skeleton count={5} />}
      </div>

      <CRow className="pt-5">
        <CCol md={1} />
        <CCol md={3}>
          <DatePicker
            id="esimatingHiredDate"
            name="esimatingHiredDate"
            className="datePicker"
            selected={year}
            dateFormat="yyyy"
            placeholderText="Chọn Năm"
            onChange={(value) => setYear(value)}
            showYearPicker
          />
        </CCol>
      </CRow>

      <CRow className="pt-3">
        <CCol md={1} />
        <CCol md={10}>
          <CChart
            type="bar"
            data={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: [
                {
                  label: 'Biểu Đồ Thống Kê Sách Được Mượn Nhiều Nhất Trong Tháng',
                  backgroundColor: '#f87979',
                  data: bookInMonth ? [...bookInMonth?.map((book) => book.quality), 10] : [],
                  barPercentage: '0.5',
                },
              ],
            }}
            labels="months"
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return (
                        bookInMonth.find((book, index) => index === tooltipItem.dataIndex)
                          ?.bookName +
                        ': ' +
                        tooltipItem.raw
                      )
                    },
                  },
                },
              },
            }}
          />
        </CCol>
      </CRow>
    </div>
  )
}

export default Statistics
