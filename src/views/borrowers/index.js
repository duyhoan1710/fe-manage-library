import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
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
import { diff, formatDate } from 'src/helpers/dayjs'

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
      register_date: '2021/1/1',
      borrower_date: '2021/1/4',
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
      register_date: '2021/1/1',
      borrower_date: '2021/1/4',
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
      register_date: '2021/1/1',
      borrower_date: '2021/1/4',
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
      register_date: '2021/1/1',
      borrower_date: '2021/1/4',
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
      register_date: '2021/1/1',
      borrower_date: '2021/1/4',
      return_date: '2021/3/1',
      promise_return_date: '2021/4/1',
      note: 'Below are examples which also can be edited directly via the editor on the left side and will be rendered on the right.',
    },
  ]

  const categories = ['Sách Tham Khảo', 'Tài Liệu Học Tập']

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

        <CCol md={2} xs="auto">
          <CFormLabel htmlFor="name">Kì Học</CFormLabel>
          <CFormSelect
            options={[
              { label: 'Lựa Chọn', value: null },
              ...Array.from({ length: 10 }, (_, i) => ({ label: `Kì ${i + 1}`, value: i + 1 })),
            ]}
          />
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
      </CRow>

      <CTable bordered hover align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Thứ Tự</CTableHeaderCell>
            <CTableHeaderCell>Ảnh</CTableHeaderCell>
            <CTableHeaderCell>Tên Sách</CTableHeaderCell>
            <CTableHeaderCell>Người Đọc</CTableHeaderCell>
            <CTableHeaderCell>Ngày Mượn (Thực Tế)</CTableHeaderCell>
            <CTableHeaderCell>Ngày Trả (Dự Kiến)</CTableHeaderCell>
            <CTableHeaderCell>Ngày Trả (Thực Tế)</CTableHeaderCell>
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
              <CTableDataCell>
                <span>{formatDate(record.return_date) || 'Chưa Trả'}</span>

                {(!record.return_date && diff(new Date(), record.promise_return_date) > 0) ||
                (record.return_date && diff(record.return_date, record.promise_return_date) > 0) ? (
                  <span className="border p-1 rounded bg-danger text-white ms-3">Quá Hạn</span>
                ) : (
                  <span className="border p-1 rounded bg-success text-white ms-3">Đúng Hạn</span>
                )}
              </CTableDataCell>
              <CTableDataCell className="max-w-250">
                <div className="note-column">{record.note}</div>
              </CTableDataCell>
              <CTableDataCell>
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
