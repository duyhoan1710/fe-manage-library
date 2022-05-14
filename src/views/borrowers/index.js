import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { formatDate } from 'src/helpers/dayjs'

const Borrowers = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const data = [
    {
      id: 1,
      image: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      user_name: 'user test',
      book_name: 'Ch Dau',
      quantity: 2,
      borrower_date: '2021/1/1',
      return_date: '2021/3/1',
      promise_return_date: '2021/4/1',
      note: 'test test',
    },
    {
      id: 2,
      image: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      user_name: 'user test',
      book_name: 'Ch Dau',
      quantity: 2,
      borrower_date: '2021/1/1',
      return_date: '',
      promise_return_date: '2021/4/1',
      note: 'test test',
    },
    {
      id: 3,
      image: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      user_name: 'user test',
      book_name: 'Ch Dau',
      quantity: 2,
      borrower_date: '2021/1/1',
      return_date: '2021/5/1',
      promise_return_date: '2021/4/1',
      note: 'test test',
    },
    {
      id: 4,
      image: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      user_name: 'user test',
      book_name: 'Ch Dau',
      quantity: 2,
      borrower_date: '2021/1/1',
      return_date: '2021/3/1',
      promise_return_date: '2021/4/1',
      note: 'test test',
    },
    {
      id: 5,
      image: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      user_name: 'user test',
      book_name: 'Ch Dau',
      quantity: 2,
      borrower_date: '2021/1/1',
      return_date: '2021/3/1',
      promise_return_date: '2021/4/1',
      note: 'Below are examples which also can be edited directly via the editor on the left side and will be rendered on the right.',
    },
  ]

  const categories = ['TieuThuyet', 'VanHoc', 'TrinhTham']

  return (
    <div>
      <CRow xs={{ gutterX: 5 }} className="flex-grow-1 mb-3">
        <CCol md={2} xs="auto">
          <CFormLabel>Tên Người Đọc</CFormLabel>
          <CFormInput type="text" placeholder="Nguyễn Văn A..." />
        </CCol>

        <CCol md={2} xs="auto">
          <CFormLabel>Tên Sách</CFormLabel>
          <CFormInput type="text" placeholder="Chí Phèo..." />
        </CCol>

        <CCol md={1.5} xs="auto">
          <CFormLabel htmlFor="name">Loại Sách</CFormLabel>
          {categories.map((category) => (
            <CFormCheck key={category} label={category} value={category} />
          ))}
        </CCol>

        <CCol md={1.5} xs="auto">
          <CFormLabel htmlFor="name">Trạng Thái</CFormLabel>
          <CFormCheck type="radio" label="Đúng Hạn" name="hiringStatus" value="1" />
          <CFormCheck type="radio" label="Quá Hạn" name="hiringStatus" value="2" />
        </CCol>

        <CCol md={2} xs="auto">
          <CFormLabel>Ngày Mượn</CFormLabel>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="datePicker"
          />
        </CCol>

        <CCol md={2} xs="auto">
          <CFormLabel>Ngày Trả</CFormLabel>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="datePicker"
          />
        </CCol>
      </CRow>

      <CTable bordered hover align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Thứ Tự</CTableHeaderCell>
            <CTableHeaderCell>Ảnh</CTableHeaderCell>
            <CTableHeaderCell>Tên Sách</CTableHeaderCell>
            <CTableHeaderCell>Người Đọc</CTableHeaderCell>
            <CTableHeaderCell>Ngày Mượn</CTableHeaderCell>
            <CTableHeaderCell>Ngày Hẹn Trả</CTableHeaderCell>
            <CTableHeaderCell>Ngày Trả</CTableHeaderCell>
            <CTableHeaderCell className="max-w-250">Ghi Chú</CTableHeaderCell>
            <CTableHeaderCell className="action-column" />
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((record, index) => (
            <CTableRow key={record.id}>
              <CTableHeaderCell>{index + 1}</CTableHeaderCell>
              <CTableDataCell>
                <CImage rounded fluid width={70} height={70} src={record.image} />
              </CTableDataCell>
              <CTableDataCell>{record.book_name}</CTableDataCell>
              <CTableDataCell>{record.user_name}</CTableDataCell>
              <CTableDataCell>{formatDate(record.borrower_date)}</CTableDataCell>
              <CTableDataCell>{formatDate(record.promise_return_date)}</CTableDataCell>
              <CTableDataCell>{formatDate(record.return_date) || '-'}</CTableDataCell>
              <CTableDataCell className="max-w-250">
                <div className="note-column">{record.note}</div>
              </CTableDataCell>
              <CTableDataCell className="d-flex justify-content-center">
                <CButton>Cập Nhật</CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Borrowers
